import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PrepositionEntry } from "@/types/preposition";
import { PREPOSITION_TYPE_LABEL, PREPOSITION_USAGE_LABEL } from "@/types/preposition";

export function PrepositionCard({
  entry,
  showLink = true,
}: {
  entry: PrepositionEntry;
  showLink?: boolean;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl tracking-tight leading-tight">{entry.phrase}</h1>
          <p className="mt-2 text-xs uppercase tracking-wide text-ink-faint">
            {PREPOSITION_TYPE_LABEL[entry.type]}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {entry.senses.map((sense, i) => (
          <div key={sense.id}>
            {entry.senses.length > 1 && (
              <p className="text-xs uppercase tracking-wide text-accent mb-1">
                {PREPOSITION_USAGE_LABEL[sense.usage]}
              </p>
            )}
            <p className="text-lg leading-relaxed">{sense.explanation}</p>
            <ul className="mt-2 space-y-1.5">
              {sense.examples.map((ex, exIdx) => (
                <li key={exIdx} className="text-base text-ink-muted italic">
                  &ldquo;{ex}&rdquo;
                </li>
              ))}
            </ul>
            {i < entry.senses.length - 1 && <div className="mt-6 border-t border-border" />}
          </div>
        ))}
      </div>

      {entry.commonMistakes && entry.commonMistakes.length > 0 && (
        <div className="mt-6">
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
          href={`/prepositions/${entry.slug}`}
          className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline underline-offset-4"
        >
          See full entry
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
