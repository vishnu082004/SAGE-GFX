import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollReveal() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const sections = document.querySelectorAll(
      '.page-hero, .about, .services, .mission-vision, .contact, .principles-section, .principle-card, .project-card, .blog-card'
    )

    const motionGroups = [
      { selector: '.about-team__header, .services-header, .services-catalog-heading, .home-projects-heading > div, .portfolio-work-heading, .common-questions-heading, .contact-form-panel > h2, .contact-design-hero > h1, .blog-article-heading', direction: 'bottom' },
      { selector: '.page-hero-eyebrow, .about-team__eyebrow, .about-journey__eyebrow, .contact-kicker, .contact-form-kicker, .portfolio-kicker, .home-projects-eyebrow, .careers-eyebrow, .careers-section-label, .blog-article-category', direction: 'top' },
      { selector: '.about-team__header p, .page-hero-subtitle, .contact-hero-copy, .section-intro, .services-lead, .services-catalog-heading p, .home-projects-intro, .portfolio-work-heading > p, .careers-hero-copy, .careers-teams-intro, .about-journey__intro, .blog-article-summary', direction: 'left' },
      { selector: '.about-team__leadership, .about-team__manager, .about-team__group, .about-team-card, .service-card, .services-catalog-card, .project-card, .portfolio-project, .website-project-card, .seo-client-logo, .blog-card, .career-role-card, .careers-team-card, .principle-card, .about-journey__step, .about-journey__metric, .contact-detail-card, .contact-map-panel, .contact-form-panel, .how-card, .review-card, .footer-premium-grid > *', direction: 'alternate' },
    ]
    const motionItems = new Map()

    motionGroups.forEach(({ selector, direction }) => {
      document.querySelectorAll(selector).forEach((element) => {
        if (element.closest('.sage-ai-panel, .hero-inquiry-modal')) return
        const siblingIndex = Array.from(element.parentElement?.children || []).indexOf(element)
        const selectedDirection = direction === 'alternate'
          ? (siblingIndex % 2 === 0 ? 'left' : 'right')
          : direction
        motionItems.set(element, selectedDirection)
      })
    })

    if (!('IntersectionObserver' in window)) {
      motionItems.forEach((_, element) => element.classList.add('scroll-motion-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            entry.target.classList.add('scroll-motion-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px 0px' }
    )

    sections.forEach((section) => {
      section.classList.remove('is-revealed', 'reveal-on-scroll')
      section.classList.add('reveal-on-scroll')
      observer.observe(section)
    })

    motionItems.forEach((direction, element) => {
      const siblings = Array.from(element.parentElement?.children || []).filter((sibling) => motionItems.has(sibling))
      const siblingIndex = Math.max(0, siblings.indexOf(element))
      element.classList.add('scroll-motion', `scroll-motion--${direction}`)
      element.style.setProperty('--scroll-motion-delay', `${Math.min(siblingIndex * 85, 340)}ms`)
      observer.observe(element)
    })

    return () => {
      observer.disconnect()
      motionItems.forEach((_, element) => {
        element.classList.remove('scroll-motion', 'scroll-motion--left', 'scroll-motion--right', 'scroll-motion--top', 'scroll-motion--bottom', 'scroll-motion-visible')
        element.style.removeProperty('--scroll-motion-delay')
      })
    }
  }, [pathname])

  return null
}

export default ScrollReveal
