import type { Metadata } from "next";
import Link from "next/link";
import { dictionaryProvider } from "@/lib/dictionary";
import { getCoreEntryBySlug } from "@/lib/dictionary/coreList";
import { CefrBadge } from "@/components/ui/CefrBadge";
import { AudioButton } from "@/components/ui/AudioButton";
import { WordNotFound, DictionaryOffline } from "@/components/ui/States";
import { WordActionBar } from "@/components/dictionary/WordActionBar";
import {
  DefinitionsSection,
  RealLifeSection,
  SynonymsAntonymsSection,
  CollocationsSection,
  PhrasesSection,
  WordFamilySection,
  UsageNotesSection,
  CommonMistakesSection,
} from "@/components/dictionary/WordDetailSections";

function wordFromSlug(slug: string): string {
  const core = getCoreEntryBySlug(slug);
  if (core) return core.word;
  return slug.replace(/-/g, " ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const word = wordFromSlug(slug);
  const capitalized = word.charAt(0).toUpperCase() + word.slice(1);

  try {
    const entry = await dictionaryProvider.getWord(word);
    if (!entry) {
      return { title: `${capitalized} — Not Found` };
    }
    return {
      title: `${capitalized} — Definition, Pronunciation & Examples`,
      description: `Learn the meaning, pronunciation, synonyms, and real-life usage of "${word}".`,
    };
  } catch {
    return { title: capitalized };
  }
}

export default async function WordPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const word = wordFromSlug(slug);

  let entry;
  let offline = false;
  try {
    entry = await dictionaryProvider.getWord(word);
  } catch {
    offline = true;
  }

  if (offline) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <DictionaryOffline />
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <WordNotFound term={word} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-16">
      <nav className="mb-8 text-sm text-ink-faint" aria-label="Breadcrumb">
        <Link href="/explore" className="hover:text-ink">Explore</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink">{entry.word}</span>
      </nav>

      <header>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="font-display text-5xl sm:text-6xl tracking-tight">{entry.word}</h1>
          <div className="flex flex-col items-end gap-2">
            <CefrBadge level={entry.cefrLevel} full />
            <span className="text-sm italic text-ink-faint">{entry.partOfSpeech}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {entry.phoneticUS && <span className="font-mono text-base text-ink-muted">{entry.phoneticUS}</span>}
          <AudioButton word={entry.word} audioUrl={entry.audioUS} variant="US" />
          <AudioButton word={entry.word} audioUrl={entry.audioUK} variant="UK" />
        </div>

        <div className="mt-6">
          <WordActionBar slug={entry.slug} word={entry.word} />
        </div>
      </header>

      <div className="mt-10">
        <DefinitionsSection entry={entry} />
        <RealLifeSection entry={entry} />
        <SynonymsAntonymsSection entry={entry} />
        <CollocationsSection entry={entry} />
        <PhrasesSection entry={entry} />
        <WordFamilySection entry={entry} />
        <UsageNotesSection entry={entry} />
        <CommonMistakesSection entry={entry} />
      </div>
    </div>
  );
}
