import Principles from '../components/Principles'
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
          <h1 className="page-hero-title">ABOUT <span className="gradient-text">US.</span></h1>
            {/* <h1 className="">About <span >Us.</span></h1> */}
            {/* <p className="about-hero-deck">We are a Chennai-based creative digital agency helping brands grow through thoughtful design, clear strategy, and effective digital marketing.</p> */}
            <Link to="/contact" className="button button-gradient">Let's build your brand <FiArrowRight aria-hidden="true"/></Link>
          </div>
          {/* <ul className="about-hero-services" aria-label="Our core services">
            <li><b>01</b><span>Branding &amp; Design<small>Identify. Create. Stand out.</small></span></li>
            <li><b>02</b><span>SEO Services<small>Rank higher. Grow faster.</small></span></li>
            <li><b>03</b><span>Social Media Marketing<small>Engage. Build. Convert.</small></span></li>
            <li><b>04</b><span>Web Design &amp; Development<small>Modern. Fast. Responsive.</small></span></li>
          </ul> */}
          <div className="about-hero-stage">
            <img className="about-hero-photo" src="/images/sage-gfx-services-background.webp" alt="" fetchPriority="high" />
          </div>
        </div>
      </section>

      <AboutJourney />
      <AboutTeam />
      <Principles variant="about" />
    </div>
  )
}

export default AboutPage
