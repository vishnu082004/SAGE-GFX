import { useState } from 'react'
import { FiArrowRight, FiBriefcase, FiCheckCircle, FiMail, FiMapPin, FiPhone, FiSend, FiUser } from 'react-icons/fi'

function CareersPage() {
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function submitApplication(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setSubmitting(true)
    setStatus('')
    try {
      const response = await fetch('https://formsubmit.co/ajax/hello@sagegfx.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: `Career application: ${data.role}`, _replyto: data.email, _template: 'table' }),
      })
      const result = await response.json()
      if (!response.ok || result.success === false || String(result.success).toLowerCase() === 'false') throw new Error()
      form.reset()
      setStatus('Application received. The Sage GFX team will be in touch if there’s a fit.')
    } catch {
      setStatus('We couldn’t send your application. Please email hello@sagegfx.com and include your details.')
    } finally { setSubmitting(false) }
  }

  return <main className="careers-page">
    <section className="careers-hero" aria-labelledby="careers-title">
      <div className="careers-hero-orbit" aria-hidden="true" />
      <p className="careers-eyebrow"><span /> GROW WITH SAGE GFX <span /></p>
      <h1 id="careers-title">Make good work.<br/><span>With good people.</span></h1>
      <p className="careers-hero-copy">Bring your ideas, craft, and curiosity. Let’s make thoughtful digital experiences that move businesses forward.</p>
      <a className="careers-hero-link" href="#apply">Explore opportunities <FiArrowRight aria-hidden="true" /></a>
      <div className="careers-hero-meta"><span><FiMapPin aria-hidden="true"/> Chennai, India</span><span><FiBriefcase aria-hidden="true"/> Collaborative by design</span></div>
    </section>
    <section className="careers-content" aria-label="Careers at Sage GFX">
      <div className="careers-intro">
        <p className="careers-section-label">A SMALL STUDIO WITH BIG IDEAS</p>
        <h2>Build what’s <span>next.</span></h2>
        <p>We’re always glad to meet thoughtful designers, developers, and digital thinkers. Tell us what you do best, what you’d love to work on, and how you could make an impact here.</p>
        <div className="careers-note"><span className="careers-note-mark">S</span><p><strong>No role that fits?</strong><br/>Send us a note anyway. Great people can shape the role they’re looking for.</p></div>
      </div>
      <section className="careers-application" id="apply" aria-labelledby="apply-title">
        <p className="careers-section-label"><span/> JOIN THE STUDIO</p>
        <h2 id="apply-title">Start a conversation</h2>
        <p className="careers-form-intro">Share a few details and a link to your work. We’ll take it from there.</p>
        <form className="careers-form" onSubmit={submitApplication}>
          <label className="careers-field"><FiUser aria-hidden="true"/><span className="sr-only">Full name</span><input name="name" placeholder="Full name *" autoComplete="name" required /></label>
          <label className="careers-field"><FiMail aria-hidden="true"/><span className="sr-only">Email address</span><input name="email" type="email" placeholder="Email address *" autoComplete="email" required /></label>
          <label className="careers-field"><FiPhone aria-hidden="true"/><span className="sr-only">Phone number</span><input name="phone" type="tel" placeholder="Phone number" autoComplete="tel" /></label>
          <label className="careers-field careers-role-field"><FiBriefcase aria-hidden="true"/><span className="sr-only">Area of interest</span><select name="role" defaultValue="" required><option value="" disabled>Area of interest *</option><option>Design &amp; Branding</option><option>Web &amp; App Development</option><option>Digital Marketing</option><option>Social Media Management</option><option>SEO</option><option>Other / Open application</option></select></label>
          <label className="careers-field careers-url-field"><span className="careers-link-icon" aria-hidden="true">↗</span><span className="sr-only">Portfolio or LinkedIn link</span><input name="portfolio" type="url" placeholder="Portfolio or LinkedIn URL *" required /></label>
          <label className="careers-field careers-message-field"><span className="sr-only">A note about you</span><textarea name="message" rows="4" placeholder="A little about you and the work you enjoy... *" required /></label>
          <button className="careers-submit" type="submit" disabled={submitting}><FiSend aria-hidden="true"/>{submitting ? 'SENDING…' : 'SUBMIT APPLICATION'}</button>
          {status && <p className="careers-status" role="status"><FiCheckCircle aria-hidden="true"/>{status}</p>}
        </form>
      </section>
    </section>
  </main>
}

export default CareersPage
