import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Lightbox from './components/Lightbox'
import ScrollReveal from './components/ScrollReveal'
import SageAI from './components/SageAI'

import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import CareersPage from './pages/CareersPage'
import PortfolioPage from './pages/PortfolioPage'
import BlogPage from './pages/BlogPage'
import BlogArticlePage from './pages/BlogArticlePage'
import blogArticles from './data/blogArticles'
import TermsPage from './pages/TermsPage'
import SitemapPage from './pages/SitemapPage'

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
import './styles/careers-teams.css'
import './styles/blog-pages.css'
import './styles/portfolio-page.css'
import './styles/services-page.css'
import './styles/mobile-polish.css'
import './styles/contact-page-finishing.css'
import './styles/scroll-reveal-motion.css'

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
      '/': ['Sage GFX Digital Studio | Web Design, SEO & Digital Marketing in Chennai', 'Sage GFX is a Chennai digital studio for website development, SEO, branding and digital marketing. Build a stronger online presence with a team in Tambaram, Chennai.'],
      '/about': ['About | Sage GFX Digital Studio', 'Meet Sage GFX, a digital creative studio combining strategy, design and technology to help ambitious brands grow.'],
      '/about-us': ['About | Sage GFX Digital Studio', 'Meet Sage GFX, a digital creative studio combining strategy, design and technology to help ambitious brands grow.'],
      '/services': ['Services | Sage GFX Digital Studio', 'Explore Sage GFX services in web development, UI/UX design, branding, SEO and digital marketing.'],
      '/portfolio': ['Our Projects | Sage GFX Digital Studio', 'Explore selected branding, web design and digital marketing projects by Sage GFX.'],
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

function App() {
  const [lightboxImage, setLightboxImage] = useState(null)

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
        <Routes>
          <Route path="/" element={<Home openLightbox={openLightbox} />} />
          <Route path="/about" element={<AboutPage openLightbox={openLightbox} />} />
          <Route path="/about-us" element={<AboutPage openLightbox={openLightbox} />} />
          <Route path="/services" element={<ServicesPage openLightbox={openLightbox} />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
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
      </main>

      <Footer />
      <SageAI />

      {/* Global Image Lightbox Modal */}
      <Lightbox image={lightboxImage} onClose={closeLightbox} />
    </div>
  )
}

export default App
