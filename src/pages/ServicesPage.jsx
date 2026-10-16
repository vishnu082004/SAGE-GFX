import ServicesCatalog from '../components/ServicesCatalog'
// import Principles from '../components/Principles'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'

function ServicesPage() {
  return (
    <div className="services-page">
      <section className="page-hero page-hero--services">
        <div className="services-hero-stage" aria-hidden="true">
          <img src="/images/sage-gfx-services-background.webp" alt="" fetchPriority="high" />
        </div>
        <div className="services-hero-topline" aria-hidden="true">
          <span className="services-hero-topline__trace" />
          <i className="services-hero-topline__node services-hero-topline__node--one" />
          <i className="services-hero-topline__node services-hero-topline__node--two" />
          <span className="services-hero-topline__orbit"><i /></span>
        </div>
        <div className="container services-hero-layout">
          <div className="services-hero-copy">
            {/* <p className="page-hero-eyebrow"><span /> OUR SERVICES <i>/</i></p> */}
            <h1 className="page-hero-title">Our <span className="gradient-text">Services.</span> </h1>
            {/* <p className="page-hero-subtitle">Explore branding, design, SEO, social media marketing, and website development services built to help your business grow online.</p> */}
            <div className="services-hero-actions">
              {/* <Link to="#services" className="button button-gradient">Explore Our Services <FiArrowRight aria-hidden="true"/></Link> */}
              <Link to="/contact" className="services-hero-secondary">Talk to our team <FiArrowUpRight aria-hidden="true"/></Link>
            </div>
          </div>
        </div>
      </section>

      <ServicesCatalog />

      {/* <Principles variant="services" /> */}
    </div>
  )
}

export default ServicesPage

