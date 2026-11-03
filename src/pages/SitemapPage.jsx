import { Link } from 'react-router-dom'
import servicesData from '../data/services'
import blogArticles from '../data/blogArticles'

const mainPages = [
  ['Home', '/'],
  ['About Us', '/about'],
  ['Services', '/services'],
  ['Our Projects', '/our-projects'],
  ['Case Studies', '/case-studies'],
  ['Our Clients', '/clients'],
  ['Careers', '/careers'],
  ['Studio Journal', '/blog'],
  ['Contact Us', '/contact'],
]

const legalPages = [
  ['Privacy Policy', '/privacy-policy'],
  ['Terms of Service', '/terms-of-service'],
]

function SitemapPage() {
  return (
    <div className="sitemap-page">
      <section className="page-hero">
        <div className="container">
          <p className="page-hero-eyebrow">FIND YOUR WAY AROUND</p>
          <h1 className="page-hero-title">Site <span className="gradient-text">map.</span></h1>
        </div>
      </section>

      <section className="page-section" style={{ padding: '60px 0 100px' }}>
        <div className="container" style={{ display: 'grid', gap: '48px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#f0f5ff' }}>Main Pages</h2>
            <nav className="sitemap-links" style={{ paddingTop: 0, paddingBottom: 0 }} aria-label="Main Pages">
              {mainPages.map(([label, to]) => (
                <Link key={to} to={to}>{label}<span aria-hidden="true">↗</span></Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#f0f5ff' }}>Services</h2>
            <nav className="sitemap-links" style={{ paddingTop: 0, paddingBottom: 0 }} aria-label="Services">
              {servicesData.map((service) => (
                <Link key={service.slug} to={`/services/${service.slug.trim()}`}>
                  {service.title}<span aria-hidden="true">↗</span>
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#f0f5ff' }}>Studio Journal & Insights</h2>
            <nav className="sitemap-links" style={{ paddingTop: 0, paddingBottom: 0 }} aria-label="Blog Articles">
              {blogArticles.map((article) => (
                <Link key={article.slug} to={`/blog/${article.slug}`}>
                  {article.title}<span aria-hidden="true">↗</span>
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#f0f5ff' }}>Legal & Information</h2>
            <nav className="sitemap-links" style={{ paddingTop: 0, paddingBottom: 0 }} aria-label="Legal Pages">
              {legalPages.map(([label, to]) => (
                <Link key={to} to={to}>{label}<span aria-hidden="true">↗</span></Link>
              ))}
            </nav>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SitemapPage
