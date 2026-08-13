import Link from "next/link";
import { BookOpenCheck } from "lucide-react";

export function YoungHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[var(--young-bg)]/95 backdrop-blur border-b border-[var(--young-border)]">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
        <Link href="/young-learners" className="flex items-center gap-2" aria-label="Young Learners home">
          <BookOpenCheck className="h-5 w-5 text-[var(--young-accent)]" strokeWidth={1.75} />
          <span className="young-display text-lg font-bold text-[var(--young-ink)]">Lexicon Learners</span>
        </Link>

        <Link
          href="/"
          className="rounded-full border border-[var(--young-border)] bg-[var(--young-surface)] px-4 py-2 text-sm font-medium text-[var(--young-ink-muted)] hover:text-[var(--young-ink)] transition-colors"
        >
          Main App
        </Link>
      </div>
    </header>
  );
}
