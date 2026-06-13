import { Link, useParams } from "react-router-dom";
import { getPostBySlug } from "../lib/posts";
import Markdown from "react-markdown";

const markdownComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-3xl font-semibold tracking-tight first:mt-0 sm:text-5xl">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="mt-12 text-2xl font-semibold tracking-tight first:mt-0 sm:text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="mt-10 text-xl font-semibold tracking-tight first:mt-0">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mt-5 leading-relaxed text-zinc-700 first:mt-0 dark:text-zinc-300">
      {children}
    </p>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className="link-underline text-accent"
    >
      {children}
    </a>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="mt-5 list-disc space-y-2 pl-5 marker:text-accent first:mt-0">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="mt-5 list-decimal space-y-2 pl-5 marker:text-accent first:mt-0">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="leading-relaxed text-zinc-700 dark:text-zinc-300">
      {children}
    </li>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="mt-6 border-l-2 border-accent pl-5 text-zinc-600 first:mt-0 dark:text-zinc-400">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-zinc-200 dark:border-zinc-800" />,
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
      {children}
    </strong>
  ),
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="mt-6 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed first:mt-0 dark:border-zinc-800 dark:bg-zinc-900/60">
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
    const isBlockCode = className?.startsWith("language-");

    return (
      <code
        className={
          isBlockCode
            ? "font-mono text-zinc-800 dark:text-zinc-100"
            : "rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.9em] text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
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
      <section className="container-narrow py-20 sm:py-24">
        <p className="section-heading mb-4">/ devlog</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Devlog not found
        </h1>
        <Link
          to="/devlog"
          className="link-underline mt-6 text-sm text-zinc-600 dark:text-zinc-400"
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
        <div className="container-narrow py-20 sm:py-24">
          <p className="section-heading mb-4">/ devlog</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Devlog not found
          </h1>
          <Link
            to="/devlog"
            className="link-underline mt-6 text-sm text-zinc-600 dark:text-zinc-400"
          >
            Back to all devlogs
          </Link>
        </div>
      ) : (
        post && (
          <article className="container-narrow pb-20 pt-12 sm:pb-24 sm:pt-16">
            <header className="max-w-3xl">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <p className="section-heading">/ devlog</p>
                <Link
                  to="/devlog"
                  className="inline-flex items-center gap-2 rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-accent hover:text-accent dark:border-zinc-700 dark:text-zinc-300"
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
              <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
                {post.metadata.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
                <time
                  dateTime={post.metadata.date}
                  className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500"
                >
                  {post.metadata.date}
                </time>
                <ul className="flex flex-wrap gap-1.5">
                  {post.metadata.tags.map((tag) => (
                    <li key={tag} className="pill">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </header>

            <div className="mt-10 max-w-3xl border-t border-zinc-200 pt-10 dark:border-zinc-800">
              <Markdown components={markdownComponents}>{post.content}</Markdown>
            </div>
          </article>
        )
      )}
    </section>
  );
}
