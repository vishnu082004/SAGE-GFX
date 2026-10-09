import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

const stages = ['Idea', 'Create', 'Connect', 'Grow']

function MissionVision() {
  const reduceMotion = useReducedMotion()
  return <section className="mission-vision growth-story" aria-label="Our mission, vision and digital growth process"><div className="container">
    <p className="eyebrow"><span/> The Sage GFX approach</p><div className="mv-reference-heading"><div><h2>Strategy. Creativity.<br/><span>Technology.</span></h2><p>We combine data, creativity and digital expertise to build solutions that help your brand grow.</p><Link to="/about" className="button button-outline">Learn more <FiArrowRight/></Link></div><div className="mv-reference-steps"><span>01 <b>Understand<br/>your business</b></span><span>02 <b>Build smart<br/>strategies</b></span><span>03 <b>Create lasting<br/>experiences</b></span><span>04 <b>Measure real<br/>results</b></span></div></div><div className="mv-editorial"><div className="mv-copy"><span className="mv-kicker">OUR MISSION</span><p>We pair clear strategy with standout creative and reliable technology, making every digital touchpoint work harder for your business.</p></div><div className="mv-copy"><span className="mv-kicker">OUR VISION</span><p>We want ambitious businesses to have the clarity, confidence and digital tools to grow beyond what they thought possible.</p></div></div>
    <div className="growth-flow"><svg className="growth-flow-line" viewBox="0 0 1000 180" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="growth-gradient"><stop stopColor="#e627bd"/><stop offset=".55" stopColor="#9f49ed"/><stop offset="1" stopColor="#09cbea"/></linearGradient></defs><path className="growth-curve-base" d="M10 112C190 112 192 70 345 88S536 119 666 71 831 39 990 18"/><motion.path className="growth-curve" d="M10 112C190 112 192 70 345 88S536 119 666 71 831 39 990 18" initial={reduceMotion?false:{pathLength:0}} whileInView={{pathLength:1}} viewport={{once:true,amount:.5}} transition={{duration:reduceMotion?0:2.3,ease:'easeInOut'}}/><motion.circle r="4" fill="#e7f8ff" initial={reduceMotion?false:{offsetDistance:'0%'}} whileInView={{offsetDistance:'100%'}} viewport={{once:true,amount:.5}} transition={{duration:reduceMotion?0:3,ease:'easeInOut'}} style={{offsetPath:'path("M10 112C190 112 192 70 345 88S536 119 666 71 831 39 990 18")'}}/></svg><div className="growth-stages">{stages.map((stage,index)=><motion.div className={`growth-stage growth-stage--${index}`} key={stage} initial={reduceMotion?false:{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.8}} transition={{delay:reduceMotion?0:index*.16,duration:reduceMotion?0:.5}}><span className="growth-stage-dot"/><span>{stage}</span></motion.div>)}</div></div>
  </div></section>
}

export default MissionVision
