-- Public, privacy-minimized projection for verified portfolio showcase.
create table if not exists public.rahi_portfolio_showcase_public (
  project_id uuid primary key references public.rahi_portfolio_projects(id) on delete cascade,
  title text not null,
  track text not null,
  participant_name text not null,
  institution text,
  verified_score integer not null check (verified_score between 0 and 100),
  artifact_url text,
  verified_at timestamptz not null,
  updated_at timestamptz not null default now()
);

alter table public.rahi_portfolio_showcase_public enable row level security;
revoke all on public.rahi_portfolio_showcase_public from public, anon, authenticated;
grant select on public.rahi_portfolio_showcase_public to anon, authenticated;
grant select,insert,update,delete on public.rahi_portfolio_showcase_public to service_role;

drop policy if exists "public portfolio showcase read" on public.rahi_portfolio_showcase_public;
create policy "public portfolio showcase read" on public.rahi_portfolio_showcase_public
for select to anon, authenticated using (true);

create or replace function private.refresh_rahi_portfolio_showcase(target_project uuid)
returns void language plpgsql security definer set search_path=''
as $$
begin
  delete from public.rahi_portfolio_showcase_public where project_id=target_project;
  insert into public.rahi_portfolio_showcase_public(project_id,title,track,participant_name,institution,verified_score,artifact_url,verified_at,updated_at)
  select p.id,p.title,p.track,pr.full_name,pr.institution,r.total_score,v.artifact_url,p.verified_at,now()
  from public.rahi_portfolio_projects p
  join public.profiles pr on pr.id=p.user_id
  join lateral (
    select total_score,decision from public.rahi_portfolio_reviews
    where project_id=p.id order by reviewed_at desc limit 1
  ) r on true
  left join lateral (
    select artifact_url from public.rahi_portfolio_versions
    where project_id=p.id order by version_number desc limit 1
  ) v on true
  where p.id=target_project
    and p.cohort_code='RAHI-PILOT-01'
    and p.status='verified'
    and p.visibility='public'
    and p.showcase_approved=true
    and p.verified_at is not null
    and r.decision='verified';
end;$$;
revoke execute on function private.refresh_rahi_portfolio_showcase(uuid) from public,anon,authenticated;

create or replace function private.rahi_showcase_project_trigger()
returns trigger language plpgsql security definer set search_path=''
as $$ begin perform private.refresh_rahi_portfolio_showcase(coalesce(new.id,old.id)); return coalesce(new,old); end; $$;
create or replace function private.rahi_showcase_child_trigger()
returns trigger language plpgsql security definer set search_path=''
as $$ begin perform private.refresh_rahi_portfolio_showcase(coalesce(new.project_id,old.project_id)); return coalesce(new,old); end; $$;
create or replace function private.rahi_showcase_profile_trigger()
returns trigger language plpgsql security definer set search_path=''
as $$ declare pid uuid; begin for pid in select id from public.rahi_portfolio_projects where user_id=new.id loop perform private.refresh_rahi_portfolio_showcase(pid); end loop; return new; end; $$;
revoke execute on function private.rahi_showcase_project_trigger() from public,anon,authenticated;
revoke execute on function private.rahi_showcase_child_trigger() from public,anon,authenticated;
revoke execute on function private.rahi_showcase_profile_trigger() from public,anon,authenticated;

drop trigger if exists rahi_showcase_project_sync on public.rahi_portfolio_projects;
create trigger rahi_showcase_project_sync after insert or update or delete on public.rahi_portfolio_projects for each row execute function private.rahi_showcase_project_trigger();
drop trigger if exists rahi_showcase_version_sync on public.rahi_portfolio_versions;
create trigger rahi_showcase_version_sync after insert or update or delete on public.rahi_portfolio_versions for each row execute function private.rahi_showcase_child_trigger();
drop trigger if exists rahi_showcase_review_sync on public.rahi_portfolio_reviews;
create trigger rahi_showcase_review_sync after insert or update or delete on public.rahi_portfolio_reviews for each row execute function private.rahi_showcase_child_trigger();
drop trigger if exists rahi_showcase_profile_sync on public.profiles;
create trigger rahi_showcase_profile_sync after update of full_name,institution on public.profiles for each row execute function private.rahi_showcase_profile_trigger();

select private.refresh_rahi_portfolio_showcase(id) from public.rahi_portfolio_projects;
