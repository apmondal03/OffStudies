"use client";

import { useEffect, useState } from "react";
import { ContentTypeToggle } from "@/components/stream/ContentTypeToggle";
import { IntervalSelector } from "@/components/stream/IntervalSelector";
import { ModuleStreamView } from "@/components/stream/ModuleStreamView";
import { CONTENT_MODULES, getModule } from "@/lib/registry";
import { getStreamPrefs, setStreamPrefs } from "@/lib/storage";

export default function StreamPage() {
  const [activeModuleId, setActiveModuleId] = useState<string>(CONTENT_MODULES[0].id);
  const [filterByModule, setFilterByModule] = useState<Record<string, string>>({});
  const [intervalSeconds, setIntervalSeconds] = useState(30);
  const [prefsLoaded, setPrefsLoaded] = useState(false);

  useEffect(() => {
    const prefs = getStreamPrefs();
    setIntervalSeconds(prefs.intervalSeconds);
    setActiveModuleId(prefs.activeModuleId);
    setFilterByModule(prefs.filterByModule);
    setPrefsLoaded(true);
  }, []);

  function handleModuleChange(moduleId: string) {
    setActiveModuleId(moduleId);
    setStreamPrefs({ activeModuleId: moduleId });
  }

  function handleIntervalChange(seconds: number) {
    setIntervalSeconds(seconds);
    setStreamPrefs({ intervalSeconds: seconds });
  }

  const activeModule = getModule(activeModuleId) ?? CONTENT_MODULES[0];
  const activeFilter = filterByModule[activeModule.id] ?? activeModule.defaultFilter;

  function setActiveFilter(filter: string) {
    setFilterByModule((prev) => ({ ...prev, [activeModule.id]: filter }));
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 pt-8 sm:pt-10 flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <ContentTypeToggle value={activeModule.id} onChange={handleModuleChange} />
          <IntervalSelector value={intervalSeconds} onChange={handleIntervalChange} />
        </div>
      </div>

      <ModuleStreamView
        key={activeModule.id}
        module={activeModule}
        filter={activeFilter}
        setFilter={setActiveFilter}
        intervalSeconds={intervalSeconds}
        prefsLoaded={prefsLoaded}
      />
    </div>
  );
}
