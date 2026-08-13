import { YOUNG_GRAMMAR_CATEGORY_LABEL } from "@/types/youngLearner";
import type { YoungGrammarPoint } from "@/types/youngLearner";

export function YoungGrammarStreamCard({ entry }: { entry: YoungGrammarPoint }) {
  return (
    <div className="rounded-3xl border border-[var(--young-border)] bg-[var(--young-surface)] p-8 sm:p-12 text-left">
      <p className="text-xs uppercase tracking-widest text-[var(--young-ink-muted)] font-medium mb-2">
        {YOUNG_GRAMMAR_CATEGORY_LABEL[entry.category]}
      </p>
      <h1 className="young-display text-4xl sm:text-5xl font-bold text-[var(--young-accent-2)] mb-5">
        {entry.title}
      </h1>
      <p className="text-lg leading-relaxed text-[var(--young-ink)] mb-5">{entry.explanation}</p>

      <div className="rounded-2xl bg-[var(--young-accent-soft)] p-4">
        <p className="text-xs uppercase tracking-wide text-[var(--young-ink-muted)] mb-2">Examples</p>
        <ul className="space-y-1.5">
          {entry.examples.map((ex, i) => (
            <li key={i} className="text-base text-[var(--young-ink)]">
              {ex}
            </li>
          ))}
        </ul>
      </div>

      {entry.funFact && (
        <p className="mt-4 text-sm text-[var(--young-accent-3)]">
          <span className="font-semibold">Fun fact: </span>
          {entry.funFact}
        </p>
      )}
    </div>
  );
}
