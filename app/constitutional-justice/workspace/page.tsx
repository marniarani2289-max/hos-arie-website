import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { BASE, type RecordItem } from '@/lib/cji/model';
import Workspace from './workspace';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Ruang Kerja | Constitutional Justice', robots: { index: false, follow: false } };
export default async function Page() {
  const client = await createClient();
  const { data: { user } } = await client.auth.getUser();
  if (!user || user.is_anonymous || !user.email_confirmed_at) redirect(`/login?next=${encodeURIComponent(BASE)}`);
  const { data: member, error } = await client.from('cji_members').select('role,display_name').eq('user_id', user.id).maybeSingle();
  if (error || !member) return <section className="mx-auto max-w-xl px-6 py-24"><h1 className="text-3xl font-bold">Ruang kerja internal</h1><p className="my-6">{error ? 'Akses belum dapat diperiksa. Silakan muat ulang.' : 'Akun Anda belum terdaftar sebagai pengelola Constitutional Justice. Hubungi pengelola untuk memperoleh akses.'}</p><Link href="/constitutional-justice" className="underline">Kembali ke Constitutional Justice</Link></section>;
  const records: RecordItem[] = [];
  for (let offset = 0; ; offset += 500) {
    const { data, error: loadError } = await client.from('cji_records').select('*').order('created_at').order('id').range(offset, offset + 499);
    if (loadError) throw new Error('Data ruang kerja belum dapat dimuat.');
    records.push(...data as RecordItem[]); if (data.length < 500) break;
  }
  // Dynamic Server Component: one request timestamp also seeds hydration deterministically.
  // eslint-disable-next-line react-hooks/purity
  return <Workspace initialNow={Date.now()} initial={records} name={member.display_name || user.email || 'Pengelola'} role={member.role} />;
}
