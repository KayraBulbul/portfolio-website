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
    <section
      id="devlogs"
      className="border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="container-narrow py-20 sm:py-24">
        <p className="section-heading mb-4">/ devlogs</p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Latest devlogs
          </h2>
          <Link
            to="/devlog"
            className="inline-flex items-center gap-2 rounded-md border border-zinc-300 px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent dark:border-zinc-700"
          >
            View all devlogs
            <ArrowIcon />
          </Link>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                to={`/devlog/${post.slug}`}
                className="card group flex h-full flex-col"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {post.metadata.title}
                  </h3>
                  <time className="mt-1 shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                    {post.metadata.date}
                  </time>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {post.metadata.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {post.metadata.tags.map((tag) => (
                    <li key={tag} className="pill">
                      {tag}
                    </li>
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
