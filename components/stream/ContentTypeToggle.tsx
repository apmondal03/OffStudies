import { CONTENT_MODULES } from "@/lib/registry";

export function ContentTypeToggle({
  value,
  onChange,
}: {
  value: string;
  onChange: (moduleId: string) => void;
}) {
  const modules = CONTENT_MODULES.filter((m) => m.track === "adult");

  return (
    <div className="inline-flex flex-wrap items-center gap-1 rounded-full border border-border-strong bg-surface p-1">
      {modules.map((m) => (
        <button
          key={m.id}
          type="button"
          aria-pressed={value === m.id}
          onClick={() => onChange(m.id)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            value === m.id ? "bg-accent text-accent-contrast" : "text-ink-muted hover:text-ink"
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
