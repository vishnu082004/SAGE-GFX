import { useEffect, useRef, useState } from 'react'
import { FiBriefcase, FiClock, FiUsers } from 'react-icons/fi'
import '../styles/home-stats.css'

const stats = [
  { value: '75+', label: 'Happy clients', Icon: FiUsers },
  { value: '50+', label: 'Projects completed', Icon: FiBriefcase },
  { value: '10+', label: 'Years of experience', Icon: FiClock },
  { value: '05+', label: 'Industries served', Icon: FiClock }
]

const parsedStats = stats.map(({ value }) => {
  const [, prefix = '', digits = '0', suffix = ''] = value.match(/^(\D*)(\d+)(.*)$/) || []
  return { prefix, digits, suffix, target: Number(digits) }
})

function HomeStats() {
  const sectionRef = useRef(null)
  const [counts, setCounts] = useState(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !window.matchMedia('(max-width: 700px)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return

    let frameId
    let started = false
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return
      started = true
      observer.disconnect()
      const start = performance.now()
      const duration = 900
      setCounts(parsedStats.map(() => 0))

      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - (1 - progress) ** 3
        setCounts(parsedStats.map(({ target }) => Math.floor(target * eased)))
        if (progress < 1) frameId = requestAnimationFrame(animate)
        else setCounts(parsedStats.map(({ target }) => target))
      }
      frameId = requestAnimationFrame(animate)
    }, { threshold: 0.25 })

    observer.observe(section)
    return () => {
      observer.disconnect()
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <section className="home-stats" aria-label="Sage GFX in numbers" ref={sectionRef}>
      <div className="home-stats-marquee" aria-label="Sage GFX statistics">
        <div className="home-stats-track">
          {[0, 1].map((copy) => (
            <div className="home-stats-grid" key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
              {stats.map(({ value, label, Icon }, index) => (
                <article className="home-stat" key={label}>
                  <span className="home-stat-icon" aria-hidden="true"><Icon /></span>
                  <span className="home-stat-copy">
                    <span>{label}</span>
                    <strong>
                      {counts
                        ? `${parsedStats[index].prefix}${String(counts[index]).padStart(parsedStats[index].digits.length, '0')}${parsedStats[index].suffix}`
                        : value}
                    </strong>
                  </span>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeStats
