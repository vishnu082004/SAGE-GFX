import { FiCheck } from 'react-icons/fi'

const principles = [
  {
    title: 'Our Approach',
    points: [
      'We start with your business goals and audience, then shape a digital plan around what will move the needle.',
      'Strategy, design and development work together so every touchpoint feels like the same brand.',
      'We build for clarity, speed and growth, then refine the experience as your business evolves.',
    ],
  },
  {
    title: 'Our Philosophy',
    points: [
      'Great digital work should make your brand easier to understand and impossible to overlook.',
      'Technology should feel effortless for the people using it and useful for the people running it.',
      'Creative thinking becomes powerful when it is guided by insight and built to perform.',
    ],
  },
  {
    title: 'Our Promise',
    points: [
      'We keep communication clear, timelines visible and decisions grounded in your goals.',
      'We bring care and craft to every detail, from first sketch through launch.',
      'We measure our work by the value it creates for your business and your customers.',
    ],
  },
  {
    title: 'Our Values',
    points: [
      'Curiosity: We keep learning about your customers and the changing digital landscape.',
      'Collaboration: We work as an extension of your team and share context along the way.',
    ],
  },
  {
    title: 'Our Goal',
    points: [
      'To help good businesses grow with more clarity, visibility and confidence online.',
      'To build long-term partnerships that keep creating value after launch.',
    ],
  },
]

function Principles({ variant }) {
  return (
    <section className={'principles-section principles-section--' + variant} aria-label="Our principles">
      <div className="container principles-grid">
        {principles.map((item) => (
          <article className="principle-card" key={item.title}>
            <h2 className="principle-title">{item.title}</h2>
            <ul className="principle-points">
              {item.points.map((point) => (
                <li key={point}>
                  <FiCheck aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Principles
