import { PREPOSITIONS } from "@/lib/prepositions/data";
import type { PrepositionEntry, PrepositionType } from "@/types/preposition";

export type PrepositionFilter = "all" | PrepositionType | "saved" | "learning";

export interface PrepositionSelectionContext {
  filter: PrepositionFilter;
  savedSlugs: Set<string>;
  learningSlugs: Set<string>;
  recentSlugs: string[];
}

const RECENT_AVOID_WINDOW = 15;

function poolForFilter(ctx: PrepositionSelectionContext): PrepositionEntry[] {
  switch (ctx.filter) {
    case "core":
    case "adjective-preposition":
    case "noun-preposition":
      return PREPOSITIONS.filter((p) => p.type === ctx.filter);
    case "saved":
      return PREPOSITIONS.filter((p) => ctx.savedSlugs.has(p.slug));
    case "learning":
      return PREPOSITIONS.filter((p) => ctx.learningSlugs.has(p.slug));
    case "all":
    default:
      return PREPOSITIONS;
  }
}

export function selectNextPreposition(ctx: PrepositionSelectionContext): PrepositionEntry | null {
  let pool = poolForFilter(ctx);
  if (pool.length === 0) return null;

  const recentSet = new Set(ctx.recentSlugs.slice(-RECENT_AVOID_WINDOW));
  const notRecent = pool.filter((p) => !recentSet.has(p.slug));
  if (notRecent.length > 0) pool = notRecent;

  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

export function getPrepositionBySlug(slug: string): PrepositionEntry | undefined {
  return PREPOSITIONS.find((p) => p.slug === slug);
}

export function totalPrepositionCount(): number {
  return PREPOSITIONS.length;
}
