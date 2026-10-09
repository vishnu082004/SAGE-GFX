import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ServiceCard from './ServiceCard'
import DragonStage from './DragonStage'

export const servicesData = [
  { id: 1, title: 'Digital Marketing', description: 'Reach the right audience, boost engagement and drive sales.', image: '/images/service-card-digital-marketing.jpg' },
  { id: 2, title: 'Website Development', description: 'Modern, fast and responsive websites for your business.', image: '/images/service-card-website-development.jpg' },
  { id: 3, title: 'Web App Development', description: 'Custom web applications designed to scale with you.', image: '/images/service-card-web-app-development.jpg' },
  { id: 4, title: 'SEO', description: 'Rank higher, get found and grow organically.', image: '/images/service-card-seo.jpg' },
  { id: 5, title: 'Social Media Marketing', description: 'Build your brand and engage your audience.', image: '/images/service-card-social-media.jpg' },
  { id: 6, title: 'Branding & Identity', description: 'Create a lasting impression with a strong brand.', image: '/images/service-card-branding.jpg' },
  { id: 7, title: 'Graphic Design', description: 'Visually stunning designs that speak your brand.', image: '/images/service-card-graphic-design.jpg' },
  { id: 8, title: 'Video Production', description: 'Tell your story with powerful video.', image: '/images/service-card-video-production.jpg' },
  { id: 9, title: 'Influencer Marketing', description: 'Partner with creators and expand your reach.', image: '/images/service-card-influencer-marketing.jpg' },
  { id: 10, title: 'App Development', description: 'Powerful mobile apps for your ideas.', image: '/images/service-card-app-development.jpg' },
]

function Services({ description, homeVersion = false, dragonVersion = false }) {
  const [activeService, setActiveService] = useState(0)
  const [isRoaring, setIsRoaring] = useState(false)
  const reduceMotion = useReducedMotion()
  const roarContextRef = useRef(null)
  const roarTimerRef = useRef(null)

  const playDragonRoar = useCallback(() => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      const context = roarContextRef.current || new AudioContextClass()
      roarContextRef.current = context
      if (context.state === 'suspended') context.resume()

      const now = context.currentTime
      const master = context.createGain()
      master.gain.setValueAtTime(.0001, now)
      master.gain.exponentialRampToValueAtTime(.32, now + .08)
      master.gain.exponentialRampToValueAtTime(.0001, now + 1.35)
      master.connect(context.destination)

      const filter = context.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(420, now)
      filter.frequency.exponentialRampToValueAtTime(115, now + 1.25)
      filter.connect(master)

      const growl = context.createOscillator()
      growl.type = 'sawtooth'
      growl.frequency.setValueAtTime(92, now)
      growl.frequency.exponentialRampToValueAtTime(38, now + 1.3)
      growl.connect(filter)
      growl.start(now)
      growl.stop(now + 1.4)

      const undertone = context.createOscillator()
      undertone.type = 'triangle'
      undertone.frequency.setValueAtTime(54, now)
      undertone.frequency.exponentialRampToValueAtTime(31, now + 1.25)
      undertone.connect(filter)
      undertone.start(now)
      undertone.stop(now + 1.4)

      const noiseBuffer = context.createBuffer(1, context.sampleRate, context.sampleRate)
      const noiseData = noiseBuffer.getChannelData(0)
      for (let sample = 0; sample < noiseData.length; sample += 1) noiseData[sample] = (Math.random() * 2 - 1) * (1 - sample / noiseData.length)
      const noise = context.createBufferSource()
      noise.buffer = noiseBuffer
      const noiseFilter = context.createBiquadFilter()
      noiseFilter.type = 'bandpass'
      noiseFilter.frequency.setValueAtTime(185, now)
      noiseFilter.Q.value = .7
      const noiseGain = context.createGain()
      noiseGain.gain.setValueAtTime(.0001, now)
      noiseGain.gain.exponentialRampToValueAtTime(.18, now + .07)
      noiseGain.gain.exponentialRampToValueAtTime(.0001, now + 1.2)
      noise.connect(noiseFilter)
      noiseFilter.connect(noiseGain)
      noiseGain.connect(master)
      noise.start(now)
      noise.stop(now + 1.25)
    }

    setIsRoaring(true)
    window.clearTimeout(roarTimerRef.current)
    roarTimerRef.current = window.setTimeout(() => setIsRoaring(false), 1400)
  }, [])

  useEffect(() => () => {
    window.clearTimeout(roarTimerRef.current)
    if (roarContextRef.current && roarContextRef.current.state !== 'closed') roarContextRef.current.close()
  }, [])

  return <section id="services" className={`services ${homeVersion ? 'services--home' : ''} ${dragonVersion ? 'services--dragon' : ''}`} aria-label="Our Services">
    <div className="container">
      <div className="services-header"><p className="eyebrow"><span/> Our services</p><h2 className="services-heading">Complete digital solutions<br/>for <span className="gradient-text">your brand.</span></h2>{description&&<p className="services-description">{description}</p>}</div>
      <div className="services-editorial">
        {dragonVersion ? <DragonStage onRoar={playDragonRoar} isRoaring={isRoaring} /> : <div className={`service-preview service-preview--${activeService%5}`} aria-hidden="true"><motion.div className="service-preview-orb" animate={reduceMotion?{}:{rotate:activeService%2?7:-7,scale:[1,1.025,1]}} transition={{duration:.8,ease:'easeOut'}}/><div className="service-preview-signal"/><span className="service-preview-label">SAGE / {String(activeService+1).padStart(2,'0')}</span></div>}
        <div className="services-index"><svg className="services-thread" viewBox="0 0 32 900" preserveAspectRatio="none" aria-hidden="true"><path d="M16 0C-3 100 35 160 16 255S-2 390 16 478 36 637 16 724 3 840 16 900"/></svg>{servicesData.map((service,index)=><ServiceCard key={service.id} service={service} index={index} active={activeService===index} onActivate={setActiveService} slowReveal={homeVersion || dragonVersion} dragonReveal={dragonVersion}/>)}</div>
      </div>
    </div>
  </section>
}

export default Services
