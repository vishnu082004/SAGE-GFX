import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { FiArrowLeft, FiArrowUpRight } from 'react-icons/fi'
import servicesData from '../data/services'

function ServiceDetailPage() {
  const { slug } = useParams()
  const service = servicesData.find((item) => item.slug.trim() === slug.trim())

  useEffect(() => {
    if (!service) return
    const title = `${service.title} | Sage GFX Digital Solutions`
    document.title = title
    const description = document.querySelector('meta[name="description"]')
    if (description) description.content = service.description
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.content = title
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) ogDescription.content = service.description
  }, [service])

  if (!service) return <Navigate to="/services" replace />

  return (
    <div className="service-detail-page">
      <section className="service-detail-hero" style={{ '--service-detail-image': `url("${service.image}")` }}>
        <div className="container service-detail-hero-content">
          <Link className="service-detail-back" to="/services"><FiArrowLeft aria-hidden="true" /> All services</Link>
          {/* <p className="service-detail-eyebrow">SAGE GFX / SERVICE {String(service.id).padStart(2, '0')}</p> */}
          <h1>{service.title}</h1>
          <p className="service-detail-summary">{service.description}</p>
          <Link className="service-detail-cta" to="/contact">Discuss this service <FiArrowUpRight aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="service-detail-content" aria-labelledby="service-detail-heading">
        <div className="container service-detail-content-inner">
          <div>
            {/* <p className="service-detail-eyebrow">WHAT WE CAN DO</p> */}
            <h2 id="service-detail-heading">A clear plan for your next step.</h2>
          </div>
          <ul className="service-detail-list">
            {service.details.map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default ServiceDetailPage
