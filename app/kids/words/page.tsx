import Link from "next/link";
import { KIDS_CATEGORY_LABEL, KIDS_CATEGORY_EMOJI } from "@/types/kids";
import type { KidsCategory } from "@/types/kids";
import { KIDS_WORDS } from "@/lib/kids/words";

const CATEGORIES = Object.keys(KIDS_CATEGORY_LABEL) as KidsCategory[];

export default function KidsWordsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-16 text-center">
      <h1 className="kids-display text-4xl sm:text-5xl font-bold text-[var(--kids-ink)] mb-3">
        First Words
      </h1>
      <p className="text-lg text-[var(--kids-ink-muted)] mb-10">Pick a topic to explore!</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
        <Link
          href="/kids/words/all"
          className="animate-kids-pop flex flex-col items-center gap-2 rounded-[2rem] bg-white p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
        >
          <span className="text-6xl">🌟</span>
          <span className="kids-display text-lg font-bold text-[var(--kids-ink)]">All Words</span>
          <span className="text-xs text-[var(--kids-ink-muted)]">{KIDS_WORDS.length} words</span>
        </Link>
        {CATEGORIES.map((cat) => {
          const count = KIDS_WORDS.filter((w) => w.category === cat).length;
          return (
            <Link
              key={cat}
              href={`/kids/words/${cat}`}
              className="animate-kids-pop flex flex-col items-center gap-2 rounded-[2rem] bg-white p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <span className="text-6xl">{KIDS_CATEGORY_EMOJI[cat]}</span>
              <span className="kids-display text-lg font-bold text-[var(--kids-ink)]">
                {KIDS_CATEGORY_LABEL[cat]}
              </span>
              <span className="text-xs text-[var(--kids-ink-muted)]">{count} words</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
