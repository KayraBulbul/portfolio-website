import { Link, useParams } from "react-router-dom";
import ProjectMarkdown from "../components/ProjectMarkdown";
import { getProjectBySlug } from "../lib/projects";

function ExternalIcon() {
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
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

function MissingProject() {
  return (
    <section className="folio-container missing-page">
      <p className="plate-label">Projects</p>
      <h1>Project not found</h1>
      <Link to="/projects" className="action-link">
        Back to all projects
      </Link>
    </section>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <MissingProject />;
  }

  const { metadata, content } = project;

  return (
    <article className="folio-container post-article project-article">
      <header className="post-header project-header">
        <div className="post-header__topline">
          <p className="plate-label">
            Project{metadata.status ? ` · ${metadata.status}` : ""}
          </p>
          <Link to="/projects" className="action-link">
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
            Back to projects
          </Link>
        </div>

        <div className="project-heading">
          <h1>{metadata.title}</h1>
          <p>{metadata.description}</p>
        </div>

        <div className="project-detail-grid">
          <dl className="project-facts">
            <div>
              <dt>Technologies</dt>
              <dd>{metadata.technologies.join(" / ")}</dd>
            </div>
          </dl>

          <div className="project-links" aria-label="Project links">
            {metadata.liveUrl && (
              <a
                href={metadata.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="action-primary"
              >
                Open live project <ExternalIcon />
              </a>
            )}
            {metadata.repositoryUrl && (
              <a
                href={metadata.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="action-link"
              >
                View source code <ExternalIcon />
              </a>
            )}
          </div>
        </div>
      </header>

      {content && (
        <div className="post-prose project-prose">
          <ProjectMarkdown content={content} />
        </div>
      )}
    </article>
  );
}
