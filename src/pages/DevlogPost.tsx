import { Link, useParams } from "react-router-dom";
import MarkdownContent from "../components/MarkdownContent";
import NotFound from "./NotFound";
import { formatDate } from "../lib/format";
import { getPostBySlug } from "../lib/posts";

export default function DevlogPost() {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <NotFound title="Post not found" backTo="/devlog" backLabel="See all posts" />;
  }

  const { metadata, content } = post;

  return (
    <article className="page article">
      <Link to="/devlog" className="back-link">
        Devlog
      </Link>

      <header className="article-head">
        <time className="article-date" dateTime={metadata.date}>
          {formatDate(metadata.date)}
        </time>
        <h1>{metadata.title}</h1>
        <p className="article-lede">{metadata.description}</p>
        <ul className="tags" aria-label="Tags">
          {metadata.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </header>

      <div className="prose">
        <MarkdownContent content={content} />
      </div>
    </article>
  );
}
