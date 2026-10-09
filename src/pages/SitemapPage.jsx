import { Link } from 'react-router-dom'

const pages = [['Home', '/'], ['About', '/about'], ['Services', '/services'], ['Careers', '/careers'], ['Blog', '/blog'], ['Contact', '/contact'], ['Privacy policy', '/privacy-policy'], ['Terms of service', '/terms-of-service']]

function SitemapPage() {
  return <div className="sitemap-page"><section className="page-hero"><div className="container"><p className="page-hero-eyebrow">FIND YOUR WAY AROUND</p><h1 className="page-hero-title">Site <span className="gradient-text">map.</span></h1></div></section><section className="page-section"><nav className="container sitemap-links" aria-label="Sitemap">{pages.map(([label, to]) => <Link key={to} to={to}>{label}<span aria-hidden="true">↗</span></Link>)}</nav></section></div>
}

export default SitemapPage
