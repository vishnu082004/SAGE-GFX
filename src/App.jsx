import { lazy, Suspense, useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import blogArticles from './data/blogArticles'
import servicesData from './data/services'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Lightbox from './components/Lightbox'
import ScrollReveal from './components/ScrollReveal'
const SageAI = lazy(() => import('./components/SageAI'))

const Home = lazy(() => import('./pages/Home'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const CareersPage = lazy(() => import('./pages/CareersPage'))
const OurProjectsPage = lazy(() => import('./pages/OurProjectsPage'))
const ClientsPage = lazy(() => import('./pages/ClientsPage'))
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const SitemapPage = lazy(() => import('./pages/SitemapPage'))
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'))

// Modular stylesheets
import './styles/global.css'
import './styles/navbar.css'
import './styles/hero.css'
import './styles/home-hero.css'
import './styles/about.css'
import './styles/services.css'
import './styles/contact.css'
import './styles/footer.css'
import './styles/responsive.css'
import './styles/pages.css'
import './styles/brand.css'
import './styles/cinematic.css'
import './styles/home-reference.css'
import './styles/polish.css'
import './styles/footer-premium.css'
import './styles/contact-premium.css'
import './styles/hero-inquiry.css'
import './styles/why-choose-orbit.css'
import './styles/site-interactions.css'
import './styles/how-it-works.css'
import './styles/scroll-performance.css'
import './styles/compact-layout.css'
import './styles/client-reviews.css'
import './styles/home-projects.css'
import './styles/common-questions.css'
import './styles/home-hero-motion.css'
import './styles/home-hero-visual.css'
import './styles/sitewide-creative-motion.css'
import './styles/premium-home-motion.css'
import './styles/footer-minimal.css'
import './styles/careers-reference.css'
import './styles/blog-pages.css'
import './styles/our-projects-page.css'
import './styles/services-page.css'
import './styles/mobile-polish.css'
import './styles/contact-page-finishing.css'
import './styles/scroll-reveal-motion.css'
import './styles/hero-brightness.css'
import './styles/hero-height-tuning.css'
import './styles/home-hero-background.css'
import './styles/mobile-audit.css'
import './styles/site-buttons.css'
import './styles/page-hero-centering.css'
import './styles/home-copy-reveal.css'
import './styles/home-view-polish.css'
import './styles/card-icon-feedback.css'
import './styles/contact-body-guide.css'
import './styles/contact-quick-actions.css'
import './styles/paragraph-contrast.css'
import './styles/tablet-optimization.css'
import './styles/aeo-service.css'
import './styles/blog-body-redesign.css'
import './styles/home-hero-final.css'
import './styles/card-image-brightness.css'
import './styles/services-page-mobile-final.css'
import './styles/ipad-views.css'
import './styles/viewport-fit.css'
import './styles/interior-page-heroes.css'
import './styles/tablet-card-grids.css'
import './styles/page-transitions.css'
import './styles/services-hero-refresh.css'
import './styles/service-detail-structure.css'
import './styles/services-ticker.css'
import './styles/service-smm-hero.css'
import './styles/global-typography.css'

// Helper component to scroll to top on route change (unless hash anchor is present)
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      const root = document.documentElement
      const previousScrollBehavior = root.style.scrollBehavior
      root.style.scrollBehavior = 'auto'
      window.scrollTo(0, 0)
      root.style.scrollBehavior = previousScrollBehavior
    } else {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [pathname, hash])

  return null
}

const routePreloaders = [
  [/^\/$/, () => import('./pages/Home')],
  [/^\/(about|about-us)\/?$/, () => import('./pages/AboutPage')],
  [/^\/services\/?$/, () => import('./pages/ServicesPage')],
  [/^\/services\/[^/]+\/?$/, () => import('./pages/ServiceDetailPage')],
  [/^\/(portfolio|our-projects)\/?$/, () => import('./pages/OurProjectsPage')],
  [/^\/clients\/?$/, () => import('./pages/ClientsPage')],
  [/^\/case-studies(?:\/wea-clinic)?\/?$/, () => import('./pages/CaseStudiesPage')],
  [/^\/careers\/?$/, () => import('./pages/CareersPage')],
  [/^\/blog\/?$/, () => import('./pages/BlogPage')],
  [/^\/blog\/[^/]+\/?$/, () => import('./pages/BlogArticlePage')],
  [/^\/(contact|contact-us)\/?$/, () => import('./pages/ContactPage')],
  [/^\/privacy-policy\/?$/, () => import('./pages/PrivacyPolicyPage')],
  [/^\/terms-of-service\/?$/, () => import('./pages/TermsPage')],
  [/^\/sitemap\/?$/, () => import('./pages/SitemapPage')],
]

function RouteIntentPreloader() {
  useEffect(() => {
    const preloadFromLink = (event) => {
      const link = event.target.closest('a[href]')
      if (!link || link.target === '_blank' || event.relatedTarget && link.contains(event.relatedTarget)) return
      const destination = new URL(link.href, window.location.href)
      if (destination.origin !== window.location.origin) return
      const preload = routePreloaders.find(([pattern]) => pattern.test(destination.pathname))?.[1]
      if (preload) void preload().catch(() => {})
    }

    document.addEventListener('pointerover', preloadFromLink, { passive: true })
    document.addEventListener('focusin', preloadFromLink)
    return () => {
      document.removeEventListener('pointerover', preloadFromLink)
      document.removeEventListener('focusin', preloadFromLink)
    }
  }, [])

  return null
}

const siteOrigin = 'https://sagegfx.com'
const defaultShareImage = '/images/hero.webp'
const pageMetadata = {
  '/': ['Digital Marketing Agency in Chennai | Sage GFX', 'Sage GFX helps Chennai businesses grow with SEO, social media marketing, web development, branding and performance marketing.'],
  '/about': ['About Sage GFX | Digital Studio in Chennai', 'Meet Sage GFX, a Chennai digital studio bringing strategy, design and technology together to help businesses grow online.'],
  '/services': ['Digital Marketing Services in Chennai | Sage GFX', 'Explore SEO, social media, web development, branding, video and digital marketing services from Sage GFX in Chennai.'],
  '/our-projects': ['Digital Projects & Portfolio | Sage GFX', 'Explore Sage GFX projects across web design, development, branding and digital marketing.'],
  '/clients': ['Our Clients | Sage GFX Digital Studio', 'Meet the businesses and brands that work with Sage GFX on creative, web and digital marketing projects.'],
  '/case-studies': ['Local SEO Case Study | Siddha Clinic | Sage GFX', 'See how Sage GFX improved local search visibility and helped a Siddha clinic generate more than 60 calls in three months.'],
  '/careers': ['Careers at Sage GFX | Join Our Studio', 'Explore current opportunities and learn about the people, process and work culture at Sage GFX Digital Studio.'],
  '/blog': ['Digital Marketing Insights | Sage GFX Journal', 'Read practical ideas from Sage GFX on SEO, branding, web design, social media and growing a business online.'],
  '/contact': ['Contact Sage GFX | Chennai Digital Studio', 'Contact Sage GFX in Chennai to discuss SEO, design, web development or your next digital marketing project.'],
  '/privacy-policy': ['Privacy Policy | Sage GFX', 'Read how Sage GFX collects, uses and protects information shared through this website.'],
  '/terms-of-service': ['Terms of Service | Sage GFX', 'Review the terms that guide project scope, delivery, communication and fees for Sage GFX services.'],
  '/sitemap': ['Sitemap | Sage GFX Digital Studio', 'Browse the pages, services, projects and articles available on the Sage GFX Digital Studio website.'],
}
const canonicalPaths = { '/about-us': '/about', '/portfolio': '/our-projects', '/contact-us': '/contact' }

function setMetaContent(selector, attribute, value) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    const [, key, content] = selector.match(/\[(name|property)="([^"]+)"\]/) || []
    if (key && content) element.setAttribute(key, content)
    document.head.append(element)
  }
  element.setAttribute(attribute, value)
}

function makeBrandedTitle(subject, brand) {
  const suffix = ` | ${brand}`
  const maxSubjectLength = 60 - suffix.length
  const titleSubject = subject.length <= maxSubjectLength
    ? subject
    : `${subject.slice(0, maxSubjectLength - 1).replace(/\s+\S*$/, '')}…`
  return `${titleSubject}${suffix}`
}

function RouteDocumentTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    const route = pathname.replace(/\/$/, '') || '/'
    const serviceSlug = route.match(/^\/services\/([^/]+)$/)?.[1]
    const service = serviceSlug && servicesData.find((item) => item.slug === serviceSlug)
    const blogArticle = route.startsWith('/blog/')
      ? blogArticles.find((article) => route === `/blog/${article.slug}`)
      : null
    const isAlias = Object.hasOwn(canonicalPaths, route)
    const canonicalPath = canonicalPaths[route] || route
    const page = pageMetadata[canonicalPath]
    const title = service
      ? makeBrandedTitle(service.seoTitle || service.title, 'Sage GFX')
      : blogArticle
        ? makeBrandedTitle(blogArticle.seoTitle || blogArticle.title, 'Sage GFX Journal')
        : page?.[0] || 'Page not found | Sage GFX Digital Studio'
    const rawDescription = service?.metaDescription || service?.description || blogArticle?.metaDescription || blogArticle?.summary || page?.[1] || 'The requested page could not be found on the Sage GFX Digital Studio website.'
    const cleanDescription = rawDescription.replace(/\s+/g, ' ').trim()
    const description = cleanDescription.length <= 160
      ? cleanDescription
      : `${cleanDescription.slice(0, 157).replace(/\s+\S*$/, '')}…`
    const shareImage = blogArticle?.image || service?.image || defaultShareImage
    const absoluteImage = new URL(shareImage, siteOrigin).href
    const canonicalUrl = new URL(canonicalPath, siteOrigin).href

    document.title = title
    setMetaContent('meta[name="description"]', 'content', description)
    setMetaContent('meta[name="robots"]', 'content', isAlias ? 'noindex, follow' : (page || service || blogArticle ? 'index, follow, max-image-preview:large' : 'noindex, follow'))
    setMetaContent('meta[property="og:title"]', 'content', title)
    setMetaContent('meta[property="og:description"]', 'content', description)
    setMetaContent('meta[property="og:type"]', 'content', blogArticle ? 'article' : 'website')
    setMetaContent('meta[property="og:url"]', 'content', canonicalUrl)
    setMetaContent('meta[property="og:image"]', 'content', absoluteImage)
    setMetaContent('meta[property="og:image:alt"]', 'content', `${title} | Sage GFX Digital Studio`)
    setMetaContent('meta[name="twitter:card"]', 'content', 'summary_large_image')
    setMetaContent('meta[name="twitter:title"]', 'content', title)
    setMetaContent('meta[name="twitter:description"]', 'content', description)
    setMetaContent('meta[name="twitter:image"]', 'content', absoluteImage)
    setMetaContent('meta[name="twitter:image:alt"]', 'content', `${title} | Sage GFX Digital Studio`)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.append(canonical)
    }
    canonical.href = canonicalUrl
  }, [pathname])

  return null
}

function ScrollMotionManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    let idleTimer = 0
    let frame = 0
    const animatedSections = document.querySelectorAll('.sage-hero, .about, .home-services, .why-choose--orbit, .how-it-works, .client-reviews, .home-cta, .footer-premium')
    const visibility = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('motion-paused', !entry.isIntersecting))
    }, { rootMargin: '120px 0px', threshold: 0 }) : null
    animatedSections.forEach((section) => visibility?.observe(section))

    const markScrolling = () => {
      if (!document.documentElement.classList.contains('is-scrolling')) {
        if (frame) return
        frame = window.requestAnimationFrame(() => {
          document.documentElement.classList.add('is-scrolling')
          frame = 0
        })
      }
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => {
        document.documentElement.classList.remove('is-scrolling')
      }, 180)
    }

    window.addEventListener('scroll', markScrolling, { passive: true })
    return () => {
      window.removeEventListener('scroll', markScrolling)
      window.clearTimeout(idleTimer)
      if (frame) window.cancelAnimationFrame(frame)
      document.documentElement.classList.remove('is-scrolling')
      visibility?.disconnect()
      animatedSections.forEach((section) => section.classList.remove('motion-paused'))
    }
  }, [pathname])

  return null
}

function NotFoundPage() {
  return <section className="page-hero"><div className="container"><p className="page-hero-eyebrow">404 / PAGE NOT FOUND</p><h1 className="page-hero-title">This page took<br/><span className="gradient-text">a wrong turn.</span></h1><Link className="button button-gradient" to="/">Back to home</Link></div></section>
}

function RouteLoadingFallback() {
  return <div className="route-loading" role="status" aria-live="polite" aria-label="Loading page">
    <span className="route-loading__mark" aria-hidden="true">S</span>
    <span className="route-loading__track" aria-hidden="true"><span /></span>
  </div>
}

function App() {
  const [lightboxImage, setLightboxImage] = useState(null)
  const { pathname } = useLocation()
  const showInitialHomeInquiryRef = useRef(typeof window !== 'undefined' && window.location.pathname === '/')
  if (pathname !== '/') showInitialHomeInquiryRef.current = false
  const isContactPage = pathname === '/contact' || pathname === '/contact-us'

  const openLightbox = (img) => setLightboxImage(img)
  const closeLightbox = () => setLightboxImage(null)

  return (
    <div className="site-wrapper">
      <ScrollToTop />
      <RouteIntentPreloader />
      <RouteDocumentTitle />
      <ScrollMotionManager />
      <ScrollReveal />
      <Navbar />

      <main className="main-content" key={pathname}>
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home openLightbox={openLightbox} showInitialHomeInquiry={showInitialHomeInquiryRef.current} />} />
            <Route path="/about" element={<AboutPage openLightbox={openLightbox} />} />
            <Route path="/about-us" element={<AboutPage openLightbox={openLightbox} />} />
            <Route path="/services" element={<ServicesPage openLightbox={openLightbox} />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/portfolio" element={<OurProjectsPage />} />
            <Route path="/our-projects" element={<OurProjectsPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/case-studies/wea-clinic" element={<Navigate replace to="/case-studies" />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogArticlePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <Suspense fallback={null}>
        {!isContactPage && <SageAI />}
      </Suspense>
      {isContactPage && <div className="contact-quick-actions" aria-label="Quick contact">
        <a className="contact-quick-action contact-quick-action--phone" href="tel:+918778914009" aria-label="Call Sage GFX"><FiPhone aria-hidden="true" /></a>
        <a className="contact-quick-action contact-quick-action--whatsapp" href="https://wa.me/918778914009" target="_blank" rel="noreferrer" aria-label="Chat with Sage GFX on WhatsApp"><FaWhatsapp aria-hidden="true" /></a>
      </div>}

      {/* Global Image Lightbox Modal */}
      <Lightbox image={lightboxImage} onClose={closeLightbox} />
    </div>
  )
}

export default App

