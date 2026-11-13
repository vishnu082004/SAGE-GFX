import { escapeHtml, sendEmail } from './email.js'
import { isAllowedRequestOrigin } from './request-security.js'

export const config = { api: { bodyParser: { sizeLimit: '32kb' } } }

function respond(res, statusCode, payload) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(payload))
}

export default async function contactHandler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return respond(res, 405, { success: false, message: 'Method not allowed.' })
  }
  try {
    if (!isAllowedRequestOrigin(req)) return respond(res, 403, { success: false, message: 'Cross-origin form requests are not accepted.' })
    let fields
    if (req.body && typeof req.body === 'object') {
      fields = req.body
    } else {
      const chunks = []
      let size = 0
      for await (const chunk of req) {
        size += chunk.length
        if (size > 32 * 1024) return respond(res, 413, { success: false, message: 'The form submission is too large.' })
        chunks.push(chunk)
      }
      fields = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    }
    const name = String(fields.name || '').trim()
    const email = String(fields.email || '').trim()
    const phone = String(fields.phone || fields.mobile || '').trim()
    const message = String(fields.message || '').trim()
    const service = String(fields.service || '').trim()
    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return respond(res, 400, { success: false, message: 'Enter your name, a valid email address, and a message.' })
    const safe = { name: escapeHtml(name), email: escapeHtml(email), phone: escapeHtml(phone), message: escapeHtml(message), service: escapeHtml(service) }
    await sendEmail({
      subject: `Website inquiry from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nService: ${service || 'Not specified'}\n\n${message}`,
      html: `<h2>Website inquiry</h2><p><strong>Name:</strong> ${safe.name}</p><p><strong>Email:</strong> ${safe.email}</p><p><strong>Phone:</strong> ${safe.phone || 'Not provided'}</p><p><strong>Service:</strong> ${safe.service || 'Not specified'}</p><p>${safe.message.replace(/\n/g, '<br>')}</p>`,
    })
    return respond(res, 200, { success: true })
  } catch (error) {
    const badInput = error instanceof SyntaxError || /form submission is too large/i.test(error.message)
    return respond(res, badInput ? 400 : 502, { success: false, message: badInput ? 'The form submission was invalid.' : 'The email service is temporarily unavailable.' })
  }
}
