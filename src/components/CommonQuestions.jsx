import { useState } from 'react'
import { FiChevronDown, FiCpu, FiVolume2 } from 'react-icons/fi'

export const commonQuestions = [
  {
    question: 'What kind of digital marketing services are offered by Sage GFX?',
    answer: 'At Sage GFX, we have a full suite of digital marketing services that include SEO, AEO, GEO, social media marketing, performance marketing, website design, graphic design, and video editing/videography. Instead of adopting a cookie-cutter approach to these services, we customize them depending on your business requirements and goals.',
  },
  {
    question: 'In what way can Sage GFX assist in improving my company’s online presence?',
    answer: 'We create a digital strategy focusing on where your customers search and how they decide. Our strategy is a blend of SEO, content creation, social media, paid ads and website optimization for visibility and customer acquisition.',
  },
  {
    question: 'Does Sage GFX offer SEO, AEO and GEO for AI-driven search optimization?',
    answer: 'Yes. Sage GFX operates in the area of SEO as well as in innovative search optimization such as AEO and GEO. We develop valuable content that will help search engines and AI-based systems understand more about your brand and business.',
  },
  {
    question: 'What are the steps in developing a digital marketing strategy for each business?',
    answer: 'We begin with the knowledge of your company, customers, competitors, present digital marketing position and objectives. Then we conduct the research, analyze the results and create a strategy based on our findings and continually optimize it according to its success rate. Each individual strategy is created taking into account the specifics of the business.',
  },
  {
    question: 'Will Sage GFX be able to generate leads via Google and Meta Ads?',
    answer: 'Yes. This will be done by leveraging Google Ads, social media ads, search engine optimization, and website and content optimization. It is about doing much more than getting traffic; it is about reaching the right audience and having them become actual business leads.',
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
  const [active, setActive] = useState(-1)

  const askAI = (question) => window.dispatchEvent(new CustomEvent('sage-ai-ask', { detail: { question } }))

  return <section className="common-questions" id="common-questions" data-active={active >= 0}>
    <div className="common-questions-intro">
      <FAQArtwork />
      <div className="common-questions-heading">
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
