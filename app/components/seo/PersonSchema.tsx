export default function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",

    "@id": "https://www.hossibarani.com/#person",

    name: "Dr. Hos Arie Rhamadhan Sibarani",

    alternateName: [
      "Dr. Hos Arie Sibarani",
      "Hos Arie Sibarani"
    ],

    url: "https://www.hossibarani.com",

    image: "https://www.hossibarani.com/images/profile/hos-arie.png",

    description:
      "Constitutional Law Scholar specializing in Constitutional Theory, Malay Constitutional Thought, Indigenous Constitutionalism, Raja Ali Haji Studies, and Governance.",

    jobTitle: "Senior Lecturer",

    hasOccupation: {
      "@type": "Occupation",
      name: "Constitutional Law Scholar"
    },

    nationality: {
      "@type": "Country",
      name: "Indonesia"
    },

    worksFor: {
      "@type": "CollegeOrUniversity",
      name: "Universitas Maritim Raja Ali Haji",
      url: "https://umrah.ac.id"
    },

    affiliation: {
      "@type": "Organization",
      name: "Raja Ali Haji Research Network",
      url: "https://www.hossibarani.com"
    },

    email: "mailto:editor@hossibarani.com",

    sameAs: [
      "https://scholar.google.com/citations?user=teno_PYAAAAJ&hl=en",
      "https://www.hossibarani.com"
      // Tambahkan nanti jika sudah ada:
      // "https://orcid.org/....",
      // "https://www.scopus.com/authid/detail.uri?authorId=....",
      // "https://www.linkedin.com/in/....",
      // "https://www.instagram.com/....",
      // "https://www.youtube.com/@...."
    ],

    knowsAbout: [
      "Constitutional Law",
      "Constitutional Theory",
      "Comparative Constitutional Law",
      "Malay Constitutional Thought",
      "Malay Ethical Constitutionalism",
      "Raja Ali Haji",
      "Indigenous Constitutionalism",
      "Governance",
      "Legal History",
      "Private Law"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}