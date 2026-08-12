"use client";

import { useEffect } from "react";
import { ModuleActionBar } from "@/components/ui/ModuleActionBar";
import { vocabularyModule } from "@/lib/modules/vocabulary";
import { addToHistory } from "@/lib/storage";

export function WordActionBar({ slug, word }: { slug: string; word: string }) {
  useEffect(() => {
    addToHistory({ slug, word });
  }, [slug, word]);

  return <ModuleActionBar moduleId={vocabularyModule.id} totalCount={vocabularyModule.totalCount()} slug={slug} />;
}
