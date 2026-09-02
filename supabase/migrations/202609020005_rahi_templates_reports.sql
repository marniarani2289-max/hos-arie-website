-- Phase 5: administrator-managed communication templates and immutable report snapshots.
alter table public.rahi_pilot_message_log drop constraint if exists rahi_pilot_message_log_message_kind_check;
alter table public.rahi_pilot_message_log add constraint rahi_pilot_message_log_message_kind_check
  check (message_kind in ('weekly','behind_reminder','completion','certificate','final_thanks'));

create table if not exists public.rahi_communication_templates (
  template_key text primary key check (template_key in ('weekly','behind_reminder','completion','certificate','final_thanks')),
  name text not null,
  channel text not null default 'email' check (channel in ('email','whatsapp','both')),
  subject_template text not null check (char_length(subject_template) between 2 and 300),
  body_template text not null check (char_length(body_template) between 10 and 10000),
  allowed_variables jsonb not null default '[]'::jsonb check (jsonb_typeof(allowed_variables) = 'array'),
  active boolean not null default true,
  updated_by uuid references public.rahi_admins(user_id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.rahi_communication_templates enable row level security;
revoke all on table public.rahi_communication_templates from anon, authenticated;
grant select, insert, update, delete on table public.rahi_communication_templates to service_role;

insert into public.rahi_communication_templates (template_key,name,channel,subject_template,body_template,allowed_variables)
values
('weekly','Pesan Pembukaan Mingguan','both','RAHI Pilot - Target Minggu {{week}}','Assalamu''alaikum {{name}},\n\nMinggu {{week}} Pilot Cohort 1 telah dimulai. Target kumulatif minggu ini adalah {{expected}} dari 8 modul. Progres Anda saat ini {{completed}} modul.\n\nSilakan lanjutkan pembelajaran dan isi check-in mingguan agar fasilitator dapat membantu bila ada kendala.\n\nRaja Ali Haji Institute','["name","week","expected","completed","dashboard_url"]'),
('behind_reminder','Pengingat Peserta Tertinggal','both','Pengingat progres RAHI Pilot Minggu {{week}}','Assalamu''alaikum {{name}},\n\nKami melihat progres Anda saat ini {{completed}} modul, sedangkan target Minggu {{week}} adalah {{expected}} modul. Ini bukan teguran; kami ingin memastikan Anda mendapatkan dukungan yang diperlukan.\n\nSilakan buka dashboard, lanjutkan modul, dan isi check-in kendala. Fasilitator siap mendampingi.\n\nRaja Ali Haji Institute','["name","week","expected","completed","dashboard_url"]'),
('completion','Ucapan Penyelesaian Modul','email','Selamat Menyelesaikan Program Dasar Raja Ali Haji','Assalamu''alaikum {{name}},\n\nSelamat, Anda telah menyelesaikan seluruh delapan modul. Sistem sedang memvalidasi nilai kuis dan kelayakan sertifikat Anda.\n\nRaja Ali Haji Institute','["name","completed","certificate_url"]'),
('certificate','Pemberitahuan Sertifikat','email','Sertifikat RAHI Anda Telah Terbit','Assalamu''alaikum {{name}},\n\nSertifikat Program Dasar Pemikiran Raja Ali Haji Anda telah diterbitkan. Nomor sertifikat: {{certificate_number}}.\n\nBuka: {{certificate_url}}\n\nRaja Ali Haji Institute','["name","certificate_number","certificate_url"]'),
('final_thanks','Penutupan dan Terima Kasih','email','Terima Kasih - RAHI Pilot Cohort 1','Assalamu''alaikum {{name}},\n\nTerima kasih telah menjadi bagian dari Pilot Cohort 1. Kontribusi Anda melalui pembelajaran, refleksi, check-in, dan evaluasi menjadi dasar penyempurnaan program berikutnya.\n\nRaja Ali Haji Institute','["name","dashboard_url"]')
on conflict (template_key) do nothing;

create table if not exists public.rahi_report_snapshots (
  id uuid primary key default gen_random_uuid(),
  cohort_code text not null default 'RAHI-PILOT-01',
  report_type text not null check (report_type in ('weekly','final')),
  week_number smallint not null check (week_number between 1 and 5),
  title text not null,
  metrics jsonb not null check (jsonb_typeof(metrics) = 'object'),
  narrative text not null default '',
  generated_by uuid references public.rahi_admins(user_id),
  generated_at timestamptz not null default now(),
  unique (cohort_code, report_type, week_number)
);
alter table public.rahi_report_snapshots enable row level security;
revoke all on table public.rahi_report_snapshots from anon, authenticated;
grant select, insert, update, delete on table public.rahi_report_snapshots to service_role;
create index if not exists rahi_report_snapshots_date_idx on public.rahi_report_snapshots (generated_at desc);
