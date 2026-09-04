# AI Control Center Memory Seed

## Project context

### Hossibarani.com
Purpose: primary public hub for the wider digital ecosystem.
Current pattern: Next.js application with Supabase-backed authenticated areas and supporting services.

### Raja Ali Haji Institute
Purpose: learning, research, and public knowledge around Raja Ali Haji.
Priority: preserve learning access, certificate validation, and participant data boundaries.

### JMCS / Journal
Purpose: scholarly publishing and journal discovery.
Priority: editorial integrity, discoverability, and clear separation from operational/admin controls.

### SIMAKS
Purpose: school accreditation support workflow.
Priority: role-based onboarding, school claim/teams, and RLS-based data boundaries.

### LexNusa
Purpose: legal innovation, benchmark, and client-facing services.
Priority: conversion quality, evidence-backed portfolio, and safe handling of client/pilot data.

### Constitutional Justice Initiative
Purpose: public constitutional-law portfolio and professional track record.
Priority: accuracy, source quality, and restrained claims.

### Digital Archive
Purpose: long-term public research and heritage materials.
Priority: provenance, metadata, preservation, and discoverability.

### Hizbul Wathan Kepri
Purpose: information, administration, cadre development, and organisational consolidation.
Priority: authoritative organisational information and controlled administrative data.

## Decision memory

- Global website components should remain consistent across ecosystem pages where possible.
- Internationalisation is introduced gradually rather than duplicating the entire site at once.
- Participant/user data must be protected with database-level access controls; UI hiding alone is insufficient.
- Administrator capabilities must not rely on user-editable profile metadata.
- Security/QA review should be independent from the agent that authored a risky change.
- Production-impacting actions require a human approval boundary.
- Secrets must never be committed to repository memory or configuration files.

## Operational memory conventions

Future operational entries should use this minimal format:

Date: YYYY-MM-DD
Project: <project id>
Type: audit | deployment | incident | decision | approval
Summary: <one paragraph>
Risk: green | yellow | red
Status: open | resolved | approved | rejected
Next action: <concrete next step>

Do not use this file for passwords, tokens, private keys, service-role keys, personal sensitive data, or raw participant/client records.
