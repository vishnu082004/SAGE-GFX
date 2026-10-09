import Principles from '../components/Principles'
import ScrollCue from '../components/ScrollCue'
import BrandMark from '../components/BrandMark'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import AboutTeam from '../components/AboutTeam'
import AboutJourney from '../components/AboutJourney'

function AboutPage() {
  return (
    <div className="about-page">
      <section className="page-hero page-hero--about">
        <div className="container about-hero-layout">
          <div className="about-hero-copy">
            <p className="page-hero-eyebrow">ABOUT SAGE GFX <i/> IDEAS / DESIGN / IMPACT</p>
            <h1 className="page-hero-title">We turn clear ideas<br/><span className="gradient-text">into digital impact.</span></h1>
            <p className="about-hero-deck">A creative studio bringing strategy, design and technology together to help ambitious brands grow.</p>
            <Link to="/contact" className="button button-gradient">Meet your next move <FiArrowRight aria-hidden="true"/></Link>
          </div>
          <div className="about-hero-stage" aria-hidden="true">
            <div className="about-hero-orbit about-hero-orbit--one"/><div className="about-hero-orbit about-hero-orbit--two"/>
            <div className="about-hero-core"><BrandMark className="brand-mark"/><span>SAGE GFX</span><small>CREATIVE DIGITAL STUDIO</small></div>
            <div className="about-hero-step about-hero-step--strategy"><b>01</b> Strategy</div>
            <div className="about-hero-step about-hero-step--design"><b>02</b> Design</div>
            <div className="about-hero-step about-hero-step--technology"><b>03</b> Technology</div>
          </div>
        </div>
        <ScrollCue target="page-end" label="the end of the page" durationMs={10500} page />
      </section>

      <AboutJourney />
      <AboutTeam />
      <Principles variant="about" />
    </div>
  )
}

export default AboutPage
