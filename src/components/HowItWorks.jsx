import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiArrowRight, FiLayers, FiMessageCircle, FiPenTool } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { number: '01', title: 'Consultation', description: 'We learn about your goals, audience and the opportunity behind your idea.', Icon: FiMessageCircle },
  { number: '02', title: 'Strategy & Design', description: 'We shape a clear plan and create an identity and experience built around it.', Icon: FiPenTool },
  { number: '03', title: 'Development & Growth', description: 'We bring the work to life, launch with care and help you keep moving forward.', Icon: FiLayers },
]

function HowItWorks() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const context = gsap.context(() => {
      gsap.from('.how-card', {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.14,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 78%', once: true },
      })
    }, section)
    return () => context.revert()
  }, [])

  return <section className="how-it-works" id="how-it-works" aria-labelledby="how-it-works-title" ref={sectionRef}>
    <div className="container how-it-works-inner">
      <header className="how-it-works-heading">
        <p className="how-it-works-eyebrow"><i/> HOW IT WORKS <i/></p>
        <h2 id="how-it-works-title">A simple process,<br/><span>powerful results.</span></h2>
        <p>We make it easy to turn your ideas into impactful digital experiences.</p>
      </header>
      <div className="how-cards">
        {steps.map(({ number, title, description, Icon }) => <article className="how-card" key={number}>
          <div className="how-card-top"><span className="how-card-number">{number}</span><i aria-hidden="true"/></div>
          <span className="how-card-icon"><Icon aria-hidden="true"/></span>
          <div className="how-card-copy"><h3>{title}</h3><p>{description}</p></div>
          <Link className="how-card-action" to="/contact">Let&apos;s talk <FiArrowRight aria-hidden="true"/></Link>
        </article>)}
      </div>
    </div>
  </section>
}

export default HowItWorks
