"use client";

import { WifiOff, SearchX } from "lucide-react";
import type { ContentModule } from "@/types/contentModule";
import { WordCardSkeleton, EmptyList } from "@/components/ui/States";
import { CountdownIndicator } from "@/components/stream/CountdownIndicator";
import { StreamControls } from "@/components/stream/StreamControls";
import { ModuleFilterTabs } from "@/components/stream/ModuleFilterTabs";
import { useModuleStream } from "@/hooks/useModuleStream";
import { useModuleProgress } from "@/hooks/useModuleProgress";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { setModuleFilterPref } from "@/lib/storage";

export function ModuleStreamView<TEntry, TCandidate, TFilter extends string>({
  module,
  filter,
  setFilter,
  intervalSeconds,
  prefsLoaded,
}: {
  module: ContentModule<TEntry, TCandidate, TFilter>;
  filter: TFilter;
  setFilter: (f: TFilter) => void;
  intervalSeconds: number;
  prefsLoaded: boolean;
}) {
  const { savedSlugs, learningSlugs, getStatus, isSaved, toggleKnown, toggleLearning, toggleSaved } =
    useModuleProgress(module.id, module.totalCount());

  const { entry, loading, notFound, offline, empty, paused, secondsLeft, canGoBack, next, previous, retry, togglePause } =
    useModuleStream({
      module,
      filter,
      intervalSeconds,
      savedSlugs,
      learningSlugs,
      autoStart: prefsLoaded,
    });

  useKeyboardShortcuts(
    {
      Space: () => togglePause(),
      ArrowRight: () => next(),
      ArrowLeft: () => previous(),
      s: () => entry && toggleSaved(module.getSlug(entry)),
      k: () => entry && toggleKnown(module.getSlug(entry)),
      l: () => entry && toggleLearning(module.getSlug(entry)),
    },
    prefsLoaded
  );

  function handleFilterChange(f: TFilter) {
    setFilter(f);
    setModuleFilterPref(module.id, f);
  }

  const status = entry ? getStatus(module.getSlug(entry)) : "unseen";
  const StreamCard = module.StreamCard;
  const label = module.label.toLowerCase();

  return (
    <>
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 flex flex-col gap-5">
        <ModuleFilterTabs filters={module.filters} value={filter} onChange={handleFilterChange} />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
        <div className="w-full max-w-2xl">
          {loading && !entry && <WordCardSkeleton />}

          {!loading && offline && (
            <div className="rounded-2xl border border-dashed border-border-strong bg-surface p-10 text-center">
              <WifiOff className="mx-auto h-8 w-8 text-ink-faint" strokeWidth={1.5} />
              <p className="mt-4 text-lg font-display">Having trouble reaching the dictionary.</p>
              <p className="mt-1 text-sm text-ink-faint">This entry will keep waiting here — check your connection.</p>
              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={retry}
                  className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast hover:bg-accent-strong"
                >
                  Try again
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="rounded-full border border-border-strong px-5 py-2.5 text-sm font-medium hover:border-accent hover:text-accent"
                >
                  Skip this one
                </button>
              </div>
            </div>
          )}

          {!loading && !offline && empty && filter === "saved" && (
            <EmptyList title={`No saved ${label} yet.`} hint={`Save entries from the Stream to see them here.`} />
          )}
          {!loading && !offline && empty && filter === "learning" && (
            <EmptyList
              title="Nothing marked as learning yet."
              hint={`Mark an entry as “Learning” to add it to this filter.`}
            />
          )}
          {!loading && !offline && (notFound || (empty && filter !== "saved" && filter !== "learning")) && (
            <div className="rounded-2xl border border-dashed border-border-strong bg-surface p-10 text-center">
              <SearchX className="mx-auto h-8 w-8 text-ink-faint" strokeWidth={1.5} />
              <p className="mt-4 text-lg font-display">Nothing to show here yet.</p>
              <button
                type="button"
                onClick={next}
                className="mt-5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast hover:bg-accent-strong"
              >
                Skip ahead
              </button>
            </div>
          )}

          {entry && (
            <div key={module.getSlug(entry)} className="animate-word-enter text-center sm:text-left">
              <StreamCard entry={entry} />

              <div className="mt-8 max-w-sm mx-auto sm:mx-0">
                <CountdownIndicator secondsLeft={secondsLeft} totalSeconds={intervalSeconds} paused={paused} />
              </div>

              <div className="mt-6 flex justify-center sm:justify-start">
                <StreamControls
                  paused={paused}
                  canGoBack={canGoBack}
                  saved={isSaved(module.getSlug(entry))}
                  known={status === "known"}
                  learning={status === "learning"}
                  onPrevious={previous}
                  onNext={next}
                  onTogglePause={togglePause}
                  onSave={() => toggleSaved(module.getSlug(entry))}
                  onKnow={() => toggleKnown(module.getSlug(entry))}
                  onLearning={() => toggleLearning(module.getSlug(entry))}
                />
              </div>

              <p className="mt-6 text-center sm:text-left text-xs text-ink-faint font-mono">
                space pause · ← → navigate · s save · k know · l learning
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
