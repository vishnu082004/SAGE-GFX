import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollReveal() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const sections = document.querySelectorAll(
      '.page-hero, .about, .services, .mission-vision, .contact, .principles-section, .principle-card, .project-card, .blog-card'
    )

    if (!('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -48px 0px' }
    )

    sections.forEach((section) => {
      section.classList.remove('is-revealed', 'reveal-on-scroll')
      section.classList.add('reveal-on-scroll')
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [pathname])

  return null
}

export default ScrollReveal
