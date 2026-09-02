-- Cover dashboard joins and administrator intervention lookups.
create index if not exists rahi_pilot_assessments_cohort_user_idx
  on public.rahi_pilot_assessments (cohort_code, user_id);

create index if not exists rahi_pilot_interventions_enrollment_idx
  on public.rahi_pilot_interventions (enrollment_id);

create index if not exists rahi_pilot_interventions_actor_idx
  on public.rahi_pilot_interventions (actor_user_id);

create index if not exists profiles_cohort_idx
  on public.profiles (cohort_code)
  where cohort_code is not null;
