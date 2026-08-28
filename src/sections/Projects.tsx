import { Link } from "react-router-dom";
import { getHomepageProjects } from "../lib/projects";

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

export default function Projects() {
  const projects = getHomepageProjects();

  return (
    <section id="projects" className="folio-section project-section">
      <div className="folio-container">
        <header className="section-head section-head--ruled">
          <h2>Selected work</h2>
          <Link to="/projects" className="action-link">
            View all projects <ArrowIcon />
          </Link>
        </header>

        <ol className="project-ledger">
          {projects.map((project, index) => (
            <li
              key={project.slug}
              className={
                project.metadata.featured
                  ? "project-item project-item--featured"
                  : "project-item"
              }
            >
              <article className="project-entry">
                <div className="project-entry__index">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {project.metadata.featured && <span>Featured</span>}
                </div>
                <h3>
                  <Link to={`/projects/${project.slug}`}>
                    {project.metadata.title}
                  </Link>
                </h3>
                <p className="project-entry__description">
                  {project.metadata.description}
                </p>
                <ul
                  className="project-entry__stack"
                  aria-label={`${project.metadata.title} technologies`}
                >
                  {project.metadata.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
                <div className="project-entry__actions">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="project-entry__link"
                  >
                    View project <ArrowIcon />
                  </Link>
                  {project.metadata.repositoryUrl && (
                    <a
                      href={project.metadata.repositoryUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="project-entry__link project-entry__link--secondary"
                    >
                      Source <ExternalIcon />
                    </a>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
