-- Blue Education pilot registrations. Server-only access through verified routes.
create table public.blue_education_pilot_registrations (
 id uuid primary key,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 request_hash text not null check (length(request_hash)=64),
 institution_type text not null check (institution_type in ('sekolah','komunitas')),
 institution_name text not null check (char_length(institution_name) between 2 and 180),
 province text not null check (char_length(province) between 2 and 100),
 district text not null check (char_length(district) between 2 and 120),
 contact_name text not null check (char_length(contact_name) between 2 and 120),
 contact_role text not null check (char_length(contact_role) between 2 and 120),
 email text not null check (char_length(email) between 5 and 254),
 phone text not null default '' check (char_length(phone)<=25),
 focus text not null check (focus in ('sampah','air','literasi','budaya','lainnya')),
 readiness text not null check (readiness in ('menjajaki','siap','berjalan')),
 plan text not null check (char_length(plan) between 20 and 3000),
 consent_at timestamptz not null default now(),
 consent_version text not null default 'blue-pilot-2026-09-24',
 status text not null default 'baru' check (status in ('baru','dihubungi','diskusi','aktif','ditutup','spam')),
 notes text not null default '' check (char_length(notes)<=5000)
);
create index blue_education_pilot_created_idx on public.blue_education_pilot_registrations(created_at desc);
create index blue_education_pilot_status_idx on public.blue_education_pilot_registrations(status);
alter table public.blue_education_pilot_registrations enable row level security;
revoke all on public.blue_education_pilot_registrations from public, anon, authenticated;
grant select, insert, update, delete on public.blue_education_pilot_registrations to service_role;
comment on table public.blue_education_pilot_registrations is 'Private Blue Education pilot applications; application server authorizes administrator reads and updates.';
