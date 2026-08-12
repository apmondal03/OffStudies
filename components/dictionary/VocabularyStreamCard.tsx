import { CefrBadge } from "@/components/ui/CefrBadge";
import { AudioButton } from "@/components/ui/AudioButton";
import type { WordEntry } from "@/types/dictionary";

export function VocabularyStreamCard({ entry }: { entry: WordEntry }) {
  const primaryDefinition = entry.definitions[0];
  const examples = (entry.examples?.length ? entry.examples : primaryDefinition?.examples ?? []).slice(0, 2);

  return (
    <div className="rounded-3xl border border-border bg-surface p-8 sm:p-12">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-5xl sm:text-6xl tracking-tight leading-none">{entry.word}</h1>
          <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-3">
            {entry.phoneticUS && <span className="font-mono text-base text-ink-muted">{entry.phoneticUS}</span>}
            <AudioButton word={entry.word} audioUrl={entry.audioUS} variant="US" />
            <AudioButton word={entry.word} audioUrl={entry.audioUK} variant="UK" />
          </div>
        </div>
        <div className="flex sm:flex-col items-center sm:items-end justify-center gap-2">
          <CefrBadge level={entry.cefrLevel} />
          <span className="text-sm italic text-ink-faint">{entry.partOfSpeech}</span>
        </div>
      </div>

      {primaryDefinition && (
        <p className="mt-6 text-lg sm:text-xl leading-relaxed">
          {primaryDefinition.simpleDefinition ?? primaryDefinition.meaning}
        </p>
      )}
      {examples.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {examples.map((ex, i) => (
            <li key={i} className="text-base text-ink-muted italic">
              &ldquo;{ex}&rdquo;
            </li>
          ))}
        </ul>
      )}
      {entry.synonyms && entry.synonyms.length > 0 && (
        <p className="mt-4 text-sm text-ink-muted">
          <span className="text-ink-faint">Synonyms: </span>
          {entry.synonyms.slice(0, 6).join(" · ")}
        </p>
      )}
    </div>
  );
}
