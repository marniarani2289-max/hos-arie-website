-- Portal-assisted workflow only. No outbound API connection is enabled.
alter table public.lexnusa_notary_records drop constraint lexnusa_notary_records_kind_check;
alter table public.lexnusa_notary_records add constraint lexnusa_notary_records_kind_check check (kind in ('client','matter','document','appointment','invoice','submission'));
create function notary_private.validate_portal_record() returns trigger language plpgsql security invoker set search_path='' as $$
begin
 if new.kind = 'document' and tg_op='UPDATE' then
  if (new.parent_id is distinct from old.parent_id or new.data->>'file_path' is distinct from old.data->>'file_path') and exists(select 1 from public.lexnusa_notary_records s where s.office_id=old.office_id and s.kind='submission' and s.data->>'evidence_id'=old.id::text) then raise exception 'Evidence is linked to a submission';end if;
 end if;
 if new.kind <> 'submission' then return new; end if;
 if new.parent_id is null then raise exception 'Submission requires a matter'; end if;
 if coalesce(new.data->>'provider','') not in ('AHU','ATR-BPN') then raise exception 'Invalid portal provider';end if;
 if coalesce(new.data->>'portal_status','') not in ('Draf persiapan','Diajukan di portal','Perlu perbaikan','Hasil diterima','Dibatalkan') then raise exception 'Invalid portal status';end if;
 if new.data->>'portal_status' not in ('Draf persiapan','Dibatalkan') and (coalesce(trim(new.data->>'reference'),'')='' or coalesce(new.data->>'submitted_on','')='' or coalesce(new.data->>'checked_on','')='') then raise exception 'Submission reference and dates are required';end if;
 if new.data->>'portal_status'='Hasil diterima' and coalesce(new.data->>'evidence_id','')='' then raise exception 'Result evidence is required';end if;
 if coalesce(new.data->>'evidence_id','')<>'' and not exists(select 1 from public.lexnusa_notary_records d where d.id::text=new.data->>'evidence_id' and d.office_id=new.office_id and d.parent_id=new.parent_id and d.kind='document' and coalesce(d.data->>'file_path','')<>'') then raise exception 'Evidence must belong to the same matter and office';end if;
 new.data := jsonb_set(new.data,'{source}','"manual"'::jsonb);
 return new;
end $$;
revoke all on function notary_private.validate_portal_record() from public,anon,authenticated;
create trigger notary_portal_validation before insert or update on public.lexnusa_notary_records for each row execute function notary_private.validate_portal_record();

-- Include the operator-recorded status in the immutable activity log.
create or replace function notary_private.record_change() returns trigger language plpgsql security definer set search_path='' as $$
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
 insert into public.lexnusa_notary_audit(office_id,record_id,record_title,actor_id,action) values(new.office_id,new.id,new.title,auth.uid(),case when tg_op='INSERT' then 'Dibuat' when new.archived and not old.archived then 'Diarsipkan' when not new.archived and old.archived then 'Dipulihkan' else 'Diperbarui' end || case when new.kind='submission' then ' · ' || (new.data->>'provider') || ' · ' || (new.data->>'portal_status') || ' (catatan manual)' else '' end);
 return new;
end $$;
