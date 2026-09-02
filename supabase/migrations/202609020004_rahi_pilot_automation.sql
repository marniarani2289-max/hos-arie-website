-- Phase 4: auditable messaging and stricter certificate validation.
create table if not exists public.rahi_pilot_message_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  cohort_code text not null default 'RAHI-PILOT-01',
  week_number smallint not null check (week_number between 1 and 4),
  message_kind text not null check (message_kind in ('weekly','behind_reminder')),
  recipient_email text not null,
  expected_modules smallint not null check (expected_modules between 0 and 8),
  completed_modules smallint not null check (completed_modules between 0 and 8),
  delivery_status text not null default 'queued' check (delivery_status in ('queued','sent','failed','skipped')),
  provider_id text,
  error_message text,
  created_at timestamptz not null default now(),
  sent_at timestamptz,
  unique (user_id, cohort_code, week_number, message_kind)
);
alter table public.rahi_pilot_message_log enable row level security;
revoke all on table public.rahi_pilot_message_log from anon, authenticated;
grant select, insert, update, delete on table public.rahi_pilot_message_log to service_role;
create index if not exists rahi_pilot_message_log_status_idx on public.rahi_pilot_message_log (delivery_status, created_at desc);

create or replace function public.issue_certificate_if_eligible(target_enrollment uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  owner_id uuid;
  programme text;
  completed_count integer;
  passed_count integer;
  cert_no text;
begin
  select user_id, programme_code into owner_id, programme from public.enrollments where id = target_enrollment;
  if owner_id is null or owner_id <> (select auth.uid()) then raise exception 'not allowed'; end if;
  select count(*) filter (where completed), count(*) filter (where quiz_score >= 70)
    into completed_count, passed_count
  from public.module_progress where enrollment_id = target_enrollment and module_number between 1 and 8;
  if completed_count < 8 or passed_count < 8 then return null; end if;
  cert_no := programme || '-' || extract(year from now())::integer || '-' || lpad(nextval('public.certificate_serial_seq')::text, 6, '0');
  insert into public.certificates (enrollment_id, certificate_number) values (target_enrollment, cert_no)
  on conflict (enrollment_id) do nothing;
  select certificate_number into cert_no from public.certificates where enrollment_id = target_enrollment;
  return cert_no;
end;
$$;
revoke execute on function public.issue_certificate_if_eligible(uuid) from public, anon;
grant execute on function public.issue_certificate_if_eligible(uuid) to authenticated;
