"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Clock } from "lucide-react";
import { searchCoreList } from "@/lib/dictionary/coreList";
import { addRecentSearch, getRecentSearches } from "@/lib/storage";
import { CefrBadge } from "@/components/ui/CefrBadge";
import type { CEFRLevel } from "@/types/dictionary";

interface SearchBarProps {
  size?: "hero" | "default";
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchBar({ size = "default", placeholder = "Search the dictionary…", autoFocus }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRecent(getRecentSearches());
  }, []);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return searchCoreList(query, 8);
  }, [query]);

  const showRecent = query.trim().length === 0 && recent.length > 0;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function goToWord(word: string) {
    addRecentSearch(word);
    setOpen(false);
    setQuery("");
    router.push(`/word/${slugify(word)}`);
  }

  function slugify(w: string) {
    return w.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const list = showRecent ? recent : suggestions.map((s) => s.word);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlighted((h) => Math.min(h + 1, list.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const chosen = list[highlighted] ?? query;
      if (chosen.trim()) goToWord(chosen);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  const isHero = size === "hero";

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={`flex items-center gap-3 rounded-2xl border bg-surface transition-shadow ${
          open ? "border-accent shadow-[0_0_0_4px_var(--accent-soft)]" : "border-border-strong"
        } ${isHero ? "px-5 py-4" : "px-4 py-2.5"}`}
      >
        <Search className={isHero ? "h-5 w-5 text-ink-faint" : "h-4 w-4 text-ink-faint"} strokeWidth={1.75} aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls="search-suggestions"
          aria-autocomplete="list"
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlighted(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`flex-1 bg-transparent outline-none placeholder:text-ink-faint ${
            isHero ? "text-lg font-display" : "text-sm"
          }`}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="rounded-full p-1 text-ink-faint hover:text-ink hover:bg-surface-sunken"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && (showRecent || suggestions.length > 0) && (
        <ul
          id="search-suggestions"
          role="listbox"
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-surface shadow-lg animate-fade-in"
        >
          {showRecent && (
            <>
              <li className="px-4 pt-3 pb-1 text-xs uppercase tracking-wide text-ink-faint">Recent searches</li>
              {recent.map((term, i) => (
                <li key={term} role="option" aria-selected={highlighted === i}>
                  <button
                    type="button"
                    onClick={() => goToWord(term)}
                    onMouseEnter={() => setHighlighted(i)}
                    className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm ${
                      highlighted === i ? "bg-accent-soft text-accent-strong" : "hover:bg-surface-sunken"
                    }`}
                  >
                    <Clock className="h-3.5 w-3.5 text-ink-faint" />
                    {term}
                  </button>
                </li>
              ))}
            </>
          )}

          {!showRecent &&
            suggestions.map((s, i) => (
              <li key={s.slug} role="option" aria-selected={highlighted === i}>
                <button
                  type="button"
                  onClick={() => goToWord(s.word)}
                  onMouseEnter={() => setHighlighted(i)}
                  className={`flex w-full items-center justify-between gap-2.5 px-4 py-2.5 text-left text-sm ${
                    highlighted === i ? "bg-accent-soft text-accent-strong" : "hover:bg-surface-sunken"
                  }`}
                >
                  <span>
                    <span className="font-display">{s.word}</span>
                    <span className="ml-2 text-xs text-ink-faint italic">{s.partOfSpeech}</span>
                  </span>
                  {s.cefrLevel && <CefrBadge level={s.cefrLevel as CEFRLevel} />}
                </button>
              </li>
            ))}

          {!showRecent && suggestions.length === 0 && (
            <li className="px-4 py-3 text-sm text-ink-faint">No matches yet — keep typing.</li>
          )}
        </ul>
      )}
    </div>
  );
}
