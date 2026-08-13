"use client";

import { useState } from "react";
import { YoungContentToggle } from "@/components/youngLearners/YoungContentToggle";
import { YoungPracticeView } from "@/components/youngLearners/YoungPracticeView";
import { getModule, getModulesForTrack } from "@/lib/registry";

export default function YoungLearnersPracticePage() {
  const modules = getModulesForTrack("kids");
  const [activeModuleId, setActiveModuleId] = useState(modules[0]?.id ?? "");
  const [filterByModule, setFilterByModule] = useState<Record<string, string>>({});

  const activeModule = getModule(activeModuleId) ?? modules[0];
  if (!activeModule) return null;

  const activeFilter = filterByModule[activeModule.id] ?? activeModule.defaultFilter;

  function setActiveFilter(filter: string) {
    setFilterByModule((prev) => ({ ...prev, [activeModule.id]: filter }));
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-8 flex justify-center">
        <YoungContentToggle value={activeModule.id} onChange={setActiveModuleId} />
      </div>

      <YoungPracticeView module={activeModule} filter={activeFilter} setFilter={setActiveFilter} />

      <p className="mt-10 text-center text-xs text-[var(--young-ink-muted)] font-mono">
        ← → navigate · s save · k know it · l still learning
      </p>
    </div>
  );
}
