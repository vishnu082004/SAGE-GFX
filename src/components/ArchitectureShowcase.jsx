import { useEffect, useRef, useState } from 'react'
import { FiMaximize2 } from 'react-icons/fi'

function ArchitectureShowcase({ openLightbox }) {
  const sectionRef = useRef(null)
  const [imageReady, setImageReady] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !('IntersectionObserver' in window)) {
      setImageReady(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setImageReady(true)
        observer.disconnect()
      }
    }, { rootMargin: '300px' })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])
  const showcaseImage = {
    src: '/images/showcase-villa.webp',
    alt: 'Sage GFX Digital Studio Concept',
    caption: 'Architectural Blueprint & Modern Residential Execution',
  }

  return (
    <section ref={sectionRef} className="architecture-showcase" aria-label="Architectural Showcase Project">
      <div className="architecture-showcase-container">
        <button
          type="button"
          className={`architecture-showcase-btn ${imageReady ? 'image-ready' : ''}`}
          onClick={() => openLightbox && openLightbox(showcaseImage)}
          aria-label="View full architectural showcase banner"
        >
          <div className="architecture-showcase-overlay">
            <div>
              <p className="showcase-caption-title">Modern Villa & Landscape Synthesis</p>
              <p className="showcase-caption-sub">Brand Strategy & Digital Experiences by Sage GFX</p>
            </div>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
              <FiMaximize2 /> Enlarge
            </span>
          </div>
        </button>
      </div>
    </section>
  )
}

export default ArchitectureShowcase

