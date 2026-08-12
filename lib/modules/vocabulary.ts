import type { ContentModule } from "@/types/contentModule";
import type { WordEntry, WordSummary } from "@/types/dictionary";
import type { StreamFilter } from "@/lib/word-selection";
import { selectNextWord } from "@/lib/word-selection";
import { CORE_3000 } from "@/lib/dictionary/coreList";
import { dictionaryProvider } from "@/lib/dictionary";
import { VocabularyStreamCard } from "@/components/dictionary/VocabularyStreamCard";

const FILTERS: { value: StreamFilter; label: string }[] = [
  { value: "essential", label: "Essential" },
  { value: "A1", label: "Beginner A1" },
  { value: "A2", label: "Elementary A2" },
  { value: "B1", label: "Intermediate B1" },
  { value: "B2", label: "Upper Int. B2" },
  { value: "random", label: "Random" },
  { value: "saved", label: "Saved" },
  { value: "learning", label: "Learning" },
];

export const vocabularyModule: ContentModule<WordEntry, WordSummary, StreamFilter> = {
  id: "vocabulary",
  label: "Vocabulary",
  track: "adult",
  listRoute: "/explore",
  isNetworkDependent: true,
  filters: FILTERS,
  defaultFilter: "essential",

  totalCount: () => CORE_3000.length,

  selectNext: (ctx) =>
    selectNextWord({
      filter: ctx.filter,
      savedSlugs: ctx.savedSlugs,
      learningSlugs: ctx.learningSlugs,
      knownSlugs: new Set(),
      recentSlugs: ctx.recentSlugs,
    }),

  resolveEntry: (candidate) => dictionaryProvider.getWord(candidate.word),

  getSlug: (item) => item.slug,

  StreamCard: VocabularyStreamCard,
};
