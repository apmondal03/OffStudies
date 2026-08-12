import type { CEFRLevel } from "@/types/dictionary";

const LEVEL_LABEL: Record<CEFRLevel, string> = {
  A1: "A1 · Beginner",
  A2: "A2 · Elementary",
  B1: "B1 · Intermediate",
  B2: "B2 · Upper-Intermediate",
  C1: "C1 · Advanced",
  C2: "C2 · Mastery",
};

const LEVEL_COLOR_VAR: Record<CEFRLevel, string> = {
  A1: "var(--a1)",
  A2: "var(--a2)",
  B1: "var(--b1)",
  B2: "var(--b2)",
  C1: "var(--c1)",
  C2: "var(--c2)",
};

export function CefrBadge({
  level,
  full = false,
  className = "",
}: {
  level: CEFRLevel;
  full?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium font-mono tracking-wide ${className}`}
      style={{
        color: LEVEL_COLOR_VAR[level],
        borderColor: LEVEL_COLOR_VAR[level],
        backgroundColor: "color-mix(in srgb, " + LEVEL_COLOR_VAR[level] + " 10%, transparent)",
      }}
    >
      {full ? LEVEL_LABEL[level] : level}
    </span>
  );
}
