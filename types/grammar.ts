import type { CEFRLevel } from "@/types/dictionary";

/**
 * Data model for the Grammar learning mode. A "grammar point" is one
 * teachable rule (a tense, a structure, a category of words) rather than a
 * single word — the closest thing to Vocabulary's WordEntry, but shaped for
 * rules instead of definitions.
 */

export type GrammarCategory =
  | "tenses"
  | "articles"
  | "nouns"
  | "pronouns"
  | "adjectives-adverbs"
  | "modals"
  | "conditionals"
  | "passive-voice"
  | "reported-speech"
  | "questions"
  | "gerunds-infinitives"
  | "relative-clauses"
  | "conjunctions"
  | "determiners-quantifiers"
  | "sentence-structure";

export interface GrammarPoint {
  id: string;
  slug: string;
  /** e.g. "Present Simple" */
  title: string;
  category: GrammarCategory;
  cefrLevel: CEFRLevel;
  /** Plain-language explanation of the rule. */
  explanation: string;
  /** Short formula, e.g. "Subject + base verb (+ -s/-es for he/she/it)". Optional
   *  since some categories (e.g. determiners) don't reduce to a clean formula. */
  structure?: string;
  examples: string[];
  commonMistakes?: string[];
  /** Words that typically signal this structure, e.g. ["always", "usually", "every day"]. */
  signalWords?: string[];
  /** Slugs of related/contrasting grammar points, e.g. present-continuous <-> present-simple. */
  compareWith?: string[];
  tags?: string[];
}

export interface GrammarPointSummary {
  id: string;
  slug: string;
  title: string;
  category: GrammarCategory;
  cefrLevel: CEFRLevel;
}

export const GRAMMAR_CATEGORY_LABEL: Record<GrammarCategory, string> = {
  tenses: "Tenses",
  articles: "Articles",
  nouns: "Nouns",
  pronouns: "Pronouns",
  "adjectives-adverbs": "Adjectives & Adverbs",
  modals: "Modal Verbs",
  conditionals: "Conditionals",
  "passive-voice": "Passive Voice",
  "reported-speech": "Reported Speech",
  questions: "Questions",
  "gerunds-infinitives": "Gerunds & Infinitives",
  "relative-clauses": "Relative Clauses",
  conjunctions: "Conjunctions & Linking Words",
  "determiners-quantifiers": "Determiners & Quantifiers",
  "sentence-structure": "Sentence Structure",
};
