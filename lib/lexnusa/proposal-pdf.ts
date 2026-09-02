type ProposalPdfInput = {
  proposalNo: string;
  title: string;
  clientName: string;
  organization?: string | null;
  email: string;
  scope: string;
  deliverables: string;
  timeline: string;
  feeLabel: string;
  validUntil?: string | null;
  terms?: string | null;
  createdAt: string;
};

type PdfLine = { text: string; size?: number; bold?: boolean; gapAfter?: number };

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN_X = 50;
const TOP_Y = 792;
const BOTTOM_Y = 55;

function ascii(value: string) {
  return value
    .replace(/[–—]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/•/g, "-")
    .replace(/™/g, "TM")
    .normalize("NFKD")
    .replace(/[^\x20-\x7E\n\r\t]/g, "?");
}

function escapePdf(value: string) {
  return ascii(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrap(value: string, maxChars = 88) {
  const paragraphs = ascii(value).replace(/\r/g, "").split("\n");
  const lines: string[] = [];
  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();
    if (!trimmed) {
      lines.push("");
      continue;
    }
    const words = trimmed.split(/\s+/);
    let current = "";
    for (const word of words) {
      if (!current) current = word;
      else if (`${current} ${word}`.length <= maxChars) current += ` ${word}`;
      else {
        lines.push(current);
        current = word;
      }
    }
    if (current) lines.push(current);
  }
  return lines;
}

function section(lines: PdfLine[], title: string, value: string | null | undefined) {
  lines.push({ text: title.toUpperCase(), size: 11, bold: true, gapAfter: 3 });
  for (const line of wrap(value || "-")) lines.push({ text: line || " ", size: 10 });
  lines.push({ text: " ", size: 6, gapAfter: 4 });
}

function buildLines(input: ProposalPdfInput): PdfLine[] {
  const lines: PdfLine[] = [
    { text: "LEXNUSA LEGAL AI", size: 18, bold: true, gapAfter: 3 },
    { text: "Human Legal Judgment. AI-Ready Intelligence.", size: 9, gapAfter: 10 },
    { text: "COMMERCIAL PROPOSAL", size: 13, bold: true, gapAfter: 7 },
    { text: input.title, size: 16, bold: true, gapAfter: 9 },
    { text: `Proposal No: ${input.proposalNo}`, size: 10 },
    { text: `Prepared for: ${input.clientName}${input.organization ? ` - ${input.organization}` : ""}`, size: 10 },
    { text: `Client email: ${input.email}`, size: 10 },
    { text: `Prepared: ${input.createdAt}`, size: 10, gapAfter: 12 },
  ];

  section(lines, "Scope", input.scope);
  section(lines, "Deliverables", input.deliverables);
  section(lines, "Timeline", input.timeline);
  section(lines, "Professional Fee", input.feeLabel);
  section(lines, "Valid Until", input.validUntil || "Not specified");
  section(lines, "Terms / Notes", input.terms || "Standard LexNusa professional engagement terms apply.");

  lines.push({ text: "CONFIDENTIALITY & PROFESSIONAL SCOPE", size: 11, bold: true, gapAfter: 3 });
  for (const line of wrap("This proposal is confidential and intended only for the named recipient. LexNusa provides legal intelligence, research, evaluation and AI-quality services. Unless separately agreed in writing, the engagement does not constitute legal representation, a formal legal opinion, or regulatory certification.")) {
    lines.push({ text: line, size: 9 });
  }
  lines.push({ text: " ", size: 7, gapAfter: 7 });
  lines.push({ text: "LexNusa Legal AI", size: 10, bold: true });
  lines.push({ text: "Where Legal Reasoning Meets Artificial Intelligence.", size: 9 });
  return lines;
}

function paginate(lines: PdfLine[]) {
  const pages: PdfLine[][] = [];
  let page: PdfLine[] = [];
  let y = TOP_Y;
  for (const line of lines) {
    const size = line.size || 10;
    const height = Math.max(12, size + 4) + (line.gapAfter || 0);
    if (y - height < BOTTOM_Y && page.length) {
      pages.push(page);
      page = [];
      y = TOP_Y;
    }
    page.push(line);
    y -= height;
  }
  if (page.length) pages.push(page);
  return pages;
}

function pageStream(lines: PdfLine[], pageNumber: number, pageCount: number) {
  let y = TOP_Y;
  const commands: string[] = [];
  commands.push("0.05 0.11 0.16 rg");
  for (const line of lines) {
    const size = line.size || 10;
    const font = line.bold ? "/F2" : "/F1";
    commands.push(`BT ${font} ${size} Tf 1 0 0 1 ${MARGIN_X} ${y} Tm (${escapePdf(line.text)}) Tj ET`);
    y -= Math.max(12, size + 4) + (line.gapAfter || 0);
  }
  commands.push("0.45 0.48 0.52 rg");
  commands.push(`BT /F1 8 Tf 1 0 0 1 ${MARGIN_X} 30 Tm (LexNusa Legal AI - ${pageNumber}/${pageCount}) Tj ET`);
  commands.push(`BT /F1 8 Tf 1 0 0 1 ${PAGE_WIDTH - 205} 30 Tm (Confidential commercial proposal) Tj ET`);
  return commands.join("\n");
}

export function proposalPdfFilename(proposalNo: string) {
  return `${ascii(proposalNo).replace(/[^A-Za-z0-9._-]+/g, "-")}-LexNusa-Proposal.pdf`;
}

export function renderProposalPdf(input: ProposalPdfInput) {
  const pages = paginate(buildLines(input));
  const objects: string[] = ["", "", "", "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>", "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"];
  const pageObjectIds: number[] = [];

  for (let i = 0; i < pages.length; i++) {
    const stream = pageStream(pages[i], i + 1, pages.length);
    const contentId = objects.length;
    objects.push(`<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}\nendstream`);
    const pageId = objects.length;
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`);
    pageObjectIds.push(pageId);
  }

  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[2] = `<< /Type /Pages /Count ${pageObjectIds.length} /Kids [${pageObjectIds.map((id) => `${id} 0 R`).join(" ")}] >>`;

  let pdf = "%PDF-1.4\n%LexNusa\n";
  const offsets: number[] = [0];
  for (let i = 1; i < objects.length; i++) {
    offsets[i] = Buffer.byteLength(pdf, "latin1");
    pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }
  const xrefOffset = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i < objects.length; i++) pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return Buffer.from(pdf, "latin1");
}
