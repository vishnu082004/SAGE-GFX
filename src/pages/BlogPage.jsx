import { FiArrowRight, FiClock } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import blogArticles from '../data/blogArticles'

function BlogPage() {
  return <div className="blog-page">
    <section className="page-hero blog-hero">
      <div className="blog-hero-art" aria-hidden="true">
        <img src="/images/sage-gfx-services-background.webp" alt="" fetchPriority="high" />
      </div>
      <div className="container">
        {/* <p className="page-hero-eyebrow"><span aria-hidden="true" /> OUR BLOG / NOTES FROM THE STUDIO</p> */}
        <h1 className="page-hero-title">Our <span className="gradient-text">Blog.</span></h1>
        {/* <p className="page-hero-subtitle">Find practical ideas on branding, design, technology, and growing your business online.</p> */}
      </div>
    </section>
    <section className="blog-list-section" aria-label="Studio journal articles">
      <div className="container blog-grid">
        {blogArticles.map((article, index) => <Link
          className={`blog-card blog-card--interactive blog-card--tone-${index + 1}`}
          key={article.slug}
          to={`/blog/${article.slug}`}
          style={{ '--blog-accent': article.accent, '--blog-image': `url("${article.image}")` }}
          aria-label={`Read article: ${article.title}`}
        >
          <div className="blog-art">
            <img src={article.image} alt="" loading={index < 3 ? 'eager' : 'lazy'} />
            <span>SAGE GFX / JOURNAL</span>
            <strong>{String(index + 1).padStart(2, '0')}</strong>
            <i aria-hidden="true" />
          </div>
          <div className="blog-card-copy">
            <p className="project-type">{article.category} <span><FiClock aria-hidden="true"/> {article.readTime}</span></p>
            <h2>{article.title}</h2>
            <p className="blog-card-summary">{article.summary}</p>
            <span className="blog-card-action">Read article <FiArrowRight aria-hidden="true"/></span>
          </div>
        </Link>)}
      </div>
    </section>
  </div>
}

export default BlogPage

