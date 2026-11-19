import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import servicesData from '../data/services'
import seoCardImage from '../assets/images/seo image.webp'
import aeoCardImage from '../assets/images/service image 2.webp'
import geoCardImage from '../assets/images/service image 3.webp'
import smmCardImage from '../assets/images/service image 4.webp'
import performanceMarketingCardImage from '../assets/images/service image 5.webp'
import websiteDevelopmentCardImage from '../assets/images/service image 6.webp'
import graphicDesignVideoEditingCardImage from '../assets/images/service image 7.webp'
import videographyCardImage from '../assets/images/service image 8.webp'
import '../styles/services-open-layout.css'

const serviceOrder = [
  'social-media-marketing',
  'website-development',
  'seo',
  'aeo',
  'geo',
  'performance-marketing',
  'graphic-design-video-editing',
  'videography',
]
const orderedServices = [...servicesData].sort(
  (a, b) => serviceOrder.indexOf(a.slug) - serviceOrder.indexOf(b.slug)
)

function ServiceTickerRow({ services, reverse = false, className = '' }) {
  const rowServices = reverse ? [...services].reverse() : services
  const loopServices = [...rowServices, ...rowServices]

  return <div className={`services-ticker-row ${className}`} aria-hidden="true">
    <div className="services-ticker-track">
      {loopServices.map((service, index) => <span className="services-ticker-item" key={`${service.slug}-${index}`}>
        {service.title.trim()}<span className="services-ticker-star">✦</span>
      </span>)}
    </div>
  </div>
}

function ServicesCatalog() {
  return (
    <section className="services-open" id="services" aria-labelledby="services-catalog-title">
      <header className="services-catalog-heading">
        <p>OUR SERVICES</p>
        <h2 id="services-catalog-title">Everything you need to grow online.</h2>
      </header>

      <div className="services-open-list">
        {orderedServices.map((service) => <Link className="services-open-section" key={service.id} to={`/services/${service.slug}`} aria-label={`View full details for ${service.title.trim()}`}>
          {service.slug === 'seo' && <img className="services-open-image services-open-image--seo-dim" src={seoCardImage} alt="SEO search growth illustration" loading="lazy" />}
          {service.slug === 'aeo' && <img className="services-open-image" src={aeoCardImage} alt="Answer engine optimization illustration" loading="lazy" />}
          {service.slug === 'geo' && <img className="services-open-image" src={geoCardImage} alt="Generative engine optimization illustration" loading="lazy" />}
          {service.slug === 'social-media-marketing' && <img className="services-open-image services-open-image--bright" src={smmCardImage} alt="Social media marketing illustration" loading="lazy" />}
          {service.slug === 'performance-marketing' && <img className="services-open-image services-open-image--bright" src={performanceMarketingCardImage} alt="Performance marketing illustration" loading="lazy" />}
          {service.slug === 'website-development' && <img className="services-open-image services-open-image--muted" src={websiteDevelopmentCardImage} alt="Website development illustration" loading="lazy" />}
          {service.slug === 'graphic-design-video-editing' && <img className="services-open-image" src={graphicDesignVideoEditingCardImage} alt="Graphic design and video editing illustration" loading="lazy" />}
          {service.slug === 'videography' && <img className="services-open-image" src={videographyCardImage} alt="Videography illustration" loading="lazy" />}
          <h2>{service.title.trim()}</h2>
          <p className="services-open-description">{service.description}</p>
        </Link>)}
      </div>

      <div className="services-ticker" aria-label="Eight Sage GFX services">
        <ServiceTickerRow services={orderedServices} className="services-ticker-row--first" />
        <ServiceTickerRow services={orderedServices} reverse className="services-ticker-row--second" />
      </div>

      <section className="services-page-closing" aria-labelledby="services-page-closing-title">
        <div className="services-page-closing__copy">
          <h2 id="services-page-closing-title">Need Help Choosing a Digital Marketing <span>Service for Your Business?</span></h2>
          <p className="services-page-closing__description">Each and every company is different, but there’s one thing that unites all of them – goals and challenges. Our job at Sage GFX Digital Solutions is to provide you with the best possible strategy for digital marketing that will help you reach the next level in your business journey.</p>
          <div className="services-page-closing__actions">
            <Link to="/contact" className="services-page-closing__button services-page-closing__button--primary">Get Your Free Audit <FiArrowRight aria-hidden="true" /></Link>
            <Link to="/case-studies" className="services-page-closing__button services-page-closing__button--secondary">EXPLORE OUR CASE STUDIES <FiArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </section>
  )
}

export default ServicesCatalog
