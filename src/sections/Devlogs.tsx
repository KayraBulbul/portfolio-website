import { Link } from "react-router-dom";
import { getAllPosts } from "../lib/posts";

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default function Devlogs() {
  const posts = getAllPosts().slice(0, 4);

  return (
    <section id="devlogs" className="folio-section devlogs-section">
      <div className="folio-container">
        <header className="section-head section-head--ruled">
          <h2>Latest devlogs</h2>
          <Link to="/devlog" className="action-link">
            View all devlogs
            <ArrowIcon />
          </Link>
        </header>

        <ul className="devlog-preview-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={`/devlog/${post.slug}`} className="devlog-preview-row">
                <time dateTime={post.metadata.date}>{post.metadata.date}</time>
                <div>
                  <h3>{post.metadata.title}</h3>
                  <p>{post.metadata.description}</p>
                </div>
                <ul aria-label={`${post.metadata.title} tags`}>
                  {post.metadata.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
