import { Link } from 'react-router-dom'
import { FiArrowDown, FiArrowRight, FiPlay } from 'react-icons/fi'

const stats = [
  ['😊', '100+', 'Happy clients'],
  ['✨', '200+', 'Projects completed'],
  ['🚀', '10+', 'Years of experience'],
]

function Hero() {
  return <section className="sage-hero" id="home" aria-labelledby="home-heading">
    <div className="sage-hero-art" aria-hidden="true" />
    <div className="sage-hero-glow" aria-hidden="true" />
    <div className="sage-hero-inner">
      <div className="sage-hero-copy">
        <p className="sage-hero-eyebrow"><span /> WELCOME TO SAGE GFX · IDEAS / DESIGN / IMPACT</p>
        <h1 id="home-heading">Design that gets<br/>noticed. Digital that<br/><span>drives growth.</span></h1>
        <p className="sage-hero-description">We bring brand strategy, standout design, high-performing websites, and digital marketing together to help you reach the right people and grow with confidence.</p>
        <div className="sage-hero-actions">
          <Link to="/contact" className="sage-hero-primary"><span>Let’s build something</span><FiArrowRight aria-hidden="true" /></Link>
          <Link to="/services" className="sage-hero-secondary"><FiPlay aria-hidden="true" /> Our services</Link>
        </div>
        <div className="sage-hero-stats" aria-label="Sage GFX in numbers">
          {stats.map(([emoji, value, label]) => <div key={label}><span className="sage-hero-stat-value"><i aria-hidden="true">{emoji}</i><strong>{value}</strong></span><span>{label}</span></div>)}
        </div>
      </div>
      <div
        className="sage-hero-visual"
        role="group"
        aria-label="Examples of Sage GFX creative work"
        onPointerMove={(event) => {
          if (event.pointerType === 'touch') return
          const bounds = event.currentTarget.getBoundingClientRect()
          const x = (event.clientX - bounds.left) / bounds.width - 0.5
          const y = (event.clientY - bounds.top) / bounds.height - 0.5
          event.currentTarget.style.setProperty('--spot-x', `${((x + 0.5) * 100).toFixed(1)}%`)
          event.currentTarget.style.setProperty('--spot-y', `${((y + 0.5) * 100).toFixed(1)}%`)
          const layers = { main: 8, growth: 14, mobile: 20 }
          Object.entries(layers).forEach(([layer, depth]) => {
            event.currentTarget.style.setProperty(`--parallax-${layer}-x`, `${(x * depth).toFixed(1)}px`)
            event.currentTarget.style.setProperty(`--parallax-${layer}-y`, `${(y * depth).toFixed(1)}px`)
          })
        }}
        onPointerLeave={(event) => {
          event.currentTarget.style.setProperty('--spot-x', '50%')
          event.currentTarget.style.setProperty('--spot-y', '50%')
          ;['main', 'growth', 'mobile'].forEach((layer) => {
            event.currentTarget.style.setProperty(`--parallax-${layer}-x`, '0px')
            event.currentTarget.style.setProperty(`--parallax-${layer}-y`, '0px')
          })
        }}
      >
        <div className="sage-hero-visual-orbit" aria-hidden="true" />
        <div className="sage-hero-visual-spark sage-hero-visual-spark--one" aria-hidden="true" />
        <div className="sage-hero-visual-spark sage-hero-visual-spark--two" aria-hidden="true" />
        <figure className="sage-hero-image sage-hero-image--main">
          <img src="/images/service-card-graphic-design.webp" alt="Colorful brand identity and graphic design work" fetchPriority="high" />
          <figcaption><span>01</span> Brand identity</figcaption>
        </figure>
        <figure className="sage-hero-image sage-hero-image--growth">
          <img src="/images/service-card-digital-marketing.webp" alt="Digital campaign analytics and growth insights" loading="lazy" />
          <figcaption><span>02</span> Digital growth</figcaption>
        </figure>
        <figure className="sage-hero-image sage-hero-image--mobile">
          <img src="/images/service-card-app-development.webp" alt="Mobile app interface design" loading="lazy" />
          <figcaption>Designed for people</figcaption>
        </figure>
        <div className="sage-hero-visual-note"><span /> Strategy meets imagination</div>
      </div>
    </div>
    <a className="sage-hero-scroll" href="#about" aria-label="Scroll to About Sage GFX"><span>Scroll</span><FiArrowDown aria-hidden="true" /></a>
  </section>
}

export default Hero
