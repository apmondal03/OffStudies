import type { YoungGrammarPoint } from "@/types/youngLearner";

/**
 * 20 grammar concepts written for a 7-12 year old audience — much simpler
 * and more playful than the adult Grammar module (no CEFR references, no
 * formal terminology beyond the basics). All original content.
 */
const RAW: Omit<YoungGrammarPoint, "id" | "slug">[] = [
  { title: "Nouns", category: "word-types",
    explanation: "A noun is a naming word. It names a person, a place, or a thing.",
    examples: ["teacher (person)", "school (place)", "backpack (thing)"],
    funFact: "Your name is a noun too — it's a special kind called a proper noun!" },
  { title: "Verbs", category: "word-types",
    explanation: "A verb is an action word. It tells you what someone or something is doing.",
    examples: ["run", "jump", "she sings"],
    funFact: "Every full sentence needs a verb — without one, it's not really a sentence!" },
  { title: "Adjectives", category: "word-types",
    explanation: "An adjective is a describing word. It tells you more about a noun.",
    examples: ["a tall tree", "a funny joke", "the red ball"],
    funFact: "You can stack adjectives: 'a big, red, bouncy ball.'" },
  { title: "Adverbs", category: "word-types",
    explanation: "An adverb describes a verb — it tells you how something is done. Many end in -ly.",
    examples: ["She ran quickly.", "He spoke softly.", "They played happily."] },
  { title: "Pronouns", category: "word-types",
    explanation: "A pronoun takes the place of a noun so you don't have to repeat it.",
    examples: ["He, she, it, they", "\"Sam is tired. He wants to rest.\""],
    funFact: "Without pronouns, we'd have to say a name over and over — imagine how boring that'd sound!" },
  { title: "Plural Nouns", category: "word-types",
    explanation: "To talk about more than one thing, most nouns just add -s or -es.",
    examples: ["one cat → two cats", "one box → two boxes", "one dog → three dogs"] },
  { title: "Synonyms", category: "word-types",
    explanation: "Synonyms are different words that mean almost the same thing.",
    examples: ["happy = glad", "big = large", "fast = quick"] },
  { title: "Antonyms", category: "word-types",
    explanation: "Antonyms are words that mean the opposite of each other.",
    examples: ["hot and cold", "up and down", "day and night"] },
  { title: "Compound Words", category: "word-types",
    explanation: "A compound word is made by joining two smaller words together.",
    examples: ["sun + flower = sunflower", "back + pack = backpack", "rain + bow = rainbow"] },
  { title: "Contractions", category: "word-types",
    explanation: "A contraction squishes two words together and uses an apostrophe (') to show where letters are missing.",
    examples: ["do not becomes don't", "it is becomes it's", "I am becomes I'm"],
    funFact: "The apostrophe shows exactly where letters were removed." },
  { title: "Simple Sentences", category: "sentences",
    explanation: "A simple sentence has a subject (who or what) and a verb (what they do).",
    examples: ["The dog barks.", "I read.", "Birds fly."] },
  { title: "Question Words", category: "sentences",
    explanation: "Who, What, Where, When, Why, and How are used to ask questions.",
    examples: ["Who is that?", "Where do you live?", "Why is the sky blue?"] },
  { title: "Compound Sentences", category: "sentences",
    explanation: "A compound sentence joins two simple sentences together, usually with a word like 'and,' 'but,' or 'or.'",
    examples: ["I like cats, and I like dogs.", "It was raining, but we still played."] },
  { title: "Subject and Predicate", category: "sentences",
    explanation: "Every sentence has a subject (who or what it's about) and a predicate (what they do or are).",
    examples: ["The little puppy chased its tail.", "My sister loves to paint."] },
  { title: "Capital Letters", category: "punctuation",
    explanation: "Use a capital letter at the start of every sentence, for names of people and places, and for the word 'I.'",
    examples: ["My name is Maya.", "We live in Texas.", "I am ready."] },
  { title: "End Punctuation", category: "punctuation",
    explanation: "Every sentence ends with a punctuation mark: a period (.) for statements, a question mark (?) for questions, and an exclamation mark (!) for excitement.",
    examples: ["I like pizza.", "Do you like pizza?", "I love pizza!"] },
  { title: "Commas in a List", category: "punctuation",
    explanation: "Use commas to separate items when you list three or more things.",
    examples: ["I packed a hat, sunscreen, and a towel.", "We saw lions, tigers, and bears."] },
  { title: "Apostrophes for Ownership", category: "punctuation",
    explanation: "Add 's to a name or noun to show that something belongs to it.",
    examples: ["Mia's backpack", "the dog's bone", "the teacher's desk"],
    funFact: "This is a different job for the apostrophe than in contractions!" },
  { title: "Rhyming Words", category: "word-play",
    explanation: "Rhyming words end with the same sound, even if they're spelled differently.",
    examples: ["cat, hat, bat", "light, kite, night", "blue, shoe, true"] },
  { title: "Alphabetical Order", category: "word-play",
    explanation: "Putting words in alphabetical order means arranging them the same way the alphabet goes, A to Z, based on the first letter (or the next letter if the first ones match).",
    examples: ["apple, banana, cherry", "cat, cow, cup"] },
];

export const YOUNG_GRAMMAR: YoungGrammarPoint[] = RAW.map((entry) => {
  const slug = entry.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return { ...entry, id: slug, slug };
});

export const YOUNG_GRAMMAR_BY_SLUG: Record<string, YoungGrammarPoint> = Object.fromEntries(
  YOUNG_GRAMMAR.map((g) => [g.slug, g])
);
