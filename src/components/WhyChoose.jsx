import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiCode, FiPenTool, FiBarChart2, FiUsers } from 'react-icons/fi'
import brandLogo from '../assets/images/sage-gfx-navbar.webp'

const benefits = [
  { title: 'Design & Branding', description: 'Create a strong visual identity that makes your brand memorable and impactful.', Icon: FiPenTool, color: 'cyan', position: 'top-left' },
  { title: 'Web & App Development', description: 'Build high-performance websites and mobile apps that deliver real results.', Icon: FiCode, color: 'violet', position: 'top-right' },
  { title: 'Digital Marketing', description: 'Drive targeted traffic and measurable growth through smart digital strategies.', Icon: FiBarChart2, color: 'cyan', position: 'bottom-left' },
  { title: 'Social Media Management', description: 'Grow your brand across social platforms with meaningful connections.', Icon: FiUsers, color: 'pink', position: 'bottom-right' },
]

function WhyChoose() {
  const sectionRef = useRef(null)
  const visualRef = useRef(null)
  const frameRef = useRef(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: .14 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const visual = visualRef.current
    if (!visual) return undefined
    const parts = [...visual.querySelectorAll('[data-depth]')]
    const move = (event) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const bounds = visual.getBoundingClientRect()
      const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1))
      const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1))
      window.cancelAnimationFrame(frameRef.current)
      frameRef.current = window.requestAnimationFrame(() => {
        parts.forEach((part) => {
          const depth = Number(part.dataset.depth || 0)
          part.style.setProperty('--parallax-x', `${-x * depth}px`)
          part.style.setProperty('--parallax-y', `${-y * depth}px`)
        })
      })
    }
    const activate = () => visual.classList.add('is-active')
    const reset = () => {
      window.cancelAnimationFrame(frameRef.current)
      parts.forEach((part) => {
        part.style.setProperty('--parallax-x', '0px')
        part.style.setProperty('--parallax-y', '0px')
      })
      visual.classList.remove('is-active')
    }
    visual.addEventListener('pointermove', move, { passive: true })
    visual.addEventListener('pointerenter', activate)
    visual.addEventListener('pointerleave', reset)
    return () => {
      visual.removeEventListener('pointermove', move)
      visual.removeEventListener('pointerenter', activate)
      visual.removeEventListener('pointerleave', reset)
      window.cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return <section ref={sectionRef} className={`why-choose why-choose--orbit${isVisible ? ' is-visible' : ''}`} aria-labelledby="why-choose-title">
    <div className="why-choose-backdrop" aria-hidden="true"><span/><span/><span/></div>
    <div className="container why-choose-layout">
      <div className="why-choose-copy">
        <p className="why-choose-eyebrow"><i/> WHY CHOOSE US <i/></p>
        <h2 id="why-choose-title">Why Choose<br/>Sage GFX as Your<br/><span className="why-gradient-digital">Digital Marketing</span> <span className="why-gradient-agency">Agency?</span></h2>
      </div>

      <div ref={visualRef} className="why-choose-visual" role="group" aria-label="Sage GFX services orbit">
        <svg className="why-energy-trails" viewBox="0 0 900 650" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="why-energy-gradient" x1="0" x2="1"><stop stopColor="#11d9f2" stopOpacity="0"/><stop offset=".35" stopColor="#12d4f0"/><stop offset=".7" stopColor="#a443f5"/><stop offset="1" stopColor="#ef35cb" stopOpacity="0"/></linearGradient></defs><path d="M15 400C140 410 185 276 300 302s180 135 294 109 173-179 292-158"/><path d="M50 500C180 385 250 505 345 432s184-190 284-158 158 150 239 138"/><path d="M160 150C270 220 340 120 435 185s168 136 258 92 110-22 165 8"/></svg>
        <div className="why-orbit why-orbit--one why-depth" data-depth="17" aria-hidden="true"/><div className="why-orbit why-orbit--two why-depth" data-depth="12" aria-hidden="true"/><div className="why-orbit why-orbit--three why-depth" data-depth="8" aria-hidden="true"/>
        <div className="why-orb-halo why-depth" data-depth="10" aria-hidden="true"/>
        <div className="why-orb why-depth" data-depth="14"><img className="why-orb-mark" src={brandLogo} alt="Sage GFX Digital Solutions"/><small>IDEAS / DESIGN / IMPACT</small><span className="why-orb-shine" aria-hidden="true"/></div>
        <div className="why-particles" aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <i key={index} className={`why-particle why-particle--${index + 1} why-depth`} data-depth={5 + (index % 5) * 2}/>)}</div>
        <div className="why-energy-node why-energy-node--one why-depth" data-depth="15" aria-hidden="true"/><div className="why-energy-node why-energy-node--two why-depth" data-depth="12" aria-hidden="true"/><div className="why-energy-node why-energy-node--three why-depth" data-depth="9" aria-hidden="true"/><div className="why-energy-node why-energy-node--four why-depth" data-depth="14" aria-hidden="true"/>
        <div className="why-service-cards">{benefits.map(({ title, description, Icon, color, position }, index) => <Link key={title} to="/services" className={`why-service-card why-service-card--${position} why-service-card--${color} why-depth`} data-depth={20 + index * 2} style={{ '--card-index': index }}><span className="why-service-icon"><Icon aria-hidden="true"/></span><span className="why-service-content"><small>0{index + 1} / SAGE GFX</small><strong>{title}</strong><p>{description}</p></span><span className="why-service-arrow"><FiArrowUpRight aria-hidden="true"/></span></Link>)}</div>
      </div>
    </div>
  </section>
}

export default WhyChoose
