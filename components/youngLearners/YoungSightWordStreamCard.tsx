import { SIGHT_WORD_TIER_LABEL } from "@/types/youngLearner";
import type { YoungSightWordEntry } from "@/types/youngLearner";

export function YoungSightWordStreamCard({ entry }: { entry: YoungSightWordEntry }) {
  return (
    <div className="rounded-3xl border border-[var(--young-border)] bg-[var(--young-surface)] p-8 sm:p-12 text-center">
      <p className="text-xs uppercase tracking-widest text-[var(--young-ink-muted)] font-medium mb-3">
        {SIGHT_WORD_TIER_LABEL[entry.tier]} Sight Word
      </p>
      <h1 className="young-display text-6xl sm:text-7xl font-bold text-[var(--young-accent)] mb-6">
        {entry.word}
      </h1>
      <p className="text-xl text-[var(--young-ink)]">{entry.simpleSentence}</p>
    </div>
  );
}
