import ServicesCatalog from '../components/ServicesCatalog'
import Principles from '../components/Principles'
import { Link } from 'react-router-dom'
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi'

function ServicesPage() {
  return (
    <div className="services-page">
      <section className="page-hero page-hero--services">
        <div className="container">
          <p className="page-hero-eyebrow"><span /> DIGITAL SERVICES / BUILT AROUND YOU</p>
          <h1 className="page-hero-title">The right work.<br/><span className="gradient-text">The right results.</span></h1>
          <p className="page-hero-subtitle">From a sharper brand to a stronger digital presence, get the creative and technical support to move your business forward.</p>
          <div className="services-hero-actions"><Link to="/contact" className="services-hero-secondary">Talk to our team <FiArrowUpRight aria-hidden="true"/></Link></div>
        </div>
      </section>

      <ServicesCatalog />

      <Principles variant="services" />
    </div>
  )
}

export default ServicesPage
