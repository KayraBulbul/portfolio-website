import { Link, useParams } from "react-router-dom";
import { getPostBySlug } from "../lib/posts";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const markdownComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="prose-h1">{children}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="prose-h2">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="prose-h3">{children}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="prose-p">{children}</p>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className="prose-link"
    >
      {children}
    </a>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="prose-list prose-list--unordered">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="prose-list prose-list--ordered">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li>{children}</li>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="prose-quote">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="prose-rule" />,
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong>{children}</strong>
  ),
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="prose-code-block">
      {children}
    </pre>
  ),
  code: ({
    className,
    children,
  }: {
    className?: string;
    children?: React.ReactNode;
  }) => {
    const isBlockCode =
      className?.includes("language-") || className?.includes("hljs");

    return (
      <code
        className={
          isBlockCode
            ? "prose-code"
            : "prose-code prose-code--inline"
        }
      >
        {children}
      </code>
    );
  },
};

export default function DevlogPost() {
  const { slug } = useParams();

  if (slug === undefined) {
    return (
      <section className="folio-container missing-page">
        <p className="plate-label">Devlog</p>
        <h1>Devlog not found</h1>
        <Link
          to="/devlog"
          className="action-link"
        >
          Back to all devlogs
        </Link>
      </section>
    );
  }

  const post = getPostBySlug(slug);

  return (
    <section>
      {!post ? (
        <div className="folio-container missing-page">
          <p className="plate-label">Devlog</p>
          <h1>Devlog not found</h1>
          <Link
            to="/devlog"
            className="action-link"
          >
            Back to all devlogs
          </Link>
        </div>
      ) : (
        post && (
          <article className="folio-container post-article">
            <header className="post-header">
              <div className="post-header__topline">
                <p className="plate-label">Devlog · {post.metadata.date}</p>
                <Link
                  to="/devlog"
                  className="action-link"
                >
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
                    <path d="M19 12H5" />
                    <path d="m12 19-7-7 7-7" />
                  </svg>
                  Back to devlogs
                </Link>
              </div>
              <h1 className="post-description">
                {post.metadata.description}
              </h1>
              <div className="post-meta">
                <time
                  dateTime={post.metadata.date}
                >
                  {post.metadata.date}
                </time>
                <ul>
                  {post.metadata.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </header>

            <div className="post-prose">
              <Markdown
                components={markdownComponents}
                rehypePlugins={[
                  [rehypeHighlight, { detect: false, ignoreMissing: true }],
                ]}
              >
                {post.content}
              </Markdown>
            </div>
          </article>
        )
      )}
    </section>
  );
}
