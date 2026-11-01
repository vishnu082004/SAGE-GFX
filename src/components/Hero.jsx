import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { FiArrowRight, FiPlay } from 'react-icons/fi'
import heroVideo from '../assets/images/home hero video.mp4'

function Hero({ onVideoReady }) {
  const videoRef = useRef(null)
  const [videoReady, setVideoReady] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const videoStarted = useRef(false)
  const readyNotified = useRef(false)

  const markVideoReady = () => {
    if (readyNotified.current) return
    readyNotified.current = true
    setVideoReady(true)
    onVideoReady?.()
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const loadVideo = () => video.load()
    let idleCallback
    let loadTimer
    if ('requestIdleCallback' in window) {
      idleCallback = window.requestIdleCallback(loadVideo, { timeout: 900 })
    } else {
      loadTimer = window.setTimeout(loadVideo, 350)
    }
    const readyFallback = window.setTimeout(markVideoReady, 1400)

    return () => {
      window.clearTimeout(loadTimer)
      window.clearTimeout(readyFallback)
      if (idleCallback) window.cancelIdleCallback(idleCallback)
    }
  }, [])

  const startHeroVideo = () => {
    if (videoStarted.current) return
    videoStarted.current = true
    markVideoReady()
    videoRef.current?.play().catch(() => {})
  }
  return (
    <section className="sage-hero sage-hero--revealed" id="home" aria-labelledby="home-heading">
      <div className="sage-hero-orbit" aria-hidden="true" />
      <div className="sage-hero-inner">
        <div className="sage-hero-copy">
          {/* <p className="sage-hero-eyebrow">SAGE GFX <span aria-hidden="true" /> CHENNAI · STRATEGY / DESIGN / DIGITAL</p> */}
          <h1 id="home-heading">
            <span className="sage-hero-heading-line">Grow Your Brand</span>
            <span className="sage-hero-heading-line sage-hero-heading-accent">with a Results-Driven</span>
            <span className="sage-hero-heading-line sage-hero-heading-accent">Digital Marketing</span>
            <span className="sage-hero-heading-line">Agency in Chennai.</span>
          </h1>
          <p className="sage-hero-description">Sage GFX Digital Solutions is a trusted digital marketing company in Chennai. We combine SEO, Google Ads, social media marketing, content, and web solutions to strengthen your online presence, reach the right audience, and drive long-term business growth.</p>
          <div className="sage-hero-actions">
            <Link to="/contact" className="sage-hero-primary tactile-button morphing-pill-button"><span className="sage-hero-primary-label--desktop">LET&apos;S GROW YOUR BUSINESS</span><span className="sage-hero-primary-label--mobile">Grow your business</span><FiArrowRight aria-hidden="true" /></Link>
            <Link to="/services" className="sage-hero-secondary"><FiPlay aria-hidden="true" /> Explore our services</Link>
          </div>
        </div>
      </div>
      <div className={`sage-hero-boy-wrap${videoReady ? ' is-ready' : ''}${videoPlaying ? ' is-playing' : ''}`} aria-hidden="true">
        <video ref={videoRef} src={heroVideo} muted playsInline preload="none" onCanPlay={startHeroVideo} onPlay={() => setVideoPlaying(true)} onPause={() => setVideoPlaying(false)} onError={markVideoReady} />
      </div>
    </section>
  )
}

export default Hero


