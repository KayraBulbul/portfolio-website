import { Link, useParams } from "react-router-dom";
import MarkdownContent from "../components/MarkdownContent";
import NotFound from "./NotFound";
import { getProjectBySlug } from "../lib/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <NotFound
        title="Project not found"
        backTo="/projects"
        backLabel="See all projects"
      />
    );
  }

  const { metadata, content } = project;

  return (
    <article className="page article">
      <Link to="/projects" className="back-link">
        Projects
      </Link>

      <header className="article-head">
        <h1>{metadata.title}</h1>
        <p className="article-lede">{metadata.description}</p>

        <dl className="facts">
          <div>
            <dt>Built with</dt>
            <dd>{metadata.technologies.join(", ")}</dd>
          </div>
          {(metadata.repositoryUrl || metadata.liveUrl) && (
            <div>
              <dt>Links</dt>
              <dd className="facts__links">
                {metadata.liveUrl && (
                  <a href={metadata.liveUrl} target="_blank" rel="noreferrer">
                    Live site
                  </a>
                )}
                {metadata.repositoryUrl && (
                  <a href={metadata.repositoryUrl} target="_blank" rel="noreferrer">
                    Source code
                  </a>
                )}
              </dd>
            </div>
          )}
        </dl>
      </header>

      {content && (
        <div className="prose">
          <MarkdownContent content={content} />
        </div>
      )}
    </article>
  );
}
