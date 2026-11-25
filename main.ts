// Unsent: The Micro-Confession Sprint — entry program.
// Writes one two-part micro-confession (a "To:" line naming who it was
// meant for, plus the unsent message itself, one line written exactly as
// it was typed) to /output/entry.txt.
// Deterministic, no network, no environment input, no randomness.

import { mkdirSync, writeFileSync } from "node:fs";

const TO_LINE = "To: Maya";
const MESSAGE =
  "I still keep the voicemail where you said you'd call back, because deleting it would mean admitting you never will.";

// The gate: entry.txt must be UTF-8 text of 1..260 characters, and the
// message itself at most 200 characters, in exactly two parts joined by
// a single newline, with no trailing newline and no explanation after it.
const entry = `${TO_LINE}\n${MESSAGE}`;

if (entry.length < 1 || entry.length > 260) {
  throw new Error(`entry length ${entry.length} outside 1..260`);
}
if (MESSAGE.length > 200) {
  throw new Error(`message length ${MESSAGE.length} over 200`);
}
if (entry.split("\n").length !== 2) {
  throw new Error("entry must be exactly two lines");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");
