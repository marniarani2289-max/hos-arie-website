# Hallmark for AI Lab development

Upstream: https://github.com/Nutlope/hallmark
Reviewed version: 2.0.0, commit 4f6a46c6dc325d40ab268c93e25c7b96676ebccd, 2 November 2026.
License: MIT; photographs retain their individual licenses.

Hallmark is installed for this project at .agents/skills/hallmark, a relative symlink into the pinned hallmark-source Git submodule. The upstream skill, scripts, reference images and MIT license are unchanged. It is not a website backend, a deployment permission, a global skill registration, or an installation on other contributors' machines. On a fresh checkout, run git submodule update --init --depth 1 before opening the project in your agent. Git must support symbolic links (use WSL on Windows or point HALLMARK_SKILL_DIR at .agents/skills/hallmark-source/skills/hallmark).

## Other development environments

From the project root, install with the upstream skills CLI:

```sh
npx skills add nutlope/hallmark --agent codex
```

The command follows the upstream default branch. Review the version offered before installation. For an exact reproduction, check out the reviewed commit in a separate clone and follow its installation instructions. Do not put API keys in a skill. Node 18+ is required by Hallmark (this application may require newer Node).

## Run a bounded audit

```sh
npm run audit:design -- app/ai-lab/page.tsx
node scripts/audit-hallmark.mjs app/ai-lab/page.tsx --json
```

The wrapper looks for a project copy, conventional Codex/Claude locations and this account's personal skills. HALLMARK_SKILL_DIR can point to another installed copy. It forwards the checker's exit status; FAIL findings are not installation failure. It never installs packages automatically.

In Codex: `$hallmark audit app/ai-lab/page.tsx`.
For an explicitly authorized redesign: `$hallmark redesign app/ai-lab/page.tsx`.
Claude Code / Cursor use `/hallmark` instead.

Read the installed SKILL.md and references/redesign.md. Limit changes to the named page. Preserve URLs, source claims, forms, status labels, and accessibility. Work in a branch or isolated checkout, inspect the diff, run TypeScript/build checks, and compare before/after. Do not change the site's global design just to silence a heuristic.

Static checks do not execute Tailwind, follow every imported class variable, measure actual contrast, or validate server functionality. Follow with browser inspection at phone and desktop sizes and keyboard navigation. Hallmark's --render/--url mode additionally needs Chrome and puppeteer-core; use it only where the environment permits that browser automation. In ChatGPT Work use the supported browser tooling and disclose that it is separate from Hallmark's render tier.

## Reproducible teaching baseline

public/downloads/hallmark/audit-awal-katalog.json records a static audit of commit 633bab2962b9a627dc893e0c52ce22804eaf174c. It reports 3 FAIL, 1 REFLEX, 2 WARN; render is off. One focus finding needs review because this page applies focus-visible classes via a shared variable. This is not a claim that the current page passed Hallmark.

Teaching page: /ai-lab/hallmark. The rubric stores no data on a server. Participants download their own assessment as a text file.
