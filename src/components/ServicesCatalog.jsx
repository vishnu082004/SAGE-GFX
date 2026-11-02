import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import servicesData from '../data/services'

function ServicesCatalog() {
  return (
    <section className="services-catalog" id="services" aria-labelledby="services-catalog-title">
      <div className="container">
        <header className="services-catalog-heading">
          <div>
            {/* <p className="eyebrow"><span /> WHAT WE DO / 8 SERVICES</p> */}
            <h2 id="services-catalog-title">Everything you need<br />to <span className="gradient-text">move forward.</span></h2>
          </div>
          <p>Choose a service to learn how our team can help your brand grow.</p>
        </header>
        <div className="services-catalog-grid">
          {servicesData.map((service, index) => (
            <article
              className="services-catalog-card"
              key={service.id}
              style={{ '--catalog-delay': `${index * 45}ms`, '--catalog-accent': ['#3ed0e7', '#d971d7', '#8c9dff', '#58d6b0', '#f0a467'][index % 5] }}
            >
              <Link className="services-catalog-card-link" to={`/services/${service.slug}`} aria-label={`Learn more about ${service.title}`}>
                <span className="services-catalog-image">
                  <img src={service.image} alt="" loading={index < 3 ? 'eager' : 'lazy'} decoding="async" />
                  <span className="services-catalog-number">{String(index + 1).padStart(2, '0')} <i>/ 08</i></span>
                  <span className="services-catalog-arrow"><FiArrowUpRight aria-hidden="true" /></span>
                </span>
                <span className="services-catalog-copy">
                  <h3>{service.title}</h3>
                  <span>{service.description}</span>
                  <span className="services-catalog-link">Explore service <FiArrowUpRight aria-hidden="true" /></span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesCatalog
