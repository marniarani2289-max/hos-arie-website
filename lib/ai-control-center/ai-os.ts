export type AiOsRiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type AgentMode = "READ_ONLY" | "RECOMMEND_ONLY" | "APPROVAL_REQUIRED" | "DISABLED";
export type DecisionStatus = "OPEN" | "APPROVED" | "REJECTED" | "DEFERRED" | "CLOSED";
export type OutcomeDirection = "INCREASE" | "DECREASE";

export type AiOsAgent = {
  id: string;
  name: string;
  domain: string;
  mode: AgentMode;
  mission: string;
  allowedActions: string[];
  blockedActions: string[];
  defaultRisk: AiOsRiskLevel;
  owner: string;
};

export type DecisionItem = {
  id: string;
  title: string;
  sourceAgentId: string;
  bottleneck: string;
  evidence: string[];
  recommendation: string;
  requestedDecision: string;
  risk: AiOsRiskLevel;
  status: DecisionStatus;
  estimatedImpact?: string;
  createdAt: string;
};

export type AuditEvent = {
  id: string;
  at: string;
  actor: "SYSTEM" | "AGENT" | "HUMAN";
  actorId: string;
  action: string;
  targetId: string;
  risk: AiOsRiskLevel;
  note: string;
};

export type KpiDefinition = {
  id: string;
  name: string;
  system: string;
  unit: string;
  direction: OutcomeDirection;
  baseline: number | null;
  target: number | null;
  cadence: "DAILY" | "WEEKLY" | "MONTHLY" | "PER_RELEASE";
  rationale: string;
};

export const riskPolicy: Record<AiOsRiskLevel, {
  label: string;
  rule: string;
  humanApproval: boolean;
}> = {
  LOW: {
    label: "LOW",
    rule: "Read-only observation, diagnostics, scoring, and draft recommendations.",
    humanApproval: false,
  },
  MEDIUM: {
    label: "MEDIUM",
    rule: "Recommendation may affect prioritisation or workflow; human review required before any write action.",
    humanApproval: true,
  },
  HIGH: {
    label: "HIGH",
    rule: "Changes may affect users, data, access, production behaviour, or external communication.",
    humanApproval: true,
  },
  CRITICAL: {
    label: "CRITICAL",
    rule: "Security, identity, permissions, destructive data action, production secrets, or irreversible release decision.",
    humanApproval: true,
  },
};

export const aiOsAgents: AiOsAgent[] = [
  {
    id: "web-dev",
    name: "Web & Dev Agent",
    domain: "GitHub · Vercel · Technical SEO",
    mode: "READ_ONLY",
    mission: "Detect technical bottlenecks, deployment risks, regressions, and SEO issues; convert findings into decision-ready recommendations.",
    allowedActions: [
      "Read repository metadata and source files",
      "Inspect deployments, runtime errors, and build status",
      "Run technical SEO and configuration audits",
      "Assign risk and impact scores",
      "Prepare Decision Cards and remediation drafts",
    ],
    blockedActions: [
      "Commit or modify repository files autonomously",
      "Open or merge pull requests autonomously",
      "Deploy or promote production autonomously",
      "Change environment variables, secrets, auth, or RLS",
      "Delete data or publish external communications",
    ],
    defaultRisk: "LOW",
    owner: "Control Center Owner",
  },
  {
    id: "lexnusa",
    name: "LexNusa Agent",
    domain: "Legal workflow",
    mode: "DISABLED",
    mission: "Reserved for legal intake, triage, and evidence-grounded recommendation workflows after Phase 1 validation.",
    allowedActions: [],
    blockedActions: ["All actions until explicitly enabled"],
    defaultRisk: "HIGH",
    owner: "Control Center Owner",
  },
  {
    id: "jmcs",
    name: "JMCS Editorial Agent",
    domain: "Journal operations",
    mode: "DISABLED",
    mission: "Reserved for editorial screening and workflow prioritisation after Phase 1 validation.",
    allowedActions: [],
    blockedActions: ["All actions until explicitly enabled"],
    defaultRisk: "MEDIUM",
    owner: "Control Center Owner",
  },
  {
    id: "rah-institute",
    name: "Raja Ali Haji Institute Agent",
    domain: "Learning operations",
    mode: "DISABLED",
    mission: "Reserved for participant monitoring and intervention recommendations after Phase 1 validation.",
    allowedActions: [],
    blockedActions: ["All actions until explicitly enabled"],
    defaultRisk: "MEDIUM",
    owner: "Control Center Owner",
  },
  {
    id: "simaks",
    name: "SIMAKS Agent",
    domain: "Accreditation readiness",
    mode: "DISABLED",
    mission: "Reserved for accreditation evidence-gap analysis after Phase 1 validation.",
    allowedActions: [],
    blockedActions: ["All actions until explicitly enabled"],
    defaultRisk: "HIGH",
    owner: "Control Center Owner",
  },
];

export const decisionQueue: DecisionItem[] = [
  {
    id: "DEC-001",
    title: "Validate Web & Dev Agent read-only operating boundary",
    sourceAgentId: "web-dev",
    bottleneck: "Technical audits currently produce findings, but there is no formal decision queue connecting findings to owner approval and measurable outcomes.",
    evidence: [
      "Control Center exists and is access-restricted.",
      "Web & Dev Agent is designated as the Phase 1 pilot agent.",
      "Production write actions must remain outside agent authority.",
    ],
    recommendation: "Use Decision Cards as the mandatory handoff between read-only diagnostics and any future implementation work.",
    requestedDecision: "Approve this control model as the Phase 1 operating standard.",
    risk: "MEDIUM",
    status: "OPEN",
    estimatedImpact: "Creates an auditable separation between diagnosis, human decision, and execution.",
    createdAt: "2026-09-07T04:30:00+07:00",
  },
];

export const auditTrail: AuditEvent[] = [
  {
    id: "AUD-001",
    at: "2026-09-07T04:30:00+07:00",
    actor: "SYSTEM",
    actorId: "ai-os",
    action: "PHASE_1_INITIALISED",
    targetId: "control-center/ai-os",
    risk: "LOW",
    note: "AI-OS foundation initialised with read-only Web & Dev Agent and human approval boundary.",
  },
  {
    id: "AUD-002",
    at: "2026-09-07T04:31:00+07:00",
    actor: "SYSTEM",
    actorId: "ai-os",
    action: "WRITE_AUTOMATION_DISABLED",
    targetId: "web-dev",
    risk: "LOW",
    note: "Autonomous commit, merge, deployment, secrets, auth, and destructive actions are explicitly blocked by policy.",
  },
];

export const kpiRegistry: KpiDefinition[] = [
  {
    id: "KPI-WEB-001",
    name: "Owner technical-management time",
    system: "Hossibarani Digital Ecosystem",
    unit: "hours/week",
    direction: "DECREASE",
    baseline: null,
    target: null,
    cadence: "WEEKLY",
    rationale: "Measures whether the agent releases real management capacity instead of adding another dashboard.",
  },
  {
    id: "KPI-WEB-002",
    name: "Mean time to detect critical web issue",
    system: "Hossibarani.com",
    unit: "hours",
    direction: "DECREASE",
    baseline: null,
    target: null,
    cadence: "PER_RELEASE",
    rationale: "Measures diagnostic speed for deployment, runtime, security, and technical SEO problems.",
  },
  {
    id: "KPI-WEB-003",
    name: "Open technical bottlenecks",
    system: "Hossibarani.com",
    unit: "items",
    direction: "DECREASE",
    baseline: null,
    target: null,
    cadence: "WEEKLY",
    rationale: "Tracks whether recommendations actually reduce unresolved work rather than only generating reports.",
  },
  {
    id: "KPI-WEB-004",
    name: "Decision cycle time",
    system: "AI Control Center",
    unit: "hours",
    direction: "DECREASE",
    baseline: null,
    target: null,
    cadence: "WEEKLY",
    rationale: "Measures time from agent finding to owner decision for issues that require human control.",
  },
];

export const phaseOneRules = [
  "No autonomous write to GitHub, Vercel, Supabase, production content, auth, or secrets.",
  "Every recommendation that could lead to a write action must have a Decision Card.",
  "HIGH and CRITICAL items cannot be executed without explicit owner approval.",
  "Audit events are append-only by operating policy: corrections are new events, never silent edits to history.",
  "Agent success is measured by released capacity, reduced cycle time, fewer bottlenecks, and lower risk—not activity volume.",
];

export const aiOsVersion = "phase-1.1";
