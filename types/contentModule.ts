import type { ComponentType } from "react";
import type { LearningStatus } from "@/types/dictionary";

/**
 * The shared contract every content module implements. A "module" is one
 * learning category — Vocabulary, Phrasal Verbs, and later Grammar, Idioms,
 * Prepositions, etc. Everything generic about how a module plugs into the
 * Stream, progress tracking, and storage lives in `hooks/useModuleStream.ts`
 * and `hooks/useModuleProgress.ts`, which work against this interface only.
 *
 * Two type parameters:
 * - TEntry: the fully-resolved content shown on screen (e.g. WordEntry).
 * - TCandidate: what the selection step picks before resolving (e.g. a
 *   lightweight WordSummary that still needs a dictionary lookup). For
 *   modules where all data is local (like Phrasal Verbs), TCandidate and
 *   TEntry are the same type and `resolveEntry` is just a pass-through —
 *   this is what makes the hook work for both network-backed and fully
 *   local modules without special-casing either.
 */

export interface ModuleSelectionContext<TFilter extends string> {
  filter: TFilter;
  savedSlugs: Set<string>;
  learningSlugs: Set<string>;
  /** Slugs shown recently, most recent last — used to avoid immediate repeats. */
  recentSlugs: string[];
}

export interface ModuleFilterOption<TFilter extends string> {
  value: TFilter;
  label: string;
}

export interface ContentModule<TEntry, TCandidate = TEntry, TFilter extends string = string> {
  /** Stable identifier — also the localStorage namespace and route segment. */
  id: string;
  label: string;
  /** Which curriculum track this belongs to. Only "adult" exists today;
   *  "kids" is reserved for the future Little Learners / Young Learners tracks. */
  track: "adult" | "kids";
  /** Route to this module's full listing/explore page, if it has one. */
  listRoute?: string;
  /** Whether resolving an entry requires a network call (affects whether the
   *  Stream shows offline/retry UI for this module). */
  isNetworkDependent: boolean;

  filters: ModuleFilterOption<TFilter>[];
  defaultFilter: TFilter;

  /** Total entries in this module, for progress percentages. */
  totalCount: () => number;

  /** Pick the next candidate for the Stream, given the active filter and
   *  recent history. Returns null when the filter's pool is empty (e.g. no
   *  saved items yet). */
  selectNext: (ctx: ModuleSelectionContext<TFilter>) => TCandidate | null;

  /** Turn a candidate into the fully-resolved entry to display. For local
   *  modules this is just `async (c) => c`. */
  resolveEntry: (candidate: TCandidate) => Promise<TEntry | null>;

  /** Slug for either a candidate or a resolved entry — used for history,
   *  dedup, and storage keys. */
  getSlug: (item: TEntry | TCandidate) => string;

  /** How one entry renders inside the Stream's card shell. */
  StreamCard: ComponentType<{ entry: TEntry }>;
}

export type ModuleStatusMap = Record<string, LearningStatus>;
