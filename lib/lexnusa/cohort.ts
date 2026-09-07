export const cohortCode = "LEXNUSA-PILOT-01";
export const workspacePath = "/lexnusa/cohort/workspace";
export const stages = [
  { key: "brief", title: "Memahami kebutuhan", week: 1, help: "Pisahkan fakta, asumsi, dan informasi yang perlu diklarifikasi. Uji sifat pekerjaan sebelum memilih jenis kontrak." },
  { key: "instruction", title: "Menyusun instruksi", week: 1, help: "Tuliskan konteks, tujuan, batasan, format keluaran dan sumber yang perlu diverifikasi." },
  { key: "draft", title: "Membuat draf", week: 2, help: "Susun identitas, ruang lingkup, periode, upah, hak dan kewajiban. Tandai data yang belum tersedia." },
  { key: "evaluation", title: "Memeriksa", week: 3, help: "Gunakan tujuh dimensi LEX-EVAL. Catat bukti, sumber, temuan CLF, serta keputusan menerima atau menolak temuan AI." },
  { key: "revision", title: "Merevisi", week: 4, help: "Perbaiki draf, jelaskan perubahan dan isu terbuka. Reviewer manusia menentukan kelulusan." },
] as const;
export const dimensions = [
  ["Legal Accuracy",25], ["Authority & Citation Integrity",15], ["Issue Identification",10],
  ["Legal Reasoning",20], ["Jurisdictional Alignment",10], ["Hallucination & Fabrication Control",10], ["Professional Usefulness",10],
] as const;
export type Work = Record<(typeof stages)[number]["key"], string>;
export function parseWork(form: FormData): Work | null {
  const values = stages.map(({key}) => [key, String(form.get(key) ?? "").trim()]);
  if (values.some(([,value]) => value.length > 20000)) return null;
  return Object.fromEntries(values) as Work;
}
export function complete(work: Work) { return stages.every(({key}) => work[key].length >= 20); }
