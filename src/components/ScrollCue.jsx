import { useEffect, useRef } from 'react'
import { FiChevronDown } from 'react-icons/fi'

function ScrollCue({ target, label = 'next section', page = false, durationMs = 7000 }) {
  const frameRef = useRef(0)
  const cancelRef = useRef(() => {})

  useEffect(() => () => cancelRef.current(), [])

  const startScroll = () => {
    cancelRef.current()

    const startY = window.scrollY
    const pageEnd = target === 'page-end'
    const destination = pageEnd ? null : document.querySelector(target)
    if (!pageEnd && !destination) return

    const distance = pageEnd
      ? Math.max(0, document.documentElement.scrollHeight - window.innerHeight - startY)
      : destination.getBoundingClientRect().top
    if (Math.abs(distance) < 4) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const previousScrollBehavior = document.documentElement.style.scrollBehavior
      document.documentElement.style.scrollBehavior = 'auto'
      window.scrollTo(0, startY + distance)
      document.documentElement.style.scrollBehavior = previousScrollBehavior
      return
    }

    const duration = durationMs
    const previousScrollBehavior = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = 'auto'
    let startTime

    const finish = () => {
      cancelAnimationFrame(frameRef.current)
      document.documentElement.style.scrollBehavior = previousScrollBehavior
      document.removeEventListener('wheel', stopOnInput, true)
      document.removeEventListener('touchstart', stopOnInput, true)
      document.removeEventListener('pointerdown', stopOnInput, true)
      document.removeEventListener('keydown', stopOnInput, true)
      cancelRef.current = () => {}
    }

    const stopOnInput = () => finish()
    cancelRef.current = finish

    document.addEventListener('wheel', stopOnInput, { capture: true, passive: true })
    document.addEventListener('touchstart', stopOnInput, { capture: true, passive: true })
    document.addEventListener('pointerdown', stopOnInput, true)
    document.addEventListener('keydown', stopOnInput, true)

    const step = (time) => {
      if (startTime === undefined) startTime = time
      const progress = Math.min((time - startTime) / duration, 1)
      const eased = progress

      const currentDistance = pageEnd
        ? Math.max(0, document.documentElement.scrollHeight - window.innerHeight - startY)
        : distance
      window.scrollTo(0, startY + currentDistance * eased)

      if (progress < 1) frameRef.current = requestAnimationFrame(step)
      else finish()
    }

    frameRef.current = requestAnimationFrame(step)
  }

  return (
    <button
      type="button"
      className={`hero-scroll-indicator scroll-cue ${page ? 'scroll-cue--page' : ''}`}
      onClick={startScroll}
      aria-label={`Scroll slowly to ${label}`}
    >
      <span>Scroll</span>
      <FiChevronDown aria-hidden="true" />
    </button>
  )
}

export default ScrollCue
