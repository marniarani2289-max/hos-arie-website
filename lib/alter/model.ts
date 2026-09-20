export const roles = [
  {
    key: "advisor",
    name: "Advisor",
    label: "Rencana belajar",
    help: "Susun arah, prioritas, dan langkah yang realistis.",
    starter:
      "Bantu susun rencana belajar mingguan dengan hasil yang bisa saya tunjukkan.",
    instruction:
      "Susun rencana bertahap sesuai tujuan, tingkat, waktu. Berikan tugas konkret dan kriteria keberhasilan. Jangan mengklaim mengubah jadwal atau tugas pengguna.",
  },
  {
    key: "librarian",
    name: "Librarian",
    label: "Sumber belajar",
    help: "Telaah bahan bacaan dan temukan bagian yang perlu diperiksa.",
    starter:
      "Telaah sumber yang saya simpan. Apa yang relevan dan masih perlu saya periksa?",
    instruction:
      "Utamakan kutipan sumber pengguna. Sebutkan sumber dengan judulnya. URL tidak diakses. Jika kutipan kosong, jangan merangkum isinya. Sarankan kata kunci dan jenis sumber, jangan mengarang referensi atau URL. Status diperiksa adalah pengakuan pengguna, bukan verifikasi independen.",
  },
  {
    key: "tutor",
    name: "Tutor",
    label: "Latihan pemahaman",
    help: "Pahami konsep, jawab pertanyaan, lalu dapatkan umpan balik.",
    starter:
      "Ajari saya satu konsep sesuai tujuan belajar, lalu beri satu pertanyaan latihan. Tunggu jawaban saya sebelum memberi solusinya.",
    instruction:
      "Ajarkan satu konsep, gunakan contoh, lalu satu pertanyaan terbuka. Tunggu usaha pengguna sebelum solusi. Pada jawaban lanjutan, jelaskan kekuatan, kekeliruan, dan langkah berikut. Jangan menyatakan pengguna lulus atau mengubah kemajuan.",
  },
  {
    key: "editor",
    name: "Editor",
    label: "Perbaiki karya",
    help: "Periksa alur, alasan, dan bahasa dalam draf Anda.",
    starter:
      "Tinjau draf karya saya. Tunjukkan bagian yang perlu diperbaiki beserta alasannya.",
    instruction:
      "Tinjau draf karya. Jika kosong, minta draf. Bedakan koreksi bahasa, struktur, bukti dan substansi. Pertahankan suara penulis, jangan tambahkan fakta atau sitasi tanpa sumber. Berikan contoh revisi dan alasannya.",
  },
  {
    key: "roommate",
    name: "Roommate",
    label: "Teman diskusi",
    help: "Uji gagasan dari sudut pandang yang berbeda.",
    starter:
      "Tantang asumsi saya dan ajukan satu pertanyaan yang membantu saya berpikir lebih dalam.",
    instruction:
      "Jadi mitra diskusi kritis. Berikan perspektif alternatif dengan alasan, bedakan fakta dan hipotesis, lalu ajukan pertanyaan reflektif. Jangan sekadar menyetujui.",
  },
] as const;
export type Role = (typeof roles)[number]["key"];
export type Source = {
  id: string;
  title: string;
  url: string;
  excerpt: string;
  reviewed: boolean;
};
export type Task = {
  id: string;
  title: string;
  evidence: string;
  done: boolean;
};
export type Workspace = {
  goal: string;
  level: string;
  minutes: number;
  weeks: number;
  draft: string;
  reflection: string;
  sources: Source[];
  tasks: Task[];
};
export type Generation = {
  id: string;
  role: Role;
  question: string;
  output: string | null;
  status: string;
  created_at: string;
};
export const emptyWorkspace: Workspace = {
  goal: "",
  level: "Pemula",
  minutes: 30,
  weeks: 4,
  draft: "",
  reflection: "",
  sources: [],
  tasks: [],
};
const record = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === "object" && !Array.isArray(v);
const text = (v: unknown, max: number): v is string =>
  typeof v === "string" && v.length <= max;
export function safeSourceUrl(value: string) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return (
      ["http:", "https:"].includes(url.protocol) &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}
export function parseWorkspace(v: unknown): Workspace | null {
  if (
    !record(v) ||
    !text(v.goal, 500) ||
    !["Pemula", "Menengah", "Lanjutan"].includes(String(v.level)) ||
    !Number.isInteger(v.minutes) ||
    Number(v.minutes) < 10 ||
    Number(v.minutes) > 180 ||
    !Number.isInteger(v.weeks) ||
    Number(v.weeks) < 1 ||
    Number(v.weeks) > 12 ||
    !text(v.draft, 16000) ||
    !text(v.reflection, 4000)
  )
    return null;
  if (
    !Array.isArray(v.sources) ||
    v.sources.length > 12 ||
    !v.sources.every(
      (s) =>
        record(s) &&
        text(s.id, 80) &&
        text(s.title, 200) &&
        s.title.trim() &&
        text(s.url, 2000) &&
        safeSourceUrl(s.url) &&
        text(s.excerpt, 6000) &&
        typeof s.reviewed === "boolean",
    )
  )
    return null;
  if (
    !Array.isArray(v.tasks) ||
    v.tasks.length > 24 ||
    !v.tasks.every(
      (t) =>
        record(t) &&
        text(t.id, 80) &&
        text(t.title, 300) &&
        t.title.trim() &&
        text(t.evidence, 2000) &&
        typeof t.done === "boolean" &&
        (!t.done || t.evidence.trim().length >= 10),
    )
  )
    return null;
  if (
    new Set(v.sources.map((s) => s.id)).size !== v.sources.length ||
    new Set(v.tasks.map((t) => t.id)).size !== v.tasks.length
  )
    return null;
  return {
    goal: v.goal,
    level: String(v.level),
    minutes: Number(v.minutes),
    weeks: Number(v.weeks),
    draft: v.draft,
    reflection: v.reflection,
    sources: v.sources as Source[],
    tasks: v.tasks as Task[],
  };
}
