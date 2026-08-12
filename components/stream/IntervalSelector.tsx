const INTERVALS = [15, 30, 45, 60, 90];

export function IntervalSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (seconds: number) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-surface p-1">
      {INTERVALS.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          aria-pressed={value === s}
          className={`rounded-full px-3 py-1.5 text-xs font-mono transition-colors ${
            value === s ? "bg-accent text-accent-contrast" : "text-ink-muted hover:text-ink"
          }`}
        >
          {s}s
        </button>
      ))}
    </div>
  );
}
