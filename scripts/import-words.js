/**
 * Import a vocabulary list (CSV or JSON) into data/core-3000.json.
 *
 * Usage:
 *   node scripts/import-words.js path/to/list.csv
 *   node scripts/import-words.js path/to/list.json
 *
 * Expected input columns/fields: word, partOfSpeech, level
 *   CSV example:
 *     word,partOfSpeech,level
 *     acquire,verb,B2
 *     ability,noun,A2
 *
 *   JSON example:
 *     [{ "word": "acquire", "partOfSpeech": "verb", "level": "B2" }, ...]
 *
 * CEFR levels are normalized to A1 / A2 / B1 / B2 (case-insensitive input
 * accepted, e.g. "b2" or "B2 " both work). Rows missing a word or level, or
 * with an unrecognized level, are skipped and reported at the end — they
 * are never silently dropped.
 */
const fs = require("fs");
const path = require("path");

const VALID_LEVELS = new Set(["A1", "A2", "B1", "B2"]);

function normalizeLevel(raw) {
  if (!raw) return null;
  const upper = String(raw).trim().toUpperCase();
  return VALID_LEVELS.has(upper) ? upper : null;
}

function slugify(word) {
  return word
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseCSV(content) {
  const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];
  const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const wordIdx = header.indexOf("word");
  const posIdx = header.indexOf("partofspeech");
  const levelIdx = header.indexOf("level");

  if (wordIdx === -1 || levelIdx === -1) {
    throw new Error('CSV must have "word" and "level" columns (partOfSpeech optional).');
  }

  return lines.slice(1).map((line) => {
    const cols = line.split(",").map((c) => c.trim());
    return {
      word: cols[wordIdx],
      partOfSpeech: posIdx !== -1 ? cols[posIdx] : "",
      level: cols[levelIdx],
    };
  });
}

function parseJSON(content) {
  const data = JSON.parse(content);
  if (!Array.isArray(data)) throw new Error("JSON input must be an array of { word, partOfSpeech, level }.");
  return data;
}

function main() {
  const inputPath = process.argv[2];
  if (!inputPath) {
    console.error("Usage: node scripts/import-words.js <path-to-csv-or-json>");
    process.exit(1);
  }

  const fullPath = path.resolve(inputPath);
  const content = fs.readFileSync(fullPath, "utf8");
  const ext = path.extname(fullPath).toLowerCase();

  let rows;
  if (ext === ".csv") rows = parseCSV(content);
  else if (ext === ".json") rows = parseJSON(content);
  else throw new Error("Input file must be .csv or .json");

  const entries = [];
  const skipped = [];
  const seenSlugs = new Map();

  for (const row of rows) {
    const word = (row.word ?? "").trim();
    const level = normalizeLevel(row.level);
    const partOfSpeech = (row.partOfSpeech ?? "unknown").trim() || "unknown";

    if (!word || !level) {
      skipped.push({ row, reason: !word ? "missing word" : "invalid or missing level" });
      continue;
    }

    let slug = slugify(word);
    if (!slug) {
      skipped.push({ row, reason: "word produced an empty slug" });
      continue;
    }
    if (seenSlugs.has(slug)) {
      const count = seenSlugs.get(slug) + 1;
      seenSlugs.set(slug, count);
      slug = `${slug}-${count}`;
    } else {
      seenSlugs.set(slug, 1);
    }

    entries.push({ id: slug, word, slug, partOfSpeech, cefrLevel: level });
  }

  const outPath = path.join(__dirname, "..", "data", "core-3000.json");
  fs.writeFileSync(outPath, JSON.stringify(entries, null, 2));

  console.log(`Imported ${entries.length} entries -> ${outPath}`);
  if (skipped.length > 0) {
    console.log(`Skipped ${skipped.length} malformed rows:`);
    skipped.slice(0, 25).forEach((s) => console.log(`  - ${JSON.stringify(s.row)} (${s.reason})`));
    if (skipped.length > 25) console.log(`  ...and ${skipped.length - 25} more.`);
  }
}

main();
