import { stages, type Work } from "./cohort";

export const riskLevels = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;
export type RiskLevel = (typeof riskLevels)[number];
export type GenerationRefs = Partial<Record<keyof Work, string>>;
export type DocumentContext = {
  document_title: string;
  risk_level: RiskLevel;
  source_notes: string;
};
export const emptyDocument: DocumentContext = {
  document_title: "Kontrak kerja · LN-KK-01",
  risk_level: "MEDIUM",
  source_notes: "",
};
export const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function parseDocument(value: unknown): DocumentContext | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Record<string, unknown>;
  if (
    typeof v.document_title !== "string" ||
    typeof v.source_notes !== "string" ||
    !riskLevels.includes(v.risk_level as RiskLevel)
  )
    return null;
  const title = v.document_title.trim(),
    sources = v.source_notes.trim();
  if (title.length < 3 || title.length > 200 || sources.length > 10000)
    return null;
  return {
    document_title: title,
    risk_level: v.risk_level as RiskLevel,
    source_notes: sources,
  };
}

export function parseGenerationRefs(value: unknown): GenerationRefs | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  if (
    Object.entries(value).some(
      ([key, id]) =>
        !stages.some((s) => s.key === key) ||
        typeof id !== "string" ||
        !uuidPattern.test(id),
    )
  )
    return null;
  return value as GenerationRefs;
}

export function workflowStatus(
  version?: { submitted: boolean } | null,
  review?: { decision: string } | null,
) {
  if (!version) return "Belum ada versi";
  if (!version.submitted) return "Draf";
  if (review?.decision === "verified") return "Disetujui untuk praktik";
  if (review?.decision === "revision_requested") return "Perlu revisi";
  return "Menunggu persetujuan manusia";
}

// Original learning aids; no paid third-party templates or claims of legal authority.
export const practiceAids = [
  {
    id: "LN-BRIEF-01",
    title: "Form kebutuhan dokumen",
    stage: "brief" as const,
    text: "Fakta kasus: [isi]\nTujuan dokumen: [isi]\nPara pihak dan kewenangan: [isi]\nRuang lingkup pekerjaan: [isi]\nJangka waktu dan pembayaran: [isi]\nAsumsi yang belum dibuktikan: [isi]\nPertanyaan untuk diklarifikasi: [isi]",
  },
  {
    id: "LN-REVIEW-01",
    title: "Checklist pemeriksaan manusia",
    stage: "evaluation" as const,
    text: "Sumber acuan dan bagian yang diperiksa: [isi]\nKetepatan isi dan kesesuaian kebutuhan: [isi]\nKewenangan dan identitas para pihak: [isi]\nHak, kewajiban, tenggat dan pembayaran: [isi]\nTemuan AI yang diterima/ditolak beserta alasan: [isi]\nRisiko kritis yang belum selesai: [isi]\nPerbaikan yang diminta: [isi]",
  },
  {
    id: "LN-CHANGE-01",
    title: "Catatan revisi",
    stage: "revision" as const,
    text: "DOKUMEN HASIL REVISI\n[Tempel teks lengkap hasil perbaikan]\n\nCATATAN PERUBAHAN\nBagian yang diubah: [isi]\nAlasan dan sumber pendukung: [isi]\nTanggapan terhadap umpan balik: [isi]\nIsu terbuka untuk keputusan fasilitator: [isi]",
  },
] as const;
