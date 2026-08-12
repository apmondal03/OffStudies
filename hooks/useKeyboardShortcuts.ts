"use client";

import { useEffect } from "react";

type ShortcutMap = Record<string, (e: KeyboardEvent) => void>;

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || target.isContentEditable;
}

/**
 * Registers global keyboard shortcuts. Keys are matched on `event.key`
 * (e.g. " " for space, "ArrowRight", "s"). Shortcuts never fire while the
 * user is typing inside an input, textarea, or contenteditable element.
 */
export function useKeyboardShortcuts(shortcuts: ShortcutMap, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    function handler(e: KeyboardEvent) {
      if (isTypingTarget(e.target)) return;
      const key = e.key === " " ? "Space" : e.key;
      const fn = shortcuts[key] ?? shortcuts[key.toLowerCase()];
      if (fn) {
        e.preventDefault();
        fn(e);
      }
    }

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, JSON.stringify(Object.keys(shortcuts))]);
}
