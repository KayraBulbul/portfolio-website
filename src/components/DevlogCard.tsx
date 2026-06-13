import { Link } from "react-router-dom";
import type { PostMetadata } from "../lib/posts";

type DevlogCardProps = {
  slug: string;
  metadata: PostMetadata;
};
export default function DevlogCard({ slug, metadata }: DevlogCardProps) {
  return (
    <Link
      to={`/devlog/${slug}`}
      className="group grid gap-4 py-6 transition-colors sm:grid-cols-[minmax(0,1fr)_auto]"
    >
      <div>
        <h2 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-xl">
          {metadata.title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {metadata.description}
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {metadata.tags.map((tag) => (
            <li key={tag} className="pill">
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <time
        dateTime={metadata.date}
        className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 sm:pt-1 sm:text-right"
      >
        {metadata.date}
      </time>
    </Link>
  );
}
