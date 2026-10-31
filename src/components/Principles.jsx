import { FiTarget, FiUser, FiMonitor, FiTrendingUp } from 'react-icons/fi'
import sageLogo from '../assets/images/sage-gfx-navbar.webp'

const principleIcons = [FiTarget, FiUser, FiMonitor, FiTrendingUp]
const titleAccents = ['Strategy', 'You', 'Digital Solutions', 'Development']

const principles = [
  {
    title: 'Purposeful Strategy',
    points: [
      'We first learn about your business, target market and objectives to develop an useful digital strategy for you.',
    ],
  },
  {
    title: 'Made Just For You',
    points: [
     'Because your business is unique, so should be your marketing. We design digital solutions to match your brand identity and message.',
    ],
  },
  {
    title: 'One Team, Many Digital Solutions',
    points: [
      'We have the necessary skills under one roof for SEO, AEO, social media marketing, paid marketing, websites, and content creation.',
    ],
  },
  {
    title: 'Dedicated to Long-term Development',
    points: [
      'This is not about short-term gains only; we are dedicated to developing more visibility, connections, and online presence for you and your organization.',
    ],
  },
]

function Principles({ variant }) {
  const displayedPrinciples = principles

  return (
    <section id={variant === 'about' ? 'about-principles' : undefined} className={'principles-section principles-section--' + variant} aria-label="Our principles">
      <div className="container">
        {/* {variant === 'services' && <header className="services-philosophy-heading"><p className="eyebrow"><span /> HOW WE WORK / 05 PRINCIPLES</p><h2>Good work starts<br/>with <span className="gradient-text">good thinking.</span></h2><p>Every project is shaped around people, purpose, and progress that lasts.</p></header>} */}
        {variant === 'about' && (
          <header className="about-principles-heading">
            <div className="about-principles-eyebrow" aria-hidden="true">
              <span className="about-principles-eyebrow__line about-principles-eyebrow__line--cyan" />
              <span className="about-principles-mark"><img src={sageLogo} alt="Sage GFX" /></span>
              <span className="about-principles-eyebrow__line about-principles-eyebrow__line--purple" />
            </div>
            <h2>More Than a Digital <span>Marketing Agency.</span></h2>
            {/* <p>A thoughtful, connected approach to sustainable digital growth.</p> */}
          </header>
        )}
        <div className="principles-grid">
          {displayedPrinciples.map((item, index) => {
            const Icon = principleIcons[index]
            return (
            <article className="principle-card" key={item.title} style={{ '--principle-index': index }}>
              {variant === 'services' && <span className="principle-index" aria-hidden="true">0{index + 1}</span>}
              {variant === 'about'
                ? <div className="principle-card__heading">
                    <span className="principle-card__icon"><Icon aria-hidden="true" /></span>
                    <h3 className="principle-title">{item.title.split(titleAccents[index]).map((part, partIndex, parts) => <span key={`${part}-${partIndex}`}>{part}{partIndex < parts.length - 1 && <strong>{titleAccents[index]}</strong>}</span>)}</h3>
                  </div>
                : <h2 className="principle-title">{item.title}</h2>}
              <ul className="principle-points">
                {item.points.map((point) => (
                  <li key={point}>
                    {variant === 'about' ? <p>{point}</p> : <span>{point}</span>}
                  </li>
                ))}
              </ul>
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Principles
