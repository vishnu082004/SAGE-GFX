import { FiBarChart2, FiSearch, FiTarget, FiTrendingUp } from 'react-icons/fi'
import '../styles/home-new-sections.css'

const steps = [
  { title: 'Research', text: 'This stage involves gaining knowledge of your business, customers, competitors, and your presence on the internet. Research helps us to gain insight into our strong points and weak points.', Icon: FiSearch },
  { title: 'Analyse', text: 'We analyse and consider the data, user behavior, market trends, and your existing digital performance and from this, determine what the key opportunities are for your business.', Icon: FiBarChart2 },
  { title: 'Plan', text: 'Now that we understand the steps required, we build an effective plan based on your objectives. Each step has an objective, which ranges from increasing visibility to generating more leads.', Icon: FiTarget },
  { title: 'Improve', text: 'Digital Marketing is a continuous process, where we analyze the outcomes, see what works and what not, make required adjustments, and continuously improve our strategy.', Icon: FiTrendingUp },
]

function HomeHowWeWork() {
  return <section className="home-process" id="how-we-work" aria-labelledby="home-process-title">
    <div className="home-new-section-inner">
      <header className="home-new-section-heading">
        {/* <p className="home-new-section-eyebrow">A CLEAR PATH FROM IDEA TO IMPACT</p> */}
        <h2 id="home-process-title">How we <span>Work.</span></h2>
        <p>We transform business objectives into effective digital strategies through analysis, innovation and constant optimization for growth.</p>
      </header>
      <ol className="home-process-grid">
        {steps.map(({ title, text, Icon }) => <li className="home-process-card" key={title}>
          <span className="home-process-icon"><Icon size={24} strokeWidth={2} aria-hidden="true" /></span>
          <div className="home-process-copy">
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </li>)}
      </ol>
    </div>
  </section>
}

export default HomeHowWeWork
