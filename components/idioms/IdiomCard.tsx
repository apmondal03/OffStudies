import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { IdiomEntry, IdiomRegister } from "@/types/idiom";
import { IDIOM_CATEGORY_LABEL } from "@/types/idiom";

const REGISTER_LABEL: Record<IdiomRegister, string> = {
  informal: "Informal",
  neutral: "Neutral",
  formal: "Formal",
};

export function IdiomCard({
  entry,
  showLink = true,
}: {
  entry: IdiomEntry;
  showLink?: boolean;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl tracking-tight leading-tight capitalize">
            {entry.idiom}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-mono text-ink-muted">
              {IDIOM_CATEGORY_LABEL[entry.category]}
            </span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-mono text-ink-muted">
              {REGISTER_LABEL[entry.register]}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-6 text-lg leading-relaxed">{entry.simpleDefinition}</p>
      {entry.meaning !== entry.simpleDefinition && (
        <p className="mt-2 text-sm text-ink-muted">{entry.meaning}</p>
      )}

      {entry.literalNote && (
        <p className="mt-3 text-sm text-ink-faint italic">{entry.literalNote}</p>
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

      {entry.synonyms && entry.synonyms.length > 0 && (
        <p className="mt-4 text-sm text-ink-muted">
          <span className="text-ink-faint">Similar to: </span>
          {entry.synonyms.join(" · ")}
        </p>
      )}

      {showLink && (
        <Link
          href={`/idioms/${entry.slug}`}
          className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline underline-offset-4"
        >
          See full entry
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
