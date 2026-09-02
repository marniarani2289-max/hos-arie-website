create index if not exists rahi_communication_templates_updated_by_idx
  on public.rahi_communication_templates (updated_by)
  where updated_by is not null;
create index if not exists rahi_report_snapshots_generated_by_idx
  on public.rahi_report_snapshots (generated_by)
  where generated_by is not null;
