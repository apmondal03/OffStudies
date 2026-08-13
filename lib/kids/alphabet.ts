import type { AlphabetLetterEntry } from "@/types/kids";

/**
 * 26 letters with a simple phonics sound hint and two example words each.
 * Standard letter-sound associations taught in early phonics — not any
 * publisher's proprietary content.
 */
const RAW: Omit<AlphabetLetterEntry, "id" | "slug">[] = [
  { letter: "A", soundHint: "/æ/ as in \"apple\"", words: [{ word: "apple", emoji: "🍎" }, { word: "ant", emoji: "🐜" }] },
  { letter: "B", soundHint: "/b/ as in \"ball\"", words: [{ word: "ball", emoji: "⚽" }, { word: "banana", emoji: "🍌" }] },
  { letter: "C", soundHint: "/k/ as in \"cat\"", words: [{ word: "cat", emoji: "🐱" }, { word: "car", emoji: "🚗" }] },
  { letter: "D", soundHint: "/d/ as in \"dog\"", words: [{ word: "dog", emoji: "🐶" }, { word: "duck", emoji: "🦆" }] },
  { letter: "E", soundHint: "/ɛ/ as in \"egg\"", words: [{ word: "egg", emoji: "🥚" }, { word: "elephant", emoji: "🐘" }] },
  { letter: "F", soundHint: "/f/ as in \"fish\"", words: [{ word: "fish", emoji: "🐟" }, { word: "frog", emoji: "🐸" }] },
  { letter: "G", soundHint: "/g/ as in \"goat\"", words: [{ word: "goat", emoji: "🐐" }, { word: "grapes", emoji: "🍇" }] },
  { letter: "H", soundHint: "/h/ as in \"hat\"", words: [{ word: "hat", emoji: "🧢" }, { word: "house", emoji: "🏠" }] },
  { letter: "I", soundHint: "/ɪ/ as in \"igloo\"", words: [{ word: "igloo", emoji: "🧊" }, { word: "ice cream", emoji: "🍦" }] },
  { letter: "J", soundHint: "/dʒ/ as in \"jump\"", words: [{ word: "jump", emoji: "🤸" }, { word: "juice", emoji: "🧃" }] },
  { letter: "K", soundHint: "/k/ as in \"kite\"", words: [{ word: "kite", emoji: "🪁" }, { word: "key", emoji: "🔑" }] },
  { letter: "L", soundHint: "/l/ as in \"lion\"", words: [{ word: "lion", emoji: "🦁" }, { word: "leaf", emoji: "🍃" }] },
  { letter: "M", soundHint: "/m/ as in \"moon\"", words: [{ word: "moon", emoji: "🌙" }, { word: "milk", emoji: "🥛" }] },
  { letter: "N", soundHint: "/n/ as in \"nose\"", words: [{ word: "nose", emoji: "👃" }, { word: "nest", emoji: "🪺" }] },
  { letter: "O", soundHint: "/ɒ/ as in \"octopus\"", words: [{ word: "octopus", emoji: "🐙" }, { word: "orange", emoji: "🍊" }] },
  { letter: "P", soundHint: "/p/ as in \"pig\"", words: [{ word: "pig", emoji: "🐷" }, { word: "pizza", emoji: "🍕" }] },
  { letter: "Q", soundHint: "/kw/ as in \"queen\"", words: [{ word: "queen", emoji: "👸" }, { word: "quilt", emoji: "🛏️" }] },
  { letter: "R", soundHint: "/r/ as in \"rabbit\"", words: [{ word: "rabbit", emoji: "🐰" }, { word: "rainbow", emoji: "🌈" }] },
  { letter: "S", soundHint: "/s/ as in \"sun\"", words: [{ word: "sun", emoji: "☀️" }, { word: "snake", emoji: "🐍" }] },
  { letter: "T", soundHint: "/t/ as in \"tiger\"", words: [{ word: "tiger", emoji: "🐯" }, { word: "tree", emoji: "🌳" }] },
  { letter: "U", soundHint: "/ʌ/ as in \"umbrella\"", words: [{ word: "umbrella", emoji: "☂️" }, { word: "up", emoji: "⬆️" }] },
  { letter: "V", soundHint: "/v/ as in \"van\"", words: [{ word: "van", emoji: "🚐" }, { word: "violin", emoji: "🎻" }] },
  { letter: "W", soundHint: "/w/ as in \"water\"", words: [{ word: "water", emoji: "💧" }, { word: "watermelon", emoji: "🍉" }] },
  { letter: "X", soundHint: "/ks/ as in bo\"x\"", words: [{ word: "box", emoji: "📦" }, { word: "x-ray", emoji: "🩻" }] },
  { letter: "Y", soundHint: "/j/ as in \"yellow\"", words: [{ word: "yellow", emoji: "🟨" }, { word: "yo-yo", emoji: "🪀" }] },
  { letter: "Z", soundHint: "/z/ as in \"zebra\"", words: [{ word: "zebra", emoji: "🦓" }, { word: "zoo", emoji: "🦒" }] },
];

export const ALPHABET: AlphabetLetterEntry[] = RAW.map((entry) => ({
  ...entry,
  id: entry.letter.toLowerCase(),
  slug: entry.letter.toLowerCase(),
}));

export const ALPHABET_BY_SLUG: Record<string, AlphabetLetterEntry> = Object.fromEntries(
  ALPHABET.map((a) => [a.slug, a])
);
