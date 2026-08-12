import type { LearningStatus } from "@/types/dictionary";

/**
 * All persisted app state lives behind this module. Every content module
 * (vocabulary, phrasal verbs, and anything added later — grammar, idioms,
 * prepositions...) shares this ONE implementation, scoped by `moduleId`,
 * instead of each module getting its own copy-pasted set of storage
 * functions. Adding a new module never requires touching this file.
 *
 * If Supabase auth + a database are added later, only this file needs to
 * change — components go through the hooks in `hooks/useModuleProgress.ts`
 * and `hooks/useModuleStream.ts`, never localStorage directly.
 */

function isBrowser() {
  return typeof window !== "undefined";
}

function readJSON<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage can throw in private browsing / when full — fail silently,
    // the app still works, it just won't persist this write.
  }
}

// --- Per-module status (saved / known / learning) ---
//
// Key naming: the two modules that existed before this generic layer was
// introduced (vocabulary, phrasal-verbs) keep their original exact keys so
// nobody's already-saved progress is lost on upgrade. Every module added
// after this point gets the plain `vocab:{moduleId}:*` pattern for free.

const LEGACY_KEYS: Record<string, { status: string; saved: string }> = {
  vocabulary: { status: "vocab:word-status", saved: "vocab:saved" },
  "phrasal-verbs": { status: "vocab:pv-status", saved: "vocab:pv-saved" },
};

function statusKey(moduleId: string): string {
  return LEGACY_KEYS[moduleId]?.status ?? `vocab:${moduleId}:status`;
}

function savedKey(moduleId: string): string {
  return LEGACY_KEYS[moduleId]?.saved ?? `vocab:${moduleId}:saved`;
}

export type StatusMap = Record<string, LearningStatus>;

export function getModuleStatusMap(moduleId: string): StatusMap {
  return readJSON<StatusMap>(statusKey(moduleId), {});
}

export function setModuleStatus(moduleId: string, slug: string, status: LearningStatus | null): StatusMap {
  const map = getModuleStatusMap(moduleId);
  if (status === null) delete map[slug];
  else map[slug] = status;
  writeJSON(statusKey(moduleId), map);
  return map;
}

export function getModuleSavedSlugs(moduleId: string): string[] {
  return readJSON<string[]>(savedKey(moduleId), []);
}

export function toggleModuleSaved(moduleId: string, slug: string): string[] {
  const saved = new Set(getModuleSavedSlugs(moduleId));
  if (saved.has(slug)) saved.delete(slug);
  else saved.add(slug);
  const list = Array.from(saved);
  writeJSON(savedKey(moduleId), list);
  return list;
}

// --- History (currently vocabulary-only; generalize to per-module if a
// second module wants its own history view) ---

export interface HistoryItem {
  slug: string;
  word: string;
  viewedAt: string; // ISO timestamp
}

const HISTORY_LIMIT = 100;
const HISTORY_KEY = "vocab:history";

export function getHistory(): HistoryItem[] {
  return readJSON<HistoryItem[]>(HISTORY_KEY, []);
}

export function addToHistory(item: Omit<HistoryItem, "viewedAt">) {
  const history = getHistory().filter((h) => h.slug !== item.slug);
  history.unshift({ ...item, viewedAt: new Date().toISOString() });
  writeJSON(HISTORY_KEY, history.slice(0, HISTORY_LIMIT));
}

export function clearHistory() {
  writeJSON(HISTORY_KEY, []);
}

// --- Stream preferences ---

export interface StreamPrefs {
  intervalSeconds: number;
  /** Which registered module is active in the Stream. */
  activeModuleId: string;
  /** Per-module filter selection, keyed by moduleId. */
  filterByModule: Record<string, string>;
}

const STREAM_PREFS_KEY = "vocab:stream-prefs";

const DEFAULT_STREAM_PREFS: StreamPrefs = {
  intervalSeconds: 30,
  activeModuleId: "vocabulary",
  filterByModule: { vocabulary: "essential", "phrasal-verbs": "all" },
};

export function getStreamPrefs(): StreamPrefs {
  const stored = readJSON<Partial<StreamPrefs> & Record<string, unknown>>(STREAM_PREFS_KEY, {});

  // Migrate the pre-refactor shape ({ filter, contentType, phrasalVerbFilter })
  // if present, so existing users don't lose their saved preferences.
  const legacyFilter = typeof stored.filter === "string" ? stored.filter : undefined;
  const legacyContentType = typeof stored.contentType === "string" ? stored.contentType : undefined;
  const legacyPvFilter = typeof stored.phrasalVerbFilter === "string" ? stored.phrasalVerbFilter : undefined;

  const filterByModule: Record<string, string> = {
    ...DEFAULT_STREAM_PREFS.filterByModule,
    ...(stored.filterByModule ?? {}),
    ...(legacyFilter ? { vocabulary: legacyFilter } : {}),
    ...(legacyPvFilter ? { "phrasal-verbs": legacyPvFilter } : {}),
  };

  return {
    intervalSeconds: stored.intervalSeconds ?? DEFAULT_STREAM_PREFS.intervalSeconds,
    activeModuleId: stored.activeModuleId ?? legacyContentType ?? DEFAULT_STREAM_PREFS.activeModuleId,
    filterByModule,
  };
}

export function setStreamPrefs(prefs: Partial<StreamPrefs>): StreamPrefs {
  const current = getStreamPrefs();
  const next: StreamPrefs = {
    ...current,
    ...prefs,
    filterByModule: { ...current.filterByModule, ...(prefs.filterByModule ?? {}) },
  };
  writeJSON(STREAM_PREFS_KEY, next);
  return next;
}

export function setModuleFilterPref(moduleId: string, filter: string): StreamPrefs {
  return setStreamPrefs({ filterByModule: { [moduleId]: filter } });
}

// --- Recent searches ---

const RECENT_SEARCH_LIMIT = 8;
const RECENT_SEARCHES_KEY = "vocab:recent-searches";

export function getRecentSearches(): string[] {
  return readJSON<string[]>(RECENT_SEARCHES_KEY, []);
}

export function addRecentSearch(term: string) {
  const trimmed = term.trim();
  if (!trimmed) return getRecentSearches();
  const list = [trimmed, ...getRecentSearches().filter((t) => t.toLowerCase() !== trimmed.toLowerCase())];
  const next = list.slice(0, RECENT_SEARCH_LIMIT);
  writeJSON(RECENT_SEARCHES_KEY, next);
  return next;
}

export function clearRecentSearches() {
  writeJSON(RECENT_SEARCHES_KEY, []);
}
