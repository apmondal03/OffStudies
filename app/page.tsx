import Link from "next/link";
import { Sparkles, Clock, BookOpenCheck, ArrowUpRight } from "lucide-react";
import { SearchBar } from "@/components/dictionary/SearchBar";
import { WordOfTheMoment } from "@/components/dictionary/WordOfTheMoment";
import { CORE_3000 } from "@/lib/dictionary/coreList";
import { CefrBadge } from "@/components/ui/CefrBadge";
import type { CEFRLevel } from "@/types/dictionary";

const LEVELS: CEFRLevel[] = ["A1", "A2", "B1", "B2"];

function levelCounts() {
  const counts: Record<CEFRLevel, number> = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 };
  for (const w of CORE_3000) counts[w.cefrLevel]++;
  return counts;
}

const FEATURES = [
  {
    icon: BookOpenCheck,
    title: "Core 3000, done right",
    body: "A curated set of the words worth knowing first, tagged A1 through B2 so you always know what's next.",
  },
  {
    icon: Clock,
    title: "The Word Stream",
    body: "Words arrive on their own schedule — no reviewing, no flashcards to manage. Just look up occasionally and let it run.",
  },
  {
    icon: Sparkles,
    title: "Built for real usage",
    body: "Every entry favors real collocations and everyday sentences over textbook phrasing.",
  },
];

export default function HomePage() {
  const counts = levelCounts();

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-24 pb-14">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-accent font-medium mb-4">
            An English dictionary that keeps moving
          </p>
          <h1 className="font-display text-5xl sm:text-6xl leading-[1.05] tracking-tight">
            Understand words.
            <br />
            Remember them.
          </h1>
          <p className="mt-6 text-lg text-ink-muted leading-relaxed max-w-xl">
            Lexicon pairs a clear, modern dictionary with the Core 3000 — the essential
            words of English — and the Word Stream, an ambient way to meet a new word
            every thirty seconds without lifting a finger.
          </p>
        </div>

        <div className="mt-10 max-w-2xl">
          <SearchBar size="hero" placeholder="Look up a word — try “acquire”…" />
        </div>
      </section>

      {/* Word of the Moment + CEFR explorer */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <WordOfTheMoment />
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-border bg-surface p-6 sm:p-8 flex flex-col">
          <p className="text-xs uppercase tracking-widest text-ink-faint mb-1">Core 3000</p>
          <h2 className="font-display text-2xl mb-5">Browse by level</h2>
          <div className="grid grid-cols-2 gap-3 flex-1">
            {LEVELS.map((level) => (
              <Link
                key={level}
                href={`/explore?level=${level}`}
                className="group rounded-xl border border-border p-4 hover:border-accent transition-colors"
              >
                <CefrBadge level={level} />
                <p className="mt-3 font-display text-2xl">{counts[level]}</p>
                <p className="text-xs text-ink-faint">words</p>
              </Link>
            ))}
          </div>
          <Link
            href="/explore"
            className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline underline-offset-4"
          >
            Explore the full Core 3000
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="font-display text-3xl mb-10 max-w-lg">
            A dictionary designed to be used, not just consulted.
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <div key={title}>
                <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                <h3 className="mt-4 font-display text-xl">{title}</h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="rounded-2xl border border-border bg-accent-soft p-10 sm:p-14 text-center">
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight">
            Start the Word Stream
          </h2>
          <p className="mt-3 text-ink-muted max-w-md mx-auto">
            Let a new word arrive every 30 seconds — pause, skip, or save any word along the way.
          </p>
          <Link
            href="/stream"
            className="mt-6 inline-block rounded-full bg-accent px-7 py-3 text-sm font-medium text-accent-contrast hover:bg-accent-strong transition-colors"
          >
            Open the Word Stream
          </Link>
        </div>
      </section>
    </div>
  );
}
