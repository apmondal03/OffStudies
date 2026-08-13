"use client";

import { useCallback, useState } from "react";

export function useKidsPlayer<T>(items: T[], getSlug: (item: T) => string) {
  const [index, setIndex] = useState(0);

  const current = items[index] ?? null;

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  const previous = useCallback(() => {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);

  const goTo = useCallback(
    (slug: string) => {
      const targetIndex = items.findIndex((item) => getSlug(item) === slug);
      if (targetIndex >= 0) setIndex(targetIndex);
    },
    [items, getSlug]
  );

  return {
    current,
    index,
    total: items.length,
    next,
    previous,
    goTo,
  };
}
