export default function PersonSchema() {
  const person = {
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

    affiliation: [
      {
      "@type": "Organization",
      name: "Raja Ali Haji Research Network",
      url: "https://www.hossibarani.com/raja-ali-haji"
      },
      {
        "@type": "Organization",
        name: "Raja Ali Haji Institute",
        url: "https://www.hossibarani.com/raja-ali-haji"
      }
    ],

    email: "mailto:editor@hossibarani.com",

    sameAs: [
      "https://scholar.google.com/citations?user=teno_PYAAAAJ&hl=en",
      "https://www.hossibarani.com"
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

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.hossibarani.com/#website",
    url: "https://www.hossibarani.com",
    name: "Dr. Hos Arie Sibarani",
    description: "Constitutional law scholarship, Malay Ethical Constitutionalism, Raja Ali Haji studies, publications, learning, and institutional collaboration.",
    inLanguage: ["en", "id"],
    publisher: { "@id": "https://www.hossibarani.com/#person" },
  };

  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://www.hossibarani.com/#profilepage",
    url: "https://www.hossibarani.com",
    name: "Dr. Hos Arie Sibarani — Constitutional Law Scholar",
    mainEntity: { "@id": "https://www.hossibarani.com/#person" },
    isPartOf: { "@id": "https://www.hossibarani.com/#website" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [person, website, profilePage],
        }),
      }}
    />
  );
}
