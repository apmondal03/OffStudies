/**
 * Data model for the Prepositions learning mode. A single preposition
 * (e.g. "in") doesn't reduce to one definition the way a word does — it has
 * several usage patterns (time, place, movement...) that need to be shown
 * together. Dependent prepositions (adjective/noun + preposition, e.g.
 * "afraid of", "access to") are modeled the same way with just one sense,
 * so both share the same card/detail rendering.
 *
 * Note: this module deliberately does NOT cover verb + preposition
 * combinations (e.g. "depend on", "believe in") — those are already
 * covered as prepositional verbs in the Phrasal Verbs module, and
 * duplicating them here would be redundant.
 */

export type PrepositionType = "core" | "adjective-preposition" | "noun-preposition";

export type PrepositionUsage = "time" | "place" | "movement" | "manner" | "other";

export interface PrepositionSense {
  id: string;
  usage: PrepositionUsage;
  explanation: string;
  examples: string[];
}

export interface PrepositionEntry {
  id: string;
  slug: string;
  /** "in", "afraid of", "access to" */
  phrase: string;
  type: PrepositionType;
  senses: PrepositionSense[];
  commonMistakes?: string[];
  tags?: string[];
}

export const PREPOSITION_TYPE_LABEL: Record<PrepositionType, string> = {
  core: "Core Preposition",
  "adjective-preposition": "Adjective + Preposition",
  "noun-preposition": "Noun + Preposition",
};

export const PREPOSITION_USAGE_LABEL: Record<PrepositionUsage, string> = {
  time: "Time",
  place: "Place",
  movement: "Movement",
  manner: "Manner / Method",
  other: "Other",
};
