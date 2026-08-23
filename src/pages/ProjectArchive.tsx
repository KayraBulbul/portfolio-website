import { useEffect, useRef, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { getAllProjects } from "../lib/projects";

export default function ProjectArchive() {
  const projects = getAllProjects();
  const [searchQuery, setSearchQuery] = useState("");
  const [technologySearchQuery, setTechnologySearchQuery] = useState("");
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [isTechnologyDropdownOpen, setIsTechnologyDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsTechnologyDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsTechnologyDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const allTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.metadata.technologies)),
  ).sort((a, b) => a.localeCompare(b));

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const normalizedTechnologySearchQuery = technologySearchQuery
    .trim()
    .toLowerCase();

  const visibleTechnologies = allTechnologies.filter((technology) =>
    technology.toLowerCase().includes(normalizedTechnologySearchQuery),
  );

  const filteredProjects = projects.filter((project) => {
    const matchesTitle =
      normalizedSearchQuery.length === 0 ||
      project.metadata.title.toLowerCase().includes(normalizedSearchQuery);

    const matchesSelectedTechnologies =
      selectedTechnologies.length === 0 ||
      selectedTechnologies.some((technology) =>
        project.metadata.technologies.includes(technology),
      );

    return matchesTitle && matchesSelectedTechnologies;
  });

  const technologyButtonText =
    selectedTechnologies.length === 0
      ? "Filter technologies"
      : selectedTechnologies.length === 1
        ? "1 technology selected"
        : `${selectedTechnologies.length} technologies selected`;

  const canResetTechnologies =
    selectedTechnologies.length > 0 || technologySearchQuery.length > 0;

  function toggleTechnology(technology: string) {
    setSelectedTechnologies((currentTechnologies) =>
      currentTechnologies.includes(technology)
        ? currentTechnologies.filter(
            (currentTechnology) => currentTechnology !== technology,
          )
        : [...currentTechnologies, technology],
    );
  }

  function resetTechnologies() {
    setSelectedTechnologies([]);
    setTechnologySearchQuery("");
  }

  return (
    <section className="archive-page">
      <div className="folio-container archive-layout">
        <header className="archive-head">
          <p className="plate-label">Project archive</p>
          <h1>Projects I&apos;ve built</h1>
          <p>
            Software projects, technical decisions, source code, and working
            demonstrations.
          </p>
        </header>

        <div className="archive-filters">
          <label className="filter-field" htmlFor="project-search">
            <span>Search by title</span>
            <input
              id="project-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="e.g. Maze Solver"
              className="text-input"
            />
          </label>

          <div ref={dropdownRef} className="tag-filter">
            <span className="filter-label">Filter by technology</span>
            <button
              type="button"
              onClick={() =>
                setIsTechnologyDropdownOpen((isOpen) => !isOpen)
              }
              className="filter-button"
              aria-expanded={isTechnologyDropdownOpen}
              aria-controls="technology-filter-panel"
            >
              {technologyButtonText}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={
                  isTechnologyDropdownOpen
                    ? "filter-chevron is-open"
                    : "filter-chevron"
                }
                aria-hidden
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {isTechnologyDropdownOpen && (
              <div id="technology-filter-panel" className="tag-panel">
                <div className="tag-panel__body">
                  <label className="filter-field" htmlFor="technology-search">
                    <span>Search technologies</span>
                    <input
                      id="technology-search"
                      type="search"
                      value={technologySearchQuery}
                      onChange={(event) =>
                        setTechnologySearchQuery(event.target.value)
                      }
                      placeholder="e.g. Python"
                      className="text-input text-input--compact"
                    />
                  </label>

                  <div className="tag-options">
                    {visibleTechnologies.length > 0 ? (
                      <ul>
                        {visibleTechnologies.map((technology) => {
                          const isSelected =
                            selectedTechnologies.includes(technology);

                          return (
                            <li key={technology}>
                              <button
                                type="button"
                                onClick={() => toggleTechnology(technology)}
                                className={
                                  isSelected
                                    ? "tag-option is-selected"
                                    : "tag-option"
                                }
                                aria-pressed={isSelected}
                                aria-label={`${isSelected ? "Remove" : "Add"} ${technology} filter`}
                              >
                                <span aria-hidden>{isSelected ? "✓" : "+"}</span>
                                {technology}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="tag-empty">No technologies found.</p>
                    )}
                  </div>
                </div>

                <div className="tag-panel__footer">
                  <button
                    type="button"
                    onClick={resetTechnologies}
                    disabled={!canResetTechnologies}
                    className="reset-button"
                  >
                    Reset filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="archive-count" aria-live="polite">
          {filteredProjects.length}{" "}
          {filteredProjects.length === 1 ? "project" : "projects"}
        </p>

        {filteredProjects.length > 0 ? (
          <ul className="archive-list">
            {filteredProjects.map((project) => (
              <li key={project.slug}>
                <ProjectCard
                  slug={project.slug}
                  metadata={project.metadata}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="archive-empty">
            <p>No projects found.</p>
            <p>Try a different title search or reset your technology filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}
