import type { ContentModule } from "@/types/contentModule";
import type { GrammarPoint } from "@/types/grammar";
import type { GrammarFilter } from "@/lib/grammar/selection";
import { selectNextGrammarPoint, totalGrammarPointCount } from "@/lib/grammar/selection";
import { GrammarStreamCard } from "@/components/grammar/GrammarStreamCard";

const FILTERS: { value: GrammarFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "A1", label: "A1" },
  { value: "A2", label: "A2" },
  { value: "B1", label: "B1" },
  { value: "B2", label: "B2" },
  { value: "C1", label: "C1" },
  { value: "C2", label: "C2" },
  { value: "saved", label: "Saved" },
  { value: "learning", label: "Learning" },
];

export const grammarModule: ContentModule<GrammarPoint, GrammarPoint, GrammarFilter> = {
  id: "grammar",
  label: "Grammar",
  track: "adult",
  listRoute: "/grammar",
  isNetworkDependent: false,
  filters: FILTERS,
  defaultFilter: "all",

  totalCount: () => totalGrammarPointCount(),

  selectNext: (ctx) =>
    selectNextGrammarPoint({
      filter: ctx.filter,
      savedSlugs: ctx.savedSlugs,
      learningSlugs: ctx.learningSlugs,
      recentSlugs: ctx.recentSlugs,
    }),

  // Fully local data — "resolving" a candidate is just returning it.
  resolveEntry: async (candidate) => candidate,

  getSlug: (item) => item.slug,

  StreamCard: GrammarStreamCard,
};
