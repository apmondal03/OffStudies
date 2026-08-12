"use client";

import { Bookmark, CheckCircle2, GraduationCap } from "lucide-react";
import { useModuleProgress } from "@/hooks/useModuleProgress";

export function ModuleActionBar({
  moduleId,
  totalCount,
  slug,
}: {
  moduleId: string;
  totalCount: number;
  slug: string;
}) {
  const { getStatus, isSaved, toggleKnown, toggleLearning, toggleSaved, hydrated } = useModuleProgress(
    moduleId,
    totalCount
  );

  const status = getStatus(slug);
  const saved = isSaved(slug);

  const btn = (active: boolean) =>
    `inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors ${
      active
        ? "border-accent bg-accent-soft text-accent-strong font-medium"
        : "border-border text-ink-muted hover:text-ink hover:border-border-strong"
    }`;

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${hydrated ? "" : "invisible"}`} aria-hidden={!hydrated}>
      <button type="button" onClick={() => toggleSaved(slug)} aria-pressed={saved} className={btn(saved)}>
        <Bookmark className="h-4 w-4" strokeWidth={1.75} fill={saved ? "currentColor" : "none"} />
        {saved ? "Saved" : "Save"}
      </button>
      <button
        type="button"
        onClick={() => toggleKnown(slug)}
        aria-pressed={status === "known"}
        className={btn(status === "known")}
      >
        <CheckCircle2 className="h-4 w-4" strokeWidth={1.75} />
        {status === "known" ? "Known" : "I know this"}
      </button>
      <button
        type="button"
        onClick={() => toggleLearning(slug)}
        aria-pressed={status === "learning"}
        className={btn(status === "learning")}
      >
        <GraduationCap className="h-4 w-4" strokeWidth={1.75} />
        {status === "learning" ? "Learning" : "Mark as learning"}
      </button>
    </div>
  );
}
