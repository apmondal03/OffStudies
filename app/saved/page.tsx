"use client";

import Link from "next/link";
import { Bookmark } from "lucide-react";
import { useModuleProgress } from "@/hooks/useModuleProgress";
import { vocabularyModule } from "@/lib/modules/vocabulary";
import { phrasalVerbsModule } from "@/lib/modules/phrasalVerbs";
import { grammarModule } from "@/lib/modules/grammar";
import { idiomsModule } from "@/lib/modules/idioms";
import { prepositionsModule } from "@/lib/modules/prepositions";
import { getCoreEntryBySlug } from "@/lib/dictionary/coreList";
import { getPhrasalVerbBySlug } from "@/lib/phrasalVerbs/selection";
import { getGrammarPointBySlug } from "@/lib/grammar/selection";
import { getIdiomBySlug } from "@/lib/idioms/selection";
import { getPrepositionBySlug } from "@/lib/prepositions/selection";
import { CefrBadge } from "@/components/ui/CefrBadge";
import { EmptyList } from "@/components/ui/States";

export default function SavedPage() {
  const { hydrated, savedSlugs, progress, statusMap } = useModuleProgress(
    vocabularyModule.id,
    vocabularyModule.totalCount()
  );
  const {
    hydrated: pvHydrated,
    savedSlugs: pvSavedSlugs,
    statusMap: pvStatusMap,
  } = useModuleProgress(phrasalVerbsModule.id, phrasalVerbsModule.totalCount());
  const {
    hydrated: grammarHydrated,
    savedSlugs: grammarSavedSlugs,
    statusMap: grammarStatusMap,
  } = useModuleProgress(grammarModule.id, grammarModule.totalCount());
  const {
    hydrated: idiomsHydrated,
    savedSlugs: idiomsSavedSlugs,
    statusMap: idiomsStatusMap,
  } = useModuleProgress(idiomsModule.id, idiomsModule.totalCount());
  const {
    hydrated: prepositionsHydrated,
    savedSlugs: prepositionsSavedSlugs,
    statusMap: prepositionsStatusMap,
  } = useModuleProgress(prepositionsModule.id, prepositionsModule.totalCount());

  const savedEntries = Array.from(savedSlugs)
    .map((slug) => getCoreEntryBySlug(slug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  const learningEntries = Object.entries(statusMap)
    .filter(([, status]) => status === "learning")
    .map(([slug]) => getCoreEntryBySlug(slug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  const savedPhrasalVerbs = Array.from(pvSavedSlugs)
    .map((slug) => getPhrasalVerbBySlug(slug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  const learningPhrasalVerbs = Object.entries(pvStatusMap)
    .filter(([, status]) => status === "learning")
    .map(([slug]) => getPhrasalVerbBySlug(slug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  const savedGrammarPoints = Array.from(grammarSavedSlugs)
    .map((slug) => getGrammarPointBySlug(slug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  const learningGrammarPoints = Object.entries(grammarStatusMap)
    .filter(([, status]) => status === "learning")
    .map(([slug]) => getGrammarPointBySlug(slug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  const savedIdioms = Array.from(idiomsSavedSlugs)
    .map((slug) => getIdiomBySlug(slug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  const learningIdioms = Object.entries(idiomsStatusMap)
    .filter(([, status]) => status === "learning")
    .map(([slug]) => getIdiomBySlug(slug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  const savedPrepositions = Array.from(prepositionsSavedSlugs)
    .map((slug) => getPrepositionBySlug(slug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  const learningPrepositions = Object.entries(prepositionsStatusMap)
    .filter(([, status]) => status === "learning")
    .map(([slug]) => getPrepositionBySlug(slug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14">
      <p className="text-xs uppercase tracking-widest text-accent font-medium mb-2">Your progress</p>
      <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-8">Saved &amp; learning</h1>

      {/* Progress overview */}
      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 mb-10">
        <p className="font-display text-xl mb-5">Core 3000</p>
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div>
            <p className="font-display text-3xl text-accent">{hydrated ? progress.known : "–"}</p>
            <p className="text-xs text-ink-faint mt-1">Known</p>
          </div>
          <div>
            <p className="font-display text-3xl text-b1">{hydrated ? progress.learning : "–"}</p>
            <p className="text-xs text-ink-faint mt-1">Learning</p>
          </div>
          <div>
            <p className="font-display text-3xl text-ink-faint">{hydrated ? progress.unseen : "–"}</p>
            <p className="text-xs text-ink-faint mt-1">Unseen</p>
          </div>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-sunken flex">
          <div className="h-full bg-accent" style={{ width: `${hydrated ? progress.knownPct : 0}%` }} />
          <div className="h-full bg-b1" style={{ width: `${hydrated ? progress.learningPct : 0}%` }} />
        </div>
        <p className="mt-3 text-xs text-ink-faint">
          Simple progress tracking — {progress.total.toLocaleString()} words total.
        </p>
      </div>

      {/* Saved words */}
      <section className="mb-12">
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Bookmark className="h-5 w-5 text-accent" strokeWidth={1.75} />
          Saved words
          <span className="text-sm font-sans text-ink-faint font-normal">({savedEntries.length})</span>
        </h2>
        {hydrated && savedEntries.length === 0 && (
          <EmptyList title="No saved words yet." hint="Tap Save on any word to add it here." />
        )}
        {savedEntries.length > 0 && (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {savedEntries.map((w) => (
              <li key={w.slug}>
                <Link
                  href={`/word/${w.slug}`}
                  className="flex flex-col gap-1.5 rounded-xl border border-border bg-surface px-4 py-3.5 hover:border-accent transition-colors"
                >
                  <span className="font-display text-lg leading-tight">{w.word}</span>
                  <span className="text-xs italic text-ink-faint">{w.partOfSpeech}</span>
                  <CefrBadge level={w.cefrLevel} className="mt-auto self-start" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Learning words */}
      <section className="mb-12">
        <h2 className="font-display text-2xl mb-4">
          Learning
          <span className="ml-2 text-sm font-sans text-ink-faint font-normal">({learningEntries.length})</span>
        </h2>
        {hydrated && learningEntries.length === 0 && (
          <EmptyList title="Nothing marked as learning yet." hint="Mark a word as “Learning” from its page or the Stream." />
        )}
        {learningEntries.length > 0 && (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {learningEntries.map((w) => (
              <li key={w.slug}>
                <Link
                  href={`/word/${w.slug}`}
                  className="flex flex-col gap-1.5 rounded-xl border border-border bg-surface px-4 py-3.5 hover:border-accent transition-colors"
                >
                  <span className="font-display text-lg leading-tight">{w.word}</span>
                  <span className="text-xs italic text-ink-faint">{w.partOfSpeech}</span>
                  <CefrBadge level={w.cefrLevel} className="mt-auto self-start" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Saved phrasal verbs */}
      <section className="mb-12">
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Bookmark className="h-5 w-5 text-accent" strokeWidth={1.75} />
          Saved phrasal verbs
          <span className="text-sm font-sans text-ink-faint font-normal">({savedPhrasalVerbs.length})</span>
        </h2>
        {pvHydrated && savedPhrasalVerbs.length === 0 && (
          <EmptyList title="No saved phrasal verbs yet." hint="Tap Save on any phrasal verb to add it here." />
        )}
        {savedPhrasalVerbs.length > 0 && (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {savedPhrasalVerbs.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/phrasal-verbs/${p.slug}`}
                  className="flex flex-col gap-1.5 rounded-xl border border-border bg-surface px-4 py-3.5 hover:border-accent transition-colors"
                >
                  <span className="font-display text-lg leading-tight">{p.phrase}</span>
                  <span className="text-xs italic text-ink-faint capitalize">{p.formality}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Learning phrasal verbs */}
      <section className="mb-12">
        <h2 className="font-display text-2xl mb-4">
          Learning phrasal verbs
          <span className="ml-2 text-sm font-sans text-ink-faint font-normal">({learningPhrasalVerbs.length})</span>
        </h2>
        {pvHydrated && learningPhrasalVerbs.length === 0 && (
          <EmptyList title="Nothing marked as learning yet." hint="Mark a phrasal verb as “Learning” from its page or the Stream." />
        )}
        {learningPhrasalVerbs.length > 0 && (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {learningPhrasalVerbs.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/phrasal-verbs/${p.slug}`}
                  className="flex flex-col gap-1.5 rounded-xl border border-border bg-surface px-4 py-3.5 hover:border-accent transition-colors"
                >
                  <span className="font-display text-lg leading-tight">{p.phrase}</span>
                  <span className="text-xs italic text-ink-faint capitalize">{p.formality}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Saved grammar points */}
      <section className="mb-12">
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Bookmark className="h-5 w-5 text-accent" strokeWidth={1.75} />
          Saved grammar
          <span className="text-sm font-sans text-ink-faint font-normal">({savedGrammarPoints.length})</span>
        </h2>
        {grammarHydrated && savedGrammarPoints.length === 0 && (
          <EmptyList title="No saved grammar points yet." hint="Tap Save on any grammar point to add it here." />
        )}
        {savedGrammarPoints.length > 0 && (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {savedGrammarPoints.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/grammar/${g.slug}`}
                  className="flex flex-col gap-1.5 rounded-xl border border-border bg-surface px-4 py-3.5 hover:border-accent transition-colors"
                >
                  <span className="font-display text-lg leading-tight">{g.title}</span>
                  <CefrBadge level={g.cefrLevel} className="mt-auto self-start" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Learning grammar points */}
      <section className="mb-12">
        <h2 className="font-display text-2xl mb-4">
          Learning grammar
          <span className="ml-2 text-sm font-sans text-ink-faint font-normal">({learningGrammarPoints.length})</span>
        </h2>
        {grammarHydrated && learningGrammarPoints.length === 0 && (
          <EmptyList title="Nothing marked as learning yet." hint="Mark a grammar point as “Learning” from its page or the Stream." />
        )}
        {learningGrammarPoints.length > 0 && (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {learningGrammarPoints.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/grammar/${g.slug}`}
                  className="flex flex-col gap-1.5 rounded-xl border border-border bg-surface px-4 py-3.5 hover:border-accent transition-colors"
                >
                  <span className="font-display text-lg leading-tight">{g.title}</span>
                  <CefrBadge level={g.cefrLevel} className="mt-auto self-start" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Saved idioms */}
      <section className="mb-12">
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Bookmark className="h-5 w-5 text-accent" strokeWidth={1.75} />
          Saved idioms
          <span className="text-sm font-sans text-ink-faint font-normal">({savedIdioms.length})</span>
        </h2>
        {idiomsHydrated && savedIdioms.length === 0 && (
          <EmptyList title="No saved idioms yet." hint="Tap Save on any idiom to add it here." />
        )}
        {savedIdioms.length > 0 && (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {savedIdioms.map((i) => (
              <li key={i.slug}>
                <Link
                  href={`/idioms/${i.slug}`}
                  className="flex flex-col gap-1.5 rounded-xl border border-border bg-surface px-4 py-3.5 hover:border-accent transition-colors"
                >
                  <span className="font-display text-lg leading-tight capitalize">{i.idiom}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Learning idioms */}
      <section className="mb-12">
        <h2 className="font-display text-2xl mb-4">
          Learning idioms
          <span className="ml-2 text-sm font-sans text-ink-faint font-normal">({learningIdioms.length})</span>
        </h2>
        {idiomsHydrated && learningIdioms.length === 0 && (
          <EmptyList title="Nothing marked as learning yet." hint="Mark an idiom as “Learning” from its page or the Stream." />
        )}
        {learningIdioms.length > 0 && (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {learningIdioms.map((i) => (
              <li key={i.slug}>
                <Link
                  href={`/idioms/${i.slug}`}
                  className="flex flex-col gap-1.5 rounded-xl border border-border bg-surface px-4 py-3.5 hover:border-accent transition-colors"
                >
                  <span className="font-display text-lg leading-tight capitalize">{i.idiom}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Saved prepositions */}
      <section className="mb-12">
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Bookmark className="h-5 w-5 text-accent" strokeWidth={1.75} />
          Saved prepositions
          <span className="text-sm font-sans text-ink-faint font-normal">({savedPrepositions.length})</span>
        </h2>
        {prepositionsHydrated && savedPrepositions.length === 0 && (
          <EmptyList title="No saved prepositions yet." hint="Tap Save on any entry to add it here." />
        )}
        {savedPrepositions.length > 0 && (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {savedPrepositions.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/prepositions/${p.slug}`}
                  className="flex flex-col gap-1.5 rounded-xl border border-border bg-surface px-4 py-3.5 hover:border-accent transition-colors"
                >
                  <span className="font-display text-lg leading-tight">{p.phrase}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Learning prepositions */}
      <section>
        <h2 className="font-display text-2xl mb-4">
          Learning prepositions
          <span className="ml-2 text-sm font-sans text-ink-faint font-normal">({learningPrepositions.length})</span>
        </h2>
        {prepositionsHydrated && learningPrepositions.length === 0 && (
          <EmptyList title="Nothing marked as learning yet." hint="Mark an entry as “Learning” from its page or the Stream." />
        )}
        {learningPrepositions.length > 0 && (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {learningPrepositions.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/prepositions/${p.slug}`}
                  className="flex flex-col gap-1.5 rounded-xl border border-border bg-surface px-4 py-3.5 hover:border-accent transition-colors"
                >
                  <span className="font-display text-lg leading-tight">{p.phrase}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
