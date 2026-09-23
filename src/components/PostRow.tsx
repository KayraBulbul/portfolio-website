import { Link } from "react-router-dom";
import type { Post } from "../lib/posts";
import { formatDate } from "../lib/format";

type PostRowProps = {
  post: Post;
  showDescription?: boolean;
};

export default function PostRow({ post, showDescription = false }: PostRowProps) {
  const { metadata } = post;

  return (
    <Link to={`/devlog/${post.slug}`} className="row post-row">
      <time className="row__date" dateTime={metadata.date}>
        {formatDate(metadata.date)}
      </time>
      <span className="row__title">{metadata.title}</span>
      {showDescription && <span className="row__text">{metadata.description}</span>}
    </Link>
  );
}
