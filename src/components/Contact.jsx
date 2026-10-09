import { useState } from 'react'
import { FiArrowRight, FiCheckCircle, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'

const formRecipient = 'hello@sagegfx.com'
const studioAddress = 'No. 73, New NGGO Colony, 4th Cross Street, Adambakkam, Chennai - 600088'
const studioMapQuery = encodeURIComponent(studioAddress)
const initialForm = { name: '', email: '', mobile: '', service: '', message: '' }

function Contact({ showAddress = false, homeVersion = false }) {
  const [formData, setFormData] = useState(initialForm)
  const [status, setStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleChange = (event) => setFormData((data) => ({ ...data, [event.target.name]: event.target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus(null)
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${formRecipient}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ _subject: `Website inquiry from ${formData.name}`, _replyto: formData.email, _template: 'table', ...formData }),
      })
      const result = await response.json()
      if (!response.ok || result.success === false || String(result.success).toLowerCase() === 'false') throw new Error(result.message || 'The message could not be sent. Please try again.')
      setStatus({ type: 'success', message: 'Thanks for reaching out. We’ll be in touch soon.' })
      setFormData(initialForm)
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to send your inquiry right now. Please try again.' })
    } finally { setIsSubmitting(false) }
  }

  return <section id="contact" className={`contact ${showAddress ? 'contact--page' : ''} ${homeVersion ? 'contact--home' : ''}`} aria-label="Contact Sage GFX">
    <div className="container">
      <div className="contact-header"><span className="eyebrow"><span/> Let&apos;s talk</span><h2 className="section-heading">Have a big idea?<br/><span className="gradient-text">Let&apos;s build it.</span></h2></div>
      <div className="contact-container">
        <div className="contact-info-card">
          <span className="contact-info-title">SAGE GFX DIGITAL SOLUTIONS</span>
          <p className="contact-info-desc">Tell us where you want to take your business. We&apos;ll help you find the right next step.</p>
          <div className="contact-details-list">
            <div className="contact-item"><div className="contact-item-icon"><FiMail/></div><div className="contact-item-content"><p className="contact-item-label">Email</p><p className="contact-item-value"><a href={`mailto:${formRecipient}`}>{formRecipient}</a></p></div></div>
            {showAddress&&<div className="contact-item"><div className="contact-item-icon"><FiMapPin/></div><div className="contact-item-content"><p className="contact-item-label">Working worldwide</p><p className="contact-item-value">Digital-first, wherever you are.</p></div></div>}
          </div>
          <div className="contact-note"><FiPhone/><span>Share your details and we&apos;ll get back to you.</span></div>
          {homeVersion&&<div className="contact-home-map"><iframe title="Map showing Sage GFX in Adambakkam, Chennai" src={`https://maps.google.com/maps?hl=en&q=${studioMapQuery}&z=14&ie=UTF8&iwloc=B&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><a href={`https://www.google.com/maps/search/?api=1&query=${studioMapQuery}`} target="_blank" rel="noreferrer"><FiMapPin aria-hidden="true"/> Adambakkam, Chennai <FiArrowRight aria-hidden="true"/></a></div>}
        </div>
        <div className="contact-form-card">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group"><label htmlFor="name">Your name</label><input className="form-input" id="name" name="name" autoComplete="name" required value={formData.name} onChange={handleChange} placeholder="Jane Smith"/></div>
              <div className="form-group"><label htmlFor="email">Email address</label><input className="form-input" id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} placeholder="you@company.com"/></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label htmlFor="mobile">Phone number <span>(optional)</span></label><input className="form-input" id="mobile" name="mobile" type="tel" autoComplete="tel" value={formData.mobile} onChange={handleChange} placeholder="+91 98765 43210"/></div>
              <div className="form-group"><label htmlFor="service">Service</label><select className="form-input" id="service" name="service" value={formData.service} onChange={handleChange}><option value="">Choose a service</option><option>Design &amp; Branding</option><option>Web &amp; App Development</option><option>Digital Marketing</option><option>Social Media Management</option><option>SEO</option></select></div>
            </div>
            <div className="form-group"><label htmlFor="message">Tell us about your project</label><textarea className="form-textarea" id="message" name="message" rows="4" required value={formData.message} onChange={handleChange} placeholder="What would you like to make possible?"/></div>
            <button type="submit" disabled={isSubmitting} className="button button-gradient form-submit-btn">{isSubmitting ? 'Sending…' : 'Send inquiry'} <FiArrowRight/></button>
            {status&&<div className={`form-status-banner form-status-banner--${status.type}`} role={status.type==='error'?'alert':'status'}>{status.type==='success'&&<FiCheckCircle/>}{status.message}</div>}
          </form>
        </div>
      </div>
    </div>
  </section>
}

export default Contact
