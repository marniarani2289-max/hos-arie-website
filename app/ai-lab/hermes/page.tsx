import Link from "next/link";

export const metadata = { title: "Hermes Agent | AI & Digital Systems Lab" };
export const dynamic = "force-dynamic";

function workspaceUrl() {
  try {
    const url = new URL(process.env.HERMES_WORKSPACE_URL || "");
    if (url.protocol === "https:" && !url.username && !url.password && !url.search && !url.hash) return url.href;
  } catch {}
  return null;
}

export default function HermesLab() {
  const url = workspaceUrl();
  return <main className="mx-auto max-w-3xl space-y-7 px-6 py-16">
    <Link href="/ai-lab" className="underline">← AI &amp; Digital Systems Lab</Link>
    <h1 className="text-4xl font-bold">Hermes Agent</h1>
    <p>Praktikum riset hukum bersama agen AI. Mulailah dengan satu pertanyaan, lalu periksa sumber dan penalaran dalam memo yang dihasilkan.</p>
    <section className="space-y-3 rounded-xl border p-6">
      <h2 className="text-xl font-semibold">Ruang kerja Hermes</h2>
      {url ? <a className="underline" href={url}>Masuk ke ruang kerja Hermes →</a> : <p>Layanan daring belum terhubung. Latihan di bawah dapat digunakan pada instalasi Hermes pribadi.</p>}
    </section>
    <section className="space-y-3"><h2 className="text-xl font-semibold">Latihan pertama</h2>
      <p>Salin instruksi berikut ke sesi Hermes.</p>
      <blockquote className="border-l-4 pl-4">Bagaimana cara memeriksa kewenangan suatu lembaga dalam peraturan Indonesia? Susun rencana pencarian, telusuri satu contoh dari sumber resmi, lalu tulis memo yang memuat pertanyaan, dasar hukum, tautan, dan bagian yang masih perlu diperiksa. Jika sumber tidak dapat diakses, tandai keterbatasan itu.</blockquote>
      <p>Buka setiap tautan, cocokkan nomor pasal dan kutipan, lalu catat koreksi sebelum menggunakan memo di kelas.</p>
    </section>
    <a className="underline" href="https://hermes-agent.nousresearch.com/docs/getting-started/installation">Panduan pemasangan resmi Hermes Agent</a>
  </main>;
}
