-- Private member submissions; approval is reserved for explicitly assigned treasurers.
create table public.persis_treasurers (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.persis_treasurers enable row level security;
revoke all on public.persis_treasurers from anon, authenticated;
grant select on public.persis_treasurers to authenticated;
create policy persis_treasurer_self on public.persis_treasurers for select to authenticated
using (user_id = (select auth.uid()));

create table public.persis_dues (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  member_name text not null check (char_length(trim(member_name)) between 2 and 120),
  member_number text not null default '' check (char_length(member_number) <= 60),
  region text not null check (region in ('Batam','Tanjungpinang','Bintan','Karimun','Lingga','Natuna','Kepulauan Anambas','Lainnya')),
  period date not null check (extract(day from period)=1 and period between date '2020-01-01' and date '2100-12-01'),
  amount bigint not null check (amount between 1 and 100000000),
  paid_on date not null check (paid_on between date '2020-01-01' and (now() at time zone 'Asia/Jakarta')::date),
  method text not null check (method in ('transfer','tunai','lainnya')),
  note text not null default '' check (char_length(note)<=500),
  receipt_path text not null unique,
  status text not null default 'pending' check (status in ('pending','verified','rejected')),
  review_note text not null default '' check (char_length(review_note)<=500),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  check ((status='pending' and reviewed_by is null and reviewed_at is null and review_note='') or
    (status in ('verified','rejected') and reviewed_by is not null and reviewed_at is not null)),
  check (status<>'rejected' or char_length(trim(review_note))>=3)
);
create unique index persis_dues_one_active_month on public.persis_dues(user_id,period) where status in ('pending','verified');
create index persis_dues_queue on public.persis_dues(status,created_at desc);
create index persis_dues_owner_history on public.persis_dues(user_id,created_at desc);
create index persis_dues_reviewer on public.persis_dues(reviewed_by);
alter table public.persis_dues enable row level security;
revoke all on public.persis_dues from anon, authenticated;
grant select on public.persis_dues to authenticated;
grant insert (id,user_id,member_name,member_number,region,period,amount,paid_on,method,note,receipt_path) on public.persis_dues to authenticated;
grant update (status,review_note) on public.persis_dues to authenticated;
create policy persis_dues_read on public.persis_dues for select to authenticated
using (user_id=(select auth.uid()) or exists(select 1 from public.persis_treasurers t where t.user_id=(select auth.uid())));
create policy persis_dues_submit on public.persis_dues for insert to authenticated with check (
  user_id=(select auth.uid()) and coalesce((select auth.jwt()->>'is_anonymous'),'false')='false'
  and status='pending' and reviewed_by is null and reviewed_at is null and review_note=''
  and receipt_path like user_id::text || '/' || id::text || '.%'
  and exists (select 1 from storage.objects o where o.bucket_id='persis-receipts' and o.name=receipt_path)
);
create policy persis_dues_review on public.persis_dues for update to authenticated
using (exists(select 1 from public.persis_treasurers t where t.user_id=(select auth.uid())))
with check (exists(select 1 from public.persis_treasurers t where t.user_id=(select auth.uid())));

create schema if not exists private;
create function private.persis_review_guard() returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if auth.uid() is null or not exists(select 1 from public.persis_treasurers where user_id=auth.uid()) then
    raise exception 'Treasurer access required';
  end if;
  if old.status<>'pending' or new.status not in ('verified','rejected') then
    raise exception 'Only pending submissions can be reviewed';
  end if;
  new.reviewed_by := auth.uid();
  new.reviewed_at := now();
  return new;
end; $$;
revoke all on function private.persis_review_guard() from public;
create trigger persis_review_guard before update on public.persis_dues for each row execute function private.persis_review_guard();

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('persis-receipts','persis-receipts',false,3145728,array['image/jpeg','image/png','application/pdf']);
create policy persis_receipt_upload on storage.objects for insert to authenticated with check (
  bucket_id='persis-receipts' and (storage.foldername(name))[1]=(select auth.uid())::text
  and coalesce((select auth.jwt()->>'is_anonymous'),'false')='false'
);
create policy persis_receipt_read on storage.objects for select to authenticated using (
  bucket_id='persis-receipts' and ((storage.foldername(name))[1]=(select auth.uid())::text
  or exists(select 1 from public.persis_treasurers t where t.user_id=(select auth.uid())))
);
create policy persis_receipt_orphan_cleanup on storage.objects for delete to authenticated using (
  bucket_id='persis-receipts' and (storage.foldername(name))[1]=(select auth.uid())::text
  and not exists(select 1 from public.persis_dues d where d.receipt_path=name)
);

-- Existing verified site owner, not all administrators of other site modules.
insert into public.persis_treasurers(user_id)
select id from auth.users where lower(email)='riesib8@gmail.com' and email_confirmed_at is not null;
