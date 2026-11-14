import { lazy, Suspense, useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import blogArticles from './data/blogArticles'
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

// Helper component to scroll to top on route change (unless hash anchor is present)
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
    } else {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [pathname, hash])

  return null
}

function RouteDocumentTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    const pages = {
      '/': ['Digital Marketing Agency in Chennai | Sage GFX Digital Solutions', 'Sage GFX is a results-driven digital marketing agency in Chennai offering SEO, Google Ads, social media marketing and web solutions to grow your business online.'],
      '/about': ['About SAGE GFX | Creative Digital Agency in Chennai', 'Discover SAGE GFX, a creative digital agency in Chennai specializing in branding, graphic design, SEO, social media marketing, and website development.'],
      '/about-us': ['About SAGE GFX | Creative Digital Agency in Chennai', 'Discover SAGE GFX, a creative digital agency in Chennai specializing in branding, graphic design, SEO, social media marketing, and website development.'],
      '/services': ['Services | Sage GFX Digital Studio', 'Explore Sage GFX services in web development, UI/UX design, branding, SEO and digital marketing.'],
      '/portfolio': ['Our Projects | SAGE GFX', 'Explore creative projects that bring brands to life through thoughtful design, strategic digital marketing, and modern technology.'],
      '/our-projects': ['Our Projects | SAGE GFX', 'Explore creative projects that bring brands to life through thoughtful design, strategic digital marketing, and modern technology.'],
      '/clients': ['Our Clients | SAGE GFX', 'Meet some of the ambitious brands Sage GFX works alongside across creative, web, and digital marketing projects.'],
      '/case-studies': ['Siddha Clinic Case Study | Sage GFX', 'Explore how Sage GFX combined SEO, local search, and performance marketing to grow Siddha Clinic’s organic visibility and patient enquiries.'],
      '/careers': ['Careers | Sage GFX Digital Studio', 'Explore opportunities and apply to join the Sage GFX Digital Studio team.'],
      '/blog': ['Studio Journal | Sage GFX Digital Studio', 'Ideas and practical notes on branding, technology and growing well online.'],
      '/contact': ['Contact | Sage GFX Digital Studio', 'Tell Sage GFX about your next idea and start a conversation with our digital studio.'],
      '/contact-us': ['Contact | Sage GFX Digital Studio', 'Tell Sage GFX about your next idea and start a conversation with our digital studio.'],
      '/privacy-policy': ['Privacy Policy | Sage GFX Digital Studio', 'Learn how Sage GFX handles information shared through this website.'],
      '/terms-of-service': ['Terms of Service | Sage GFX Digital Studio', 'Review how project scope, delivery schedules and fees are agreed with Sage GFX clients.'],
      '/sitemap': ['Sitemap | Sage GFX Digital Studio', 'Browse all pages on the Sage GFX Digital Studio website.'],
    }
    const blogArticle = pathname.startsWith('/blog/') ? blogArticles.find((article) => pathname === `/blog/${article.slug}`) : null
    const [title, description] = blogArticle
      ? [`${blogArticle.title} | Sage GFX Journal`, blogArticle.summary]
      : pages[pathname] || ['Page not found | Sage GFX Digital Studio', pages['/'][1]]
    document.title = title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.content = description
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.content = title
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) ogDescription.content = description
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
  return <div className="route-loading" role="status" aria-live="polite">Loading page…</div>
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
      <RouteDocumentTitle />
      <ScrollMotionManager />
      <ScrollReveal />
      <Navbar />

      <main className="main-content">
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

