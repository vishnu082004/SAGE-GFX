import { FiAward, FiExternalLink } from 'react-icons/fi'
import { FaLinkedinIn } from 'react-icons/fa'
import founderPortrait from '../assets/images/team/founder.png'
import cofounderPortrait from '../assets/images/team/cofounder.jpeg'
import managerPortrait from '../assets/images/team/manager.png'
import seoPortrait1 from '../assets/images/team/seo-1.jpeg'
import seoPortrait2 from '../assets/images/team/seo 2.jpeg'
import seoPortrait3 from '../assets/images/team/seo-3.jpeg'
import smmPortrait1 from '../assets/images/team/smm 1.jpeg'
import smmPortrait2 from '../assets/images/team/smm 2.jpeg'
import smmPortrait3 from '../assets/images/team/smm-3.jpeg'
import designPortrait1 from '../assets/images/team/desinger 1.png'
import designPortrait2 from '../assets/images/team/desinger 2.png'
import designPortrait3 from '../assets/images/team/desinger 3.png'
import developerPortrait1 from '../assets/images/team/develope 1.jpeg'
import developerPortrait2 from '../assets/images/team/developer 2.jpeg'
import developerPortrait3 from '../assets/images/team/developer 3.jpeg'
import developerPortrait4 from '../assets/images/team/developer-4.png'
import developerPortrait5 from '../assets/images/team/developer-5.jpeg'
import developerPortrait6 from '../assets/images/team/developer-6.png'
import '../styles/about-team.css'

const profile = (url) => url ? (url.startsWith('http') ? url : `https://${url}`) : undefined

const leadership = [
  { name: 'Saagar', role: 'Founder', image: founderPortrait, profileUrl: profile('linkedin.com/in/saagar-u-sagegfxdigitalagency') },
  { name: 'Geeta', role: 'Co-Founder', image: cofounderPortrait, profileUrl: profile('linkedin.com/in/geeta-das-b098ba215') },
  { name: 'Pavithra', role: 'Operations Manager', image: managerPortrait, profileUrl: profile('linkedin.com/in/pavivenkat') },
]

const teams = [
  {
    name: 'SEO Team', accent: 'cyan',
    members: [
      { name: 'Vignesh', role: 'SEO Specialist & Team Lead', image: seoPortrait1, profileUrl: profile('linkedin.com/in/vignesh-g2202') },
      { name: 'S. Kousalyadevi', role: 'SEO Specialist', image: seoPortrait2, profileUrl: profile('linkedin.com/in/kousalyasuresh2528') },
      { name: 'P. Prabha', role: 'SEO Trainee', image: seoPortrait3, profileUrl: profile('linkedin.com/in/prabha-p-64a228295') },
    ],
  },
  {
    name: 'Digital Marketing & Social Media Team', accent: 'magenta',
    members: [
      { name: 'Rajavel P', role:  'SMM Specialist', image: smmPortrait1, profileUrl: profile('linkedin.com/in/rajavel-p-889536352') },
      { name: 'Sameem Fathima M', role: 'Meta Ads Expert', image: smmPortrait2, profileUrl: profile('linkedin.com/in/sameemfathima27') },
      { name: 'Monika N B', role:'Digital Marketing Executive', image: smmPortrait3, profileUrl: profile('linkedin.com/in/monika-nb-3bb1b6188') },
    ],
  },
  {
    name: 'Graphic Design Team', accent: 'magenta',
    members: [
      { name: 'Balasubramani', role: 'Graphic Designer & Video Editor', image: designPortrait1, profileUrl: profile('linkedin.com/in/vignesh--v25') },
      { name: 'Manikkam', role: 'Graphic Designer & Video Editor', image: designPortrait2, profileUrl: profile('linkedin.com/in/manikkam-r-212108321') },
      { name: 'Sourav Roy', role: 'Graphics Designer & Video Editor', image: designPortrait3 },
    ],
  },
  {
    name: 'Software Development Team', accent: 'cyan',
    members: [
      { name: 'Podhumani', role: 'Software Developer', image: developerPortrait1, profileUrl: profile('linkedin.com/in/podhumani-murugaiya') },
      { name: 'Nisagar Selvarajan', role: 'Software Developer', image: developerPortrait2, profileUrl: profile('https://www.linkedin.com/in/nisagar13/') },
      { name: 'Vishnu M', role: 'Software Developer', image: developerPortrait3, profileUrl: profile('linkedin.com/in/vishnum2004') },
      { name: 'Kalanithi A', role: 'Software Developer', image: developerPortrait4, profileUrl: profile('linkedin.com/in/kalanithi-ashok-1228a225b') },
      { name: 'Gayathri V', role: 'Software Developer', image: developerPortrait5, profileUrl: profile('https://www.linkedin.com/in/gayathri-velayudham-435344365') },
      { name: 'Deebika D', role: 'Software Developer', image: developerPortrait6, profileUrl: profile('linkedin.com/in/deebika-d-a6a24b352') },
    ],
  },
]

function MemberCard({ name, role, image, profileUrl }) {
  const isLinkedIn = profileUrl?.includes('linkedin.com')

  return (
    <article tabIndex={0} className="about-team-card">
      <div className="about-team-card__portrait">
        <img src={image} alt={`${name}, ${role} at Sage GFX`} loading="lazy" />
      </div>
      <div className="about-team-card__details">
        <span className="about-team-card__name">{name}</span>
        <span className="about-team-card__role">{role}</span>
        <span className="about-team-card__signal" aria-hidden="true" />
        <span className="about-team-card__signal about-team-card__signal--short" aria-hidden="true" />
        {profileUrl && (
          <a className="about-team-card__profile" href={profileUrl} target="_blank" rel="noreferrer" aria-label={`${name} ${isLinkedIn ? 'on LinkedIn' : 'profile'}`}>
            {isLinkedIn ? <FaLinkedinIn aria-hidden="true" /> : <FiExternalLink aria-hidden="true" />}
          </a>
        )}
      </div>
    </article>
  )
}

function AboutTeam() {
  return (
    <section className="about-team" aria-labelledby="about-team-title">
      <div className="about-team__inner">
        <header className="about-team__header">
          <span className="about-team__eyebrow">The people behind Sage GFX</span>
          <h2 id="about-team-title">Meet Our <span>Team</span></h2>
          <p>Creative minds. A shared vision. A stronger tomorrow.</p>
        </header>

        <div className="about-team__leadership" aria-label="Leadership">
          <h3 className="about-team__leadership-title"><FiAward aria-hidden="true" /> Leadership <span>3 Members</span></h3>
          {leadership.map((member) => <MemberCard key={member.name} {...member} />)}
        </div>

        {teams.map((team) => (
          <section className={`about-team__group about-team__group--${team.accent}`} key={team.name} aria-label={team.name}>
            <h3><span>{team.name}</span></h3>
            <div className="about-team__grid">
              {team.members.map((member) => <MemberCard key={member.name} {...member} />)}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}

export default AboutTeam
