import { useEffect } from 'react'
import { FiX } from 'react-icons/fi'

function Lightbox({ image, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (image) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [image, onClose])

  if (!image) return null

  return (
    <div
      className="lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox Modal"
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="lightbox-close-btn"
          onClick={onClose}
          aria-label="Close image popup"
        >
          <FiX />
        </button>

        <img
          src={image.src}
          alt={image.alt || 'Sage GFX enlarged visual'}
          className="lightbox-image"
        />

        {image.caption && (
          <p className="lightbox-caption">{image.caption}</p>
        )}
      </div>
    </div>
  )
}

export default Lightbox

