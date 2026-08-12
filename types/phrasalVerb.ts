/**
 * Data model for the Phrasal Verbs learning mode. Kept as a sibling to
 * WordEntry rather than force-fit into it — a phrasal verb has a genuinely
 * different shape (particles, separability, multiple senses per entry) and
 * this keeps that difference explicit rather than hidden behind optional
 * fields on the word type.
 */

export type Formality = "informal" | "neutral" | "formal";

export interface PhrasalVerbSense {
  id: string;
  meaning: string;
  simpleDefinition: string;
  examples: string[];
  synonyms?: string[];
}

export interface PhrasalVerbEntry {
  id: string;
  slug: string;
  /** e.g. "give up" */
  phrase: string;
  baseVerb: string;
  particles: string[];
  /** "turn it off" (true) vs. always "look after it", never "look it after" (false) */
  separable: boolean;
  /** Whether the phrasal verb takes a direct object at all. */
  transitive: boolean;
  formality: Formality;
  senses: PhrasalVerbSense[];
  tags?: string[];
}

export interface PhrasalVerbSummary {
  id: string;
  slug: string;
  phrase: string;
  formality: Formality;
}
