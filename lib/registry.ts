import type { ContentModule } from "@/types/contentModule";
import { vocabularyModule } from "@/lib/modules/vocabulary";
import { phrasalVerbsModule } from "@/lib/modules/phrasalVerbs";
import { grammarModule } from "@/lib/modules/grammar";
import { idiomsModule } from "@/lib/modules/idioms";
import { prepositionsModule } from "@/lib/modules/prepositions";

/**
 * Every content module the app knows about. This is the ONE place that
 * needs a new line when a module is added (Grammar, Idioms, Prepositions,
 * ...) — the Stream's content-type switcher, its filter tabs, and its
 * progress tracking all read from this list instead of hardcoding each
 * module by name.
 *
 * The `ContentModule<any, any, any>` cast here is the one intentional spot
 * of type-looseness in this system: each module file above is fully typed
 * against its own concrete WordEntry/PhrasalVerbEntry/etc. shapes, but a
 * single array holding modules of genuinely different content types can't
 * stay generic in TypeScript without this — the same trade-off any
 * heterogeneous plugin registry makes.
 */
export const CONTENT_MODULES: ContentModule<unknown, unknown, string>[] = [
  vocabularyModule,
  phrasalVerbsModule,
  grammarModule,
  idiomsModule,
  prepositionsModule,
] as unknown as ContentModule<unknown, unknown, string>[];

export function getModule(id: string) {
  return CONTENT_MODULES.find((m) => m.id === id);
}

export function getModulesForTrack(track: "adult" | "kids") {
  return CONTENT_MODULES.filter((m) => m.track === track);
}
