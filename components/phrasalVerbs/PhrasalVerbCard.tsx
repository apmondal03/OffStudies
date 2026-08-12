import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PhrasalVerbEntry, Formality } from "@/types/phrasalVerb";

const FORMALITY_LABEL: Record<Formality, string> = {
  informal: "Informal",
  neutral: "Neutral",
  formal: "Formal",
};

export function PhrasalVerbCard({
  entry,
  showLink = true,
}: {
  entry: PhrasalVerbEntry;
  showLink?: boolean;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-5xl sm:text-6xl tracking-tight leading-none">{entry.phrase}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-mono text-ink-muted">
              {FORMALITY_LABEL[entry.formality]}
            </span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-mono text-ink-muted">
              {entry.separable ? "Separable" : "Inseparable"}
            </span>
            {!entry.transitive && (
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-mono text-ink-muted">
                Intransitive
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {entry.senses.map((sense, i) => (
          <div key={sense.id}>
            {entry.senses.length > 1 && (
              <p className="text-xs uppercase tracking-wide text-ink-faint mb-1">Sense {i + 1}</p>
            )}
            <p className="text-lg sm:text-xl leading-relaxed">{sense.simpleDefinition}</p>
            <ul className="mt-2 space-y-1.5">
              {sense.examples.map((ex, exIdx) => (
                <li key={exIdx} className="text-base text-ink-muted italic">
                  &ldquo;{ex}&rdquo;
                </li>
              ))}
            </ul>
            {sense.synonyms && sense.synonyms.length > 0 && (
              <p className="mt-2 text-sm text-ink-muted">
                <span className="text-ink-faint">Similar to: </span>
                {sense.synonyms.join(" · ")}
              </p>
            )}
          </div>
        ))}
      </div>

      {showLink && (
        <Link
          href={`/phrasal-verbs/${entry.slug}`}
          className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline underline-offset-4"
        >
          See full entry
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
