import { ChevronLeft, ChevronRight, Bookmark, CheckCircle2, GraduationCap } from "lucide-react";

interface YoungPracticeControlsProps {
  canGoBack: boolean;
  saved: boolean;
  known: boolean;
  learning: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSave: () => void;
  onKnow: () => void;
  onLearning: () => void;
}

export function YoungPracticeControls({
  canGoBack,
  saved,
  known,
  learning,
  onPrevious,
  onNext,
  onSave,
  onKnow,
  onLearning,
}: YoungPracticeControlsProps) {
  const iconBtn = "inline-flex items-center justify-center rounded-full border h-11 w-11 transition-colors";
  const neutral = "border-[var(--young-border)] text-[var(--young-ink-muted)] hover:text-[var(--young-ink)]";
  const active = "border-[var(--young-accent)] bg-[var(--young-accent-soft)] text-[var(--young-accent)]";

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!canGoBack}
          aria-label="Previous"
          className={`${iconBtn} ${neutral} disabled:opacity-30 disabled:cursor-not-allowed`}
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--young-accent)] px-6 py-3 text-sm font-semibold text-[var(--young-accent-contrast)] hover:opacity-90 transition-opacity"
        >
          Next
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onSave}
          aria-pressed={saved}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-colors ${saved ? active : neutral}`}
        >
          <Bookmark className="h-4 w-4" strokeWidth={1.75} fill={saved ? "currentColor" : "none"} />
          Save
        </button>
        <button
          type="button"
          onClick={onKnow}
          aria-pressed={known}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-colors ${known ? active : neutral}`}
        >
          <CheckCircle2 className="h-4 w-4" strokeWidth={1.75} />
          I know this
        </button>
        <button
          type="button"
          onClick={onLearning}
          aria-pressed={learning}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-colors ${learning ? active : neutral}`}
        >
          <GraduationCap className="h-4 w-4" strokeWidth={1.75} />
          Still learning
        </button>
      </div>
    </div>
  );
}
