import { FiArrowRight, FiAward, FiBriefcase, FiHeart, FiZap, FiTrendingUp, FiUsers, FiEdit3 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import '../styles/about-journey.css'

const journeySteps = [
  { title: 'Ideas', description: 'We listen, understand and turn your vision into a plan.', Icon: FiZap },
  { title: 'Creativity', description: 'We design and develop with the latest tools and modern technology.', Icon: FiEdit3 },
  { title: 'Impact', description: 'You get powerful digital solutions that create real growth.', Icon: FiTrendingUp },
]

const journeyMetrics = [
  { value: '01+', label: 'Years of Experience', Icon: FiAward },
  { value: '50+', label: 'Projects Delivered', Icon: FiBriefcase },
  { value: '30+', label: 'Happy Clients', Icon: FiUsers },
  { value: '100%', label: 'Passion in Every Pixel', Icon: FiHeart },
]

function AboutJourney() {
  return (
    <section className="about-journey" aria-labelledby="about-journey-title">
      {/* <div className="about-journey__top-action">
        <Link to="/contact">Let’s Build Something Great <FiArrowRight aria-hidden="true" /></Link>
      </div> */}
      <div className="about-journey__panel">
        <div className="about-journey__intro">
          <p className="about-journey__eyebrow">Our Journey</p>
          <h2 id="about-journey-title">From Ideas to<br />Lasting <span>Impact</span></h2>
          <p>Every project starts with a thought, grows with creativity, and ends with a result that makes a difference.</p>
          <span className="about-journey__stroke" aria-hidden="true" />
        </div>

        <div className="about-journey__steps">
          {journeySteps.map(({ title, description, Icon }, index) => (
            <div className="about-journey__step" key={title}>
              <div className="about-journey__icon"><Icon aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{description}</p>
              {index < journeySteps.length - 1 && <FiArrowRight className="about-journey__arrow" aria-hidden="true" />}
            </div>
          ))}
        </div>

        <div className="about-journey__metrics" aria-label="Sage GFX at a glance">
          {journeyMetrics.map(({ value, label, Icon }) => (
            <div className="about-journey__metric" key={label}>
              <Icon aria-hidden="true" />
              <p><strong>{value}</strong><span>{label}</span></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutJourney
