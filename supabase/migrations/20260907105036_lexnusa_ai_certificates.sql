alter table public.lexnusa_cohort_members add column display_name text not null default 'Peserta' check(length(trim(display_name)) between 2 and 120);
alter table public.lexnusa_cohort_reviews add column quality_gate_passed boolean not null default false;
alter table public.lexnusa_cohort_reviews add constraint verified_quality_gate check(decision <> 'verified' or quality_gate_passed);
create table public.lexnusa_cohort_generations (
 id uuid primary key default gen_random_uuid(), cohort_code text not null, user_id uuid not null,
 stage text not null check(stage in ('brief','instruction','draft','evaluation','revision')),
 model text not null, input jsonb not null, output text, usage jsonb,
 status text not null default 'pending' check(status in ('pending','completed','failed')),
 created_at timestamptz not null default now(),
 foreign key(cohort_code,user_id) references public.lexnusa_cohort_members(cohort_code,user_id)
);
create index on public.lexnusa_cohort_generations(user_id,created_at desc);
alter table public.lexnusa_cohort_generations enable row level security;
revoke all on public.lexnusa_cohort_generations from anon,authenticated;
grant select on public.lexnusa_cohort_generations to authenticated;
grant all on public.lexnusa_cohort_generations to service_role;
create policy generations_read on public.lexnusa_cohort_generations for select to authenticated using(user_id=(select auth.uid()) or exists(select 1 from public.lexnusa_cohort_staff s where s.cohort_code=lexnusa_cohort_generations.cohort_code and s.user_id=(select auth.uid())));
create function public.lexnusa_reserve_generation(p_user uuid,p_cohort text,p_stage text,p_model text,p_input jsonb) returns uuid language plpgsql security invoker set search_path='' as $$
declare result uuid;
begin
 perform pg_advisory_xact_lock(918021);
 if not exists(select 1 from public.lexnusa_cohort_members where user_id=p_user and cohort_code=p_cohort) then raise exception 'membership_required'; end if;
 if (select count(*) from public.lexnusa_cohort_generations where created_at>now()-interval '24 hours' and user_id=p_user)>=12
 or (select count(*) from public.lexnusa_cohort_generations where created_at>now()-interval '24 hours')>=100
 or exists(select 1 from public.lexnusa_cohort_generations where user_id=p_user and status='pending' and created_at>now()-interval '2 minutes') then raise exception 'generation_limit'; end if;
 insert into public.lexnusa_cohort_generations(cohort_code,user_id,stage,model,input) values(p_cohort,p_user,p_stage,p_model,p_input) returning id into result;
 return result;
end $$;
revoke all on function public.lexnusa_reserve_generation(uuid,text,text,text,jsonb) from public,anon,authenticated;
grant execute on function public.lexnusa_reserve_generation(uuid,text,text,text,jsonb) to service_role;
grant select on public.lexnusa_cohort_members to service_role;
create table public.lexnusa_cohort_certificates (
 id uuid primary key default gen_random_uuid(), cohort_code text not null, user_id uuid not null,
 review_id uuid not null unique references public.lexnusa_cohort_reviews(id), version_id uuid not null,
 recipient_name text not null, title text not null, participant_score integer not null,
 issued_at timestamptz not null default now(), revoked_at timestamptz,
 foreign key(version_id,cohort_code,user_id) references public.lexnusa_cohort_versions(id,cohort_code,user_id),
 unique(cohort_code,user_id)
);
alter table public.lexnusa_cohort_certificates enable row level security;
revoke all on public.lexnusa_cohort_certificates from anon,authenticated;
grant select on public.lexnusa_cohort_certificates to authenticated;
create policy certificates_read on public.lexnusa_cohort_certificates for select to authenticated using(user_id=(select auth.uid()) or exists(select 1 from public.lexnusa_cohort_staff s where s.cohort_code=lexnusa_cohort_certificates.cohort_code and s.user_id=(select auth.uid())));
create schema if not exists lexnusa_private;
revoke all on schema lexnusa_private from public,anon,authenticated;
create function lexnusa_private.issue_cohort_certificate() returns trigger language plpgsql security definer set search_path='' as $$
begin
 if new.decision='verified' then
  if new.reviewer_id is distinct from auth.uid() or not exists(select 1 from public.lexnusa_cohort_staff where cohort_code=new.cohort_code and user_id=auth.uid()) then raise exception 'staff_required'; end if;
  insert into public.lexnusa_cohort_certificates(cohort_code,user_id,review_id,version_id,recipient_name,title,participant_score)
   select new.cohort_code,new.participant_id,new.id,new.version_id,m.display_name,c.title,new.participant_score
   from public.lexnusa_cohort_members m join public.lexnusa_cohorts c on c.code=m.cohort_code
   where m.cohort_code=new.cohort_code and m.user_id=new.participant_id
   on conflict(cohort_code,user_id) do nothing;
 end if;
 return new;
end $$;
revoke all on function lexnusa_private.issue_cohort_certificate() from public,anon,authenticated;
create trigger issue_cohort_certificate after insert on public.lexnusa_cohort_reviews for each row execute function lexnusa_private.issue_cohort_certificate();
-- Only someone holding the unguessable certificate ID can verify it; no names or account IDs exposed.
create function public.lexnusa_verify_certificate(p_id uuid) returns table(certificate_id uuid,title text,issued_at timestamptz,status text) language sql stable security definer set search_path='' as $$
 select id,title,issued_at,case when revoked_at is null then 'valid' else 'revoked' end from public.lexnusa_cohort_certificates where id=p_id;
$$;
revoke all on function public.lexnusa_verify_certificate(uuid) from public;
grant execute on function public.lexnusa_verify_certificate(uuid) to anon,authenticated;
