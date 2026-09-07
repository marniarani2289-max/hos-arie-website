export const learningOutcomes = [
  { id: 'LO-1', title: 'Knowledge', description: 'Memahami konsep utama pemikiran Raja Ali Haji dan Malay Ethical Constitutionalism.' },
  { id: 'LO-2', title: 'Analysis', description: 'Menganalisis persoalan kontemporer menggunakan kerangka yang dipelajari.' },
  { id: 'LO-3', title: 'Application', description: 'Menerapkan konsep pada kasus, kebijakan, atau problem nyata.' },
  { id: 'LO-4', title: 'Communication', description: 'Menyajikan argumentasi secara terstruktur, jelas, dan bertanggung jawab.' },
  { id: 'LO-5', title: 'Production', description: 'Menghasilkan karya final yang layak menjadi portofolio terverifikasi.' },
] as const;

export const portfolioTracks = [
  'Constitutional Analysis',
  'Policy Brief',
  'Legal / Historical Analysis',
  'Public Knowledge',
  'AI & Digital Humanities',
] as const;

export const portfolioMilestones = [
  { week: 1, stage: 'Learn & Define', artifact: 'Project Proposal' },
  { week: 2, stage: 'Analyze', artifact: 'Analysis Canvas / Evidence Map' },
  { week: 3, stage: 'Produce', artifact: 'Portfolio Draft v1' },
  { week: 4, stage: 'Refine & Demonstrate', artifact: 'Verified Portfolio Artifact' },
] as const;

export const assessmentRubric = [
  { criterion: 'Pemahaman konsep Raja Ali Haji', weight: 20 },
  { criterion: 'Kedalaman analisis', weight: 20 },
  { criterion: 'Penggunaan evidence / sumber', weight: 15 },
  { criterion: 'Penerapan pada problem kontemporer', weight: 20 },
  { criterion: 'Argumentasi & komunikasi', weight: 15 },
  { criterion: 'Originalitas & refleksi', weight: 10 },
] as const;

export function achievementLevel(score: number) {
  if (score >= 85) return 'Distinguished';
  if (score >= 75) return 'Proficient';
  if (score >= 60) return 'Achieved';
  return 'Not Yet Achieved';
}

export const humanVerificationFlow = [
  'Participant submission',
  'AI preliminary assessment (advisory only)',
  'Facilitator review',
  'Human approval decision',
  'Verified credential / portfolio',
] as const;

export type PortfolioVisibility = 'private' | 'unlisted' | 'public';
