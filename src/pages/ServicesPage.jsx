import Services from '../components/Services'
import Principles from '../components/Principles'
import ScrollCue from '../components/ScrollCue'

function ServicesPage({ openLightbox }) {
  return (
    <div className="services-page">
      <section className="page-hero page-hero--services">
        <div className="container">
          <p className="page-hero-eyebrow">STRATEGY TO EXECUTION</p>
          <h1 className="page-hero-title">Everything your brand needs<br/><span className="gradient-text">to grow online.</span></h1>
        </div>
        <ScrollCue target="page-end" label="the end of the page" durationMs={15500} page />
      </section>

      <Services
        openLightbox={openLightbox}
        description="From the first idea to the final launch, we bring your brand a thoughtful mix of creative and technical expertise."
        dragonVersion
      />

      <Principles variant="services" />
    </div>
  )
}

export default ServicesPage
