import { Link } from 'react-router-dom'
import { FiArrowRight, FiBriefcase, FiFacebook, FiGrid, FiHome, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiShield, FiUser, FiYoutube } from 'react-icons/fi'
import { studioAddress, studioMapUrl } from '../data/contactInfo'

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
        <img src="/images/sage-gfx-infinity-watermark.webp" className="footer-signature-logo" alt="" aria-hidden="true" />
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
          <a href={studioMapUrl} target="_blank" rel="noreferrer" aria-label={`Sage GFX office location: ${studioAddress}`}><FiMapPin aria-hidden="true" /></a>
        </nav>
      </div>
    </div>
  </footer>
}

export default Footer
