import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlay } from 'react-icons/fi'

const stats = [
  ['😊', '100+', 'Happy clients'],
  ['🚀', '200+', 'Projects completed'],
  ['🏆', '10+', 'Years of experience'],
]

function Hero() {
  return (
    <section className="sage-hero" id="home" aria-labelledby="home-heading">
      <div className="sage-hero-orbit" aria-hidden="true" />
      <div className="sage-hero-inner">
        <div className="sage-hero-copy">
          {/* <p className="sage-hero-eyebrow">SAGE GFX <span aria-hidden="true" /> CHENNAI · STRATEGY / DESIGN / DIGITAL</p> */}
          <h1 id="home-heading">Grow Your Brand with a{' '}<br />Results-Driven <span className="sage-hero-heading-nowrap">Digital Marketing</span>{' '}<br /><span>Agency in Chennai.</span></h1>
          <p className="sage-hero-description">Sage GFX Digital Solutions is a trusted digital marketing company in Chennai. We combine SEO, Google Ads, social media marketing, content, and web solutions to strengthen your online presence, reach the right audience, and drive long-term business growth.</p>
          <div className="sage-hero-actions">
            <Link to="/contact" className="sage-hero-primary"><span className="sage-hero-primary-label--desktop">LET&apos;S GROW YOUR BUSINESS</span><span className="sage-hero-primary-label--mobile">Grow your business</span><FiArrowRight aria-hidden="true" /></Link>
            <Link to="/services" className="sage-hero-secondary"><FiPlay aria-hidden="true" /> Explore our services</Link>
          </div>
          <div className="sage-hero-stats" aria-label="Sage GFX in numbers">
            {stats.map(([emoji, value, label]) => (
              <div className="sage-hero-stat" key={label}>
                <span className="sage-hero-stat-value"><i aria-hidden="true">{emoji}</i><strong>{value}</strong></span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sage-hero-boy-wrap" role="img" aria-label="Sage GFX mascot">
        <img src="/assets/images/sage-boy.webp" alt="" fetchPriority="high" />
      </div>
    </section>
  )
}

export default Hero


