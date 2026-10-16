import Busboy from 'busboy'

export const config = { api: { bodyParser: false } }

const MAX_RESUME_BYTES = 5 * 1024 * 1024
const MAX_REQUEST_BYTES = MAX_RESUME_BYTES + 128 * 1024
const departments = {
  'Design & Branding': ['Graphic Designer', 'UI/UX Designer', 'Brand Identity Designer'],
  'Web & App Development': ['React Developer', 'Frontend Developer', 'Full-Stack Developer', 'UI Developer'],
  'Digital Marketing': ['Digital Marketing Executive', 'Performance Marketing Specialist', 'Google Ads Specialist'],
  'Social Media Management': ['Social Media Manager', 'Social Media Executive', 'Social Media Strategist'],
  'Video & Content Creation': ['Video Editor', 'Motion Graphics Designer', 'Content Creator', 'Videographer'],
  'Search Engine Optimization': ['SEO Executive', 'SEO Specialist', 'Technical SEO Analyst', 'SEO Content Writer'],
}

function respond(res, statusCode, payload) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(payload))
}

function hasValidResumeSignature(file) {
  const bytes = file.buffer
  if (file.extension === 'pdf') return bytes.subarray(0, 1024).includes(Buffer.from('%PDF-'))
  if (file.extension === 'doc') return bytes.subarray(0, 8).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]))
  if (file.extension === 'docx') {
    const isZip = bytes.length > 4 && bytes[0] === 0x50 && bytes[1] === 0x4b && [0x03, 0x05, 0x07].includes(bytes[2])
    return isZip && bytes.includes(Buffer.from('[Content_Types].xml')) && bytes.includes(Buffer.from('word/'))
  }
  return false
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])
}

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    let parser
    try { parser = Busboy({ headers: req.headers, limits: { fileSize: MAX_RESUME_BYTES, files: 1, fields: 16, parts: 18 } }) }
    catch { reject(new Error('Expected a multipart form submission.')); return }
    const fields = {}
    let file = null
    let tooLarge = false
    let parseError = null
    parser.on('field', (name, value) => { fields[name] = value })
    parser.on('file', (name, stream, info) => {
      const chunks = []
      stream.on('data', (chunk) => chunks.push(chunk))
      stream.on('limit', () => { tooLarge = true })
      stream.on('end', () => {
        const buffer = Buffer.concat(chunks)
        if (buffer.length > 0) {
          file = { name: info.filename, mimeType: info.mimeType, extension: info.filename.split('.').pop().toLowerCase(), buffer }
        }
      })
    })
    parser.on('filesLimit', () => { parseError = new Error('Only one resume file is allowed.') })
    parser.on('fieldsLimit', () => { parseError = new Error('Too many form fields.') })
    parser.on('error', reject)
    parser.on('close', () => {
      if (parseError) reject(parseError)
      else if (tooLarge) reject(new Error('The resume must be 5 MB or smaller.'))
      else resolve({ fields, file })
    })
    let requestSize = 0
    req.on('data', (chunk) => {
      requestSize += chunk.length
      if (requestSize > MAX_REQUEST_BYTES) { parseError = new Error('The application upload is too large.'); req.unpipe(parser); parser.destroy(parseError); req.resume() }
    })
    req.pipe(parser)
  })
}

export default async function careersHandler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return respond(res, 405, { success: false, message: 'Method not allowed.' })
  }
  try {
    const origin = req.headers.origin
    if (origin) {
      const expectedOrigin = `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers['x-forwarded-host'] || req.headers.host}`
      if (new URL(origin).host !== new URL(expectedOrigin).host) return respond(res, 403, { success: false, message: 'Cross-origin application requests are not accepted.' })
    }
    const { fields, file } = await parseMultipart(req)
    if (fields._honey) return respond(res, 400, { success: false, message: 'Application could not be accepted.' })
    const required = ['name', 'email', 'phone', 'department', 'portfolio']
    if (required.some((name) => !String(fields[name] || '').trim())) return respond(res, 400, { success: false, message: 'Complete all required application fields.' })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return respond(res, 400, { success: false, message: 'Enter a valid email address.' })
    if (fields.position && !departments[fields.department]?.includes(fields.position)) return respond(res, 400, { success: false, message: 'Choose a valid role for the selected department.' })
    try { const url = new URL(fields.portfolio); if (!['http:', 'https:'].includes(url.protocol)) throw new Error() }
    catch { return respond(res, 400, { success: false, message: 'Enter a valid portfolio URL.' }) }
    if (!file) return respond(res, 400, { success: false, message: 'Upload your resume to submit the application.' })
    if (file) {
      const validMime = {
        pdf: ['application/pdf', 'application/octet-stream'],
        doc: ['application/msword', 'application/octet-stream'],
        docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/octet-stream'],
      }
      if (!['pdf', 'doc', 'docx'].includes(file.extension) || !validMime[file.extension]?.includes(file.mimeType) || !hasValidResumeSignature(file)) {
        return respond(res, 400, { success: false, message: 'The resume file contents do not match a supported PDF, DOC, or DOCX file.' })
      }
    }

    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.CAREERS_FROM_EMAIL
    const to = process.env.CAREERS_TO_EMAIL || 'sagegraphics2021@gmail.com'
    if (!apiKey || !from || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return respond(res, 503, { success: false, message: 'Career applications are not configured on this deployment.' })
    const safe = Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, escapeHtml(value)]))
    const attachment = file ? [{ filename: file.name, content: file.buffer.toString('base64') }] : undefined
    const providerResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: fields.email,
        subject: `Career application: ${fields.position || fields.department}`,
        text: `Name: ${fields.name}\nEmail: ${fields.email}\nPhone: ${fields.phone}\nDepartment: ${fields.department}\nRole: ${fields.position || 'Not specified'}\nPortfolio: ${fields.portfolio}\n\n${fields.message || 'No additional message provided.'}`,
        html: `<h2>Career application</h2><p><strong>Name:</strong> ${safe.name}</p><p><strong>Email:</strong> ${safe.email}</p><p><strong>Phone:</strong> ${safe.phone}</p><p><strong>Department:</strong> ${safe.department}</p><p><strong>Role:</strong> ${safe.position || 'Not specified'}</p><p><strong>Portfolio:</strong> ${safe.portfolio}</p><p><strong>About the applicant:</strong></p><p>${(safe.message || 'No additional message provided.').replace(/\n/g, '<br>')}</p>`,
        ...(attachment ? { attachments: attachment } : {}),
      }),
    })
    const providerResult = await providerResponse.json().catch(() => ({}))
    if (!providerResponse.ok || !providerResult.id) return respond(res, 502, { success: false, message: 'The application service did not accept the submission.' })
    return respond(res, 200, { success: true })
  } catch (error) {
    const message = error?.message || ''
    const clientError = /multipart|resume|upload|file|fields|application/i.test(message)
    return respond(res, clientError ? 400 : 502, { success: false, message: clientError ? message : 'The application service is temporarily unavailable.' })
  }
}
