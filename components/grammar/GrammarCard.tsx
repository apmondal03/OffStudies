import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { GrammarPoint } from "@/types/grammar";
import { GRAMMAR_CATEGORY_LABEL } from "@/types/grammar";
import { CefrBadge } from "@/components/ui/CefrBadge";

export function GrammarCard({
  entry,
  showLink = true,
}: {
  entry: GrammarPoint;
  showLink?: boolean;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-ink-faint mb-2">
            {GRAMMAR_CATEGORY_LABEL[entry.category]}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl tracking-tight leading-tight">{entry.title}</h1>
        </div>
        <CefrBadge level={entry.cefrLevel} full />
      </div>

      <p className="mt-6 text-lg leading-relaxed">{entry.explanation}</p>

      {entry.structure && (
        <div className="mt-4 rounded-xl bg-surface-sunken px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-ink-faint mb-1">Structure</p>
          <p className="font-mono text-sm">{entry.structure}</p>
        </div>
      )}

      <div className="mt-5">
        <p className="text-xs uppercase tracking-wide text-ink-faint mb-2">Examples</p>
        <ul className="space-y-1.5">
          {entry.examples.map((ex, i) => (
            <li key={i} className="text-base text-ink-muted italic">
              &ldquo;{ex}&rdquo;
            </li>
          ))}
        </ul>
      </div>

      {entry.signalWords && entry.signalWords.length > 0 && (
        <p className="mt-4 text-sm text-ink-muted">
          <span className="text-ink-faint">Signal words: </span>
          {entry.signalWords.join(" · ")}
        </p>
      )}

      {entry.commonMistakes && entry.commonMistakes.length > 0 && (
        <div className="mt-5">
          <p className="text-xs uppercase tracking-wide text-ink-faint mb-2">Common mistakes</p>
          <ul className="space-y-2">
            {entry.commonMistakes.map((mistake, i) => (
              <li
                key={i}
                className="text-sm rounded-lg border border-b2/30 bg-[color-mix(in_srgb,var(--b2)_8%,transparent)] px-3.5 py-2.5"
              >
                {mistake}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showLink && (
        <Link
          href={`/grammar/${entry.slug}`}
          className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline underline-offset-4"
        >
          See full entry
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
