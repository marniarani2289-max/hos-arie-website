-- LexNusa Notaris: one independently owned office per registered account.
create table public.lexnusa_notary_offices (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null unique references auth.users(id),
 name text not null check (length(trim(name)) between 1 and 160),
 created_at timestamptz not null default now()
);
create table public.lexnusa_notary_records (
 id uuid primary key default gen_random_uuid(),
 office_id uuid not null references public.lexnusa_notary_offices(id),
 kind text not null check (kind in ('client','matter','document','appointment','invoice')),
 title text not null check (length(trim(title)) between 1 and 160),
 parent_id uuid,
 data jsonb not null default '{}' check (jsonb_typeof(data) = 'object' and octet_length(data::text) <= 100000),
 version integer not null default 1,
 archived boolean not null default false,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 unique(office_id,id),
 foreign key (office_id,parent_id) references public.lexnusa_notary_records(office_id,id),
 check (parent_id is null or parent_id <> id)
);
create index lexnusa_notary_records_office_date on public.lexnusa_notary_records(office_id,created_at desc,id);
create index lexnusa_notary_records_parent on public.lexnusa_notary_records(office_id,parent_id);
create table public.lexnusa_notary_audit (
 id bigint generated always as identity primary key,
 office_id uuid not null references public.lexnusa_notary_offices(id),
 record_id uuid not null,
 record_title text not null,
 actor_id uuid not null,
 action text not null,
 created_at timestamptz not null default now()
);
create index lexnusa_notary_audit_office on public.lexnusa_notary_audit(office_id,id desc);
alter table public.lexnusa_notary_offices enable row level security;
alter table public.lexnusa_notary_records enable row level security;
alter table public.lexnusa_notary_audit enable row level security;
revoke all on public.lexnusa_notary_offices,public.lexnusa_notary_records,public.lexnusa_notary_audit from anon,authenticated;
grant select,insert on public.lexnusa_notary_offices to authenticated;
grant select,insert,update on public.lexnusa_notary_records to authenticated;
grant select on public.lexnusa_notary_audit to authenticated;
create policy notary_office_read on public.lexnusa_notary_offices for select to authenticated using (owner_id=(select auth.uid()));
create policy notary_office_create on public.lexnusa_notary_offices for insert to authenticated with check (owner_id=(select auth.uid()) and coalesce((select auth.jwt()->>'is_anonymous'),'false')='false');
create policy notary_record_read on public.lexnusa_notary_records for select to authenticated using (office_id in (select id from public.lexnusa_notary_offices where owner_id=(select auth.uid())));
create policy notary_record_create on public.lexnusa_notary_records for insert to authenticated with check (office_id in (select id from public.lexnusa_notary_offices where owner_id=(select auth.uid())));
create policy notary_record_edit on public.lexnusa_notary_records for update to authenticated using (office_id in (select id from public.lexnusa_notary_offices where owner_id=(select auth.uid()))) with check (office_id in (select id from public.lexnusa_notary_offices where owner_id=(select auth.uid())));
create policy notary_audit_read on public.lexnusa_notary_audit for select to authenticated using (office_id in (select id from public.lexnusa_notary_offices where owner_id=(select auth.uid())));
create schema if not exists notary_private;
revoke all on schema notary_private from public,anon,authenticated;
create function notary_private.record_change() returns trigger language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null or not exists(select 1 from public.lexnusa_notary_offices where id=new.office_id and owner_id=auth.uid()) then raise exception 'Not authorized'; end if;
 if tg_op='UPDATE' then
  if new.id<>old.id or new.office_id<>old.office_id or new.kind<>old.kind or new.created_at<>old.created_at then raise exception 'Immutable identity'; end if;
  new.version := old.version+1;
 else new.version := 1; new.created_at := now(); end if;
 if new.parent_id is not null and not exists(select 1 from public.lexnusa_notary_records p where p.id=new.parent_id and p.office_id=new.office_id and p.kind=case when new.kind='matter' then 'client' else 'matter' end) then raise exception 'Invalid parent'; end if;
 if new.kind='client' and new.parent_id is not null then raise exception 'Client cannot have a parent'; end if;
 if new.data ? 'file_path' and (new.kind<>'document' or split_part(new.data->>'file_path','/',1)<>auth.uid()::text) then raise exception 'Invalid file owner'; end if;
 new.updated_at := now();
 insert into public.lexnusa_notary_audit(office_id,record_id,record_title,actor_id,action) values(new.office_id,new.id,new.title,auth.uid(),case when tg_op='INSERT' then 'Dibuat' when new.archived and not old.archived then 'Diarsipkan' when not new.archived and old.archived then 'Dipulihkan' else 'Diperbarui' end);
 return new;
end $$;
revoke all on function notary_private.record_change() from public,anon,authenticated;
create trigger notary_record_change before insert or update on public.lexnusa_notary_records for each row execute function notary_private.record_change();
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('lexnusa-notary-private','lexnusa-notary-private',false,4194304,array['application/pdf','image/jpeg','image/png']);
create policy notary_file_read on storage.objects for select to authenticated using(bucket_id='lexnusa-notary-private' and (storage.foldername(name))[1]=(select auth.uid())::text);
create policy notary_file_create on storage.objects for insert to authenticated with check(bucket_id='lexnusa-notary-private' and (storage.foldername(name))[1]=(select auth.uid())::text and exists(select 1 from public.lexnusa_notary_offices where owner_id=(select auth.uid())));
create policy notary_file_cleanup on storage.objects for delete to authenticated using(bucket_id='lexnusa-notary-private' and (storage.foldername(name))[1]=(select auth.uid())::text);
