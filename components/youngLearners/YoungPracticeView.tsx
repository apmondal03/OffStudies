"use client";

import type { ContentModule } from "@/types/contentModule";
import { EmptyList } from "@/components/ui/States";
import { YoungFilterTabs } from "@/components/youngLearners/YoungFilterTabs";
import { YoungPracticeControls } from "@/components/youngLearners/YoungPracticeControls";
import { useModuleStream } from "@/hooks/useModuleStream";
import { useModuleProgress } from "@/hooks/useModuleProgress";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

// Young Learners content is fully local (no dictionary lookups), and this
// audience can read at their own pace — so instead of the adult Stream's
// timer, navigation here is manual only. A very large interval effectively
// disables the hook's internal auto-advance without needing to change it.
const NO_AUTO_ADVANCE_SECONDS = 60 * 60 * 24;

export function YoungPracticeView<TEntry, TCandidate, TFilter extends string>({
  module,
  filter,
  setFilter,
}: {
  module: ContentModule<TEntry, TCandidate, TFilter>;
  filter: TFilter;
  setFilter: (f: TFilter) => void;
}) {
  const { savedSlugs, learningSlugs, getStatus, isSaved, toggleKnown, toggleLearning, toggleSaved } =
    useModuleProgress(module.id, module.totalCount());

  const { entry, loading, empty, canGoBack, next, previous } = useModuleStream({
    module,
    filter,
    intervalSeconds: NO_AUTO_ADVANCE_SECONDS,
    savedSlugs,
    learningSlugs,
  });

  useKeyboardShortcuts({
    ArrowRight: () => next(),
    ArrowLeft: () => previous(),
    s: () => entry && toggleSaved(module.getSlug(entry)),
    k: () => entry && toggleKnown(module.getSlug(entry)),
    l: () => entry && toggleLearning(module.getSlug(entry)),
  });

  const status = entry ? getStatus(module.getSlug(entry)) : "unseen";
  const StreamCard = module.StreamCard;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full mb-6">
        <YoungFilterTabs filters={module.filters} value={filter} onChange={setFilter} />
      </div>

      <div className="w-full max-w-xl">
        {loading && !entry && (
          <div className="rounded-3xl border border-[var(--young-border)] bg-[var(--young-surface)] p-10 text-center text-[var(--young-ink-muted)]">
            Loading…
          </div>
        )}

        {!loading && empty && filter === "saved" && (
          <EmptyList title="No saved items yet." hint="Save something to see it here." />
        )}
        {!loading && empty && filter === "learning" && (
          <EmptyList title="Nothing marked as learning yet." hint="Mark something as “Still learning” to add it here." />
        )}

        {entry && (
          <div key={module.getSlug(entry)} className="animate-young-pop">
            <StreamCard entry={entry} />

            <div className="mt-8">
              <YoungPracticeControls
                canGoBack={canGoBack}
                saved={isSaved(module.getSlug(entry))}
                known={status === "known"}
                learning={status === "learning"}
                onPrevious={previous}
                onNext={next}
                onSave={() => toggleSaved(module.getSlug(entry))}
                onKnow={() => toggleKnown(module.getSlug(entry))}
                onLearning={() => toggleLearning(module.getSlug(entry))}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
