import { Link } from 'react-router-dom'
import { FiArrowRight, FiBriefcase } from 'react-icons/fi'
import { clientLogoFiles } from '../components/OurClients'
import '../styles/clients-page.css'

function ClientsPage() {
  return (
    <main className="clients-page">
      <section className="clients-page-hero" aria-labelledby="clients-page-title">
        <div className="container clients-page-hero-inner">
          <p className="page-hero-eyebrow">CASE STUDIES / 47 BRANDS</p>
          <h1 id="clients-page-title" className="page-hero-title">Good work grows<br /><span className="gradient-text">together.</span></h1>
          <p className="page-hero-subtitle">We work alongside ambitious teams to build brands, digital experiences, and lasting momentum.</p>
          <Link className="clients-page-hero-link" to="/portfolio">Explore selected projects <FiArrowRight aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="clients-page-gallery" aria-labelledby="clients-gallery-title">
        <div className="container">
          <header className="clients-page-gallery-heading">
            <p className="clients-page-kicker"><FiBriefcase aria-hidden="true" /> GOOD COMPANY</p>
            <h2 id="clients-gallery-title">Brands we’re proud to work with</h2>
            <p>Every collaboration starts with a shared goal and grows through thoughtful creative and digital work.</p>
          </header>
          <div className="clients-page-grid" aria-label={`${clientLogoFiles.length} client brands`}>
            {clientLogoFiles.map((logo, index) => (
              <div className="clients-page-logo" key={logo}>
                <img src={logo} alt={`Client brand ${index + 1}`} loading={index < 6 ? 'eager' : 'lazy'} decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="clients-page-cta">
        <div className="container clients-page-cta-inner">
          <div><p className="clients-page-kicker">YOUR TURN</p><h2>Let’s make something<br /><span className="gradient-text">worth sharing.</span></h2></div>
          <Link className="button button-gradient" to="/contact">Start a conversation <FiArrowRight aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  )
}

export default ClientsPage
