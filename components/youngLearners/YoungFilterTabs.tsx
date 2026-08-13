import type { ModuleFilterOption } from "@/types/contentModule";

export function YoungFilterTabs<TFilter extends string>({
  filters,
  value,
  onChange,
}: {
  filters: ModuleFilterOption<TFilter>[];
  value: TFilter;
  onChange: (filter: TFilter) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Content filter">
      {filters.map((f) => (
        <button
          key={f.value}
          type="button"
          role="tab"
          aria-selected={value === f.value}
          onClick={() => onChange(f.value)}
          className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
            value === f.value
              ? "border-[var(--young-accent)] bg-[var(--young-accent-soft)] text-[var(--young-accent)] font-medium"
              : "border-[var(--young-border)] text-[var(--young-ink-muted)] hover:text-[var(--young-ink)]"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
