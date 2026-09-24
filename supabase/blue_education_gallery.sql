create table public.blue_education_gallery (
 id uuid primary key default gen_random_uuid(),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 title text not null check (char_length(title) between 5 and 180),
 institution text not null check (char_length(institution) between 2 and 180),
 district text not null check (char_length(district) between 2 and 120),
 theme text not null check (theme in ('sampah','air','literasi','budaya','lainnya')),
 kind text not null check (kind in ('praktik','dokumentasi','rancangan')),
 activity_date date not null,
 context text not null check (char_length(context) between 20 and 3000),
 action text not null check (char_length(action) between 20 and 4000),
 results text not null check (char_length(results) between 20 and 4000),
 lessons text not null check (char_length(lessons) between 20 and 3000),
 source_url text not null check (source_url like 'https://%' and char_length(source_url)<=1500),
 image_url text not null default '' check (image_url='' or (image_url like 'https://%' and char_length(image_url)<=1500)),
 image_alt text not null default '' check (char_length(image_alt)<=300),
 image_credit text not null default '' check (char_length(image_credit)<=300),
 status text not null default 'draft' check (status in ('draft','published','archived')),
 publication_confirmed boolean not null default false,
 check (status<>'published' or publication_confirmed),
 check (image_url='' or (char_length(image_alt)>=5 and char_length(image_credit)>=2))
);
create index blue_education_gallery_status_date_idx on public.blue_education_gallery(status,activity_date desc);
alter table public.blue_education_gallery enable row level security;
revoke all on public.blue_education_gallery from public, anon, authenticated;
grant select, insert, update, delete on public.blue_education_gallery to service_role;
comment on table public.blue_education_gallery is 'Curated Blue Education stories. Only the server exposes published editorial fields. Drafts are private.';
insert into public.blue_education_gallery
(title,institution,district,theme,kind,activity_date,context,action,results,lessons,source_url,status,publication_confirmed)
values (
'Menghidupkan Blue Education di Bumi Segantang Lada',
'Sembang Komunitas · RRI Pro 4 Tanjungpinang',
'Tanjungpinang','literasi','dokumentasi','2026-09-23',
'Dialog Publik Blue Education menjadi bahan pendalaman setelah video materi utama. Rekaman ini tersedia pada halaman Pendidikan Biru.',
'Menonton rekaman Sembang Komunitas, mencatat gagasan yang relevan, kemudian menghubungkannya dengan kebutuhan sekolah dan masyarakat setempat.',
'Dokumentasi yang tersedia berupa rekaman dialog publik. Belum ada data dalam entri ini yang menunjukkan hasil penerapan di sekolah atau dampak terhadap lingkungan.',
'Gunakan pertanyaan refleksi untuk merumuskan satu aksi, pihak yang perlu dilibatkan, dan bukti yang akan dikumpulkan. Hasil penerapan perlu didokumentasikan tersendiri.',
'https://www.youtube.com/live/nTigo6q7y20','published',true
);