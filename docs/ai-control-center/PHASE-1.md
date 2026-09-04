# Hossibarani AI Control Center — Phase 1

Phase 1 establishes a safe control plane before any autonomous execution is enabled.

## Objectives

1. Single project context registry for the Hossibarani Digital Ecosystem.
2. Agent registry with clear missions and default risk levels.
3. Permission model: GREEN, YELLOW, RED.
4. Private `/control-center` route protected by Supabase authentication plus an explicit email allowlist.
5. Project and decision memory conventions that can be consumed by later agents.

## Access

Set this server-side environment variable in Vercel:

`CONTROL_CENTER_ALLOWED_EMAILS=owner@example.com,second-admin@example.com`

The route fails closed: when the variable is absent or empty, authenticated users are redirected away from the control center.

Do not expose this value as `NEXT_PUBLIC_*`.

## Permission model

### GREEN
Read-only or non-destructive work may run autonomously, for example audits, analysis, tests, draft content, and reports.

### YELLOW
An agent may prepare the work, but a human approval is required before write actions such as updating site content or opening production-affecting changes.

### RED
Explicit owner approval is always required for merge to main, risky production deploys, RLS/auth changes, data deletion, secrets/environment changes, and external publication or sending.

## Memory model

Memory is organised into four layers:

- Profile context: durable public/professional operating context only.
- Project context: purpose, routes, integrations, owners, and current status for each product/project.
- Decision log: architectural and policy decisions that later agents must not silently override.
- Operational log: audits, deployment state, incidents, pending approvals, and next actions.

Never store passwords, access tokens, private keys, service-role keys, or other secrets in repository memory files.

## Current Phase 1 state

The control center is intentionally read-only. It does not call GitHub, Vercel, Supabase administration APIs, or any external AI execution service from the website. Those capabilities should be added only after the administrator identity model and approval workflow are tested.

## Phase 2 readiness checklist

- Verify owner/admin email allowlist in Vercel.
- Confirm `/control-center` is inaccessible to a normal participant account.
- Confirm robots metadata prevents indexing.
- Run `npm run build` on the feature branch.
- Review the project registry and routes against production.
- Decide the first executable agent (recommended: read-only Web & Dev audit agent).
