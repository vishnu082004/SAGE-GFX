import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiArrowRight } from 'react-icons/fi'
import BrandMark from './BrandMark'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    let frame = 0
    const handleScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        const next = window.scrollY > 20
        setIsScrolled((current) => current === next ? current : next)
        frame = 0
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => { window.removeEventListener('scroll', handleScroll); if (frame) window.cancelAnimationFrame(frame) }
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return undefined
    const closeOnEscape = (event) => { if (event.key === 'Escape') setIsMenuOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isMenuOpen])

  // Close mobile drawer whenever route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Let React Router handle page changes. Only scroll when the current page is selected again.
  const handleNavClick = (e, path, hash) => {
    closeMenu()
    if (location.pathname === path && hash) {
      e.preventDefault()
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      } else if (path === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  const navLinks = [
    { label: 'Home', path: '/', hash: '#home' },
    { label: 'About', path: '/about', hash: '#about' },
    { label: 'Services', path: '/services', hash: '#services' },
    { label: 'Our Projects', path: '/portfolio' },
    { label: 'Careers', path: '/careers' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact', hash: '#contact' },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu} aria-label="Sage GFX Digital Solutions Home">
          <BrandMark className="brand-symbol"/><span className="brand-name">Sage GFX<small>Digital Solutions</small></span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={`navbar-link ${isActive(link.path) ? 'active' : ''}`}
              aria-current={isActive(link.path) ? 'page' : undefined}
              onClick={(e) => handleNavClick(e, link.path, link.hash)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Button & Hamburger Toggle */}
        <div className="navbar-actions">
          <Link to="/contact" className="button button-gradient navbar-cta">
            Get Started <FiArrowRight />
          </Link>

          <button
            type="button"
            className="navbar-toggle"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer */}
      <aside id="mobile-navigation" className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} aria-label="Mobile Navigation" aria-hidden={!isMenuOpen}>
        <div className="mobile-nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
              aria-current={isActive(link.path) ? 'page' : undefined}
              onClick={(e) => handleNavClick(e, link.path, link.hash)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mobile-menu-footer">
          <Link to="/contact" className="button button-gradient mobile-cta" onClick={closeMenu}>
            Get Started <FiArrowRight />
          </Link>

          <div className="mobile-contact-snippet">
            <p>Let&apos;s build something that moves your brand forward.</p>
          </div>
        </div>
      </aside>
    </header>
  )
}

export default Navbar
