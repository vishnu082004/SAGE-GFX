import { useRef, useState } from 'react'
import { FiArrowRight, FiBarChart2, FiBriefcase, FiCheckCircle, FiCode, FiExternalLink, FiLayers, FiMail, FiPenTool, FiPhone, FiSend, FiShare2, FiUploadCloud, FiUser, FiVideo, FiX } from 'react-icons/fi'
import { contactEmail, contactPhone } from '../data/contactInfo'
import designBrandingImage from '../assets/images/Crad_img/Crad_img/Design&branding.webp'
import websiteAppImage from '../assets/images/Crad_img/Crad_img/webapp_dev.webp'
import digitalMarketingImage from '../assets/images/Crad_img/Crad_img/digital-marketing.webp'
import socialMediaImage from '../assets/images/Crad_img/Crad_img/digital_media-marketing.webp'
import videoContentImage from '../assets/images/Crad_img/Crad_img/vdo-cont.webp'
import uxDesignImage from '../assets/images/Crad_img/Crad_img/ui-ux.webp'

const teams = [
  { name: 'Design & Branding', description: 'Join our creative team to craft memorable brand identities, compelling visuals, and designs that bring ideas to life.', roles: ['Graphic Designer', 'UI/UX Designer', 'Brand Identity Designer'], image: designBrandingImage, accent: '#16d8ea', Icon: FiPenTool },
  { name: 'Web & App Development', description: 'Build modern websites and digital experiences with a team passionate about clean code, creative problem-solving, and innovation.', roles: ['React Developer', 'Frontend Developer', 'Full-Stack Developer', 'UI Developer'], image: websiteAppImage, accent: '#4b9cff', Icon: FiCode },
  { name: 'Digital Marketing', description: 'Help brands grow through creative campaigns, audience research, performance analysis, and data-driven marketing strategies.', roles: ['Digital Marketing Executive', 'Performance Marketing Specialist', 'Google Ads Specialist'], image: digitalMarketingImage, accent: '#a56aff', Icon: FiBarChart2 },
  { name: 'Social Media Management', description: 'Create engaging social content, plan digital campaigns, and help brands build meaningful connections with their audiences.', roles: ['Social Media Manager', 'Social Media Executive', 'Social Media Strategist'], image: socialMediaImage, accent: '#ed55ce', Icon: FiShare2 },
  { name: 'Video & Content Creation', description: 'Turn ideas into compelling stories through video editing, motion graphics, photography, and creative content production.', roles: ['Video Editor', 'Motion Graphics Designer', 'Content Creator', 'Videographer'], image: videoContentImage, accent: '#ff9b55', Icon: FiVideo },
  { name: 'Search Engine Optimization', description: 'Help websites grow organically through keyword research, technical SEO, content optimization, and search performance analysis.', roles: ['SEO Executive', 'SEO Specialist', 'Technical SEO Analyst', 'SEO Content Writer'], image: uxDesignImage, accent: '#54d6a8', Icon: FiLayers },
]

const allowedExtensions = ['pdf', 'doc', 'docx']
const allowedMimeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/octet-stream']
const maxResumeBytes = 5 * 1024 * 1024
const statusCopy = {
  loading: { heading: 'Submitting your application...', message: 'Please wait while we process your details. Do not close this page.' },
  success: { heading: 'Application submitted successfully!', message: 'Thank you for your interest in Sage GFX. Your application has been received.' },
  error: { heading: 'Unable to submit your application', message: 'Something went wrong. Please check your details and try again.' },
}

function CareersPage() {
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState(0)
  const [activeTeam, setActiveTeam] = useState(0)
  const [department, setDepartment] = useState('')
  const [position, setPosition] = useState('')
  const [resume, setResume] = useState(null)
  const [resumeError, setResumeError] = useState('')
  const [dragging, setDragging] = useState(false)
  const [errors, setErrors] = useState({})
  const teamRefs = useRef([])
  const fileInputRef = useRef(null)

  function selectTeam(index) {
    setSelectedTeam(index)
    setActiveTeam(index)
    setDepartment(teams[index].name)
    setPosition('')
  }

  function selectSuggestedRole(index, role) {
    setSelectedTeam(index)
    setActiveTeam(index)
    setDepartment(teams[index].name)
    setPosition(role)
    setErrors((current) => ({ ...current, department: '', position: '' }))
  }

  function handleTeamKeyDown(event, index) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault(); teamRefs.current[(index + 1) % teams.length]?.focus()
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault(); teamRefs.current[(index - 1 + teams.length) % teams.length]?.focus()
    } else if ((event.key === 'Enter' || event.key === ' ') && event.target === event.currentTarget) {
      event.preventDefault(); selectTeam(index)
    }
  }

  function validateResume(file) {
    if (!file) { setResume(null); setResumeError(''); return }
    const extension = file.name.split('.').pop()?.toLowerCase()
    if (!allowedExtensions.includes(extension) || !allowedMimeTypes.includes(file.type || 'application/octet-stream')) {
      setResumeError('Choose a PDF, DOC, or DOCX resume.'); setResume(null); return
    }
    if (file.size > maxResumeBytes) {
      setResumeError('Your resume must be 5 MB or smaller.'); setResume(null); return
    }
    setResume(file); setResumeError('')
  }

  function validateForm(form) {
    const formData = new FormData(form)
    const nextErrors = {}
    for (const key of ['name', 'email', 'phone', 'department', 'portfolio']) {
      if (!String(formData.get(key) || '').trim()) nextErrors[key] = 'This field is required.'
    }
    const email = String(formData.get('email') || '').trim()
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter a valid email address.'
    const portfolio = String(formData.get('portfolio') || '').trim()
    try { const url = new URL(portfolio); if (!['http:', 'https:'].includes(url.protocol)) throw new Error() }
    catch { nextErrors.portfolio = 'Enter a valid URL beginning with https://.' }
    const team = teams.find((item) => item.name === department)
    if (position && (!team || !team.roles.includes(position))) nextErrors.position = 'Choose a role from the selected department.'
    if (resumeError) nextErrors.resume = resumeError
    else if (!resume) nextErrors.resume = 'Please upload your resume.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function submitApplication(event) {
    event.preventDefault()
    if (submitting) return
    const form = event.currentTarget
    if (!validateForm(form)) {
      setStatus('error')
      const invalidField = form.querySelector('[aria-invalid="true"]')
      if (invalidField?.name === 'resume') form.querySelector('.careers-resume button[type="button"]')?.focus()
      else invalidField?.focus()
      return
    }
    const formData = new FormData(form)
    if (resume) formData.set('resume', resume)
    formData.set('_subject', `Career application: ${position || department}`)
    setSubmitting(true); setStatus('loading')
    try {
      const response = await fetch('/api/careers', { method: 'POST', body: formData, headers: { Accept: 'application/json' } })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.success) throw new Error(result.message || 'Application service unavailable')
      form.reset(); setDepartment(''); setPosition(''); setResume(null); setResumeError(''); setErrors({}); setStatus('success')
    } catch {
      setStatus('error')
    } finally { setSubmitting(false) }
  }

  const currentStatus = statusCopy[status]
  const fieldError = (name) => errors[name] ? <span className="careers-field-error" id={`${name}-error`}>{errors[name]}</span> : null

  return <main className="careers-page">
    <section className="careers-hero" aria-labelledby="careers-title">
      <div className="careers-hero-background" aria-hidden="true"><img src="/images/sage-gfx-services-background.webp" alt="" fetchPriority="high" /></div>
      <div className="careers-hero-inner">
        {/* <p className="careers-eyebrow"><span /> CAREERS / JOIN OUR TEAM</p> */}
        <h1 id="careers-title">Careers <span>at Sage GFX.</span></h1>
        {/* <p className="careers-hero-copy">Join a collaborative team of creative thinkers and problem solvers building meaningful digital work.</p> */}
        {/* <a className="careers-hero-link" href="#apply">Explore Careers <span><FiArrowRight aria-hidden="true" /></span></a> */}
      </div>
    </section>
    <section className="careers-content" aria-label="Careers at Sage GFX">
      <section className="careers-teams" aria-labelledby="careers-teams-title">
        <p className="careers-section-label"><span/> SAGE GFX CAREERS</p>
        <h2 id="careers-teams-title">Create. Innovate.<br/><span>Grow Together.</span></h2>
        <p className="careers-teams-intro">At Sage GFX, we believe great work happens when talented people come together. We&apos;re looking for creative thinkers, skilled professionals, and passionate individuals who want to make an impact in the digital world.</p>
        <div className="careers-benefits" aria-label="Why work with us">
          <article><FiPenTool aria-hidden="true"/><h3>Creative Freedom</h3><p>Bring your ideas to life.</p></article>
          <article><FiShare2 aria-hidden="true"/><h3>Collaborative Team</h3><p>Learn and grow together.</p></article>
          <article><FiArrowRight aria-hidden="true"/><h3>Room to Grow</h3><p>Build your future with us.</p></article>
        </div>
        <div className="careers-team-heading"><p className="careers-section-label"><span/> FIND YOUR PLACE</p><h2>Explore our <span>teams.</span></h2></div>
        <div className="careers-team-carousel" onMouseLeave={() => setActiveTeam(selectedTeam)}>
          {teams.map(({ name, description, roles, image, accent, Icon }, index) => {
            const expanded = activeTeam === index
            return <article key={name} ref={(node) => { teamRefs.current[index] = node }} className={`careers-team-card${index === 1 ? ' careers-team-card--development' : ''}${expanded ? ' is-expanded' : ''}${selectedTeam === index ? ' is-selected' : ''}`} style={{ '--team-accent': accent, '--team-image': `url("${image}")` }} tabIndex={0} aria-label={`${name} team. Press Enter to select, or use arrow keys to explore teams.`} aria-current={selectedTeam === index ? 'true' : undefined} onMouseEnter={() => setActiveTeam(index)} onFocus={() => setActiveTeam(index)} onClick={() => selectTeam(index)} onKeyDown={(event) => handleTeamKeyDown(event, index)}>
              <img className="careers-team-image" src={image} alt="" loading={index < 2 ? 'eager' : 'lazy'} />
              <div className="careers-team-shade" aria-hidden="true" />
              <h3 className="careers-team-vertical-title" aria-hidden={expanded}>{name}</h3>
              <span className="careers-team-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div className="careers-team-details" aria-hidden={!expanded}>
                <span className="careers-team-icon"><Icon aria-hidden="true"/></span><h3>{name}</h3><p>{description}</p>
                <div className="careers-suggested-roles">
                  <p><strong>Suggested roles Â· not confirmed openings</strong></p>
                  <div className="careers-role-chip-list">
                    {roles.map((role) => <button className="careers-role-chip" type="button" key={role} tabIndex={expanded ? 0 : -1} onClick={(event) => { event.stopPropagation(); selectSuggestedRole(index, role) }}>{role}</button>)}
                  </div>
                </div>
                <button type="button" tabIndex={expanded ? 0 : -1} onClick={(event) => { event.stopPropagation(); selectTeam(index) }}>Explore Roles <FiArrowRight aria-hidden="true"/></button>
              </div>
            </article>
          })}
        </div>
        <p className="careers-team-hint">Role suggestions only â€” current vacancies may vary.</p>
      </section>
      <section className="careers-application" id="apply" aria-labelledby="apply-title">
        <p className="careers-section-label"><span/> BUILD YOUR FUTURE WITH US</p>
        <h2 id="apply-title">Let&apos;s create something great together!</h2>
        <p className="careers-form-intro">Fields marked * are required. Role and message are optional.</p>
        <form className="careers-form" onSubmit={submitApplication} noValidate>
          <label className="careers-field"><FiUser aria-hidden="true"/><span className="sr-only">Full name *</span><input name="name" placeholder="Full name *" autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />{fieldError('name')}</label>
          <label className="careers-field"><FiMail aria-hidden="true"/><span className="sr-only">Email address *</span><input name="email" type="email" placeholder="Email address *" autoComplete="email" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />{fieldError('email')}</label>
          <label className="careers-field"><FiPhone aria-hidden="true"/><span className="sr-only">Phone number *</span><input name="phone" type="tel" placeholder="Phone number *" autoComplete="tel" required aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} />{fieldError('phone')}</label>
          <label className="careers-field careers-role-field"><FiBriefcase aria-hidden="true"/><span className="sr-only">Department *</span><select name="department" value={department} onChange={(event) => { setDepartment(event.target.value); setPosition(''); setErrors((current) => ({ ...current, department: '', position: '' })) }} required aria-invalid={Boolean(errors.department)} aria-describedby={errors.department ? 'department-error' : undefined}><option value="">Department *</option>{teams.map((team) => <option key={team.name} value={team.name}>{team.name}</option>)}</select>{fieldError('department')}</label>
          <label className="careers-field careers-role-field"><FiBriefcase aria-hidden="true"/><span className="sr-only">Role (optional)</span><select name="position" value={position} onChange={(event) => { setPosition(event.target.value); setErrors((current) => ({ ...current, position: '' })) }} disabled={!department} aria-invalid={Boolean(errors.position)} aria-describedby={errors.position ? 'position-error' : undefined}><option value="">Role (optional)</option>{teams.find((team) => team.name === department)?.roles.map((role) => <option value={role} key={role}>{role}</option>)}</select>{fieldError('position')}</label>
          <label className="careers-field careers-url-field"><FiExternalLink aria-hidden="true"/><span className="sr-only">Portfolio, LinkedIn, or website URL *</span><input name="portfolio" type="url" placeholder="Portfolio, LinkedIn, or website URL *" required aria-invalid={Boolean(errors.portfolio)} aria-describedby={errors.portfolio ? 'portfolio-error' : undefined} />{fieldError('portfolio')}</label>
          <label className="careers-field careers-message-field"><span className="sr-only">Tell us about yourself (optional)</span><textarea name="message" rows="4" placeholder="Tell us about yourself (optional)" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />{fieldError('message')}</label>
          <label className="careers-honeypot" aria-hidden="true">Leave this field empty<input type="text" name="_honey" tabIndex={-1} autoComplete="off" /></label>
          <div className={`careers-resume${dragging ? ' is-dragging' : ''}`} onDragOver={(event) => { event.preventDefault(); setDragging(true) }} onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setDragging(false) }} onDrop={(event) => { event.preventDefault(); setDragging(false); validateResume(event.dataTransfer.files?.[0]) }}>
            <input ref={fileInputRef} className="careers-resume-input" type="file" name="resume" required aria-required="true" aria-label="Resume file, required" aria-invalid={Boolean(errors.resume || resumeError)} aria-describedby={errors.resume || resumeError ? 'resume-error' : undefined} accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(event) => validateResume(event.target.files?.[0])} />
            <FiUploadCloud aria-hidden="true"/><div><strong>Upload your resume *</strong><p>Drag and drop your resume here, or <button type="button" onClick={() => fileInputRef.current?.click()}>click to browse</button>.</p><small>PDF, DOC, DOCX (maximum 5 MB). Required.</small>
              {resume && <p className="careers-resume-success" role="status">Resume attached successfully.<span>{resume.name} Â· {(resume.size / (1024 * 1024)).toFixed(2)} MB</span></p>}
              {(resumeError || errors.resume) && <p className="careers-field-error" id="resume-error" role="alert">{resumeError || errors.resume}</p>}
            </div>
            {resume && <button className="careers-resume-remove" type="button" aria-label="Remove resume" onClick={() => { setResume(null); setResumeError(''); if (fileInputRef.current) fileInputRef.current.value = '' }}><FiX aria-hidden="true"/></button>}
          </div>
          <button className="careers-submit" type="submit" disabled={submitting}><FiSend aria-hidden="true"/>{submitting ? 'SENDING...' : 'SEND YOUR APPLICATION'}</button>
          <p className="careers-status careers-status--live" role="status" aria-live="polite" aria-atomic="true">{currentStatus && <><strong>{currentStatus.heading}</strong><span>{currentStatus.message}</span>{status === 'error' && <span>If the problem continues, contact <a href={`mailto:${contactEmail}`}>{contactEmail}</a> or call <a href={`tel:${contactPhone.replaceAll(' ', '')}`}>{contactPhone}</a>.</span>}</>}</p>
        </form>
      </section>
    </section>
  </main>
}

export default CareersPage

