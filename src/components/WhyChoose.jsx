import { useEffect, useRef, useState } from 'react'
import { ChartNoAxesCombined, Headset, PenTool, Target } from 'lucide-react'

const benefits = [
  { title: ' Expert Digital Marketing solutions', description: 'Reach the potential audience through practical digital marketing strategies for SEO, Google Ads, social media, content and more.', Icon: PenTool, color: 'cyan', position: 'top-left' },
  { title:  'Strategy Built for your business', description: 'Every business has different goals and challenges. We understand your needs and create a clear digital strategy that reaches the right audience, strengthens your online presence and supports real business growth.', Icon: Target, color: 'violet', position: 'top-right' },
  { title: ' Information to Insight', description: 'By converting the user behavior patterns, trends and performance data of your target audience, we provide you with actionable insights.', Icon: ChartNoAxesCombined, color: 'cyan', position: 'bottom-left' },
  { title: 'Immediate Support', description: 'Receive instant support in the form of guidance and communication for all your digital marketing needs.', Icon: Headset, color: 'violet', position: 'bottom-right' },
]

function WhyChoose() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setIsVisible(true)
      observer.disconnect()
    }, { threshold: .12 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return <section ref={sectionRef} className={`why-choose why-choose--orbit${isVisible ? ' is-visible' : ''}`} aria-labelledby="why-choose-title">
    <div className="container why-choose-layout">
      <header className="why-choose-copy">
        <p className="why-choose-eyebrow"><i aria-hidden="true"/> WHY CHOOSE US <i aria-hidden="true"/></p>
        <h2 id="why-choose-title">Customised Digital Solutions <span> for Your Growing Business </span></h2>
        <p>Build stronger online visibility, attract relevant audience and create more opportunities for growth.</p>
      </header>

      <div className="why-choose-visual" role="group" aria-label="Sage GFX services">
        <div className="why-service-cards">
          {benefits.map(({ title, description, Icon, color, position }, index) => <div key={title} className={`why-service-card why-service-card--${position} why-service-card--${color}`} style={{ '--card-index': index }}>
            <span className="why-service-icon"><Icon aria-hidden="true"/></span>
            <span className="why-service-content">
              <strong>{title}</strong>
              <p>{description}</p>
            </span>
          </div>)}
        </div>
      </div>
    </div>
  </section>
}

export default WhyChoose
