"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SIGHT_WORDS } from "@/lib/kids/sightWords";
import { KidsWordCard } from "@/components/kids/KidsWordCard";
import { KidsNavControls } from "@/components/kids/KidsNavControls";
import { useKidsPlayer } from "@/hooks/useKidsPlayer";
import { markSeen } from "@/lib/kids/storage";

export default function KidsSightWordsPage() {
  const { current, index, total, next, previous } = useKidsPlayer(SIGHT_WORDS, (w) => w.slug);

  useEffect(() => {
    if (current) markSeen("sightwords", current.slug);
  }, [current]);

  if (!current) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
      <Link
        href="/kids"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--kids-ink-muted)] hover:text-[var(--kids-ink)] mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Home
      </Link>

      <div className="text-center mb-2">
        <h1 className="kids-display text-2xl font-bold text-[var(--kids-ink)]">Sight Words</h1>
        <p className="text-sm text-[var(--kids-ink-muted)]">Words to know by heart!</p>
      </div>

      <div key={current.slug} className="animate-kids-pop flex flex-col items-center mt-6">
        <KidsWordCard
          headline={current.word}
          sentence={current.simpleSentence}
          accentColor="var(--kids-accent-4)"
        />
      </div>

      <KidsNavControls onPrevious={previous} onNext={next} index={index} total={total} />
    </div>
  );
}
