import { Link } from 'react-router-dom'
import { FiArrowRight, FiTrendingUp } from 'react-icons/fi'
import { memo, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import BrandMark from './BrandMark'
import founderPortrait from '../assets/images/team/founder.webp'
import aboutSectionImage from '../assets/images/about image 2.webp'
import '../styles/about-home-redesign.css'

const homeStatement = 'Your Digital Future, Our Expertise: Sage GFX Excellence.'
const pageStatement = 'Your next chapter starts with a better digital presence.'
const aboutTabs = [
  { label: 'Our Mission', content: 'For enabling growth for companies with digital marketing plans that are strategic, executed in a creative way and marketed well to increase visibility and generate valuable business opportunities.' },
  { label: 'Our Vision', content: 'To be regarded as the preferred choice for digital growth partners for businesses in Chennai and other locations by being a company that is strategic, creative and digitally-driven.' },
  { label: 'Our Story', content: 'The vision behind Sage GFX Digital Solutions was that digital marketing agency should be meaningful, practical and driven by genuine business objectives. That is why we strive to achieve excellence in strategy, creativity and digital solutions to enhance online presence and drive business growth.'},
]
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
  if (!pageVersion) {
    return <section id="about" className="about about--home about--home-redesign">
      <div className="container about-container">
        <p className="eyebrow"><span />ABOUT US<span /></p>
        <div className="about-home-layout">
          <div className="about-home-copy">
            <h2 className="section-heading about-statement">
              A Strategic Digital Marketing <span>Partner for Growing Businesses.</span>
            </h2>
            <div className="about-text" id="about-description">
              <div className="about-text-scroll">
              <p>Sage GFX Digital Solutions is a digital marketing agency in Chennai helping businesses build a stronger online presence and turn digital opportunities into meaningful growth. We bring strategy, creativity and technology together to create marketing solutions that connect brands with the right audience.</p>
              <div className="about-text-more">
                  <p>Our digital marketing services in chennai cover SEO, Google Ads, social media marketing, content and web solutions. We take the time to understand your business, audience and goals before creating a strategy that fits your needs-not a one-size-fits-all approach.</p>
                  <p>As a digital marketing company in chennai, our focus goes beyond increasing Webiste traffic and visibility. We aim to build a stronger brand presence, attract relevant audiences and create sustainable opportunities for business growth. Smart strategy. Meaningful connections. Digital growth that moves your business forward.</p>
              </div>
              </div>
            </div>
            <div className="about-metrics about-metrics--tabs" data-active-tab={activeAboutTab}>
              <div className="about-metrics-tabs" role="tablist" aria-label="About Sage GFX" aria-orientation="horizontal">
                {aboutTabs.map((tab, index) => <button ref={(node) => { aboutTabRefs.current[index] = node }} key={tab.label} id={`about-tab-${index}`} type="button" role="tab" aria-selected={activeAboutTab === index} aria-controls="about-tab-panel" tabIndex={activeAboutTab === index ? 0 : -1} onClick={() => setActiveAboutTab(index)} onKeyDown={handleAboutTabKeyDown}>{tab.label}</button>)}
              </div>
              <div className="about-metrics-panel" id="about-tab-panel" role="tabpanel" aria-labelledby={`about-tab-${activeAboutTab}`} key={activeAboutTab}>{aboutTabs[activeAboutTab].content}</div>
            </div>
            <div className="about-actions"><Link to="/about" className="button button-outline about-home-cta">Learn more <FiArrowRight aria-hidden="true" /></Link></div>
          </div>
          <div className="about-home-side">
            <figure className="about-home-visual">
              <img src={aboutSectionImage} alt="Sage GFX digital marketing illustration with analytics, a megaphone, and a creative team" loading="lazy" decoding="async" />
              <span aria-hidden="true" />
            </figure>
            <article className="about-founder-card" aria-label="Meet the founder of Sage GFX">
              <span className="about-founder-portrait"><img src={founderPortrait} alt="Saagar, founder of Sage GFX" loading="lazy" decoding="async" /></span>
              <span className="about-founder-details"><strong>Saagar</strong><small>Founder &amp; CEO</small><em>Sage GFX Digital Solutions</em></span>
              <Link className="about-founder-link" to="/about"><span>Read More</span><FiArrowRight aria-hidden="true" /></Link>
            </article>
          </div>
        </div>
      </div>
    </section>
  }

  return <section id="about" className={`about ${pageVersion ? 'about--page' : 'about--home'}`}>
    <div className="container about-container">
      {pageVersion && <FloatingAboutArtwork reduceMotion={reduceMotion} />}
      <div className="about-content">
        <p className="eyebrow"><span />{pageVersion ? 'OUR JOURNEY' : 'ABOUT US'}</p>
        <motion.h2 className="section-heading about-statement" initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .55 }} transition={{ duration: reduceMotion ? 0 : .45, ease: [.22, 1, .36, 1] }}>
          {pageVersion ? statement : <>A Strategic Digital Marketing <span>Partner  for Growing Businesses.</span></>}
        </motion.h2>
        {!pageVersion && <figure className="about-home-visual"><img src="/images/hero-laptop-bg.webp" alt="Sage GFX digital services displayed on a laptop" loading="lazy" decoding="async" /><span aria-hidden="true" /></figure>}
        <p className="about-text">{pageVersion ? 'Sage GFX is a digital creative studio for businesses ready to grow with purpose. We bring branding, marketing and technology together to create clear, considered experiencesÃ¢â‚¬â€from the first idea to the finished product.' : 'Sage GFX is a leading digital marketing agency based in Chennai, dedicated to helping businesses thrive in the digital landscape. Our expert team specializes in SEO, SEM, social media marketing, content marketing, and more. We craft tailored strategies to boost your online presence, engage your audience, and drive measurable results. Partner with Sage GFX to transform your digital marketing efforts and achieve your business goals.'}</p>
        {pageVersion ? <div className="about-metrics"><div><strong>01</strong><small>Strategy with purpose</small></div><div><strong>02</strong><small>Design with character</small></div><div><strong>03</strong><small>Technology that works</small></div></div> : <div className="about-metrics about-metrics--tabs" data-active-tab={activeAboutTab}>
          <div className="about-metrics-tabs" role="tablist" aria-label="About Sage GFX" aria-orientation="horizontal">
            {aboutTabs.map((tab, index) => <button ref={(node) => { aboutTabRefs.current[index] = node }} key={tab.label} id={`about-tab-${index}`} type="button" role="tab" aria-selected={activeAboutTab === index} aria-controls="about-tab-panel" tabIndex={activeAboutTab === index ? 0 : -1} onClick={() => setActiveAboutTab(index)} onKeyDown={handleAboutTabKeyDown}>{tab.label}</button>)}
          </div>
          <div className="about-metrics-panel" id="about-tab-panel" role="tabpanel" aria-labelledby={`about-tab-${activeAboutTab}`} key={activeAboutTab}>{aboutTabs[activeAboutTab].content}</div>
        </div>}
        <div className="about-actions"><Link to={pageVersion ? '/contact' : '/about'} className={`button button-outline${pageVersion ? '' : ' about-home-cta'}`}>{pageVersion ? 'Start a project' : 'Learn more'} <FiArrowRight /></Link></div>
      </div>
    </div>
  </section>
}

export default About
