# Constitutional Justice workspace

Route: `/constitutional-justice/workspace`. Public CJI hero and footer link to it; existing website login retains the destination.

## Capabilities

Shared internal office: clients, matters, hearings, follow-up tasks, appointments, decisions, finance and contacts. Create/edit, module search, status filters, relationship drill-down, 14-day agenda, overdue tasks and CSV export. All input/display times use Asia/Jakarta. Finance totals include only paid entries. No automatic publication of case data. No outbound reminders, file uploads, payroll or payment processing in this version.

## Access and data

Migration `20260929021334_cji_workspace.sql` creates cji_members and cji_records with RLS. The verified existing owner account is bootstrapped by email. Public account registration grants no workspace permissions. Each member sees the office's shared records; this is not a multi-firm product. Administrators can provision editor/viewer memberships through the database after confirming the intended account; no public membership mutation endpoint exists.

Anonymous users have no table grants. Nonmembers see no records. Viewers can read/export; owner/editor can create and update. No hard-delete permission is granted. Database constraints validate statuses and relation kinds; update guard preserves identity. API checks the authenticated user, membership, request origin and data. Updates use an optimistic updated_at predicate to prevent overwriting newer edits. Failed saves keep form contents for correction. The service-role key is not used.

## Validation

`node tests/cji-model.cjs`: parser, relations, amounts, date conversion and unsafe links.
`npx tsc --noEmit` and focused ESLint.
Database tests in a rolled-back transaction: owner insert/read/update, invalid parent rejection, viewer write denial, nonmember read and insert denial. Security advisors showed no CJI-specific finding.

Browser automation in the execution container was unavailable (browser daemon startup and browser download failures). Production build and signed-out route checks must be tracked separately; these do not prove an authenticated end-to-end browser flow.
