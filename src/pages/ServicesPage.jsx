import ServicesCatalog from '../components/ServicesCatalog'
// import Principles from '../components/Principles'
import { Link } from 'react-router-dom'

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

      <ServicesCatalog />

      {/* <Principles variant="services" /> */}
    </div>
  )
}

export default ServicesPage

