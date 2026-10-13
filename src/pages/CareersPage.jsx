import { useRef, useState } from 'react'
import { FiArrowRight, FiBarChart2, FiBriefcase, FiCheckCircle, FiCode, FiLayers, FiMail, FiPenTool, FiPhone, FiSend, FiShare2, FiUser, FiVideo } from 'react-icons/fi'
import { contactEmail, contactPhone, submitContactForm } from '../data/contactInfo'
import designBrandingImage from '../assets/images/Crad_img/Crad_img/Design&branding.webp'
import websiteAppImage from '../assets/images/Crad_img/Crad_img/webapp_dev.webp'
import digitalMarketingImage from '../assets/images/Crad_img/Crad_img/digital-marketing.webp'
import socialMediaImage from '../assets/images/Crad_img/Crad_img/digital_media-marketing.webp'
import videoContentImage from '../assets/images/Crad_img/Crad_img/vdo-cont.webp'
import uxDesignImage from '../assets/images/Crad_img/Crad_img/ui-ux.webp'

const teams = [
  { name: 'Design & Branding', description: 'Build memorable identities through thoughtful design, strategy, and visual systems.', image: designBrandingImage, accent: '#16d8ea', Icon: FiPenTool },
  { name: 'Web & App Development', description: 'Turn ambitious ideas into fast, accessible websites and useful digital products.', image: websiteAppImage, accent: '#4b9cff', Icon: FiCode },
  { name: 'Digital Marketing', description: 'Connect brands with the right people through insight-led digital campaigns.', image: digitalMarketingImage, accent: '#a56aff', Icon: FiBarChart2 },
  { name: 'Social Media Management', description: 'Create social content and conversations that help communities grow.', image: socialMediaImage, accent: '#ed55ce', Icon: FiShare2 },
  { name: 'Video & Content Creation', description: 'Tell clear, compelling stories through video, photography, and sharp copy.', image: videoContentImage, accent: '#ff9b55', Icon: FiVideo },
  { name: 'UI/UX Design', description: 'Shape intuitive product experiences around real people and their needs.', image: uxDesignImage, accent: '#54d6a8', Icon: FiLayers },
]

function CareersPage() {
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState(0)
  const [activeTeam, setActiveTeam] = useState(0)
  const [selectedInterest, setSelectedInterest] = useState('')
  const teamRefs = useRef([])

  function handleTeamKeyDown(event, index) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      teamRefs.current[(index + 1) % teams.length]?.focus()
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      teamRefs.current[(index - 1 + teams.length) % teams.length]?.focus()
    } else if ((event.key === 'Enter' || event.key === ' ') && event.target === event.currentTarget) {
      event.preventDefault()
      setSelectedTeam(index)
      setActiveTeam(index)
      setSelectedInterest(teams[index].name)
    }
  }

  async function submitApplication(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setSubmitting(true)
    setStatus('')
    try {
      await submitContactForm({ ...data, _subject: `Career application: ${data.role}`, _replyto: data.email, _template: 'table' })
      form.reset()
      setSelectedInterest('')
      setStatus('Application received. The Sage GFX team will be in touch if there’s a fit.')
    } catch {
      setStatus(`We couldn’t send your application. Please email ${contactEmail} or call ${contactPhone} and include your details.`)
    } finally { setSubmitting(false) }
  }

  return <main className="careers-page">
    <section className="careers-hero" aria-labelledby="careers-title">
      <div className="careers-hero-orbit" aria-hidden="true" />
      <p className="careers-eyebrow"><span /> GROW WITH SAGE GFX <span /></p>
      <h1 id="careers-title">Make good work.<br/><span>With good people.</span></h1>
      <p className="careers-hero-copy">Bring your ideas, craft, and curiosity. Let’s make thoughtful digital experiences that move businesses forward.</p>
      <a className="careers-hero-link" href="#apply">Explore opportunities <FiArrowRight aria-hidden="true" /></a>
    </section>
    <section className="careers-content" aria-label="Careers at Sage GFX">
      <section className="careers-teams" aria-labelledby="careers-teams-title">
        <p className="careers-section-label"><span/> FIND YOUR PLACE</p>
        <h2 id="careers-teams-title">Meet the <span>teams.</span></h2>
        <p className="careers-teams-intro">Good work happens when different skills come together. Find the team where your ideas can make a difference.</p>
        <div className="careers-team-carousel" onMouseLeave={() => setActiveTeam(selectedTeam)}>
          {teams.map(({ name, description, image, accent, Icon }, index) => {
            const expanded = activeTeam === index
            return <article
              key={name}
              ref={(node) => { teamRefs.current[index] = node }}
              className={`careers-team-card${index === 1 ? ' careers-team-card--development' : ''}${expanded ? ' is-expanded' : ''}${selectedTeam === index ? ' is-selected' : ''}`}
              style={{ '--team-accent': accent, '--team-image': `url("${image}")` }}
              tabIndex={0}
              aria-label={`${name} team. Press Enter to select, or use arrow keys to explore teams.`}
              aria-current={selectedTeam === index ? 'true' : undefined}
              onMouseEnter={() => setActiveTeam(index)}
              onFocus={() => setActiveTeam(index)}
              onClick={() => { setSelectedTeam(index); setSelectedInterest(name) }}
              onKeyDown={(event) => handleTeamKeyDown(event, index)}
            >
              <img className="careers-team-image" src={image} alt="" loading={index < 2 ? 'eager' : 'lazy'} />
              <div className="careers-team-shade" aria-hidden="true" />
              <h3 className="careers-team-vertical-title" aria-hidden={expanded}>{name}</h3>
              <span className="careers-team-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div className="careers-team-details" aria-hidden={!expanded}>
                <span className="careers-team-icon"><Icon aria-hidden="true"/></span>
                <h3>{name}</h3>
                <p>{description}</p>
                <a href="#apply" tabIndex={expanded ? 0 : -1} onClick={() => { setSelectedTeam(index); setActiveTeam(index); setSelectedInterest(name) }}>Learn more <FiArrowRight aria-hidden="true"/></a>
              </div>
            </article>
          })}
        </div>
        <p className="careers-team-hint">Select a team to explore opportunities</p>
      </section>
      <section className="careers-application" id="apply" aria-labelledby="apply-title">
        <p className="careers-section-label"><span/> JOIN THE STUDIO</p>
        <h2 id="apply-title">Start a conversation</h2>
        <p className="careers-form-intro">Share a few details and a link to your work. We’ll take it from there.</p>
        <form className="careers-form" onSubmit={submitApplication}>
          <label className="careers-field"><FiUser aria-hidden="true"/><span className="sr-only">Full name</span><input name="name" placeholder="Full name *" autoComplete="name" required /></label>
          <label className="careers-field"><FiMail aria-hidden="true"/><span className="sr-only">Email address</span><input name="email" type="email" placeholder="Email address *" autoComplete="email" required /></label>
          <label className="careers-field"><FiPhone aria-hidden="true"/><span className="sr-only">Phone number</span><input name="phone" type="tel" placeholder="Phone number" autoComplete="tel" /></label>
          <label className="careers-field careers-role-field"><FiBriefcase aria-hidden="true"/><span className="sr-only">Area of interest</span><select name="role" value={selectedInterest} onChange={(event) => setSelectedInterest(event.target.value)} required><option value="" disabled>Area of interest *</option>{teams.map((team) => <option key={team.name}>{team.name}</option>)}<option>Other / Open application</option></select></label>
          <label className="careers-field careers-url-field"><span className="careers-link-icon" aria-hidden="true">↗</span><span className="sr-only">Portfolio or LinkedIn link</span><input name="portfolio" type="url" placeholder="Portfolio or LinkedIn URL *" required /></label>
          <label className="careers-field careers-message-field"><span className="sr-only">A note about you</span><textarea name="message" rows="4" placeholder="A little about you and the work you enjoy... *" required /></label>
          <button className="careers-submit" type="submit" disabled={submitting}><FiSend aria-hidden="true"/>{submitting ? 'SENDING…' : 'SUBMIT APPLICATION'}</button>
          {status && <p className="careers-status" role="status"><FiCheckCircle aria-hidden="true"/>{status}</p>}
        </form>
      </section>
    </section>
  </main>
}

export default CareersPage
