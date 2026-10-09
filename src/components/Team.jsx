import { FiMaximize2 } from 'react-icons/fi'

export const teamData = [
  {
    name: 'Dhivya Govindan',
    role: 'Principal Architect',
    image: '/images/team-dhivya.webp',
  },
  {
    name: 'Mohamed Rafiq',
    role: 'Computational Designer',
    image: '/images/team-rafiq.webp',
  },
  {
    name: 'Raman',
    role: 'Design Head',
    image: '/images/team-raman.webp',
  },
]

function Team({ openLightbox }) {
  return (
    <section id="team" className="team" aria-label="Creative Team">
      <div className="container">
        <div className="team-header">
          <span className="team-eyebrow">Creative Team</span>
          <h2 className="team-heading">MEET OUR TEAM</h2>
        </div>

        <div className="team-grid">
          {teamData.map((member) => (
            <div key={member.name} className="team-card">
              <button
                type="button"
                className="team-image-wrapper"
                onClick={() =>
                  openLightbox &&
                  openLightbox({
                    src: member.image,
                    alt: `${member.name} - ${member.role}`,
                    caption: `${member.name} â€¢ ${member.role}`,
                  })
                }
                aria-label={`View portrait of ${member.name}, ${member.role}`}
              >
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  className="team-image"
                  loading="lazy"
                />
                <span className="team-image-hint">
                  <FiMaximize2 /> View Portrait
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
