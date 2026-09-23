import { Link } from "react-router-dom";
import type { Project } from "../lib/projects";

type ProjectRowProps = {
  project: Project;
  showStack?: boolean;
};

export default function ProjectRow({ project, showStack = true }: ProjectRowProps) {
  const { metadata } = project;

  return (
    <Link to={`/projects/${project.slug}`} className="row project-row">
      <span className="row__title">{metadata.title}</span>
      <span className="row__text">{metadata.description}</span>
      {showStack && (
        <span className="row__meta">{metadata.technologies.join(", ")}</span>
      )}
    </Link>
  );
}
