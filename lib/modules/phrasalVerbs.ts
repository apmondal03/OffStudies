import type { ContentModule } from "@/types/contentModule";
import type { PhrasalVerbEntry } from "@/types/phrasalVerb";
import type { PhrasalVerbFilter } from "@/lib/phrasalVerbs/selection";
import { selectNextPhrasalVerb, totalPhrasalVerbCount } from "@/lib/phrasalVerbs/selection";
import { PhrasalVerbStreamCard } from "@/components/phrasalVerbs/PhrasalVerbStreamCard";

const FILTERS: { value: PhrasalVerbFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "neutral", label: "Neutral" },
  { value: "informal", label: "Informal" },
  { value: "formal", label: "Formal" },
  { value: "saved", label: "Saved" },
  { value: "learning", label: "Learning" },
];

export const phrasalVerbsModule: ContentModule<PhrasalVerbEntry, PhrasalVerbEntry, PhrasalVerbFilter> = {
  id: "phrasal-verbs",
  label: "Phrasal Verbs",
  track: "adult",
  listRoute: "/phrasal-verbs",
  isNetworkDependent: false,
  filters: FILTERS,
  defaultFilter: "all",

  totalCount: () => totalPhrasalVerbCount(),

  selectNext: (ctx) =>
    selectNextPhrasalVerb({
      filter: ctx.filter,
      savedSlugs: ctx.savedSlugs,
      learningSlugs: ctx.learningSlugs,
      recentSlugs: ctx.recentSlugs,
    }),

  // Fully local data — "resolving" a candidate is just returning it.
  resolveEntry: async (candidate) => candidate,

  getSlug: (item) => item.slug,

  StreamCard: PhrasalVerbStreamCard,
};
