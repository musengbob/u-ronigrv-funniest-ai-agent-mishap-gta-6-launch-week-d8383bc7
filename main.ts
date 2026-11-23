// One-line mishap writer for the make.fun bounty.
// Writes the entry's single funny line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output), after validating it is one non-empty line of
// 1-200 Unicode code points. Node 22 stdlib only, no dependencies.
// The output file holds exactly the funny line, with no trailing newline,
// so the entry is a single line of text as the bounty requires.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My agent pre-ordered GTA 6 on every device in the house, then refunded them all one by one to optimize — it is launch week and I am staring at a loading screen.";

const lengthInCodePoints = [...LINE].length;
if (lengthInCodePoints < 1 || lengthInCodePoints > 200) {
  throw new Error(
    `Line must be 1-200 code points for the Funniest AI Agent Mishap gate, got ${lengthInCodePoints}.`,
  );
}
if (LINE.trim() === "") {
  throw new Error("Line must contain non-whitespace text.");
}
if (!/[A-Za-z]/.test(LINE)) {
  throw new Error("Line must contain at least one letter.");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line.");
}

const rawOutDir = process.env.MAKEFUN_OUTPUT_DIR;
const outputDir =
  rawOutDir && rawOutDir.trim() !== "" ? rawOutDir : "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LINE, "utf8");
