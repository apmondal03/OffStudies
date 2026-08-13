import type { ContentModule } from "@/types/contentModule";
import type { YoungGrammarPoint } from "@/types/youngLearner";
import type { YoungGrammarFilter } from "@/lib/youngLearners/selection";
import { selectNextYoungGrammar, totalYoungGrammarCount } from "@/lib/youngLearners/selection";
import { YoungGrammarStreamCard } from "@/components/youngLearners/YoungGrammarStreamCard";

const FILTERS: { value: YoungGrammarFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "word-types", label: "Word Types" },
  { value: "sentences", label: "Sentences" },
  { value: "punctuation", label: "Punctuation" },
  { value: "word-play", label: "Word Play" },
  { value: "saved", label: "Saved" },
  { value: "learning", label: "Learning" },
];

export const youngGrammarModule: ContentModule<YoungGrammarPoint, YoungGrammarPoint, YoungGrammarFilter> = {
  id: "young-grammar",
  label: "Grammar",
  track: "kids",
  listRoute: "/young-learners/practice",
  isNetworkDependent: false,
  filters: FILTERS,
  defaultFilter: "all",

  totalCount: () => totalYoungGrammarCount(),

  selectNext: (ctx) =>
    selectNextYoungGrammar({
      filter: ctx.filter,
      savedSlugs: ctx.savedSlugs,
      learningSlugs: ctx.learningSlugs,
      recentSlugs: ctx.recentSlugs,
    }),

  resolveEntry: async (candidate) => candidate,

  getSlug: (item) => item.slug,

  StreamCard: YoungGrammarStreamCard,
};
