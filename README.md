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
  browser's SpeechSynthesis API. Never autoplays (except in Kids Mode — see below).
- **Light & dark themes**, full keyboard accessibility, reduced-motion support, and a
  distinct editorial visual identity (not a generic AI-SaaS template).
- **Kids Mode** (`/kids`) — a separate, audio-first learning experience for young
  children (ages ~3+), deliberately not built on the adult Stream/CEFR system since
  a pre-reader's needs are genuinely different. See "Kids Mode" below.

## Kids Mode

Kids Mode is a distinct product surface, not just another content module — a
3-year-old doesn't need CEFR levels, filters, or a save/know/learning trichotomy.
It has its own visual theme (`.kids-mode` in `globals.css`: brighter palette, a
playful rounded display font, bigger touch targets), its own header with no adult
navigation, and a parent gate (a simple math question) before leaving back to the
main app.

**Three activities**, each a simple audio-first flashcard flow with big
Previous/Next arrows and an "I did it!" star button instead of complex progress
tracking:
- **First Words** (`/kids/words`) — ~85 everyday words across 11 topics (animals,
  colors, numbers, shapes, family, food, body, clothes, vehicles, weather, actions),
  each with an emoji, the word, and a short sentence.
- **ABC Letters** (`/kids/alphabet`) — all 26 letters with a phonics sound hint and
  two example words each, plus a **letter-tracing activity** (`/kids/alphabet/[letter]/trace`)
  — draw over a faint guide letter with a finger or mouse; completion is detected
  by a canvas-based coverage check (see below), not just a static image.
- **Sight Words** (`/kids/sight-words`) — the Dolch Pre-Primer list, the standard
  40-word starting point for sight-word instruction (the same legitimacy tier as
  the Oxford 3000 list — a widely-taught, freely-reused word list, not any single
  publisher's proprietary content).

**Autoplay is intentional here** — this is the one deliberate exception to the
rest of the app's "never autoplay" rule. For pre-readers, hearing a word the
instant it appears is core to the pedagogy (the same pattern used by Khan Academy
Kids, Duolingo ABC, and similar apps), not an optional extra. Every card has an
always-visible mute toggle.

**Data model**: `types/kids.ts`, `lib/kids/words.ts`, `lib/kids/alphabet.ts`,
`lib/kids/sightWords.ts` — all original content. `lib/kids/storage.ts` is a
separate, much simpler localStorage layer than the adult `ContentModule` system
(a star counter and a per-activity seen-slugs set) — Kids Mode intentionally does
not use `useModuleStream`/`useModuleProgress`/`lib/registry.ts`, since forcing the
adult Stream's filter tabs and known/learning states onto a toddler's UX would
work against the product, not for it.

**Letter tracing** (`components/kids/LetterTraceCanvas.tsx`) — a genuine drawing
interaction, not a static illustration. The glyph is rendered once, off-screen, at
full opacity to classify a 20×20 grid of cells as "letter" or "background" by
sampling alpha at each cell's center. The visible canvas shows the same glyph
faintly as a guide; as the child draws with pointer events, each stroke point
marks its grid cell as "touched." Progress is `touched-letter-cells /
total-letter-cells`; crossing ~55% triggers the completion celebration and a
star — no external tracing/handwriting library, no stored image assets.

**Parent Dashboard** (`/kids/parents`) — gated by the same parent-gate math
question (shown on page load, so direct URL access is protected too, not just the
header button), showing total stars earned and per-activity progress (words seen
out of each activity's total). Everything is derived from the same local, on-device
storage — no accounts, nothing sent anywhere.

## Young Learners (`/young-learners`)

A third, distinct tier for ages ~7-12 — a bridge between Kids Mode (pre-readers)
and the adult CEFR track. Unlike Kids Mode, this content **does** use the generic
adult `ContentModule` system (`useModuleStream` / `useModuleProgress` /
`lib/registry.ts`), registered with `track: "kids"` — a field that existed in the
architecture since the original refactor but had never actually been used until
this tier. A 7-12 year old can read, so the Stream mechanic genuinely fits; it
just needed its own calmer visual theme (`.young-mode` — cool blues/teals instead
of Kids Mode's bright primary colors) and its own simpler UI components
(`components/youngLearners/*`), since the existing Stream UI components are
styled with adult theme tokens that don't carry over.

Two modules, both fully local (no network dependency):
- **Sight Words** (`lib/youngLearners/sightWords.ts`) — 139 words across the
  Dolch Primer, 1st Grade, and 2nd Grade tiers, the standard progression that
  follows Kids Mode's Pre-Primer list. Same legitimacy tier as Pre-Primer — a
  widely-taught, freely-reused word list.
- **Grammar** (`lib/youngLearners/grammar.ts`) — 20 concepts (nouns, verbs,
  adjectives, sentences, punctuation, synonyms/antonyms, contractions, and more)
  written for a 7-12 year old audience — simpler and more playful than the adult
  Grammar module, no CEFR references.

Navigation at `/young-learners/practice` is **manual, not timed** — unlike the
adult Stream's countdown, a reader controls their own pace with Previous/Next.
Under the hood this just passes a very large `intervalSeconds` to
`useModuleStream` to effectively disable its internal auto-advance, rather than
needing a hook-level change.

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
  kids/                    Kids Mode (ages ~3-6) — First Words, Alphabet
                            (+ letter tracing), Sight Words, Parent Dashboard
  young-learners/          Young Learners (ages ~7-12) — Sight Words tier 2 +
                            Grammar, via the generic ContentModule system
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
    grammar.ts                ContentModule implementation for Grammar
    idioms.ts                 ContentModule implementation for Idioms
    prepositions.ts           ContentModule implementation for Prepositions
    youngSightWords.ts         ContentModule (track: "kids") for Young Learners
    youngGrammar.ts             ContentModule (track: "kids") for Young Learners
  dictionary/
    provider.ts             DictionaryProvider interface (the abstraction)
    freeDictionaryProvider.ts  Free Dictionary API implementation (server + client paths)
    coreList.ts              Local Core 3000 lookup/search helpers
    sampleWords.ts            20 hand-written rich sample entries
  phrasalVerbs/
    data.ts                  ~448 original phrasal verb entries
    selection.ts              Stream selection logic
  grammar/, idioms/, prepositions/   Same data.ts + selection.ts pattern
  kids/
    words.ts, alphabet.ts, sightWords.ts, storage.ts   Kids Mode content + a
                              separate, much simpler star/seen-slugs storage layer
  youngLearners/
    sightWords.ts, grammar.ts, selection.ts   Young Learners content — reuses
                              the adult selection-function pattern
  word-selection.ts         Word Stream selection logic (spaced-repetition-ready)
  storage.ts                Generic, module-scoped localStorage layer

types/
  dictionary.ts             WordEntry, Definition, CEFRLevel, etc.
  phrasalVerb.ts             PhrasalVerbEntry, PhrasalVerbSense, Formality
  grammar.ts, idiom.ts, preposition.ts   Same pattern per module
  kids.ts, youngLearner.ts   Kids Mode and Young Learners content shapes
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
- **Kids Mode shipped** (`/kids`) — First Words (~85 words, 11 topics), ABC
  Letters (26, with a canvas-based letter-tracing activity), Sight Words (Dolch
  Pre-Primer, 40 words), and a Parent Dashboard (`/kids/parents`), with its own
  theme, parent gate, and star-based reward system.
- **Young Learners shipped** (`/young-learners`) — Sight Words (Dolch Primer +
  1st + 2nd Grade, 139 words) and simple Grammar (20 concepts), the first real
  use of the adult `ContentModule` system's `track: "kids"` field. Natural next
  steps for this whole 3-track structure (Kids / Young Learners / adult CEFR):
  - **3rd Grade Dolch tier** and a few more Young Learners grammar concepts,
    to round out the bridge toward the adult track.
  - **A visible transition point** — right now a learner has to manually
    navigate from Young Learners to the main app; a "ready for more?" prompt
    once most Young Learners content is marked known would make that handoff
    feel intentional rather than just another link in a footer.
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
