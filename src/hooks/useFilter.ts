import { useState } from "react";

// Title search plus "matches any selected tag" filtering, shared by the archives.
export function useFilter<T>(
  items: T[],
  getTitle: (item: T) => string,
  getTags: (item: T) => string[],
) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const options = Array.from(new Set(items.flatMap(getTags))).sort((a, b) =>
    a.localeCompare(b),
  );

  const normalizedQuery = query.trim().toLowerCase();
  const results = items.filter(
    (item) =>
      getTitle(item).toLowerCase().includes(normalizedQuery) &&
      (selected.length === 0 || getTags(item).some((tag) => selected.includes(tag))),
  );

  const toggle = (option: string) =>
    setSelected((current) =>
      current.includes(option)
        ? current.filter((value) => value !== option)
        : [...current, option],
    );

  const clear = () => setSelected([]);

  return { query, setQuery, options, selected, toggle, clear, results };
}
