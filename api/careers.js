import { sendEmail, escapeHtml } from './email.js'
import { isAllowedRequestOrigin } from './request-security.js'

export const config = { api: { bodyParser: false } }

const MAX_REQUEST_BYTES = 32 * 1024
const departments = {
  'Search Engine Optimization': ['SEO Specialist'],
  'Social Media Management': ['Social Media Manager'],
  'Web & App Development': ['React Developer'],
  'Design & Branding': ['Graphic Designer & Video Editor'],
}

function respond(res, statusCode, payload) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(payload))
}

async function readTextFields(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body

  const chunks = []
  let size = 0
  for await (const chunk of req) {
    size += chunk.length
    if (size > MAX_REQUEST_BYTES) throw new Error('The application form is too large.')
    chunks.push(chunk)
  }

  const body = Buffer.concat(chunks).toString('utf8')
  const contentType = String(req.headers['content-type'] || '').toLowerCase()
  if (contentType.includes('application/json')) {
    try {
      const fields = JSON.parse(body)
      if (fields && typeof fields === 'object' && !Array.isArray(fields)) return fields
    } catch {
      throw new Error('The application form contains invalid JSON.')
    }
    throw new Error('The application form must contain text fields.')
  }
  if (contentType.includes('application/x-www-form-urlencoded')) return Object.fromEntries(new URLSearchParams(body))
  throw new Error('Send the application as a text form.')
}

export default async function careersHandler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return respond(res, 405, { success: false, message: 'Method not allowed.' })
  }
  try {
    if (!isAllowedRequestOrigin(req)) return respond(res, 403, { success: false, message: 'Cross-origin application requests are not accepted.' })
    const fields = await readTextFields(req)
    const required = ['name', 'email', 'phone', 'department', 'position', 'portfolio']
    if (required.some((name) => !String(fields[name] || '').trim())) return respond(res, 400, { success: false, message: 'Complete all required application fields.' })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return respond(res, 400, { success: false, message: 'Enter a valid email address.' })
    if (!departments[fields.department]?.includes(fields.position)) return respond(res, 400, { success: false, message: 'Choose a valid role for the selected department.' })
    try { const url = new URL(fields.portfolio); if (!['http:', 'https:'].includes(url.protocol)) throw new Error() }
    catch { return respond(res, 400, { success: false, message: 'Enter a valid portfolio URL.' }) }
    const safe = {
      name: escapeHtml(fields.name),
      email: escapeHtml(fields.email),
      phone: escapeHtml(fields.phone),
      department: escapeHtml(fields.department),
      position: escapeHtml(fields.position),
      portfolio: escapeHtml(fields.portfolio),
      message: escapeHtml(fields.message || 'No additional message provided.'),
    }
    await sendEmail({
      replyTo: fields.email,
      subject: `Career application: ${fields.position}`,
      text: `Name: ${fields.name}\nEmail: ${fields.email}\nPhone: ${fields.phone}\nDepartment: ${fields.department}\nRole: ${fields.position}\nPortfolio: ${fields.portfolio}\n\n${fields.message || 'No additional message provided.'}`,
      html: `<h2>Career application</h2><p><strong>Name:</strong> ${safe.name}</p><p><strong>Email:</strong> ${safe.email}</p><p><strong>Phone:</strong> ${safe.phone}</p><p><strong>Department:</strong> ${safe.department}</p><p><strong>Role:</strong> ${safe.position}</p><p><strong>Portfolio:</strong> ${safe.portfolio}</p><p><strong>About the applicant:</strong></p><p>${safe.message.replace(/\n/g, '<br>')}</p>`,
    })
    return respond(res, 200, { success: true })
  } catch (error) {
    if (error?.code === 'EMAIL_NOT_CONFIGURED') {
      const missing = Array.isArray(error.missingConfig) ? error.missingConfig : []
      console.error(`[careers] Email configuration is missing: ${missing.join(', ') || 'required server environment variables'}`)
      const guidance = missing.length ? ` Missing Hostinger setting(s): ${missing.join(', ')}.` : ''
      return respond(res, 503, { success: false, message: `Career application email is not configured on the server.${guidance} Add the settings in your Hostinger Node.js app environment and redeploy, then try again.` })
    }
    if (error?.code === 'EMAIL_DELIVERY_FAILED') {
      const detail = String(error.providerMessage || '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, 320)
      const status = Number.isInteger(error.providerStatus) ? error.providerStatus : 'unknown'
      console.error(`[careers] Resend rejected the application email (HTTP ${status}): ${detail}`)
      return respond(res, 502, { success: false, message: `The email service could not accept your application. Provider response: ${detail}. Please try again shortly or contact us directly.` })
    }
    const message = error?.message || ''
    const clientError = /application form|text form|invalid JSON|text fields|too large/i.test(message)
    if (!clientError) console.error('[careers] Application request failed:', message || 'Unknown server error')
    return respond(res, clientError ? 400 : 502, { success: false, message: clientError ? message : 'The application service is temporarily unavailable.' })
  }
}
