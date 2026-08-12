import { GrammarCard } from "@/components/grammar/GrammarCard";
import type { GrammarPoint } from "@/types/grammar";

export function GrammarStreamCard({ entry }: { entry: GrammarPoint }) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-8 sm:p-12 text-left">
      <GrammarCard entry={entry} />
    </div>
  );
}
