import { PrepositionCard } from "@/components/prepositions/PrepositionCard";
import type { PrepositionEntry } from "@/types/preposition";

export function PrepositionStreamCard({ entry }: { entry: PrepositionEntry }) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-8 sm:p-12 text-left">
      <PrepositionCard entry={entry} />
    </div>
  );
}
