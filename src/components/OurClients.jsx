import '../styles/our-clients.css'
import clientLogo01 from '../assets/images/logo (2)/2.webp'
import clientLogo02 from '../assets/images/logo (2)/3.webp'
import clientLogo03 from '../assets/images/logo (2)/4.webp'
import clientLogo04 from '../assets/images/logo (2)/5.webp'
import clientLogo05 from '../assets/images/logo (2)/7.webp'
import clientLogo06 from '../assets/images/logo (2)/8.webp'
import clientLogo07 from '../assets/images/logo (2)/9.webp'
import clientLogo08 from '../assets/images/logo (2)/10.webp'
import clientLogo09 from '../assets/images/logo (2)/11.webp'
import clientLogo10 from '../assets/images/logo (2)/12.webp'
import clientLogo11 from '../assets/images/logo (2)/13.webp'
import clientLogo12 from '../assets/images/logo (2)/15.webp'
import clientLogo13 from '../assets/images/logo (2)/16.webp'
import clientLogo14 from '../assets/images/logo (2)/17.webp'
import clientLogo15 from '../assets/images/logo (2)/18.webp'
import clientLogo16 from '../assets/images/logo (2)/19.webp'
import clientLogo17 from '../assets/images/logo (2)/20.webp'
import clientLogo18 from '../assets/images/logo (2)/21.webp'
import clientLogo19 from '../assets/images/logo (2)/22.webp'
import clientLogo20 from '../assets/images/logo (2)/23.webp'
import clientLogo21 from '../assets/images/logo (2)/24.webp'
import clientLogo22 from '../assets/images/logo (2)/25.webp'
import clientLogo23 from '../assets/images/logo (2)/26.webp'
import clientLogo24 from '../assets/images/logo (2)/27.webp'
import clientLogo25 from '../assets/images/logo (2)/28.webp'
import clientLogo26 from '../assets/images/logo (2)/29.webp'
import clientLogo27 from '../assets/images/logo (2)/30.webp'
import clientLogo28 from '../assets/images/logo (2)/31.webp'
import clientLogo29 from '../assets/images/logo (2)/53.webp'
import clientLogo30 from '../assets/images/logo (2)/54.webp'
import clientLogo31 from '../assets/images/logo (2)/56.webp'
import clientLogo32 from '../assets/images/logo (2)/57.webp'
import clientLogo33 from '../assets/images/logo (2)/58.webp'
import clientLogo34 from '../assets/images/logo (2)/94.webp'
import clientLogo35 from '../assets/images/logo (2)/100.webp'
import clientLogo36 from '../assets/images/logo (2)/7f83cd09-398d-46d3-9b93-df2a8bdbbf33-removebg-preview_bq3mkg_zvi7xf.webp'
import clientLogo37 from '../assets/images/logo (2)/d1704569-bc91-4950-9bec-78595aa8e264.webp'
import clientLogo38 from '../assets/images/logo (2)/httpstulirdesignstudio.com-2-V1eGVhAL.webp'
import clientLogo39 from '../assets/images/logo (2)/JE-logo-03-scaled-DbNL23Ej.webp'
import clientLogo40 from '../assets/images/logo (2)/logo-2-copy-Copy-480.webp'
import clientLogo41 from '../assets/images/logo (2)/logo-CLKh9ebl.webp'
import clientLogo42 from '../assets/images/logo (2)/logo-DRX6OWIG.webp'
import clientLogo43 from '../assets/images/logo (2)/logo.webp'
import clientLogo44 from '../assets/images/logo (2)/Nexxora.webp'
import clientLogo45 from '../assets/images/logo (2)/Safe Science.webp'
import clientLogo46 from '../assets/images/logo (2)/Shape wellness Logo.webp'
import clientLogo47 from '../assets/images/logo (2)/SV.webp'
import clientLogo48 from '../assets/images/logo (2)/Thangam Dental.webp'

const clientLogoFiles = [
  clientLogo01,
  clientLogo02,
  clientLogo03,
  clientLogo04,
  clientLogo05,
  clientLogo06,
  clientLogo07,
  clientLogo08,
  clientLogo09,
  clientLogo10,
  clientLogo11,
  clientLogo12,
  clientLogo13,
  clientLogo14,
  clientLogo15,
  clientLogo16,
  clientLogo17,
  clientLogo18,
  clientLogo19,
  clientLogo20,
  clientLogo21,
  clientLogo22,
  clientLogo23,
  clientLogo24,
  clientLogo25,
  clientLogo26,
  clientLogo27,
  clientLogo28,
  clientLogo29,
  clientLogo30,
  clientLogo31,
  clientLogo32,
  clientLogo33,
  clientLogo34,
  clientLogo35,
  clientLogo36,
  clientLogo37,
  clientLogo38,
  clientLogo39,
  clientLogo40,
  clientLogo41,
  clientLogo42,
  clientLogo43,
  clientLogo44,
  clientLogo45,
  clientLogo46,
  clientLogo47,
  clientLogo48,
]
const firstLogoRow = clientLogoFiles.slice(0, 24)
const secondLogoRow = clientLogoFiles.slice(24, 48)

function LogoMarquee({ logos, direction, label }) {
  const repeatedLogos = [...logos, ...logos]

  return (
    <div className={`our-clients__marquee our-clients__marquee--${direction}`} role="group" aria-label={label}>
      <div className="our-clients__track" aria-hidden="true">
        {repeatedLogos.map((src, index) => (
          <div className="our-clients__logo" key={`${src}-${index}`}>
            <img src={src} alt="" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  )
}

function OurClients() {
  return (
    <section className="our-clients" aria-labelledby="our-clients-title">
      <div className="our-clients__inner">
        <header className="our-clients__heading">
          <p className="our-clients__eyebrow"><span /> OUR CLIENTS <span /></p>
          <h2 id="our-clients-title">Good work grows <span>together.</span></h2>
          <p>Trusted by ambitious brands across industries.</p>
        </header>
        <div className="our-clients__logo-rows" aria-label="48 client logos in two animated rows">
          <LogoMarquee logos={firstLogoRow} direction="right" label="First row of 24 client logos moving right" />
          <LogoMarquee logos={secondLogoRow} direction="left" label="Second row of 24 client logos moving left" />
        </div>
        <p className="our-clients__sr-only">A collection of 48 client logos.</p>
      </div>
    </section>
  )
}

export default OurClients
