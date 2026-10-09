import { useState } from 'react'

const questions = [
  {
    prompt: 'What makes a brand instantly recognizable?',
    answers: ['A consistent voice and visual identity', 'Using every popular trend', 'Posting as often as possible'],
    correct: 0,
    insight: 'Consistency helps people recognize and remember you across every touchpoint.',
  },
  {
    prompt: 'A visitor lands on your website. What matters first?',
    answers: ['A clear message and next step', 'Every service listed at once', 'A long company history'],
    correct: 0,
    insight: 'Clarity lets visitors understand your value and decide what to do next.',
  },
  {
    prompt: 'What turns attention into lasting growth?',
    answers: ['Useful experiences that build trust', 'More effects on every page', 'One viral post'],
    correct: 0,
    insight: 'Trust grows when the experience consistently delivers value.',
  },
]

function BrandQuiz() {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [choice, setChoice] = useState(null)
  const [score, setScore] = useState(0)
  const [complete, setComplete] = useState(false)
  const current = questions[questionIndex]

  const choose = (index) => {
    if (choice !== null) return
    setChoice(index)
    if (index === current.correct) setScore((value) => value + 1)
  }
  const next = () => {
    if (questionIndex === questions.length - 1) setComplete(true)
    else { setQuestionIndex((value) => value + 1); setChoice(null) }
  }
  const restart = () => { setQuestionIndex(0); setChoice(null); setScore(0); setComplete(false) }

  return (
    <section className="brand-quiz" aria-label="Sage GFX brand strategy quiz">
      <div className="brand-quiz-meta"><span className="caption-dot" /> SAGE // QUICK THINK</div>
      {complete ? (
        <div className="brand-quiz-result" aria-live="polite">
          <p className="brand-quiz-count">{score} / {questions.length} signals connected</p>
          <h2>{score === questions.length ? 'Sharp instincts.' : 'Good signal.'}</h2>
          <p>Your brand grows when clarity, consistency and trust work together.</p>
          <button className="brand-quiz-next" onClick={restart}>Run it again <span aria-hidden="true">↗</span></button>
        </div>
      ) : (
        <>
          <p className="brand-quiz-count">BRAND IQ <span>{String(questionIndex + 1).padStart(2, '0')} / 03</span></p>
          <h2 className="brand-quiz-question">{current.prompt}</h2>
          <div className="brand-quiz-answers" role="group" aria-label="Choose an answer">
            {current.answers.map((answer, index) => (
              <button key={answer} onClick={() => choose(index)} disabled={choice !== null} className={choice === index ? (index === current.correct ? 'is-correct' : 'is-wrong') : choice !== null && index === current.correct ? 'is-correct' : ''}>
                <span className="brand-quiz-letter">{String.fromCharCode(65 + index)}</span>{answer}
              </button>
            ))}
          </div>
          {choice !== null && <div className="brand-quiz-feedback" aria-live="polite"><p>{current.insight}</p><button className="brand-quiz-next" onClick={next}>{questionIndex === questions.length - 1 ? 'See your result' : 'Next signal'} <span aria-hidden="true">→</span></button></div>}
        </>
      )}
    </section>
  )
}

export default BrandQuiz
