"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { addStar } from "@/lib/kids/storage";

export function KidsNavControls({
  onPrevious,
  onNext,
  index,
  total,
}: {
  onPrevious: () => void;
  onNext: () => void;
  index: number;
  total: number;
}) {
  function handleStar() {
    addStar();
    onNext();
  }

  return (
    <div className="mt-10 flex flex-col items-center gap-5">
      <button
        type="button"
        onClick={handleStar}
        className="kids-display flex items-center gap-2 rounded-full bg-[var(--kids-accent-3)] px-8 py-4 text-xl font-bold text-[#2b2540] shadow-md hover:scale-105 active:scale-95 transition-transform"
      >
        <Star className="h-6 w-6 fill-current" />
        I did it!
      </button>

      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={onPrevious}
          aria-label="Previous"
          className="rounded-full bg-white p-3 shadow-sm text-[var(--kids-ink-muted)] hover:text-[var(--kids-ink)] active:scale-95 transition-transform"
        >
          <ChevronLeft className="h-7 w-7" />
        </button>
        <span className="kids-display text-sm font-semibold text-[var(--kids-ink-muted)]">
          {index + 1} / {total}
        </span>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next"
          className="rounded-full bg-white p-3 shadow-sm text-[var(--kids-ink-muted)] hover:text-[var(--kids-ink)] active:scale-95 transition-transform"
        >
          <ChevronRight className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
}
