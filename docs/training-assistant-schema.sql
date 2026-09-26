-- Apply once before enabling the form. Only server-side service_role accesses leads.
begin;
create table if not exists public.training_interest_leads (
 id uuid primary key default gen_random_uuid(),
 request_key uuid not null unique,
 name text not null, email text not null, phone text not null default '',
 organization text not null default '',
 audience text not null check (audience in ('Guru perorangan','Sekolah / madrasah','Komunitas / mitra')),
 topics text[] not null check (cardinality(topics) between 1 and 6),
 level text not null, format text not null,
 participants integer not null check (participants between 1 and 10000),
 timing text not null default '', message text not null default '',
 segment text not null, draft text not null,
 status text not null default 'Baru' check (status in ('Baru','Perlu klarifikasi','Sudah dihubungi','Diskusi program','Terdaftar / sepakat','Ditutup')),
 follow_up_on date, notes text not null default '',
 consent_at timestamptz not null default now(), consent_version text not null default 'training-interest-2026-09-v1',
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 version integer not null default 1,
 updated_by uuid references auth.users(id) on delete set null,
 check (length(name) between 2 and 120), check (length(email)<=254),
 check (length(message)<=3000), check (length(draft)<=10000), check(length(notes)<=5000)
);
alter table public.training_interest_leads enable row level security;
revoke all on public.training_interest_leads from public, anon, authenticated;
grant select, insert, update, delete on public.training_interest_leads to service_role;
create index if not exists training_interest_due_idx on public.training_interest_leads(follow_up_on) where status not in ('Terdaftar / sepakat','Ditutup');
create index if not exists training_interest_created_idx on public.training_interest_leads(created_at desc);
commit;
