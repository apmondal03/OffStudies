"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X, BookMarked } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { href: "/explore", label: "Explore" },
  { href: "/stream", label: "Word Stream" },
  { href: "/phrasal-verbs", label: "Phrasal Verbs" },
  { href: "/grammar", label: "Grammar" },
  { href: "/idioms", label: "Idioms" },
  { href: "/prepositions", label: "Prepositions" },
  { href: "/saved", label: "Saved" },
  { href: "/history", label: "History" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Kids Mode has its own dedicated header (see app/kids/layout.tsx) — the
  // adult nav/theme-toggle chrome shouldn't show there.
  if (pathname?.startsWith("/kids") || pathname?.startsWith("/young-learners")) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Lexicon home">
          <BookMarked className="h-5 w-5 text-accent" strokeWidth={1.75} aria-hidden="true" />
          <span className="font-display text-xl tracking-tight">Lexicon</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                  active
                    ? "bg-accent-soft text-accent-strong font-medium"
                    : "text-ink-muted hover:text-ink hover:bg-surface-sunken"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
            className="rounded-full p-2 text-ink-muted hover:text-ink hover:bg-surface-sunken transition-colors"
          >
            {theme === "light" ? (
              <Moon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            ) : (
              <Sun className="h-[18px] w-[18px]" strokeWidth={1.75} />
            )}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="md:hidden rounded-full p-2 text-ink-muted hover:text-ink hover:bg-surface-sunken transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Primary mobile"
          className="md:hidden border-t border-border px-4 py-2 flex flex-col animate-fade-in"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`rounded-lg px-3 py-2.5 text-sm ${
                pathname === link.href
                  ? "bg-accent-soft text-accent-strong font-medium"
                  : "text-ink-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
