-- Applied to project ynzxmjvtpyruzxujaofq on 2026-11-07.
-- Consolidated final definition of three transactional migrations. No corpus approvals changed.
create or replace function etik_pemilu.search_terms(p_text text) returns text[] language sql immutable security invoker set search_path='' as $$
with words as(select lower(x) word from regexp_split_to_table(regexp_replace(regexp_replace(lower(coalesce(p_text,'')),'mengundurkan diri|mengundurkan dirinya|mengundurkan jabatan','berhenti','g'),'pejabat yang diadukan|orang yang diadukan','teradu','g'),'[^[:alnum:]]+') x),
aliases(word,term) as(values
('diadukan','aduan'),('pengaduan','aduan'),('mengadu','aduan'),('mengadukan','aduan'),('melaporkan','aduan'),('pelaporan','aduan'),
('pencabutan','cabut'),('dicabut','cabut'),('mencabut','cabut'),('pemeriksaan','periksa'),('persidangan','periksa'),('disidang','periksa'),('sidang','periksa'),('diperiksa','periksa'),('memeriksa','periksa'),
('mengakhiri','berhenti'),('berakhir','berhenti'),('berhentinya','berhenti'),
('publikasi','publik'),('dipublikasikan','publik'),('angka','data'),('datanya','data'),
('berbeda','beda'),('perbedaan','beda'),('berlainan','beda'),('cocok','sama'),
('mentraktir','makan'),('jamuan','makan'),('ditraktir','makan'),
('kandidat','calon'),('pencalonan','calon'),
('kakak','saudara'),('adik','saudara'),('saudaranya','saudara'),
('parcel','bingkisan'),('parsel','bingkisan'),('hadiah','bingkisan'),
('medsos','sosial'),('instagram','sosial'),('like','menyukai'),('repost','membagikan'),
('screenshot','tangkapan'),('wa','whatsapp'),('dm','pribadi'),
('dissenting','pendapat'),('opinion','pendapat'),
('parpol','partai'),('politik','partai'),
('terbukti','bukti'),('buktinya','bukti'),
('menentukan','tentukan'),('penetapan','tentukan'),('memastikan','tentukan'),('menetapkan','tentukan'),
('lengkapnya','lengkap'),('berkas','dokumen'),
('tenggatnya','tenggat'),('batas','tenggat'),('deadline','tenggat'),
('melengkapi','perbaikan'),('diperbaiki','perbaikan'),
('menandatangani','tandatangan'),('menandatangankan','tandatangan'),
('diungkapkan','ungkap'),('mengungkapkan','ungkap'),
('menanggapi','merespons'),('respons','merespons'),
('dibuka','buka'),('membukanya','buka'),('membuka','buka'),
('melampaui','luar'),('ditutup','tutup'),
('ditangani','periksa'),('ditanganinya','periksa'),
('mengomentari','komentar'),('opini','komentar'),
('keberpihakan','berpihak'),('memihak','berpihak'),
('kelayakannya','kelayakan'),('sanksinya','sanksi')
), tokens as(select coalesce(a.term,w.word) term from words w left join aliases a using(word))
select coalesce(array_agg(distinct term order by term),'{}') from tokens
where length(term)>=3 and term not in
('apa','apakah','bagaimana','saya','yang','dan','atau','dengan','untuk','dari','dalam','ini','itu','bisa','bisakah','boleh','bolehkah','sebagai','tentang','pada','jika','berapa','oleh','seorang','ketika','harus','dapat','tidak','kepada','mengenai','jelaskan','tolong','bantu','terkait','cara','membuat','buat','hari','orang','semua','selalu','langsung','masih','sudah','menjadi','perlu','apa','kapan','siapa','tanpa','hanya','saja','satu','salah','ingin','saya','punya','sedang','agar','sejak','lama');
$$;
revoke all on function etik_pemilu.search_terms(text) from public,anon,authenticated;
create or replace function etik_pemilu.rank_answers(p_query text) returns table(answer_id text,relevance double precision)
language sql stable security invoker set search_path='' as $$
with q as(select etik_pemilu.search_terms(p_query) terms),
corpus as(
select a.id,a.question,etik_pemilu.search_terms(a.question) qt,etik_pemilu.search_terms(coalesce(r.final_text,r.proposed_text)) at
from etik_pemilu.reference_answers a join lateral(select * from etik_pemilu.review_entries e where e.answer_id=a.id order by revision desc limit 1)r on true),
df as(select t,count(*)::float n from corpus c cross join lateral unnest(c.qt)t group by t),
scored as(select c.id,
(lower(c.question)=lower(trim(p_query)) or lower(c.id)=lower(trim(p_query))) exact,
(select count(*) from unnest(q.terms) qt(token) where qt.token=any(c.qt)) hits,
coalesce((select sum((case when qt.token in ('kpu','dkpp','tpd','pemilu','penyelenggara','anggota','etik','calon') then 0.2 else ln(1+30.0/df.n) end)) from unnest(q.terms) qt(token) join df on df.t=qt.token where qt.token=any(c.qt)),0)
+0.15*coalesce((select sum(ln(1+30.0/coalesce(df.n,1))) from unnest(q.terms) qt(token) left join df on df.t=qt.token where qt.token=any(c.at)),0) score
from corpus c cross join q)
select s.id,case when s.exact then 1000 else s.score end
from scored s
where s.exact or (s.hits>=2 and s.score>=2 and
lower(p_query) ~ '(pemilu|pilkada|kpu|kpps|bawaslu|dkpp|tpd|penyelenggara|calon|kandidat|aduan|mengadu|pengadu|teradu|pleno|berita acara|sidang|periksa|pemeriksa|putusan|amar|rehabilitasi|kampanye|parpol|partai|surat suara|resume|ne bis|tangkapan layar|screenshot|whatsapp|pdf|katalog)' and
not (lower(p_query) ~ '(resep|kue|diabetes|saham|pajak restoran|perceraian|warisan|wanprestasi|sengketa tanah)'
and lower(p_query) !~ '(pemilu|pilkada|kpu|kpps|bawaslu|dkpp|tpd|penyelenggara|calon|kandidat)'))
order by s.exact desc,s.score desc,s.id limit 3
$$;
revoke all on function etik_pemilu.rank_answers(text) from public,anon,authenticated;

CREATE OR REPLACE FUNCTION etik_pemilu.app(p_action text, p_payload jsonb DEFAULT '{}'::jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
 u uuid:=auth.uid(); coordinator boolean; reviewer boolean; result jsonb; entry etik_pemilu.review_entries%rowtype;
 new_id text; next_revision integer; q text; qry tsquery; token_text text; other uuid; request_id uuid;
begin
 if length(p_payload::text)>35000 then raise exception 'etik_invalid_payload'; end if;
 if u is null or coalesce((auth.jwt()->>'is_anonymous')::boolean,false) then raise exception 'etik_auth_required' using errcode='42501'; end if;
 select exists(select 1 from public.rahi_admins where user_id=u) into coordinator;
 select exists(select 1 from etik_pemilu.reviewers where user_id=u and active) into reviewer;
 if not coordinator and not reviewer then raise exception 'etik_access_denied' using errcode='42501'; end if;
 if p_action='init' then
  return jsonb_build_object('coordinator',coordinator,'reviewer',reviewer,'documents',(select count(*) from etik_pemilu.documents),'questions',(select count(*) from etik_pemilu.reference_answers),'openIssues',(select count(*) from etik_pemilu.issues where resolution_status='open'),'approved',(select count(*) from etik_pemilu.approved_answers),'examples',(select jsonb_agg(t) from(select id,question from etik_pemilu.reference_answers order by id)t));
 elsif p_action='search' then
  q:=trim(coalesce(p_payload->>'query','')); if length(q)<3 or length(q)>1500 then raise exception 'etik_invalid_query'; end if;
  select string_agg(quote_literal(t),' | ') into token_text from (select distinct lower(x) t from regexp_split_to_table(q,'[^[:alnum:]]+') x where length(x)>=3 and lower(x) not in ('apa','apakah','bagaimana','saya','yang','dan','atau','dengan','untuk','dari','dalam','ini','itu','bisa','boleh','sebagai','tentang','pada','jika','berapa','oleh','seorang','ketika','harus','dapat','tidak','kepada','mengenai','jelaskan','tolong','bantu','terkait') limit 18) words;
  if token_text is null then return jsonb_build_object('answers','[]'::jsonb,'sources','[]'::jsonb); end if;
  qry:=to_tsquery('simple',token_text);
  select coalesce(jsonb_agg(t),'[]') into result from (
   select a.id,a.question,r.id entry_id,r.proposed_text,r.final_text,r.ai_disposition,r.source_evidence,
    exists(select 1 from etik_pemilu.approved_answers ok where ok.id=a.id) approved,
    (select coalesce(jsonb_agg(jsonb_build_object('id',i.id,'title',i.title,'status',i.resolution_status)),'[]') from etik_pemilu.answer_dependencies dep join etik_pemilu.issues i on i.id=dep.issue_id where dep.answer_id=a.id) issues,
    (select coalesce(jsonb_agg(jsonb_build_object('code',d.code,'title',d.title,'url',d.official_url,'locator',s.locator_note)),'[]') from etik_pemilu.answer_sources s join etik_pemilu.documents d on d.code=s.document_code where s.answer_id=a.id) citations
   from etik_pemilu.rank_answers(q) ranked join etik_pemilu.reference_answers a on a.id=ranked.answer_id join lateral(select * from etik_pemilu.review_entries re where re.answer_id=a.id order by re.revision desc limit 1)r on true
   order by ranked.relevance desc,a.id limit 3
  )t;
  if jsonb_array_length(result)=0 then return jsonb_build_object('answers','[]'::jsonb,'sources','[]'::jsonb,'segments','[]'::jsonb); end if;
  return jsonb_build_object('answers',result,'sources',(select coalesce(jsonb_agg(t),'[]') from(
   select p.id,p.body,p.representation label,p.validation_status,p.locator,coalesce(d.title,'Konsolidasi kerja '||p.base_code) title,d.official_url url from etik_pemilu.provisions p left join etik_pemilu.documents d on d.code=p.source_code where p.search_vector@@qry order by ts_rank(p.search_vector,qry) desc,p.id limit 3
  )t),'segments',(select coalesce(jsonb_agg(t),'[]') from(
   select s.id,s.label,s.body,s.locator,s.validation_status,d.title,d.official_url url from etik_pemilu.decision_segments s join etik_pemilu.documents d on d.code=s.decision_code where s.search_vector@@qry order by ts_rank(s.search_vector,qry) desc,s.id limit 3
  )t));
 elsif p_action='reviews' then
  return jsonb_build_object('entries',(select jsonb_agg(t) from(
   select r.*,coalesce(a.question,i.title) title,i.resolution_status,
    (select coalesce(jsonb_agg(jsonb_build_object('name',p.display_name,'decision',h.decision,'reason',h.reason,'at',h.reviewed_at)),'[]') from etik_pemilu.human_reviews h join etik_pemilu.reviewers p on p.user_id=h.reviewer_id where h.entry_id=r.id) reviews
   from etik_pemilu.review_entries r left join etik_pemilu.reference_answers a on a.id=r.answer_id left join etik_pemilu.issues i on i.id=r.issue_id
   where not exists(select 1 from etik_pemilu.review_entries n where coalesce(n.answer_id,n.issue_id)=coalesce(r.answer_id,r.issue_id) and n.revision>r.revision)
   order by coalesce(r.issue_id,r.answer_id) limit 40)t),
   'reviewers',(select coalesce(jsonb_agg(jsonb_build_object('name',display_name,'active',active)),'[]') from etik_pemilu.reviewers));
 elsif p_action='add_reviewer' then
  if not coordinator then raise exception 'etik_coordinator_required' using errcode='42501'; end if;
  if length(trim(coalesce(p_payload->>'name','')))<3 then raise exception 'etik_invalid_reviewer'; end if;
  select id into other from auth.users where lower(email)=lower(trim(p_payload->>'email')) and email_confirmed_at is not null and not is_anonymous;
  if other is null then raise exception 'etik_registered_account_required'; end if;
  insert into etik_pemilu.reviewers(user_id,display_name,active) values(other,left(trim(p_payload->>'name'),120),true)
   on conflict(user_id) do update set display_name=excluded.display_name,active=true;
  insert into etik_pemilu.audit_events(table_name,operation,record_key,actor_db_role,actor_user,new_row) values('reviewers','ASSIGN',other::text,current_user,u,jsonb_build_object('name',p_payload->>'name'));
  return jsonb_build_object('saved',true);
 elsif p_action in ('revise','review','resolve') then
  select * into entry from etik_pemilu.review_entries where id=p_payload->>'entryId';
  if not found then raise exception 'etik_entry_missing'; end if;
  perform pg_advisory_xact_lock(hashtextextended(coalesce(entry.answer_id,entry.issue_id),0));
  if exists(select 1 from etik_pemilu.review_entries n where coalesce(n.answer_id,n.issue_id)=coalesce(entry.answer_id,entry.issue_id) and n.revision>entry.revision) then raise exception 'etik_stale_revision'; end if;
  if p_action='revise' then
   if not coordinator then raise exception 'etik_coordinator_required' using errcode='42501'; end if;
   if length(trim(coalesce(p_payload->>'text','')))<20 or length(p_payload->>'text')>10000 or length(trim(coalesce(p_payload->>'reason','')))<10 or length(trim(coalesce(p_payload->>'evidence','')))<10 then raise exception 'etik_incomplete_revision'; end if;
   next_revision:=entry.revision+1;new_id:=coalesce(entry.answer_id,entry.issue_id)||'-v03-r'||next_revision;
   insert into etik_pemilu.review_entries(id,answer_id,issue_id,revision,proposed_text,final_text,reason_and_followup,source_evidence,ai_disposition,import_id)
   values(new_id,entry.answer_id,entry.issue_id,next_revision,entry.proposed_text,trim(p_payload->>'text'),trim(p_payload->>'reason'),trim(p_payload->>'evidence'),'Usulan penelaah',entry.import_id);
   if entry.issue_id is not null then update etik_pemilu.issues set resolution_status='open',resolution_reason=null,resolved_by=null,resolved_at=null where id=entry.issue_id; end if;
   return jsonb_build_object('entryId',new_id);
  elsif p_action='review' then
   if not reviewer then raise exception 'etik_reviewer_required' using errcode='42501'; end if;
   if p_payload->>'hash' is distinct from entry.content_hash then raise exception 'etik_stale_revision'; end if;
   if p_payload->>'decision' not in ('approve','correct','hold') or length(trim(coalesce(p_payload->>'reason','')))<10 then raise exception 'etik_invalid_review'; end if;
   if p_payload->>'decision'='approve' and nullif(trim(entry.final_text),'') is null then raise exception 'etik_final_text_required'; end if;
   insert into etik_pemilu.human_reviews(entry_id,content_hash,reviewer_id,decision,reason) values(entry.id,entry.content_hash,u,p_payload->>'decision',trim(p_payload->>'reason'));
   return jsonb_build_object('saved',true);
  else
   if not coordinator or entry.issue_id is null then raise exception 'etik_coordinator_required' using errcode='42501'; end if;
   if nullif(trim(entry.final_text),'') is null or (select count(*) from etik_pemilu.human_reviews h join etik_pemilu.reviewers p on p.user_id=h.reviewer_id and p.active where h.entry_id=entry.id and h.decision='approve')<2 or exists(select 1 from etik_pemilu.human_reviews h where h.entry_id=entry.id and h.decision<>'approve') then raise exception 'etik_two_reviews_required'; end if;
   update etik_pemilu.issues set resolution_status='resolved',resolution_reason=entry.final_text,resolved_by=u,resolved_at=now() where id=entry.issue_id;
   return jsonb_build_object('saved',true);
  end if;
 elsif p_action='reserve' then
  request_id:=(p_payload->>'requestId')::uuid;
  perform pg_advisory_xact_lock(hashtextextended('etik-ai:'||u::text,0));
  if exists(select 1 from etik_pemilu.generations where id=request_id) then raise exception 'etik_duplicate_request'; end if;
  if (select count(*) from etik_pemilu.generations where user_id=u and created_at>now()-interval '24 hours')>=20 or exists(select 1 from etik_pemilu.generations where user_id=u and created_at>now()-interval '20 seconds') then raise exception 'etik_rate_limit'; end if;
  insert into etik_pemilu.generations(id,user_id,model,question_hash,context_ids) values(request_id,u,left(p_payload->>'model',120),md5(p_payload->>'question'),coalesce(p_payload->'contextIds','[]'));
  return jsonb_build_object('reserved',true);
 elsif p_action='finish' then
  if p_payload->>'status' not in ('completed','failed') then raise exception 'etik_invalid_status'; end if;
  update etik_pemilu.generations set status=p_payload->>'status',usage=p_payload->'usage' where id=(p_payload->>'requestId')::uuid and user_id=u and status='reserved';
  return jsonb_build_object('saved',found);
 else raise exception 'etik_unknown_action'; end if;
end $function$
