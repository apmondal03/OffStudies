"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { ALPHABET } from "@/lib/kids/alphabet";
import { LetterTraceCanvas } from "@/components/kids/LetterTraceCanvas";
import { useKidsPlayer } from "@/hooks/useKidsPlayer";
import { addStar, markSeen } from "@/lib/kids/storage";

const TRACE_COLORS = ["#ff6b6b", "#4ecdc4", "#ffd166", "#a78bfa"];

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.85;
  utterance.pitch = 1.05;
  window.speechSynthesis.speak(utterance);
}

export default function KidsAlphabetTracePage({
  params,
}: {
  params: Promise<{ letter: string }>;
}) {
  const { letter } = use(params);
  const { current, index, total, next, previous, goTo } = useKidsPlayer(ALPHABET, (l) => l.slug);
  const [earnedStar, setEarnedStar] = useState(false);

  useEffect(() => {
    goTo(letter);
    setEarnedStar(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letter]);

  useEffect(() => {
    if (!current) return;
    const timeout = setTimeout(() => speak(`Trace the letter ${current.letter}`), 300);
    return () => clearTimeout(timeout);
  }, [current]);

  if (!current) return null;

  function handleComplete() {
    if (earnedStar) return;
    setEarnedStar(true);
    addStar();
    if (current) markSeen("alphabet-trace", current.slug);
    speak("Great job!");
  }

  const color = TRACE_COLORS[index % TRACE_COLORS.length];

  return (
    <div className="mx-auto max-w-lg px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-6">
        <Link
          href={`/kids/alphabet/${current.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--kids-ink-muted)] hover:text-[var(--kids-ink)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <span className="kids-display text-sm font-semibold text-[var(--kids-ink-muted)]">
          {index + 1} / {total}
        </span>
      </div>

      <h1 className="kids-display text-3xl font-bold text-[var(--kids-ink)] mb-1">
        Trace the letter {current.letter}
      </h1>
      <p className="text-[var(--kids-ink-muted)] mb-6">Use your finger to draw over the shape!</p>

      <LetterTraceCanvas key={current.slug} letter={current.letter} onComplete={handleComplete} strokeColor={color} />

      <div className="mt-8 flex items-center gap-4">
        <button
          type="button"
          onClick={previous}
          aria-label="Previous letter"
          className="rounded-full bg-white p-3 shadow-sm text-[var(--kids-ink-muted)] hover:text-[var(--kids-ink)] active:scale-95 transition-transform"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={next}
          className="kids-display rounded-full bg-[var(--kids-accent-2)] px-6 py-3 text-lg font-bold text-white shadow-md hover:scale-105 active:scale-95 transition-transform"
        >
          Next Letter
        </button>
      </div>
    </div>
  );
}
