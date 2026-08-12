"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PHRASAL_VERBS } from "@/lib/phrasalVerbs/data";
import { EmptyList } from "@/components/ui/States";
import type { Formality } from "@/types/phrasalVerb";

const FORMALITY_OPTIONS: (Formality | "ALL")[] = ["ALL", "informal", "neutral", "formal"];

export default function PhrasalVerbsPage() {
  const [query, setQuery] = useState("");
  const [formality, setFormality] = useState<Formality | "ALL">("ALL");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PHRASAL_VERBS.filter((p) => {
      if (formality !== "ALL" && p.formality !== formality) return false;
      if (q && !p.phrase.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, formality]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
      <p className="text-xs uppercase tracking-widest text-accent font-medium mb-2">Phrasal Verbs</p>
      <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-3">
        Learn to speak more naturally
      </h1>
      <p className="text-ink-muted max-w-xl mb-8">
        {filtered.length} of {PHRASAL_VERBS.length} phrasal verbs shown. Originally written for this
        app — not sourced from any published dictionary.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by phrase…"
          aria-label="Filter phrasal verbs"
          className="flex-1 rounded-xl border border-border-strong bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Formality">
        {FORMALITY_OPTIONS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={formality === f}
            onClick={() => setFormality(f)}
            className={`rounded-full border px-4 py-1.5 text-sm capitalize transition-colors ${
              formality === f
                ? "border-accent bg-accent-soft text-accent-strong font-medium"
                : "border-border text-ink-muted hover:text-ink"
            }`}
          >
            {f === "ALL" ? "All" : f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyList title="No phrasal verbs match those filters." hint="Try a different search term or formality." />
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filtered.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/phrasal-verbs/${p.slug}`}
                className="group flex flex-col gap-1.5 rounded-xl border border-border bg-surface px-4 py-3.5 hover:border-accent transition-colors h-full"
              >
                <span className="font-display text-lg leading-tight group-hover:text-accent transition-colors">
                  {p.phrase}
                </span>
                <span className="text-xs italic text-ink-faint capitalize">{p.formality}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
