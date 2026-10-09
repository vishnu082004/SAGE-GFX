import { useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'

const recipient = 'hello@sagegfx.com'

function HeroEnquiryForm() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', mobile: '', message: '' })
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  const submit = async (event) => {
    event.preventDefault()
    setSending(true)
    setStatus(null)
    try {
      const name = `${form.firstName} ${form.lastName}`.trim()
      const response = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Website enquiry from ${name}`,
          _replyto: form.email,
          _template: 'table',
          name,
          email: form.email,
          mobile: form.mobile,
          message: form.message,
        }),
      })
      const result = await response.json()
      if (!response.ok || result.success === false || String(result.success).toLowerCase() === 'false') {
        throw new Error(result.message || 'Your enquiry could not be sent. Please try again.')
      }
      setForm({ firstName: '', lastName: '', email: '', mobile: '', message: '' })
      setStatus({ type: 'success', message: 'Thank you. We’ll be in touch soon.' })
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to send your enquiry right now. Please try again.' })
    } finally {
      setSending(false)
    }
  }

  return <section className="hero-enquiry" aria-labelledby="hero-enquiry-heading">
    <h2 id="hero-enquiry-heading">Enquiry Form</h2>
    <form className="hero-enquiry-form" onSubmit={submit}>
      <div className="hero-enquiry-name-row">
        <label><span className="sr-only">First name</span><input name="firstName" autoComplete="given-name" placeholder="First Name" value={form.firstName} onChange={update} required /></label>
        <label><span className="sr-only">Last name</span><input name="lastName" autoComplete="family-name" placeholder="Last Name" value={form.lastName} onChange={update} required /></label>
      </div>
      <label><span className="sr-only">Email</span><input name="email" type="email" autoComplete="email" placeholder="Email" value={form.email} onChange={update} required /></label>
      <label><span className="sr-only">Mobile number</span><input name="mobile" type="tel" autoComplete="tel" placeholder="Mobile Number" value={form.mobile} onChange={update} /></label>
      <label><span className="sr-only">Message</span><textarea name="message" rows="3" placeholder="Message" value={form.message} onChange={update} required /></label>
      <button className="hero-enquiry-submit" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send'} <FiArrowRight aria-hidden="true"/></button>
      {status && <p className={`hero-enquiry-status hero-enquiry-status--${status.type}`} role={status.type === 'error' ? 'alert' : 'status'}>{status.message}</p>}
    </form>
    <p className="hero-enquiry-disclaimer"><strong>Disclaimer:</strong> All projects are quoted individually based on scope, deliverables, and timeline. Contact us for a custom proposal tailored to your business needs.</p>
  </section>
}

export default HeroEnquiryForm
