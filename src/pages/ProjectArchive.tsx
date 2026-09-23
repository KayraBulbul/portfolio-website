import FilterBar from "../components/FilterBar";
import ProjectRow from "../components/ProjectRow";
import { useFilter } from "../hooks/useFilter";
import { getAllProjects } from "../lib/projects";

export default function ProjectArchive() {
  const filter = useFilter(
    getAllProjects(),
    (project) => project.metadata.title,
    (project) => project.metadata.technologies,
  );

  return (
    <div className="page">
      <header className="page-head">
        <h1>Projects</h1>
        <p>
          Things I&apos;ve built, from coursework to hackathons. Each one has a
          write-up of how it works and what I learned.
        </p>
      </header>

      <FilterBar
        searchLabel="Search projects by title"
        searchPlaceholder="Search projects"
        query={filter.query}
        onQueryChange={filter.setQuery}
        optionsLabel="Filter by technology"
        optionsNoun={{ singular: "technology", plural: "technologies" }}
        options={filter.options}
        selected={filter.selected}
        onToggle={filter.toggle}
        onClear={filter.clear}
      />

      <p className="result-count" aria-live="polite">
        {filter.results.length === 1 ? "1 project" : `${filter.results.length} projects`}
      </p>

      {filter.results.length > 0 ? (
        <ul className="rows">
          {filter.results.map((project) => (
            <li key={project.slug}>
              <ProjectRow project={project} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty">
          No projects match. Try a different search or clear the filters.
        </p>
      )}
    </div>
  );
}
