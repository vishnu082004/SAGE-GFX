import { useCallback, useEffect, useRef, useState } from 'react'
import services from '../data/services'
import {
  FiCamera, FiCode, FiCpu, FiHelpCircle,
  FiPenTool, FiSearch, FiShare2, FiTarget,
} from 'react-icons/fi'
import '../styles/home-services-carousel.css'

const serviceIcons = [FiSearch, FiHelpCircle, FiCpu, FiShare2, FiTarget, FiCode, FiPenTool, FiCamera]

function wrapOffset(index, activeIndex) {
  const half = Math.floor(services.length / 2)
  return ((index - activeIndex + services.length + half) % services.length) - half
}

function HomeServicesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [isDocumentVisible, setIsDocumentVisible] = useState(true)
  const sectionRef = useRef(null)
  const timerRef = useRef(0)
  const rafRef = useRef(0)
  const dragRef = useRef(null)
  const wheelLockRef = useRef(false)
  const wheelTimerRef = useRef(0)
  const isHoveringCardRef = useRef(false)

  const move = useCallback((step) => setActiveIndex((current) => (current + step + services.length) % services.length), [])

  const scheduleRotation = useCallback(() => {
    window.clearTimeout(timerRef.current)
    if (reduceMotion || !isVisible || !isDocumentVisible || isHoveringCardRef.current) return
    timerRef.current = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % services.length)
    }, window.matchMedia('(max-width: 700px)').matches ? 4600 : 3200)
  }, [isDocumentVisible, isVisible, reduceMotion])

  const interact = useCallback(() => scheduleRotation(), [scheduleRotation])

  const pauseForCardHover = () => {
    isHoveringCardRef.current = true
    window.clearTimeout(timerRef.current)
  }

  const resumeAfterCardHover = () => {
    isHoveringCardRef.current = false
    scheduleRotation()
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => {
        setIsVisible(entry.isIntersecting)
        if (entry.isIntersecting) setHasEntered(true)
      }, { threshold: .12 })
      : null
    observer?.observe(section)
    if (!observer) {
      setIsVisible(true)
      setHasEntered(true)
    }
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReduceMotion(motionPreference.matches)
    const updateDocumentVisibility = () => setIsDocumentVisible(document.visibilityState !== 'hidden')
    updateMotion()
    updateDocumentVisibility()
    if (motionPreference.addEventListener) motionPreference.addEventListener('change', updateMotion)
    else motionPreference.addListener?.(updateMotion)
    document.addEventListener('visibilitychange', updateDocumentVisibility)
    return () => {
      observer?.disconnect()
      if (motionPreference.removeEventListener) motionPreference.removeEventListener('change', updateMotion)
      else motionPreference.removeListener?.(updateMotion)
      document.removeEventListener('visibilitychange', updateDocumentVisibility)
      window.clearTimeout(timerRef.current)
      window.clearTimeout(wheelTimerRef.current)
      window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    const onWheel = (event) => {
      const horizontalDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.15
        ? event.deltaX
        : event.shiftKey ? event.deltaY : 0
      if (Math.abs(horizontalDelta) < 16) return
      event.preventDefault()
      if (wheelLockRef.current) return
      wheelLockRef.current = true
      move(horizontalDelta > 0 ? 1 : -1)
      interact()
      wheelTimerRef.current = window.setTimeout(() => { wheelLockRef.current = false }, 480)
    }
    section.addEventListener('wheel', onWheel, { passive: false })
    return () => section.removeEventListener('wheel', onWheel)
  }, [interact, move])

  useEffect(() => {
    scheduleRotation()
    return () => window.clearTimeout(timerRef.current)
  }, [scheduleRotation, activeIndex])

  const trackPointer = (event) => {
    if (reduceMotion || !sectionRef.current) return
    const clientX = event.clientX
    const clientY = event.clientY
    window.cancelAnimationFrame(rafRef.current)
    rafRef.current = window.requestAnimationFrame(() => {
      const section = sectionRef.current
      if (!section) return
      const bounds = section.getBoundingClientRect()
      const x = ((clientX - bounds.left) / bounds.width) * 100
      const y = ((clientY - bounds.top) / bounds.height) * 100
      section.style.setProperty('--pointer-x', `${x}%`)
      section.style.setProperty('--pointer-y', `${y}%`)
      section.style.setProperty('--mouse-tilt-x', `${((x - 50) / 50) * 6}deg`)
      section.style.setProperty('--mouse-tilt-y', `${((50 - y) / 50) * 4}deg`)
    })
  }

  const beginDrag = (event) => {
    if (event.target.closest?.('button, a, input, textarea, select')) return
    if (event.pointerType === 'mouse' && event.button !== 0) return
    dragRef.current = { x: event.clientX, y: event.clientY, id: event.pointerId, moved: false }
    event.currentTarget.setPointerCapture?.(event.pointerId)
    interact()
  }

  const finishDrag = (event) => {
    const drag = dragRef.current
    if (!drag || drag.id !== event.pointerId) return
    const dx = event.clientX - drag.x
    const dy = event.clientY - drag.y
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.15) move(dx < 0 ? 1 : -1)
    dragRef.current = null
    interact()
  }

  const onKeyDown = (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    move(event.key === 'ArrowRight' ? 1 : -1)
    interact()
  }

  return <section ref={sectionRef} id="services" className={`home-services${hasEntered ? ' is-entered' : ''}${reduceMotion ? ' is-reduced-motion' : ''}`} aria-labelledby="home-services-heading" onPointerMove={trackPointer} onPointerEnter={interact} onPointerDown={beginDrag} onPointerUp={finishDrag} onPointerCancel={() => { dragRef.current = null }} onKeyDown={onKeyDown} onFocusCapture={interact} onMouseLeave={() => { sectionRef.current?.style.setProperty('--pointer-x', '50%'); sectionRef.current?.style.setProperty('--pointer-y', '45%') }}>
    <div className="home-services-ambience" aria-hidden="true"><span /><i /><b /></div>
    <div className="container home-services-inner">
      <header className="home-services-header">
        <p className="eyebrow our-services-eyebrow"><span /> Our services</p>
          <h2 id="home-services-heading">Creative Thinking , Smarter Technology<br></br> <span className="gradient-text">Stronger Growth.</span></h2>
        <p>We can deliver solutions for you that range from SEO and performance marketing to social media, content marketing, paid marketing, and web solutions.</p>
      </header>

      <div className="home-services-carousel" role="region" aria-roledescription="carousel" aria-label="Sage GFX services" aria-live="off" onPointerEnter={interact}>
        <div className="home-services-stage">
          {services.map(({ title, description, details, iconIndex }, index) => {
            const ServiceIcon = serviceIcons[iconIndex] || FiTarget
            const offset = wrapOffset(index, activeIndex)
            const isActive = offset === 0
            const repetitions = Array(Math.abs(offset)).fill('var(--card-gap)')
            const shift = offset > 0 ? `calc(${repetitions.join(' + ')})` : offset < 0 ? `calc(0px - ${repetitions.join(' - ')})` : '0px'
            const depth = isActive ? 80 : Math.abs(offset) === 1 ? 20 : -Math.abs(offset) * 28
            const scale = isActive ? 1 : Math.abs(offset) === 1 ? .86 : .72
            const baseRotation = offset === 0 ? 0 : offset < 0 ? 15 : -15
            const transform = `translate3d(calc(-50% + ${shift}), -50%, ${depth}px) rotateX(var(--mouse-tilt-y, 0deg)) rotateY(calc(${baseRotation}deg + var(--mouse-tilt-x, 0deg))) scale(${scale})`
            return <article key={title} data-offset={offset} className={`home-service-card${isActive ? ' is-active' : ''}`} style={{ '--card-offset': offset, '--card-shift': shift, '--card-scale': scale, '--card-speed': isActive ? '440ms' : '650ms', transform, zIndex: 10 - Math.abs(offset), '--card-delay': `${Math.abs(offset) * 40}ms` }} aria-hidden={!isActive} onMouseEnter={() => { pauseForCardHover(); if (!isActive) setActiveIndex(index); interact() }} onMouseLeave={resumeAfterCardHover}>
              <span className="home-service-icon" aria-hidden="true"><ServiceIcon /></span>
              <h3>{title}</h3>
              <p>{description}</p>
              <ul className="home-service-highlights" aria-label={`${title} service highlights`}>
                {details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            </article>
          })}
        </div>
      </div>
    </div>
  </section>
}

export default HomeServicesCarousel
