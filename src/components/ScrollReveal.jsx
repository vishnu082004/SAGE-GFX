import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

const sectionSelector = [
  '.page-hero', '.about', '.our-clients', '.home-services', '.home-stats', '.home-process',
  '.why-choose', '.client-reviews', '.common-questions', '.home-journal', '.home-contact',
  '.home-cta', '.services', '.mission-vision', '.contact', '.principles-section',
  '.wea-hero', '.wea-section', '.footer',
].join(', ')

const motionGroups = [
  { selector: '.our-clients__heading, .home-services-header, .home-process .home-new-section-heading, .common-questions-heading, .home-journal-heading, .home-contact-copy, .home-projects-heading > div, .our-projects-work-heading, .portfolio-work-heading, .services-header, .services-catalog-heading, .about-team__header, .about-principles-heading, .wea-section-heading, .page-hero-title, .page-hero h1, .wea-hero-copy h2, .about-story__copy h2, .contact-form-panel > h2, .contact-design-hero > h1, .blog-article-heading', direction: 'bottom' },
  { selector: '.page-hero-eyebrow, .about-team__eyebrow, .about-journey__eyebrow, .contact-kicker, .contact-form-kicker, .our-projects-kicker, .portfolio-kicker, .home-projects-eyebrow, .blog-article-category', direction: 'top' },
  { selector: '.about-team__header p, .page-hero-subtitle, .contact-hero-copy, .section-intro, .services-lead, .services-catalog-heading p, .home-projects-intro, .our-projects-work-heading > p, .portfolio-work-heading > p, .about-journey__intro, .blog-article-summary', direction: 'left' },
  { selector: '.about--home-redesign .about-statement, .about--home-redesign .about-text, .about--home-redesign .about-actions, .why-choose-copy, .reviews-copy, .home-contact-form-column, .services-hero-copy, .services-page-header, .about-hero-copy, .about-story__copy, .about-team__header p, .about-journey__intro, .contact-form-panel, .contact-design-copy, .wea-hero-copy, .home-contact-form label, .home-contact-form button, .contact-design-form .contact-field, .contact-design-form .contact-submit', direction: 'left' },
  { selector: '.about--home-redesign .about-home-visual, .why-choose-visual, .reviews-visual, .home-contact-details, .services-hero-stage, .services-page-visual, .services-page-card-art, .services-catalog-image, .about-hero-stage, .about-hero-photo, .about-page-image, .about-story__visual, .about-closing__visual, .contact-detail-card, .contact-map-panel, .contact-design-visual, .wea-hero-art', direction: 'right' },
  { selector: '.about--home-redesign .about-founder-card, .about--home-redesign .about-metrics, .home-services-carousel, .home-stats-grid > .home-stat, .home-process-card, .our-clients__logo, .common-question, .home-journal-card, .home-journal-all-wrap, .home-contact-form .home-contact-status, .service-card, .why-service-card, .services-page-card, .services-catalog-card, .project-card, .portfolio-project, .website-project-card, .blog-card, .principle-card, .about-journey__step, .about-journey__metric, .about-story__pillars > *, .how-card, .review-card, .reviews-bottom-actions, .about-team__leadership, .about-team__manager, .about-team__group, .about-team-card, .footer-premium-grid > *, .footer-minimal-inner > *, .footer-minimal-links > a, .wea-milestone, .wea-strategy-card, .wea-result-card, .wea-timeline-item, .wea-highlight-card, .wea-success-card, .home-project-card, .about-closing__title', direction: 'bottom' },
  { selector: '.home-journal-image, .home-project-card img, .project-card img, .portfolio-project img, .website-project-card img, .blog-card img, .services-page-card-art img', direction: 'left' },
  { selector: '.reviews-rating-orb', direction: 'scale' },
]

function ScrollReveal() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const sections = new Set()
    const motionItems = new Map()
    const intersectionObserver = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-revealed', 'scroll-motion-visible')
          intersectionObserver.unobserve(entry.target)
        })
      }, { threshold: 0.16, rootMargin: '0px 0px -48px 0px' })
      : null

    const syncTargets = () => {
      document.querySelectorAll(sectionSelector).forEach((section) => {
        if (sections.has(section)) return
        sections.add(section)
        if (!intersectionObserver) {
          section.classList.add('is-revealed')
          return
        }
        section.classList.remove('is-revealed')
        section.classList.add('reveal-on-scroll')
        intersectionObserver.observe(section)
      })

      const newItems = []
      motionGroups.forEach(({ selector, direction }) => {
        document.querySelectorAll(selector).forEach((element) => {
          if (element.closest('.sage-ai-panel, .hero-inquiry-modal') || motionItems.has(element)) return
          const logoSequence = selector.includes('.our-clients__logo')
          const item = {
            direction,
            stagger: direction !== 'scale',
            staggerStep: logoSequence ? 14 : 32,
            maxDelay: logoSequence ? 300 : direction === 'bottom' ? 220 : 120,
          }
          motionItems.set(element, item)
          newItems.push([element, item])
        })
      })

      newItems.forEach(([element, { direction, stagger, staggerStep, maxDelay }]) => {
        const siblings = stagger
          ? Array.from(element.parentElement?.children || []).filter((sibling) => motionItems.has(sibling))
          : []
        const siblingIndex = Math.max(0, siblings.indexOf(element))
        element.classList.add('scroll-motion', `scroll-motion--${direction}`)
        element.style.setProperty('--scroll-motion-delay', `${Math.min(siblingIndex * staggerStep, maxDelay)}ms`)
        if (intersectionObserver) intersectionObserver.observe(element)
        else element.classList.add('scroll-motion-visible')
      })
    }

    syncTargets()
    const mutationObserver = new MutationObserver(syncTargets)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutationObserver.disconnect()
      intersectionObserver?.disconnect()
      sections.forEach((section) => section.classList.remove('reveal-on-scroll', 'is-revealed', 'scroll-motion-visible'))
      motionItems.forEach((_, element) => {
        element.classList.remove('scroll-motion', 'scroll-motion--left', 'scroll-motion--right', 'scroll-motion--top', 'scroll-motion--bottom', 'scroll-motion--scale', 'scroll-motion-visible')
        element.style.removeProperty('--scroll-motion-delay')
      })
    }
  }, [pathname])

  return null
}

export default ScrollReveal
