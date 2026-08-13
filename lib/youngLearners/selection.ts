import { YOUNG_SIGHT_WORDS } from "@/lib/youngLearners/sightWords";
import { YOUNG_GRAMMAR } from "@/lib/youngLearners/grammar";
import type { YoungSightWordEntry, YoungGrammarPoint, SightWordTier, YoungGrammarCategory } from "@/types/youngLearner";

const RECENT_AVOID_WINDOW = 15;

// --- Sight Words ---

export type YoungSightWordFilter = "all" | SightWordTier | "saved" | "learning";

export interface YoungSightWordSelectionContext {
  filter: YoungSightWordFilter;
  savedSlugs: Set<string>;
  learningSlugs: Set<string>;
  recentSlugs: string[];
}

function sightWordPool(ctx: YoungSightWordSelectionContext): YoungSightWordEntry[] {
  switch (ctx.filter) {
    case "primer":
    case "grade1":
    case "grade2":
      return YOUNG_SIGHT_WORDS.filter((w) => w.tier === ctx.filter);
    case "saved":
      return YOUNG_SIGHT_WORDS.filter((w) => ctx.savedSlugs.has(w.slug));
    case "learning":
      return YOUNG_SIGHT_WORDS.filter((w) => ctx.learningSlugs.has(w.slug));
    case "all":
    default:
      return YOUNG_SIGHT_WORDS;
  }
}

export function selectNextYoungSightWord(ctx: YoungSightWordSelectionContext): YoungSightWordEntry | null {
  let pool = sightWordPool(ctx);
  if (pool.length === 0) return null;
  const recentSet = new Set(ctx.recentSlugs.slice(-RECENT_AVOID_WINDOW));
  const notRecent = pool.filter((w) => !recentSet.has(w.slug));
  if (notRecent.length > 0) pool = notRecent;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getYoungSightWordBySlug(slug: string): YoungSightWordEntry | undefined {
  return YOUNG_SIGHT_WORDS.find((w) => w.slug === slug);
}

export function totalYoungSightWordCount(): number {
  return YOUNG_SIGHT_WORDS.length;
}

// --- Grammar ---

export type YoungGrammarFilter = "all" | YoungGrammarCategory | "saved" | "learning";

export interface YoungGrammarSelectionContext {
  filter: YoungGrammarFilter;
  savedSlugs: Set<string>;
  learningSlugs: Set<string>;
  recentSlugs: string[];
}

function grammarPool(ctx: YoungGrammarSelectionContext): YoungGrammarPoint[] {
  switch (ctx.filter) {
    case "word-types":
    case "sentences":
    case "punctuation":
    case "word-play":
      return YOUNG_GRAMMAR.filter((g) => g.category === ctx.filter);
    case "saved":
      return YOUNG_GRAMMAR.filter((g) => ctx.savedSlugs.has(g.slug));
    case "learning":
      return YOUNG_GRAMMAR.filter((g) => ctx.learningSlugs.has(g.slug));
    case "all":
    default:
      return YOUNG_GRAMMAR;
  }
}

export function selectNextYoungGrammar(ctx: YoungGrammarSelectionContext): YoungGrammarPoint | null {
  let pool = grammarPool(ctx);
  if (pool.length === 0) return null;
  const recentSet = new Set(ctx.recentSlugs.slice(-RECENT_AVOID_WINDOW));
  const notRecent = pool.filter((g) => !recentSet.has(g.slug));
  if (notRecent.length > 0) pool = notRecent;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getYoungGrammarBySlug(slug: string): YoungGrammarPoint | undefined {
  return YOUNG_GRAMMAR.find((g) => g.slug === slug);
}

export function totalYoungGrammarCount(): number {
  return YOUNG_GRAMMAR.length;
}
