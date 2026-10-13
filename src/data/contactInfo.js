export const contactEmail = 'sagegraphics2021@gmail.com'
export const contactPhone = '+91 87789 14009'
export const contactPhoneLink = 'tel:+918778914009'
export const studioAddress = 'No: 160, 3rd Floor, Avila Towers, Mudichur Rd, West Tambaram, Tambaram, Chennai, Tamil Nadu 600045'
export const studioMapQuery = encodeURIComponent(studioAddress)
export const studioMapUrl = `https://www.google.com/maps/search/?api=1&query=${studioMapQuery}`
export const studioMapEmbedUrl = `https://maps.google.com/maps?hl=en&q=${studioMapQuery}&z=15&ie=UTF8&iwloc=B&output=embed`
export const formSubmitEndpoint = `https://formsubmit.co/ajax/${contactEmail}`

export async function submitContactForm(fields) {
  const response = await fetch(formSubmitEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(fields),
  })
  const body = await response.text()
  let result = {}
  try { result = body ? JSON.parse(body) : {} } catch { /* Some provider errors are returned as plain text. */ }
  if (!response.ok || result.success === false || String(result.success).toLowerCase() === 'false') {
    const providerMessage = result.message || body.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 240)
    throw new Error(providerMessage || `Form service returned HTTP ${response.status}. Please try again.`)
  }
  return result
}
