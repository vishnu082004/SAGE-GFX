import { Link } from 'react-router-dom'

function PrivacyPolicyPage() {
  return <div className="privacy-page"><section className="page-hero"><div className="container"><p className="page-hero-eyebrow">SAGE GFX DIGITAL SOLUTIONS</p><h1 className="page-hero-title">Privacy <span className="gradient-text">Policy</span></h1><div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Privacy Policy</span></div></div></section><section className="page-section"><div className="container privacy-copy"><h2>Information we collect</h2><p>When you contact us through this website, we collect the information you choose to share, such as your name, email address, phone number and project details.</p><h2>How we use your information</h2><p>We use your information to respond to your inquiry, discuss services and provide the support you request. We do not sell your personal information.</p><h2>Contact</h2><p>For questions about this policy or your information, please use our <Link to="/contact">contact page</Link>.</p></div></section></div>
}

export default PrivacyPolicyPage
