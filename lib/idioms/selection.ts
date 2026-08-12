import { IDIOMS } from "@/lib/idioms/data";
import type { IdiomEntry, IdiomCategory, IdiomRegister } from "@/types/idiom";

export type IdiomFilter = "all" | IdiomRegister | "saved" | "learning";

export interface IdiomSelectionContext {
  filter: IdiomFilter;
  savedSlugs: Set<string>;
  learningSlugs: Set<string>;
  recentSlugs: string[];
}

const RECENT_AVOID_WINDOW = 15;

function poolForFilter(ctx: IdiomSelectionContext): IdiomEntry[] {
  switch (ctx.filter) {
    case "informal":
    case "neutral":
    case "formal":
      return IDIOMS.filter((i) => i.register === ctx.filter);
    case "saved":
      return IDIOMS.filter((i) => ctx.savedSlugs.has(i.slug));
    case "learning":
      return IDIOMS.filter((i) => ctx.learningSlugs.has(i.slug));
    case "all":
    default:
      return IDIOMS;
  }
}

export function selectNextIdiom(ctx: IdiomSelectionContext): IdiomEntry | null {
  let pool = poolForFilter(ctx);
  if (pool.length === 0) return null;

  const recentSet = new Set(ctx.recentSlugs.slice(-RECENT_AVOID_WINDOW));
  const notRecent = pool.filter((i) => !recentSet.has(i.slug));
  if (notRecent.length > 0) pool = notRecent;

  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

export function getIdiomBySlug(slug: string): IdiomEntry | undefined {
  return IDIOMS.find((i) => i.slug === slug);
}

export function totalIdiomCount(): number {
  return IDIOMS.length;
}

export function getIdiomCategoryCounts(): Record<IdiomCategory, number> {
  const counts = {} as Record<IdiomCategory, number>;
  for (const i of IDIOMS) {
    counts[i.category] = (counts[i.category] ?? 0) + 1;
  }
  return counts;
}
