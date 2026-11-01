import { FiArrowRight } from 'react-icons/fi'
import { Link, Navigate, useParams } from 'react-router-dom'
import blogArticles from '../data/blogArticles'
import blogArticleAdditionalSections from '../data/blogArticleAdditionalSections'

function renderLinkedText(text) {
  return text.split(/(\[[^\]]+\]\(https?:\/\/[^)]+\))/g).map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/)
    return match
      ? <a key={`${match[2]}-${index}`} href={match[2]} target="_blank" rel="noreferrer">{match[1]}</a>
      : part
  })
}

function BlogArticlePage() {
  const { slug } = useParams()
  const article = blogArticles.find((item) => item.slug === slug)
  const sections = article
    ? [...article.sections, ...(blogArticleAdditionalSections[article.slug] ?? [])]
    : []

  if (!article) return <Navigate to="/blog" replace />

  return <main className="blog-article-page" style={{ '--blog-accent': article.accent }}>
    <section className="blog-article-hero">
      <h2><span>{article.title}</span></h2>
    </section>
    <article className="blog-article-body">
      <figure className="blog-article-cover">
        <img src={article.image} alt="" />
        <span>SAGE GFX / STUDIO NOTES</span>
      </figure>
      {sections.map((section) => <section key={section.heading}>
        <h2>{section.heading}</h2>
        {section.paragraphs?.map((paragraph, index) => <p key={`${section.heading}-paragraph-${index}`}>{renderLinkedText(paragraph)}</p>)}
        {section.bullets?.length > 0 && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
        {section.faqs?.map(({ question, answer }) => <div className="blog-article-faq" key={question}><h3>{question}</h3><p>{renderLinkedText(answer)}</p></div>)}
      </section>)}
    </article>
    <aside className="blog-article-cta">
      <p>Have a project in mind?</p>
      <h2>Let’s put a good idea to work.</h2>
      <Link to="/contact">Talk with our team <FiArrowRight aria-hidden="true"/></Link>
    </aside>
  </main>
}

export default BlogArticlePage
