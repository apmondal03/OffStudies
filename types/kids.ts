/**
 * Data model for Kids Mode. This is a deliberately separate, simpler track
 * from the adult ContentModule system — a 3-year-old doesn't need CEFR
 * levels, filters, or a "known/learning" trichotomy. Content here is
 * organized by topic (for First Words) or straightforwardly A-Z (for
 * Alphabet), with a single lightweight "star" for positive reinforcement
 * instead of the adult save/know/learning model.
 */

export type KidsCategory =
  | "animals"
  | "colors"
  | "numbers"
  | "shapes"
  | "family"
  | "food"
  | "body"
  | "clothes"
  | "vehicles"
  | "weather"
  | "actions";

export interface KidsWordEntry {
  id: string;
  slug: string;
  word: string;
  emoji: string;
  category: KidsCategory;
  simpleSentence: string;
}

export interface AlphabetExampleWord {
  word: string;
  emoji: string;
}

export interface AlphabetLetterEntry {
  id: string;
  slug: string;
  letter: string;
  soundHint: string;
  words: AlphabetExampleWord[];
}

export interface SightWordEntry {
  id: string;
  slug: string;
  word: string;
  simpleSentence: string;
}

export const KIDS_CATEGORY_LABEL: Record<KidsCategory, string> = {
  animals: "Animals",
  colors: "Colors",
  numbers: "Numbers",
  shapes: "Shapes",
  family: "Family",
  food: "Food",
  body: "My Body",
  clothes: "Clothes",
  vehicles: "Vehicles",
  weather: "Weather",
  actions: "Actions",
};

export const KIDS_CATEGORY_EMOJI: Record<KidsCategory, string> = {
  animals: "🐶",
  colors: "🎨",
  numbers: "🔢",
  shapes: "⭐",
  family: "👨‍👩‍👧",
  food: "🍎",
  body: "🙂",
  clothes: "👕",
  vehicles: "🚗",
  weather: "☀️",
  actions: "🏃",
};
