-- Additive workflow on existing private cohort work. Existing certificates are unchanged.
alter table public.lexnusa_cohort_versions
 add column document_title text not null default 'Kontrak kerja · LN-KK-01' check(length(trim(document_title)) between 3 and 200),
 add column source_notes text not null default '' check(length(source_notes)<=10000),
 add column risk_level text not null default 'MEDIUM' check(risk_level in ('LOW','MEDIUM','HIGH','CRITICAL')),
 add column generation_refs jsonb not null default '{}' check(jsonb_typeof(generation_refs)='object'),
 add column human_checked boolean not null default false,
 add column parent_version_id uuid,
 add column version_number integer,
 add column workflow_revision integer not null default 0;
with numbered as (
 select id,row_number() over(partition by cohort_code,user_id order by created_at,id)::integer as n
 from public.lexnusa_cohort_versions
) update public.lexnusa_cohort_versions v set version_number=n.n from numbered n where n.id=v.id;
alter table public.lexnusa_cohort_versions alter column version_number set not null;
alter table public.lexnusa_cohort_versions alter column workflow_revision set default 1;
alter table public.lexnusa_cohort_versions add constraint version_sequence unique(cohort_code,user_id,version_number);
alter table public.lexnusa_cohort_versions add constraint parent_same_owner
 foreign key(parent_version_id,cohort_code,user_id) references public.lexnusa_cohort_versions(id,cohort_code,user_id);
create index on public.lexnusa_cohort_versions(parent_version_id);
alter table public.lexnusa_cohort_reviews add column assessed_risk text not null default 'MEDIUM'
 check(assessed_risk in ('LOW','MEDIUM','HIGH','CRITICAL'));

-- Invoker triggers preserve RLS. A shared transaction lock serializes version saves
-- with reviews for the same participant, so a stale version cannot receive approval.
create function lexnusa_private.guard_document_version() returns trigger
language plpgsql security invoker set search_path='' as $$
declare latest uuid; latest_number integer; ref record;
begin
 if auth.uid() is null or new.user_id is distinct from auth.uid() then raise exception 'owner_required'; end if;
 perform pg_advisory_xact_lock(hashtextextended(new.cohort_code||':'||new.user_id::text,918022));
 select id,version_number into latest,latest_number from public.lexnusa_cohort_versions
 where cohort_code=new.cohort_code and user_id=new.user_id order by version_number desc limit 1;
 if new.parent_version_id is distinct from latest then raise exception 'stale_version'; end if;
 new.version_number := coalesce(latest_number,0)+1;
 new.workflow_revision := 1;
 new.created_at := clock_timestamp();
 if new.submitted and (not new.human_checked or length(trim(new.source_notes))<20) then
  raise exception 'human_check_and_sources_required';
 end if;
 for ref in select key,value from jsonb_each_text(new.generation_refs) loop
  if ref.key not in ('brief','instruction','draft','evaluation','revision') or not exists(
   select 1 from public.lexnusa_cohort_generations g where g.id::text=ref.value
   and g.user_id=new.user_id and g.cohort_code=new.cohort_code and g.stage=ref.key
   and g.status='completed' and length(trim(g.output))>0
  ) then raise exception 'invalid_generation_reference'; end if;
 end loop;
 return new;
end $$;
revoke all on function lexnusa_private.guard_document_version() from public,anon,authenticated;
create trigger guard_document_version before insert on public.lexnusa_cohort_versions
 for each row execute function lexnusa_private.guard_document_version();

create function lexnusa_private.guard_document_review() returns trigger
language plpgsql security invoker set search_path='' as $$
declare latest public.lexnusa_cohort_versions;
begin
 if auth.uid() is null or new.reviewer_id is distinct from auth.uid() or new.reviewer_id=new.participant_id
 or not exists(select 1 from public.lexnusa_cohort_staff where user_id=auth.uid() and cohort_code=new.cohort_code)
 then raise exception 'staff_required'; end if;
 perform pg_advisory_xact_lock(hashtextextended(new.cohort_code||':'||new.participant_id::text,918022));
 select * into latest from public.lexnusa_cohort_versions where cohort_code=new.cohort_code
 and user_id=new.participant_id order by version_number desc limit 1;
 if latest.id is distinct from new.version_id or not latest.submitted then raise exception 'stale_review'; end if;
 if exists(select 1 from public.lexnusa_cohort_reviews where version_id=new.version_id) then raise exception 'already_reviewed'; end if;
 if new.decision='verified' then
  if latest.risk_level='CRITICAL' or new.assessed_risk='CRITICAL' then raise exception 'critical_risk_requires_revision'; end if;
  if (latest.risk_level='HIGH' or new.assessed_risk='HIGH') and length(trim(new.notes))<80 then raise exception 'risk_rationale_required'; end if;
  if latest.workflow_revision=1 and (not latest.human_checked or length(trim(latest.source_notes))<20) then
   raise exception 'human_check_and_sources_required';
  end if;
 end if;
 new.created_at := clock_timestamp();
 return new;
end $$;
revoke all on function lexnusa_private.guard_document_review() from public,anon,authenticated;
create trigger guard_document_review before insert on public.lexnusa_cohort_reviews
 for each row execute function lexnusa_private.guard_document_review();
