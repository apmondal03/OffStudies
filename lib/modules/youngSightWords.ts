import type { ContentModule } from "@/types/contentModule";
import type { YoungSightWordEntry } from "@/types/youngLearner";
import type { YoungSightWordFilter } from "@/lib/youngLearners/selection";
import { selectNextYoungSightWord, totalYoungSightWordCount } from "@/lib/youngLearners/selection";
import { YoungSightWordStreamCard } from "@/components/youngLearners/YoungSightWordStreamCard";

const FILTERS: { value: YoungSightWordFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "primer", label: "Primer" },
  { value: "grade1", label: "1st Grade" },
  { value: "grade2", label: "2nd Grade" },
  { value: "saved", label: "Saved" },
  { value: "learning", label: "Learning" },
];

export const youngSightWordsModule: ContentModule<YoungSightWordEntry, YoungSightWordEntry, YoungSightWordFilter> = {
  id: "young-sight-words",
  label: "Sight Words",
  track: "kids",
  listRoute: "/young-learners/practice",
  isNetworkDependent: false,
  filters: FILTERS,
  defaultFilter: "all",

  totalCount: () => totalYoungSightWordCount(),

  selectNext: (ctx) =>
    selectNextYoungSightWord({
      filter: ctx.filter,
      savedSlugs: ctx.savedSlugs,
      learningSlugs: ctx.learningSlugs,
      recentSlugs: ctx.recentSlugs,
    }),

  resolveEntry: async (candidate) => candidate,

  getSlug: (item) => item.slug,

  StreamCard: YoungSightWordStreamCard,
};
