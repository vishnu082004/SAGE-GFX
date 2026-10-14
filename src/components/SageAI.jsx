import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiCpu, FiMaximize2, FiMic, FiMicOff, FiMinimize2, FiSend, FiVolume2, FiX, FiZap } from 'react-icons/fi'
import { commonQuestions } from './CommonQuestions'
import services from '../data/services'
import blogArticles from '../data/blogArticles'
import { contactEmail, contactPhone, studioAddress } from '../data/contactInfo'
import { websiteProjects, seoClientLogos, smmClientLogos } from '../pages/PortfolioPage'

const suggestions = [
  'Show me all 8 services',
  'What projects are in the portfolio?',
  'How do I apply for a job?',
  'What can I read on the blog?',
]

const page = (label, path) => ({ label, path })
const servicesPage = page('Services', '/services')
const careersPage = page('Careers', '/careers')
const blogPage = page('Studio Journal', '/blog')
const portfolioPage = page('Projects', '/portfolio')
const contactPage = page('Contact', '/contact')

const listServices = () => services.map(({ title }) => title).join(', ')
const filenamesToNames = (items) => items.map((item) => item.split('/').pop().replace(/\.webp$/i, '').replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()))

function getAnswer(question) {
  const text = question.toLowerCase().replace(/\s+/g, ' ').trim()
  const namedService = services.find(({ title }) => text.includes(title.toLowerCase()))
  const service = namedService
    || (/social media management|manage (our )?(social|instagram|facebook)|manage.*channel/.test(text) ? services.find(({ title }) => title === 'Social Media Management') : null)
    || (/social media|\bsmm\b|instagram|facebook campaign/.test(text) ? services.find(({ title }) => title === 'Social Media Marketing') : null)
    || (/website|web site|web development|landing page/.test(text) ? services.find(({ title }) => title === 'Website Development') : null)
    || (/\bseo\b|search engine|google ranking/.test(text) ? services.find(({ title }) => title === 'SEO') : null)
    || (/video|reel|editing/.test(text) ? services.find(({ title }) => title === 'Video Editing') : null)
    || (/signage|digital print|printing/.test(text) ? services.find(({ title }) => title === 'Signage & Digital Print') : null)
    || (/graphic|design|brochure|flyer/.test(text) ? services.find(({ title }) => title === 'Graphic Design') : null)
    || (/brand|logo|identity/.test(text) ? services.find(({ title }) => title === 'Branding & Identity') : null)

  if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(text)) {
    return { text: 'Welcome to Sage GFX! I’m Sage, your website guide. I can help you explore our services, projects, careers, and journal, or connect you with the team. What are you hoping to do today?' }
  }

  if (/not sure|help me choose|what should i choose|recommend|where (do|should) i start|help growing|grow my business/.test(text) && !service) {
    return {
      text: 'Of course—I can help you find a starting point. Is your main goal to launch or improve a website, get found on Google, or reach more people through social media? If you tell me a little about your business and goal, I can point you toward the most relevant Sage GFX service.',
      page: servicesPage,
    }
  }

  const faq = commonQuestions.find(({ question: prompt }) => prompt.toLowerCase().replace(/[?!.]/g, '') === text.replace(/[?!.]/g, '') && !/what services/.test(text))
  if (faq) {
    const destination = /seo|search|social|website|content/.test(text) ? servicesPage : null
    return { text: faq.answer, page: destination }
  }

  if (/career|job|jobs|vacan|hiring|apply|application|intern|work with sage/.test(text)) {
    return {
      text: 'The Careers page has an application form for Design & Branding, Web & App Development, Digital Marketing, Social Media Management, Video & Content Creation, UI/UX Design, or an open application. It asks for your contact details, area of interest, portfolio or LinkedIn URL, and a short note. The site does not list specific open vacancies right now.',
      page: careersPage,
    }
  }

  if (/blog|journal|article|read|reading/.test(text)) {
    const article = blogArticles.find((item) => {
      const searchable = `${item.title} ${item.category} ${item.summary}`.toLowerCase()
      return text.split(/\W+/).filter((word) => word.length > 3).some((word) => searchable.includes(word))
    })
    if (article && !/all|list|what (blogs|articles)|which (blogs|articles)|topics/.test(text)) {
      const section = article.sections.find(({ heading, paragraphs }) => {
        const content = `${heading} ${paragraphs.join(' ')}`.toLowerCase()
        return text.split(/\W+/).filter((word) => word.length > 4).some((word) => content.includes(word))
      })
      return {
        text: `${article.title} (${article.category}, ${article.readTime}). ${article.summary}${section ? ` One key section is “${section.heading}.” ${section.paragraphs[0]}` : ''}`,
        page: page('this article', `/blog/${article.slug}`),
      }
    }
    const titles = blogArticles.map(({ title }) => `• ${title}`).join('\n')
    const topics = [...new Set(blogArticles.map(({ category }) => category))].join(', ')
    return { text: `The Studio Journal has ${blogArticles.length} articles on ${topics}. Here are the current titles:\n${titles}`, page: blogPage }
  }

  if (/project|portfolio|client work|case stud|website work/.test(text)) {
    const websites = websiteProjects.slice(0, 8).map(([domain]) => domain).join(', ')
    const seoClients = filenamesToNames(seoClientLogos).join(', ')
    const smmClients = filenamesToNames(smmClientLogos).join(', ')
    return {
      text: `The portfolio is organized into website, SEO, and social media work. Website examples include ${websites}. The SEO and social media sections show client work for names including ${seoClients} (SEO) and ${smmClients} (social media). The site does not publish detailed performance case studies for these projects.`,
      page: portfolioPage,
    }
  }

  if (/price|pricing|cost|quote|budget|charge|how much/.test(text)) {
    return {
      text: 'The website does not publish fixed prices. Project cost depends on scope, timeline, and deliverables. Share what you need and the team can discuss a suitable quote.',
      page: contactPage,
    }
  }

  if (/contact|email|phone|call|reach|address|location|where are you|office/.test(text)) {
    return {
      text: `You can contact Sage GFX at ${contactEmail} or ${contactPhone}. The studio address is ${studioAddress}.`,
      page: contactPage,
    }
  }

  if (/future|planned|coming soon|not available|will you add/.test(text) && !service) {
    return {
      text: `The current Services page lists these eight offerings: ${listServices()}. I can’t confirm an unlisted service or feature is available today. Future ideas are not available through the website yet; would you like me to ask the team about this request?`,
      page: contactPage,
    }
  }

  if (service || /service|services|what do you offer/.test(text)) {
    if (service) {
      const websiteExamples = websiteProjects.slice(0, 5).map(([domain]) => domain).join(', ')
      const opening = service.title === 'Website Development'
        ? `Absolutely—we’d be glad to help you build a website. Sage GFX has completed projects including ${websiteExamples}.`
        : `Absolutely—${service.title} is one of the services Sage GFX currently provides, and we’d be happy to discuss your needs.`
      return {
        text: `${opening} ${service.description} Our work can include ${service.details.slice(0, 4).join(', ')}. To suggest a useful next step, what kind of business do you have, and what would you like this service to achieve?`,
        page: servicesPage,
      }
    }
    return {
      text: `Yes—we can help with a range of digital and creative work. Sage GFX currently provides these eight services: ${listServices()}. Tell me which one you need and I’ll share more details.`,
      page: servicesPage,
    }
  }

  if (/seo|search engine|google ranking|rank in google/.test(text)) {
    const seo = services.find(({ title }) => title === 'SEO')
    return { text: `${seo.description} The listed work includes ${seo.details.join(', ')}. Search rankings and timing depend on the site and its market; the website does not promise a specific ranking.`, page: servicesPage }
  }

  if (/about|who are you|sage gfx|studio|company/.test(text)) {
    return {
      text: 'Sage GFX is a creative digital studio in Tambaram, Chennai. The website describes its approach as bringing strategy, design, and technology together, with services across brand identity, design, marketing, websites, SEO, video, and print.',
      page: page('About Sage GFX', '/about'),
    }
  }

  if (/privacy|personal data|terms|policy/.test(text)) {
    const isPrivacy = /privacy|personal data/.test(text)
    return {
      text: isPrivacy ? 'The site has a Privacy Policy page explaining how information shared through the website is handled.' : 'The site has a Terms of Service page covering project scope, delivery schedules, and fees agreed with clients.',
      page: page(isPrivacy ? 'Privacy Policy' : 'Terms of Service', isPrivacy ? '/privacy-policy' : '/terms-of-service'),
    }
  }

  return {
    text: 'I don’t have that detail in the current Sage GFX website content, so I don’t want to guess. I can help with the published services, careers, projects, blog articles, about information, and contact details. What would you like to know about those?',
  }
}

function SageAI() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [fullScreen, setFullScreen] = useState(false)
  const [voiceMode, setVoiceMode] = useState(false)
  const [voiceStatus, setVoiceStatus] = useState('')
  const messageId = useRef(0)
  const messageListRef = useRef(null)
  const inputRef = useRef(null)
  const recognitionRef = useRef(null)
  const voiceModeRef = useRef(false)
  const speakingRef = useRef(false)

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
      window.setTimeout(() => ask(event.detail?.question || ''), 0)
    }
    window.addEventListener('sage-ai-ask', handleQuestion)
    return () => window.removeEventListener('sage-ai-ask', handleQuestion)
  }, [])

  const ask = (value, { speakResponse = voiceModeRef.current } = {}) => {
    const cleanQuestion = value.trim()
    if (!cleanQuestion) return
    const answer = getAnswer(cleanQuestion)
    const id = messageId.current++
    setMessages((current) => [...current, { role: 'user', text: cleanQuestion, id: `user-${id}` }, { role: 'assistant', ...answer, id: `assistant-${id}` }])
    setQuestion('')
    if (speakResponse && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const spokenAnswer = `${answer.text}${answer.page ? ` Would you like me to open ${answer.page.label}? Please choose Yes, open it or Stay here on screen.` : ''}`
      const utterance = new SpeechSynthesisUtterance(spokenAnswer)
      utterance.lang = 'en-IN'
      speakingRef.current = true
      setVoiceStatus('Sage AI is replying…')
      utterance.onend = () => {
        speakingRef.current = false
        if (voiceModeRef.current) {
          setVoiceStatus('Listening… say “stop” to end voice chat.')
          window.setTimeout(() => {
            try { recognitionRef.current?.start() } catch { /* The microphone may already be listening. */ }
          }, 250)
        }
      }
      utterance.onerror = () => {
        speakingRef.current = false
        if (voiceModeRef.current) setVoiceStatus('I could not play that answer aloud. You can keep chatting or read it on screen.')
      }
      window.speechSynthesis.speak(utterance)
    }
  }

  const endVoiceChat = () => {
    voiceModeRef.current = false
    setVoiceMode(false)
    setVoiceStatus('')
    recognitionRef.current?.stop()
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    speakingRef.current = false
  }

  const startVoiceChat = () => {
    if (voiceModeRef.current) {
      endVoiceChat()
      return
    }

    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!Recognition) {
      const id = messageId.current++
      setMessages((current) => [...current, { role: 'assistant', id: `assistant-${id}`, text: 'Voice chat is not supported in this browser. Try the latest version of Chrome, or type your question here.' }])
      return
    }

    const recognition = new Recognition()
    recognition.lang = 'en-IN'
    recognition.continuous = false
    recognition.interimResults = false
    recognitionRef.current = recognition
    voiceModeRef.current = true
    setVoiceMode(true)
    setVoiceStatus('Listening… ask me about a service or project.')

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.trim() || ''
      if (!transcript) return
      if (/^(stop|end voice chat|end call|hang up)$/i.test(transcript)) {
        endVoiceChat()
        return
      }
      ask(transcript, { speakResponse: true })
    }
    recognition.onerror = (event) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setVoiceStatus('Microphone access was blocked. Allow microphone access in your browser settings and try again.')
        endVoiceChat()
      } else if (event.error !== 'aborted' && voiceModeRef.current) {
        setVoiceStatus('I didn’t catch that. Please try again, or type your question.')
      }
    }
    recognition.onend = () => {
      if (!voiceModeRef.current || speakingRef.current) return
      setVoiceStatus('Listening… say “stop” to end voice chat.')
      window.setTimeout(() => {
        try { recognitionRef.current?.start() } catch { /* The microphone may already be listening. */ }
      }, 250)
    }
    try { recognition.start() } catch {
      setVoiceStatus('Could not start the microphone. Please try again.')
      endVoiceChat()
    }
  }

  useEffect(() => () => {
    voiceModeRef.current = false
    recognitionRef.current?.stop()
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
  }, [])

  const resolveNavigation = (id, accepted) => {
    const selectedMessage = messages.find((message) => message.id === id)
    if (accepted && selectedMessage?.page) {
      navigate(selectedMessage.page.path)
      setOpen(false)
    }
    setMessages((current) => current.map((message) => message.id === id ? { ...message, navResolved: accepted ? 'opened' : 'stayed' } : message))
  }

  return <div className={`sage-ai-widget${open ? ' is-open' : ''}`}>
    {open && <>
      <button className="sage-ai-backdrop" type="button" aria-label="Close Sage AI" onClick={() => setOpen(false)} />
      <section className={`sage-ai-panel sage-ai-panel--centered${fullScreen ? ' sage-ai-panel--fullscreen' : ''}`} role="dialog" aria-modal="true" aria-label="Sage AI assistant">
      <header className="sage-ai-header">
        <span className="sage-ai-avatar"><FiZap aria-hidden="true"/></span>
        <span className="sage-ai-title"><strong>Sage AI</strong><small>Website guide · voice chat</small></span>
        <button className="sage-ai-close" type="button" onClick={() => setFullScreen((value) => !value)} aria-label={fullScreen ? 'Exit full screen' : 'Expand Sage AI'}>{fullScreen ? <FiMinimize2/> : <FiMaximize2/>}</button>
        <button className="sage-ai-close" type="button" onClick={() => setOpen(false)} aria-label="Close Sage AI"><FiX/></button>
      </header>
      <div className="sage-ai-messages" ref={messageListRef} aria-live="polite">
        <div className="sage-ai-message sage-ai-message--assistant"><p>Welcome to Sage GFX! I’m Sage, your website guide. I can help you explore our services, projects, careers, and journal, or connect you with the team. What are you hoping to do today? I’ll always ask before opening another page.</p></div>
        {messages.map((message) => <div className={`sage-ai-message sage-ai-message--${message.role}`} key={message.id}>
          <p>{message.text}</p>
          {message.role === 'assistant' && <>
            <button className="sage-ai-read" type="button" onClick={() => { if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); window.speechSynthesis.speak(new SpeechSynthesisUtterance(message.text)) } }}><FiVolume2 aria-hidden="true"/> Read aloud</button>
            {message.page && !message.navResolved && <div className="sage-ai-navigation-prompt">
              <span>Would you like me to open {message.page.label}?</span>
              <button type="button" onClick={() => resolveNavigation(message.id, true)}>Yes, open it <FiArrowRight aria-hidden="true"/></button>
              <button type="button" onClick={() => resolveNavigation(message.id, false)}>Stay here</button>
            </div>}
            {message.navResolved === 'stayed' && <span className="sage-ai-nav-confirmation">No problem. We can keep chatting here.</span>}
          </>}
        </div>)}
      </div>
      {voiceStatus && <p className={`sage-ai-voice-status${voiceMode ? ' is-active' : ''}`} role="status">{voiceStatus}</p>}
      {messages.length === 0 && <div className="sage-ai-suggestions">{suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => ask(suggestion)}>{suggestion}</button>)}</div>}
      <form className="sage-ai-form" onSubmit={(event) => { event.preventDefault(); ask(question) }}>
        <input ref={inputRef} value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about Sage GFX…" aria-label="Ask Sage AI a question" />
        <button className={`sage-ai-mic${voiceMode ? ' is-listening' : ''}`} type="button" onClick={startVoiceChat} aria-label={voiceMode ? 'End voice chat' : 'Start voice chat'} title={voiceMode ? 'End voice chat' : 'Start voice chat'}>{voiceMode ? <FiMicOff/> : <FiMic/>}</button>
        <button type="submit" disabled={!question.trim()} aria-label="Send question"><FiSend/></button>
      </form>
      <p className="sage-ai-note">Answers use information currently published on this site. Tap the mic for voice chat. Unlisted services and future plans are not confirmed.</p>
      </section>
    </>}
    <button className="sage-ai-launcher" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-haspopup="dialog">
      {open ? <FiX aria-hidden="true"/> : <FiCpu aria-hidden="true"/>}<span>{open ? 'Close Sage AI' : 'Sage AI'}</span><i aria-hidden="true"/>
    </button>
  </div>
}

export default SageAI
