# AHU / ATR-BPN portal workflow

This release is a manual portal companion, not a live government API integration.

- Entry: `/lexnusa/notaris/demo?tab=portal` or the AHU / ATR-BPN workspace tab.
- Link each application to a matter owned by the same office.
- Prepare the checklist and optionally download a plain-text companion sheet. It is not an official import format.
- The authorized operator submits through `https://ahu.go.id/` or `https://mitra.atrbpn.go.id/` independently.
- Record the reference, submission date, observation date, and observed portal status in LexNusa.
- Upload result evidence in Documents, linked to that same matter. Select it before recording “Hasil diterima”.
- All statuses have manual provenance. The application sends no data to either government portal and stores no portal credentials.

## Data and access

Applications use `lexnusa_notary_records.kind = submission`; existing owner-only RLS and optimistic version checks remain in force. Evidence must be an uploaded document in the same office and matter. Linked evidence cannot be moved to another matter or have its path changed. Audit entries include the manually recorded provider and status. The public demo uses fictional, in-memory data and cannot upload evidence.

Migration: `20261027072328_lexnusa_notaris_portal_workflow.sql`.
Tests: `node --test tests/notaris-model.test.cjs`; SQL files `tests/notaris-rls.sql` and `tests/notaris-portal-rls.sql` run with synthetic identities in rolled-back transactions.

## Before enabling an automatic connector

Obtain authorized technical documentation for each provider and service, including approved use, endpoint and sandbox URLs, authentication/scopes, data schema, status semantics, idempotency, rate limits, error formats, and webhook/polling rules. Confirm access with the agency, configure credentials through server-side secret management, and run sandbox end-to-end tests. Keep externally verified statuses separate from operator observations. Do not enable an adapter based on guessed endpoints, scraped sessions, or news announcing API initiatives.

Official portal links were checked on 2026-10-27. No usable public API specification or authorized API credentials were available during implementation.
