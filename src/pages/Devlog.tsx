import { useEffect, useRef, useState } from "react";
import { getAllPosts } from "../lib/posts";
import DevlogCard from "../components/DevlogCard";

export default function Devlog() {
  const posts = getAllPosts();
  const [searchQuery, setSearchQuery] = useState("");
  const [tagSearchQuery, setTagSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsTagDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsTagDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.metadata.tags)),
  ).sort((a, b) => a.localeCompare(b));

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const normalizedTagSearchQuery = tagSearchQuery.trim().toLowerCase();

  const visibleTags = allTags.filter((tag) =>
    tag.toLowerCase().includes(normalizedTagSearchQuery),
  );

  const filteredPosts = posts.filter((post) => {
    const matchesTitle =
      normalizedSearchQuery.length === 0 ||
      post.metadata.title.toLowerCase().includes(normalizedSearchQuery);

    const matchesSelectedTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => post.metadata.tags.includes(tag));

    return matchesTitle && matchesSelectedTags;
  });

  const tagButtonText =
    selectedTags.length === 0
      ? "Filter tags"
      : selectedTags.length === 1
        ? "1 tag selected"
        : `${selectedTags.length} tags selected`;

  const canResetTags = selectedTags.length > 0 || tagSearchQuery.length > 0;

  function toggleTag(tag: string) {
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((currentTag) => currentTag !== tag)
        : [...currentTags, tag],
    );
  }

  function resetTags() {
    setSelectedTags([]);
    setTagSearchQuery("");
  }

  return (
    <section className="archive-page">
      <div className="folio-container archive-layout">
        <header className="archive-head">
          <p className="plate-label">Devlog archive</p>
          <h1>What I&apos;ve been up to</h1>
          <p>Notes on projects, tools, coursework, and what I’m learning.</p>
        </header>

        <div className="archive-filters">
          <label className="filter-field" htmlFor="devlog-search">
            <span>Search by title</span>
            <input
              id="devlog-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="e.g. Learning Go"
              className="text-input"
            />
          </label>

          <div ref={dropdownRef} className="tag-filter">
            <span className="filter-label">Filter by tags</span>
            <button
              type="button"
              onClick={() => setIsTagDropdownOpen((isOpen) => !isOpen)}
              className="filter-button"
              aria-expanded={isTagDropdownOpen}
              aria-controls="tag-filter-panel"
            >
              {tagButtonText}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={isTagDropdownOpen ? "filter-chevron is-open" : "filter-chevron"}
                aria-hidden
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {isTagDropdownOpen && (
              <div id="tag-filter-panel" className="tag-panel">
                <div className="tag-panel__body">
                  <label className="filter-field" htmlFor="tag-search">
                    <span>Search tags</span>
                    <input
                      id="tag-search"
                      type="search"
                      value={tagSearchQuery}
                      onChange={(event) => setTagSearchQuery(event.target.value)}
                      placeholder="e.g. Go"
                      className="text-input text-input--compact"
                    />
                  </label>

                  <div className="tag-options">
                    {visibleTags.length > 0 ? (
                      <ul>
                        {visibleTags.map((tag) => {
                          const isSelected = selectedTags.includes(tag);

                          return (
                            <li key={tag}>
                              <button
                                type="button"
                                onClick={() => toggleTag(tag)}
                                className={isSelected ? "tag-option is-selected" : "tag-option"}
                                aria-pressed={isSelected}
                                aria-label={`${isSelected ? "Remove" : "Add"} ${tag} filter`}
                                data-tag={tag}
                              >
                                <span aria-hidden>{isSelected ? "✓" : "+"}</span>
                                {tag}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="tag-empty">No tags found.</p>
                    )}
                  </div>
                </div>

                <div className="tag-panel__footer">
                  <button
                    type="button"
                    onClick={resetTags}
                    disabled={!canResetTags}
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
          {filteredPosts.length} {filteredPosts.length === 1 ? "entry" : "entries"}
        </p>

        {filteredPosts.length > 0 ? (
          <ul className="archive-list">
            {filteredPosts.map((post) => (
              <li key={post.slug}>
                <DevlogCard slug={post.slug} metadata={post.metadata} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="archive-empty">
            <p>No devlogs found.</p>
            <p>Try a different title search or reset your tag filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}
