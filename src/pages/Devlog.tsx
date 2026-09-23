import FilterBar from "../components/FilterBar";
import PostRow from "../components/PostRow";
import { useFilter } from "../hooks/useFilter";
import { getAllPosts } from "../lib/posts";

export default function Devlog() {
  const filter = useFilter(
    getAllPosts(),
    (post) => post.metadata.title,
    (post) => post.metadata.tags,
  );

  return (
    <div className="page">
      <header className="page-head">
        <h1>Devlog</h1>
        <p>Notes on what I&apos;m building, the tools I&apos;m using, and what I&apos;m learning.</p>
      </header>

      <FilterBar
        searchLabel="Search posts by title"
        searchPlaceholder="Search posts"
        query={filter.query}
        onQueryChange={filter.setQuery}
        optionsLabel="Filter by tag"
        optionsNoun={{ singular: "tag", plural: "tags" }}
        options={filter.options}
        selected={filter.selected}
        onToggle={filter.toggle}
        onClear={filter.clear}
      />

      <p className="result-count" aria-live="polite">
        {filter.results.length === 1 ? "1 post" : `${filter.results.length} posts`}
      </p>

      {filter.results.length > 0 ? (
        <ul className="rows">
          {filter.results.map((post) => (
            <li key={post.slug}>
              <PostRow post={post} showDescription />
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty">No posts match. Try a different search or clear the filters.</p>
      )}
    </div>
  );
}
