import type { ModuleFilterOption } from "@/types/contentModule";

export function ModuleFilterTabs<TFilter extends string>({
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
              ? "border-accent bg-accent-soft text-accent-strong font-medium"
              : "border-border text-ink-muted hover:text-ink hover:border-border-strong"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
