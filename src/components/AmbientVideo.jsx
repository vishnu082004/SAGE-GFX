import { useEffect, useRef } from 'react'
import { memo } from 'react'
import { useReducedMotion } from 'framer-motion'

const VIDEO_SOURCE = 'https://videos.pexels.com/video-files/34127955/14471459_3840_2160_30fps.mp4'

const AmbientVideo = memo(function AmbientVideo({ className, poster }) {
  const videoRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    if (!video || reduceMotion || navigator.connection?.saveData) return undefined

    let inView = false
    const syncPlayback = () => {
      if (inView && !document.hidden) video.play().catch(() => {})
      else video.pause()
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      syncPlayback()
    }, { threshold: 0.05 })

    observer.observe(video)
    document.addEventListener('visibilitychange', syncPlayback)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncPlayback)
      video.pause()
    }
  }, [reduceMotion])

  return <video ref={videoRef} className={className} muted loop playsInline preload="none" poster={poster} aria-hidden="true" tabIndex={-1}>
    <source src={VIDEO_SOURCE} type="video/mp4" />
  </video>
})

export default AmbientVideo
