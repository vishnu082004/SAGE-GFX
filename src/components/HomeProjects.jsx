import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { number: '01', type: 'WEBSITE DESIGN', title: 'Digital experiences built to move business forward', category: 'Web design', art: 'website' },
  { number: '02', type: 'SEO', title: 'Help the right people find your brand', category: 'Search engine optimization', art: 'seo' },
  { number: '03', type: 'SOCIAL MEDIA MARKETING', title: 'Make every conversation count', category: 'Social media marketing', art: 'smm' },
]

const seoLogos = ['/images/clients/seo/nexxora.webp', '/images/clients/seo/safe-science.webp', '/images/clients/seo/shape-wellness.webp', '/images/clients/seo/siddha-clinic.webp', '/images/clients/seo/optic-care.webp', '/images/clients/seo/rg-academy.webp']
const smmLogos = ['/images/clients/smm/16d.webp', '/images/clients/smm/jeni.webp', '/images/clients/smm/kofeetek.webp', '/images/clients/smm/makon-solution.webp', '/images/clients/smm/optic-care.webp', '/images/clients/smm/peel.webp']

function ProjectArtwork({ type }) {
  if (type === 'website') return <div className="home-project-art home-project-art--image"><img src="/images/clients/websites/mareprints.webp" alt="Mare Prints website homepage" loading="lazy" /><span className="home-project-image-label">MARE PRINTS / WEBSITE</span></div>
  if (type === 'seo' || type === 'smm') return <div className={`home-project-art home-project-art--logos home-project-art--${type}`} aria-label={`${type.toUpperCase()} client work`}>
    {(type === 'seo' ? seoLogos : smmLogos).map((src) => <span className="home-project-logo" key={src}><img src={src} alt="" loading="lazy" /></span>)}
  </div>
  if (type === 'brand') return <div className="home-project-art home-project-art--brand" aria-hidden="true">
    <span className="home-project-brand-orbit"/><span className="home-project-brand-mark">S<span>G</span></span>
    <span className="home-project-brand-caption">SAGE / GFX</span><i className="home-project-brand-swatch home-project-brand-swatch--one"/><i className="home-project-brand-swatch home-project-brand-swatch--two"/>
  </div>
  if (type === 'web') return <div className="home-project-art home-project-art--web" aria-hidden="true">
    <div className="home-project-browser"><div className="home-project-browser-top"><i/><i/><i/><span/></div><div className="home-project-browser-body"><span className="home-project-browser-kicker"/><b/><b/><div/><i/><i/><i/></div></div>
    <span className="home-project-web-glow"/>
  </div>
  return <div className="home-project-art home-project-art--growth" aria-hidden="true">
    <div className="home-project-chart"><span/><span/><span/><span/><span/><svg viewBox="0 0 300 130" preserveAspectRatio="none"><path d="M8 112C51 96 65 101 93 79S140 91 168 59 210 70 239 37 272 37 292 10"/></svg></div>
    <span className="home-project-chart-orb"/>
  </div>
}

function HomeProjects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const context = gsap.context(() => {
      gsap.from('.home-project-card', {
        y: 20,
        opacity: 0,
        duration: 0.55,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 78%', once: true },
      })
    }, section)
    return () => context.revert()
  }, [])

  return <section className="home-projects" id="our-projects" aria-labelledby="home-projects-title" ref={sectionRef}>
    <div className="home-projects-inner">
      <header className="home-projects-heading">
        <div><p className="home-projects-eyebrow"><i/> SELECTED WORK</p><h2 id="home-projects-title">Our <span>Projects</span></h2><p className="home-projects-intro">A glimpse of the ideas, identities and digital experiences we bring to life.</p></div>
        <Link className="home-projects-all" to="/portfolio">Explore all projects <FiArrowUpRight aria-hidden="true"/></Link>
      </header>
      <div className="home-projects-grid" ref={trackRef}>
        {projects.map((project) => <Link className="home-project-card" to="/portfolio" key={project.number}>
          <ProjectArtwork type={project.art}/>
          <div className="home-project-meta"><span>{project.number} / {project.type}</span><FiArrowUpRight aria-hidden="true"/></div>
          <h3>{project.title}</h3>
          <span className="home-project-category">{project.category}</span>
        </Link>)}
      </div>
    </div>
  </section>
}

export default HomeProjects
