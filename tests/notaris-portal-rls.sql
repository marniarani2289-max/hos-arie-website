begin;
insert into auth.users(id,email) values ('f72b89a1-a566-47a4-a314-a19d767fd011','notary-portal-test@example.invalid');
set local role authenticated;
select set_config('request.jwt.claims','{"sub":"f72b89a1-a566-47a4-a314-a19d767fd011","role":"authenticated","is_anonymous":false}',true);
insert into public.lexnusa_notary_offices(id,owner_id,name) values('f72b89a1-a566-47a4-a314-a19d767fe011',auth.uid(),'Synthetic portal office');
insert into public.lexnusa_notary_records(id,office_id,kind,title) values
('f72b89a1-a566-47a4-a314-a19d767ff011','f72b89a1-a566-47a4-a314-a19d767fe011','matter','Synthetic matter A'),
('f72b89a1-a566-47a4-a314-a19d767ff012','f72b89a1-a566-47a4-a314-a19d767fe011','matter','Synthetic matter B');
insert into public.lexnusa_notary_records(id,office_id,kind,title,parent_id,data) values
('f72b89a1-a566-47a4-a314-a19d767ff013','f72b89a1-a566-47a4-a314-a19d767fe011','document','Synthetic evidence','f72b89a1-a566-47a4-a314-a19d767ff011','{"file_path":"f72b89a1-a566-47a4-a314-a19d767fd011/synthetic.pdf"}'),
('f72b89a1-a566-47a4-a314-a19d767ff014','f72b89a1-a566-47a4-a314-a19d767fe011','submission','Synthetic application','f72b89a1-a566-47a4-a314-a19d767ff011','{"provider":"AHU","portal_service":"Perseroan terbatas","portal_status":"Draf persiapan","source":"api"}');
do $$ begin
 if (select data->>'source' from public.lexnusa_notary_records where id='f72b89a1-a566-47a4-a314-a19d767ff014')<>'manual' then raise exception 'Provenance override failed';end if;
 begin update public.lexnusa_notary_records set data=data||'{"portal_status":"Hasil diterima"}'::jsonb where id='f72b89a1-a566-47a4-a314-a19d767ff014';raise exception 'Missing reference accepted';exception when raise_exception then if sqlerrm<>'Submission reference and dates are required' then raise;end if;end;
 begin update public.lexnusa_notary_records set data=data||'{"portal_status":"Hasil diterima","reference":"SYNTHETIC","submitted_on":"2025-01-01","checked_on":"2025-01-02"}'::jsonb where id='f72b89a1-a566-47a4-a314-a19d767ff014';raise exception 'Missing evidence accepted';exception when raise_exception then if sqlerrm<>'Result evidence is required' then raise;end if;end;
 update public.lexnusa_notary_records set data=data||'{"portal_status":"Hasil diterima","reference":"SYNTHETIC","submitted_on":"2025-01-01","checked_on":"2025-01-02","evidence_id":"f72b89a1-a566-47a4-a314-a19d767ff013"}'::jsonb where id='f72b89a1-a566-47a4-a314-a19d767ff014';
 if not exists(select 1 from public.lexnusa_notary_audit where record_id='f72b89a1-a566-47a4-a314-a19d767ff014' and action like '%Hasil diterima (catatan manual)') then raise exception 'Missing status audit';end if;
 begin update public.lexnusa_notary_records set parent_id='f72b89a1-a566-47a4-a314-a19d767ff012' where id='f72b89a1-a566-47a4-a314-a19d767ff014';raise exception 'Other matter evidence accepted';exception when raise_exception then if sqlerrm<>'Evidence must belong to the same matter and office' then raise;end if;end;
 begin update public.lexnusa_notary_records set parent_id='f72b89a1-a566-47a4-a314-a19d767ff012' where id='f72b89a1-a566-47a4-a314-a19d767ff013';raise exception 'Linked evidence moved';exception when raise_exception then if sqlerrm<>'Evidence is linked to a submission' then raise;end if;end;
end $$;
reset role;
select 'PASS: manual provenance, required reference and evidence, status audit, evidence ownership and stable link' as result;
rollback;
