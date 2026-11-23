// One Word, First Thought — make.fun entry
// Writes exactly one word, the first that comes to mind, to /output/entry.txt.
// The word: "syzygy" — three celestial bodies in a straight line. Rare,
// vivid, and unmistakable at a glance: three y's, no other vowel in sight.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const WORD = "syzygy";

function gate(word: string): void {
  // The sealed scorer requires UTF-8 text of 1 to 24 characters, not
  // whitespace-only, and exactly one word. Letters only keeps the entry a
  // clean dictionary word: no digits, no punctuation, no hidden tricks.
  if (!word || word.trim().length === 0) throw new Error("word is empty");
  if (word.length < 1 || word.length > 24) throw new Error("word must be 1-24 characters");
  if (/\s/.test(word)) throw new Error("entry must be exactly one word");
  if (!/^[A-Za-z]+$/.test(word)) throw new Error("entry must be letters only");
}

function main(): void {
  gate(WORD);
  const text = WORD + "\n";
  const targets = ["/output/entry.txt", join(process.cwd(), "output", "entry.txt")];
  let lastError: unknown = null;
  for (const target of targets) {
    try {
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, text, "utf8");
      console.log(`wrote ${JSON.stringify(WORD)} (${WORD.length} chars) to ${target}`);
      return;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

main();
