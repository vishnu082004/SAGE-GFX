import { Link } from 'react-router-dom'
import { FiArrowRight, FiBriefcase, FiFacebook, FiGrid, FiHome, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiShield, FiUser, FiYoutube } from 'react-icons/fi'
import BrandMark from './BrandMark'

const quickLinks = [
  ['Home', '/', FiHome],
  ['About', '/about', FiUser],
  ['Services', '/services', FiGrid],
  ['Careers', '/careers', FiBriefcase],
  ['Contact', '/contact', FiMail],
]

const officeAddress = 'No. 73, New NGGO Colony, 4th Cross Street, Adambakkam, Chennai - 600088'
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeAddress)}`

function Footer() {
  return <footer className="footer footer-premium footer-minimal">
    <div className="footer-minimal-inner">
      <Link to="/" className="footer-signature-display" aria-label="Sage GFX home">
        <BrandMark className="footer-signature-logo" variant="footer" aria-hidden="true" />
        <span className="footer-signature-wordmark"><b>SAGE</b> <i>GFX</i></span>
      </Link>
      <nav className="footer-minimal-links" aria-label="Quick links">
        {quickLinks.map(([label, to, Icon]) => <Link key={label} to={to}><Icon aria-hidden="true"/><span>{label}</span><FiArrowRight aria-hidden="true"/></Link>)}
      </nav>
      <div className="footer-minimal-bottom">
        <span className="footer-minimal-copyright">© {new Date().getFullYear()} Sage GFX</span>
        <Link className="footer-minimal-privacy" to="/privacy-policy">Privacy policy</Link>
        <nav className="footer-minimal-socials" aria-label="Social media">
          <a href="https://www.instagram.com/sagegfxdigi?xtok=YTNiMXg2ZmZ5YnJs" target="_blank" rel="noreferrer" aria-label="Sage GFX on Instagram"><FiInstagram aria-hidden="true" /></a>
          <a href="https://www.linkedin.com/company/sage-gfx-digital-solutions/" target="_blank" rel="noreferrer" aria-label="Sage GFX on LinkedIn"><FiLinkedin aria-hidden="true" /></a>
          <a href="https://www.facebook.com/share/1H4qBACQgL/" target="_blank" rel="noreferrer" aria-label="Sage GFX on Facebook"><FiFacebook aria-hidden="true" /></a>
          <a href="https://youtube.com/@sagegfxdigi?si=sNysBzNMVeGizr1V" target="_blank" rel="noreferrer" aria-label="Sage GFX on YouTube"><FiYoutube aria-hidden="true" /></a>
          <a href={mapUrl} target="_blank" rel="noreferrer" aria-label={`Sage GFX office location: ${officeAddress}`}><FiMapPin aria-hidden="true" /></a>
        </nav>
      </div>
    </div>
  </footer>
}

export default Footer
