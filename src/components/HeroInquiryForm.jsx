import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FiArrowRight, FiCheckCircle, FiSend, FiX } from 'react-icons/fi'
import { submitContactForm } from '../data/contactInfo'

function HeroInquiryForm() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', service: '', message: '' })
  const [status, setStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)
  const dialogRef = useRef(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setPopupOpen(true), 3000)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!popupOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.querySelector('input')?.focus()
    const closeOnEscape = (event) => { if (event.key === 'Escape') setPopupOpen(false) }
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = previousOverflow
    }
  }, [popupOpen])

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const submit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus(null)
    try {
      await submitContactForm({ ...form, _subject: `Website inquiry from ${form.name}`, _replyto: form.email, _template: 'table' })
      setStatus({ type: 'success', message: 'Thanks! Your project note is on its way.' })
      setForm({ name: '', email: '', mobile: '', service: '', message: '' })
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'We could not send your message. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formCard = <aside className="hero-inquiry" aria-labelledby="hero-inquiry-heading">
    <div className="hero-inquiry-orbit" aria-hidden="true"><i/><i/><i/></div>
    <div className="hero-inquiry-head">
      <span className="hero-inquiry-kicker"><i/> START A PROJECT <i/></span>
      <h2 id="hero-inquiry-heading">Let&apos;s build<br/><span>something bold.</span></h2>
      <p>Tell us a little about your idea. We&apos;ll help you find the right next step.</p>
    </div>
    <form className="hero-inquiry-form" onSubmit={submit}>
      <div className="hero-inquiry-fields">
        <div className="hero-inquiry-field"><label htmlFor="hero-inquiry-name">Your name</label><input id="hero-inquiry-name" name="name" value={form.name} onChange={update} placeholder="Jane Smith" autoComplete="name" required /></div>
        <div className="hero-inquiry-field"><label htmlFor="hero-inquiry-email">Email address</label><input id="hero-inquiry-email" name="email" type="email" value={form.email} onChange={update} placeholder="you@company.com" autoComplete="email" required /></div>
        <div className="hero-inquiry-field hero-inquiry-field--phone"><label htmlFor="hero-inquiry-mobile">Phone number</label><input id="hero-inquiry-mobile" name="mobile" type="tel" value={form.mobile} onChange={update} placeholder="+1 555 000 0000" autoComplete="tel" /></div>
        <div className="hero-inquiry-field hero-inquiry-field--services"><label htmlFor="hero-inquiry-service">Our services</label><select id="hero-inquiry-service" name="service" value={form.service} onChange={update} required aria-label="Choose the service"><option value="" disabled>Choose the service</option><option>Digital Marketing</option><option>Website Development</option><option>Web App Development</option><option>Search Engine Optimization</option><option>Social Media Marketing</option><option>Branding &amp; Identity</option><option>Graphic Design</option><option>Video Production</option><option>Influencer Marketing</option><option>App Development</option></select></div>
        <div className="hero-inquiry-field hero-inquiry-field--message"><label htmlFor="hero-inquiry-message">What are you looking to create?</label><textarea id="hero-inquiry-message" name="message" value={form.message} onChange={update} placeholder="A website, campaign, new brand…" rows="3" required /></div>
      </div>
      <button type="submit" disabled={isSubmitting} className="hero-inquiry-submit">
        <span>{isSubmitting ? 'Sending your idea…' : 'Send an inquiry'}</span><i><FiArrowRight aria-hidden="true"/></i>
      </button>
      <div className="hero-inquiry-response" aria-live="polite">
        {status ? <span className={`hero-inquiry-status hero-inquiry-status--${status.type}`}>{status.type === 'success' && <FiCheckCircle aria-hidden="true"/>}{status.message}</span> : <span><FiSend aria-hidden="true"/> Usually replies within one business day</span>}
      </div>
    </form>
  </aside>

  if (!popupOpen) return null
  return createPortal(<div className="hero-inquiry-modal" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPopupOpen(false) }}>
    <div ref={dialogRef} className="hero-inquiry-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="hero-inquiry-heading">
      <button className="hero-inquiry-modal-close" type="button" onClick={() => setPopupOpen(false)} aria-label="Close inquiry form"><FiX/></button>
      {formCard}
    </div>
  </div>, document.body)
}

export default HeroInquiryForm
