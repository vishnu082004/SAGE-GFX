import { Link } from 'react-router-dom'
import { FiArrowRight, FiBriefcase, FiGrid, FiHome, FiMail, FiUser } from 'react-icons/fi'
import BrandMark from './BrandMark'

const quickLinks = [
  ['Home', '/', FiHome],
  ['About', '/about', FiUser],
  ['Services', '/services', FiGrid],
  ['Careers', '/careers', FiBriefcase],
  ['Contact', '/contact', FiMail],
]

function Footer() {
  return <footer className="footer footer-premium footer-minimal">
    <div className="footer-minimal-inner">
      <Link to="/" className="footer-signature-display" aria-label="Sage GFX home">
        <BrandMark className="footer-signature-logo" aria-hidden="true" />
        <span className="footer-signature-wordmark"><b>SAGE</b> <i>GFX</i></span>
      </Link>
      <nav className="footer-minimal-links" aria-label="Quick links">
        {quickLinks.map(([label, to, Icon]) => <Link key={label} to={to}><Icon aria-hidden="true"/><span>{label}</span><FiArrowRight aria-hidden="true"/></Link>)}
      </nav>
      <div className="footer-minimal-bottom">
        <span className="footer-minimal-copyright">© {new Date().getFullYear()} Sage GFX</span>
        <Link className="footer-minimal-privacy" to="/privacy-policy">Privacy policy</Link>
      </div>
    </div>
  </footer>
}

export default Footer
