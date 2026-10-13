import { FiArrowUpRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { servicesData } from './Services'
import digitalMarketingImage from '../assets/images/Images_for_dep/Images_for_dep/Digital marketing.webp'
import websiteDevelopmentImage from '../assets/images/Images_for_dep/Images_for_dep/web developmetn.webp'
import webAppDevelopmentImage from '../assets/images/Images_for_dep/Images_for_dep/webapp_development.webp'
import seoImage from '../assets/images/Images_for_dep/Images_for_dep/SEO.webp'
import socialMediaImage from '../assets/images/Images_for_dep/Images_for_dep/social_media.webp'
import brandingImage from '../assets/images/Images_for_dep/Images_for_dep/Branding&identity.webp'
import graphicDesignImage from '../assets/images/Images_for_dep/Images_for_dep/graphic_desgin.webp'
import videoProductionImage from '../assets/images/Images_for_dep/Images_for_dep/vdo_producction.webp'
import influencerImage from '../assets/images/Images_for_dep/Images_for_dep/influencer.webp'
import appDevelopmentImage from '../assets/images/Images_for_dep/Images_for_dep/app-developer.webp'

const catalogImages = [
  digitalMarketingImage,
  websiteDevelopmentImage,
  webAppDevelopmentImage,
  seoImage,
  socialMediaImage,
  brandingImage,
  graphicDesignImage,
  videoProductionImage,
  influencerImage,
  appDevelopmentImage,
]

function ServicesCatalog() {
  return (
    <section className="services-catalog" id="services" aria-labelledby="services-catalog-title">
      <div className="container">
        <header className="services-catalog-heading">
          <div>
            <p className="eyebrow"><span /> WHAT WE DO / 10 CAPABILITIES</p>
            <h2 id="services-catalog-title">Everything you need<br/>to <span className="gradient-text">move forward.</span></h2>
          </div>
          <p>One connected team for the ideas, tools, and experiences that help your business grow.</p>
        </header>
        <div className="services-catalog-grid">
          {servicesData.map((service, index) => (
            <Link className="services-catalog-card" to="/contact" key={service.id} style={{ '--catalog-delay': `${index * 45}ms`, '--catalog-accent': ['#3ed0e7', '#d971d7', '#8c9dff', '#58d6b0', '#f0a467'][index % 5] }} aria-label={`Discuss ${service.title} with our team`}>
              <span className="services-catalog-image"><img src={catalogImages[index]} alt="" loading={index < 3 ? 'eager' : 'lazy'} /><span className="services-catalog-number">0{index + 1} <i>/ 10</i></span><span className="services-catalog-arrow"><FiArrowUpRight aria-hidden="true" /></span></span>
              <span className="services-catalog-copy"><strong>{service.title}</strong><span>{service.description}</span><span className="services-catalog-link">Explore service <FiArrowUpRight aria-hidden="true" /></span></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesCatalog
