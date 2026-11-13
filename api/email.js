export const recipientEmail = process.env.FORMS_TO_EMAIL || 'sagegraphics2021@gmail.com'

export async function sendEmail({ subject, text, html, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL || process.env.CAREERS_FROM_EMAIL
  const missingConfig = []
  if (!apiKey) missingConfig.push('RESEND_API_KEY')
  if (!from) missingConfig.push('RESEND_FROM_EMAIL (or CAREERS_FROM_EMAIL)')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) missingConfig.push('FORMS_TO_EMAIL')
  if (missingConfig.length) {
    const error = new Error('Email delivery is not configured on this deployment.')
    error.code = 'EMAIL_NOT_CONFIGURED'
    error.missingConfig = missingConfig
    throw error
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [recipientEmail], subject, text, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
  })
  const result = await response.json().catch(() => ({}))
  if (!response.ok || !result.id) {
    const error = new Error('The email service did not accept the submission.')
    error.code = 'EMAIL_DELIVERY_FAILED'
    error.providerMessage = [result.message, result.error, result.detail].find((value) => typeof value === 'string' && value.trim())?.trim()
      || (response.ok ? 'The provider returned no email ID.' : `HTTP ${response.status}`)
    error.providerStatus = response.status
    throw error
  }
  return result
}

export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])
}
