import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiRotateCw } from 'react-icons/fi'
import servicesData from '../data/services'

function ServicesCatalog() {
  const [pinnedServiceId, setPinnedServiceId] = useState(null)
  const [frontPinnedServices, setFrontPinnedServices] = useState(() => new Set())

  const toggleService = (serviceId) => {
    setPinnedServiceId((current) => current === serviceId ? null : serviceId)
    setFrontPinnedServices((current) => {
      if (!current.has(serviceId)) return current
      const next = new Set(current)
      next.delete(serviceId)
      return next
    })
  }

  const showServiceFront = (serviceId) => {
    setPinnedServiceId((current) => current === serviceId ? null : current)
    setFrontPinnedServices((current) => new Set(current).add(serviceId))
  }

  const focusServiceCard = (serviceId) => {
    setPinnedServiceId((current) => current !== serviceId ? null : current)
  }

  const releaseFrontPin = (serviceId) => {
    setFrontPinnedServices((current) => {
      if (!current.has(serviceId)) return current
      const next = new Set(current)
      next.delete(serviceId)
      return next
    })
  }

  return (
    <section className="services-catalog" id="services" aria-labelledby="services-catalog-title">
      <div className="container">
        <header className="services-catalog-heading">
          <div>
            <p className="eyebrow"><span /> WHAT WE DO / 8 SERVICES</p>
            <h2 id="services-catalog-title">Everything you need<br />to <span className="gradient-text">move forward.</span></h2>
          </div>
          <p>Explore each service to see how our team can help your brand grow.</p>
        </header>
        <div className="services-catalog-grid">
          {servicesData.map((service, index) => {
            const isFlipped = pinnedServiceId === service.id
            const isFrontPinned = frontPinnedServices.has(service.id)
            return (
              <article
                className={`services-catalog-card${isFlipped ? ' is-flipped' : ''}${isFrontPinned ? ' is-front-pinned' : ''}`}
                key={service.id}
                style={{ '--catalog-delay': `${index * 45}ms`, '--catalog-accent': ['#3ed0e7', '#d971d7', '#8c9dff', '#58d6b0', '#f0a467'][index % 5] }}
                onMouseEnter={() => focusServiceCard(service.id)}
                onMouseLeave={() => releaseFrontPin(service.id)}
              >
                <div className="services-catalog-card-inner">
                  <button
                    className="services-catalog-face services-catalog-face--front"
                    type="button"
                    onClick={() => toggleService(service.id)}
                    aria-expanded={isFlipped}
                    aria-label={`${isFlipped ? 'Show overview for' : 'Show details for'} ${service.title}`}
                  >
                    <span className="services-catalog-image">
                      <img src={service.image} alt="" loading={index < 3 ? 'eager' : 'lazy'} />
                      <span className="services-catalog-number">{String(index + 1).padStart(2, '0')} <i>/ 08</i></span>
                      <span className="services-catalog-arrow"><FiRotateCw aria-hidden="true" /></span>
                    </span>
                    <span className="services-catalog-copy">
                      <strong>{service.title}</strong>
                      <span>{service.description}</span>
                      <span className="services-catalog-link">Hover or tap for details <FiArrowUpRight aria-hidden="true" /></span>
                    </span>
                  </button>
                  <div className="services-catalog-face services-catalog-face--back">
                    <span className="services-catalog-back-kicker">SAGE GFX / SERVICE {String(index + 1).padStart(2, '0')}</span>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <ul>{service.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                    <div className="services-catalog-back-actions">
                      <button type="button" onClick={() => showServiceFront(service.id)}><FiRotateCw aria-hidden="true" /> Back</button>
                      <Link to="/contact">Discuss this service <FiArrowUpRight aria-hidden="true" /></Link>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServicesCatalog
