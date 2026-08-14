import { Link } from "react-router-dom";
import type { PostMetadata } from "../lib/posts";

type DevlogCardProps = {
  slug: string;
  metadata: PostMetadata;
};

export default function DevlogCard({ slug, metadata }: DevlogCardProps) {
  return (
    <Link to={`/devlog/${slug}`} className="archive-row">
      <time dateTime={metadata.date}>{metadata.date}</time>
      <div className="archive-row__body">
        <h2>{metadata.title}</h2>
        <p>{metadata.description}</p>
      </div>
      <ul className="archive-row__tags" aria-label={`${metadata.title} tags`}>
        {metadata.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <span className="archive-row__arrow" aria-hidden>
        ↗
      </span>
    </Link>
  );
}
