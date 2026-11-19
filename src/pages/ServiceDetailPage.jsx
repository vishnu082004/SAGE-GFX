import { useEffect, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiMail, FiPhone, FiLink, FiSearch, FiTarget, FiLayers, FiTrendingUp } from 'react-icons/fi'
import { SiGooglesearchconsole, SiSemrush, SiGoogleads, SiMeta, SiGoogleanalytics, SiMailchimp, SiHubspot, SiFigma, SiLooker, SiHotjar } from 'react-icons/si'
import servicesData from '../data/services'
import { contactEmail, contactPhone, contactPhoneLink } from '../data/contactInfo'
import smmAboutImage from '../assets/images/service image 4.webp'

const approach = [
  { title: 'Understand', text: 'We learn about your business, audience, goals, and current challenges before recommending a direction.', Icon: FiTarget },
  { title: 'Plan', text: 'We shape a clear scope, priorities, and practical next steps around the service you need.', Icon: FiLayers },
  { title: 'Create and deliver', text: 'Our team puts the plan into action, keeping the work aligned with your brand and intended audience.', Icon: FiArrowRight },
  { title: 'Review and refine', text: 'We review the work with you and use feedback and available performance signals to guide improvements.', Icon: FiTrendingUp },
]

const toolkitRows = [
  [
    { name: 'Search Console', Icon: SiGooglesearchconsole },
    { name: 'SEMrush', Icon: SiSemrush },
    { name: 'Ahrefs', Icon: FiLink },
    { name: 'Google Ads', Icon: SiGoogleads },
    { name: 'Meta Ads', Icon: SiMeta },
    { name: 'Google Analytics 4', Icon: SiGoogleanalytics },
  ],
  [
    { name: 'Mailchimp', Icon: SiMailchimp },
    { name: 'HubSpot', Icon: SiHubspot },
    { name: 'Figma', Icon: SiFigma },
    { name: 'Looker Studio', Icon: SiLooker },
    { name: 'Screaming Frog', Icon: FiSearch },
    { name: 'Hotjar', Icon: SiHotjar },
  ],
]

function ToolkitMarquee() {
  return <div className="detail-toolkit-marquee" aria-label="Digital marketing toolkit">
    {toolkitRows.map((row, rowIndex) => <div className={`detail-toolkit-row detail-toolkit-row--${rowIndex + 1}`} key={rowIndex} aria-hidden="true">
      <div className="detail-toolkit-track">
        {[...row, ...row].map(({ name, Icon }, itemIndex) => <span className="detail-toolkit-pill" key={`${name}-${itemIndex}`}>
          <Icon aria-hidden="true" /><span>{name}</span>
        </span>)}
      </div>
    </div>)}
  </div>
}

function ServiceAboutSection({ description, image }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    if (!('IntersectionObserver' in window)) {
      section.classList.add('is-revealed')
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      section.classList.add('is-revealed')
      observer.disconnect()
    }, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return <section ref={sectionRef} className="service-detail-about service-detail-about--reveal" aria-labelledby="service-about-heading">
    <div className="service-detail-about-aside">
      <div className="service-detail-section-label">01 / ABOUT THE SERVICE</div>
      {image && <img className="service-detail-about-image" src={image} alt="Social media marketing sign with growth and audience engagement goals" loading="lazy" />}
    </div>
    <div>
      <h2 id="service-about-heading">A clear starting point for better digital growth.</h2>
      <p>{description}</p>
    </div>
  </section>
}

function ServiceDetailPage() {
  const { slug = '' } = useParams()
  const service = servicesData.find((item) => item.slug.trim() === slug.trim())

  if (!service) return <Navigate to="/services" replace />

  const isSocialMediaMarketing = service.slug === 'social-media-marketing'
  const isSearchEngineOptimization = service.slug === 'search-engine-optimization'
  const toolkitItems = service.details || []
  const faqs = [
    {
      question: `What does ${service.title.trim()} include?`,
      answer: `Our ${service.title.trim()} work can include ${toolkitItems.slice(0, 4).join(', ').toLowerCase()}${toolkitItems.length > 4 ? ', and more based on your needs' : ''}. We’ll confirm the right scope after understanding your goals.`,
    },
    {
      question: `How do you plan a ${service.title.trim()} project?`,
      answer: `We start by learning about your business, audience, and objectives. Then we recommend a practical plan shaped around ${service.title.trim().toLowerCase()} and agree on the scope before work begins.`,
    },
    {
      question: 'Can this service be combined with other Sage GFX services?',
      answer: 'Yes. We can coordinate this work with other relevant services, such as website development, social media, search, design, or video, depending on your project goals.',
    },
    {
      question: 'How do I get started?',
      answer: `Contact our team with a little information about your business and what you want to achieve with ${service.title.trim().toLowerCase()}. We’ll discuss suitable next steps with you.`,
    },
  ]

  return (
    <div className="service-detail-page service-detail-structured">
      <section className={`service-detail-hero${isSocialMediaMarketing ? ' service-detail-hero--smm' : ''}${isSearchEngineOptimization ? ' service-detail-hero--seo' : ''}`} style={{ '--service-detail-image': `url("${service.image}")` }}>
        <div className="service-detail-hero-inner">
          {isSocialMediaMarketing ? <>
            <div className="service-detail-smm-copy">
              <p className="service-detail-smm-eyebrow">SOCIAL MEDIA MARKETING THAT HELPS YOUR BRAND PROGRESS</p>
              <h2 className="service-detail-smm-title"><span className="service-detail-smm-line">Brand Building.<br className="service-detail-smm-mobile-break" /> Connecting with Your Audience.</span><span className="service-detail-smm-title-accent">Growing through Social Media.</span></h2>
              <p className="service-detail-summary">Through Sage GFX Digital Solutions, we craft a unique social media marketing strategy for you to connect and build a relationship with the right people online. We do this through content creation, scheduling posts, audience engagement, and campaign management ? all helping to ensure your social platform becomes an asset for your brand growth.</p>
            </div>
          </> : <>
            <Link className="service-detail-back" to="/services"><FiArrowLeft aria-hidden="true" /> All services</Link>
            <p className="service-detail-kicker">SAGE GFX / DIGITAL SERVICES</p>
            <h1>{service.title.trim()}</h1>
            <p className="service-detail-summary">{service.description}</p>
            <a className="service-detail-primary" href="#service-contact">Discuss your project <FiArrowUpRight aria-hidden="true" /></a>
          </>}
        </div>
      </section>

      <div className="service-detail-body">
        <ServiceAboutSection description={service.description} image={isSocialMediaMarketing ? smmAboutImage : undefined} />

        <section className="service-detail-reasons" aria-labelledby="service-reasons-heading">
          <header className="service-detail-heading">
            <p className="service-detail-section-label">02 / WHY CHOOSE US</p>
            <h2 id="service-reasons-heading">Thoughtful work, shaped around your goals.</h2>
          </header>
          <div className="service-detail-reason-grid">
            <article><span>01</span><h3>Built around your business</h3><p>We consider your audience, brand, and priorities before shaping the work.</p></article>
            <article><span>02</span><h3>Creative and practical</h3><p>Strategy and execution work together, with clear steps you can understand and review.</p></article>
            <article><span>03</span><h3>Connected expertise</h3><p>Your {service.title.trim().toLowerCase()} can work alongside the other digital services your project needs.</p></article>
          </div>
        </section>

        <section className="service-detail-approach" aria-labelledby="service-approach-heading">
          <header className="service-detail-heading">
            <p className="service-detail-section-label">03 / OUR PROVEN APPROACH</p>
            <h2 id="service-approach-heading">A process that keeps the work moving.</h2>
          </header>
          <div className="service-detail-approach-grid">
            {approach.map(({ title, text, Icon }, index) => <article key={title}>
              <span className="service-detail-approach-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="service-detail-approach-icon"><Icon aria-hidden="true" /></span>
              <h3>{title}</h3><p>{text}</p>
            </article>)}
          </div>
        </section>

        <section className="service-detail-toolkit" aria-labelledby="service-toolkit-heading">
          <header className="service-detail-heading">
            <p className="detail-toolkit-eyebrow"><span aria-hidden="true" />OUR TOOLKIT</p>
            <h2 id="service-toolkit-heading">Driven by data, powered by the <span>best stack</span></h2>
          </header>
          <p className="detail-toolkit-intro">We invest in enterprise-grade platforms so every decision on your account is backed by evidence, not opinion.</p>
          <ToolkitMarquee />
        </section>

        <section className="service-detail-conclusion" aria-labelledby="service-conclusion-heading">
          <p className="service-detail-section-label">05 / THE NEXT STEP</p>
          <h2 id="service-conclusion-heading">Make your next move with a clear plan.</h2>
          <p>Every business has different needs. Tell us what you’re working toward, and we’ll help you decide whether {service.title.trim().toLowerCase()} is the right next step.</p>
          <Link className="service-detail-primary" to="/contact">Start a conversation <FiArrowRight aria-hidden="true" /></Link>
        </section>

        <section className="service-detail-faq" aria-labelledby="service-faq-heading">
          <header className="service-detail-heading">
            <p className="service-detail-section-label">06 / FAQ</p>
            <h2 id="service-faq-heading">Questions about {service.title.trim()}?</h2>
          </header>
          <div className="service-detail-faq-list">
            {faqs.map(({ question, answer }) => <details key={question}>
              <summary>{question}<span aria-hidden="true">+</span></summary>
              <p>{answer}</p>
            </details>)}
          </div>
        </section>

        <section className="service-detail-cta" aria-labelledby="service-cta-heading">
          <div><p className="service-detail-section-label">READY WHEN YOU ARE</p><h2 id="service-cta-heading">Let’s talk about your next project.</h2></div>
          <Link className="service-detail-primary" to="/contact">Get in touch <FiArrowUpRight aria-hidden="true" /></Link>
        </section>

        <section className="service-detail-contact" id="service-contact" aria-labelledby="service-contact-heading">
          <div><p className="service-detail-section-label">CONTACT US</p><h2 id="service-contact-heading">We’d be glad to hear from you.</h2><p>Talk with our team about your goals, questions, and the right next step for your business.</p></div>
          <div className="service-detail-contact-links">
            <a href={contactPhoneLink}><FiPhone aria-hidden="true" /><span><small>Call our team</small>{contactPhone}</span></a>
            <a href={`mailto:${contactEmail}`}><FiMail aria-hidden="true" /><span><small>Email us</small>{contactEmail}</span></a>
            <Link to="/contact"><FiArrowUpRight aria-hidden="true" /><span><small>Send an enquiry</small>Contact page</span></Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ServiceDetailPage
