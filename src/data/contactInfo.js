export const contactEmail = 'sagegraphics2021@gmail.com'
export const contactPhone = '+91 87789 14009'
export const contactPhoneLink = 'tel:+918778914009'
export const studioAddress = 'No: 160, 3rd Floor, Avila Towers, Mudichur Rd, West Tambaram, Tambaram, Chennai, Tamil Nadu 600045'
export const studioMapUrl = 'https://www.google.com/maps/place/Sage+GFX+Digital+Solutions/@12.9248387,80.1103215,17.08z/data=!4m6!3m5!1s0x3a52f5d1087b538d:0xe7e603ebe92848af!8m2!3d12.924843!4d80.1127257!16s%2Fg%2F11pvww22j5'
export const studioMapEmbedUrl = 'https://maps.google.com/maps?hl=en&q=12.924843,80.1127257&z=17&ie=UTF8&iwloc=B&output=embed'
export async function submitContactForm(fields) {
  const response = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(fields),
  })
  const result = await response.json().catch(() => ({}))
  if (!response.ok || String(result.success).toLowerCase() !== 'true') throw new Error(result.message || `FormSubmit returned HTTP ${response.status}. Please try again.`)
  return result
}
