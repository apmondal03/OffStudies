import { ChevronLeft, ChevronRight, Pause, Play, Bookmark, CheckCircle2, GraduationCap } from "lucide-react";

interface StreamControlsProps {
  paused: boolean;
  canGoBack: boolean;
  saved: boolean;
  known: boolean;
  learning: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onTogglePause: () => void;
  onSave: () => void;
  onKnow: () => void;
  onLearning: () => void;
  compact?: boolean;
}

export function StreamControls({
  paused,
  canGoBack,
  saved,
  known,
  learning,
  onPrevious,
  onNext,
  onTogglePause,
  onSave,
  onKnow,
  onLearning,
  compact = false,
}: StreamControlsProps) {
  const iconBtn = "inline-flex items-center justify-center rounded-full border transition-colors h-11 w-11";
  const neutral = "border-border text-ink-muted hover:text-ink hover:border-border-strong";
  const activeAccent = "border-accent bg-accent-soft text-accent-strong";

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!canGoBack}
          aria-label="Previous word"
          className={`${iconBtn} ${neutral} disabled:opacity-30 disabled:cursor-not-allowed`}
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
        </button>

        <button
          type="button"
          onClick={onTogglePause}
          aria-label={paused ? "Resume" : "Pause"}
          className={`inline-flex items-center justify-center rounded-full bg-accent text-accent-contrast h-14 w-14 hover:bg-accent-strong transition-colors`}
        >
          {paused ? <Play className="h-6 w-6 ml-0.5" /> : <Pause className="h-6 w-6" />}
        </button>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next word"
          className={`${iconBtn} ${neutral}`}
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
        </button>
      </div>

      {!compact && (
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onSave}
            aria-pressed={saved}
            aria-label="Save word"
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-colors ${
              saved ? activeAccent : neutral
            }`}
          >
            <Bookmark className="h-4 w-4" strokeWidth={1.75} fill={saved ? "currentColor" : "none"} />
            Save
          </button>
          <button
            type="button"
            onClick={onKnow}
            aria-pressed={known}
            aria-label="Mark as known"
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-colors ${
              known ? activeAccent : neutral
            }`}
          >
            <CheckCircle2 className="h-4 w-4" strokeWidth={1.75} />
            Know
          </button>
          <button
            type="button"
            onClick={onLearning}
            aria-pressed={learning}
            aria-label="Mark as learning"
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-colors ${
              learning ? activeAccent : neutral
            }`}
          >
            <GraduationCap className="h-4 w-4" strokeWidth={1.75} />
            Learning
          </button>
        </div>
      )}
    </div>
  );
}
