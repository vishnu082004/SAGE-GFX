import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import { categories, categoryContent, seoClientLogos, smmClientLogos, websiteProjects } from '../data/portfolio'

function PortfolioPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedCategory = searchParams.get('category')
  const activeCategory = categories.some(({ id }) => id === requestedCategory) ? requestedCategory : 'websites'

  const selectCategory = (category) => {
    setSearchParams({ category })
  }

  return (
    <main className="portfolio-page">
      <section className="portfolio-hero">
        <div className="portfolio-hero-visual">
          <img src="/images/sage-gfx-services-background.webp" alt="" fetchPriority="high" />
        </div>
        <div className="portfolio-hero-content">
          {/* <p className="page-hero-eyebrow"><span /> OUR PROJECTS / SELECTED WORK</p> */}
          <h1 className="page-hero-title">Our <span className="gradient-text">Projects.</span></h1>
          {/* <p className="page-hero-subtitle">See how we bring brands to life with thoughtful design, digital marketing, and modern web experiences.</p> */}
          <Link to="/contact" className="portfolio-hero-link">Start a project <span><FiArrowUpRight aria-hidden="true" /></span></Link>
        </div>
      </section>

      <section className="portfolio-work" id="portfolio-work" aria-label="Explore our work">
        <div className="container">
          <div className="portfolio-work-heading">
            <div><h2>Work that works.</h2></div>
            <p>Choose a discipline to explore.</p>
          </div>

          <div className="portfolio-tabs" role="tablist" aria-label="Project disciplines">
            {categories.map(({ id, label }) => (
              <button
                key={id}
                id={`portfolio-tab-${id}`}
                type="button"
                role="tab"
                aria-selected={activeCategory === id}
                aria-controls="portfolio-panel"
                onClick={() => selectCategory(id)}
              >{label}</button>
            ))}
          </div>

          <div className="portfolio-category-panel" id="portfolio-panel" role="tabpanel" aria-labelledby={`portfolio-tab-${activeCategory}`} tabIndex={0}>
            {activeCategory === 'websites' ? (
              <div className="website-project-grid" aria-label="Website client projects">
                {websiteProjects.map(([domain, href, preview, logo], index) => (
                  <a className={`website-project-card${!preview ? ' website-project-card--logo' : ''}`} href={href} key={domain} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${domain}`}>
                    {!preview ? (
                      <div className="website-project-logo-art">{logo ? <img src={logo} alt={`${domain} logo`} loading="lazy" decoding="async" /> : <span className="website-project-wordmark">NM<span>GREENS</span></span>}<span className="website-preview-action">Visit live site <FiArrowUpRight aria-hidden="true" /></span></div>
                    ) : (
                      <div className="website-project-preview"><img src={`/images/clients/websites/${preview.endsWith('.webp') ? preview : `${preview}.webp`}`} alt={`${domain} homepage preview`} loading={index < 3 ? 'eager' : 'lazy'} decoding="async" /><span className="website-preview-action">Visit live site <FiArrowUpRight aria-hidden="true" /></span></div>
                    )}
                    <div className="website-project-meta"><span className="website-project-index">{String(index + 1).padStart(2, '0')}</span><div className="website-project-details"><h4>{domain}</h4></div><FiArrowUpRight aria-hidden="true" /></div>
                  </a>
                ))}
              </div>
            ) : activeCategory === 'seo' || activeCategory === 'smm' ? (
              <>
                <div className="seo-client-grid" aria-label={`${activeCategory.toUpperCase()} client logos`}>
                  {(activeCategory === 'seo' ? seoClientLogos : smmClientLogos).map((src) => <div className="seo-client-logo" key={src}><img src={src} alt="" loading="lazy" decoding="async" /></div>)}
                </div>
              </>
            ) : (
              <div className="portfolio-category-copy">
                <p className="portfolio-kicker">{categoryContent[activeCategory].eyebrow}</p>
                <h3>{categoryContent[activeCategory].title}</h3>
                <p>{categoryContent[activeCategory].description}</p>
                <Link to="/contact">Discuss a project <FiArrowUpRight aria-hidden="true" /></Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default PortfolioPage

