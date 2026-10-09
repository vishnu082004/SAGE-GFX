import { FiArrowUpRight } from 'react-icons/fi'
import '../styles/our-clients.css'

const clientTypes = [
  { mark: 'ST', label: 'Startups' },
  { mark: 'SM', label: 'Small businesses' },
  { mark: 'GR', label: 'Growing brands' },
  { mark: 'EC', label: 'E-commerce' },
  { mark: 'CR', label: 'Creative teams' },
]

function OurClients() {
  return (
    <section className="our-clients" aria-labelledby="our-clients-title">
      <div className="our-clients__inner">
        <header className="our-clients__heading">
          <p className="our-clients__eyebrow"><span /> OUR CLIENTS <span /></p>
          <h2 id="our-clients-title">Made for <span>ambitious brands</span></h2>
          <p>We partner with teams at every stage, helping turn their next big idea into meaningful digital growth.</p>
        </header>
        <div className="our-clients__list" aria-label="Types of businesses we work with">
          {clientTypes.map(({ mark, label }) => (
            <div className="our-clients__item" key={label}>
              <span className="our-clients__mark" aria-hidden="true">{mark}</span>
              <span>{label}</span>
              <FiArrowUpRight aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurClients
