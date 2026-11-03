-- Dedicated Mayantara exam; reuse the established lecturer allowlist.
create table public.kuliah_mayantara_uts(
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null unique references auth.users(id),
 display_name text not null default '' check(length(display_name)<=160),
 student_number text not null default '' check(length(student_number)<=80),
 class_name text not null default '' check(length(class_name)<=160),
 answers text[] not null default array['','','','',''],
 status text not null default 'draft' check(status in ('draft','submitted')),
 attested boolean not null default false,
 revision integer not null default 1 check(revision>0),
 updated_at timestamptz not null default now(),
 submitted_at timestamptz,
 check(cardinality(answers)=5 and array_ndims(answers)=1 and array_lower(answers,1)=1 and array_length(answers,1)=5 and array_position(answers,null) is null),
 check(length(answers[1])<=50000 and length(answers[2])<=50000 and length(answers[3])<=50000 and length(answers[4])<=50000 and length(answers[5])<=50000),
 check(status='draft' or (
  attested and submitted_at is not null
  and display_name ~ '[^[:space:]]' and student_number ~ '[^[:space:]]' and class_name ~ '[^[:space:]]'
  and answers[1] ~ '[^[:space:]]' and answers[2] ~ '[^[:space:]]' and answers[3] ~ '[^[:space:]]' and answers[4] ~ '[^[:space:]]' and answers[5] ~ '[^[:space:]]'
 ))
);
create index kuliah_mayantara_uts_submitted_idx on public.kuliah_mayantara_uts(submitted_at desc) where status='submitted';
alter table public.kuliah_mayantara_uts enable row level security;
revoke all on public.kuliah_mayantara_uts from public,anon,authenticated;
grant select on public.kuliah_mayantara_uts to authenticated;
grant insert(user_id,display_name,student_number,class_name,answers,status,attested) on public.kuliah_mayantara_uts to authenticated;
grant update(display_name,student_number,class_name,answers,status,attested) on public.kuliah_mayantara_uts to authenticated;
grant all on public.kuliah_mayantara_uts to service_role;
create policy read_own_or_submitted_staff on public.kuliah_mayantara_uts for select to authenticated using(user_id=(select auth.uid()) or (status='submitted' and exists(select 1 from public.kuliah_politik_staff where user_id=(select auth.uid()))));
create policy insert_own on public.kuliah_mayantara_uts for insert to authenticated with check(user_id=(select auth.uid()));
create policy update_own_draft on public.kuliah_mayantara_uts for update to authenticated using(user_id=(select auth.uid()) and status='draft') with check(user_id=(select auth.uid()));
create function kuliah_private.mayantara_uts_guard() returns trigger language plpgsql security invoker set search_path='' as $$
begin
 if new.user_id is distinct from auth.uid() then raise exception 'owner_required'; end if;
 if tg_op='UPDATE' then
  if old.status='submitted' then raise exception 'submission_is_final'; end if;
  if new.user_id is distinct from old.user_id or new.id is distinct from old.id then raise exception 'immutable_identity'; end if;
  new.revision:=old.revision+1;
 else new.revision:=1;
 end if;
 new.updated_at:=now();
 new.submitted_at:=case when new.status='submitted' then now() else null end;
 return new;
end $$;
revoke all on function kuliah_private.mayantara_uts_guard() from public;
create trigger mayantara_uts_guard before insert or update on public.kuliah_mayantara_uts for each row execute function kuliah_private.mayantara_uts_guard();
