"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, History as HistoryIcon } from "lucide-react";
import { getHistory, clearHistory, type HistoryItem } from "@/lib/storage";
import { EmptyList } from "@/components/ui/States";

function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(getHistory());
    setHydrated(true);
  }, []);

  function handleClear() {
    clearHistory();
    setItems([]);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-accent font-medium mb-2">Activity</p>
          <h1 className="font-display text-4xl sm:text-5xl tracking-tight">Recently viewed</h1>
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm text-ink-muted hover:text-danger hover:border-danger/40 transition-colors shrink-0"
          >
            <Trash2 className="h-4 w-4" strokeWidth={1.75} />
            Clear
          </button>
        )}
      </div>

      {hydrated && items.length === 0 && (
        <EmptyList title="No history yet." hint="Words you look up will appear here." />
      )}

      {items.length > 0 && (
        <ul className="divide-y divide-border rounded-2xl border border-border bg-surface overflow-hidden">
          {items.map((item) => (
            <li key={`${item.slug}-${item.viewedAt}`}>
              <Link
                href={`/word/${item.slug}`}
                className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-surface-sunken transition-colors"
              >
                <span className="flex items-center gap-3">
                  <HistoryIcon className="h-4 w-4 text-ink-faint shrink-0" strokeWidth={1.75} />
                  <span className="font-display text-lg">{item.word}</span>
                </span>
                <span className="text-xs text-ink-faint font-mono shrink-0">
                  {formatRelativeTime(item.viewedAt)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
