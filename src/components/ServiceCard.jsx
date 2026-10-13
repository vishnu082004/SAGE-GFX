import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import { motion, useReducedMotion } from 'framer-motion'
import { memo } from 'react'

const ServiceCard = memo(function ServiceCard({ service, index, active, onActivate, slowReveal = false }) {
  const reduceMotion = useReducedMotion()
  return <motion.div className={`service-index-row ${active ? 'is-active' : ''}`} onMouseEnter={() => onActivate(index)} onFocus={() => onActivate(index)} initial={reduceMotion ? false : slowReveal ? { opacity: 0, x: index % 2 ? 34 : -34, y: 58, z: -170, rotateX: 18, rotateY: index % 2 ? -16 : 16, rotateZ: index % 2 ? 10 : -10, scale: .76, transformPerspective: 1000 } : { opacity: 0, x: -20 }} whileInView={{ opacity: 1, y: 0, x: 0, z: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1 }} viewport={{ once: true, amount: .2 }} transition={{ type: 'spring', stiffness: 175, damping: 23, mass: .65, delay: slowReveal ? Math.min(index * .055, .495) : Math.min(index * .025, .2) }}>
    {slowReveal && <div className="service-index-image" aria-hidden="true"><img src={service.image} alt="" loading="lazy" decoding="async" /></div>}
    <span className="service-index-number">{String(index + 1).padStart(2, '0')}</span>
    <Link to="/services" className="service-index-link" onFocus={() => onActivate(index)}><span className="service-index-title">{service.title}</span><span className="service-index-description">{service.description}</span><FiArrowUpRight className="service-index-arrow" /></Link>
  </motion.div>
})

export default ServiceCard
