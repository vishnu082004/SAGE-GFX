import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { FiArrowRight, FiPlay } from 'react-icons/fi'
import heroVideo from '../assets/images/home hero video.mp4'

function Hero({ onVideoReady }) {
  const videoRef = useRef(null)
  const [introActive, setIntroActive] = useState(true)
  const [videoReady, setVideoReady] = useState(false)
  const videoStarted = useRef(false)
  const introFinished = useRef(false)

  const finishHeroIntro = () => {
    if (introFinished.current) return
    introFinished.current = true
    setIntroActive(false)
    setVideoReady(true)
    onVideoReady?.()
  }

  useEffect(() => {
    const introFallback = window.setTimeout(finishHeroIntro, 2500)
    return () => window.clearTimeout(introFallback)
  }, [])

  const startHeroVideo = () => {
    if (videoStarted.current) return
    videoStarted.current = true
    setVideoReady(true)
    videoRef.current?.play().catch(finishHeroIntro)
    if (!window.matchMedia('(max-width: 760px)').matches) finishHeroIntro()
  }
  return (
    <section className={`sage-hero${introActive ? ' sage-hero--mobile-intro' : ' sage-hero--revealed'}`} id="home" aria-labelledby="home-heading">
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
      <div className={`sage-hero-boy-wrap${videoReady ? ' is-ready' : ''}${introActive ? ' is-intro' : ''}`} aria-hidden="true">
        <video ref={videoRef} src={heroVideo} autoPlay muted playsInline preload="auto" onCanPlay={startHeroVideo} onEnded={finishHeroIntro} onError={finishHeroIntro} />
      </div>
    </section>
  )
}

export default Hero


