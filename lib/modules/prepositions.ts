import type { ContentModule } from "@/types/contentModule";
import type { PrepositionEntry } from "@/types/preposition";
import type { PrepositionFilter } from "@/lib/prepositions/selection";
import { selectNextPreposition, totalPrepositionCount } from "@/lib/prepositions/selection";
import { PrepositionStreamCard } from "@/components/prepositions/PrepositionStreamCard";

const FILTERS: { value: PrepositionFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "core", label: "Core Prepositions" },
  { value: "adjective-preposition", label: "Adjective + Prep" },
  { value: "noun-preposition", label: "Noun + Prep" },
  { value: "saved", label: "Saved" },
  { value: "learning", label: "Learning" },
];

export const prepositionsModule: ContentModule<PrepositionEntry, PrepositionEntry, PrepositionFilter> = {
  id: "prepositions",
  label: "Prepositions",
  track: "adult",
  listRoute: "/prepositions",
  isNetworkDependent: false,
  filters: FILTERS,
  defaultFilter: "all",

  totalCount: () => totalPrepositionCount(),

  selectNext: (ctx) =>
    selectNextPreposition({
      filter: ctx.filter,
      savedSlugs: ctx.savedSlugs,
      learningSlugs: ctx.learningSlugs,
      recentSlugs: ctx.recentSlugs,
    }),

  // Fully local data — "resolving" a candidate is just returning it.
  resolveEntry: async (candidate) => candidate,

  getSlug: (item) => item.slug,

  StreamCard: PrepositionStreamCard,
};
