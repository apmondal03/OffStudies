/**
 * Data model for the Idioms learning mode. An idiom's meaning is fixed and
 * non-literal, so unlike Vocabulary or Grammar there's no CEFR level that
 * cleanly applies — idioms are grouped by theme and register instead.
 */

export type IdiomRegister = "informal" | "neutral" | "formal";

export type IdiomCategory =
  | "body"
  | "animals"
  | "food"
  | "weather"
  | "colors"
  | "money"
  | "time"
  | "emotions"
  | "work-business"
  | "communication"
  | "success-failure"
  | "difficulty"
  | "general";

export interface IdiomEntry {
  id: string;
  slug: string;
  /** e.g. "break the ice" */
  idiom: string;
  meaning: string;
  simpleDefinition: string;
  /** Optional note on the literal image behind the idiom, for the less
   *  transparent ones where it aids memory. */
  literalNote?: string;
  examples: string[];
  category: IdiomCategory;
  register: IdiomRegister;
  synonyms?: string[];
  tags?: string[];
}

export interface IdiomSummary {
  id: string;
  slug: string;
  idiom: string;
  category: IdiomCategory;
}

export const IDIOM_CATEGORY_LABEL: Record<IdiomCategory, string> = {
  body: "Body",
  animals: "Animals",
  food: "Food",
  weather: "Weather",
  colors: "Colors",
  money: "Money",
  time: "Time",
  emotions: "Emotions & State",
  "work-business": "Work & Business",
  communication: "Communication",
  "success-failure": "Success & Failure",
  difficulty: "Difficulty",
  general: "General",
};
