# Public programme information alignment

## Purpose

Make the existing learning programmes easier to compare, and keep the Indonesian homepage, Institute programme overview, pilot page, and registration page consistent.

## Changes

- A shared public catalogue supplies Institute pilot dates, fees, capacity, workload and completion requirements, plus LexNusa's unannounced intake status.
- Both homepages show three programme cards. Indonesian visitors also receive translated research highlights and evidence sections.
- Indonesian navigation and the global footer use translated labels and preserve localized links where a translated route exists.
- The Institute overview links to guided pilot details. The pilot page now states its existing dates, audience, cost, capacity and support arrangements in Indonesian.
- The module overview includes the portfolio requirement already stated on the pilot page; this does not change eligibility enforcement.
- LexNusa explains its audience, prerequisites, five deliverables, review and certificate process. Dates and fees remain unannounced. Its inquiry button opens the visitor's email client; it does not subscribe anyone or send messages automatically.
- No new programme, price, intake date, admission rule, authentication or database change is introduced.

## Source of programme facts

The existing module overview and registration page list the Institute pilot as 5 October–1 November 2026, free, for 20–30 participants. The pilot page already requires eight modules, quiz scores of at least 70, a final reflection, and a human-verified portfolio score of at least 60/100. The existing LexNusa cohort page says its dates, fees and registration opening will be announced later.

The Institute roadmap already places the learning platform and pilot in 2026 on current main. This change clarifies the milestone and fixes its dash encoding; it does not move the milestone from 2027.

## Validation

- TypeScript: `tsc --noEmit --incremental false` passed.
- ESLint on all changed TS/TSX files passed.
- Static React rendering passed for both homepages, navigation, footer, LexNusa cohort, Institute home, pilot and module overview. Expected language, dates and status text were checked, and every internal path in these rendered outputs resolves to an existing route or public file.
- The rendering harness mocks Next.js link/image/navigation primitives; it is not a full browser or authentication test.
- Local browser verification was blocked with `ERR_BLOCKED_BY_CLIENT` for the preview address. Desktop/mobile layout and full deployment build remain to be checked on a reachable preview before production release.
