import { useEffect, useId, useRef, useState } from "react";

type FilterBarProps = {
  searchLabel: string;
  searchPlaceholder: string;
  query: string;
  onQueryChange: (query: string) => void;
  optionsLabel: string;
  optionsNoun: { singular: string; plural: string };
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
  onClear: () => void;
};

export default function FilterBar({
  searchLabel,
  searchPlaceholder,
  query,
  onQueryChange,
  optionsLabel,
  optionsNoun,
  options,
  selected,
  onToggle,
  onClear,
}: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [optionQuery, setOptionQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const normalizedOptionQuery = optionQuery.trim().toLowerCase();
  const visibleOptions = options.filter((option) =>
    option.toLowerCase().includes(normalizedOptionQuery),
  );

  const buttonText =
    selected.length === 0
      ? optionsLabel
      : `${selected.length} ${selected.length === 1 ? optionsNoun.singular : optionsNoun.plural} selected`;

  return (
    <div className="filters">
      <div className="filters__controls">
        <label className="filters__search">
          <span className="visually-hidden">{searchLabel}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={searchPlaceholder}
          />
        </label>

        <div ref={containerRef} className="dropdown">
          <button
            type="button"
            className="dropdown__button"
            aria-expanded={isOpen}
            aria-controls={panelId}
            data-active={selected.length > 0 || undefined}
            onClick={() => setIsOpen((open) => !open)}
          >
            {buttonText}
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12">
              <path
                d="m3 4.5 3 3 3-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isOpen && (
            <div id={panelId} className="dropdown__panel">
              <label className="dropdown__search">
                <span className="visually-hidden">Search {optionsNoun.plural}</span>
                <input
                  type="search"
                  value={optionQuery}
                  onChange={(event) => setOptionQuery(event.target.value)}
                  placeholder={`Search ${optionsNoun.plural}`}
                  autoFocus
                />
              </label>

              {visibleOptions.length > 0 ? (
                <ul className="dropdown__options">
                  {visibleOptions.map((option) => (
                    <li key={option}>
                      <label className="dropdown__option">
                        <input
                          type="checkbox"
                          checked={selected.includes(option)}
                          onChange={() => onToggle(option)}
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="dropdown__empty">No {optionsNoun.plural} match.</p>
              )}

              <div className="dropdown__footer">
                <button
                  type="button"
                  onClick={() => {
                    onClear();
                    setOptionQuery("");
                  }}
                  disabled={selected.length === 0}
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {selected.length > 0 && (
        <p className="filters__summary">
          Filtered by {selected.join(", ")}.{" "}
          <button type="button" onClick={onClear}>
            Clear filters
          </button>
        </p>
      )}
    </div>
  );
}
