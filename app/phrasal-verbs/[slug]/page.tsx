import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPhrasalVerbBySlug } from "@/lib/phrasalVerbs/selection";
import { PhrasalVerbActionBar } from "@/components/phrasalVerbs/PhrasalVerbActionBar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getPhrasalVerbBySlug(slug);
  if (!entry) return { title: "Phrasal Verb — Not Found" };

  const capitalized = entry.phrase.charAt(0).toUpperCase() + entry.phrase.slice(1);
  return {
    title: `${capitalized} — Meaning, Examples & Usage`,
    description: `Learn the meaning, examples, and usage of the phrasal verb "${entry.phrase}".`,
  };
}

export default async function PhrasalVerbDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getPhrasalVerbBySlug(slug);

  if (!entry) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-16">
      <nav className="mb-8 text-sm text-ink-faint" aria-label="Breadcrumb">
        <Link href="/phrasal-verbs" className="hover:text-ink">Phrasal Verbs</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink">{entry.phrase}</span>
      </nav>

      <header>
        <h1 className="font-display text-5xl sm:text-6xl tracking-tight">{entry.phrase}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-mono text-ink-muted capitalize">
            {entry.formality}
          </span>
          <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-mono text-ink-muted">
            {entry.separable ? "Separable" : "Inseparable"}
          </span>
          {!entry.transitive && (
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-mono text-ink-muted">
              Intransitive
            </span>
          )}
        </div>

        <div className="mt-6">
          <PhrasalVerbActionBar slug={entry.slug} phrase={entry.phrase} />
        </div>
      </header>

      <div className="mt-10 space-y-8">
        {entry.senses.map((sense, i) => (
          <section key={sense.id} className="py-6 border-t border-border first:border-t-0 first:pt-0">
            {entry.senses.length > 1 && (
              <h2 className="font-display text-lg mb-2">Sense {i + 1}</h2>
            )}
            <p className="text-base leading-relaxed">{sense.meaning}</p>
            <p className="mt-2 text-sm text-ink-muted">
              <span className="text-ink-faint">Simple meaning: </span>
              {sense.simpleDefinition}
            </p>
            <ul className="mt-3 space-y-1.5">
              {sense.examples.map((ex, exIdx) => (
                <li key={exIdx} className="text-sm text-ink-muted italic">
                  &ldquo;{ex}&rdquo;
                </li>
              ))}
            </ul>
            {sense.synonyms && sense.synonyms.length > 0 && (
              <p className="mt-3 text-sm text-ink-muted">
                <span className="text-ink-faint">Similar to: </span>
                {sense.synonyms.join(" · ")}
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
