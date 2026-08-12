import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPrepositionBySlug } from "@/lib/prepositions/selection";
import { PrepositionCard } from "@/components/prepositions/PrepositionCard";
import { ModuleActionBar } from "@/components/ui/ModuleActionBar";
import { prepositionsModule } from "@/lib/modules/prepositions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getPrepositionBySlug(slug);
  if (!entry) return { title: "Preposition — Not Found" };

  return {
    title: `${entry.phrase} — Preposition Usage & Examples`,
    description: `Learn how to use "${entry.phrase}" correctly, with examples for each meaning.`,
  };
}

export default async function PrepositionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getPrepositionBySlug(slug);

  if (!entry) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-16">
      <nav className="mb-8 text-sm text-ink-faint" aria-label="Breadcrumb">
        <Link href="/prepositions" className="hover:text-ink">Prepositions</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink">{entry.phrase}</span>
      </nav>

      <div className="mb-6">
        <ModuleActionBar
          moduleId={prepositionsModule.id}
          totalCount={prepositionsModule.totalCount()}
          slug={entry.slug}
        />
      </div>

      <PrepositionCard entry={entry} showLink={false} />
    </div>
  );
}
