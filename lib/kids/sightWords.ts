import type { SightWordEntry } from "@/types/kids";

/**
 * The Dolch Pre-Primer list — 40 words, the standard starting point for
 * sight-word instruction (compiled by Edward William Dolch from
 * children's books; the plain word list itself, without any illustrative
 * material, is the most widely-taught, freely-reused early-literacy word
 * set — the same status the Oxford 3000 list held for this app's adult
 * Vocabulary). Sentences here are written originally for this product.
 */
const RAW: Omit<SightWordEntry, "id" | "slug">[] = [
  { word: "a", simpleSentence: "I see a cat." },
  { word: "and", simpleSentence: "I like cats and dogs." },
  { word: "away", simpleSentence: "The bird flew away." },
  { word: "big", simpleSentence: "The elephant is big." },
  { word: "blue", simpleSentence: "The sky is blue." },
  { word: "can", simpleSentence: "I can jump." },
  { word: "come", simpleSentence: "Come and play." },
  { word: "down", simpleSentence: "The rain falls down." },
  { word: "find", simpleSentence: "Can you find it?" },
  { word: "for", simpleSentence: "This gift is for you." },
  { word: "funny", simpleSentence: "The clown is funny." },
  { word: "go", simpleSentence: "Let's go outside." },
  { word: "help", simpleSentence: "Can you help me?" },
  { word: "here", simpleSentence: "Come here, please." },
  { word: "I", simpleSentence: "I like to sing." },
  { word: "in", simpleSentence: "The toy is in the box." },
  { word: "is", simpleSentence: "This is my cat." },
  { word: "it", simpleSentence: "I like it." },
  { word: "jump", simpleSentence: "I can jump high." },
  { word: "little", simpleSentence: "The puppy is little." },
  { word: "look", simpleSentence: "Look at the stars." },
  { word: "make", simpleSentence: "Let's make a cake." },
  { word: "me", simpleSentence: "Give it to me." },
  { word: "my", simpleSentence: "This is my dog." },
  { word: "not", simpleSentence: "That is not mine." },
  { word: "one", simpleSentence: "I have one apple." },
  { word: "play", simpleSentence: "Let's play together." },
  { word: "red", simpleSentence: "The apple is red." },
  { word: "run", simpleSentence: "I like to run." },
  { word: "said", simpleSentence: "She said hello." },
  { word: "see", simpleSentence: "I see a bird." },
  { word: "the", simpleSentence: "The sun is bright." },
  { word: "three", simpleSentence: "I have three toys." },
  { word: "to", simpleSentence: "I go to school." },
  { word: "two", simpleSentence: "I have two hands." },
  { word: "up", simpleSentence: "The balloon goes up." },
  { word: "we", simpleSentence: "We like to play." },
  { word: "where", simpleSentence: "Where is my toy?" },
  { word: "yellow", simpleSentence: "The sun is yellow." },
  { word: "you", simpleSentence: "I see you." },
];

export const SIGHT_WORDS: SightWordEntry[] = RAW.map((entry) => ({
  ...entry,
  id: entry.word.toLowerCase(),
  slug: entry.word.toLowerCase(),
}));

export const SIGHT_WORDS_BY_SLUG: Record<string, SightWordEntry> = Object.fromEntries(
  SIGHT_WORDS.map((s) => [s.slug, s])
);
