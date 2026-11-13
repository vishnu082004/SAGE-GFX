import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiArrowRight, FiChevronDown, FiSearch, FiCpu, FiMessageCircle, FiMapPin, FiShare2, FiCalendar, FiEdit3, FiBarChart2, FiTarget, FiLayout, FiSmartphone, FiTool, FiFilm, FiImage } from 'react-icons/fi'
import brandLogo from '../assets/images/sage-gfx-navbar.webp'
import servicesData from '../data/services'

const serviceIconsByMenuKey = {
  'search-engine-optimization': FiSearch,
  'geo-generative-engine-optimization': FiCpu,
  'aeo-answer-engine-optimization': FiMessageCircle,
  'local-seo': FiMapPin,
  'social-media-marketing': FiShare2,
  'content-planning': FiCalendar,
  'content-writing-optimization': FiEdit3,
  'google-ads': FiBarChart2,
  'meta-ads': FiTarget,
  'website-design-development': FiLayout,
  'app-development': FiSmartphone,
  'website-maintenance': FiTool,
  'video-editing': FiFilm,
  'poster-designing': FiImage,
}
const normalizeServiceKey = (value) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
const serviceBySlug = new Map(servicesData.map((service) => [normalizeServiceKey(service.slug), service]))
const serviceAliases = {
  'local-seo': 'seo',
  'content-optimization': 'seo',
  'app-development': 'website-development',
  'google-ads': 'performance-marketing',
  'meta-ads': 'performance-marketing',
  'website-design': 'website-development',
  'website-design-development': 'website-development',
  'website-maintenance': 'website-development',
  'search-engine-optimization': 'seo',
  'geo-generative-engine-optimization': 'geo',
  'aeo-answer-engine-optimization': 'aeo',
  'content-planning': 'social-media-marketing',
  'content-writing-optimization': 'social-media-marketing',
  'logo-design': 'graphic-design-video-editing',
  'brand-identity': 'graphic-design-video-editing',
  'video-editing': 'graphic-design-video-editing',
  'poster-editing': 'graphic-design-video-editing',
  'poster-designing': 'graphic-design-video-editing',
}
const sentenceCase = (value) => {
  return value.trim()
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\b(GEO|AEO) (?=(Generative|Answer)\b)/i, '$1 - ')
    .replace(/\b(seo|aeo|geo)\b/gi, (acronym) => acronym.toUpperCase())
}
const renderServiceTitle = (title) => {
  const expandedAcronym = title.match(/^(GEO|AEO) - (.+)$/)
  if (!expandedAcronym) return title
  const [, acronym, expansion] = expandedAcronym
  return <><span className={`services-mega-acronym services-mega-acronym--${acronym.toLowerCase()}`}>{acronym}</span><span className="services-mega-acronym-separator"> - </span>{expansion}</>
}
const serviceGroups = [
  { title: 'SEO', theme: 'seo', slugs: ['Search Engine Optimization', 'GEO - Generative Engine Optimization', 'AEO - Answer Engine Optimization', 'Local SEO'] },
  { title: 'SMM', theme: 'smm', slugs: ['Social-Media-Marketing', 'Content Planning', 'Content Writing & Optimization'] },
  { title: 'Performance Marketing', theme: 'performance', slugs: ['Google-Ads', 'Meta-Ads'] },
  { title: 'WEB DEVELOPMENT', theme: 'web', slugs: ['Website Design & Development', 'App Development', 'Website Maintenance'] },
  { title: 'Graphic Design and Video Editing', theme: 'creative', slugs: ['Video-Editing', 'Poster Designing'] },
].map((group) => ({
  ...group,
  services: group.slugs.map((label) => {
    const key = normalizeServiceKey(label)
    const service = serviceBySlug.get(key) || serviceBySlug.get(serviceAliases[key])
    if (!service) return null
    return { ...service, menuKey: `${key}-${service.id}`, menuTitle: sentenceCase(label), menuIcon: serviceIconsByMenuKey[key] || FiTarget }
  }).filter(Boolean),
}))
const serviceColumns = [
  [serviceGroups[0]],
  [serviceGroups[1]],
  [serviceGroups[2]],
  [serviceGroups[3]],
  [serviceGroups[4]],
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
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
    setIsMobileServicesOpen(false)
    setIsServicesOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!isServicesOpen) return undefined
    const closeOnEscape = (event) => { if (event.key === 'Escape') setIsServicesOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isServicesOpen])

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsMobileServicesOpen(false)
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
    { label: 'Our Projects', path: '/our-projects' },
    { label: 'Case Studies', path: '/case-studies' },
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
          <img src={brandLogo} alt="Sage GFX Digital Solutions" className="navbar-brand-image" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav" aria-label="Main Navigation">
          {navLinks.map(({ label, path, hash }) => label === 'Services' ? (
            <div
              key={label}
              className={`navbar-services-item${isServicesOpen ? ' is-open' : ''}`}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={(event) => { if (!event.currentTarget.contains(document.activeElement)) setIsServicesOpen(false) }}
              onFocus={() => setIsServicesOpen(true)}
              onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsServicesOpen(false) }}
            >
              <Link
                to={path}
                className={`navbar-link navbar-services-trigger ${isActive(path) ? 'active' : ''}`}
                aria-current={isActive(path) ? 'page' : undefined}
                aria-haspopup="true"
                aria-expanded={isServicesOpen}
                aria-controls="services-mega-menu"
                onClick={(event) => handleNavClick(event, path, hash)}
              >
                {label}<FiChevronDown aria-hidden="true" />
              </Link>
              <div id="services-mega-menu" className="services-mega-menu" aria-label="Services" aria-hidden={!isServicesOpen}>
                <div className="services-mega-columns">
                  {serviceColumns.map((column, columnIndex) => <div className="services-mega-column" key={`service-column-${columnIndex}`}>
                    {column.map((group) => <section className={`services-mega-group services-mega-group--${group.theme}`} key={group.title} aria-label={group.title}>
                      <h4>{group.title}</h4>
                      <div className="services-mega-list">
                        {group.services.map((service) => {
                          const ServiceIcon = service.menuIcon
                          return <Link className="services-mega-link" key={service.menuKey} to={`/services/${service.slug.trim()}`} onClick={closeMenu}>
                            <span className="services-mega-icon" aria-hidden="true"><ServiceIcon /></span>
                            <div className="services-mega-copy"><h4>{renderServiceTitle(service.menuTitle)}</h4></div>
                          </Link>
                        })}
                      </div>
                    </section>)}
                  </div>)}
                </div>
              </div>
            </div>
          ) : (
            <Link
              key={label}
              to={path}
              className={`navbar-link ${isActive(path) ? 'active' : ''}`}
              aria-current={isActive(path) ? 'page' : undefined}
              onClick={(e) => handleNavClick(e, path, hash)}
            >
              {label}
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
          {navLinks.map((link) => link.label === 'Services' ? (
            <div className={`mobile-services-accordion${isMobileServicesOpen ? ' is-open' : ''}`} key={link.label}>
              <button
                type="button"
                className={`mobile-nav-link mobile-services-trigger ${isActive(link.path) ? 'active' : ''}`}
                aria-expanded={isMobileServicesOpen}
                aria-controls="mobile-services-groups"
                onClick={() => setIsMobileServicesOpen((open) => !open)}
              >
                Services <FiChevronDown aria-hidden="true" />
              </button>
              {isMobileServicesOpen && <div id="mobile-services-groups" className="mobile-services-panel">
                <div className="mobile-services-list">
                  {serviceGroups.flatMap((group) => group.services.map((service) => <Link
                    className={`mobile-service-link mobile-service-link--${group.theme}${service.menuTitle.startsWith('GEO -') ? ' mobile-service-link--geo' : ''}`}
                    key={service.menuKey}
                    to={`/services/${service.slug.trim()}`}
                    onClick={closeMenu}
                  ><p>{service.menuTitle}</p></Link>))}
                </div>
              </div>}
            </div>
          ) : (
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
