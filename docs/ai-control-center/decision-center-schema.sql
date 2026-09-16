-- Apply as a named Supabase migration after owner production approval.
-- New tables only; existing participant/auth tables and policies are unchanged.
create table public.control_center_decisions (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id),
 project text not null,
 title text not null check (char_length(title) between 5 and 160),
 problem text not null check (char_length(problem) between 20 and 4000),
 evidence text not null check (char_length(evidence) between 20 and 12000),
 source text not null check (char_length(source) between 3 and 2000),
 metric text not null check (char_length(metric) between 5 and 1000),
 risk text not null check (risk in ('low','medium','high')),
 status text not null default 'draft' check (status in ('draft','analyzing','review','approved','deferred','rejected','completed')),
 analysis text, model text, generation_id uuid,
 usage jsonb, attempts integer not null default 0 check (attempts between 0 and 3),
 analysis_started_at timestamptz,
 note text not null default '', assignee text not null default '', due_date date,
 history jsonb not null default '[]'::jsonb check (jsonb_typeof(history)='array'),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index control_center_decisions_owner_created on public.control_center_decisions(owner_id, created_at desc);
create table public.control_center_decision_generations (
 id uuid primary key,
 decision_id uuid not null references public.control_center_decisions(id),
 owner_id uuid not null references auth.users(id),
 model text not null, input jsonb not null,
 status text not null check(status in ('pending','completed','failed')),
 output text, usage jsonb, estimated_cost_usd numeric, error_code text,
 created_at timestamptz not null default now(), completed_at timestamptz
);
create index control_center_generations_owner_created on public.control_center_decision_generations(owner_id, created_at desc);
create index control_center_generations_decision on public.control_center_decision_generations(decision_id);
alter table public.control_center_decisions enable row level security;
alter table public.control_center_decision_generations enable row level security;
revoke all on public.control_center_decisions, public.control_center_decision_generations from public, anon, authenticated;
grant select, insert, update on public.control_center_decisions, public.control_center_decision_generations to service_role;
-- These tables are server-only. Every endpoint validates the existing email
-- allowlist AND owner_id before using the service client. No browser policies.

create function public.control_center_reserve_analysis(p_id uuid, p_owner uuid, p_model text)
returns uuid language plpgsql security invoker set search_path = public, pg_temp as $$
declare d public.control_center_decisions; g uuid := gen_random_uuid();
begin
 perform pg_advisory_xact_lock(hashtextextended(p_owner::text, 0));
 select * into d from public.control_center_decisions where id=p_id and owner_id=p_owner for update;
 if not found then raise exception 'not_found'; end if;
 if d.status='analyzing' and d.analysis_started_at < now()-interval '2 minutes' then
   update public.control_center_decision_generations set status='failed', error_code='interrupted', completed_at=now() where id=d.generation_id and status='pending';
   d.status := 'draft';
 end if;
 if d.status <> 'draft' or d.attempts >= 3 then raise exception 'not_ready'; end if;
 if (select count(*) from public.control_center_decision_generations where owner_id=p_owner and created_at>now()-interval '1 hour') >= 10 then raise exception 'rate_limit'; end if;
 insert into public.control_center_decision_generations(id,decision_id,owner_id,model,input,status)
 values(g,p_id,p_owner,p_model,jsonb_build_object('project',d.project,'title',d.title,'problem',d.problem,'evidence',d.evidence,'source',d.source,'metric',d.metric,'risk',d.risk),'pending');
 update public.control_center_decisions set status='analyzing',generation_id=g,model=p_model,attempts=attempts+1,analysis_started_at=now(),updated_at=now(),
 history=history||jsonb_build_array(jsonb_build_object('at',now(),'action','Analisis dimulai','note',p_model))
 where id=p_id;
 return g;
end $$;
revoke all on function public.control_center_reserve_analysis(uuid,uuid,text) from public,anon,authenticated;
grant execute on function public.control_center_reserve_analysis(uuid,uuid,text) to service_role;

create function public.control_center_finish_analysis(p_id uuid,p_owner uuid,p_generation uuid,p_output text,p_usage jsonb,p_error text)
returns boolean language plpgsql security invoker set search_path=public,pg_temp as $$
declare d public.control_center_decisions;
begin
 select * into d from public.control_center_decisions where id=p_id and owner_id=p_owner for update;
 if not found or d.generation_id is distinct from p_generation or d.status <> 'analyzing' then return false; end if;
 update public.control_center_decision_generations set status=case when p_error is null then 'completed' else 'failed' end,
 output=p_output,usage=p_usage,error_code=p_error,completed_at=now() where id=p_generation and owner_id=p_owner;
 update public.control_center_decisions set status=case when p_error is null then 'review' else 'draft' end,
 analysis=p_output,usage=p_usage,updated_at=now(),
 history=history||jsonb_build_array(jsonb_build_object('at',now(),'action',case when p_error is null then 'Analisis tersimpan' else 'Analisis gagal' end,'note',coalesce(p_error,'Perlu pemeriksaan manusia')))
 where id=p_id;
 return true;
end $$;
revoke all on function public.control_center_finish_analysis(uuid,uuid,uuid,text,jsonb,text) from public,anon,authenticated;
grant execute on function public.control_center_finish_analysis(uuid,uuid,uuid,text,jsonb,text) to service_role;
