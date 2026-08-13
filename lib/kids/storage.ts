/**
 * Kids Mode storage — deliberately NOT the adult save/know/learning model.
 * A 3-year-old needs one thing: positive reinforcement. Every "I did it!"
 * tap adds a star to a single running total, and we remember which words
 * have been seen so the picker can favor new ones.
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
    // fail silently — losing star progress isn't worth breaking the app
  }
}

const STARS_KEY = "kids:stars";
const SEEN_KEY_PREFIX = "kids:seen:";
export const STARS_UPDATED_EVENT = "kids:stars-updated";

export function getStars(): number {
  return readJSON<number>(STARS_KEY, 0);
}

export function addStar(): number {
  const next = getStars() + 1;
  writeJSON(STARS_KEY, next);
  if (isBrowser()) {
    window.dispatchEvent(new CustomEvent(STARS_UPDATED_EVENT, { detail: next }));
  }
  return next;
}

export function getSeenSlugs(setName: string): string[] {
  return readJSON<string[]>(SEEN_KEY_PREFIX + setName, []);
}

export function markSeen(setName: string, slug: string): string[] {
  const seen = new Set(getSeenSlugs(setName));
  seen.add(slug);
  const list = Array.from(seen);
  writeJSON(SEEN_KEY_PREFIX + setName, list);
  return list;
}
