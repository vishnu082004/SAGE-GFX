import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import ServiceCard from './ServiceCard'
import servicesData from '../data/services'

export { servicesData }

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
