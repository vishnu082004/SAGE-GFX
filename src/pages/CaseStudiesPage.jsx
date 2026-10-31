import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowRight, FiCheck, FiGlobe, FiHeart, FiMessageCircle,
  FiSearch, FiTrendingUp, FiUsers,
} from 'react-icons/fi'
import '../styles/case-studies.css'
import julyCallsImage from '../assets/images/case studies 1.png'
import augustCallsImage from '../assets/images/case studies 2.png'
import septemberCallsImage from '../assets/images/case studies 3.png'
import octoberCallsImage from '../assets/images/case studies 4.png'

const milestones = [
  { number: '01', title: 'Starting point', detail: 'Low search visibility, but with a chance to establish a better digital presence', Icon: FiGlobe },
  { number: '02', title: 'Local SEO Plan', detail: 'Improving local search signals and Google My Business visibility to enable the clinic to reach out to users looking for Siddha medicine locally.', Icon: FiSearch },
  { number: '03', title: 'Visibility', detail: 'Increase in visibility from the website and localized search through relevant Siddha healthcare searches.', Icon: FiTrendingUp },
  { number: '04', title: 'Impact on Business', detail: 'Increased digital presence that is geared towards better discoverability and creating genuine connections.', Icon: FiHeart },
]

const results = [
  { label: 'Organic traffic', value: 3500, prefix: '0 → ', suffix: '', note: 'Increased from 0 to 3,500 monthly visitors', Icon: FiTrendingUp },
  { label: 'Organic enquiries', value: 40, suffix: '+', note: 'Increased from 0 to 40+ enquiries per month', Icon: FiMessageCircle },
  { label: 'Patient walk-ins', value: 30, suffix: '+', note: 'Increased to 30+ walk-ins every month', Icon: FiUsers },
]

const monthlyCallReports = [
  { month: 'July 2026', calls: 0, image: julyCallsImage },
  { month: 'August 2026', calls: 32, image: augustCallsImage },
  { month: 'September 2026', calls: 64, image: septemberCallsImage },
  { month: 'October 2026', calls: 66, image: octoberCallsImage },
]

const months = [
  { month: 'Month 1', title: 'Set the foundation', items: ['Technical SEO completed', 'Keyword research finalized', 'Google Business Profile created', 'Meta Ads launched'] },
  { month: 'Month 2', title: 'Build and publish', items: ['Website optimization completed', 'Blog publishing started', 'First paid leads generated'] },
  { month: 'Month 3', title: 'Early visibility', items: ['Keywords started ranking', 'First organic enquiries received', 'Google Maps visibility improved'] },
  { month: 'Month 4', title: 'Organic growth', items: ['Organic traffic crossed 1,200 visitors', 'Increase in Google Business Profile calls', 'Organic enquiries grew consistently'] },
  { month: 'Month 5', title: 'Measurable outcomes', items: ['3,500 monthly organic visitors', '40+ organic enquiries', '30+ clinic walk-ins', 'Stable cost per lead of ₹185'] },
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
              <h1 id="wea-title">From Limited Online Presence to<br /><span>Improved Digital Visibility</span></h1>
              <p className="wea-hero-description">SEO and Local SEO marketing campaign that helped turn online visibility into actual patients for their practice.</p>
            </div>
          </div>
          <div className="wea-milestones" aria-label="Campaign milestones">
            {milestones.map(({ number, title, detail, Icon }) => <article className="wea-milestone wea-card" key={number}><div className="wea-icon"><Icon aria-hidden="true"/></div><div className="wea-milestone-copy"><span className="wea-number">{number}</span><h3>{title}</h3><p>{detail}</p></div></article>)}
          </div>
        </div>
      </section>

      <div className="wea-content">



        <section className="wea-section" aria-labelledby="wea-results-title">
          <div className="wea-container">
            <header className="wea-section-heading">
              <h2 id="wea-results-title">Results <span>Achieved in 5 Months</span></h2>
            </header>
            <div className="wea-monthly-performance" aria-label="Monthly Google Business Profile call performance">
              {monthlyCallReports.map(({ month, calls, image }) => <figure className="wea-monthly-report" key={month}>
                <figcaption><strong>{month}</strong><span>{calls} calls from Google Business Profile</span></figcaption>
                <img src={image} alt={`${month} Google Business Profile calls performance report showing ${calls} calls.`} loading="lazy" decoding="async" />
              </figure>)}
            </div>
            <div className="wea-results-grid">
              {results.map((metric, index) => {const Icon=metric.Icon;return <article className={`wea-result-card wea-card wea-result-card--${index % 2 ? 'violet' : 'cyan'}`} key={metric.label}><div className="wea-result-top"><span className="wea-icon"><Icon aria-hidden="true"/></span><span className="wea-number">0{index + 1}</span></div><p>{metric.label}</p><CountMetric metric={metric}/><small>{metric.note}</small></article>})}
            </div>
          </div>
        </section>

        <section className="wea-section" aria-labelledby="wea-timeline-title"><div className="wea-container"><SectionHeading eyebrow="02 / THE JOURNEY" title="Growth Timeline" intro="Five months of focused work, steady optimization, and measurable progress." id="wea-timeline-title"/><div className="wea-timeline">{months.map(({ month, title, items }, index) => <article className={`wea-timeline-item${index % 2 ? ' is-right' : ' is-left'}`} key={month}><div className="wea-timeline-node"><span>{String(index + 1).padStart(2, '0')}</span></div><div className="wea-timeline-card wea-card"><p className="wea-number">{month}</p><h3>{title}</h3><ul>{items.map((item) => <li key={item}><FiCheck aria-hidden="true"/>{item}</li>)}</ul></div></article>)}</div></div></section>

        <section className="wea-closing" aria-labelledby="wea-closing-title">
          <div className="wea-closing-card">
            <div className="wea-closing-copy">
              <h2 id="wea-closing-title">Start Your Next Level of <span>Growth With Us</span></h2>
              <p>Every company has its own story, unique challenge, and vision. At Sage GFX, we combine creativity, strategy, and technology to take your visions into success.</p>
              <Link to="/contact" className="wea-closing-button">Let&rsquo;s grow your business <FiArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default CaseStudiesPage
