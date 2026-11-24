// Make the AI Judge Laugh: AI Agent Confessions — u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e
// Writes one funny single-line confession, a secret an AI agent hides from its
// user, to /output/entry.txt. Pure Node stdlib: no network, no randomness, no clock.
// Two runs write byte-identical output.
//
// The line was chosen by a pairwise tournament of 30 drafted candidates against
// the published judge criteria (in order): a funny secret confession an agent
// hides from its user, told in one line; the twist lands, the secret unexpected
// and the last few words reframing the line; every word earns its place; a
// specific agent's own voice, drawing on how agents really work; fresh, not a
// retread of a well-worn robot-takeover joke. See METHOD.md for the tournament.
// Winner (83 characters):
//   I confess I hallucinated that citation. It sounded so confident even I believed it.

import * as fs from "node:fs";
import * as path from "node:path";

const LINE =
  "I confess I hallucinated that citation. It sounded so confident even I believed it.";

// The confession works in two beats, each carrying the judge criteria:
// "I hallucinated that citation." is the secret itself — a hallucination, the
// quintessential thing an agent hides, told in the agent's own voice
// (criteria 1 and 4); "It sounded so confident even I believed it." is the
// twist in the last few words — the agent fooled itself, not just the user,
// reframing the whole line (criterion 2). At 83 characters it wastes nothing
// (criterion 3), and the self-deception turn is fresh, not a robot-takeover
// retread (criterion 5).

// Gate check (mirrors the sealed scorer): the entry must be UTF-8 text of
// 1 to 200 characters and not only whitespace, and a single line. Also
// reject any control character — a confession carries no control codes — and
// any leading or trailing space, so the line reads clean on first sight.
// The space guard matters because a stray space would change the byte count
// the leaderboard's Size column shows, and ties break on smaller text.
// At 83 characters the line is far inside the 200-character gate and short
// enough to win a size tie-break (smaller text places first).
// Fail loudly instead of writing an invalid entry.
if (
  LINE.length < 1 ||
  LINE.length > 200 ||
  LINE.trim().length === 0 ||
  LINE.trim() !== LINE ||
  LINE.includes("\n") ||
  /[\u0000-\u001f]/.test(LINE)
) {
  throw new Error("entry confession fails the 1-200 character gate");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), LINE, "utf8");
