import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import NotaryWorkspace from '../NotaryWorkspace';
import type { RecordItem, Audit } from '@/lib/lexnusa/notaris/model';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Ruang Kerja | LexNusa Notaris', robots: { index: false, follow: false } };

export default async function WorkspacePage({searchParams}:{searchParams:Promise<{tab?:string}>}) {
  const initialTab=(await searchParams).tab==='portal'?'portal':'overview';
  const db = await createClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user || user.is_anonymous) redirect('/login?next=/lexnusa/notaris/workspace');
  const { data: office, error } = await db.from('lexnusa_notary_offices').select('id,name').eq('owner_id', user.id).maybeSingle();
  const records: RecordItem[] = [];
  let loadError = error ? 'Ruang kerja belum dapat dimuat. Silakan muat ulang.' : '';
  if (office) {
    for (let offset = 0; ; offset += 1000) {
      const { data, error: recordError } = await db.from('lexnusa_notary_records').select('*').eq('office_id', office.id).order('created_at', { ascending: false }).order('id').range(offset, offset + 999);
      if (recordError) { loadError = 'Data gagal dimuat. Muat ulang sebelum melanjutkan.'; break; }
      records.push(...(data || []) as RecordItem[]);
      if (!data || data.length < 1000) break;
      if (offset >= 9000) { loadError = 'Batas tampilan 10.000 catatan tercapai. Hubungi pengelola LexNusa.'; break; }
    }
  }
  const audit = office ? await db.from('lexnusa_notary_audit').select('id,action,record_title,created_at').eq('office_id', office.id).order('id', { ascending: false }).limit(50) : { data: [] };
  if (loadError) return <main className="mx-auto max-w-3xl p-12"><h1 className="text-2xl font-bold">Ruang kerja belum tersedia</h1><p className="mt-4" role="alert">{loadError}</p><a className="mt-6 inline-block underline" href="/lexnusa/notaris/workspace">Muat ulang</a></main>;
  return <NotaryWorkspace initialTab={initialTab} office={office} records={records} audit={(audit.data || []) as Audit[]} />;
}
