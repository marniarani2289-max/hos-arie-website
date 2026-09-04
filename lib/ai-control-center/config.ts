export type RiskLevel = "green" | "yellow" | "red";

export type EcosystemProject = {
  id: string;
  name: string;
  route?: string;
  category: "web" | "research" | "education" | "journal" | "legal" | "organization";
  status: "active" | "building" | "review";
};

export type AgentDefinition = {
  id: string;
  name: string;
  mission: string;
  defaultRisk: RiskLevel;
};

export const ecosystemProjects: EcosystemProject[] = [
  { id: "website", name: "Hossibarani.com", route: "/", category: "web", status: "active" },
  { id: "raja-ali-haji", name: "Raja Ali Haji Institute", route: "/raja-ali-haji", category: "education", status: "active" },
  { id: "jmcs", name: "Journal / JMCS", route: "/journal", category: "journal", status: "active" },
  { id: "simaks", name: "SIMAKS", route: "/simak", category: "education", status: "building" },
  { id: "lexnusa", name: "LexNusa", route: "/lexnusa", category: "legal", status: "active" },
  { id: "constitutional-justice", name: "Constitutional Justice Initiative", route: "/constitutional-justice", category: "legal", status: "active" },
  { id: "digital-archive", name: "Digital Archive", route: "/digital-archive", category: "research", status: "active" },
  { id: "hw-kepri", name: "Hizbul Wathan Kepulauan Riau", route: "/hw-kepri", category: "organization", status: "active" },
];

export const agents: AgentDefinition[] = [
  { id: "chief", name: "Chief Orchestrator", mission: "Prioritise work, delegate tasks, and produce executive briefs.", defaultRisk: "yellow" },
  { id: "web", name: "Web & Dev Agent", mission: "Maintain application code, build quality, deployment readiness, and technical SEO.", defaultRisk: "yellow" },
  { id: "content", name: "Content & SEO Agent", mission: "Improve discoverability, metadata, bilingual content, and editorial consistency.", defaultRisk: "green" },
  { id: "research", name: "Research Agent", mission: "Support legal, constitutional, and Raja Ali Haji research workflows.", defaultRisk: "green" },
  { id: "institution", name: "Institution Agent", mission: "Support programme operations for Institute, journal, and organisational initiatives.", defaultRisk: "green" },
  { id: "data", name: "Data & Analytics Agent", mission: "Analyse Supabase-backed application data and produce operational dashboards.", defaultRisk: "yellow" },
  { id: "security", name: "Security & QA Agent", mission: "Review auth, RLS, regression risk, secrets exposure, and release quality.", defaultRisk: "red" },
];

export const permissionPolicy = {
  green: {
    label: "GREEN — autonomous",
    examples: ["read-only audit", "SEO analysis", "broken-link checks", "draft content", "test reports"],
    requiresApproval: false,
  },
  yellow: {
    label: "YELLOW — approval before write",
    examples: ["create or update site content", "open PR", "non-critical schema proposal", "production content update"],
    requiresApproval: true,
  },
  red: {
    label: "RED — explicit owner approval required",
    examples: ["merge main", "production deploy with risk", "RLS/auth changes", "delete data", "secrets/environment changes", "external publication/send"],
    requiresApproval: true,
  },
} satisfies Record<RiskLevel, { label: string; examples: string[]; requiresApproval: boolean }>;

export const controlCenterVersion = "phase-1.0";
