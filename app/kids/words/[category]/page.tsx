"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { KIDS_WORDS } from "@/lib/kids/words";
import { KIDS_CATEGORY_LABEL } from "@/types/kids";
import type { KidsCategory } from "@/types/kids";
import { KidsWordCard } from "@/components/kids/KidsWordCard";
import { KidsNavControls } from "@/components/kids/KidsNavControls";
import { useKidsPlayer } from "@/hooks/useKidsPlayer";
import { markSeen } from "@/lib/kids/storage";

const VALID_CATEGORIES = new Set(Object.keys(KIDS_CATEGORY_LABEL));

export default function KidsWordsCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);
  const isAll = category === "all";
  const words = isAll ? KIDS_WORDS : KIDS_WORDS.filter((w) => w.category === category);

  const { current, index, total, next, previous } = useKidsPlayer(words, (w) => w.slug);

  useEffect(() => {
    if (current) markSeen("words", current.slug);
  }, [current]);

  const categoryLabel = isAll
    ? "All Words"
    : VALID_CATEGORIES.has(category)
      ? KIDS_CATEGORY_LABEL[category as KidsCategory]
      : "Words";

  if (!current) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="kids-display text-2xl font-bold text-[var(--kids-ink)]">No words found.</p>
        <Link href="/kids/words" className="mt-4 inline-block text-[var(--kids-accent)] font-semibold">
          ← Back to topics
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
      <Link
        href="/kids/words"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--kids-ink-muted)] hover:text-[var(--kids-ink)] mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        {categoryLabel}
      </Link>

      <div key={current.slug} className="animate-kids-pop flex flex-col items-center">
        <KidsWordCard headline={current.word} visual={current.emoji} sentence={current.simpleSentence} />
      </div>

      <KidsNavControls onPrevious={previous} onNext={next} index={index} total={total} />
    </div>
  );
}
