/**
 * Data model for the Young Learners tier (ages ~7-12) — a bridge between
 * Kids Mode (pre-readers) and the adult CEFR track. Unlike Kids Mode, this
 * content DOES use the generic adult ContentModule system
 * (`useModuleStream`/`useModuleProgress`/`lib/registry.ts`), registered
 * with `track: "kids"` — a 7-12 year old can read, so the Stream mechanic
 * fits, it just needs its own calmer visual theme and simpler content.
 */

export type SightWordTier = "primer" | "grade1" | "grade2";

export interface YoungSightWordEntry {
  id: string;
  slug: string;
  word: string;
  tier: SightWordTier;
  simpleSentence: string;
}

export type YoungGrammarCategory =
  | "word-types"
  | "sentences"
  | "punctuation"
  | "word-play";

export interface YoungGrammarPoint {
  id: string;
  slug: string;
  title: string;
  category: YoungGrammarCategory;
  explanation: string;
  examples: string[];
  funFact?: string;
}

export const SIGHT_WORD_TIER_LABEL: Record<SightWordTier, string> = {
  primer: "Primer",
  grade1: "1st Grade",
  grade2: "2nd Grade",
};

export const YOUNG_GRAMMAR_CATEGORY_LABEL: Record<YoungGrammarCategory, string> = {
  "word-types": "Word Types",
  sentences: "Sentences",
  punctuation: "Punctuation",
  "word-play": "Word Play",
};
