"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, BarChart3 } from "lucide-react";
import { ParentGate } from "@/components/kids/ParentGate";
import { getStars, STARS_UPDATED_EVENT } from "@/lib/kids/storage";

export function KidsHeader() {
  const router = useRouter();
  const [stars, setStars] = useState(0);
  const [exitGateOpen, setExitGateOpen] = useState(false);

  useEffect(() => {
    setStars(getStars());
    const onUpdate = (e: Event) => setStars((e as CustomEvent<number>).detail);
    window.addEventListener(STARS_UPDATED_EVENT, onUpdate);
    return () => window.removeEventListener(STARS_UPDATED_EVENT, onUpdate);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[var(--kids-bg)]/95 backdrop-blur border-b-4 border-[var(--kids-border)]">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/kids" className="flex items-center gap-2" aria-label="Kids Mode home">
            <span className="text-3xl">🦉</span>
            <span className="kids-display text-2xl font-bold text-[var(--kids-ink)]">Lexicon Kids</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 shadow-sm">
              <Star className="h-5 w-5 fill-[var(--kids-accent-3)] text-[var(--kids-accent-3)]" />
              <span className="kids-display text-lg font-bold text-[var(--kids-ink)]">{stars}</span>
            </div>
            {/* Links straight to /kids/parents — that page shows its own
                parent gate on load, which also protects direct URL access,
                not just this button. */}
            <Link
              href="/kids/parents"
              aria-label="Parent dashboard"
              className="rounded-full border-2 border-[var(--kids-border)] bg-white p-2.5 text-[var(--kids-ink-muted)] hover:border-[var(--kids-accent-2)] hover:text-[var(--kids-accent-2)] transition-colors"
            >
              <BarChart3 className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setExitGateOpen(true)}
              className="rounded-full border-2 border-[var(--kids-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--kids-ink-muted)] hover:border-[var(--kids-accent)] hover:text-[var(--kids-accent)] transition-colors"
            >
              Exit
            </button>
          </div>
        </div>
      </header>

      {exitGateOpen && (
        <ParentGate
          onConfirm={() => {
            setExitGateOpen(false);
            router.push("/");
          }}
          onCancel={() => setExitGateOpen(false)}
        />
      )}
    </>
  );
}
