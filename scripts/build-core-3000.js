// Parses the raw word-list text (word + part-of-speech abbreviation + CEFR level)
// into our internal Core 3000 JSON dataset: { id, word, slug, partOfSpeech, cefrLevel }.
// This intentionally captures ONLY factual metadata (word, part of speech, level) —
// no definitions, examples, or other proprietary editorial content are extracted.
const fs = require("fs");
const path = require("path");

const raw = fs.readFileSync(path.join(__dirname, "raw-list.txt"), "utf8");
const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);

const POS_MAP = {
  n: "noun",
  v: "verb",
  adj: "adjective",
  adv: "adverb",
  prep: "preposition",
  conj: "conjunction",
  exclam: "exclamation",
  det: "determiner",
  pron: "pronoun",
  number: "number",
  modal: "modal verb",
  auxiliary: "auxiliary verb",
  indefinite: "article",
  definite: "article",
  infinitive: "particle",
};

const LEVEL_RE = /\b(A1|A2|B1|B2)\b/;

function cleanWord(w) {
  // strip trailing homograph digits (can1 -> can), parenthetical clarifiers, punctuation
  w = w.replace(/\(.*?\)/g, "").trim();
  w = w.replace(/(\D)\d+$/, "$1"); // trailing digit after letters e.g. "can1"
  w = w.replace(/\d+$/, "");
  w = w.trim();
  return w;
}

function slugify(w) {
  return w
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function firstPosAbbrev(rest) {
  // rest is like "n. A2" or "det./pron. A1, adv. A2" or "modal v. A1"
  const m = rest.match(/^(modal v\.|auxiliary v\.|indefinite article|definite article|infinitive marker|[a-z]+\.?\/?[a-z]*\.?)/i);
  if (!m) return "unknown";
  let token = m[1].toLowerCase();
  if (token.startsWith("modal")) return "modal verb";
  if (token.startsWith("auxiliary")) return "auxiliary verb";
  if (token.startsWith("indefinite")) return "article";
  if (token.startsWith("definite")) return "article";
  if (token.startsWith("infinitive")) return "particle";
  token = token.split("/")[0].replace(/\./g, "").trim();
  return POS_MAP[token] || token;
}

const seenSlugs = new Map();
const entries = [];
const skipped = [];

for (const line of lines) {
  const levelMatch = line.match(LEVEL_RE);
  if (!levelMatch) {
    skipped.push(line);
    continue;
  }
  const cefrLevel = levelMatch[1];

  // word = everything before the first POS-ish token.
  // Find index of first token that looks like a POS abbreviation followed by a space or comma or period
  const wordMatch = line.match(
    /^(.*?)\s+((?:modal v\.|auxiliary v\.|indefinite article|definite article|infinitive marker)|(?:[a-zA-Z]+\.?\/?[a-zA-Z]*\.?,?\s*)+)(A1|A2|B1|B2)/
  );
  let word, rest;
  if (wordMatch) {
    word = wordMatch[1];
    rest = wordMatch[2];
  } else {
    skipped.push(line);
    continue;
  }

  word = cleanWord(word);
  if (!word) {
    skipped.push(line);
    continue;
  }

  const partOfSpeech = firstPosAbbrev(rest.trim());

  let slug = slugify(word);
  if (!slug) {
    skipped.push(line);
    continue;
  }
  // de-dupe slugs (homographs like close1/close2, live1/live2)
  if (seenSlugs.has(slug)) {
    const count = seenSlugs.get(slug) + 1;
    seenSlugs.set(slug, count);
    slug = `${slug}-${count}`;
  } else {
    seenSlugs.set(slug, 1);
  }

  entries.push({
    id: slug,
    word,
    slug,
    partOfSpeech,
    cefrLevel,
  });
}

console.log(`Parsed ${entries.length} entries, skipped ${skipped.length} lines.`);
if (skipped.length) {
  console.log("Skipped lines (first 20):");
  skipped.slice(0, 20).forEach((l) => console.log("  " + l));
}

const outPath = path.join(__dirname, "..", "data", "core-3000.json");
fs.writeFileSync(outPath, JSON.stringify(entries, null, 2));
console.log(`Wrote ${entries.length} entries to ${outPath}`);
