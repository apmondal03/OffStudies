import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getIdiomBySlug } from "@/lib/idioms/selection";
import { IdiomCard } from "@/components/idioms/IdiomCard";
import { ModuleActionBar } from "@/components/ui/ModuleActionBar";
import { idiomsModule } from "@/lib/modules/idioms";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getIdiomBySlug(slug);
  if (!entry) return { title: "Idiom — Not Found" };

  const capitalized = entry.idiom.charAt(0).toUpperCase() + entry.idiom.slice(1);
  return {
    title: `${capitalized} — Meaning & Examples`,
    description: `Learn what "${entry.idiom}" means, with examples of how to use it.`,
  };
}

export default async function IdiomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getIdiomBySlug(slug);

  if (!entry) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-16">
      <nav className="mb-8 text-sm text-ink-faint" aria-label="Breadcrumb">
        <Link href="/idioms" className="hover:text-ink">Idioms</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink capitalize">{entry.idiom}</span>
      </nav>

      <div className="mb-6">
        <ModuleActionBar moduleId={idiomsModule.id} totalCount={idiomsModule.totalCount()} slug={entry.slug} />
      </div>

      <IdiomCard entry={entry} showLink={false} />
    </div>
  );
}
