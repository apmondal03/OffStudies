import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-ink-faint">
          Lexicon — understand words, remember them.
        </p>
        <nav className="flex items-center gap-5 text-sm text-ink-muted" aria-label="Footer">
          <Link href="/about" className="hover:text-ink">About</Link>
          <Link href="/explore" className="hover:text-ink">Core 3000</Link>
          <Link href="/stream" className="hover:text-ink">Word Stream</Link>
        </nav>
      </div>
    </footer>
  );
}
