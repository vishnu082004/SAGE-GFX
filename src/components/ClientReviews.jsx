import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiBarChart2, FiSmile, FiStar, FiUsers } from 'react-icons/fi'

// Replace this with the verified Google review link when one is available.
const GOOGLE_REVIEW_URL = ''
const REVIEW_PREVIEW = { rating: 4.9, reviewCount: 120 }

const metrics = [
  { value: '98%', label: 'Client Satisfaction', Icon: FiSmile },
  { value: '250+', label: 'Projects Delivered', Icon: FiBarChart2 },
  { value: '100+', label: 'Happy Clients', Icon: FiUsers },
]

// Demo copy only: replace these entries with consented, verified Google reviews.
const reviews = [
  { name: 'Demo Client 01', text: 'A thoughtful team that brings creative ideas and clear communication to every project.', initials: '01' },
  { name: 'Demo Client 02', text: 'The process felt collaborative, focused, and easy to follow from the first conversation.', initials: '02' },
  { name: 'Demo Client 03', text: 'A polished digital experience shaped around the needs of the business.', initials: '03' },
  { name: 'Demo Client 04', text: 'Reliable guidance and a strong eye for detail throughout the work.', initials: '04' },
  { name: 'Demo Client 05', text: 'A creative partner for turning a rough idea into a clear online presence.', initials: '05' },
]

const particles = Array.from({ length: 12 }, (_, index) => index)

function GoogleMark({ className = '' }) {
  return <span className={`reviews-google-mark ${className}`} aria-label="Google">G</span>
}

function ReviewCard({ review, index }) {
  return <article className={`review-card review-card--${index + 1}`} style={{ '--review-index': index }} aria-label={`Preview review ${index + 1}`}>
    <div className="review-card-top">
      <span className="review-avatar" aria-hidden="true">{review.initials}</span>
      <div className="review-author"><strong>{review.name}</strong><span>Sample review</span></div>
      <GoogleMark className="review-card-google" />
    </div>
    <div className="review-stars" aria-label="Five sample stars">{Array.from({ length: 5 }, (_, star) => <FiStar key={star} aria-hidden="true" />)}</div>
    <p>“{review.text}”</p>
  </article>
}

function ClientReviews() {
  const sectionRef = useRef(null)
  const visualRef = useRef(null)
  const frameRef = useRef(0)
  const ratingRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: .12 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible || !ratingRef.current) return undefined
    const node = ratingRef.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.textContent = REVIEW_PREVIEW.rating.toFixed(1)
      return undefined
    }
    let frame = 0
    const start = performance.now()
    const duration = 1150
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      node.textContent = (REVIEW_PREVIEW.rating * eased).toFixed(1)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isVisible])

  useEffect(() => {
    const visual = visualRef.current
    if (!visual || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    const layers = [...visual.querySelectorAll('[data-depth]')]
    const move = (event) => {
      const bounds = visual.getBoundingClientRect()
      const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1))
      const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1))
      cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(() => layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth || 0)
        layer.style.setProperty('--review-parallax-x', `${x * depth * -1}px`)
        layer.style.setProperty('--review-parallax-y', `${y * depth * -1}px`)
      }))
    }
    const reset = () => {
      cancelAnimationFrame(frameRef.current)
      layers.forEach((layer) => {
        layer.style.setProperty('--review-parallax-x', '0px')
        layer.style.setProperty('--review-parallax-y', '0px')
      })
    }
    visual.addEventListener('pointermove', move, { passive: true })
    visual.addEventListener('pointerleave', reset)
    return () => {
      visual.removeEventListener('pointermove', move)
      visual.removeEventListener('pointerleave', reset)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return <section ref={sectionRef} className={`client-reviews${isVisible ? ' is-visible' : ''}`} aria-labelledby="client-reviews-heading">
    <div className="client-reviews-grid" aria-hidden="true" />
    <div className="client-reviews-inner">
      <div className="reviews-copy">
        <p className="reviews-eyebrow"><i/> Client reviews</p>
        <h2 id="client-reviews-heading">Why Clients Trust<br/><span>Sage GFX</span></h2>
        <p className="reviews-description">Our success is built on the trust and satisfaction of our clients. See what they have to say about their experience working with Sage GFX. We take pride in delivering creative, reliable, and result-driven solutions that make a real impact.</p>

        <div className="reviews-stats" aria-label="Sage GFX results">
          {metrics.map(({ value, label, Icon }) => <div className="reviews-stat" key={label}><Icon aria-hidden="true"/><strong>{value}</strong><span>{label}</span></div>)}
        </div>

        <div className="reviews-cta-block">
          <p className="reviews-cta-label">Loved working with us?</p>
          {GOOGLE_REVIEW_URL
            ? <a className="reviews-cta" href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer"><GoogleMark/> Leave us a Google Review <FiArrowRight aria-hidden="true"/></a>
            : <button className="reviews-cta" type="button" disabled title="A verified Google review link has not been configured yet"><GoogleMark/> Leave us a Google Review <FiArrowRight aria-hidden="true"/></button>}
          <p className="reviews-cta-note">Your feedback helps us grow and serve you better!</p>
        </div>
      </div>

      <div className="reviews-visual" ref={visualRef} role="group" aria-label="Google review rating preview">
        <svg className="reviews-energy-trails" viewBox="0 0 760 660" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="review-trail-gradient" x1="0" x2="1"><stop stopColor="#07d9ef" stopOpacity="0"/><stop offset=".36" stopColor="#168eff"/><stop offset=".72" stopColor="#bd37f5"/><stop offset="1" stopColor="#ff32ca" stopOpacity="0"/></linearGradient></defs><path d="M30 365C120 165 233 174 338 310s210 157 358-22"/><path d="M6 436C128 580 263 510 338 358s170-254 390-168"/><path d="M100 90C250 10 350 170 438 283s164 134 296 38"/></svg>
        <div className="reviews-orbit-ring reviews-orbit-ring--one" data-depth="4" aria-hidden="true"/><div className="reviews-orbit-ring reviews-orbit-ring--two" data-depth="8" aria-hidden="true"/><div className="reviews-orbit-ring reviews-orbit-ring--three" data-depth="12" aria-hidden="true"/>
        <div className="reviews-particles" aria-hidden="true">{particles.map((particle) => <i key={particle} className={`reviews-particle reviews-particle--${particle + 1}`} data-depth={3 + particle % 5}/>)}</div>
        <div className="reviews-rating-orb" data-depth="15"><span className="reviews-orb-google"><GoogleMark/></span><strong ref={ratingRef}>0.0</strong><span className="reviews-orb-stars" aria-label="Five preview stars">★★★★★</span><span className="reviews-orb-label">Google rating</span><span className="reviews-orb-count">Based on {REVIEW_PREVIEW.reviewCount}+ reviews</span><span className="reviews-demo-tag">Preview data</span></div>
        <div className="reviews-card-orbit">{reviews.map((review, index) => <ReviewCard key={review.name} review={review} index={index}/>)}</div>
      </div>
    </div>
  </section>
}

export default ClientReviews
