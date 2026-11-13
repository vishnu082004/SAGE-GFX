import { useState } from 'react'
import { FiArrowRight, FiBarChart2, FiCode, FiPenTool, FiSearch } from 'react-icons/fi'
import seoImage from '../assets/images/seo 1.webp'
import smmImage from '../assets/images/carerr 3.webp'
import websiteImage from '../assets/images/carrer 3.webp'
import designVideoImage from '../assets/images/carrer 2.webp'

const careerRoles = [
  { id: 'seo', title: 'SEO Specialist', category: 'SEO', department: 'Search Engine Optimization', role: 'SEO Specialist', image: seoImage, Icon: FiSearch, summary: 'Help brands become easier to find through thoughtful search strategy, useful content and strong technical foundations.', responsibilities: ['Plan and implement on-page, off-page and technical SEO improvements.', 'Research keywords and build content recommendations around real search intent.', 'Improve local SEO, including Google Business Profile visibility.', 'Run website audits and identify issues affecting search visibility.', 'Optimize page titles, headings, internal links and structured data.', 'Track rankings, organic traffic and conversions; share clear performance reports.'] },
  { id: 'smm', title: 'Social Media Manager', category: 'SMM', department: 'Social Media Management', role: 'Social Media Manager', image: smmImage, Icon: FiBarChart2, summary: 'Build a consistent social presence that gives audiences a reason to follow, engage and remember the brands we work with.', responsibilities: ['Plan platform-specific content calendars and campaign ideas.', 'Coordinate post copy, creative assets, publishing and community responses.', 'Track reach, engagement and campaign results across social channels.', 'Create and schedule engaging posts, stories and short-form video.', 'Respond to comments and messages in each brand’s tone of voice.', 'Use audience insights and platform trends to improve the content strategy.'] },
  { id: 'website-development', title: 'Website Developer', category: 'Website Development', department: 'Web & App Development', role: 'React Developer', image: websiteImage, Icon: FiCode, summary: 'Create responsive, accessible websites that feel polished, load quickly and help businesses reach their goals.', responsibilities: ['Build and maintain responsive web pages and reusable components.', 'Turn design concepts into accessible, working interfaces.', 'Test across devices and browsers; fix performance and usability issues.', 'Connect forms, APIs and interactive features to support site requirements.', 'Improve load speed, accessibility and search-friendly page structure.', 'Work with design and marketing teammates from brief through launch.'] },
  { id: 'graphic-design-video-editing', title: 'Graphic Designer & Video Editor', category: 'Graphic Design & Video Editing', department: 'Design & Branding', role: 'Graphic Designer & Video Editor', image: designVideoImage, Icon: FiPenTool, summary: 'Create cohesive visual work across graphic design and video, bringing each brand’s ideas to life across digital channels.', responsibilities: ['Design social, web and campaign graphics that follow each brand system.', 'Edit short-form and promotional videos for social and digital campaigns.', 'Prepare clean exports and organized source files for different platforms.', 'Create visual concepts, layouts and storyboards from campaign briefs.', 'Add captions, transitions, music and finishing touches to video edits.', 'Collaborate with content and marketing teams on concepts and revisions.'] },
]

const filters = ['All', 'SEO', 'SMM', 'Website Development', 'Graphic Design & Video Editing']
const titleHighlights = {
  seo: 'Specialist',
  smm: 'Manager',
  'website-development': 'Developer',
  'graphic-design-video-editing': 'Video Editor',
}
const hiringSteps = [
  { number: '01', title: 'Apply', description: 'Tell us about yourself and share links to work you are proud of. A human reads every application, usually within three working days.' },
  { number: '02', title: 'Screen', description: 'A relaxed 30-minute call with our talent team about your experience, ambitions and what you want from your next role.' },
  { number: '03', title: 'Interview', description: 'Meet your future team lead, talk through a short practical scenario from a real account and ask us the hard questions.' },
  { number: '04', title: 'Offer', description: 'A clear offer with salary, growth track and start date, typically within a week of your final round. No ghosting, ever.' },
]

function CareerApplicationForm({ job }) {
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function submitApplication(event) {
    event.preventDefault()
    if (isSubmitting) return

    const form = event.currentTarget
    setIsSubmitting(true)
    setStatus('Sending your application…')
    const fields = Object.fromEntries(new FormData(form).entries())

    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      const result = await response.json()
      if (!response.ok || !result.success) throw new Error(result.message || 'We could not send your application. Please try again.')
      setStatus('Thank you! Your application was sent successfully. We’ll be in touch soon.')
      form.reset()
    } catch (error) {
      setStatus(error.message || 'We could not send your application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return <form className="careers-ref-form" onSubmit={submitApplication}>
    <input type="hidden" name="department" value={job.department} />
    <div className="careers-ref-form-intro"><span className="careers-ref-form-mark"><job.Icon aria-hidden="true" /></span><div><span>APPLICATION FORM</span><strong>{job.title}</strong></div></div>
    <div className="careers-ref-form-fields">
      <label className="careers-ref-field"><span>Full name <i>*</i></span><input name="name" placeholder="Your name" autoComplete="name" required /></label>
      <label className="careers-ref-field"><span>Email address <i>*</i></span><input name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></label>
      <label className="careers-ref-field"><span>Phone number <i>*</i></span><input name="phone" type="tel" placeholder="Your phone number" autoComplete="tel" required /></label>
      <label className="careers-ref-field"><span>Portfolio or LinkedIn <i>*</i></span><input name="portfolio" type="url" placeholder="https://" required /></label>
      <label className="careers-ref-field"><span>Role <i>*</i></span><select name="position" defaultValue={job.role} required><option value={job.role}>{job.title}</option></select></label>
    </div>
    <label className="careers-ref-field careers-ref-message"><span>Note to the hiring team <small>Optional</small></span><textarea name="message" rows="3" placeholder="Tell us briefly why this role interests you." /></label>
    <button className="careers-ref-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Submit application'} {!isSubmitting && <FiArrowRight aria-hidden="true" />}</button>
    <p className={`careers-ref-status${status.startsWith('Thank you!') ? ' is-success' : ''}`} role="status" aria-live="polite">{status}</p>
  </form>
}
function CareerTitle({ job }) {
  const highlight = titleHighlights[job.id]
  const start = job.title.lastIndexOf(highlight)
  return <>{job.title.slice(0, start)}<span>{highlight}</span>{job.title.slice(start + highlight.length)}</>
}

function CareersPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const visibleRoles = activeFilter === 'All' ? careerRoles : careerRoles.filter((job) => job.category === activeFilter)

  return <main className="careers-page careers-reference">
    <section className="careers-ref-hero" aria-labelledby="careers-title">
      <div className="careers-ref-hero-inner"><h1 id="careers-title">Careers</h1><p><a href="/">Home</a><span aria-hidden="true">›</span> Careers</p></div>
    </section>
    <section className="careers-ref-intro" aria-label="Explore career roles">
      <h2>Build what&apos;s <span>next.</span></h2>
      <nav className="careers-ref-categories" aria-label="Filter career roles">
        {filters.map((filter) => <button type="button" key={filter} className={activeFilter === filter ? 'is-active' : ''} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
      </nav>
    </section>
    <div className="careers-ref-list">
      {visibleRoles.map((job) => <article className="careers-ref-job" id={job.id} key={job.id}>
        <div className="careers-ref-top">
          <div className="careers-ref-left">
            <div className={`careers-ref-visual careers-ref-visual--${job.id}`}>
              <img src={job.image} alt={`${job.title} role artwork`} loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; event.currentTarget.parentElement.classList.add('is-image-missing') }} />
              <span className="careers-ref-visual-icon" aria-hidden="true"><job.Icon /></span>
              <span className="careers-ref-visual-label">SAGE GFX / {job.category.toUpperCase()}</span>
            </div>
            <section className="careers-ref-responsibilities" aria-labelledby={`${job.id}-responsibilities`}>
              <p className="careers-ref-kicker">THE ROLE</p><h3 id={`${job.id}-responsibilities`}>Key responsibilities</h3>
              <ul>{job.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}</ul>
            </section>
          </div>
          <section className="careers-ref-application" aria-label={`${job.title} role details`}>
            <h2><CareerTitle job={job} /></h2><p className="careers-ref-summary">{job.summary}</p>
            <h3>Job Information</h3><p className="careers-ref-experience">Experience: Relevant experience preferred</p>
            <h3 className="careers-ref-apply-heading">Apply Now</h3>
            <CareerApplicationForm job={job} />
          </section>
        </div>
      </article>)}
    </div>
    <section className="careers-ref-process" aria-labelledby="careers-process-title">
      <div className="careers-ref-process-inner">
        <p className="careers-ref-process-kicker"><span aria-hidden="true" /> HOW HIRING WORKS</p>
        <h2 id="careers-process-title">Four steps, <span>two weeks</span>, zero ghosting</h2>
        <p className="careers-ref-process-intro">We hire the way we run campaigns: a clear process, fast feedback and<br className="careers-process-break" /> respect for your time at every stage.</p>
        <ol className="careers-ref-steps">
          {hiringSteps.map((step, index) => <li className="careers-ref-step" key={step.number}>
            <span className={`careers-ref-step-number careers-ref-step-number--${index + 1}`}>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>)}
        </ol>
      </div>
    </section>
  </main>
}

export default CareersPage
