import Link from "next/link";

export const metadata = {
  title: "Tidak Ada Koneksi",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <section className="flex min-h-[70vh] items-center bg-slate-950 px-5 py-20 text-white">
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-amber-400/20 bg-white/5 p-8 shadow-2xl sm:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">
          Hossibarani Digital Ecosystem
        </p>
        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
          Koneksi internet terputus
        </h1>
        <p className="mt-5 text-base leading-7 text-slate-300">
          Sambungkan kembali perangkat Anda untuk membuka materi, dashboard,
          dan layanan yang membutuhkan akun.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center rounded-xl bg-amber-500 px-6 font-bold text-slate-950 transition hover:bg-amber-400"
        >
          Coba lagi
        </Link>
      </div>
    </section>
  );
}
