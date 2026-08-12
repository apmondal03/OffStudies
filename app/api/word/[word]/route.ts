import { NextResponse } from "next/server";
import { resolveWordOnServer } from "@/lib/dictionary/freeDictionaryProvider";
import { DictionaryProviderError } from "@/lib/dictionary/provider";

export const runtime = "nodejs";

/**
 * GET /api/word/:word
 *
 * This is the ONLY thing client-side code should ever call for word data —
 * see `freeDictionaryProvider.getWord`. Keeping the actual third-party
 * dictionary/thesaurus calls server-side means:
 *  - no browser CORS exposure (server-to-server requests aren't subject to it)
 *  - not blocked by ad-blockers/privacy extensions that flag third-party API domains
 *  - every visitor benefits from the same Next.js server-side fetch cache,
 *    instead of each browser hitting the external APIs independently
 */
export async function GET(_request: Request, { params }: { params: Promise<{ word: string }> }) {
  const { word: rawWord } = await params;
  const word = decodeURIComponent(rawWord);

  if (!word || !word.trim()) {
    return NextResponse.json({ error: "missing_word" }, { status: 400 });
  }

  try {
    const entry = await resolveWordOnServer(word);
    if (!entry) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }
    return NextResponse.json(entry, {
      headers: {
        // Shared, edge/CDN-cacheable — the word itself rarely changes.
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    const message =
      err instanceof DictionaryProviderError ? err.message : "Failed to reach the dictionary service.";
    return NextResponse.json({ error: "network_error", message }, { status: 502 });
  }
}
