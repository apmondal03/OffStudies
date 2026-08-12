"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CORE_3000 } from "@/lib/dictionary/coreList";
import { CefrBadge } from "@/components/ui/CefrBadge";
import { EmptyList } from "@/components/ui/States";
import type { CEFRLevel } from "@/types/dictionary";

const LEVELS: (CEFRLevel | "ALL")[] = ["ALL", "A1", "A2", "B1", "B2"];
const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
const PAGE_SIZE = 60;

const POS_OPTIONS = [
  "ALL",
  "noun",
  "verb",
  "adjective",
  "adverb",
  "preposition",
  "conjunction",
  "pronoun",
  "determiner",
  "exclamation",
  "number",
  "modal verb",
  "auxiliary verb",
];

function ExplorePageInner() {
  const searchParams = useSearchParams();
  const initialLevel = (searchParams.get("level") as CEFRLevel | null) ?? "ALL";

  const [level, setLevel] = useState<CEFRLevel | "ALL">(initialLevel);
  const [pos, setPos] = useState<string>("ALL");
  const [letter, setLetter] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CORE_3000.filter((w) => {
      if (level !== "ALL" && w.cefrLevel !== level) return false;
      if (pos !== "ALL" && w.partOfSpeech !== pos) return false;
      if (letter && !w.word.toLowerCase().startsWith(letter)) return false;
      if (q && !w.word.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [level, pos, letter, query]);

  const visible = filtered.slice(0, visibleCount);
  const availableLetters = useMemo(() => {
    const set = new Set(CORE_3000.map((w) => w.word[0]?.toLowerCase()));
    return set;
  }, []);

  function resetPage() {
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
      <p className="text-xs uppercase tracking-widest text-accent font-medium mb-2">Core 3000</p>
      <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-3">Explore the vocabulary</h1>
      <p className="text-ink-muted max-w-xl mb-8">
        {filtered.length.toLocaleString()} of {CORE_3000.length.toLocaleString()} words shown.
      </p>

      {/* Search + POS filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            resetPage();
          }}
          placeholder="Filter by word…"
          aria-label="Filter words"
          className="flex-1 rounded-xl border border-border-strong bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
        <select
          value={pos}
          onChange={(e) => {
            setPos(e.target.value);
            resetPage();
          }}
          aria-label="Filter by part of speech"
          className="rounded-xl border border-border-strong bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        >
          {POS_OPTIONS.map((p) => (
            <option key={p} value={p}>
              {p === "ALL" ? "All parts of speech" : p}
            </option>
          ))}
        </select>
      </div>

      {/* CEFR tabs */}
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="CEFR level">
        {LEVELS.map((lvl) => (
          <button
            key={lvl}
            role="tab"
            aria-selected={level === lvl}
            onClick={() => {
              setLevel(lvl);
              resetPage();
            }}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              level === lvl
                ? "border-accent bg-accent-soft text-accent-strong font-medium"
                : "border-border text-ink-muted hover:text-ink"
            }`}
          >
            {lvl === "ALL" ? "All levels" : lvl}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8">
        {/* Word grid */}
        <div>
          {visible.length === 0 ? (
            <EmptyList title="No words match those filters." hint="Try a different letter, level, or search term." />
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {visible.map((w) => (
                <li key={w.slug}>
                  <Link
                    href={`/word/${w.slug}`}
                    className="group flex flex-col gap-1.5 rounded-xl border border-border bg-surface px-4 py-3.5 hover:border-accent transition-colors h-full"
                  >
                    <span className="font-display text-lg leading-tight group-hover:text-accent transition-colors">
                      {w.word}
                    </span>
                    <span className="text-xs italic text-ink-faint">{w.partOfSpeech}</span>
                    <CefrBadge level={w.cefrLevel} className="mt-auto self-start" />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {visibleCount < filtered.length && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="rounded-full border border-border-strong px-6 py-2.5 text-sm font-medium hover:border-accent hover:text-accent transition-colors"
              >
                Show more ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>

        {/* A–Z thumb-index rail */}
        <div className="hidden lg:flex flex-col items-center gap-0.5 sticky top-24 h-fit">
          <button
            type="button"
            onClick={() => {
              setLetter(null);
              resetPage();
            }}
            aria-pressed={letter === null}
            className={`h-6 w-6 rounded text-[10px] font-mono flex items-center justify-center ${
              letter === null ? "bg-accent text-accent-contrast" : "text-ink-faint hover:text-ink"
            }`}
          >
            *
          </button>
          {ALPHABET.map((l) => {
            const disabled = !availableLetters.has(l);
            return (
              <button
                key={l}
                type="button"
                disabled={disabled}
                onClick={() => {
                  setLetter(l);
                  resetPage();
                }}
                aria-pressed={letter === l}
                className={`h-6 w-6 rounded text-[10px] font-mono uppercase flex items-center justify-center transition-colors ${
                  disabled
                    ? "text-ink-faint/30 cursor-default"
                    : letter === l
                      ? "bg-accent text-accent-contrast"
                      : "text-ink-faint hover:text-ink hover:bg-surface-sunken"
                }`}
              >
                {l}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">Loading…</div>}>
      <ExplorePageInner />
    </Suspense>
  );
}
