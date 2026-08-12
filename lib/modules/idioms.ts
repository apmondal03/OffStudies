import type { ContentModule } from "@/types/contentModule";
import type { IdiomEntry } from "@/types/idiom";
import type { IdiomFilter } from "@/lib/idioms/selection";
import { selectNextIdiom, totalIdiomCount } from "@/lib/idioms/selection";
import { IdiomStreamCard } from "@/components/idioms/IdiomStreamCard";

const FILTERS: { value: IdiomFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "neutral", label: "Neutral" },
  { value: "informal", label: "Informal" },
  { value: "formal", label: "Formal" },
  { value: "saved", label: "Saved" },
  { value: "learning", label: "Learning" },
];

export const idiomsModule: ContentModule<IdiomEntry, IdiomEntry, IdiomFilter> = {
  id: "idioms",
  label: "Idioms",
  track: "adult",
  listRoute: "/idioms",
  isNetworkDependent: false,
  filters: FILTERS,
  defaultFilter: "all",

  totalCount: () => totalIdiomCount(),

  selectNext: (ctx) =>
    selectNextIdiom({
      filter: ctx.filter,
      savedSlugs: ctx.savedSlugs,
      learningSlugs: ctx.learningSlugs,
      recentSlugs: ctx.recentSlugs,
    }),

  // Fully local data — "resolving" a candidate is just returning it.
  resolveEntry: async (candidate) => candidate,

  getSlug: (item) => item.slug,

  StreamCard: IdiomStreamCard,
};
