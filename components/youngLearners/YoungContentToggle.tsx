import { getModulesForTrack } from "@/lib/registry";

export function YoungContentToggle({
  value,
  onChange,
}: {
  value: string;
  onChange: (moduleId: string) => void;
}) {
  const modules = getModulesForTrack("kids");

  return (
    <div className="inline-flex flex-wrap items-center gap-1 rounded-full border border-[var(--young-border)] bg-[var(--young-surface)] p-1">
      {modules.map((m) => (
        <button
          key={m.id}
          type="button"
          aria-pressed={value === m.id}
          onClick={() => onChange(m.id)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            value === m.id
              ? "bg-[var(--young-accent)] text-[var(--young-accent-contrast)]"
              : "text-[var(--young-ink-muted)] hover:text-[var(--young-ink)]"
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
