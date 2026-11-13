import { Link } from 'react-router-dom'
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import servicesData from '../data/services'
import '../styles/services-open-layout.css'

function ServicesCatalog() {
  return (
    <section className="services-open" id="services" aria-label="Our services">
      <div className="services-open-list">
        {servicesData.map((service) => (
          <Link className="services-open-section" key={service.id} to={`/services/${service.slug}`} aria-label={`View full details for ${service.title.trim()}`}>
            <span className="services-open-card-arrow" aria-hidden="true"><FiArrowUpRight /></span>
            <h2>{service.title.trim()}</h2>
            <p className="services-open-description">{service.description}</p>
          </Link>
        ))}
        <div className="services-open-cta-wrap">
          <Link className="services-open-cta" to="/contact">Let&apos;s grow your business together <FiArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  )
}

export default ServicesCatalog
