# Constitutional Justice: PKPA and UPA learning site

Routes:
- `/constitutional-justice/pkpa`: public programme and learning introduction.
- `/constitutional-justice/pkpa/materi`: six introductory lessons, local reading progress, fictional writing exercise and self-review rubric.
- `/constitutional-justice/pkpa/latihan-upa`: original practice bank, topic selection, learning mode, timed simulation, review and plain-text results export.

The parent Constitutional Justice homepage and footer link to this service. It is not part of LexNusa.

## Scope and editorial status

24 original questions cover professional responsibility, ethics, basic civil procedure, mediation, arbitration and constitutional litigation. The bank is an introductory subset, not a full UPA syllabus or official exam reproduction. Criminal procedure, administrative courts, religious courts, industrial relations and other topics are explicitly not yet included. All questions have a source URL and provision reference in `lib/cji/upa.ts`. Official texts and institutional sources were checked on 27 October 2026. Review legal developments and provider-specific exam requirements before expanding the bank.

PKPA cohorts are not open. No partner, schedule, instructor roster, price, accreditation or official certificate is claimed. The programme inquiry links to the existing contact page. No enrolment fee or payment flow is enabled.

## Learning behaviour

- Learning mode has immediate explanations after checking; checked answers are locked.
- Simulation uses a custom one-minute-per-question limit, not an official UPA duration. Its absolute deadline survives reload; expiration is evaluated again on interaction.
- Correct answers receive one point; incorrect and blank answers receive zero. Scores are normalized to 100, without a pass/fail designation.
- Sessions, the last ten result summaries, reading progress and exercise drafts use browser-local storage. No backend account, cross-device synchronization or official credential is provided.
- Download exports include results and references, or the fictional draft and rubric. Learners are asked to avoid real client data.
- Storage failures are shown to the learner; the core exercise can continue in memory.

## Verification

`node --test tests/cji-upa.test.cjs` checks bank integrity, scoring including answer index zero, shuffled question preservation, stored session validation, and deadline expiry. TypeScript and the production build validate the routes. Browser QA should cover learning feedback, result scoring, retry, reload recovery, timed mode and writing persistence.

When changing content, bump `BANK_VERSION` to invalidate sessions tied to changed questions. Keep stable question IDs or introduce new IDs for substantially changed questions. Do not claim official endorsement or activate PKPA enrolment without confirmed programme details.
