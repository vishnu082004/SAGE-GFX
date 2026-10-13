import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import ServiceCard from './ServiceCard'

export const servicesData = [
  { id: 1, title: 'Digital Marketing', description: 'Reach the right audience, boost engagement and drive sales.', image: '/images/service-card-digital-marketing.webp' },
  { id: 2, title: 'Website Development', description: 'Modern, fast and responsive websites for your business.', image: '/images/service-card-website-development.webp' },
  { id: 3, title: 'Web App Development', description: 'Custom web applications designed to scale with you.', image: '/images/service-card-web-app-development.webp' },
  { id: 4, title: 'SEO', description: 'Rank higher, get found and grow organically.', image: '/images/service-card-seo.webp' },
  { id: 5, title: 'Social Media Marketing', description: 'Build your brand and engage your audience.', image: '/images/service-card-social-media.webp' },
  { id: 6, title: 'Branding & Identity', description: 'Create a lasting impression with a strong brand.', image: '/images/service-card-branding.webp' },
  { id: 7, title: 'Graphic Design', description: 'Visually stunning designs that speak your brand.', image: '/images/service-card-graphic-design.webp' },
  { id: 8, title: 'Video Production', description: 'Tell your story with powerful video.', image: '/images/service-card-video-production.webp' },
  { id: 9, title: 'Influencer Marketing', description: 'Partner with creators and expand your reach.', image: '/images/service-card-influencer-marketing.webp' },
  { id: 10, title: 'App Development', description: 'Powerful mobile apps for your ideas.', image: '/images/service-card-app-development.webp' },
]

function Services({ description, homeVersion = false, servicesPageVersion = false }) {
  const [activeService, setActiveService] = useState(0)
  const reduceMotion = useReducedMotion()
  return <section id="services" className={`services ${homeVersion ? 'services--home' : ''} ${servicesPageVersion ? 'services--page' : ''}`} aria-label="Our Services">
    <div className="container">
      <div className="services-header"><p className="eyebrow"><span/> Our services</p><h2 className="services-heading">Complete digital solutions<br/>for <span className="gradient-text">your brand.</span></h2>{description&&<p className="services-description">{description}</p>}</div>
      {servicesPageVersion ? <div className="services-page-grid">{servicesData.map((service,index)=><article className="services-page-card" key={service.id} style={{'--service-image': `url("${service.image}")`, '--service-index': index}}><Link to="/contact" aria-label={`Discuss ${service.title}`}><span className="services-page-card-art"><img src={service.image} alt="" loading={index < 4 ? 'eager' : 'lazy'} /><span className="services-page-card-index">SERVICE / {String(index+1).padStart(2,'0')}</span><span className="services-page-card-arrow"><FiArrowUpRight aria-hidden="true"/></span></span><span className="services-page-card-copy"><strong>{service.title}</strong><span>{service.description}</span></span></Link></article>)}</div> : <div className="services-editorial">
        <div className={`service-preview service-preview--${activeService%5}`} aria-hidden="true"><motion.div className="service-preview-orb" animate={reduceMotion?{}:{rotate:activeService%2?7:-7,scale:[1,1.025,1]}} transition={{duration:.8,ease:'easeOut'}}/><div className="service-preview-signal"/><span className="service-preview-label">SAGE / {String(activeService+1).padStart(2,'0')}</span></div>
        <div className="services-index"><svg className="services-thread" viewBox="0 0 32 900" preserveAspectRatio="none" aria-hidden="true"><path d="M16 0C-3 100 35 160 16 255S-2 390 16 478 36 637 16 724 3 840 16 900"/></svg>{servicesData.map((service,index)=><ServiceCard key={service.id} service={service} index={index} active={activeService===index} onActivate={setActiveService} slowReveal={homeVersion}/>)}</div>
      </div>}
    </div>
  </section>
}

export default Services
