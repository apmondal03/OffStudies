# Lexicon

**Understand words. Remember them.**

Lexicon is a modern English dictionary and vocabulary-learning app built around the
**Core 3000** — the 3,000 most essential English words, tagged by CEFR level (A1–B2) —
and the **Word Stream**, an ambient learning mode that surfaces a new word automatically
on a timer you control.

---

## Features

- **Dictionary lookup** — search any word, see pronunciation (US/UK), part of speech,
  definitions, examples, synonyms/antonyms, collocations, phrases, word family, usage
  notes, and common mistakes. Empty sections are hidden rather than shown as blank cards.
- **Core 3000 Explorer** (`/explore`) — browse or filter by CEFR level, part of speech,
  or an A–Z index; paginated so 3,000 entries never render at once.
- **Word Stream** (`/stream`) — an immersive, auto-advancing feed with five content
  modules, switchable at the top of the page (driven by `lib/registry.ts` — the list
  grows without changing the Stream page itself):
  - **Vocabulary** — Core 3000 words, filterable by CEFR level.
  - **Phrasal Verbs** — ~448 English phrasal verbs (see below), covering C2-level breadth, filterable by
    formality.
  - **Grammar** — 66 grammar points from A1 to C2 (see below), filterable by level.
  - **Idioms** — 154 common English idioms (see below), filterable by register.
  - **Prepositions** — 96 entries (see below), filterable by type.

  All modules share: pause, resume, skip forward/back, save, mark "I know this" /
  "Learning," change the interval (15/30/45/60/90s), and keyboard shortcuts (space,
  ←/→, s, k, l — disabled while typing in an input).
- **Phrasal Verbs** (`/phrasal-verbs`) — a browsable, searchable collection of ~448
  common English phrasal verbs, each with meaning(s), plain-language definitions,
  examples, separability (`turn it off` vs. `look after it`), and formality level.
  All original content — see "Where the data comes from" below.
- **Grammar** (`/grammar`) — 66 grammar points spanning A1 to C2 across 15 categories
  (tenses, articles, modals, conditionals, passive voice, reported speech, relative
  clauses, and more), each with a plain-language explanation, structure formula,
  examples, signal words, and common mistakes. All original content.
- **Idioms** (`/idioms`) — 154 common English idioms across 13 themes (body, animals,
  food, weather, money, work, communication, and more), each with a plain-language
  meaning, examples, category, and register (informal/neutral/formal). All original
  content.
- **Prepositions** (`/prepositions`) — 96 entries: 25 core prepositions (in, on, at,
  by, with...) each broken down by usage — time, place, movement, manner — since a
  single preposition doesn't reduce to one definition, plus ~70 dependent-preposition
  collocations (`afraid of`, `interested in`, `access to`, `responsible for`, and so
  on). All original content.
- **Word of the Moment** — a compact version of the stream on the homepage.
- **Saved / Learning / History** — local progress tracking for words, phrasal verbs,
  grammar points, idioms, and prepositions, with a simple Known / Learning / Unseen
  breakdown. No account required.
- **Pronunciation** — plays provider audio when available, otherwise falls back to the
  browser's SpeechSynthesis API. Never autoplays.
- **Light & dark themes**, full keyboard accessibility, reduced-motion support, and a
  distinct editorial visual identity (not a generic AI-SaaS template).

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript + React
- Tailwind CSS v4
- [lucide-react](https://lucide.dev) icons
- [Free Dictionary API](https://dictionaryapi.dev) (public, no key) as the default
  dictionary data provider
- `localStorage` for progress/saved/history persistence (no backend required)

## Project structure

```
app/
  page.tsx                 Landing page
  explore/                 Core 3000 browser
  stream/                  Word Stream — registry-driven, renders whichever
                            module is active (Vocabulary, Phrasal Verbs, ...)
  phrasal-verbs/           Phrasal verb listing + [slug] detail pages
  grammar/                 Grammar listing + [slug] detail pages
  idioms/                  Idioms listing + [slug] detail pages
  prepositions/            Prepositions listing + [slug] detail pages
  saved/                   Saved + learning words/phrasal verbs, progress overview
  history/                 Recently viewed words
  word/[slug]/              Dictionary word detail page (SEO metadata per word)
  api/word/[word]/          Server-side proxy for dictionary/thesaurus lookups
  about/                   Product explanation
  sitemap.ts, robots.ts    SEO
  not-found.tsx, error.tsx, global-error.tsx

components/
  dictionary/              SearchBar, WordCard, VocabularyStreamCard, detail sections
  stream/                  ModuleStreamView, ModuleFilterTabs, ContentTypeToggle,
                            countdown, controls, interval selector — all generic,
                            shared by every module
  phrasalVerbs/            PhrasalVerbCard, PhrasalVerbStreamCard, action bar
  layout/                  Header, Footer, ThemeProvider
  ui/                      CefrBadge, AudioButton, ModuleActionBar (generic
                            save/know/learning bar), loading/empty/error states

data/
  core-3000.json           Word list: { id, word, slug, partOfSpeech, cefrLevel }

hooks/
  useModuleProgress.ts     Generic saved/known/learning state for ANY module
  useModuleStream.ts       Generic Stream timer/selection/history for ANY module
  useKeyboardShortcuts.ts
  useReducedMotion.ts

lib/
  registry.ts              CONTENT_MODULES — the list of registered learning
                            modules. Adding a new module = one new entry here.
  modules/
    vocabulary.ts            ContentModule implementation for Vocabulary
    phrasalVerbs.ts           ContentModule implementation for Phrasal Verbs
  dictionary/
    provider.ts             DictionaryProvider interface (the abstraction)
    freeDictionaryProvider.ts  Free Dictionary API implementation (server + client paths)
    coreList.ts              Local Core 3000 lookup/search helpers
    sampleWords.ts            20 hand-written rich sample entries
  phrasalVerbs/
    data.ts                  ~448 original phrasal verb entries
    selection.ts              Stream selection logic
  word-selection.ts         Word Stream selection logic (spaced-repetition-ready)
  storage.ts                Generic, module-scoped localStorage layer

types/
  dictionary.ts             WordEntry, Definition, CEFRLevel, etc.
  phrasalVerb.ts             PhrasalVerbEntry, PhrasalVerbSense, Formality
  contentModule.ts           ContentModule<TEntry, TCandidate, TFilter> — the
                              contract every module implements

scripts/
  build-core-3000.js        One-off parser used to build the initial dataset
  import-words.js           Re-usable CSV/JSON → data/core-3000.json importer
```

## Architecture notes

**The content-module system.** This is the load-bearing abstraction in the app.
Every learning category — Vocabulary and Phrasal Verbs today; Grammar, Idioms,
Prepositions, etc. later — implements the same `ContentModule<TEntry, TCandidate,
TFilter>` interface (`types/contentModule.ts`): selection logic, how to resolve a
candidate into a full entry, a slug getter, and a Stream card component. Two
**generic** hooks then drive *any* module:

- `hooks/useModuleStream.ts` — timer, history, retry-on-network-failure. Works
  identically for network-backed modules (Vocabulary, which calls the dictionary
  API) and fully-local modules (Phrasal Verbs, where `resolveEntry` is just a
  pass-through) — the hook doesn't know or care which kind it's driving.
- `hooks/useModuleProgress.ts` — saved/known/learning state, namespaced by
  `moduleId` in storage.

The Stream page (`app/stream/page.tsx`) reads the list of modules from
`lib/registry.ts` and renders `ModuleStreamView` for whichever one is active — it
has no Vocabulary- or Phrasal-Verb-specific code in it at all.

**Adding a new module** (e.g. Grammar) means:
1. `types/grammar.ts` — its data shape.
2. `lib/grammar/data.ts` — the actual content. **This is the only file you touch
   to update a category's data later** — it never requires changes to the Stream,
   storage, or any other module.
3. `lib/grammar/selection.ts` — a ~15-line filter function.
4. `components/grammar/GrammarStreamCard.tsx` — how one entry renders.
5. `lib/modules/grammar.ts` — the `ContentModule` object tying the above together.
6. One line in `lib/registry.ts`.

That's it — it automatically appears in the Stream's content-type switcher with
its own filter tabs, gets its own Saved/Learning tracking, and needs zero changes
to any existing file beyond the registry line.

**Dictionary provider abstraction.** The UI never calls an external API directly — it
calls `dictionaryProvider.getWord() / .searchWords() / .getSuggestions()`
(`lib/dictionary/provider.ts`). Today that's implemented by
`freeDictionaryProvider.ts`, which normalizes Free Dictionary API responses (and 20
hand-written sample entries) into the internal `WordEntry` shape, routing browser
calls through `app/api/word/[word]/route.ts` (a same-origin server proxy — avoids
CORS/ad-blocker fragility and enables shared server-side caching). Swapping in a
licensed API or an internal database later means writing one new file that satisfies
the same interface — no component changes required.

**Data model.** `WordEntry` supports multiple parts of speech and multiple definitions
per word (see `types/dictionary.ts`) rather than assuming one sense per word. Every
enrichment field is optional; the word-detail page hides empty sections instead of
rendering blank cards.

**Selection logic.** `lib/word-selection.ts` and `lib/phrasalVerbs/selection.ts`
currently do randomized selection within a filter, biased away from recently shown
entries. This is intentionally the single seam for adding spaced repetition later —
swap the random pick for a priority-queue lookup inside a module's `selectNext`
without touching `useModuleStream` or any component.

**Storage.** `lib/storage.ts` is generic and module-scoped (`getModuleStatusMap`,
`getModuleSavedSlugs`, etc., all parameterized by `moduleId`) rather than one
hand-written set of functions per module. If Supabase auth + a database are added
later, only this file needs to change.

## Where the data comes from

`data/core-3000.json` contains only **factual metadata** — word, part of speech, and
CEFR level — derived from a standard frequency list. It contains **no definitions,
examples, or other copyrighted editorial content**. All definitions/examples shown in
the app are either normalized from the open Free Dictionary API or, for the 20 sample
words used as offline-friendly demo content (*ability, accept, achieve, acquire,
adventure, affect, approach, benefit, challenge, confidence, develop, essential,
experience, improve, knowledge, opportunity, progress, relevant, strategy, valuable*),
written originally for this product.

`lib/phrasalVerbs/data.ts` (~448 phrasal verb entries) is entirely original content —
meanings, simple definitions, examples, and synonyms were all written specifically for
this product. It was not extracted, transcribed, or checked against any published
phrasal verb dictionary. Coverage was informed by two legitimate, non-proprietary
sources: (1) published academic corpus-frequency research on English phrasal verbs
(Gardner & Davies 2007; Liu 2011) — open research findings, not any single publisher's
content — used to identify which verb+particle combinations matter most, and (2) an
independently compiled study list (own definitions/examples, not a scan of a
dictionary) used as a cross-check for additional coverage. In both cases only the
*list of which phrasal verbs to cover* was informed by these sources; every
definition, example, and piece of grammatical metadata (separable/transitive/
formality) was written from scratch for this product.

`lib/grammar/data.ts` (66 grammar points) is entirely original content — every
explanation, structure formula, example sentence, and common-mistake note was
written from scratch for this product. Coverage and CEFR-level placement follow
standard, widely-taught ESL curriculum structure — the same categories any general
English course or the CEFR's own published framework cover (tenses, articles,
modals, conditionals, passive voice, reported speech, relative clauses, and so on)
— not copied from any single textbook or proprietary grammar reference.

`lib/idioms/data.ts` (154 idioms) is entirely original content — every meaning,
definition, and example sentence was written from scratch for this product. Idioms
are common, widely-shared everyday language, not any single publisher's content;
coverage was chosen for everyday usefulness across common themes (body, animals,
food, money, work, communication, and more) rather than to match any specific
existing reference work.

`lib/prepositions/data.ts` (96 entries) is entirely original content — every usage
explanation and example sentence was written from scratch for this product.
Prepositions are core grammatical function words, not any single publisher's
content. Coverage deliberately excludes verb + preposition combinations (e.g.
"depend on"), since those are already covered as prepositional verbs in the
Phrasal Verbs module.

## Local installation

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Environment variables

None are required — see `.env.example`. The default dictionary provider (Free
Dictionary API) is public and keyless. If you add a licensed provider later, put its
credentials in `.env.local` and read them only from server-side code (never prefix a
secret with `NEXT_PUBLIC_`).

## Development commands

```bash
npm install       # install dependencies
npm run dev       # start the dev server
npm run build     # production build
npm run start     # run the production build locally
npm run lint      # ESLint
```

## Importing your complete Core 3000 word list

The app ships with all ~3,000 words already parsed into `data/core-3000.json`
(word / part of speech / CEFR level only). To replace it with your own list:

```bash
node scripts/import-words.js path/to/your-list.csv
# or
node scripts/import-words.js path/to/your-list.json
```

**CSV format** (header row required):
```csv
word,partOfSpeech,level
acquire,verb,B2
ability,noun,A2
```

**JSON format:**
```json
[{ "word": "acquire", "partOfSpeech": "verb", "level": "B2" }]
```

CEFR levels are normalized to `A1/A2/B1/B2` (case-insensitive). Rows missing a word or
with an unrecognized level are skipped and reported in the console — never silently
dropped. The script writes directly to `data/core-3000.json`, overwriting the existing
file, so commit or back up first if you want to keep the original.

To add richer curated content (definitions, examples, etc.) for specific words the way
the 20 sample entries work, add entries to `SAMPLE_WORDS` in
`lib/dictionary/sampleWords.ts` — anything not listed there falls back to the live
Free Dictionary API automatically.

## Deploying

### GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### Vercel

1. Import the repository at [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Next.js** (auto-detected). No environment variables required
   for the default setup.
3. Deploy. `npm run build` runs automatically.

> **Note on fonts:** this project uses `next/font/google` (Fraunces, Inter, IBM Plex
> Mono), which fetches font files from Google Fonts at build time. This requires the
> build environment to have normal internet access — true on your machine and on
> Vercel by default. (It is the *only* reason a build would fail in a network-locked
> sandbox; everything else — TypeScript, ESLint, and the app logic — has been verified
> to build and run cleanly.)

## Known limitations

- Progress, saved words, and history are stored per-browser in `localStorage` — they
  don't sync across devices. Multi-device sync would require the Supabase layer
  described below.
- Only 20 words have hand-curated rich content (definitions written specifically for
  this product); every other Core 3000 word is enriched live from the Free Dictionary
  API, which occasionally lacks an entry for less common words or returns thinner data
  than a licensed dictionary would.
- Audio pronunciation depends on what the Free Dictionary API has recorded for a given
  word; when it's missing, the app falls back to the browser's built-in speech
  synthesis, which varies in quality by device/browser.
- Word Stream selection is random-within-filter, not adaptive — see the roadmap below.
- No offline/PWA support yet; the Stream and word lookups require a network connection
  for anything beyond the 20 sample words.

## Roadmap

- **Five content modules now live**: Vocabulary, Phrasal Verbs, Grammar, Idioms,
  and Prepositions — all built on the same generic module system
  (`useModuleStream`, `useModuleProgress`, `lib/registry.ts`), proving the "add a
  category without touching the Stream/storage/other modules" pattern out at
  scale. Further categories (collocations, functional/situational language, etc.)
  follow the exact same recipe in "Adding a new module" above.
- **Little Learners / Young Learners tracks (ages 3+)** — a separate curriculum
  track (`track: "kids"` in `ContentModule`) alongside the existing adult CEFR
  track, using the established Dolch/Fry sight-word progression and standard
  phonics scope-and-sequence (letter sounds → CVC words → blends → sight words)
  rather than CEFR, which doesn't fit pre-literate learners. Needs its own UI
  shell (audio-first, large touch targets, no reading required, parent
  dashboard, ad-free/account-free) more than new module plumbing — the content
  layer reuses the same `ContentModule` pattern.
- **Accounts & sync** — Supabase auth + Postgres, replacing `lib/storage.ts` so
  progress/saved/history sync across devices.
- **Spaced repetition** — replace the random pick in each module's
  `selectNext` with a recall-confidence/due-date priority queue; the module
  interface already isolates this to one function per module.
- **Daily goals & streaks** built on top of the existing progress tracking.
- **AI-generated word explanations & practice sentences**, and lightweight quizzes.
- **Larger dictionary** — swap or layer a 100,000+ word provider behind the existing
  `DictionaryProvider` interface.
- **PWA / offline mode** — Phrasal Verbs already works fully offline since its data
  is local; extending this to the Vocabulary module (caching dictionary responses)
  is the next step.
- **Browser extension** for in-page lookups.
- **Additional languages**, both for UI and for a second target language's vocabulary.
