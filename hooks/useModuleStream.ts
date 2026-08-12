"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ContentModule } from "@/types/contentModule";

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 600;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface UseModuleStreamOptions<TEntry, TCandidate, TFilter extends string> {
  module: ContentModule<TEntry, TCandidate, TFilter>;
  filter: TFilter;
  intervalSeconds: number;
  autoStart?: boolean;
  savedSlugs: Set<string>;
  learningSlugs: Set<string>;
}

/**
 * Drives the Word Stream for ANY registered content module: timer,
 * selection, history navigation, retry-on-network-failure. This single
 * implementation replaces what used to be a bespoke hook per module
 * (`useWordStream`, `usePhrasalVerbStream`) — a module only needs to
 * implement `ContentModule` (selection + resolution + a card component);
 * everything about running it inside the Stream is handled here once.
 */
export function useModuleStream<TEntry, TCandidate, TFilter extends string>({
  module,
  filter,
  intervalSeconds,
  autoStart = true,
  savedSlugs,
  learningSlugs,
}: UseModuleStreamOptions<TEntry, TCandidate, TFilter>) {
  const [entry, setEntry] = useState<TEntry | null>(null);
  const [loading, setLoading] = useState(true);
  // "not-found": genuinely absent from this module's data.
  // "offline": couldn't reach the network for a network-dependent module.
  // "empty": the filtered pool itself has nothing in it (e.g. no saved items yet).
  const [resultStatus, setResultStatus] = useState<"ok" | "not-found" | "offline" | "empty">("ok");
  const [paused, setPaused] = useState(!autoStart);
  const [secondsLeft, setSecondsLeft] = useState(intervalSeconds);
  const [canGoBack, setCanGoBack] = useState(false);

  const historyRef = useRef<TCandidate[]>([]);
  const indexRef = useRef(-1);
  const requestIdRef = useRef(0);

  // If the caller flips autoStart on after mount (e.g. once saved
  // preferences finish loading from localStorage), make sure the stream
  // actually starts playing instead of staying paused forever.
  useEffect(() => {
    if (autoStart) setPaused(false);
  }, [autoStart]);

  const loadCandidate = useCallback(async (candidate: TCandidate) => {
    const requestId = ++requestIdRef.current;
    setLoading(true);
    setResultStatus("ok");

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const result = await module.resolveEntry(candidate);
        if (requestId !== requestIdRef.current) return; // stale response
        if (!result) {
          setResultStatus("not-found");
          setEntry(null);
        } else {
          setResultStatus("ok");
          setEntry(result);
        }
        break;
      } catch {
        if (requestId !== requestIdRef.current) return;

        if (module.isNetworkDependent && attempt < MAX_RETRIES) {
          await delay(RETRY_DELAY_MS * (attempt + 1));
          if (requestId !== requestIdRef.current) return;
          continue;
        }

        setResultStatus(module.isNetworkDependent ? "offline" : "not-found");
        setEntry(null);
        break;
      }
    }

    if (requestId === requestIdRef.current) setLoading(false);
  }, [module]);

  const advance = useCallback(() => {
    if (indexRef.current < historyRef.current.length - 1) {
      indexRef.current += 1;
      loadCandidate(historyRef.current[indexRef.current]);
      setSecondsLeft(intervalSeconds);
      setCanGoBack(indexRef.current > 0);
      return;
    }

    const next = module.selectNext({
      filter,
      savedSlugs,
      learningSlugs,
      recentSlugs: historyRef.current.map((c) => module.getSlug(c)),
    });
    if (!next) {
      setResultStatus("empty");
      setEntry(null);
      return;
    }
    historyRef.current.push(next);
    indexRef.current = historyRef.current.length - 1;
    loadCandidate(next);
    setSecondsLeft(intervalSeconds);
    setCanGoBack(indexRef.current > 0);
  }, [module, filter, intervalSeconds, savedSlugs, learningSlugs, loadCandidate]);

  const previous = useCallback(() => {
    if (indexRef.current <= 0) return;
    indexRef.current -= 1;
    loadCandidate(historyRef.current[indexRef.current]);
    setSecondsLeft(intervalSeconds);
    setCanGoBack(indexRef.current > 0);
  }, [intervalSeconds, loadCandidate]);

  const retry = useCallback(() => {
    const candidate = historyRef.current[indexRef.current];
    if (candidate) loadCandidate(candidate);
  }, [loadCandidate]);

  const restartTimer = useCallback(() => setSecondsLeft(intervalSeconds), [intervalSeconds]);
  const togglePause = useCallback(() => setPaused((p) => !p), []);

  // Reset history and pick a fresh entry whenever the module or filter changes.
  useEffect(() => {
    historyRef.current = [];
    indexRef.current = -1;
    setCanGoBack(false);
    advance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [module.id, filter]);

  // Countdown ticking. Continues even through offline/not-found so the
  // stream naturally moves on to try something else rather than getting
  // stuck waiting for user action.
  useEffect(() => {
    if (paused || loading) return;
    if (secondsLeft <= 0) {
      advance();
      return;
    }
    const timeout = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timeout);
  }, [secondsLeft, paused, loading, advance]);

  // Interval length changed — reset countdown so the new duration takes effect.
  useEffect(() => {
    setSecondsLeft(intervalSeconds);
  }, [intervalSeconds]);

  return {
    entry,
    loading,
    notFound: resultStatus === "not-found",
    offline: resultStatus === "offline",
    empty: resultStatus === "empty",
    paused,
    secondsLeft,
    canGoBack,
    next: advance,
    previous,
    retry,
    togglePause,
    restartTimer,
  };
}
