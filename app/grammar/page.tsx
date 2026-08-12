"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { GRAMMAR_POINTS } from "@/lib/grammar/data";
import { GRAMMAR_CATEGORY_LABEL } from "@/types/grammar";
import type { GrammarCategory } from "@/types/grammar";
import type { CEFRLevel } from "@/types/dictionary";
import { CefrBadge } from "@/components/ui/CefrBadge";
import { EmptyList } from "@/components/ui/States";

const LEVELS: (CEFRLevel | "ALL")[] = ["ALL", "A1", "A2", "B1", "B2", "C1", "C2"];

export default function GrammarPage() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<CEFRLevel | "ALL">("ALL");
  const [category, setCategory] = useState<GrammarCategory | "ALL">("ALL");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GRAMMAR_POINTS.filter((g) => {
      if (level !== "ALL" && g.cefrLevel !== level) return false;
      if (category !== "ALL" && g.category !== category) return false;
      if (q && !g.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, level, category]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
      <p className="text-xs uppercase tracking-widest text-accent font-medium mb-2">Grammar</p>
      <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-3">
        Build a solid foundation
      </h1>
      <p className="text-ink-muted max-w-xl mb-8">
        {filtered.length} of {GRAMMAR_POINTS.length} grammar points shown, from first steps to
        near-native mastery.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by name…"
          aria-label="Filter grammar points"
          className="flex-1 rounded-xl border border-border-strong bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as GrammarCategory | "ALL")}
          aria-label="Filter by category"
          className="rounded-xl border border-border-strong bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        >
          <option value="ALL">All categories</option>
          {(Object.keys(GRAMMAR_CATEGORY_LABEL) as GrammarCategory[]).map((c) => (
            <option key={c} value={c}>
              {GRAMMAR_CATEGORY_LABEL[c]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="CEFR level">
        {LEVELS.map((lvl) => (
          <button
            key={lvl}
            role="tab"
            aria-selected={level === lvl}
            onClick={() => setLevel(lvl)}
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

      {filtered.length === 0 ? (
        <EmptyList title="No grammar points match those filters." hint="Try a different level or category." />
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filtered.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/grammar/${g.slug}`}
                className="group flex flex-col gap-1.5 rounded-xl border border-border bg-surface px-4 py-3.5 hover:border-accent transition-colors h-full"
              >
                <span className="font-display text-lg leading-tight group-hover:text-accent transition-colors">
                  {g.title}
                </span>
                <span className="text-xs italic text-ink-faint">{GRAMMAR_CATEGORY_LABEL[g.category]}</span>
                <CefrBadge level={g.cefrLevel} className="mt-auto self-start" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
