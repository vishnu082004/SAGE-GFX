import { useEffect, useRef, useState } from 'react'
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiStar, FiUsers } from 'react-icons/fi'

const GOOGLE_REVIEW_URL = 'https://www.google.com/search?q=sage+gfx+reviews#lrd=0x3a52f5d1087b538d:0xe7e603ebe92848af,3,,,,'
const metrics = [
  { value: '4.8', label: 'Google rating', Icon: FiStar },
  { value: '23', label: 'Google reviews linked', Icon: FiUsers },
  { value: '5★', label: 'Ratings on these reviews', Icon: FiStar },
]

const reviews = [
  { name: 'Dineshkumar L', date: '2 months ago', text: 'Romba happy with the website work! Website romba professional clean attractive ready panni kuduthu irukiga. Naan expect pannadhukku mela super ready pani irukiga. En requirements-a proper-ah understand panni, within a week ready panitiga. Overall service, quality and team support ellame super. Thankyou saagar sir and his team✨️✨️✨️', initials: 'DL', avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVy2c7s2I6JE_FUUtyaUQ3GPIOVX-xnqCoFWGFPFFJM9vUcN2QP=w96-h96-p-rp-mo-ba12-br100', url: 'https://share.google/FmNsDw6f00PyIxaHT' },
  { name: 'Riderspark Car Care', date: '4 months ago', text: 'One of the best marketing teams in Chennai. They understand customer requirements clearly and provide the right solutions. Very supportive and professional team.', initials: 'RC', avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUSWP0_m5k16d9tO-Vu2d5UfuYLGOpBPcrysMq6cUIwKM5EEggE=w96-h96-p-rp-mo-br100', url: 'https://share.google/Dvh1UFwJb2Q9mcLLU' },
  { name: 'Reghan Nisha', date: '8 months ago', text: 'The session gave me exposure to real industry practices. I understood how analytics is used in real-world applications. The examples were simple and easy to relate to. The concepts of mobile and voice search were explained well. It helped me connect theoretical knowledge with practical use. I gained awareness about current industry trends. The session motivated me to learn more about analytics. It gave clarity on future career opportunities. The knowledge shared was very useful for students. Overall, the session was informative and valuable for my learning.❤️', initials: 'RN', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLrtQYPKKPJnN7fXZ7VuZb_BGIrnuZu8J9Hyq51LTdBdrvZqg=w96-h96-p-rp-mo-br100', url: 'https://share.google/XM8GPCtY16Up4HTQE' },
  { name: 'Sheetal Shaparia', date: '7 months ago', text: 'I was extremely happy with my experience. Everything was sorted for me. Reels were made extremely well. The coordination was very seamless. I would hundred percent recommend them.', initials: 'SS', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKjxtgyVqcxAhYGyggavO1PxvEy_inYORI5ZlOYxjF_cgzVvQ=w96-h96-p-rp-mo-br100', url: 'https://share.google/ug8riuyibFls2yeDx' },
  { name: 'YUVAN SHANKAR .V', date: '10 months ago', text: 'I recently worked with them for lead generation, one of the best digital marketing agency in Chennai. They provide excellent customer service. Generated quality leads for my photography business. Thank you Sage GFX.', initials: 'YS', avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUccBTS8kof2Mlwbxne7fl94A-_dTSb_l6Vng7sfgDzT_dBqImR0w=w96-h96-p-rp-mo-ba12-br100', url: 'https://share.google/469hnJgSkFBhCepE6' },
  { name: 'Aparna Rajesh Kumar', date: '11 months ago', text: 'My experience with sage gfx is fantastic i have been with them for the past three months , they are very friendly and easy to approach people. All your requirements they take care of it . They listen your need and act accordingly ! Kudos team', initials: 'AR', avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjWqhbzQRKVA-64NT8yxFeUbM-8NU5000gAOIDLP7TH-C8HNF6CU=w96-h96-p-rp-mo-ba12-br100', url: 'https://share.google/0dJLaL7uZyvicEDBy' },
  { name: 'Ayesha Farhunnisa', date: '8 months ago', text: 'Today’s guest lecture was very informative and motivating. Sir explained the concepts clearly with real-life examples and encouraged student interaction. Thank you for such a wonderful session, sir.', initials: 'AF', avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUsic4THVoMfjQmdy1Ug7o6rLlTj7JDOef1NW0jLTl5i7_lWQ=w96-h96-p-rp-mo-br100', url: 'https://share.google/5dCeW3wl71WhUf574' },
  { name: 'Dipu Raj', date: '10 months ago', text: 'Impressive and speedy internet marketing services in Chennai. This agency genuinely cares about delivering results and supporting your business at every step. A trustworthy partner for digital growth.', initials: 'DR', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKgnXcAU414ywetF69o2cXbtokhfCDQI8phH3QexhM-qOleJiw=w96-h96-p-rp-mo-br100', url: 'https://share.google/OLbXn8eVqGgDo62fg' },
  { name: 'Vineet kumar Singh', date: '10 months ago', text: 'Highly recommended for digital solutions in Tamilnadu - quick, affordable, and very cooperative. Their team understands your needs and delivers excellent results on time.', initials: 'VK', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJ4iLOX1S-t9Oz9W7W_T5niLGtH3J9qj4MxleuE7AyS_J86oNs=w96-h96-p-rp-mo-br100', url: 'https://share.google/xkcE4JbRWbD2U2h2Q' },
  { name: 'Early Bird Vacations', date: '2 years ago', text: 'The service of sage GFX is amazing, one of the best digital marketing company in Chennai. He has done many poster and promotions for my company it was too good to reach out the clients. I’ll definitely recommend everyone to try their service.', initials: 'EB', avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjV2wH1VN28vZnj12P0diQGF_ZijN2nJbZp84NpIieQSMfcBtny0=w96-h96-p-rp-mo-br100', url: 'https://share.google/shyOjyd6ei8SyCeFm' },
  { name: 'NM Greens', date: '2 months ago', text: 'I came to design my cricket ground website for without any idea but the saagar sir and his team gave me a wounderful design and the work completed as soon as before the time . Thankyou saagar sir and his team mates', initials: 'NG', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJVaxKJJ8qdEtvo5VBfms3phlOTtl7l1yYnn9qjgnpvb7Yz-A=w96-h96-p-rp-mo-br100', url: 'https://share.google/gpYkYQ2MWH7jDWH1Z' },
  { name: 'sv Properties', date: '4 months ago', text: 'Great team. Very cool in handling the customer and their requirement and providing solutions.', initials: 'SP', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJ27jkG7eNsqNGO_T696Lvubz034ge3CrrSTQVX_PlGljICfQ=w96-h96-p-rp-mo-br100', url: 'https://share.google/M6unFlw2zXKOL1zap' },
  { name: 'mon srini', date: '2 years ago', text: 'Recently we Connected Sage Gfx for our digital marketing services. The services provided by them was excellent, and outstanding.I recommend SAGE GFX for all Digital marketing needs.Way to go 👍🏻', initials: 'MS', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLXMx2yPlt66igpAioYzzceBakZGd85nURq4BWsulfm14Un9g=w96-h96-p-rp-mo-br100', url: 'https://share.google/DMzujRffEd7P7eyV5' },
  { name: 'Rtn.S.Rajendra Babu', date: '2 years ago', text: 'He Thinks from my Shoes, that’s the Power of GFX... A Company that can be Trusted without Testing... I am Personally Delighted.. Good Work Guys... With Luv RB', initials: 'RB', avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjWtpN5eRHy6c-El257G6Kuqrz7NxdS0YdvF0vTnhjWYRBCMap2z=w96-h96-p-rp-mo-ba12-br100', url: 'https://share.google/14T0ax1JRTsbVGhNF' },
  { name: 'gokul ram', date: '2 years ago', text: 'I have given my company profile development to Sage..He done a Excellent professional profile to me..My clients also gets clear attention me by seeing the profile. Thankyou Sage.. Keep Going..🤝', initials: 'GR', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKd-DSje3pWp3b1Mao4xoNEN_Jy6ABmmRl8KYwdiDo_jihRQQ=w96-h96-p-rp-mo-br100', url: 'https://share.google/3u8qXa93JxHPfFnvf' },
  { name: 'four spaces', date: '2 years ago', text: 'One of the best services I have seen from Mr.Saagar. Very friendly approach and value of the service provided. All the best', initials: 'FS', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJ18jmP0p_UtAPRgaEaVwmt9hjGvwZelO6CRBp3dYj4be4oFg=w96-h96-p-rp-mo-br100', url: 'https://share.google/WZi91Zb5DINxi4WA4' },
  { name: 'Karthick m', date: '2 years ago', text: 'Very nice person. Easy to Co ordinate and complete my website in 7 days.', initials: 'KM', avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUXzG0hC_OcQ-YlQMxUXV5lNru0rxxyzawNIG_pX6nqrOfPWifHXw=w96-h96-p-rp-mo-br100', url: 'https://share.google/kK4jAlBbC3Amk0JFA' },
  { name: 'Anil Shila chubkia tal', date: '10 months ago', text: 'Online advertising brought in so many inquiries for me.', initials: 'AS', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJ-pb6kEVtlBn39q47H--Ft2F9PIiVd1gRDG8UUbQSmhFK4Yvg=w96-h96-p-rp-mo-br100', url: 'https://share.google/wCB0CCGI1zx5a0M4S' },
  { name: 'nithya kumari', date: '2 years ago', text: 'The service of Sage GFX enhanced our online presence and driving significant engagement with their expert digital marketing strategies. Highly recommended for any business looking to thrive in the digital landscape.', initials: 'NK', avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXkLaO7LbBtcxa5e0VJJt_hsp9tKhiRY9_vHGe9oJw0B7Lha196=w96-h96-p-rp-mo-br100', url: 'https://share.google/757SO3fVnNzusnTO7' },
  { name: 'Prakash Wariar', date: '2 years ago', text: 'Sage GFX is a wonderful organization to get your web site developed. They support you in getting you placed well in front of your competition at the e-marketing arena. It would be a nice idea to get your Google workspace aka Google ads to be developed thru’ them. They also help you in positioning your company well ahead thru’ whatsapp channels and whatsapp business. I wish them the best in their journey to achieve web presence to all businesses.', initials: 'PW', avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjX_tVp64jjRsbSAb5dMXVnGcpNPEu4g-GX0hdkYH2ggptsgJHka=w96-h96-p-rp-mo-br100', url: 'https://share.google/WtSHqqWKGq0TEflpa' },
  { name: 'POWERTECH ENGINEERS', date: '2 years ago', text: 'Best rate and quality,delivery', initials: 'PE', avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjX3vcIZTvdXUKFpV8vYUeBWJi_wls2YHI7DEkfqquDiP6qtu1uI=w96-h96-p-rp-mo-br100', url: 'https://share.google/uPBnieYZiYlncbIDQ' },
  { name: 'vicky bosski', date: '2 years ago', text: 'Doing awesome, Service…', initials: 'VB', avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXRClwk8G024-eVA9bWRt0yR-cm0qFNr1N6f5FY9KhViN8H0Q2u6w=w96-h96-p-rp-mo-ba12-br100', url: 'https://share.google/6DRzTpQmmeLpAJI2F' },
  { name: 'Surya Saravanan', date: '2 years ago', text: '“Outstanding Digital Marketing SERVICES” We recently engaged SAGE GFX for our digital marketing needs, and the results have been phenomenal. From the outset, MR. SAGAR was professional, attentive, and incredibly knowledgeable about the latest trends and strategies in digital marketing. The social media marketing strategies he implemented were innovative and highly effective, enhancing our brand’s visibility and engagement across multiple platforms. In summary, SAGE GFX offers top-notch digital marketing services that deliver impressive results. I highly recommend them to any business looking to enhance their online presence and drive growth.', initials: 'SS', avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXTT5QZ4iCFsw5ELRVzmbs742qZPv7rU4F90OTlBHq7AzPYe1dfPg=w96-h96-p-rp-mo-ba12-br100', url: 'https://share.google/MZOOSBcCapXDOCI54' },
]

const reviewsPerPage = 5
const reviewPageCount = Math.ceil(reviews.length / reviewsPerPage)

const particles = Array.from({ length: 12 }, (_, index) => index)

function GoogleMark({ className = '' }) {
  return <span className={`reviews-google-mark ${className}`} aria-label="Google">G</span>
}

function ReviewCard({ review, index }) {
  return <article className={`review-card review-card--${index + 1}`} style={{ '--review-index': index }} aria-label={`Five-star Google review by ${review.name}`}>
    <div className="review-card-top">
      <span className="review-avatar" aria-hidden="true"><img src={review.avatar} alt="" loading="lazy" referrerPolicy="no-referrer" onError={(event) => { event.currentTarget.style.display = 'none' }}/><span>{review.initials}</span></span>
      <div className="review-author"><strong>{review.name}</strong><span>{review.date}</span></div>
      <a className="review-card-google-link" href={review.url} target="_blank" rel="noopener noreferrer" aria-label={`Read ${review.name}’s original Google review`}><GoogleMark className="review-card-google" /></a>
    </div>
    <div className="review-stars" aria-label="Five out of five stars">{Array.from({ length: 5 }, (_, star) => <FiStar key={star} aria-hidden="true" />)}</div>
    <p>“{review.text}”</p>
  </article>
}

function ClientReviews() {
  const sectionRef = useRef(null)
  const visualRef = useRef(null)
  const frameRef = useRef(0)
  const [isVisible, setIsVisible] = useState(false)
  const [reviewPage, setReviewPage] = useState(0)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: .12 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible || isCarouselPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const interval = window.setInterval(() => {
      setReviewPage((currentPage) => (currentPage + 1) % reviewPageCount)
    }, 2000)
    return () => window.clearInterval(interval)
  }, [isVisible, isCarouselPaused])

  useEffect(() => {
    const visual = visualRef.current
    if (!visual || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    const layers = [...visual.querySelectorAll('[data-depth]')]
    const move = (event) => {
      const bounds = visual.getBoundingClientRect()
      const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1))
      const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1))
      cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(() => layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth || 0)
        layer.style.setProperty('--review-parallax-x', `${x * depth * -1}px`)
        layer.style.setProperty('--review-parallax-y', `${y * depth * -1}px`)
      }))
    }
    const reset = () => {
      cancelAnimationFrame(frameRef.current)
      layers.forEach((layer) => {
        layer.style.setProperty('--review-parallax-x', '0px')
        layer.style.setProperty('--review-parallax-y', '0px')
      })
    }
    visual.addEventListener('pointermove', move, { passive: true })
    visual.addEventListener('pointerleave', reset)
    return () => {
      visual.removeEventListener('pointermove', move)
      visual.removeEventListener('pointerleave', reset)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return <section ref={sectionRef} className={`client-reviews${isVisible ? ' is-visible' : ''}`} aria-labelledby="client-reviews-heading">
    <div className="client-reviews-grid" aria-hidden="true" />
    <div className="client-reviews-inner">
      <div className="reviews-copy">
        <p className="reviews-eyebrow"><i/> Client reviews</p>
        <h2 id="client-reviews-heading">Why Clients Trust<br/><span>Sage GFX</span></h2>
        <p className="reviews-description">Our success is built on the trust and satisfaction of our clients. See what they have to say about their experience working with Sage GFX. We take pride in delivering creative, reliable, and result-driven solutions that make a real impact.</p>
        <div className="reviews-stats" aria-label="Sage GFX Google review summary">
          {metrics.map(({ value, label, Icon }) => <div className="reviews-stat" key={label}><Icon aria-hidden="true"/><strong>{value}</strong><span>{label}</span></div>)}
        </div>

        <div className="reviews-cta-block">
          <p className="reviews-cta-label">Loved working with us?</p>
          <a className="reviews-cta" href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer"><GoogleMark/> Leave us a Google Review <FiArrowRight aria-hidden="true"/></a>
          <p className="reviews-cta-note">Your feedback helps us grow and serve you better!</p>
        </div>
      </div>

      <div className={`reviews-visual${reviewPage === reviewPageCount - 1 && reviews.length % reviewsPerPage ? ' reviews-visual--last-page' : ''}`} ref={visualRef} role="region" aria-label="Google client reviews" onMouseEnter={() => setIsCarouselPaused(true)} onMouseLeave={() => setIsCarouselPaused(false)} onFocusCapture={() => setIsCarouselPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsCarouselPaused(false) }}>
        <svg className="reviews-energy-trails" viewBox="0 0 760 660" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="review-trail-gradient" x1="0" x2="1"><stop stopColor="#07d9ef" stopOpacity="0"/><stop offset=".36" stopColor="#168eff"/><stop offset=".72" stopColor="#bd37f5"/><stop offset="1" stopColor="#ff32ca" stopOpacity="0"/></linearGradient></defs><path d="M30 365C120 165 233 174 338 310s210 157 358-22"/><path d="M6 436C128 580 263 510 338 358s170-254 390-168"/><path d="M100 90C250 10 350 170 438 283s164 134 296 38"/></svg>
        <div className="reviews-orbit-ring reviews-orbit-ring--one" data-depth="4" aria-hidden="true"/><div className="reviews-orbit-ring reviews-orbit-ring--two" data-depth="8" aria-hidden="true"/><div className="reviews-orbit-ring reviews-orbit-ring--three" data-depth="12" aria-hidden="true"/>
        <div className="reviews-particles" aria-hidden="true">{particles.map((particle) => <i key={particle} className={`reviews-particle reviews-particle--${particle + 1}`} data-depth={3 + particle % 5}/>)}</div>
        <div className="reviews-rating-orb" aria-label="Google rating 4.8 out of 5, 23 linked reviews">
          <span className="reviews-orb-google"><GoogleMark/></span>
          <strong>4.8</strong>
          <span className="reviews-orb-stars" aria-hidden="true">★★★★★</span>
          <span className="reviews-orb-label">Google rating</span>
          <span className="reviews-orb-count">23 reviews</span>
        </div>
        <div className="reviews-card-orbit" key={reviewPage} aria-live="off">{reviews.slice(reviewPage * reviewsPerPage, (reviewPage + 1) * reviewsPerPage).map((review, index) => <ReviewCard key={`${review.name}-${reviewPage}`} review={review} index={index}/>)}</div>
        <div className="reviews-carousel-controls" aria-label="Review pages">
          <button type="button" onClick={() => setReviewPage((page) => (page - 1 + reviewPageCount) % reviewPageCount)} aria-label="Show previous reviews"><FiChevronLeft aria-hidden="true"/></button>
          <span>{reviewPage + 1} / {reviewPageCount}</span>
          {Array.from({ length: reviewPageCount }, (_, index) => <button className="reviews-carousel-dot" key={index} type="button" onClick={() => setReviewPage(index)} aria-label={`Show review group ${index + 1}`} aria-pressed={reviewPage === index}/>) }
          <button type="button" onClick={() => setReviewPage((page) => (page + 1) % reviewPageCount)} aria-label="Show next reviews"><FiChevronRight aria-hidden="true"/></button>
        </div>
      </div>
    </div>
  </section>
}

export default ClientReviews
