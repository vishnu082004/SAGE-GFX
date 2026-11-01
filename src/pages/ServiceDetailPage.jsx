import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { FiArrowLeft, FiArrowUpRight, FiBarChart2, FiCamera, FiCode, FiLayers, FiMessageCircle, FiPenTool, FiSearch, FiShare2, FiStar, FiZap } from 'react-icons/fi'
import servicesData from '../data/services'

const serviceSectionIcons = [FiSearch, FiMessageCircle, FiStar, FiLayers, FiCode, FiBarChart2, FiPenTool, FiCamera]

function AeoSearchVisual() {
  return <div className="aeo-hero-visual" aria-hidden="true">
    <div className="aeo-hero-orbit aeo-hero-orbit--one" />
    <div className="aeo-hero-orbit aeo-hero-orbit--two" />
    <div className="aeo-search-window">
      <div className="aeo-search-bar"><FiSearch /><span>best digital marketing agency?</span><FiZap /></div>
      <div className="aeo-answer-panel">
        <div className="aeo-answer-title"><FiZap /><span>AI Answer</span></div>
        <i /><i /><i /><i />
      </div>
    </div>
    <div className="aeo-hero-tags">
      <span><FiZap /> AI Search</span>
      <span><FiMessageCircle /> Answer Engine</span>
      <span><FiBarChart2 /> Better Visibility</span>
    </div>
  </div>
}

function ServiceDetailPage() {
  const { slug } = useParams()
  const service = servicesData.find((item) => item.slug.trim() === slug.trim())
  const redesigned = Boolean(service?.sections || service?.detailDescriptions)
  const sections = service?.sections || service?.details.map((title, index) => ({
    title,
    content: [service.detailDescriptions?.[index] || service.description, service.detailExpansions?.[index]].filter(Boolean).join(' '),
  }))

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
    <div className={`service-detail-page${redesigned ? ' service-detail-page--redesign' : ''}`}>
      <section className="service-detail-hero" style={redesigned ? undefined : { '--service-detail-image': `url("${service.image}")` }}>
        <div className="container service-detail-hero-content">
          {redesigned ? (
            <>
              <div className="aeo-hero-copy">
                <h1><span className="aeo-title-gradient">{service.title}</span></h1>
              </div>
              <AeoSearchVisual />
            </>
          ) : (
            <>
              <Link className="service-detail-back" to="/services"><FiArrowLeft aria-hidden="true" /> All services</Link>
              {/* <p className="service-detail-eyebrow">SAGE GFX / SERVICE {String(service.id).padStart(2, '0')}</p> */}
              <h1>{service.title}</h1>
              <p className="service-detail-summary">{service.description}</p>
              <Link className="service-detail-cta" to="/contact">Discuss this service <FiArrowUpRight aria-hidden="true" /></Link>
            </>
          )}
        </div>
      </section>

      {redesigned ? (
        <>
          <section className="service-detail-content service-detail-content--sections" aria-labelledby="service-detail-heading">
            <div className="service-detail-sections">
              <header className="service-detail-sections-heading">
                <h2 id="service-detail-heading"><span className="aeo-title-gradient">A clear plan for your next step.</span></h2>
              </header>
              <div className="service-detail-cards">
                {sections.map(({ title, content }, index) => {
                  const Icon = serviceSectionIcons[index] || FiShare2
                  return <article className="service-detail-section" key={title}>
                    <div className="service-detail-section-icon"><Icon aria-hidden="true" /></div>
                    <h2><span className="aeo-title-gradient">{title}</span></h2>
                    <p>{content}</p>
                  </article>
                })}
              </div>
            </div>
          </section>
          <section className="service-detail-cta-banner" aria-label="Contact Sage GFX">
            <Link to="/contact">Talk to our team <FiArrowUpRight aria-hidden="true" /></Link>
          </section>
        </>
      ) : (
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
      )}
    </div>
  )
}

export default ServiceDetailPage
