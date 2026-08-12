"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { IDIOMS } from "@/lib/idioms/data";
import { IDIOM_CATEGORY_LABEL } from "@/types/idiom";
import type { IdiomCategory, IdiomRegister } from "@/types/idiom";
import { EmptyList } from "@/components/ui/States";

const REGISTERS: (IdiomRegister | "ALL")[] = ["ALL", "neutral", "informal", "formal"];

export default function IdiomsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<IdiomCategory | "ALL">("ALL");
  const [register, setRegister] = useState<IdiomRegister | "ALL">("ALL");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return IDIOMS.filter((i) => {
      if (category !== "ALL" && i.category !== category) return false;
      if (register !== "ALL" && i.register !== register) return false;
      if (q && !i.idiom.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, category, register]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
      <p className="text-xs uppercase tracking-widest text-accent font-medium mb-2">Idioms</p>
      <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-3">
        Speak like a native
      </h1>
      <p className="text-ink-muted max-w-xl mb-8">
        {filtered.length} of {IDIOMS.length} idioms shown. Originally written for this app.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by phrase…"
          aria-label="Filter idioms"
          className="flex-1 rounded-xl border border-border-strong bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as IdiomCategory | "ALL")}
          aria-label="Filter by category"
          className="rounded-xl border border-border-strong bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        >
          <option value="ALL">All categories</option>
          {(Object.keys(IDIOM_CATEGORY_LABEL) as IdiomCategory[]).map((c) => (
            <option key={c} value={c}>
              {IDIOM_CATEGORY_LABEL[c]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Register">
        {REGISTERS.map((r) => (
          <button
            key={r}
            role="tab"
            aria-selected={register === r}
            onClick={() => setRegister(r)}
            className={`rounded-full border px-4 py-1.5 text-sm capitalize transition-colors ${
              register === r
                ? "border-accent bg-accent-soft text-accent-strong font-medium"
                : "border-border text-ink-muted hover:text-ink"
            }`}
          >
            {r === "ALL" ? "All" : r}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyList title="No idioms match those filters." hint="Try a different search term, category, or register." />
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filtered.map((i) => (
            <li key={i.slug}>
              <Link
                href={`/idioms/${i.slug}`}
                className="group flex flex-col gap-1.5 rounded-xl border border-border bg-surface px-4 py-3.5 hover:border-accent transition-colors h-full"
              >
                <span className="font-display text-lg leading-tight capitalize group-hover:text-accent transition-colors">
                  {i.idiom}
                </span>
                <span className="text-xs italic text-ink-faint">{IDIOM_CATEGORY_LABEL[i.category]}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
