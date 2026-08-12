import Link from "next/link";
import { SearchX, WifiOff } from "lucide-react";

export function WordCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 animate-pulse">
      <div className="h-9 w-40 rounded bg-surface-sunken" />
      <div className="mt-3 h-4 w-24 rounded bg-surface-sunken" />
      <div className="mt-6 h-4 w-full rounded bg-surface-sunken" />
      <div className="mt-2 h-4 w-4/5 rounded bg-surface-sunken" />
      <div className="mt-4 h-4 w-2/3 rounded bg-surface-sunken" />
    </div>
  );
}

export function WordNotFound({ term }: { term?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border-strong bg-surface p-10 text-center">
      <SearchX className="mx-auto h-8 w-8 text-ink-faint" strokeWidth={1.5} />
      <p className="mt-4 text-lg font-display">We couldn&apos;t find that word.</p>
      {term && <p className="mt-1 text-sm text-ink-faint">No entry for &ldquo;{term}&rdquo; yet.</p>}
      <Link
        href="/explore"
        className="mt-5 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast hover:bg-accent-strong"
      >
        Back to Explore
      </Link>
    </div>
  );
}

export function DictionaryOffline() {
  return (
    <div className="rounded-2xl border border-dashed border-border-strong bg-surface p-10 text-center">
      <WifiOff className="mx-auto h-8 w-8 text-ink-faint" strokeWidth={1.5} />
      <p className="mt-4 text-lg font-display">The dictionary is taking a moment.</p>
      <p className="mt-1 text-sm text-ink-faint">Please check your connection and try again.</p>
    </div>
  );
}

export function EmptyList({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border-strong bg-surface p-10 text-center">
      <p className="text-lg font-display">{title}</p>
      {hint && <p className="mt-1 text-sm text-ink-faint">{hint}</p>}
    </div>
  );
}
