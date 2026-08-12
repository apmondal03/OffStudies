import type { Metadata } from "next";
import Link from "next/link";
import { CORE_3000 } from "@/lib/dictionary/coreList";

export const metadata: Metadata = {
  title: "About",
  description: "What Lexicon is, how the Core 3000 and Word Stream work, and where the dictionary data comes from.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10 sm:py-16">
      <p className="text-xs uppercase tracking-widest text-accent font-medium mb-2">About</p>
      <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-8">
        A dictionary built to be used daily
      </h1>

      <div className="space-y-8 text-ink-muted leading-relaxed">
        <p>
          Lexicon combines a clear, modern English dictionary with a focused vocabulary-learning
          layer. Instead of asking you to manage flashcard decks or review schedules, it offers two
          simple habits: look words up when you&apos;re curious, and let the{" "}
          <Link href="/stream" className="text-accent hover:underline underline-offset-4">
            Word Stream
          </Link>{" "}
          bring a new word to you automatically.
        </p>

        <div>
          <h2 className="font-display text-2xl text-ink mb-2">The Core 3000</h2>
          <p>
            The{" "}
            <Link href="/explore" className="text-accent hover:underline underline-offset-4">
              Core 3000
            </Link>{" "}
            is a set of {CORE_3000.length.toLocaleString()} essential English words spanning CEFR
            levels A1 through B2 — the words worth knowing first. Each entry is tagged with its part
            of speech and level so you always know what to focus on next.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-ink mb-2">The Word Stream</h2>
          <p>
            Start the stream and one word appears at a time, on a timer you control — 15 seconds to
            90. Pause, skip, or go back whenever you like, and mark words as saved, known, or
            learning as you go. There&apos;s no pressure to keep a streak; it&apos;s designed to run quietly
            in the background of your day.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-ink mb-2">Where the data comes from</h2>
          <p>
            Word, part-of-speech, and CEFR-level metadata for the Core 3000 comes from a curated
            frequency list. Definitions, examples, synonyms, and other enrichment are either
            written specifically for this product or normalized from the open{" "}
            <a
              href="https://dictionaryapi.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline underline-offset-4"
            >
              Free Dictionary API
            </a>{" "}
            — never scraped or copied from any proprietary dictionary.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-ink mb-2">No account required</h2>
          <p>
            Your saved words, progress, and history are stored on this device. There&apos;s nothing to
            sign up for to start learning.
          </p>
        </div>
      </div>
    </div>
  );
}
