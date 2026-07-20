export type ResearchProgramme = {
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  status: "Active" | "Developing" | "Planned";
  description: string;
  contribution: string;
  href: string;
  topics: string[];
};

export const researchProgrammes: ResearchProgramme[] = [
  {
    number: "01",
    title: "Malay Ethical Constitutionalism",
    shortTitle: "Malay Ethical Constitutionalism",
    category: "Flagship Research Programme",
    status: "Active",
    description:
      "A long-term research programme reconstructing Raja Ali Haji as a constitutional thinker and recovering the constitutional tradition of the nineteenth-century Malay world.",
    contribution:
      "Develops an original framework of ethical authority, justice, consultation, accountability, public responsibility, and limitation of power.",
    href: "/research/malay-ethical-constitutionalism",
    topics: [
      "Raja Ali Haji",
      "Malay Constitutional Thought",
      "Ethical Governance",
    ],
  },
  {
    number: "02",
    title: "Raja Ali Haji and Malay Intellectual History",
    shortTitle: "Raja Ali Haji Studies",
    category: "Interdisciplinary Research Programme",
    status: "Developing",
    description:
      "An interdisciplinary examination of Raja Ali Haji’s contributions to law, government, ethics, language, education, history, and Malay intellectual civilisation.",
    contribution:
      "Repositions Raja Ali Haji as a major intellectual figure whose ideas contribute to legal, constitutional, and global intellectual history.",
    href: "/research/raja-ali-haji",
    topics: [
      "Malay Intellectual History",
      "Law and Governance",
      "Language and Civilisation",
    ],
  },
  {
    number: "03",
    title: "Indigenous and Comparative Constitutionalism",
    shortTitle: "Indigenous Constitutionalism",
    category: "Comparative Constitutional Research",
    status: "Developing",
    description:
      "A comparative programme examining constitutional traditions developed outside the dominant Western canon, particularly in Southeast Asia and the Islamic world.",
    contribution:
      "Expands global constitutional theory by placing indigenous and non-Western constitutional traditions within comparative legal scholarship.",
    href: "/research/indigenous-constitutionalism",
    topics: [
      "Comparative Constitutional Law",
      "Indigenous Constitutionalism",
      "Global Constitutional Theory",
    ],
  },
  {
    number: "04",
    title: "Vicarious Liability in Indonesian Private Law",
    shortTitle: "Vicarious Liability",
    category: "Private Law Research Programme",
    status: "Active",
    description:
      "A critical study of judicial patterns in attributing civil responsibility for acts committed by employees, agents, institutional actors, and organisational personnel.",
    contribution:
      "Develops a clearer normative account of attribution, corrective justice, organisational responsibility, and Article 1367 of the Indonesian Civil Code.",
    href: "/research/vicarious-liability",
    topics: [
      "Vicarious Liability",
      "Corrective Justice",
      "Indonesian Civil Law",
    ],
  },
];