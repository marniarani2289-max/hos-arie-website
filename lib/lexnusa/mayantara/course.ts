export const coursePath = "/lexnusa/mayantara";
export const roomPath = coursePath + "/workspace";
export const courseTitle = "Hukum Kejahatan Mayantara";
export const assessmentPlan = [
  {
    "label": "Evidence-based participation",
    "weight": 10,
    "when": "Weeks 3, 7, 11 and 15: four planned observations"
  },
  {
    "label": "Individual quizzes",
    "weight": 10,
    "when": "Weeks 3 and 10 · 5% each"
  },
  {
    "label": "T1 · Issue and offence-elements map",
    "weight": 15,
    "when": "Week 4"
  },
  {
    "label": "UTS · Criminal-responsibility memorandum",
    "weight": 25,
    "when": "Week 8"
  },
  {
    "label": "T2 · Evidence register and response plan",
    "weight": 15,
    "when": "Week 12"
  },
  {
    "label": "UAS · Opinion and oral defence",
    "weight": 25,
    "when": "Week 16 · Written 80%, oral 20%"
  }
] as const;
export const assignments = [
  {
    "case": "Fictional case HKM-01: SelatTiket. A staff account is used outside working hours; ferry schedules and the payment account number are changed. Screenshots, change records and a staff statement do not fully agree. The person who used the account has not been established.",
    "deliverable": "Write 500–800 words with an actor map, chronology and an elements–facts–evidence–gaps matrix. Distinguish suspected unauthorized access, fraud and a credible non-criminal explanation. Cite at least three relevant primary references/provisions. Use the incident date set by your lecturer.",
    "id": "issue-map",
    "questions": [
      "What was the scope of permission and what conduct is actually evidenced?",
      "Which elements and fault requirements need proof for each suspected offence?",
      "What material would distinguish the competing explanations?"
    ],
    "suggested": "Week 4 · Proposed weight 15%",
    "title": "T1 · Issue and offence-elements map"
  },
  {
    "case": "Fictional case HKM-02: KampusLink. Student data from an app circulates and is used for false payment messages. The vendor, staff and outsiders blame each other. You have only a short contract, messages and limited access records.",
    "deliverable": "Write 800–1,200 words: legal questions, rules applicable on the incident date, an actors/elements matrix, two competing arguments and a provisional conclusion. Cite at least four relevant primary references/provisions. Distinguish data-processing duties from the elements of a criminal offence.",
    "id": "privacy-memo",
    "questions": [
      "What conduct and fault can be attributed to each actor on this record?",
      "Which administrative, civil and criminal questions need separate analysis?",
      "What additional evidence could change your provisional conclusion?"
    ],
    "suggested": "Week 8 · Proposed weight 25%",
    "title": "UTS · Criminal-responsibility memorandum"
  },
  {
    "case": "Fictional case HKM-03: KanalPesisir. An anonymous account threatens a business operator and publishes a private phone number. Available items are a cropped screenshot, a chat copy and a witness note written two days later. Account ownership and authorship are not established.",
    "deliverable": "Write 700–1,000 words plus a plain-text evidence register: ID, description, source, time, handler, collection method, integrity, relevance and limitations. Recommend procedural steps and victim protection without automatically identifying the account owner as the offender.",
    "id": "evidence-file",
    "questions": [
      "What can each item establish, and what is missing from its context?",
      "Was the material lawfully collected and how was it preserved?",
      "Which response protects the victim while respecting procedural rights?"
    ],
    "suggested": "Week 12 · Proposed weight 15%",
    "title": "T2 · Evidence register and response plan"
  },
  {
    "case": "Fictional case HKM-04: MaritimHub. A logistics-services portal has changed payment details, customer data copies circulate, and a synthetic recording is used to request a transfer. Management wants to blame the contractor before the examination is complete.",
    "deliverable": "Write 1,200–1,800 words covering facts versus allegations, jurisdiction, elements and fault, attribution, evidence, parties' rights and staged recommendations. Cite at least five relevant primary references/provisions. Include a revision log and tool disclosure; prepare an approximately five-minute oral defence. Proposed UAS score: written opinion 80%, oral defence 20%.",
    "id": "final-opinion",
    "questions": [
      "Which allegations need separate factual and legal tests?",
      "What alternative explanation must be addressed before attributing responsibility?",
      "How did source checking and feedback change your conclusion?"
    ],
    "suggested": "Week 16 · Proposed weight 25%",
    "title": "UAS · Integrated criminal-law opinion"
  }
] as const;
export const outcomes = [
  "CPMK-1 · Explain cybercrime categories, legality, temporal application and jurisdiction.",
  "CPMK-2 · Test offence elements, fault, participation and responsibility against relevant facts and law.",
  "CPMK-3 · Evaluate electronic evidence, lawful collection and rights in criminal proceedings.",
  "CPMK-4 · Develop arguments and responses that consider alternatives and the rights of victims and alleged offenders.",
  "CPMK-5 · Defend a written and oral opinion with verified sources, revision history and tool disclosure."
] as const;
export const rubric = [
  {
    "guide": "Identify priority issues and distinguish established facts, allegations and missing information.",
    "key": "issue_score",
    "label": "Issue identification and factual discipline",
    "max": 20
  },
  {
    "guide": "Use traceable primary sources, relevant provisions and the version applicable to the incident date.",
    "key": "source_score",
    "label": "Primary sources and citation integrity",
    "max": 25
  },
  {
    "guide": "Test each element, fault and attribution against evidence; address a credible alternative.",
    "key": "reasoning_score",
    "label": "Application of offence elements and counterarguments",
    "max": 25
  },
  {
    "guide": "Propose proportionate, reasoned steps that address procedure, evidence and victim protection.",
    "key": "remedy_score",
    "label": "Recommendations and the rights of the parties",
    "max": 15
  },
  {
    "guide": "Present a clear structure, disclose limitations and tools, and document reasoned revisions.",
    "key": "integrity_score",
    "label": "Transparency, reflection and presentation",
    "max": 15
  }
] as const;
export const sources = [
  [
    "R1 · Higher-education quality assurance · Permendiktisaintek 39/2025",
    "https://peraturan.bpk.go.id/Details/333967/permendikti-saintek-no-39-tahun-2025"
  ],
  [
    "R2 · Criminal Code · UU 1/2023",
    "https://peraturan.bpk.go.id/Details/234935/uu-no-1-tahun-2023"
  ],
  [
    "R3 · Criminal-law adjustments · UU 1/2026",
    "https://peraturan.bpk.go.id/Details/337869/uu-no-1-tahun-2026"
  ],
  [
    "R4 · Electronic Information and Transactions · UU 11/2008",
    "https://peraturan.bpk.go.id/Details/37589/uu-no-11-tahun-2008"
  ],
  [
    "R4 · First amendment · UU 19/2016",
    "https://peraturan.bpk.go.id/Details/37582/uu-no-19-tahun-2016"
  ],
  [
    "R4 · Second amendment · UU 1/2024",
    "https://peraturan.bpk.go.id/Details/274494/uu-no-1-tahun-2024"
  ],
  [
    "R5 · Personal Data Protection · UU 27/2022",
    "https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022"
  ],
  [
    "R6 · Criminal Procedure Code · UU 20/2025",
    "https://peraturan.bpk.go.id/Details/337302/uu-no-20-tahun-2025"
  ],
  [
    "R7 · Sexual Violence Crimes · UU 12/2022",
    "https://peraturan.bpk.go.id/Details/207944/uu-no-12-tahun-2022"
  ]
] as const;
export const units = [
  {
    "activity": "Classify three fictional scenarios; discuss the learning agreement. Structured study: create an actor map. Independent study: read R2–R4.",
    "assessment": "Diagnostic concept map: at least three reasoned classifications.",
    "cpmk": "CPMK-1",
    "meetings": "1",
    "n": 1,
    "note": "Start with events, actors and uncertainty. A failed digital service does not by itself establish an offence. In an archipelagic setting, separate the locations of users, operators and infrastructure. Record what the scenario establishes before choosing a criminal-law label.",
    "outcome": "Distinguish offences against systems, technology-enabled offences, and non-criminal disputes.",
    "reading": [
      1,
      2,
      3,
      4,
      5
    ],
    "title": "Orientation and mapping cybercrime"
  },
  {
    "activity": "Compare fictional timelines across a legal change. Structured study: build a rule-version table. Independent study: read R2–R4.",
    "assessment": "A chronology and authority table that explains unresolved temporal questions.",
    "cpmk": "CPMK-1",
    "meetings": "2",
    "n": 2,
    "note": "Read the Criminal Code alongside special legislation and the 2026 adjustments. Do not assume every historical ITE provision remains applicable. Set out the event date, the rule version and any transitional question before drawing a conclusion about jurisdiction or liability.",
    "outcome": "Identify the incident date, territorial questions and applicable versions of legislation.",
    "reading": [
      1,
      2,
      3,
      4,
      5
    ],
    "title": "Legality, time and jurisdiction"
  },
  {
    "activity": "Complete an elements matrix and individual quiz 1. Structured study: compare possible actors. Independent study: verify R2–R4.",
    "assessment": "Quiz 1: 5% of the proposed final grade. Match each element to evidence or a gap.",
    "cpmk": "CPMK-1, 2",
    "meetings": "3",
    "n": 3,
    "note": "Test the elements required by the relevant offence. Distinguish intention or negligence where relevant, participation and corporate responsibility. An account name is not proof of the individual who used it. Mark absent evidence instead of filling gaps with assumptions.",
    "outcome": "Separate conduct, consequences, fault and the identity of the alleged actor.",
    "reading": [
      1,
      2,
      3,
      4,
      5
    ],
    "title": "Offence elements and criminal responsibility"
  },
  {
    "activity": "Discuss SelatTiket (T1). Structured study: complete the issue and elements map. Independent study: check relevant provisions.",
    "assessment": "Submit T1: 15% of the proposed final grade; 500–800 words.",
    "cpmk": "CPMK-2",
    "meetings": "4",
    "n": 4,
    "note": "Reconstruct the scope of permission and the alleged conduct. Breaching an internal policy, accessing data and interfering with a system raise different questions. Identify what the available records establish and what additional material would be needed; no technical intrusion is part of this course.",
    "outcome": "Assess allegations of unauthorized access, interception or interference separately.",
    "reading": [
      1,
      2,
      3,
      4,
      5
    ],
    "title": "Unauthorized access and system interference"
  },
  {
    "activity": "Debate fictional inter-island ticket sales. Structured study: write two competing case theories. Independent study: R2–R4.",
    "assessment": "Explain the evidence needed for each theory.",
    "cpmk": "CPMK-2",
    "meetings": "5",
    "n": 5,
    "note": "Treat phishing and false ticketing as alleged methods, not substitutes for legal elements. Reconstruct representations, transfers, losses and attribution. Test a credible non-criminal explanation as well as the allegation; a customer loss alone does not identify an offender.",
    "outcome": "Distinguish service failure and breach of contract from suspected fraud.",
    "reading": [
      1,
      2,
      3,
      4,
      5
    ],
    "title": "Digital fraud and falsification"
  },
  {
    "activity": "Discuss KampusLink. Structured study: map actor roles and alleged acts. Independent study: R5 and R3.",
    "assessment": "A role matrix separating established conduct, possible duties and unproved allegations.",
    "cpmk": "CPMK-2, 4",
    "meetings": "6",
    "n": 6,
    "note": "Identify who obtained, disclosed or used data and for what purpose. Distinguish controller, processor and alleged offender. A data exposure does not automatically prove all elements of an offence. Read the PDP law alongside relevant criminal-law adjustments.",
    "outcome": "Separate administrative, civil and criminal questions involving personal data.",
    "reading": [
      2,
      6
    ],
    "title": "Personal data and criminal responsibility"
  },
  {
    "activity": "Discuss a fictional content case. Structured study: prepare the UTS outline. Independent study: R2–R4 and R7.",
    "assessment": "Distinguish platform policy, ethics and criminal law in a reasoned argument.",
    "cpmk": "CPMK-2, 4",
    "meetings": "7",
    "n": 7,
    "note": "Separate threats, extortion, reputation issues and electronic sexual violence. Platform rules are not criminal statutes. Check the incident date, full context and relevant interpretation before assigning a legal classification. Use non-graphic fictional materials and protect the dignity of affected people.",
    "outcome": "Assess alleged content offences in context while respecting rights.",
    "reading": [
      1,
      2,
      3,
      4,
      5,
      8
    ],
    "title": "Digital content, expression and victims"
  },
  {
    "activity": "Individual case-file assessment. Structured study: complete the memorandum under lecturer instructions. Independent study: prepare and verify sources.",
    "assessment": "Submit UTS: 25% of the proposed final grade; 800–1,200 words.",
    "cpmk": "CPMK-2, 4",
    "meetings": "8",
    "n": 8,
    "note": "Use the KampusLink case to integrate weeks 1–7. Link each proposition to a relevant primary source and the incident date. Explain the strongest competing account and the evidence that could change your conclusion. Present uncertainty explicitly.",
    "outcome": "Write a provisional legal opinion on elements and responsibility from limited records.",
    "reading": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "title": "UTS · Criminal-responsibility memorandum"
  },
  {
    "activity": "Review the KanalPesisir evidence package. Structured study: create an evidence register. Independent study: R4 and R6.",
    "assessment": "A register distinguishing content, provenance, custody and uncertainty.",
    "cpmk": "CPMK-3",
    "meetings": "9",
    "n": 9,
    "note": "Separate the contents of a screenshot, log or chat from the way it was obtained and preserved. Record source, time, handler, collection method and limitations. A hash can help track integrity but does not establish truth or lawful collection. Use synthetic evidence only.",
    "outcome": "Evaluate provenance, integrity, relevance and the limits of electronic evidence.",
    "reading": [
      3,
      4,
      5,
      7
    ],
    "title": "Electronic evidence and chain of custody"
  },
  {
    "activity": "Review a fictional procedure and complete individual quiz 2. Structured study: audit evidence collection. Independent study: R6.",
    "assessment": "Quiz 2: 5% of the proposed final grade; identify a procedural question and its legal basis.",
    "cpmk": "CPMK-3",
    "meetings": "10",
    "n": 10,
    "note": "Study investigative steps, coercive measures, evidentiary assessment, assistance and procedural safeguards under the applicable Criminal Procedure Code. Distinguish a useful investigative lead from admissible or sufficient proof. Do not invent investigative powers or disregard transitional provisions.",
    "outcome": "Identify authority and rights questions in collecting and using evidence.",
    "reading": [
      3,
      4,
      5,
      7
    ],
    "title": "Criminal procedure and the rights of the parties"
  },
  {
    "activity": "Discuss a fictional maritime service. Structured study: map jurisdiction and evidence needs. Independent study: R2–R6.",
    "assessment": "A recommendation that acknowledges unproved identity and limits of authority.",
    "cpmk": "CPMK-3, 4",
    "meetings": "11",
    "n": 11,
    "note": "Account ownership, device possession and authorship are different factual propositions. Examine individual conduct, participation and organizational responsibility separately. Data abroad raises jurisdiction and official cooperation questions; do not assume access rights extend across borders.",
    "outcome": "Test links between accounts, devices, individuals and organizations.",
    "reading": [
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "title": "Attribution, platforms and cross-border cases"
  },
  {
    "activity": "KanalPesisir evidence clinic. Structured study: finalize T2. Independent study: R6–R7.",
    "assessment": "Submit T2: 15% of the proposed final grade; 700–1,000 words plus a text evidence register.",
    "cpmk": "CPMK-3, 4",
    "meetings": "12",
    "n": 12,
    "note": "Prioritize ongoing harm and evidence preservation without prejudging liability. Consider reporting, assistance and recovery needs. Explain who should act and the legal basis for each recommendation. Keep sensitive materials out of classroom portfolios.",
    "outcome": "Plan a response protecting evidence, privacy, safety and procedural rights.",
    "reading": [
      6,
      7,
      8
    ],
    "title": "Victim protection and case response"
  },
  {
    "activity": "Audit this fictional claim: 'The account owner must be the offender; every data leak is a crime; a screenshot is conclusive proof.' Structured study: write qualified corrections. Independent study: verify primary sources.",
    "assessment": "A verification log identifying unsupported claims. No AI access or purchase required.",
    "cpmk": "CPMK-4, 5",
    "meetings": "13",
    "n": 13,
    "note": "Synthetic content raises questions about authenticity, attribution and user responsibility. Verify that every citation exists and supports the proposition in the relevant jurisdiction and time. You can audit a deliberately flawed text without using an AI service.",
    "outcome": "Audit legal claims and content authenticity without treating AI as an authority.",
    "reading": [
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "title": "AI, deepfakes and source integrity"
  },
  {
    "activity": "Peer review using the published rubric. Structured study: draft the UAS opinion. Independent study: research relevant primary sources.",
    "assessment": "A draft opinion and structured peer feedback.",
    "cpmk": "CPMK-4, 5",
    "meetings": "14",
    "n": 14,
    "note": "For MaritimHub, separate the changed payment details, exposed data and synthetic recording. Use an actor map and timeline to organize the analysis. Present alternative explanations and proportionate responses. A polished accusation is not a substitute for proof.",
    "outcome": "Integrate facts, elements, evidence, procedure and recommendations.",
    "reading": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ],
    "title": "Final legal-opinion clinic"
  },
  {
    "activity": "Practise an oral defence. Structured study: revise the UAS draft. Independent study: prepare answers.",
    "assessment": "A revision log connecting criticism, amendments and reasons.",
    "cpmk": "CPMK-5",
    "meetings": "15",
    "n": 15,
    "note": "Record the feedback received, the change made and the reason. Distinguish correction of a citation from a change in the legal conclusion. Prepare to acknowledge evidence limits and answer a strong objection. Disclose external tools honestly.",
    "outcome": "Explain changes in position and defend an argument ethically.",
    "reading": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ],
    "title": "Revision and oral-defence practice"
  },
  {
    "activity": "Submit the individual opinion and undertake an approximately five-minute oral defence. Structured study: 100 minutes. Independent study: 100 minutes.",
    "assessment": "UAS: 25% of the proposed final grade; 1,200–1,800 words. UAS score: written opinion 80%, oral defence 20%.",
    "cpmk": "CPMK-3, 4, 5",
    "meetings": "16",
    "n": 16,
    "note": "Integrate the course in a MaritimHub opinion. Prioritize conclusions that can be supported now and identify those dependent on more evidence. Explain procedural protections for all parties. The lecturer schedules individual oral defences within the approved teaching plan.",
    "outcome": "Defend independent analysis and evidence-based recommendations.",
    "reading": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ],
    "title": "UAS · Final opinion and oral defence"
  }
] as const;
export function getAssignment(id: string) { return assignments.find(a => a.id === id); }
