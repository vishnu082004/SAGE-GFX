import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import kofeetekLogo from '../assets/images/logo (2)/3.webp'
import twbcLogo from '../assets/images/logo (2)/13.webp'
import simbaLogo from '../assets/images/logo (2)/23.webp'

const categories = [
  { id: 'websites', label: 'Websites' },
  { id: 'smm', label: 'SMM' },
  { id: 'seo', label: 'SEO' },
]

export const seoClientLogos = [
  '/images/clients/seo/nexxora.webp',
  '/images/clients/seo/safe-science.webp',
  '/images/clients/seo/shape-wellness.webp',
  '/images/clients/seo/siddha-clinic.webp',
  '/images/clients/seo/optic-care.webp',
  '/images/clients/seo/rg-academy.webp',
  '/images/clients/seo/jeni-construction.webp',
  '/images/clients/seo/kofeeteck.webp',
  '/images/clients/seo/tuber-buddy.webp',
]

export const smmClientLogos = [
  '/images/clients/smm/16d.webp',
  '/images/clients/smm/jeni.webp',
  '/images/clients/smm/kofeetek.webp',
  '/images/clients/smm/makon-solution.webp',
  '/images/clients/smm/optic-care.webp',
  '/images/clients/smm/peel.webp',
  '/images/clients/smm/rg.webp',
  '/images/clients/smm/safe-science.webp',
  '/images/clients/smm/shape-wellness.webp',
  '/images/clients/smm/siddha.webp',
  '/images/clients/smm/twc.webp',
]

export const websiteProjects = [
  ['mareprints.com', 'https://mareprints.com', 'mareprints'],
  ['kvhomecare.com', 'https://kvhomecare.com', 'kvhomecare'],
  ['baitambaram.com', 'https://baitambaram.com', 'baitambaram'],
  ['powergenco.in', 'https://powergenco.in', 'powergenco'],
  ['16dimensions.com', 'https://16dimensions.com', '16dimensions'],
  ['fourspaces.in', 'https://fourspaces.in', 'fourspaces'],
  ['sreesakthijutebags.in', 'https://sreesakthijutebags.in', 'sreesakthijutebags'],
  ['shopelroi.in', 'https://shopelroi.in', 'shopelroi'],
  ['jananielectricals.com', 'https://jananielectricals.com', 'jananielectricals'],
  ['ambujamscans.com', 'https://ambujamscans.com', 'ambujamscans'],
  ['zeal-solutions.com', 'https://zeal-solutions.com', 'zeal-solutions'],
  ['smartviewinterior.com', 'https://smartviewinterior.com', 'smartviewinterior'],
  ['gangaiproperties.com', 'https://gangaiproperties.com', 'gangaiproperties'],
  ['tulirdesignstudio.com', 'https://tulirdesignstudio.com', 'tulirdesignstudio'],
  ['fcprintchennai.in', 'https://fcprintchennai.in', 'fcprintchennai'],
  ['tuberbuddy.com', 'https://tuberbuddy.com', 'tuberbuddy'],
  ['jeniconstructions.com', 'https://jeniconstructions.com', 'jeniconstructions'],
  ['nnacas.in', 'https://nnacas.in', 'nnacas'],
  ['rgacademy.net/blog/', 'https://rgacademy.net/blog/', 'rgacademy'],
  ['kofeetek.in', 'https://kofeetek.in', null, 'Connection refused', kofeetekLogo],
  ['nmgreenscricketground.com', 'https://nmgreenscricketground.com', null, 'Preview capture timed out'],
  ['tbwctrust.com', 'https://tbwctrust.com', null, 'SSL connection error', twbcLogo],
  ['simbaads.com', 'https://simbaads.com', null, 'Domain not found', simbaLogo],
]

const categoryContent = {
  websites: {
    eyebrow: 'WEB DESIGN & DEVELOPMENT',
    title: 'Digital experiences built to move business forward.',
    description: 'Explore how thoughtful design and dependable development give brands a stronger place to grow online.',
  },
  smm: {
    eyebrow: 'SOCIAL MEDIA MARKETING',
    title: 'Make every conversation count.',
    description: 'Social strategy and creative content help brands show up consistently and build lasting connections.',
  },
}

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
        <div className="container portfolio-hero-content">
          <p className="page-hero-eyebrow"><span /> OUR WORK / SELECTED PROJECTS</p>
          <h1 className="page-hero-title">Good ideas,<br /><span className="gradient-text">made visible.</span></h1>
          <p className="page-hero-subtitle">Digital work that helps ambitious brands connect, grow, and stand out.</p>
          <Link to="/contact" className="portfolio-hero-link">Start a project <span><FiArrowUpRight aria-hidden="true" /></span></Link>
        </div>
        <div className="portfolio-hero-orbit" aria-hidden="true"><span>SG</span><i /><i /><i /></div>
      </section>

      <section className="portfolio-work" id="portfolio-work" aria-label="Explore our work">
        <div className="container">
          <div className="portfolio-work-heading">
            <div><p className="portfolio-kicker">A CLOSER LOOK</p><h2>Work that works.</h2></div>
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
                {websiteProjects.map(([domain, href, preview, previewStatus, logo], index) => (
                  <a className={`website-project-card${previewStatus ? ' website-project-card--logo' : ''}`} href={href} key={domain} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${domain}`}>
                    {previewStatus ? (
                      <div className="website-project-logo-art">{logo ? <img src={logo} alt={`${domain} logo`} loading="lazy" /> : <span className="website-project-wordmark">NM<span>GREENS</span></span>}<span className="website-preview-action">Visit live site <FiArrowUpRight aria-hidden="true" /></span></div>
                    ) : (
                      <div className="website-project-preview"><img src={`/images/clients/websites/${preview}.webp`} alt={`${domain} homepage preview`} loading={index < 6 ? 'eager' : 'lazy'} /><span className="website-preview-action">Visit live site <FiArrowUpRight aria-hidden="true" /></span></div>
                    )}
                    <div className="website-project-meta"><span className="website-project-index">{String(index + 1).padStart(2, '0')}</span><div className="website-project-details"><h3>{domain}</h3>{previewStatus && <span className="website-project-status">{previewStatus}</span>}</div><FiArrowUpRight aria-hidden="true" /></div>
                  </a>
                ))}
              </div>
            ) : activeCategory === 'seo' || activeCategory === 'smm' ? (
              <div className="seo-client-grid" aria-label={`${activeCategory.toUpperCase()} client logos`}>
                {(activeCategory === 'seo' ? seoClientLogos : smmClientLogos).map((src) => <div className="seo-client-logo" key={src}><img src={src} alt="" loading="lazy" /></div>)}
              </div>
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
