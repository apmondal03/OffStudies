import coreListRaw from "@/data/core-3000.json";
import type { WordSummary, SearchSuggestion } from "@/types/dictionary";

export const CORE_3000: WordSummary[] = coreListRaw as WordSummary[];

const bySlug = new Map<string, WordSummary>();
const byWordLower = new Map<string, WordSummary[]>();

for (const entry of CORE_3000) {
  bySlug.set(entry.slug, entry);
  const key = entry.word.toLowerCase();
  const list = byWordLower.get(key) ?? [];
  list.push(entry);
  byWordLower.set(key, list);
}

export function getCoreEntryBySlug(slug: string): WordSummary | undefined {
  return bySlug.get(slug);
}

export function getCoreEntriesByWord(word: string): WordSummary[] {
  return byWordLower.get(word.toLowerCase()) ?? [];
}

export function searchCoreList(query: string, limit = 20): SearchSuggestion[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const starts: WordSummary[] = [];
  const contains: WordSummary[] = [];

  for (const entry of CORE_3000) {
    const w = entry.word.toLowerCase();
    if (w.startsWith(q)) starts.push(entry);
    else if (w.includes(q)) contains.push(entry);
    if (starts.length >= limit) break;
  }

  const combined = [...starts, ...contains].slice(0, limit);
  return combined.map((e) => ({
    word: e.word,
    slug: e.slug,
    partOfSpeech: e.partOfSpeech,
    cefrLevel: e.cefrLevel,
  }));
}

export function getProgressTotals() {
  return { total: CORE_3000.length };
}
