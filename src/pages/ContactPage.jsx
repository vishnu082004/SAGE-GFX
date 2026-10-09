import { useState } from 'react'
import { FiArrowRight, FiMail, FiMapPin, FiMessageSquare, FiPhone, FiSend, FiUser, FiLayers } from 'react-icons/fi'

const address = 'No. 73, New NGGO Colony, 4th Cross Street, Adambakkam, Chennai - 600088'
const mapQuery = encodeURIComponent(address)

const contactCards = [
  { icon: FiMail, title: 'Email Address', value: 'hello@sagegfx.com', href: 'mailto:hello@sagegfx.com', detail: <>Do you have any project in mind?<br />Send us an email and we’ll get back<br className="contact-desktop-break" /> to you as soon as possible.</> },
  { icon: FiPhone, title: 'Questions? Call Us!', value: '+91 98765 43210', href: 'tel:+919876543210', detail: <>Monday to Saturday<br />9:00 AM – 6:00 PM<br />Indian Standard Time (IST)</> },
  { icon: FiMapPin, title: 'Our Location', value: <>No. 73, New NGGO Colony,<br />4th Cross Street, Adambakkam,<br />Chennai - 600088</>, detail: 'Please call us for your visit.' },
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
      const response = await fetch('https://formsubmit.co/ajax/hello@sagegfx.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: `Website inquiry from ${data.name}`, _replyto: data.email, _template: 'table' }),
      })
      const result = await response.json()
      if (!response.ok || result.success === false || String(result.success).toLowerCase() === 'false') throw new Error()
      form.reset()
      setStatus('Thanks for reaching out. We’ll be in touch soon.')
    } catch {
      setStatus('We couldn’t send your message right now. Please email hello@sagegfx.com or call +91 98765 43210.')
    } finally { setBusy(false) }
  }

  return <div className="contact-page contact-design" id="contact">
    <div className="contact-design-glow" aria-hidden="true" />
    <section className="contact-design-hero" aria-labelledby="contact-title">
      <p className="contact-kicker"><span />GET IN TOUCH<span /></p>
      <h1 id="contact-title">Contact</h1>
      <p className="contact-hero-copy">A good project starts with a conversation. Tell us what you’re planning and we’ll help you find the right next step.</p>
      <nav className="contact-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><FiArrowRight aria-hidden="true"/><span aria-current="page">Contact</span></nav>
      <div className="contact-hero-art" aria-hidden="true"><span className="contact-hero-orbit contact-hero-orbit--one"/><span className="contact-hero-orbit contact-hero-orbit--two"/><span className="contact-hero-core"><FiSend/><i/></span><span className="contact-hero-chip contact-hero-chip--one">A new idea</span><span className="contact-hero-chip contact-hero-chip--two">Let’s build</span><span className="contact-hero-art-label">IDEAS / DESIGN / IMPACT</span></div>
    </section>

    <section className="contact-details-grid" aria-label="Contact information">
      {contactCards.map(({ icon: Icon, title, value, href, detail }) => <article className="contact-detail-card" key={title}>
        <div className="contact-detail-icon"><Icon aria-hidden="true" /></div>
        <div className="contact-detail-copy"><h2>{title}</h2><p className="contact-detail-value">{href ? <a href={href}>{value}</a> : value}</p><span className="contact-short-rule"/><p className="contact-detail-note">{detail}</p></div>
      </article>)}
    </section>

    <section className="contact-main-grid" aria-label="Find us or send a message">
      <div className="contact-map-panel">
        <iframe title="Map showing Sage GFX in Adambakkam, Chennai" src={`https://maps.google.com/maps?hl=en&q=${mapQuery}&z=14&ie=UTF8&iwloc=B&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        <a className="contact-map-link" href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer"><FiMapPin aria-hidden="true"/> View on Google Maps <FiArrowRight aria-hidden="true"/></a>
      </div>

      <div className="contact-form-panel">
        <p className="contact-form-kicker"><span/> START YOUR PROJECT</p>
        <h2>Send Us a <span>Message</span></h2>
        <p className="contact-form-intro">Fill out the form below and we’ll get back to you shortly.</p>
        <form className="contact-design-form" onSubmit={handleSubmit}>
          <label className="contact-field"><FiUser aria-hidden="true"/><span className="sr-only">Full Name *</span><input name="name" autoComplete="name" placeholder="Full Name *" required /></label>
          <label className="contact-field"><FiMail aria-hidden="true"/><span className="sr-only">Email Address *</span><input name="email" type="email" autoComplete="email" placeholder="Email Address *" required /></label>
          <label className="contact-field"><FiPhone aria-hidden="true"/><span className="sr-only">Phone Number</span><input name="phone" type="tel" autoComplete="tel" placeholder="Phone Number" /></label>
          <label className="contact-field"><FiLayers aria-hidden="true"/><span className="sr-only">Select Service *</span><select name="service" defaultValue="" required><option value="" disabled>Select Service *</option><option>Design &amp; Branding</option><option>Web &amp; App Development</option><option>Digital Marketing</option><option>Social Media Management</option><option>SEO</option></select></label>
          <label className="contact-field contact-message-field"><FiMessageSquare aria-hidden="true"/><span className="sr-only">Message *</span><textarea name="message" placeholder="Tell us about your project... *" rows="4" required /></label>
          <button className="contact-submit" type="submit" disabled={busy}><FiSend aria-hidden="true"/>{busy ? 'SENDING…' : 'SUBMIT NOW'}</button>
          {status && <p className="contact-form-status" role="status">{status}</p>}
        </form>
      </div>
    </section>
  </div>
}

export default ContactPage
