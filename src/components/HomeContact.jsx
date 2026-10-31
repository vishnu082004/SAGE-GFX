import { useState } from 'react'
import { FiArrowRight, FiCheckCircle, FiMail, FiPhone } from 'react-icons/fi'
import { contactEmail, contactPhone, contactPhoneLink, submitContactForm } from '../data/contactInfo'
import '../styles/home-new-sections.css'

function HomeContact() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', message: '' })
  const [status, setStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  const submit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus(null)
    try {
      await submitContactForm({ ...form, _subject: `Website inquiry from ${form.name}`, _replyto: form.email, _template: 'table' })
      setStatus({ type: 'success', message: 'Thanks! Your inquiry has been sent. We’ll be in touch soon.' })
      setForm({ name: '', email: '', mobile: '', message: '' })
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'We could not send your message. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return <section className="home-contact" id="contact" aria-labelledby="home-contact-title">
    <div className="home-contact-inner">
      <div className="home-contact-form-column">
        <div className="home-contact-copy">
          <p className="home-new-section-eyebrow">HAVE A PROJECT IN MIND?</p>
          <h2 id="home-contact-title">Let&apos;s make your next move <span>count.</span></h2>
          <p>Tell us what you are working toward. We&apos;ll help you find a practical way to get there.</p>
        </div>
        <form className="home-contact-form" onSubmit={submit}>
          <label>Your name<input name="name" value={form.name} onChange={updateField} autoComplete="name" placeholder="Full name" required /></label>
          <label>Email address<input name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" placeholder="you@example.com" required /></label>
          <label className="home-contact-form-wide">Mobile number<input name="mobile" type="tel" value={form.mobile} onChange={updateField} autoComplete="tel" placeholder="+91 98765 43210" required /></label>
          <label className="home-contact-form-wide">How can we help?<textarea name="message" value={form.message} onChange={updateField} placeholder="Tell us a little about your project" rows="3" required /></label>
          <button className="home-contact-cta home-contact-form-wide" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending…' : 'Send inquiry'} <FiArrowRight aria-hidden="true" />
          </button>
          <p className={`home-contact-status${status ? ` is-${status.type}` : ''}`} aria-live="polite">
            {status?.type === 'success' && <FiCheckCircle aria-hidden="true" />}{status?.message || 'Your details are only used to respond to this inquiry.'}
          </p>
        </form>
      </div>
      <div className="home-contact-details">
        <p className="home-contact-details-eyebrow">CONTACT OUR TEAM</p>
        <h3>We&apos;re ready to listen.</h3>
        <p>Choose the way that works best for you, and we&apos;ll help you take the next step.</p>
        <a href={contactPhoneLink}><FiPhone aria-hidden="true" /><span><small>Call us</small><strong>{contactPhone}</strong></span></a>
        <a href={`mailto:${contactEmail}`}><FiMail aria-hidden="true" /><span><small>Email us</small><strong>{contactEmail}</strong></span></a>
      </div>
    </div>
  </section>
}

export default HomeContact
