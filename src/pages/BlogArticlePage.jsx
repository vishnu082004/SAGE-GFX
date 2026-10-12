import { FiArrowLeft, FiArrowRight, FiClock } from 'react-icons/fi'
import { Link, Navigate, useParams } from 'react-router-dom'
import blogArticles from '../data/blogArticles'

function BlogArticlePage() {
  const { slug } = useParams()
  const article = blogArticles.find((item) => item.slug === slug)

  if (!article) return <Navigate to="/blog" replace />

  return <main className="blog-article-page" style={{ '--blog-accent': article.accent }}>
    <header className="blog-article-heading">
      <Link className="blog-article-back" to="/blog"><FiArrowLeft aria-hidden="true"/> Studio journal</Link>
      <p className="blog-article-category">{article.category}</p>
      <h1>{article.title}</h1>
      <p className="blog-article-summary">{article.summary}</p>
      <span className="blog-article-readtime"><FiClock aria-hidden="true"/> {article.readTime}</span>
    </header>
    <figure className="blog-article-cover">
      <img src={article.image} alt="" />
      <span>SAGE GFX / STUDIO NOTES</span>
    </figure>
    <article className="blog-article-body">
      {article.sections.map((section) => <section key={section.heading}>
        <h2>{section.heading}</h2>
        {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
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
