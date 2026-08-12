/**
 * Core data model for the dictionary / vocabulary product.
 *
 * Design notes:
 * - A word can have MULTIPLE parts of speech and MULTIPLE senses per part of
 *   speech, so `definitions` is an array of `Definition`, each carrying its
 *   own part of speech rather than assuming one global part of speech.
 * - Every enrichment field (synonyms, collocations, word family, etc.) is
 *   optional. The UI is responsible for hiding empty sections rather than
 *   rendering empty cards — see components/dictionary/*.
 * - This interface is intentionally provider-agnostic: it's the shape any
 *   DictionaryProvider must normalize its response into, whether that's the
 *   Free Dictionary API today or an internal database / another API later.
 */

export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type PartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "preposition"
  | "conjunction"
  | "pronoun"
  | "determiner"
  | "exclamation"
  | "number"
  | "modal verb"
  | "auxiliary verb"
  | "article"
  | "particle"
  | "adjective/adverb"
  | string; // left open for provider data we don't fully control

export interface Definition {
  id: string;
  partOfSpeech: PartOfSpeech;
  /** Full, precise sense of the word. */
  meaning: string;
  /** A short, plain-language rephrasing for learners. */
  simpleDefinition?: string;
  examples?: string[];
  synonyms?: string[];
  antonyms?: string[];
}

export interface RealLifeExample {
  context: string; // e.g. "In a job interview", "Texting a friend"
  sentence: string;
}

export interface WordFamilyEntry {
  word: string;
  partOfSpeech: PartOfSpeech;
}

export interface WordEntry {
  id: string;
  word: string;
  slug: string;

  /** Primary part of speech shown in list views (a word may have more, see `definitions`). */
  partOfSpeech: PartOfSpeech;
  cefrLevel: CEFRLevel;

  phoneticUS?: string;
  phoneticUK?: string;
  audioUS?: string;
  audioUK?: string;

  definitions: Definition[];

  /** Aggregate, deduped across definitions — convenient for compact UI like WordCard. */
  synonyms?: string[];
  antonyms?: string[];

  examples?: string[];
  realLifeExamples?: RealLifeExample[];

  collocations?: string[];
  phrases?: string[];
  wordFamily?: WordFamilyEntry[];

  commonMistakes?: string[];
  usageNotes?: string[];

  frequencyRank?: number;
  tags?: string[];
}

/** Minimal shape used for list/browse views (Explore, Stream) where full detail isn't needed yet. */
export interface WordSummary {
  id: string;
  word: string;
  slug: string;
  partOfSpeech: PartOfSpeech;
  cefrLevel: CEFRLevel;
}

export type LearningStatus = "unseen" | "learning" | "known";

export interface SearchSuggestion {
  word: string;
  slug: string;
  partOfSpeech: PartOfSpeech;
  cefrLevel?: CEFRLevel;
}
