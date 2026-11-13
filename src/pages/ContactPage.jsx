import { useState } from 'react'
import { FiArrowRight, FiLayers, FiMail, FiMapPin, FiMessageSquare, FiPhone, FiSend, FiUser } from 'react-icons/fi'
import { contactEmail, contactPhone, contactPhoneLink, submitContactForm, studioAddress, studioMapEmbedUrl, studioMapUrl } from '../data/contactInfo'
import services from '../data/services'

const contactCards = [
  { title: 'Email', value: contactEmail, href: `mailto:${contactEmail}` },
  { title: 'Call Us', value: contactPhone, detail: 'Mon–Sat, 9:30 AM–6:30 PM IST', href: contactPhoneLink },
  { title: 'WhatsApp', value: 'Chat with our team', detail: 'Fast replies during business hours', href: 'https://wa.me/918778914009' },
  { title: 'Address', value: studioAddress, href: studioMapUrl },
]
function ContactPage() {
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    setBusy(true)
    setStatus('')
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      await submitContactForm({ ...data, _subject: `Website inquiry from ${data.name}`, _replyto: data.email, _template: 'table' })
      form.reset()
      setStatus('Thanks for reaching out. We’ll be in touch soon.')
    } catch (error) {
      const reason = error.message && error.message !== 'Failed to fetch' ? ` (${error.message})` : ''
      setStatus(`We couldn’t send your message right now${reason}. Please email ${contactEmail} or call ${contactPhone}.`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="contact-page contact-design" id="contact">
      <div className="contact-design-glow" aria-hidden="true" />
      <section className="contact-design-hero" aria-labelledby="contact-title">
        <div className="contact-hero-copy">
          <h1 id="contact-title">Contact</h1>
          <p className="contact-hero-intro">Let&apos;s talk about what your business can become.</p>
          <nav className="contact-breadcrumb" aria-label="Breadcrumb"><p className="contact-breadcrumb-trail"><a href="/">Home</a><FiArrowRight aria-hidden="true"/><span className="contact-breadcrumb-current">Contact</span></p></nav>
        </div>
        <div className="contact-hero-image" aria-hidden="true">
          <img src="/images/sage-gfx-services-background.webp" alt="" fetchPriority="high" />
        </div>
      </section>

      <section className="contact-body-guide" aria-labelledby="contact-body-title">
        <div className="contact-body-guide-inner">
          <p className="contact-body-guide-kicker"><span aria-hidden="true" /> LET&apos;S CONNECT</p>
          <h2 id="contact-body-title">Four ways to <span>reach us</span></h2>
          <p className="contact-body-guide-intro">Tell us about your goals. Our team will help you find the right digital marketing, design, or development support.</p>
          <div className="contact-body-layout">
          <div className="contact-body-guide-grid">
            {contactCards.map(({ title, value, detail, href }) => <a className="contact-body-guide-card contact-simple-card" href={href} key={title} target={title === 'Address' || title === 'WhatsApp' ? '_blank' : undefined} rel={title === 'Address' || title === 'WhatsApp' ? 'noreferrer' : undefined}>
              <h3>{title}</h3>
              <strong>{value}</strong>
              {detail && <span className="contact-simple-card-detail">{detail}</span>}
            </a>)}
          </div>
          <div className="contact-form-panel" id="contact-form">
            <p className="contact-form-kicker"><span/> START YOUR PROJECT</p>
            <h2>Send Us a <span>Message</span></h2>
            <p className="contact-form-intro">Fill out the form below and we&apos;ll get back to you shortly.</p>
            <form className="contact-design-form" onSubmit={handleSubmit}>
              <label className="contact-field"><FiUser aria-hidden="true"/><span className="sr-only">Full Name</span><input name="name" autoComplete="name" placeholder="Full Name *" required /></label>
              <label className="contact-field"><FiMail aria-hidden="true"/><span className="sr-only">Email Address</span><input name="email" type="email" autoComplete="email" placeholder="Email Address *" required /></label>
              <label className="contact-field"><FiPhone aria-hidden="true"/><span className="sr-only">Phone Number</span><input name="phone" type="tel" autoComplete="tel" placeholder="Phone Number *" required /></label>
              <label className="contact-field"><FiLayers aria-hidden="true"/><span className="sr-only">Select Service</span><select name="service" defaultValue="" required><option value="" disabled>Select Service *</option>{services.map(({ title }) => <option key={title}>{title}</option>)}</select></label>
              <label className="contact-field contact-message-field"><FiMessageSquare aria-hidden="true"/><span className="sr-only">Tell us about your project</span><textarea name="message" placeholder="Tell us about your project... *" rows="3" required /></label>
              <button className="contact-submit" type="submit" disabled={busy}><FiSend aria-hidden="true"/>{busy ? 'SENDING…' : 'SUBMIT NOW'} <FiArrowRight aria-hidden="true"/></button>
              {status && <p className="contact-form-status" role="status">{status}</p>}
            </form>
          </div>
          </div>
        </div>
      </section>

      <section className="contact-main-grid contact-body-map" aria-label="Find us">
        <div className="contact-map-panel">
          <iframe title={`Map showing Sage GFX at ${studioAddress}`} src={studioMapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          <a className="contact-map-link" href={studioMapUrl} target="_blank" rel="noreferrer"><FiMapPin aria-hidden="true"/> View on Google Maps <FiArrowRight aria-hidden="true"/></a>
        </div>


      </section>

    </div>
  )
}

export default ContactPage
