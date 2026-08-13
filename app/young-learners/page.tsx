import Link from "next/link";
import { totalYoungSightWordCount, totalYoungGrammarCount } from "@/lib/youngLearners/selection";

export default function YoungLearnersHomePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 sm:py-20 text-center">
      <p className="text-xs uppercase tracking-widest text-[var(--young-accent)] font-semibold mb-3">
        For readers ages 7–12
      </p>
      <h1 className="young-display text-4xl sm:text-5xl font-bold text-[var(--young-ink)] mb-4">
        Build strong reading skills
      </h1>
      <p className="text-lg text-[var(--young-ink-muted)] max-w-xl mx-auto mb-10">
        Practice sight words and learn the building blocks of grammar — at your own pace,
        no timer, no pressure.
      </p>

      <div className="grid sm:grid-cols-2 gap-5 mb-10">
        <div className="rounded-2xl border border-[var(--young-border)] bg-[var(--young-surface)] p-6 text-left">
          <p className="young-display text-3xl font-bold text-[var(--young-accent)] mb-1">
            {totalYoungSightWordCount()}
          </p>
          <p className="text-sm text-[var(--young-ink-muted)]">
            Sight words across Primer, 1st, and 2nd grade levels
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--young-border)] bg-[var(--young-surface)] p-6 text-left">
          <p className="young-display text-3xl font-bold text-[var(--young-accent-2)] mb-1">
            {totalYoungGrammarCount()}
          </p>
          <p className="text-sm text-[var(--young-ink-muted)]">
            Grammar concepts — nouns, sentences, punctuation, and word play
          </p>
        </div>
      </div>

      <Link
        href="/young-learners/practice"
        className="inline-block rounded-full bg-[var(--young-accent)] px-8 py-3.5 text-base font-semibold text-[var(--young-accent-contrast)] hover:opacity-90 transition-opacity"
      >
        Start Practicing
      </Link>

      <p className="mt-8 text-sm text-[var(--young-ink-muted)]">
        Just starting out?{" "}
        <Link href="/kids" className="text-[var(--young-accent)] font-medium hover:underline">
          Try Kids Mode
        </Link>{" "}
        instead — for younger, pre-reading learners.
      </p>
    </div>
  );
}
