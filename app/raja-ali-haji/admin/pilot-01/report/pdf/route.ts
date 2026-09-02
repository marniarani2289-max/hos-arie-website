import { requireRahiAdmin } from "../../../admin";
import { loadPilotData } from "@/lib/rahi/pilot-data";
import { reportSummary } from "@/lib/rahi/report-summary";
import { renderExecutiveReportPdf } from "@/lib/rahi/executive-report-pdf";

export const runtime="nodejs";
export async function GET(){const {admin}=await requireRahiAdmin("/raja-ali-haji/admin/pilot-01/report/pdf");const summary=reportSummary(await loadPilotData(admin));const pdf=renderExecutiveReportPdf({...summary,generatedAt:new Date().toLocaleString("en-GB",{timeZone:"Asia/Jakarta",dateStyle:"long",timeStyle:"short"}),recommendations:["Provide a measured remedial period for participants who have not completed all modules.","Use baseline-endline change and participant evaluation to refine content and facilitation.","Issue certificates only after validation of eight completed modules and eight passing quizzes.","Use pilot evidence to design Cohort 2 and support institutional collaboration proposals."]});return new Response(new Uint8Array(pdf),{headers:{"content-type":"application/pdf","content-disposition":"attachment; filename=RAHI-Pilot-Cohort-1-Executive-Report.pdf","cache-control":"private, no-store"}});}
