import { useState } from 'react'
import { FiChevronDown, FiCpu, FiVolume2 } from 'react-icons/fi'

export const commonQuestions = [
  {
    question: 'What services does Sage GFX provide?',
    answer: 'Sage GFX offers digital marketing, SEO, social media and content marketing, PPC advertising, website development, app development, branding and creative services. Our goal is to strengthen your online presence and support business growth.',
  },
  {
    question: 'How does Sage GFX improve search engine rankings?',
    answer: 'We use SEO strategy, technical improvements, useful content and ongoing optimization to help your website become easier to find in search. Results depend on your goals, market and starting point.',
  },
  {
    question: 'What are the benefits of Social Media Marketing with Sage GFX?',
    answer: 'Social media marketing can help your brand reach the right audience, share engaging content and build stronger relationships with customers. We shape the approach around your business and audience.',
  },
  {
    question: 'Does Sage GFX offer website development?',
    answer: 'Yes. Sage GFX designs and develops websites with a focus on clear messaging, polished visuals and useful experiences across screen sizes.',
  },
  {
    question: 'Can Sage GFX handle content creation?',
    answer: 'Yes. We can help create content for digital campaigns and social channels, including creative assets and video. Get in touch to discuss the content your project needs.',
  },
]

function speak(text) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(text))
}

function FAQArtwork() {
  return <div className="common-questions-art" aria-hidden="true">
    <span className="common-questions-art-orbit common-questions-art-orbit--one" />
    <span className="common-questions-art-orbit common-questions-art-orbit--two" />
    <span className="common-questions-art-orbit common-questions-art-orbit--three" />
    <span className="common-questions-art-core"><i /></span>
    <span className="common-questions-art-node common-questions-art-node--one" />
    <span className="common-questions-art-node common-questions-art-node--two" />
    <span className="common-questions-art-node common-questions-art-node--three" />
  </div>
}
function CommonQuestions() {
  const [active, setActive] = useState(0)

  const askAI = (question) => window.dispatchEvent(new CustomEvent('sage-ai-ask', { detail: { question } }))

  return <section className="common-questions" id="common-questions" data-active={active >= 0}>
    <div className="common-questions-intro">
      <FAQArtwork />
      <div className="common-questions-heading">
        {/* <p className="common-questions-eyebrow"> Frequently Asked Questions</p> */}
        <h2>Frequently Asked <br/><span>Questions</span></h2>
        <p className="common-questions-hint">Tap a question to hear the answer, or ask Sage AI for more.</p>
      </div>
    </div>
    <div className="common-questions-list">
      {commonQuestions.map(({ question, answer }, index) => {
        const expanded = active === index
        return <article className={`common-question${expanded ? ' is-open' : ''}`} key={question}>
          <button className="common-question-toggle" id={`common-question-toggle-${index}`} type="button" aria-controls={`common-question-answer-${index}`} aria-expanded={expanded} onClick={() => setActive(expanded ? -1 : index)}>
            <span>{question}</span><FiChevronDown aria-hidden="true" />
          </button>
          <div className="common-question-answer" id={`common-question-answer-${index}`} role="region" aria-labelledby={`common-question-toggle-${index}`} aria-hidden={!expanded}>
            <div className="common-question-answer-inner">
              <p>{answer}</p>
              <div className="common-question-actions">
                <button type="button" tabIndex={expanded ? 0 : -1} onClick={() => speak(`${question}. ${answer}`)}><FiVolume2 aria-hidden="true"/> Read answer</button>
                <button type="button" tabIndex={expanded ? 0 : -1} onClick={() => askAI(question)}><FiCpu aria-hidden="true"/> Ask Sage AI</button>
              </div>
            </div>
          </div>
        </article>
      })}
    </div>
  </section>
}

export default CommonQuestions
