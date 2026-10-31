import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import sageGfxLogo from '../assets/images/sage-gfx-navbar.webp'
import { FiArrowRight, FiGlobe, FiMic, FiMicOff, FiPhone, FiSend, FiSettings, FiVolume2, FiVolumeX, FiType, FiX } from 'react-icons/fi'
import { commonQuestions } from './CommonQuestions'
import services from '../data/services'
import blogArticles from '../data/blogArticles'
import { contactEmail, contactPhone, contactPhoneLink, studioAddress } from '../data/contactInfo'
import { websiteProjects, seoClientLogos, smmClientLogos } from '../data/portfolio'

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

  if (/human|person|team member|speak to someone|talk to someone|connect me to (the )?team/.test(text)) {
    return { text: `Of course. You can call our team at ${contactPhone} or use the Contact page to send us a message.`, page: contactPage }
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

  if (/contact|email|phone|call|reach|address|location|where are you|office|human|person|team member|speak to someone|talk to someone/.test(text)) {
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

function getTamilAnswer(question, answer) {
  const path = answer.page?.path
  if (/வணக்கம்|ஹாய்|ஹலோ/.test(question) || /^(hi|hello|hey)\b/i.test(question)) return 'வணக்கம்! நான் சேஜ், Sage GFX இணையதள உதவியாளர். எங்கள் சேவைகள், திட்டங்கள், வேலைவாய்ப்புகள் மற்றும் கட்டுரைகள் பற்றி உதவுவேன். எதைத் தெரிந்துகொள்ள விரும்புகிறீர்கள்?'
  if (/சேவை|எஸ்இஓ|வலைதளம்|டிசைன்/.test(question) || path === '/services') return 'Sage GFX தற்போது எட்டு டிஜிட்டல் சேவைகளை வழங்குகிறது: பிராண்டிங், கிராஃபிக் டிசைன், வலைத்தள மேம்பாடு, SEO, சமூக ஊடக மார்க்கெட்டிங், சமூக ஊடக மேலாண்மை, வீடியோ எடிட்டிங், மற்றும் சைனேஜ் & டிஜிட்டல் பிரிண்ட். உங்கள் தேவையைச் சொல்லுங்கள்; பொருத்தமான சேவையைப் பகிர்கிறேன்.'
  if (/வேலை|வேலைவாய்ப்பு|விண்ணப்ப/.test(question) || path === '/careers') return 'வேலைவாய்ப்பு அல்லது விண்ணப்ப விவரங்களுக்கு Careers பக்கத்தைப் பாருங்கள். வடிவமைப்பு, வலை மற்றும் செயலி மேம்பாடு, டிஜிட்டல் மார்க்கெட்டிங், சமூக ஊடகம், வீடியோ மற்றும் UI/UX ஆகிய துறைகளில் உங்கள் ஆர்வத்தை அங்கே தெரிவிக்கலாம்.'
  if (/திட்டம்|போர்ட்ஃபோலியோ|வாடிக்கையாளர்/.test(question) || path === '/portfolio') return 'எங்கள் வலைத்தள, SEO மற்றும் சமூக ஊடக திட்டங்களை Portfolio பக்கத்தில் பார்க்கலாம். திட்டத்தைப் பற்றி மேலும் அறிய தொடர்பு பக்கத்தில் எங்கள் குழுவை அணுகுங்கள்.'
  if (/கட்டுரை|வலைப்பதிவு|படிக்க/.test(question) || path === '/blog') return 'Sage GFX Studio Journal-ல் ' + blogArticles.length + ' கட்டுரைகள் உள்ளன. தலைப்புகள் மற்றும் முழு கட்டுரைகளை Blog பக்கத்தில் படிக்கலாம்.'
  if (/தொடர்பு|அழை|மின்னஞ்சல்|முகவரி/.test(question) || path === '/contact') return 'Sage GFX-ஐ ' + contactPhone + ' என்ற எண்ணில் அழைக்கலாம் அல்லது ' + contactEmail + ' என்ற முகவரிக்கு மின்னஞ்சல் அனுப்பலாம். எங்கள் முகவரி: ' + studioAddress + '.'
  if (path === '/about') return 'Sage GFX என்பது சென்னை தாம்பரத்தில் உள்ள படைப்பாற்றல் மிக்க டிஜிட்டல் ஸ்டுடியோ. பிராண்டிங், வடிவமைப்பு, மார்க்கெட்டிங், வலைத்தளம் மற்றும் SEO சேவைகள் மூலம் வணிக வளர்ச்சிக்கு உதவுகிறோம்.'
  return 'இந்தக் கேள்விக்கான விவரம் இணையதளத்தில் தற்போது இல்லை; ஊகமாக பதிலளிக்க விரும்பவில்லை. சேவைகள், திட்டங்கள், வேலைவாய்ப்புகள், கட்டுரைகள் அல்லது தொடர்பு விவரங்கள் பற்றி கேளுங்கள்.'
}

function SageAI() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [voiceMode, setVoiceMode] = useState(false)
  const [language, setLanguage] = useState('en-IN')
  const [voiceStatus, setVoiceStatus] = useState('')
  const [autoSpeak, setAutoSpeak] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [speechRate, setSpeechRate] = useState(1)
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
      window.setTimeout(() => ask(event.detail?.question || ''), 0)
    }
    window.addEventListener('sage-ai-ask', handleQuestion)
    return () => window.removeEventListener('sage-ai-ask', handleQuestion)
  }, [])

  const ask = (value, { speakResponse = voiceModeRef.current || autoSpeak } = {}) => {
    const cleanQuestion = value.trim()
    if (!cleanQuestion) return
    const englishAnswer = getAnswer(cleanQuestion)
    const answer = language === 'ta-IN' ? { ...englishAnswer, text: getTamilAnswer(cleanQuestion, englishAnswer) } : englishAnswer
    const id = messageId.current++
    setMessages((current) => [...current, { role: 'user', text: cleanQuestion, id: `user-${id}` }, { role: 'assistant', ...answer, id: `assistant-${id}` }])
    setQuestion('')
    if (speakResponse && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const spokenAnswer = `${answer.text}${answer.page ? ` Would you like me to open ${answer.page.label}? Please choose Yes, open it or Stay here on screen.` : ''}`
      const utterance = new SpeechSynthesisUtterance(spokenAnswer)
      utterance.lang = language
      utterance.rate = speechRate
      speakingRef.current = true
      setVoiceStatus('Sage AI is replying…')
      utterance.onend = () => {
        speakingRef.current = false
        if (voiceModeRef.current) {
          setVoiceStatus('Listening… say “stop” to end voice chat.')
          window.setTimeout(() => {
            if (!voiceModeRef.current || speakingRef.current) return
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
    recognition.lang = language
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
        if (!voiceModeRef.current || speakingRef.current) return
        try { recognitionRef.current?.start() } catch { /* The microphone may already be listening. */ }
      }, 250)
    }
    try { recognition.start() } catch {
      setVoiceStatus('Could not start the microphone. Please try again.')
      endVoiceChat()
    }
  }

  const toggleLanguage = () => {
    endVoiceChat()
    setLanguage((current) => current === 'en-IN' ? 'ta-IN' : 'en-IN')
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

  return <>
    <div className={`sage-ai-widget${open ? ' is-open' : ''}`}>
    {open && createPortal(<div className="sage-ai-overlay-root">
      <button className="sage-ai-backdrop" type="button" aria-label="Close Sage AI" onClick={() => setOpen(false)} />
      <section className="sage-ai-panel sage-ai-panel--centered" role="dialog" aria-modal="true" aria-label="Sage AI assistant">
      <header className="sage-ai-header">
        <div className="sage-ai-identity">
          <span className="sage-ai-avatar"><img src={sageGfxLogo} alt="Sage GFX" /></span>
          <span className="sage-ai-title"><strong>Sage AI</strong><small>{language === 'ta-IN' ? 'உங்கள் Sage GFX வழிகாட்டி' : 'Your Sage GFX guide'}</small></span>
        </div>
        <button className="sage-ai-call-header" type="button" onClick={startVoiceChat} title="Start a voice conversation with Sage AI"><FiMic aria-hidden="true"/><span>Talk with Sage</span><FiArrowRight aria-hidden="true"/></button>
      </header>
      <div className="sage-ai-toolbar">
        <label className="sage-ai-language">{language === 'ta-IN' ? 'மொழி' : 'Language'}
          <select value={language} onChange={(event) => { endVoiceChat(); setLanguage(event.target.value) }} aria-label="Choose assistant language">
            <option value="en-IN">English</option><option value="ta-IN">தமிழ்</option>
          </select>
        </label>
      </div>
      <div className="sage-ai-tools" aria-label="Assistant tools">
        <button type="button" className={voiceMode ? 'is-selected' : ''} aria-pressed={voiceMode} onClick={startVoiceChat} aria-label="Start voice input" title="Voice input"><FiMic/><span>Voice</span></button>
        <button type="button" className={!voiceMode ? 'is-selected' : ''} onClick={() => { endVoiceChat(); inputRef.current?.focus() }} aria-label="Write a text message" title="Text"><FiType/><span>Text</span></button>
        <button type="button" onClick={toggleLanguage} aria-label={language === 'ta-IN' ? 'Switch to English' : 'Switch to Tamil'} title="Translate replies"><FiGlobe/><span>{language === 'ta-IN' ? 'தமிழ்' : 'Translate'}</span></button>
        <button type="button" className={settingsOpen ? 'is-selected' : ''} onClick={() => setSettingsOpen((value) => !value)} aria-expanded={settingsOpen} aria-label="Voice settings" title="Settings"><FiSettings/><span>Settings</span></button>
        <button type="button" className={autoSpeak ? 'is-selected' : ''} onClick={() => setAutoSpeak((value) => !value)} aria-pressed={autoSpeak} aria-label={autoSpeak ? 'Turn off spoken replies' : 'Turn on spoken replies'} title="Spoken replies">{autoSpeak ? <FiVolume2/> : <FiVolumeX/>}<span>{autoSpeak ? 'Sound on' : 'Sound'}</span></button>
      </div>
      {settingsOpen && <div className="sage-ai-settings" role="group" aria-label="Voice settings">
        <label htmlFor="sage-ai-speech-rate">Reply speed <strong>{speechRate.toFixed(1)}×</strong></label>
        <input id="sage-ai-speech-rate" type="range" min="0.8" max="1.2" step="0.1" value={speechRate} onChange={(event) => setSpeechRate(Number(event.target.value))}/>
      </div>}
      <div className="sage-ai-messages" ref={messageListRef} aria-live="polite">
        <div className="sage-ai-message sage-ai-message--assistant"><img className="sage-ai-message-avatar" src={sageGfxLogo} alt="Sage GFX logo"/><p>{language === 'ta-IN' ? 'வணக்கம்! நான் சேஜ். இன்று உங்களுக்கு எப்படி உதவலாம்?' : 'Hi, I’m Sage. How can I help you today?'}</p></div>
        {messages.map((message) => <div className={`sage-ai-message sage-ai-message--${message.role}`} key={message.id}>
          {message.role === 'assistant' && <img className="sage-ai-message-avatar" src={sageGfxLogo} alt="Sage GFX logo"/>}
          <p>{message.text}</p>
          {message.role === 'assistant' && <>
            <button className="sage-ai-read" type="button" onClick={() => { if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(message.text); utterance.lang = language; utterance.rate = speechRate; window.speechSynthesis.speak(utterance) } }}><FiVolume2 aria-hidden="true"/> Read aloud</button>
            {message.page && !message.navResolved && <div className="sage-ai-navigation-prompt">
              <span>Would you like me to open {message.page.label}?</span>
              <button type="button" onClick={() => resolveNavigation(message.id, true)}>Yes, open it <FiArrowRight aria-hidden="true"/></button>
              <button type="button" onClick={() => resolveNavigation(message.id, false)}>Stay here</button>
            </div>}
            {message.page?.path === '/contact' && <a className="sage-ai-team-call" href={contactPhoneLink}><FiPhone aria-hidden="true"/> Call the Sage GFX team <span>{contactPhone}</span></a>}
            {message.navResolved === 'stayed' && <span className="sage-ai-nav-confirmation">No problem. We can keep chatting here.</span>}
          </>}
        </div>)}
      </div>
      {voiceStatus && <p className={`sage-ai-voice-status${voiceMode ? ' is-active' : ''}`} role="status">{voiceStatus}</p>}
      {messages.length === 0 && <div className="sage-ai-suggestions">{(language === 'ta-IN' ? ['எங்கள் சேவைகள் என்ன?', 'திட்டங்களைப் பார்க்கவும்', 'வேலைக்கு விண்ணப்பிப்பது எப்படி?', 'தொடர்பு விவரங்கள்'] : suggestions).map((suggestion) => <button type="button" key={suggestion} onClick={() => ask(suggestion)}>{suggestion}</button>)}</div>}
      <form className="sage-ai-form" onSubmit={(event) => { event.preventDefault(); ask(question) }}>
        <input ref={inputRef} value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={language === 'ta-IN' ? 'உங்கள் கேள்வியை எழுதுங்கள்…' : 'Ask about Sage GFX…'} aria-label="Ask Sage AI a question" />
        <button className={`sage-ai-mic${voiceMode ? ' is-listening' : ''}`} type="button" onClick={startVoiceChat} aria-label={voiceMode ? 'End voice chat' : 'Start voice chat'} title={voiceMode ? 'End voice chat' : 'Start voice chat'}>{voiceMode ? <FiMicOff/> : <FiMic/>}</button>
        <button type="submit" disabled={!question.trim()} aria-label="Send question"><FiSend/></button>
      </form>
      <p className="sage-ai-note">{language === 'ta-IN' ? 'இந்த தளத்தில் வெளியிடப்பட்ட தகவல்களின் அடிப்படையில் பதில்கள் வழங்கப்படுகின்றன.' : 'Answers use information currently published on this site. Voice recognition needs microphone permission.'}</p>
      </section>
    </div>, document.body)}
    <button className="sage-ai-launcher" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-haspopup="dialog">
      {open ? <FiX aria-hidden="true"/> : <img src={sageGfxLogo} alt="Sage GFX logo"/>}<span>{open ? 'Close Sage AI' : 'Sage AI'}</span><i aria-hidden="true"/>
    </button>
    </div>
  </>
}

export default SageAI
