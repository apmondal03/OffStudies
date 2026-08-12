import type { DictionaryProvider } from "./provider";
import { DictionaryProviderError } from "./provider";
import type { WordEntry, Definition, CEFRLevel, SearchSuggestion } from "@/types/dictionary";
import { SAMPLE_WORDS_BY_SLUG } from "./sampleWords";
import { getCoreEntriesByWord, searchCoreList, CORE_3000 } from "./coreList";

const API_BASE = "https://api.dictionaryapi.dev/api/v2/entries/en";
const THESAURUS_BASE = "https://api.datamuse.com/words";

function slugify(word: string): string {
  return word
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * A handful of Core 3000 entries are multi-word phrases or forms the Free
 * Dictionary API can't look up directly (e.g. "a / an", "have to"). We
 * still want them explorable, so we query a close single-word stand-in
 * while keeping the ORIGINAL phrase as the displayed headword (see
 * `normalize`, which prefers the caller's `word` over whatever the API
 * echoes back).
 */
const QUERY_OVERRIDES: Record<string, string> = {
  "a / an": "a",
  "according to": "according",
  "all right": "alright",
  "have to": "have",
  "next to": "next",
  "no one": "nobody",
  "used to": "use",
};

// --- Types for the raw Free Dictionary API response (subset we use) ---
interface ApiPhonetic {
  text?: string;
  audio?: string;
}
interface ApiDefinition {
  definition: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
}
interface ApiMeaning {
  partOfSpeech: string;
  definitions: ApiDefinition[];
  synonyms?: string[];
  antonyms?: string[];
}
interface ApiEntry {
  word: string;
  phonetic?: string;
  phonetics?: ApiPhonetic[];
  meanings: ApiMeaning[];
}

interface DatamuseWord {
  word: string;
}

/**
 * Best-effort thesaurus enrichment via the free, keyless Datamuse API.
 * Datamuse returns purely relational word-association data (no editorial
 * text, nothing copyrighted to reproduce), so it's a safe way to broaden
 * the synonym/antonym list beyond whatever the dictionary entry itself
 * included. Failures here are non-fatal — the word still renders fine
 * without this extra layer.
 */
async function fetchThesaurusWords(word: string, relation: "syn" | "ant"): Promise<string[]> {
  try {
    const res = await fetch(`${THESAURUS_BASE}?rel_${relation}=${encodeURIComponent(word)}&max=12`, {
      next: { revalidate: 60 * 60 * 24 },
      signal: AbortSignal.timeout(3500),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as DatamuseWord[];
    return data.map((d) => d.word).filter((w) => /^[a-z-]+$/i.test(w));
  } catch {
    return [];
  }
}

function normalize(word: string, entries: ApiEntry[], extraSynonyms: string[], extraAntonyms: string[]): WordEntry {
  const slug = slugify(word);
  const coreMatches = getCoreEntriesByWord(word);
  const cefrLevel: CEFRLevel = (coreMatches[0]?.cefrLevel as CEFRLevel) ?? "B1";

  // Gather phonetics: prefer entries with audio, distinguish US/UK loosely by audio filename.
  let phoneticUS: string | undefined;
  let phoneticUK: string | undefined;
  let audioUS: string | undefined;
  let audioUK: string | undefined;
  const fallbackPhonetic = entries[0]?.phonetic;

  for (const entry of entries) {
    for (const p of entry.phonetics ?? []) {
      if (!p.audio) {
        if (!phoneticUS && p.text) phoneticUS = p.text;
        continue;
      }
      const isUS = /-us\.mp3$/i.test(p.audio);
      const isUK = /-uk\.mp3$/i.test(p.audio);
      if (isUS && !audioUS) {
        audioUS = p.audio;
        phoneticUS = p.text ?? phoneticUS;
      } else if (isUK && !audioUK) {
        audioUK = p.audio;
        phoneticUK = p.text ?? phoneticUK;
      } else if (!audioUS) {
        audioUS = p.audio;
        phoneticUS = p.text ?? phoneticUS;
      }
    }
  }

  const definitions: Definition[] = [];
  const allSynonyms = new Set<string>();
  const allAntonyms = new Set<string>();
  const allExamples: string[] = [];

  entries.forEach((entry, entryIdx) => {
    entry.meanings.forEach((meaning, meaningIdx) => {
      meaning.definitions.slice(0, 4).forEach((def, defIdx) => {
        const id = `${slug}-${entryIdx}-${meaningIdx}-${defIdx}`;
        definitions.push({
          id,
          partOfSpeech: meaning.partOfSpeech,
          meaning: def.definition,
          examples: def.example ? [def.example] : undefined,
          synonyms: def.synonyms?.length ? def.synonyms : undefined,
          antonyms: def.antonyms?.length ? def.antonyms : undefined,
        });
        def.synonyms?.forEach((s) => allSynonyms.add(s));
        def.antonyms?.forEach((a) => allAntonyms.add(a));
        if (def.example) allExamples.push(def.example);
      });
      meaning.synonyms?.forEach((s) => allSynonyms.add(s));
      meaning.antonyms?.forEach((a) => allAntonyms.add(a));
    });
  });

  // Merge in Datamuse thesaurus results after the dictionary's own
  // synonyms/antonyms, so directly-sourced data is prioritized first.
  extraSynonyms.forEach((s) => allSynonyms.add(s));
  extraAntonyms.forEach((a) => allAntonyms.add(a));
  allSynonyms.delete(word.toLowerCase());
  allAntonyms.delete(word.toLowerCase());

  const primaryPartOfSpeech =
    coreMatches[0]?.partOfSpeech ?? definitions[0]?.partOfSpeech ?? "unknown";

  return {
    id: slug,
    // Prefer the phrase/word we were actually asked to display (handles
    // QUERY_OVERRIDES cases where the API only saw a stand-in word).
    word: word || entries[0]?.word || word,
    slug,
    partOfSpeech: primaryPartOfSpeech,
    cefrLevel,
    phoneticUS: phoneticUS ?? fallbackPhonetic,
    phoneticUK,
    audioUS,
    audioUK,
    definitions,
    synonyms: allSynonyms.size ? Array.from(allSynonyms).slice(0, 12) : undefined,
    antonyms: allAntonyms.size ? Array.from(allAntonyms).slice(0, 10) : undefined,
    examples: allExamples.length ? allExamples.slice(0, 8) : undefined,
    tags: ["core-3000"],
  };
}

async function fetchFromApi(word: string): Promise<ApiEntry[] | null> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/${encodeURIComponent(word)}`, {
      // Free Dictionary API responses are stable enough to cache for a while.
      next: { revalidate: 60 * 60 * 24 },
      signal: AbortSignal.timeout(6000),
    });
  } catch {
    // Genuine network failure (DNS, offline, CORS, timeout) — distinct from
    // a real "word not found" 404 so the UI can react appropriately.
    throw new DictionaryProviderError("Could not reach the dictionary service.", "NETWORK_ERROR");
  }

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new DictionaryProviderError(`Dictionary API responded with ${res.status}`, "NETWORK_ERROR");
  }
  return (await res.json()) as ApiEntry[];
}

// In-memory cache so navigating around the Stream/Explore/word pages never
// refetches the same word twice in a session, and concurrent requests for
// the same word share a single in-flight promise instead of firing twice.
const wordCache = new Map<string, WordEntry | null>();
const inFlight = new Map<string, Promise<WordEntry | null>>();

/**
 * Resolves a word directly against the external APIs. Safe to call from
 * anywhere Node's `fetch` runs — Server Components, Route Handlers, or
 * client code (though client code should prefer `getWord` below, which
 * routes through our own same-origin API route instead of calling
 * third-party APIs directly from the browser).
 */
export async function resolveWordOnServer(word: string): Promise<WordEntry | null> {
  const slug = slugify(word);

  if (SAMPLE_WORDS_BY_SLUG[slug]) {
    return SAMPLE_WORDS_BY_SLUG[slug];
  }

  if (wordCache.has(slug)) {
    return wordCache.get(slug) ?? null;
  }

  const existing = inFlight.get(slug);
  if (existing) return existing;

  const queryTerm = QUERY_OVERRIDES[word.toLowerCase()] ?? word;

  const promise = (async () => {
    try {
      const [apiEntries, extraSynonyms, extraAntonyms] = await Promise.all([
        fetchFromApi(queryTerm),
        fetchThesaurusWords(queryTerm, "syn"),
        fetchThesaurusWords(queryTerm, "ant"),
      ]);
      if (!apiEntries || apiEntries.length === 0) {
        wordCache.set(slug, null);
        return null;
      }
      const result = normalize(word, apiEntries, extraSynonyms, extraAntonyms);
      wordCache.set(slug, result);
      return result;
    } finally {
      inFlight.delete(slug);
    }
  })();

  inFlight.set(slug, promise);
  return promise;
}

// Separate, smaller cache for the browser-side path (calls our own API
// route rather than external APIs directly — see `getWord` below).
const clientWordCache = new Map<string, WordEntry | null>();
const clientInFlight = new Map<string, Promise<WordEntry | null>>();

async function resolveWordViaApiRoute(word: string): Promise<WordEntry | null> {
  const slug = slugify(word);

  if (SAMPLE_WORDS_BY_SLUG[slug]) return SAMPLE_WORDS_BY_SLUG[slug];
  if (clientWordCache.has(slug)) return clientWordCache.get(slug) ?? null;

  const existing = clientInFlight.get(slug);
  if (existing) return existing;

  const promise = (async () => {
    try {
      let res: Response;
      try {
        res = await fetch(`/api/word/${encodeURIComponent(word)}`, {
          signal: AbortSignal.timeout(8000),
        });
      } catch {
        throw new DictionaryProviderError("Could not reach the dictionary service.", "NETWORK_ERROR");
      }

      if (res.status === 404) {
        clientWordCache.set(slug, null);
        return null;
      }
      if (!res.ok) {
        throw new DictionaryProviderError(`Dictionary route responded with ${res.status}`, "NETWORK_ERROR");
      }
      const result = (await res.json()) as WordEntry;
      clientWordCache.set(slug, result);
      return result;
    } finally {
      clientInFlight.delete(slug);
    }
  })();

  clientInFlight.set(slug, promise);
  return promise;
}

export const freeDictionaryProvider: DictionaryProvider = {
  async getWord(word: string): Promise<WordEntry | null> {
    // Server (Server Components, Route Handlers): call the external APIs
    // directly — no CORS involved in server-to-server requests, and this
    // path benefits from Next.js's server-side fetch cache.
    if (typeof window === "undefined") {
      return resolveWordOnServer(word);
    }
    // Browser: go through our own same-origin API route instead of
    // hitting third-party APIs directly, which avoids CORS/ad-blocker
    // fragility and lets every visitor share the server-side cache.
    return resolveWordViaApiRoute(word);
  },

  async searchWords(query: string): Promise<SearchSuggestion[]> {
    return searchCoreList(query, 30);
  },

  async getSuggestions(query: string): Promise<SearchSuggestion[]> {
    return searchCoreList(query, 8);
  },
};

export function isKnownCoreWord(word: string): boolean {
  return getCoreEntriesByWord(word).length > 0;
}

export function totalCoreWordCount(): number {
  return CORE_3000.length;
}
