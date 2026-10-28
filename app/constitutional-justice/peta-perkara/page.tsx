import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { petaPerkaraDocument } from '@/lib/cji/peta-perkara-document';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Peta Perkara | Constitutional Justice',
  description: 'Pemetaan pihak, bukti, kronologi, pengujian unsur, dan kontradiksi untuk anggota Constitutional Justice.',
  robots: { index: false, follow: false },
};
const destination = '/constitutional-justice/peta-perkara';

export default async function PetaPerkaraPage() {
  const client = await createClient();
  const { data: { user } } = await client.auth.getUser();
  if (!user || user.is_anonymous || !user.email_confirmed_at) {
    redirect(`/login?next=${encodeURIComponent(destination)}`);
  }
  // Match the existing Constitutional Justice workspace membership boundary.
  const { data: member, error } = await client.from('cji_members')
    .select('role').eq('user_id', user.id).maybeSingle();
  if (error || !member) {
    return <section lang="id" className="mx-auto max-w-xl px-6 py-24">
      <h1 className="text-3xl font-bold">Peta Perkara — ruang kerja internal</h1>
      <p className="my-6">{error
        ? 'Akses belum dapat diperiksa. Silakan muat ulang.'
        : 'Akun Anda belum terdaftar sebagai pengelola Constitutional Justice. Hubungi pengelola untuk memperoleh akses.'}</p>
      <Link href="/constitutional-justice" className="underline">Kembali ke Constitutional Justice</Link>
    </section>;
  }
  return <section lang="id" className="bg-stone-50">
    <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-4 px-5 py-5">
      <div>
        <h1 className="text-xl font-bold text-emerald-950">Peta Perkara · Constitutional Justice</h1>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">Data lokal di browser ini, terpisah dari data ruang kerja advokasi. Untuk memindahkan catatan dari aplikasi sebelumnya, pilih Cadangkan di aplikasi lama, lalu Impor di sini.</p>
      </div>
      <Link href="/constitutional-justice/workspace" className="rounded-lg border border-emerald-900/20 bg-white px-4 py-2 text-sm font-semibold text-emerald-900">← Ruang kerja advokasi</Link>
    </div>
    <iframe
      title="Aplikasi Peta Perkara Constitutional Justice"
      srcDoc={petaPerkaraDocument(user.id)}
      sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-downloads"
      className="block w-full border-y border-stone-200"
      style={{ height: '90dvh', minHeight: 740 }}
    />
  </section>;
}
