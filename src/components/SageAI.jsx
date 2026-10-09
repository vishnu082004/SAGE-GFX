import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCpu, FiMaximize2, FiMinimize2, FiSend, FiVolume2, FiX, FiZap } from 'react-icons/fi'
import { commonQuestions } from './CommonQuestions'

const suggestions = ['What services do you offer?', 'How do I get a quote?']

function getAnswer(question) {
  const text = question.toLowerCase()
  const faq = commonQuestions.find(({ question: prompt }) => prompt.toLowerCase() === text)
  if (faq) return { text: faq.answer, link: '/services', linkLabel: 'Explore Sage GFX services' }

  if (/price|pricing|cost|quote|budget|charge/.test(text)) {
    return {
      text: 'Project costs depend on the scope, timeline and deliverables. Share a few details and the Sage GFX team can recommend the right next step.',
      link: '/contact',
      linkLabel: 'Request a project quote',
    }
  }
  if (/contact|email|phone|call|talk|reach/.test(text)) {
    return {
      text: 'You can reach the team at hello@sagegfx.com or send a project inquiry. They usually reply within one business day.',
      link: '/contact',
      linkLabel: 'Open the contact page',
    }
  }
  if (/seo|search|google/.test(text)) {
    return { text: 'Sage GFX offers SEO optimization and digital marketing to help improve your visibility and reach the right audience.', link: '/services', linkLabel: 'Explore services' }
  }
  if (/web|website|app|development|ecommerce|e-commerce/.test(text)) {
    return { text: 'The team builds websites, web apps and mobile apps, with a focus on clear design and useful experiences.', link: '/services', linkLabel: 'Explore services' }
  }
  if (/brand|logo|design|graphic|identity/.test(text)) {
    return { text: 'Sage GFX can help with graphic design, branding and identity systems that give your business a consistent visual presence.', link: '/services', linkLabel: 'Explore services' }
  }
  if (/social|marketing|content|video|service|services/.test(text)) {
    return { text: 'Services include digital marketing, website and app development, branding, SEO, social media marketing, web apps and video production.', link: '/services', linkLabel: 'See all services' }
  }

  return {
    text: 'I can help you find Sage GFX services, understand how to request a quote, or get in touch with the team. What are you working on?',
    link: '/contact',
    linkLabel: 'Tell us about your project',
  }
}

function SageAI() {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [fullScreen, setFullScreen] = useState(false)
  const messageListRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (messageListRef.current) messageListRef.current.scrollTop = messageListRef.current.scrollHeight
  }, [messages, open])

  useEffect(() => {
    const handleQuestion = (event) => {
      setOpen(true)
      setFullScreen(true)
      setTimeout(() => ask(event.detail?.question || ''), 0)
    }
    window.addEventListener('sage-ai-ask', handleQuestion)
    return () => window.removeEventListener('sage-ai-ask', handleQuestion)
  }, [])

  const ask = (value) => {
    const cleanQuestion = value.trim()
    if (!cleanQuestion) return
    setMessages((current) => [...current, { role: 'user', text: cleanQuestion }, { role: 'assistant', ...getAnswer(cleanQuestion) }])
    setQuestion('')
  }

  return <div className="sage-ai-widget">
    {open && <section className={`sage-ai-panel${fullScreen ? ' sage-ai-panel--fullscreen' : ''}`} role="dialog" aria-modal={fullScreen} aria-label="Sage AI assistant">
      <header className="sage-ai-header">
        <span className="sage-ai-avatar"><FiZap aria-hidden="true"/></span>
        <span className="sage-ai-title"><strong>Sage AI</strong><small>Instant studio guide</small></span>
        <button className="sage-ai-close" type="button" onClick={() => setFullScreen((value) => !value)} aria-label={fullScreen ? 'Exit full screen' : 'Expand Sage AI'}>{fullScreen ? <FiMinimize2/> : <FiMaximize2/>}</button>
        <button className="sage-ai-close" type="button" onClick={() => setOpen(false)} aria-label="Close Sage AI"><FiX/></button>
      </header>
      <div className="sage-ai-messages" ref={messageListRef} aria-live="polite">
        <div className="sage-ai-message sage-ai-message--assistant">Hi! I can help you explore Sage GFX services or find the right way to start a project.</div>
        {messages.map((message, index) => <div className={`sage-ai-message sage-ai-message--${message.role}`} key={`${index}-${message.role}`}>
          <p>{message.text}</p>
          {message.role === 'assistant' && <button className="sage-ai-read" type="button" onClick={() => { if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); window.speechSynthesis.speak(new SpeechSynthesisUtterance(message.text)) } }}><FiVolume2 aria-hidden="true"/> Read aloud</button>}
          {message.link && <Link to={message.link} onClick={() => setOpen(false)}>{message.linkLabel}<FiArrowRight aria-hidden="true"/></Link>}
        </div>)}
      </div>
      {messages.length === 0 && <div className="sage-ai-suggestions">{[...commonQuestions.map(({ question }) => question), ...suggestions].map((suggestion) => <button type="button" key={suggestion} onClick={() => ask(suggestion)}>{suggestion}</button>)}</div>}
      <form className="sage-ai-form" onSubmit={(event) => { event.preventDefault(); ask(question) }}>
        <input ref={inputRef} value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about our services…" aria-label="Ask Sage AI a question" />
        <button type="submit" disabled={!question.trim()} aria-label="Send question"><FiSend/></button>
      </form>
      <p className="sage-ai-note">Sage AI shares general studio information. The team confirms project details.</p>
    </section>}
    <button className="sage-ai-launcher" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-haspopup="dialog">
      {open ? <FiX aria-hidden="true"/> : <FiCpu aria-hidden="true"/>}<span>{open ? 'Close Sage AI' : 'Sage AI'}</span><i aria-hidden="true"/>
    </button>
  </div>
}

export default SageAI
