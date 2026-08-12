import { PHRASAL_VERBS } from "@/lib/phrasalVerbs/data";
import type { PhrasalVerbEntry, Formality } from "@/types/phrasalVerb";

export type PhrasalVerbFilter = "all" | Formality | "saved" | "learning";

export interface PhrasalVerbSelectionContext {
  filter: PhrasalVerbFilter;
  savedSlugs: Set<string>;
  learningSlugs: Set<string>;
  recentSlugs: string[];
}

const RECENT_AVOID_WINDOW = 15;

function poolForFilter(ctx: PhrasalVerbSelectionContext): PhrasalVerbEntry[] {
  switch (ctx.filter) {
    case "informal":
    case "neutral":
    case "formal":
      return PHRASAL_VERBS.filter((p) => p.formality === ctx.filter);
    case "saved":
      return PHRASAL_VERBS.filter((p) => ctx.savedSlugs.has(p.slug));
    case "learning":
      return PHRASAL_VERBS.filter((p) => ctx.learningSlugs.has(p.slug));
    case "all":
    default:
      return PHRASAL_VERBS;
  }
}

export function selectNextPhrasalVerb(ctx: PhrasalVerbSelectionContext): PhrasalVerbEntry | null {
  let pool = poolForFilter(ctx);
  if (pool.length === 0) return null;

  const recentSet = new Set(ctx.recentSlugs.slice(-RECENT_AVOID_WINDOW));
  const notRecent = pool.filter((p) => !recentSet.has(p.slug));
  if (notRecent.length > 0) pool = notRecent;

  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

export function getPhrasalVerbBySlug(slug: string): PhrasalVerbEntry | undefined {
  return PHRASAL_VERBS.find((p) => p.slug === slug);
}

export function totalPhrasalVerbCount(): number {
  return PHRASAL_VERBS.length;
}
