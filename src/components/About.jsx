import { Link } from 'react-router-dom'
import { FiArrowRight, FiTrendingUp } from 'react-icons/fi'
import { memo, useLayoutEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BrandMark from './BrandMark'

const homeStatement = 'Your Digital Future, Our Expertise: Sage GFX Excellence.'
const pageStatement = 'Your next chapter starts with a better digital presence.'
const aboutTabs = [
  { label: 'Our Mission', content: 'We pair clear strategy with standout creative and reliable technology, making every digital touchpoint work harder for your business.' },
  { label: 'Our Vision', content: 'To become a global leader in digital innovation — helping businesses of all sizes create meaningful digital footprints and lasting customer connections through technology.' },
  { label: 'Our Story', content: 'Sage GFX brings strategy, design and technology together to help businesses grow. We create thoughtful digital experiences shaped around each client’s goals.' },
]
gsap.registerPlugin(ScrollTrigger)

const FloatingAboutArtwork = memo(function FloatingAboutArtwork({ reduceMotion }) {
  const artRef = useRef(null)
  const inView = useInView(artRef, { margin: '100px' })
  return <motion.div ref={artRef} className="about-art about-art--floating about-page-image" aria-hidden="true" animate={{ y: !reduceMotion && inView ? [0, -5, 0] : 0 }} transition={{ duration: 8, repeat: !reduceMotion && inView ? Infinity : 0, ease: 'easeInOut' }}>
    <div className="about-floating-frame">
      <img src="/images/sage-analytics-hero.webp" alt="" />
      <div className="about-floating-shade" />
      <span className="about-floating-caption"><i /> STRATEGY / DESIGN / DIGITAL</span>
    </div>
    <div className="about-floating-panel about-floating-panel--top">
      <span className="about-panel-icon"><BrandMark className="brand-mark" /></span>
      <span><b>Made for your next move</b><small>BUILT AROUND YOUR BUSINESS</small></span>
    </div>
    <div className="about-floating-panel about-floating-panel--bottom">
      <span className="about-panel-pulse" />
      <span><b>Ideas into impact</b><small><FiTrendingUp /> THOUGHTFUL DIGITAL GROWTH</small></span>
    </div>
  </motion.div>
})

function About({ pageVersion = false }) {
  const sectionRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const [activeAboutTab, setActiveAboutTab] = useState(0)
  const aboutTabRefs = useRef([])
  const handleAboutTabKeyDown = (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const next = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? aboutTabs.length - 1
        : (activeAboutTab + (event.key === 'ArrowRight' ? 1 : aboutTabs.length - 1)) % aboutTabs.length
    setActiveAboutTab(next)
    aboutTabRefs.current[next]?.focus()
  }
  const statement = pageVersion ? pageStatement : homeStatement
  useLayoutEffect(() => {
    const section = sectionRef.current
    if (pageVersion || !section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const context = gsap.context(() => {
      gsap.from('.about-text, .about-metrics--tabs, .about-actions', {
        y: 18,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 72%', once: true },
      })
      gsap.to('.about-home-visual img', {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      })
    }, section)
    return () => context.revert()
  }, [pageVersion])
  return <section ref={sectionRef} id="about" className={`about ${pageVersion ? 'about--page' : 'about--home'}`}>
    <div className="container about-container">
      {pageVersion && <FloatingAboutArtwork reduceMotion={reduceMotion} />}
      <div className="about-content">
        <p className="eyebrow"><span/>{pageVersion ? 'OUR JOURNEY' : 'WHO WE ARE'}</p>
        <motion.h2 className="section-heading about-statement" initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .55 }} transition={{ duration: reduceMotion ? 0 : .45, ease: [.22, 1, .36, 1] }}>
          {pageVersion ? statement : <>Your Digital Future,<br/>Our Expertise:<br/><span>Sage GFX Excellence.</span></>}
        </motion.h2>
        {!pageVersion && <figure className="about-home-visual"><img src="/images/hero-laptop-bg.webp" alt="Sage GFX digital services displayed on a laptop" loading="lazy" decoding="async"/><span aria-hidden="true"/></figure>}
        <p className="about-text">{pageVersion ? 'Sage GFX is a digital creative studio for businesses ready to grow with purpose. We bring branding, marketing and technology together to create clear, considered experiencesâ€”from the first idea to the finished product.' : 'Sage GFX is a leading digital marketing agency based in Chennai, dedicated to helping businesses thrive in the digital landscape. Our expert team specializes in SEO, SEM, social media marketing, content marketing, and more. We craft tailored strategies to boost your online presence, engage your audience, and drive measurable results. Partner with Sage GFX to transform your digital marketing efforts and achieve your business goals.'}</p>
        {pageVersion ? <div className="about-metrics"><div><strong>01</strong><small>Strategy with purpose</small></div><div><strong>02</strong><small>Design with character</small></div><div><strong>03</strong><small>Technology that works</small></div></div> : <div className="about-metrics about-metrics--tabs">
          <div className="about-metrics-tabs" role="tablist" aria-label="About Sage GFX" aria-orientation="horizontal">
            {aboutTabs.map((tab, index) => <button ref={(node) => { aboutTabRefs.current[index] = node }} key={tab.label} id={`about-tab-${index}`} type="button" role="tab" aria-selected={activeAboutTab === index} aria-controls="about-tab-panel" tabIndex={activeAboutTab === index ? 0 : -1} onClick={() => setActiveAboutTab(index)} onKeyDown={handleAboutTabKeyDown}>{tab.label}</button>)}
          </div>
          <div className="about-metrics-panel" id="about-tab-panel" role="tabpanel" aria-labelledby={`about-tab-${activeAboutTab}`} key={activeAboutTab}>{aboutTabs[activeAboutTab].content}</div>
        </div>}
        <div className="about-actions"><Link to={pageVersion ? '/contact' : '/about'} className={`button button-outline${pageVersion ? '' : ' about-home-cta'}`}>{pageVersion ? 'Start a project' : 'Learn more'} <FiArrowRight/></Link></div>
      </div>
    </div>
  </section>
}

export default About
