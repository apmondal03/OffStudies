import { IdiomCard } from "@/components/idioms/IdiomCard";
import type { IdiomEntry } from "@/types/idiom";

export function IdiomStreamCard({ entry }: { entry: IdiomEntry }) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-8 sm:p-12 text-left">
      <IdiomCard entry={entry} />
    </div>
  );
}
