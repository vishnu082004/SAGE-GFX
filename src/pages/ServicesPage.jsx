import ServicesCatalog from '../components/ServicesCatalog'
import { Link } from 'react-router-dom'
import servicesHeroImage from '../assets/images/service image.webp'

function ServicesPage() {
  return (
    <div className="services-page">
      <section className="page-hero page-hero--services">
        <div className="container services-hero-layout">
          <div className="services-hero-copy">
            <h1 className="page-hero-title">Services</h1>
            <p className="services-hero-breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">›</span><span aria-current="page">Services</span></p>
          </div>
        </div>
      </section>

      <section className="services-intro" aria-labelledby="services-intro-title">
        <div className="services-intro-inner">
          <div className="services-intro-visual">
            <img src={servicesHeroImage} alt="Digital marketing campaign with a laptop, growth chart, target, and megaphone" fetchPriority="high" />
          </div>
          <div className="services-intro-copy">
            <h2 id="services-intro-title">A Digital Marketing Agency in Chennai <span className="gradient-text">Helping Businesses Grow Online.</span></h2>
            <p>At Sage GFX Digital Solutions, we assist in enhancing the online presence of companies through our digitally-oriented marketing process. As a digital marketing firm in Chennai, we blend Search Engine Optimization, Google Ads, social media marketing, website development, and more to allow your brand to get better search visibility and establish itself effectively in the market.</p>
            <a className="services-intro-cta" href="#services">Explore services <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <ServicesCatalog />
    </div>
  )
}

export default ServicesPage
