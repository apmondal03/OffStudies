import type { WordEntry } from "@/types/dictionary";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-6 border-t border-border first:border-t-0 first:pt-0">
      <h2 className="font-display text-lg mb-3">{title}</h2>
      {children}
    </section>
  );
}

function Pills({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-border bg-surface-sunken px-3 py-1 text-sm text-ink-muted"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function DefinitionsSection({ entry }: { entry: WordEntry }) {
  if (entry.definitions.length === 0) return null;

  // Group definitions by part of speech so a multi-POS word reads clearly.
  const byPos = new Map<string, typeof entry.definitions>();
  for (const def of entry.definitions) {
    const list = byPos.get(def.partOfSpeech) ?? [];
    list.push(def);
    byPos.set(def.partOfSpeech, list);
  }

  return (
    <Section title="Definitions">
      <div className="space-y-6">
        {Array.from(byPos.entries()).map(([pos, defs]) => (
          <div key={pos}>
            <p className="text-xs italic text-ink-faint mb-2">{pos}</p>
            <ol className="space-y-3 list-decimal list-inside marker:text-ink-faint marker:text-sm">
              {defs.map((def) => (
                <li key={def.id} className="pl-1">
                  <span className="text-base leading-relaxed">{def.meaning}</span>
                  {def.simpleDefinition && (
                    <p className="ml-5 mt-1 text-sm text-ink-muted">
                      <span className="text-ink-faint">Simple meaning: </span>
                      {def.simpleDefinition}
                    </p>
                  )}
                  {def.examples && def.examples.length > 0 && (
                    <ul className="ml-5 mt-1.5 space-y-1">
                      {def.examples.map((ex, i) => (
                        <li key={i} className="text-sm text-ink-muted italic">
                          &ldquo;{ex}&rdquo;
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function RealLifeSection({ entry }: { entry: WordEntry }) {
  if (!entry.realLifeExamples || entry.realLifeExamples.length === 0) return null;
  return (
    <Section title="Real-life use">
      <ul className="space-y-3">
        {entry.realLifeExamples.map((ex, i) => (
          <li key={i} className="rounded-xl bg-surface-sunken px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-ink-faint mb-1">{ex.context}</p>
            <p className="text-sm">{ex.sentence}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function SynonymsAntonymsSection({ entry }: { entry: WordEntry }) {
  if ((!entry.synonyms || entry.synonyms.length === 0) && (!entry.antonyms || entry.antonyms.length === 0))
    return null;
  return (
    <Section title="Synonyms & antonyms">
      <div className="grid sm:grid-cols-2 gap-5">
        {entry.synonyms && entry.synonyms.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-faint mb-2">Synonyms</p>
            <Pills items={entry.synonyms} />
          </div>
        )}
        {entry.antonyms && entry.antonyms.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-faint mb-2">Antonyms</p>
            <Pills items={entry.antonyms} />
          </div>
        )}
      </div>
    </Section>
  );
}

export function CollocationsSection({ entry }: { entry: WordEntry }) {
  if (!entry.collocations || entry.collocations.length === 0) return null;
  return (
    <Section title="Common collocations">
      <Pills items={entry.collocations} />
    </Section>
  );
}

export function PhrasesSection({ entry }: { entry: WordEntry }) {
  if (!entry.phrases || entry.phrases.length === 0) return null;
  return (
    <Section title="Common phrases">
      <Pills items={entry.phrases} />
    </Section>
  );
}

export function WordFamilySection({ entry }: { entry: WordEntry }) {
  if (!entry.wordFamily || entry.wordFamily.length === 0) return null;
  return (
    <Section title="Word family">
      <div className="flex flex-wrap gap-3">
        {entry.wordFamily.map((w) => (
          <div key={w.word} className="rounded-xl border border-border px-3.5 py-2">
            <span className="font-display">{w.word}</span>
            <span className="ml-2 text-xs italic text-ink-faint">{w.partOfSpeech}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function UsageNotesSection({ entry }: { entry: WordEntry }) {
  if (!entry.usageNotes || entry.usageNotes.length === 0) return null;
  return (
    <Section title="Usage notes">
      <ul className="space-y-2 list-disc list-inside text-sm text-ink-muted">
        {entry.usageNotes.map((note, i) => (
          <li key={i}>{note}</li>
        ))}
      </ul>
    </Section>
  );
}

export function CommonMistakesSection({ entry }: { entry: WordEntry }) {
  if (!entry.commonMistakes || entry.commonMistakes.length === 0) return null;
  return (
    <Section title="Common mistakes">
      <ul className="space-y-2">
        {entry.commonMistakes.map((mistake, i) => (
          <li
            key={i}
            className="text-sm rounded-lg border border-b2/30 bg-[color-mix(in_srgb,var(--b2)_8%,transparent)] px-3.5 py-2.5"
          >
            {mistake}
          </li>
        ))}
      </ul>
    </Section>
  );
}
