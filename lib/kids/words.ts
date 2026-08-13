import type { KidsWordEntry } from "@/types/kids";

function slugify(word: string): string {
  return word.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/**
 * ~85 first words across 11 everyday topics, each with an emoji (no image
 * generation needed — emoji are universally supported and instantly
 * recognizable for pre-readers) and a short original sentence.
 */
const RAW: Omit<KidsWordEntry, "id" | "slug">[] = [
  // Animals
  { word: "cat", emoji: "🐱", category: "animals", simpleSentence: "The cat says meow." },
  { word: "dog", emoji: "🐶", category: "animals", simpleSentence: "The dog says woof." },
  { word: "fish", emoji: "🐟", category: "animals", simpleSentence: "The fish swims in water." },
  { word: "bird", emoji: "🐦", category: "animals", simpleSentence: "The bird can fly." },
  { word: "lion", emoji: "🦁", category: "animals", simpleSentence: "The lion is big and strong." },
  { word: "elephant", emoji: "🐘", category: "animals", simpleSentence: "The elephant has a long trunk." },
  { word: "rabbit", emoji: "🐰", category: "animals", simpleSentence: "The rabbit hops fast." },
  { word: "bear", emoji: "🐻", category: "animals", simpleSentence: "The bear likes honey." },
  { word: "duck", emoji: "🦆", category: "animals", simpleSentence: "The duck says quack." },
  { word: "frog", emoji: "🐸", category: "animals", simpleSentence: "The frog jumps high." },

  // Colors
  { word: "red", emoji: "🟥", category: "colors", simpleSentence: "The apple is red." },
  { word: "blue", emoji: "🟦", category: "colors", simpleSentence: "The sky is blue." },
  { word: "green", emoji: "🟩", category: "colors", simpleSentence: "The grass is green." },
  { word: "yellow", emoji: "🟨", category: "colors", simpleSentence: "The sun is yellow." },
  { word: "orange", emoji: "🟧", category: "colors", simpleSentence: "The orange is orange." },
  { word: "purple", emoji: "🟪", category: "colors", simpleSentence: "The grapes are purple." },
  { word: "black", emoji: "⬛", category: "colors", simpleSentence: "The night sky is black." },
  { word: "white", emoji: "⬜", category: "colors", simpleSentence: "The snow is white." },

  // Numbers
  { word: "one", emoji: "1️⃣", category: "numbers", simpleSentence: "I have one nose." },
  { word: "two", emoji: "2️⃣", category: "numbers", simpleSentence: "I have two eyes." },
  { word: "three", emoji: "3️⃣", category: "numbers", simpleSentence: "There are three cats." },
  { word: "four", emoji: "4️⃣", category: "numbers", simpleSentence: "The dog has four legs." },
  { word: "five", emoji: "5️⃣", category: "numbers", simpleSentence: "I have five fingers." },
  { word: "six", emoji: "6️⃣", category: "numbers", simpleSentence: "There are six eggs." },
  { word: "seven", emoji: "7️⃣", category: "numbers", simpleSentence: "There are seven days in a week." },
  { word: "eight", emoji: "8️⃣", category: "numbers", simpleSentence: "The spider has eight legs." },
  { word: "nine", emoji: "9️⃣", category: "numbers", simpleSentence: "Count to nine." },
  { word: "ten", emoji: "🔟", category: "numbers", simpleSentence: "I have ten toes." },

  // Shapes
  { word: "circle", emoji: "⭕", category: "shapes", simpleSentence: "The wheel is a circle." },
  { word: "square", emoji: "◼️", category: "shapes", simpleSentence: "The box is a square." },
  { word: "triangle", emoji: "🔺", category: "shapes", simpleSentence: "The roof is a triangle." },
  { word: "star", emoji: "⭐", category: "shapes", simpleSentence: "The star shines at night." },
  { word: "heart", emoji: "❤️", category: "shapes", simpleSentence: "The heart shape means love." },

  // Family
  { word: "mom", emoji: "👩", category: "family", simpleSentence: "Mom gives me a hug." },
  { word: "dad", emoji: "👨", category: "family", simpleSentence: "Dad reads me a story." },
  { word: "baby", emoji: "👶", category: "family", simpleSentence: "The baby is sleeping." },
  { word: "sister", emoji: "👧", category: "family", simpleSentence: "My sister likes to play." },
  { word: "brother", emoji: "👦", category: "family", simpleSentence: "My brother is fast." },
  { word: "grandma", emoji: "👵", category: "family", simpleSentence: "Grandma bakes cookies." },
  { word: "grandpa", emoji: "👴", category: "family", simpleSentence: "Grandpa tells funny jokes." },

  // Food
  { word: "apple", emoji: "🍎", category: "food", simpleSentence: "I eat an apple." },
  { word: "banana", emoji: "🍌", category: "food", simpleSentence: "The banana is yellow." },
  { word: "milk", emoji: "🥛", category: "food", simpleSentence: "I drink milk." },
  { word: "bread", emoji: "🍞", category: "food", simpleSentence: "We eat bread." },
  { word: "egg", emoji: "🥚", category: "food", simpleSentence: "The egg is white." },
  { word: "cheese", emoji: "🧀", category: "food", simpleSentence: "I like cheese." },
  { word: "cookie", emoji: "🍪", category: "food", simpleSentence: "The cookie is sweet." },
  { word: "water", emoji: "💧", category: "food", simpleSentence: "I drink water." },
  { word: "juice", emoji: "🧃", category: "food", simpleSentence: "The juice is cold." },
  { word: "pizza", emoji: "🍕", category: "food", simpleSentence: "We eat pizza for dinner." },

  // Body
  { word: "eyes", emoji: "👀", category: "body", simpleSentence: "I see with my eyes." },
  { word: "nose", emoji: "👃", category: "body", simpleSentence: "I smell with my nose." },
  { word: "mouth", emoji: "👄", category: "body", simpleSentence: "I eat with my mouth." },
  { word: "hands", emoji: "🤚", category: "body", simpleSentence: "I clap my hands." },
  { word: "feet", emoji: "🦶", category: "body", simpleSentence: "I walk with my feet." },
  { word: "ears", emoji: "👂", category: "body", simpleSentence: "I hear with my ears." },
  { word: "hair", emoji: "💇", category: "body", simpleSentence: "I brush my hair." },

  // Clothes
  { word: "shirt", emoji: "👕", category: "clothes", simpleSentence: "I wear a shirt." },
  { word: "pants", emoji: "👖", category: "clothes", simpleSentence: "I wear pants." },
  { word: "shoes", emoji: "👟", category: "clothes", simpleSentence: "I put on my shoes." },
  { word: "hat", emoji: "🧢", category: "clothes", simpleSentence: "I wear a hat outside." },
  { word: "socks", emoji: "🧦", category: "clothes", simpleSentence: "My socks are warm." },
  { word: "dress", emoji: "👗", category: "clothes", simpleSentence: "She wears a pretty dress." },

  // Vehicles
  { word: "car", emoji: "🚗", category: "vehicles", simpleSentence: "We ride in the car." },
  { word: "bus", emoji: "🚌", category: "vehicles", simpleSentence: "The bus takes us to school." },
  { word: "train", emoji: "🚂", category: "vehicles", simpleSentence: "The train goes choo choo." },
  { word: "plane", emoji: "✈️", category: "vehicles", simpleSentence: "The plane flies in the sky." },
  { word: "boat", emoji: "⛵", category: "vehicles", simpleSentence: "The boat floats on water." },
  { word: "bike", emoji: "🚲", category: "vehicles", simpleSentence: "I ride my bike." },

  // Weather
  { word: "sun", emoji: "☀️", category: "weather", simpleSentence: "The sun is bright." },
  { word: "rain", emoji: "🌧️", category: "weather", simpleSentence: "The rain falls down." },
  { word: "cloud", emoji: "☁️", category: "weather", simpleSentence: "The cloud is soft and white." },
  { word: "snow", emoji: "❄️", category: "weather", simpleSentence: "The snow is cold." },
  { word: "wind", emoji: "💨", category: "weather", simpleSentence: "The wind blows the leaves." },

  // Actions
  { word: "run", emoji: "🏃", category: "actions", simpleSentence: "I like to run." },
  { word: "jump", emoji: "🤸", category: "actions", simpleSentence: "I can jump high." },
  { word: "eat", emoji: "🍽️", category: "actions", simpleSentence: "It's time to eat." },
  { word: "sleep", emoji: "😴", category: "actions", simpleSentence: "I sleep at night." },
  { word: "walk", emoji: "🚶", category: "actions", simpleSentence: "We walk to the park." },
  { word: "sing", emoji: "🎤", category: "actions", simpleSentence: "I like to sing." },
  { word: "dance", emoji: "💃", category: "actions", simpleSentence: "Let's dance together." },
  { word: "drink", emoji: "🥤", category: "actions", simpleSentence: "I drink my juice." },
  { word: "laugh", emoji: "😄", category: "actions", simpleSentence: "The joke makes me laugh." },
  { word: "cry", emoji: "😢", category: "actions", simpleSentence: "The baby will cry when hungry." },
];

export const KIDS_WORDS: KidsWordEntry[] = RAW.map((entry) => {
  const slug = slugify(entry.word);
  return { ...entry, id: slug, slug };
});

export const KIDS_WORDS_BY_SLUG: Record<string, KidsWordEntry> = Object.fromEntries(
  KIDS_WORDS.map((w) => [w.slug, w])
);
