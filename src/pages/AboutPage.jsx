import Principles from '../components/Principles'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import AboutTeam from '../components/AboutTeam'
import aboutMarketingArtwork from '../assets/images/about image 2.webp'
import '../styles/about-page-refresh.css'

function AboutPage() {
  return (
    <div className="about-page">
      <section className="page-hero page-hero--about">
        <div className="container about-hero-layout">
          <div className="about-hero-copy">
          <h1 className="page-hero-title">About <span className="gradient-text"> Us.</span></h1>
            <p className="about-hero-breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">›</span><span aria-current="page">About Us</span></p>
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
            <img className="about-hero-photo" src="/images/sage-about-marketing.png" alt="" fetchPriority="high" />
          </div>
        </div>
      </section>

      <section className="about-story" aria-labelledby="about-story-title">
        <div className="about-story__inner">
          <div className="about-story__copy">
            <h1 id="about-story-title">We Help Brands Grow With <span>Digital Marketing.</span></h1>
            <ul className="about-story__points">
              <li><FiCheckCircle aria-hidden="true" /><div><strong>Strategy based on your business objectives</strong><p>At Sage GFX, strategy, creativity, and technology come together to build a better digital presence. We take time to understand your business and market, identify opportunities, and create a strategy that fits your goals.</p></div></li>
              <li><FiCheckCircle aria-hidden="true" /><div><strong>Creative solutions based on digital knowledge</strong><p>From SEO, AEO, and GEO to social media and performance marketing, web development, graphic design, video editing, and videography, we create solutions suited to your objectives and audience.</p></div></li>
              <li><FiCheckCircle aria-hidden="true" /><div><strong>Connected digital solutions for sustainable growth</strong><p>We collaborate with you through concept development and implementation to connect every part of your digital presence and support lasting business growth.</p></div></li>
            </ul>
            {/* <p className="about-story__body">From the first conversation to the final detail, our team builds thoughtful digital experiences around real business goals. We work collaboratively, keep the process clear, and make every part of the work feel connected.</p> */}
          </div>
          <figure className="about-story__visual">
            <img src={aboutMarketingArtwork} alt="Digital marketing campaign illustration with analytics, ads, and a creative team" loading="lazy" decoding="async" />
          </figure>
        </div>
      </section>

      <AboutTeam />
      <Principles variant="about" />
      <section className="about-closing" aria-labelledby="about-closing-title">
        <div className="about-closing__copy">
          <h2 className="about-closing__title" id="about-closing-title">Start Your Next Level of <span>Growth With Us</span></h2>
          <p className="about-closing__description">Every company has its own story, unique challenge, and vision. At Sage GFX, we combine creativity, strategy, and technology to take your visions into success.</p>
          <div className="about-closing__actions">
            <Link to="/contact" className="about-closing__button about-closing__button--primary">Talk to our team <FiArrowRight aria-hidden="true" /></Link>
            <Link to="/case-studies" className="about-closing__button about-closing__button--secondary">See our results</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
export default AboutPage

