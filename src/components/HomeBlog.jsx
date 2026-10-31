import { FiArrowUpRight, FiClock } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import blogArticles from '../data/blogArticles'
import '../styles/home-new-sections.css'

function HomeBlog() {
  return <section className="home-journal" id="home-blog" aria-labelledby="home-journal-title">
    <div className="home-new-section-inner">
      <header className="home-new-section-heading home-journal-heading">
        <div>
          <p className="home-new-section-eyebrow">OUR BLOGS</p>
          <h2 id="home-journal-title">Explore Our Latest  <span>Digital Marketing Insights.</span></h2>
          {/* <p>Practical perspectives on building brands and growing online.</p> */}
        </div>
      </header>
      <div className="home-journal-grid">
        {blogArticles.slice(0, 3).map((article) => <Link className="home-journal-card" to={`/blog/${article.slug}`} key={article.slug}>
          <span className="home-journal-image"><img src={article.image} alt="" loading="lazy" decoding="async" /></span>
          <span className="home-journal-meta">{article.category}<i /><span><FiClock aria-hidden="true" /> {article.readTime}</span></span>
          <strong>{article.title}</strong>
          <span className="home-journal-read">Read article <FiArrowUpRight aria-hidden="true" /></span>
        </Link>)}
      </div>
      <div className="home-journal-all-wrap">
        <Link className="home-section-link" to="/blog">View all articles <FiArrowUpRight aria-hidden="true" /></Link>
      </div>
    </div>
  </section>
}

export default HomeBlog
