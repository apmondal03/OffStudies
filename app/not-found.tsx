import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 sm:px-6 py-24 text-center">
      <SearchX className="mx-auto h-9 w-9 text-ink-faint" strokeWidth={1.5} />
      <h1 className="mt-5 font-display text-3xl">Page not found</h1>
      <p className="mt-2 text-ink-muted">
        That page doesn&apos;t exist. Try searching for a word instead.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-contrast hover:bg-accent-strong transition-colors"
      >
        Back home
      </Link>
    </div>
  );
}
