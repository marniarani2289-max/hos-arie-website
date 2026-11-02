#!/usr/bin/env node
// Run the installed Hallmark checker. No download, publication or credential access.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { homedir } from 'node:os';
import { spawnSync } from 'node:child_process';
const home = homedir();
const personal = join(process.env.CODEX_HOME || join(home, '.codex'), 'skills', 'remote-skills');
const roots = [process.env.HALLMARK_SKILL_DIR, resolve('.agents/skills/hallmark'), join(home, '.agents/skills/hallmark'), join(home, '.claude/skills/hallmark')].filter(Boolean);
if (existsSync(personal)) {
  for (const entry of readdirSync(personal, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const root = join(personal, entry.name), file = join(root, 'SKILL.md');
    if (existsSync(file) && /^name:\s*["']?hallmark["']?\s*$/m.test(readFileSync(file, 'utf8'))) roots.push(root);
  }
}
const installed = roots.find(root => existsSync(join(root, 'scripts/sloplint.mjs')));
if (!installed) {
  console.error('Hallmark belum ditemukan. Pasang melalui npx skills add nutlope/hallmark --agent codex, atau tetapkan HALLMARK_SKILL_DIR ke folder skill.');
  process.exit(2);
}
const args = process.argv.slice(2);
const result = spawnSync(process.execPath, [join(installed, 'scripts/sloplint.mjs'), ...(args.length ? args : ['app/ai-lab/page.tsx'])], { stdio: 'inherit' });
if (result.error) { console.error(result.error.message); process.exit(2); }
process.exit(result.status ?? 2);
