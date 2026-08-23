import { Link } from "react-router-dom";
import type { ProjectMetadata } from "../lib/projects";

type ProjectCardProps = {
  slug: string;
  metadata: ProjectMetadata;
};

export default function ProjectCard({ slug, metadata }: ProjectCardProps) {
  return (
    <Link to={`/projects/${slug}`} className="archive-row project-archive-row">
      <span className="archive-row__kicker">
        {metadata.featured ? "Featured" : "Project"}
      </span>
      <div className="archive-row__body">
        <h2>{metadata.title}</h2>
        <p>{metadata.description}</p>
      </div>
      <ul
        className="archive-row__tags"
        aria-label={`${metadata.title} technologies`}
      >
        {metadata.technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
      <span className="archive-row__arrow" aria-hidden>
        ↗
      </span>
    </Link>
  );
}
