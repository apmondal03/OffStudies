"use client";

import Link from "next/link";
import { ArrowUpRight, WifiOff, SearchX } from "lucide-react";
import { useModuleStream } from "@/hooks/useModuleStream";
import { useModuleProgress } from "@/hooks/useModuleProgress";
import { vocabularyModule } from "@/lib/modules/vocabulary";
import { CefrBadge } from "@/components/ui/CefrBadge";
import { AudioButton } from "@/components/ui/AudioButton";
import { CountdownIndicator } from "@/components/stream/CountdownIndicator";
import { StreamControls } from "@/components/stream/StreamControls";
import { WordCardSkeleton } from "@/components/ui/States";

const INTERVAL = 30;

export function WordOfTheMoment() {
  const { savedSlugs, learningSlugs, getStatus, isSaved, toggleKnown, toggleLearning, toggleSaved } =
    useModuleProgress(vocabularyModule.id, vocabularyModule.totalCount());

  const { entry, loading, notFound, offline, empty, paused, secondsLeft, canGoBack, next, previous, retry, togglePause } =
    useModuleStream({
      module: vocabularyModule,
      filter: "essential",
      intervalSeconds: INTERVAL,
      savedSlugs,
      learningSlugs,
    });

  if (loading && !entry) return <WordCardSkeleton />;

  if (offline) {
    return (
      <div className="rounded-2xl border border-dashed border-border-strong bg-surface p-8 text-center">
        <WifiOff className="mx-auto h-7 w-7 text-ink-faint" strokeWidth={1.5} />
        <p className="mt-3 font-display text-lg">Having trouble reaching the dictionary.</p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={retry}
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-contrast hover:bg-accent-strong"
          >
            Try again
          </button>
          <button
            type="button"
            onClick={next}
            className="rounded-full border border-border-strong px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent"
          >
            Skip
          </button>
        </div>
      </div>
    );
  }

  if (notFound || empty || !entry) {
    return (
      <div className="rounded-2xl border border-dashed border-border-strong bg-surface p-8 text-center">
        <SearchX className="mx-auto h-7 w-7 text-ink-faint" strokeWidth={1.5} />
        <p className="mt-3 font-display text-lg">This word isn&apos;t in the dictionary yet.</p>
        <button
          type="button"
          onClick={next}
          className="mt-4 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-contrast hover:bg-accent-strong"
        >
          Try another word
        </button>
      </div>
    );
  }

  const status = getStatus(entry.slug);
  const primaryDefinition = entry.definitions[0];
  const examples = (entry.examples?.length ? entry.examples : primaryDefinition?.examples ?? []).slice(0, 2);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <p className="text-xs uppercase tracking-widest text-ink-faint mb-4">Word of the Moment</p>

      <div key={entry.slug} className="animate-word-enter">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-3xl sm:text-4xl tracking-tight leading-none">{entry.word}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              {entry.phoneticUS && <span className="font-mono text-sm text-ink-muted">{entry.phoneticUS}</span>}
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
          <p className="mt-5 text-base sm:text-lg leading-relaxed">
            {primaryDefinition.simpleDefinition ?? primaryDefinition.meaning}
          </p>
        )}
        {examples.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {examples.map((ex, i) => (
              <li key={i} className="text-sm sm:text-base text-ink-muted italic">
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

        <Link
          href={`/word/${entry.slug}`}
          className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline underline-offset-4"
        >
          See full entry
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-6 border-t border-border pt-6">
        <CountdownIndicator secondsLeft={secondsLeft} totalSeconds={INTERVAL} paused={paused} />
        <div className="mt-4">
          <StreamControls
            paused={paused}
            canGoBack={canGoBack}
            saved={isSaved(entry.slug)}
            known={status === "known"}
            learning={status === "learning"}
            onPrevious={previous}
            onNext={next}
            onTogglePause={togglePause}
            onSave={() => toggleSaved(entry.slug)}
            onKnow={() => toggleKnown(entry.slug)}
            onLearning={() => toggleLearning(entry.slug)}
            compact
          />
        </div>
      </div>
    </div>
  );
}
