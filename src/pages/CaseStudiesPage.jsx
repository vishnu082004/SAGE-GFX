import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowRight, FiBarChart2, FiCheck, FiGlobe, FiMapPin, FiMessageCircle,
  FiTarget, FiTrendingUp, FiUsers,
} from 'react-icons/fi'
import '../styles/case-studies.css'
import julyCallsImage from '../assets/images/case studies 1.webp'
import augustCallsImage from '../assets/images/case studies 2.webp'
import septemberCallsImage from '../assets/images/case studies 3.webp'
import octoberCallsImage from '../assets/images/case studies 4.png'

const milestones = [
  { title: 'Starting point', detail: 'Low search visibility, but with a chance to establish a better digital presence', Icon: FiTarget },
  { title: 'Local SEO Plan', detail: 'Improving local search signals and Google My Business visibility to enable the clinic to reach out to users looking for Siddha medicine locally.', Icon: FiMapPin },
  { title: 'Visibility', detail: 'Increase in visibility from the website and localized search through relevant Siddha healthcare searches.', Icon: FiBarChart2 },
  { title: 'Impact on Business', detail: 'Increased digital presence that is geared towards better discoverability and creating genuine connections.', Icon: FiUsers },
]

const results = [
  { label: 'Business profile visitors', value: 1500, suffix: '+', Icon: FiGlobe },
  { label: 'Organic Leads', value: 60, suffix: '+ Calls', Icon: FiMessageCircle },
  { label: 'Growth', value: 75, suffix: '%', Icon: FiTrendingUp },
]

const monthlyCallReports = [
  { month: 'July 2026', calls: 0, image: julyCallsImage },
  { month: 'August 2026', calls: 32, image: augustCallsImage },
  { month: 'September 2026', calls: 64, image: septemberCallsImage },
  { month: 'October 2026', calls: 72, image: octoberCallsImage },
]

const months = [
  { month: 'Month 1', title: 'Build the Local Foundation', items: ['Local SEO audit, keyword research, Google Business Profile optimisation and the right primary category setup.'] },
  { month: 'Month 2', title: 'Strengthen Visibility', items: ['Service optimisation, localized keyword use, profile improvement and frequent Google Business Profile updates.'] },
  { month: 'Month 3', title: 'Generate Local Enquiries', items: ['Continuous optimisation, regular profile activity and performance tracking helped generate 60+ calls in just three months.'] },
]

function CountMetric({ metric }) {
  const elementRef = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return undefined
    const finish = () => setCount(metric.value)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      finish()
      return undefined
    }
    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const startedAt = performance.now()
      const animate = (now) => {
        const progress = Math.min((now - startedAt) / 1050, 1)
        const eased = 1 - (1 - progress) ** 4
        setCount(Math.round(metric.value * eased))
        if (progress < 1) frame = requestAnimationFrame(animate)
      }
      frame = requestAnimationFrame(animate)
    }, { threshold: .35 })
    observer.observe(element)
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
  }, [metric.value])

  const formatted = new Intl.NumberFormat('en-IN').format(count)
  return <span ref={elementRef} className="wea-result-value">{metric.prefix || ''}{formatted}{metric.suffix || ''}</span>
}

function SectionHeading({ eyebrow, title, intro, id }) {
  return (
    <header className="wea-section-heading">
      <p className="wea-eyebrow"><span />{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {intro && <p className="wea-section-intro">{intro}</p>}
    </header>
  )
}

function CaseStudiesPage() {
  return (
    <main className="wea-case-study">
      <section className="case-studies-page-hero" aria-labelledby="case-studies-page-title">
        <div className="wea-container">
          <h2 id="case-studies-page-title" className="page-hero-title">Dr. M. Kolappa Pillai Siddha Clinic <span className="gradient-text">- Local SEO Success</span></h2>
          <p className="case-studies-page-subtitle">How we Work Dr. M. Kolappa Pillai Siddha Clinic&rsquo;s organic traffic and increased leads from 0 to 60+ calls in just 3 months.</p>
        </div>
      </section>
      <section className="wea-hero" aria-labelledby="wea-title">
        <div className="wea-container">
          <div className="wea-hero-main">
            <div className="wea-hero-copy">
              <h1 id="wea-title"><span className="wea-hero-eyebrow">From Limited Online Presence to</span><span className="wea-hero-title-highlight">Improved Digital Visibility</span></h1>
              <p className="wea-hero-description">SEO and Local SEO marketing campaign that helped turn online visibility into actual patients for their practice.</p>
            </div>
          </div>
          <div className="wea-milestones" aria-label="Campaign milestones">
            {milestones.map(({ title, detail, Icon }) => <article className="wea-milestone wea-card" key={title}><div className="wea-milestone-copy"><div className="wea-milestone-heading"><span className="wea-milestone-icon"><Icon aria-hidden="true"/></span><h3>{title}</h3></div><span className="wea-milestone-accent" aria-hidden="true"/><p>{detail}</p></div></article>)}
          </div>
        </div>
      </section>

      <div className="wea-content">



        <section className="wea-section" aria-labelledby="wea-results-title">
          <div className="wea-container">
            <header className="wea-section-heading">
              <h2 id="wea-results-title">Results <span>Achieved in 3 Months</span></h2>
            </header>
            <div className="wea-monthly-performance" aria-label="Monthly Google Business Profile call performance">
              {monthlyCallReports.map(({ month, calls, image }) => <figure className="wea-monthly-report" key={month}>
                <figcaption><strong>{month}</strong><span>{calls} calls from Google Business Profile</span></figcaption>
                <img src={image} alt={`${month} Google Business Profile calls performance report showing ${calls} calls.`} loading="lazy" decoding="async" />
              </figure>)}
            </div>
            <div className="wea-results-grid">
              {results.map((metric, index) => {const Icon=metric.Icon;return <article className={`wea-result-card wea-card wea-result-card--${index % 2 ? 'violet' : 'cyan'}`} key={metric.label}><div className="wea-result-top"><span className="wea-icon"><Icon aria-hidden="true"/></span></div><p>{metric.label}</p><CountMetric metric={metric}/>{metric.note && <small>{metric.note}</small>}</article>})}
            </div>
          </div>
        </section>

        <section className="wea-section" aria-labelledby="wea-timeline-title"><div className="wea-container"><header className="wea-section-heading wea-timeline-heading"><h2 id="wea-timeline-title">Local SEO Growth Timeline</h2><p className="wea-section-intro">Three months of focused optimisation to strengthen search visibility, improve local discovery and build a stronger digital presence for Dr. M. Kolappa Pillai Siddha Clinic.</p></header><div className="wea-timeline">{months.map(({ month, title, items }, index) => <article className={`wea-timeline-item${index % 2 ? ' is-right' : ' is-left'}`} key={month}><div className="wea-timeline-node" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div><div className="wea-timeline-card wea-card"><div className="wea-timeline-month" aria-label={month}><span>MONTH</span><strong>{index + 1}</strong></div><div className="wea-timeline-copy"><h3>{title}</h3><ul>{items.map((item) => <li key={item}><FiCheck aria-hidden="true"/>{item}</li>)}</ul></div></div></article>)}</div></div></section>

        <section className="wea-closing" aria-labelledby="wea-closing-title">
          <div className="wea-closing-card">
            <div className="wea-closing-copy">
              <h2 id="wea-closing-title">Ready to Build Your Next Digital <span>Growth Story?</span></h2>
              <p>Every business has its own goals, challenges and opportunities. At Sage GFX, we bring strategy, creativity and digital expertise together to create solutions that move your business forward.</p>
              <Link to="/contact" className="wea-closing-button">Let&rsquo;s grow your business <FiArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default CaseStudiesPage
