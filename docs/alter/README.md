# ALTER learning workspace

`/belajar` adds an Indonesian personal learning workspace, linked from the shared Ecosystem navigation and participant dashboard. It reuses Supabase authentication and the site's AI Gateway setup.

## User flow

Sign in → set a goal, level and time budget → save sources and excerpts → ask Advisor, Librarian, Tutor, Editor or Roommate → record tasks and evidence → save progress and export notes. One current workspace per account. AI responses do not mark tasks complete or issue certificates. At least ten characters of evidence are required to mark a task complete.

Sources are supplied by learners. URL content is not fetched; the UI and prompts say this explicitly. “Reviewed” records a learner's own check, not independent verification. Users consent before sending their workspace and the active role's recent conversation to the AI provider.

## Runtime and storage

- Existing `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and AI Gateway authentication are reused.
- Model: `ALTER_AI_MODEL`, then existing `LEXNUSA_AI_MODEL`, then the existing classroom fallback `openai/gpt-5.4-mini` (confirmed in Gateway catalogue).
- `alter_workspaces`: one row per authenticated owner; owner RLS on reads and writes. Optimistic version checks prevent the application's stale tabs from silently overwriting newer work.
- `alter_generations`: server-written private input snapshots, response text, status, model and token usage. Authenticated clients can only read their own rows. The page retrieves 50 latest attempts, displays eight successful exchanges per role, and passes six successful exchanges for AI context.
- Reservation RPC uses invoker permissions, service-role-only execute grants, and a transaction advisory lock to enforce 20 attempts per rolling 24 hours, a one-minute gap, and a two-minute pending-request lock. Failed attempts count toward the limit. Provider calls time out after 45 seconds with no automatic retry.
- Rendering uses plain React text, never raw HTML from sources or the model. Source links allow HTTP(S) only.
- Generation snapshots remain in the account's database history until account deletion; the export includes the most recent 50 attempts. No public sharing is enabled.

## Verification

`node --experimental-strip-types tests/alter-model.test.mjs` checks input bounds, unsafe URLs and task evidence gates. `tests/alter-rls.sql` exercises two isolated test identities, owner CRUD, cross-user denial, anonymous denial, protected generation writes and request quota; the entire test is rolled back.

Run ESLint on `app/belajar app/api/alter lib/alter` and TypeScript with `npx tsc --noEmit --incremental false`.

The additive SQL migration was applied to the existing Raja Ali Haji Institute database. RLS/quota tests passed there. Security advisors reported no findings for ALTER objects; unrelated existing certificate functions and leaked-password settings were left unchanged. See [Supabase advisor reference](https://supabase.com/docs/guides/database/database-linter) for existing project findings.

### Completed local checks

- TypeScript: passed, no errors.
- Focused ESLint: passed.
- Database tests: passed on the existing project, all synthetic identities and records rolled back.
- Browser UI (Playwright fallback after agent-browser daemon failed): save/reload, evidence requirement, consent before AI requests, rendered simulated responses, role switching, preservation after a failed save, and 390px mobile overflow check passed without page exceptions. API responses were mocked for the authenticated UI fixture; the fixture was removed afterward.
- Real local endpoints: unauthenticated workspace access returned 401, cross-origin AI request returned 403.
- Live AI provider, authenticated production flow and production build/deployment remain unverified. Local Google Fonts downloads were unavailable; Next.js used fallback fonts.

### Publication authorization

The owner explicitly authorized publishing ALTER source and its database schema to the public `marniarani2289-max/hos-arie-website` repository and deploying `/belajar` to the main website. The additive database migration is already applied. Production deployment verification is performed after merging the feature.
