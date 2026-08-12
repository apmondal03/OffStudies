import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { WordEntry } from "@/types/dictionary";
import { CefrBadge } from "@/components/ui/CefrBadge";
import { AudioButton } from "@/components/ui/AudioButton";

export function WordCard({
  entry,
  compact = false,
  showLink = true,
}: {
  entry: WordEntry;
  compact?: boolean;
  showLink?: boolean;
}) {
  const primaryDefinition = entry.definitions[0];
  const examples = (entry.examples?.length ? entry.examples : primaryDefinition?.examples ?? []).slice(0, 2);
  const synonyms = entry.synonyms?.slice(0, 6);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-3xl sm:text-4xl tracking-tight leading-none">
            {entry.word}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            {entry.phoneticUS && (
              <span className="font-mono text-sm text-ink-muted">{entry.phoneticUS}</span>
            )}
            <AudioButton word={entry.word} audioUrl={entry.audioUS} variant="US" />
            <AudioButton word={entry.word} audioUrl={entry.audioUK} variant="UK" />
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <CefrBadge level={entry.cefrLevel} />
          <span className="text-xs italic text-ink-faint">{entry.partOfSpeech}</span>
        </div>
      </div>

      {primaryDefinition && (
        <p className="mt-5 text-base sm:text-lg leading-relaxed text-ink">
          {primaryDefinition.simpleDefinition ?? primaryDefinition.meaning}
        </p>
      )}

      {examples.length > 0 && !compact && (
        <ul className="mt-3 space-y-1.5">
          {examples.map((ex, i) => (
            <li key={i} className="text-sm sm:text-base text-ink-muted italic">
              &ldquo;{ex}&rdquo;
            </li>
          ))}
        </ul>
      )}

      {synonyms && synonyms.length > 0 && (
        <p className="mt-4 text-sm text-ink-muted">
          <span className="text-ink-faint">Synonyms: </span>
          {synonyms.join(" · ")}
        </p>
      )}

      {showLink && (
        <Link
          href={`/word/${entry.slug}`}
          className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline underline-offset-4"
        >
          See full entry
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
