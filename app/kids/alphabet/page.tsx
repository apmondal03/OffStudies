import Link from "next/link";
import { ALPHABET } from "@/lib/kids/alphabet";

const LETTER_COLORS = ["var(--kids-accent)", "var(--kids-accent-2)", "var(--kids-accent-3)", "var(--kids-accent-4)"];

export default function KidsAlphabetPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-16 text-center">
      <h1 className="kids-display text-4xl sm:text-5xl font-bold text-[var(--kids-ink)] mb-3">
        ABC Letters
      </h1>
      <p className="text-lg text-[var(--kids-ink-muted)] mb-10">Tap a letter to hear its sound!</p>

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
        {ALPHABET.map((letter, i) => (
          <Link
            key={letter.slug}
            href={`/kids/alphabet/${letter.slug}`}
            className="animate-kids-pop flex aspect-square items-center justify-center rounded-3xl bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <span
              className="kids-display text-4xl font-bold"
              style={{ color: LETTER_COLORS[i % LETTER_COLORS.length] }}
            >
              {letter.letter}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
