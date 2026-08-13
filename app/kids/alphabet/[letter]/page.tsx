"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, PenLine } from "lucide-react";
import { ALPHABET } from "@/lib/kids/alphabet";
import { KidsWordCard } from "@/components/kids/KidsWordCard";
import { KidsNavControls } from "@/components/kids/KidsNavControls";
import { useKidsPlayer } from "@/hooks/useKidsPlayer";
import { markSeen } from "@/lib/kids/storage";

export default function KidsAlphabetLetterPage({
  params,
}: {
  params: Promise<{ letter: string }>;
}) {
  const { letter } = use(params);
  const { current, index, total, next, previous, goTo } = useKidsPlayer(ALPHABET, (l) => l.slug);

  useEffect(() => {
    goTo(letter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letter]);

  useEffect(() => {
    if (current) markSeen("alphabet", current.slug);
  }, [current]);

  if (!current) return null;

  const exampleWords = current.words.map((w) => w.word).join(" and ");

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
      <Link
        href="/kids/alphabet"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--kids-ink-muted)] hover:text-[var(--kids-ink)] mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        All letters
      </Link>

      <div key={current.slug} className="animate-kids-pop flex flex-col items-center">
        <KidsWordCard
          headline={current.letter}
          sentence={current.soundHint}
          speakText={`${current.letter}. ${current.soundHint.replace(/\/[^/]+\//g, "")}`}
          accentColor="var(--kids-accent-2)"
        />

        <div className="mt-8 flex items-center gap-6">
          {current.words.map((w) => (
            <div key={w.word} className="flex flex-col items-center gap-1">
              <span className="text-5xl">{w.emoji}</span>
              <span className="kids-display text-lg font-semibold text-[var(--kids-ink)]">{w.word}</span>
            </div>
          ))}
        </div>
        <p className="sr-only">{exampleWords}</p>

        <Link
          href={`/kids/alphabet/${current.slug}/trace`}
          className="kids-display mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--kids-accent-2)] px-6 py-3 text-lg font-bold text-white shadow-md hover:scale-105 active:scale-95 transition-transform"
        >
          <PenLine className="h-5 w-5" />
          Trace this letter!
        </Link>
      </div>

      <KidsNavControls onPrevious={previous} onNext={next} index={index} total={total} />
    </div>
  );
}
