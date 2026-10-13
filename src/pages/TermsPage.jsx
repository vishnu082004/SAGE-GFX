import { Link } from 'react-router-dom'
import { contactEmail } from '../data/contactInfo'

function TermsPage() {
  return <div className="terms-page"><section className="page-hero"><div className="container"><p className="page-hero-eyebrow">SAGE GFX DIGITAL STUDIO</p><h1 className="page-hero-title">Terms of <span className="gradient-text">service</span></h1></div></section><section className="page-section"><div className="container privacy-copy"><h2>Project terms</h2><p>The scope, schedule, fees and delivery terms for Sage GFX services are agreed with each client in a written proposal or service agreement before work begins.</p><h2>Questions</h2><p>For the terms that apply to a proposed project, contact us at <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p></div></section></div>
}

export default TermsPage
