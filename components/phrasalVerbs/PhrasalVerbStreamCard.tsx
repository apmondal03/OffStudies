import { PhrasalVerbCard } from "@/components/phrasalVerbs/PhrasalVerbCard";
import type { PhrasalVerbEntry } from "@/types/phrasalVerb";

export function PhrasalVerbStreamCard({ entry }: { entry: PhrasalVerbEntry }) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-8 sm:p-12 text-left">
      <PhrasalVerbCard entry={entry} />
    </div>
  );
}
