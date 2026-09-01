-- Local-only seed data for LexNusa CRM migration QA.
-- All identities and leads below are synthetic. Never copy Production data into this file.

insert into auth.users (
  id, instance_id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at, confirmation_token, email_change,
  email_change_token_new, recovery_token
)
values (
  '11111111-1111-4111-8111-111111111111'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'authenticated', 'authenticated', 'lexnusa-admin@example.invalid',
  crypt('LocalOnly-DoNotUse-123!', gen_salt('bf')),
  now(), '{"provider":"email","providers":["email"]}'::jsonb,
  '{"display_name":"LexNusa Local Admin"}'::jsonb,
  now(), now(), '', '', '', ''
)
on conflict (id) do update set
  email = excluded.email,
  encrypted_password = excluded.encrypted_password,
  email_confirmed_at = excluded.email_confirmed_at,
  raw_app_meta_data = excluded.raw_app_meta_data,
  raw_user_meta_data = excluded.raw_user_meta_data,
  updated_at = excluded.updated_at,
  confirmation_token = '',
  email_change = '',
  email_change_token_new = '',
  recovery_token = '';

insert into auth.identities (
  id, user_id, provider_id, identity_data, provider,
  last_sign_in_at, created_at, updated_at
)
values (
  '11111111-1111-4111-8111-111111111111'::uuid,
  '11111111-1111-4111-8111-111111111111'::uuid,
  '11111111-1111-4111-8111-111111111111',
  jsonb_build_object(
    'sub', '11111111-1111-4111-8111-111111111111',
    'email', 'lexnusa-admin@example.invalid',
    'email_verified', true,
    'phone_verified', false
  ),
  'email', now(), now(), now()
)
on conflict (provider, provider_id) do update set
  user_id = excluded.user_id,
  identity_data = excluded.identity_data,
  updated_at = excluded.updated_at;

insert into public.lexnusa_admins (user_id, email, display_name)
values ('11111111-1111-4111-8111-111111111111'::uuid, 'lexnusa-admin@example.invalid', 'LexNusa Local Admin')
on conflict (user_id) do update set email = excluded.email, display_name = excluded.display_name;

insert into public.lexnusa_pilot_leads (
  id, name, organization, email, project_type, message, source, status,
  notification_status, consent_at, consent_version, follow_up_at,
  estimated_value, currency, owner_user_id
)
values
  (900001, 'Qualified Demo Lead', 'Example LegalTech Lab', 'qualified@example.invalid',
   'Legal AI Output Evaluation', 'Synthetic qualified lead for proposal workflow QA.',
   'local-seed', 'qualified', 'skipped', now(), 'local-seed-v1', now() + interval '2 days',
   750.00, 'USD', '11111111-1111-4111-8111-111111111111'::uuid),
  (900002, 'Contacted Demo Lead', 'Example Research Group', 'contacted@example.invalid',
   'Legal Research Intelligence', 'Synthetic contacted lead used to verify the qualified-lead gate.',
   'local-seed', 'contacted', 'skipped', now(), 'local-seed-v1', now() + interval '5 days',
   400.00, 'USD', '11111111-1111-4111-8111-111111111111'::uuid)
on conflict (id) do nothing;

insert into public.lexnusa_lead_activities (lead_id, actor_user_id, activity_type, summary, details)
values
  (900001, null, 'created', 'Synthetic qualified lead seeded for local QA', '{"source":"local-seed"}'::jsonb),
  (900002, null, 'created', 'Synthetic contacted lead seeded for local QA', '{"source":"local-seed"}'::jsonb);

select setval(
  pg_get_serial_sequence('public.lexnusa_pilot_leads','id'),
  greatest((select coalesce(max(id), 1) from public.lexnusa_pilot_leads), 1),
  true
);
