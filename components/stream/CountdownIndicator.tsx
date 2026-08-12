export function CountdownIndicator({
  secondsLeft,
  totalSeconds,
  paused,
}: {
  secondsLeft: number;
  totalSeconds: number;
  paused: boolean;
}) {
  const pct = Math.max(0, Math.min(100, (secondsLeft / totalSeconds) * 100));
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="w-full">
      <div className="h-1 w-full overflow-hidden rounded-full bg-surface-sunken">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-1000 ease-linear"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-xs font-mono text-ink-faint">
        {paused ? "Paused" : `Next word in ${mm}:${ss}`}
      </p>
    </div>
  );
}
