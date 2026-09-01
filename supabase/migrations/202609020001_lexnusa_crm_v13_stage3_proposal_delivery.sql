-- LexNusa CRM v1.3 — Stage 3: Proposal PDF + Email Delivery Audit

alter table public.lexnusa_proposals
  add column if not exists pdf_generated_at timestamptz,
  add column if not exists last_emailed_at timestamptz,
  add column if not exists last_email_to text,
  add column if not exists last_email_provider_id text;

alter table public.lexnusa_lead_activities
  drop constraint if exists lexnusa_lead_activities_activity_type_check;

alter table public.lexnusa_lead_activities
  add constraint lexnusa_lead_activities_activity_type_check
  check (activity_type in (
    'created','status_changed','note_updated','follow_up_changed','value_changed','owner_changed',
    'email_opened','email_prepared','email_sent','email_sent_manual','email_failed','manual_note',
    'proposal_created','proposal_updated','proposal_sent','proposal_status_changed','proposal_accepted','proposal_rejected',
    'proposal_pdf_generated','proposal_email_sent','proposal_email_failed'
  ));

create index if not exists lexnusa_proposals_last_emailed_at_idx
  on public.lexnusa_proposals(last_emailed_at desc)
  where last_emailed_at is not null;
