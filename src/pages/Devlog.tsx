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

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
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
    <section>
      <div className="container-narrow py-20 sm:py-24">
        <p className="section-heading mb-4">/ devlog</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          What I've been up to
        </h1>

        <div className="mt-8 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
          <label className="sr-only" htmlFor="devlog-search">
            Search devlogs by title
          </label>
          <input
            id="devlog-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search devlogs by title"
            className="w-full rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors placeholder:text-zinc-400 focus:border-accent focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          />

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setIsTagDropdownOpen((isOpen) => !isOpen)}
              className="inline-flex w-full items-center justify-between gap-3 rounded-md border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-accent hover:text-accent dark:border-zinc-700 dark:text-zinc-300 sm:w-44"
              aria-expanded={isTagDropdownOpen}
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
                className={`transition-transform ${isTagDropdownOpen ? "rotate-180" : ""}`}
                aria-hidden
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {isTagDropdownOpen && (
              <div className="absolute right-0 z-20 mt-2 w-full overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900 sm:w-96">
                <div className="p-4">
                  <label className="sr-only" htmlFor="tag-search">
                    Search tags
                  </label>
                  <input
                    id="tag-search"
                    type="search"
                    value={tagSearchQuery}
                    onChange={(event) => setTagSearchQuery(event.target.value)}
                    placeholder="Search tags"
                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition-colors placeholder:text-zinc-400 focus:border-accent focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                  />

                  <div className="mt-4 max-h-48 overflow-y-auto pr-1">
                    {visibleTags.length > 0 ? (
                      <ul className="flex flex-wrap gap-2">
                        {visibleTags.map((tag) => {
                          const isSelected = selectedTags.includes(tag);

                          return (
                            <li key={tag}>
                              <button
                                type="button"
                                onClick={() => toggleTag(tag)}
                                className={
                                  isSelected
                                    ? "rounded-full border border-accent bg-accent px-2.5 py-1 text-xs font-mono text-white"
                                    : "rounded-full border border-zinc-300 px-2.5 py-1 text-xs font-mono text-zinc-700 transition-colors hover:border-accent hover:text-accent dark:border-zinc-700 dark:text-zinc-300"
                                }
                              >
                                {tag}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="px-2 py-4 text-sm text-zinc-500">
                        No tags found.
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end border-t border-zinc-200 px-4 py-3 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={resetTags}
                    disabled={!canResetTags}
                    className="text-sm text-zinc-500 transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-zinc-500"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <ul className="mt-10 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
            {filteredPosts.map((p) => (
              <li key={p.slug}>
                <DevlogCard slug={p.slug} metadata={p.metadata} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 border-y border-zinc-200 py-10 dark:border-zinc-800">
            <p className="font-medium">No devlogs found.</p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Try a different title search or reset your tag filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
