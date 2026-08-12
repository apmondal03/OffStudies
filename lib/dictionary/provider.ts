import type { WordEntry, SearchSuggestion } from "@/types/dictionary";

/**
 * The UI must never talk to a specific external API directly — it talks to
 * this interface. Today `freeDictionaryProvider` implements it using the
 * public Free Dictionary API. Later this could be swapped for an internal
 * database, a licensed API, or a hybrid (local Core 3000 metadata + remote
 * definitions) without touching any component.
 */
export interface DictionaryProvider {
  /** Fetch full detail for a single word. Returns null if not found. */
  getWord(word: string): Promise<WordEntry | null>;

  /** Full-text search across the dictionary (used by /explore and search bar results). */
  searchWords(query: string): Promise<SearchSuggestion[]>;

  /** Lightweight autocomplete suggestions, optimized for typing latency. */
  getSuggestions(query: string): Promise<SearchSuggestion[]>;
}

export class DictionaryProviderError extends Error {
  constructor(
    message: string,
    public readonly code: "NOT_FOUND" | "NETWORK_ERROR" | "UNKNOWN" = "UNKNOWN"
  ) {
    super(message);
    this.name = "DictionaryProviderError";
  }
}
