"use client";

import { ModuleActionBar } from "@/components/ui/ModuleActionBar";
import { phrasalVerbsModule } from "@/lib/modules/phrasalVerbs";

export function PhrasalVerbActionBar({ slug }: { slug: string; phrase: string }) {
  return (
    <ModuleActionBar moduleId={phrasalVerbsModule.id} totalCount={phrasalVerbsModule.totalCount()} slug={slug} />
  );
}
