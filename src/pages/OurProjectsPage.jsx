import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import { categories, categoryContent, seoClientLogos, smmClientLogos, websiteProjects } from '../data/portfolio'

function OurProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedCategory = searchParams.get('category')
  const activeCategory = categories.some(({ id }) => id === requestedCategory) ? requestedCategory : 'websites'

  const selectCategory = (category) => {
    setSearchParams({ category })
  }

  return (
    <main className="our-projects-page">
      <section className="our-projects-hero">
        <div className="our-projects-hero-content">
          <h3 className="page-hero-title our-projects-hero-title">Our <span className="gradient-text">Projects.</span></h3>
          <p className="our-projects-hero-breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">›</span><span aria-current="page">Projects</span></p>
        </div>
      </section>

      <section className="our-projects-work" id="our-projects-work" aria-label="Explore our work">
        <div className="container">
          <div className="our-projects-work-heading">
            <div><h2>Work that works.</h2></div>
            <p>Choose a discipline to explore.</p>
          </div>

          <div className="our-projects-tabs" role="tablist" aria-label="Project disciplines">
            {categories.map(({ id, label }) => (
              <button
                key={id}
                id={`our-projects-tab-${id}`}
                type="button"
                role="tab"
                aria-selected={activeCategory === id}
                aria-controls="our-projects-panel"
                onClick={() => selectCategory(id)}
              >{label}</button>
            ))}
          </div>

          <div className="our-projects-category-panel" id="our-projects-panel" role="tabpanel" aria-labelledby={`our-projects-tab-${activeCategory}`} tabIndex={0}>
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
                  {(activeCategory === 'seo' ? seoClientLogos : smmClientLogos).map((src) => {
                    const isNexxora = src.includes('/nexxora.')
                    return <div className={`seo-client-logo${isNexxora ? ' seo-client-logo--nexxora' : ''}`} key={src}>
                      <img src={isNexxora ? '/images/clients/seo/nexxora-horizontal.webp' : src} alt={isNexxora ? 'Nexxora — Innovate Boldly' : ''} loading="lazy" decoding="async" />
                    </div>
                  })}
                </div>
              </>
            ) : (
              <div className="our-projects-category-copy">
                <p className="our-projects-kicker">{categoryContent[activeCategory].eyebrow}</p>
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

export default OurProjectsPage
