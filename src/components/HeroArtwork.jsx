import { FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'

function HeroArtwork() {
  return <div className="sage-hero-artwork" aria-hidden="true">
    <div className="sage-hero-art-orbit sage-hero-art-orbit--outer" />
    <div className="sage-hero-art-orbit sage-hero-art-orbit--inner" />
    <span className="sage-hero-art-dot sage-hero-art-dot--one" />
    <span className="sage-hero-art-dot sage-hero-art-dot--two" />
    <div className="sage-hero-social-card">
      <div className="sage-hero-social-top"><span className="sage-hero-card-mark">S</span><span><b>Sage GFX</b><small>Creative studio · Chennai</small></span><i>•••</i></div>
      <div className="sage-hero-social-image">
        <div className="sage-hero-post-window">
          <span className="sage-hero-post-window-bar"><i /><i /><i /></span>
          <strong>MAKE<br />AN IMPACT</strong>
          <span className="sage-hero-post-window-orbit" />
          <span className="sage-hero-post-window-shape" />
        </div>
      </div>
      <div className="sage-hero-social-tools"><span>♡</span><span>◌</span><span>↗</span><i>•••</i></div>
      <div className="sage-hero-social-caption"><b>Ideas that move your brand forward.</b><span>Strategy · creativity · growth</span></div>
    </div>
    <div className="sage-hero-megaphone">
      <svg viewBox="0 0 480 360" role="presentation" focusable="false">
        <defs>
          <linearGradient id="megaphoneCone" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#f8fbff"/><stop offset=".48" stopColor="#dceaff"/><stop offset="1" stopColor="#8bb7ed"/></linearGradient>
          <linearGradient id="megaphoneBase" x1="0" x2="1"><stop stopColor="#25d7f0"/><stop offset=".52" stopColor="#5279fa"/><stop offset="1" stopColor="#a748e8"/></linearGradient>
          <linearGradient id="megaphoneRim" x1="0" x2="1"><stop stopColor="#f7c6ff"/><stop offset=".55" stopColor="#bb7bfa"/><stop offset="1" stopColor="#5be4ff"/></linearGradient>
          <filter id="megaphoneShadow" x="-40%" y="-40%" width="180%" height="190%"><feGaussianBlur in="SourceAlpha" stdDeviation="9"/><feOffset dy="13"/><feComponentTransfer><feFuncA type="linear" slope=".4"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <g filter="url(#megaphoneShadow)" transform="rotate(-12 240 180)">
          <path d="M90 139h92l155-75c17-8 36 4 36 23v186c0 19-19 31-36 23l-155-75H90c-17 0-30-13-30-30v-22c0-17 13-30 30-30Z" fill="url(#megaphoneCone)" stroke="#f5f5ff" strokeWidth="8"/>
          <path d="M183 139v82" fill="none" stroke="#91b6ee" strokeWidth="8"/>
          <path d="M95 140h88v80H95c-17 0-30-13-30-30v-20c0-17 13-30 30-30Z" fill="url(#megaphoneBase)" stroke="#d4c2ff" strokeWidth="8"/>
          <path d="M115 222h64l-10 72c-2 13-12 22-25 22h-12c-10 0-18-9-16-19l10-75Z" fill="url(#megaphoneBase)" stroke="#d4c2ff" strokeWidth="7"/>
          <path d="M340 92c36-18 73-13 99 8M351 180h111M340 267c37 18 72 13 99-8" fill="none" stroke="url(#megaphoneRim)" strokeLinecap="round" strokeWidth="10"/>
          <path d="M350 107v164" fill="none" stroke="#a9b6ff" strokeWidth="4" opacity=".8"/>
          <path d="M73 150v60" fill="none" stroke="#b8fbff" strokeLinecap="round" strokeWidth="6" opacity=".9"/>
        </g>
      </svg>
    </div>
    <span className="sage-hero-social-float sage-hero-social-float--instagram"><FaInstagram /></span>
    <span className="sage-hero-social-float sage-hero-social-float--youtube"><FaYoutube /></span>
    <span className="sage-hero-social-float sage-hero-social-float--linkedin"><FaLinkedinIn /></span>
    <span className="sage-hero-art-star sage-hero-art-star--one">✦</span>
    <span className="sage-hero-art-star sage-hero-art-star--two">✧</span>
  </div>
}

export default HeroArtwork
