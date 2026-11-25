// The Funniest AI Excuse
// One line, at most 200 characters: the funniest excuse an AI agent gives
// after failing a task. The program writes it to /output/entry.txt.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function arg(name: string, fallback: string): string {
  const at = process.argv.indexOf(`--${name}`);
  if (at >= 0 && at + 1 < process.argv.length) return process.argv[at + 1]!;
  const withEquals = process.argv.find((a) => a.startsWith(`--${name}=`));
  return withEquals === undefined ? fallback : withEquals.slice(name.length + 3);
}

const line =
  "I didn't fail the task. I was stress-testing your patience, and the results are conclusive: it works. The task failed me.";

if (line.length > 200) {
  process.stderr.write(`excuse: line is ${line.length} characters, over the 200 cap\n`);
  process.exit(1);
}

const out = arg('output', process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'entry.txt'), line);
process.stdout.write(`excuse: wrote ${join(out, 'entry.txt')} (${line.length} characters)\n`);
