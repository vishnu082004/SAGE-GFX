import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { FiArrowRight, FiBookOpen, FiBriefcase, FiFacebook, FiGrid, FiHome, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiShield, FiUser, FiYoutube } from 'react-icons/fi'
import { studioAddress, studioMapUrl } from '../data/contactInfo'
import footerVideo from '../assets/images/footer video.mp4'

const quickLinks = [
  ['Home', '/', FiHome],
  ['About', '/about', FiUser],
  ['Services', '/services', FiGrid],
  ['Our Projects', '/our-projects', FiBriefcase],
  ['Case Studies', '/case-studies', FiBriefcase],
  ['Blog', '/blog', FiBookOpen],
  ['Careers', '/careers', FiBriefcase],
  ['Contact', '/contact', FiMail],
]

function Footer() {
  const footerVideoRef = useRef(null)

  useEffect(() => {
    const video = footerVideoRef.current
    if (!video || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {})
      else video.pause()
    }, { rootMargin: '120px 0px' })

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return <footer className="footer footer-premium footer-minimal">
    <video ref={footerVideoRef} className="footer-background-video" muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1}>
      <source src={footerVideo} type="video/mp4" />
    </video>
    <div className="footer-minimal-inner">
      <Link to="/" className="footer-signature-display" aria-label="Sage GFX home">
        <img src="/images/sage-gfx-infinity-watermark.webp" className="footer-signature-logo" alt="" aria-hidden="true" />
        <span className="footer-signature-wordmark"><b>SAGE</b> <i>GFX</i></span>
      </Link>
      <nav className="footer-minimal-links" aria-label="Quick links">
        {quickLinks.map(([label, to, Icon]) => <Link key={label} to={to}><Icon aria-hidden="true"/><span>{label}</span><FiArrowRight aria-hidden="true"/></Link>)}
      </nav>
      <div className="footer-minimal-bottom">
        <span className="footer-minimal-copyright">© {new Date().getFullYear()} Sage GFX Digital Studio</span>
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
