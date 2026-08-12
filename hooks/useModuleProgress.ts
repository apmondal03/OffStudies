"use client";

import { useCallback, useEffect, useState } from "react";
import type { LearningStatus } from "@/types/dictionary";
import {
  getModuleStatusMap,
  setModuleStatus,
  getModuleSavedSlugs,
  toggleModuleSaved,
  type StatusMap,
} from "@/lib/storage";

/**
 * Saved / known / learning state for ANY content module, keyed by
 * `moduleId`. This is the single implementation every module's progress UI
 * uses — adding a new module never means writing a new progress hook.
 */
export function useModuleProgress(moduleId: string, totalCount: number) {
  const [statusMap, setStatusMapState] = useState<StatusMap>({});
  const [savedSlugs, setSavedSlugsState] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setStatusMapState(getModuleStatusMap(moduleId));
    setSavedSlugsState(new Set(getModuleSavedSlugs(moduleId)));
    setHydrated(true);
  }, [moduleId]);

  const setStatus = useCallback(
    (slug: string, status: LearningStatus | null) => {
      const next = setModuleStatus(moduleId, slug, status);
      setStatusMapState({ ...next });
    },
    [moduleId]
  );

  const toggleKnown = useCallback(
    (slug: string) => setStatus(slug, statusMap[slug] === "known" ? null : "known"),
    [statusMap, setStatus]
  );

  const toggleLearning = useCallback(
    (slug: string) => setStatus(slug, statusMap[slug] === "learning" ? null : "learning"),
    [statusMap, setStatus]
  );

  const toggleSaved = useCallback(
    (slug: string) => {
      const next = toggleModuleSaved(moduleId, slug);
      setSavedSlugsState(new Set(next));
    },
    [moduleId]
  );

  const getStatus = useCallback(
    (slug: string): LearningStatus => statusMap[slug] ?? "unseen",
    [statusMap]
  );

  const isSaved = useCallback((slug: string) => savedSlugs.has(slug), [savedSlugs]);

  const known = Object.values(statusMap).filter((s) => s === "known").length;
  const learning = Object.values(statusMap).filter((s) => s === "learning").length;

  const learningSlugs = new Set(
    Object.entries(statusMap)
      .filter(([, status]) => status === "learning")
      .map(([slug]) => slug)
  );

  return {
    hydrated,
    statusMap,
    savedSlugs,
    learningSlugs,
    progress: {
      total: totalCount,
      known,
      learning,
      unseen: Math.max(0, totalCount - known - learning),
      knownPct: totalCount ? Math.round((known / totalCount) * 100) : 0,
      learningPct: totalCount ? Math.round((learning / totalCount) * 100) : 0,
    },
    getStatus,
    isSaved,
    setStatus,
    toggleKnown,
    toggleLearning,
    toggleSaved,
  };
}
