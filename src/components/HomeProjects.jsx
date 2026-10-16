import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import websiteProjectImage from '../assets/images/our project/our project/website.webp'
import smmProjectImage from '../assets/images/our project/our project/SMM.webp'
import seoProjectImage from '../assets/images/our project/our project/SEO.webp'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { number: '01', type: 'WEBSITE', title: 'Websites designed to move your business forward', category: 'Web design and development', image: websiteProjectImage, imageAlt: 'Website design illustration with homepage, content, design, and web hosting icons', destination: '/portfolio?category=websites#portfolio-work' },
  { number: '02', type: 'SMM', title: 'Make every conversation count', category: 'Social media marketing', image: smmProjectImage, imageAlt: 'Social media marketing illustration with social platform icons', destination: '/portfolio?category=smm#portfolio-work' },
  { number: '03', type: 'SEO', title: 'Help the right people find your brand', category: 'Search engine optimization', image: seoProjectImage, imageAlt: 'SEO illustration showing backlinks, analysis, traffic, indexing, and ranking', destination: '/portfolio?category=seo#portfolio-work' },
]

function ProjectArtwork({ image, imageAlt, type }) {
  return <div className="home-project-art home-project-art--image"><img src={image} alt={imageAlt} loading="lazy" /><span className="home-project-image-label">{type}</span></div>
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
        {projects.map((project) => <Link className="home-project-card" to={project.destination} key={project.number}>
          <ProjectArtwork image={project.image} imageAlt={project.imageAlt} type={project.type}/>
          <div className="home-project-meta"><span>{project.number} / {project.type}</span><FiArrowUpRight aria-hidden="true"/></div>
          <h3>{project.title}</h3>
          <span className="home-project-category">{project.category}</span>
        </Link>)}
      </div>
    </div>
  </section>
}

export default HomeProjects
