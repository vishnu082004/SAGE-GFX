import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import services from '../data/services'
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import '../styles/home-services-carousel.css'

function wrapOffset(index, activeIndex) {
  const half = Math.floor(services.length / 2)
  return ((index - activeIndex + services.length + half) % services.length) - half
}

function HomeServicesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
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
    if (reduceMotion || !isVisible || isHoveringCardRef.current) return
    timerRef.current = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % services.length)
    }, 2000)
  }, [isVisible, reduceMotion])

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
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
      if (entry.isIntersecting) setHasEntered(true)
    }, { threshold: .12 })
    observer.observe(section)
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReduceMotion(motionPreference.matches)
    updateMotion()
    motionPreference.addEventListener?.('change', updateMotion)
    return () => {
      observer.disconnect()
      motionPreference.removeEventListener?.('change', updateMotion)
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
    const bounds = sectionRef.current.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 100
    const y = ((event.clientY - bounds.top) / bounds.height) * 100
    const tiltX = ((x - 50) / 50) * 6
    const tiltY = ((50 - y) / 50) * 4
    window.cancelAnimationFrame(rafRef.current)
    rafRef.current = window.requestAnimationFrame(() => {
      sectionRef.current?.style.setProperty('--pointer-x', `${x}%`)
      sectionRef.current?.style.setProperty('--pointer-y', `${y}%`)
      sectionRef.current?.style.setProperty('--mouse-tilt-x', `${tiltX}deg`)
      sectionRef.current?.style.setProperty('--mouse-tilt-y', `${tiltY}deg`)
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
        <p className="eyebrow"><span /> Our services</p>
        <h2 id="home-services-heading">Complete digital solutions<br />for <span className="gradient-text">your brand.</span></h2>
        <p>We combine strategy, creativity and technology to build digital experiences that help ambitious brands grow.</p>
      </header>

      <div className="home-services-carousel" role="region" aria-roledescription="carousel" aria-label="Sage GFX services" aria-live="off" onPointerEnter={interact}>
        <div className="home-services-stage" aria-label={`${String(activeIndex + 1).padStart(2, '0')} of ${String(services.length).padStart(2, '0')}`}>
          {services.map(({ title, description, image, Icon }, index) => {
            const offset = wrapOffset(index, activeIndex)
            const isActive = offset === 0
            const repetitions = Array(Math.abs(offset)).fill('var(--card-gap)')
            const shift = offset > 0 ? `calc(${repetitions.join(' + ')})` : offset < 0 ? `calc(0px - ${repetitions.join(' - ')})` : '0px'
            const depth = isActive ? 80 : Math.abs(offset) === 1 ? 20 : -Math.abs(offset) * 28
            const scale = isActive ? 1.05 : Math.abs(offset) === 1 ? .92 : .78
            const baseRotation = offset === 0 ? 0 : offset < 0 ? 15 : -15
            const transform = `translate3d(calc(-50% + ${shift}), -50%, ${depth}px) rotateX(var(--mouse-tilt-y, 0deg)) rotateY(calc(${baseRotation}deg + var(--mouse-tilt-x, 0deg))) scale(${scale})`
            return <article key={title} data-offset={offset} className={`home-service-card${isActive ? ' is-active' : ''}`} style={{ '--card-offset': offset, '--card-shift': shift, '--card-scale': scale, '--card-speed': isActive ? '440ms' : '650ms', transform, zIndex: 10 - Math.abs(offset), '--card-delay': `${Math.abs(offset) * 40}ms` }} aria-hidden={!isActive} onMouseEnter={() => { pauseForCardHover(); if (!isActive) setActiveIndex(index); interact() }} onMouseLeave={resumeAfterCardHover}>
              <div className="home-service-image" aria-hidden="true"><img src={image} alt="" loading="lazy" draggable="false" /></div>
              <span className="home-service-number">{String(index + 1).padStart(2, '0')} <i>/ {String(services.length).padStart(2, '0')}</i></span>
              <span className="home-service-icon"><Icon aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{description}</p>
              <Link to="/services" className="home-service-link" tabIndex={isActive ? 0 : -1} aria-label={`Learn more about ${title}`}>Learn More <FiArrowUpRight aria-hidden="true" /></Link>
            </article>
          })}
        </div>
        <div className="home-services-controls">
          <button type="button" className="home-services-prev" onClick={() => { move(-1); interact() }} aria-label="Previous service"><FiArrowLeft /> <span>Previous</span></button>
          <span className="home-services-count" aria-live="polite">{String(activeIndex + 1).padStart(2, '0')} <i>/</i> {String(services.length).padStart(2, '0')}</span>
          <div className="home-services-dots" role="group" aria-label="Choose a service">
            {services.map((service, index) => <button key={service.title} type="button" className={activeIndex === index ? 'is-active' : ''} onClick={() => { setActiveIndex(index); interact() }} aria-label={`Show service ${index + 1}: ${service.title}`} aria-current={activeIndex === index ? 'true' : undefined} />)}
          </div>
          <button type="button" className="home-services-next" onClick={() => { move(1); interact() }} aria-label="Next service"><span>Next</span> <FiArrowRight /></button>
        </div>
      </div>
    </div>
  </section>
}

export default HomeServicesCarousel
