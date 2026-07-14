export default function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dr. Hos Arie Rhamadhan Sibarani",
    url: "https://www.hossibarani.com",
    image: "https://www.hossibarani.com/hos-arie.jpg",
    jobTitle: "Senior Lecturer",
    worksFor: {
      "@type": "CollegeOrUniversity",
      name: "Universitas Maritim Raja Ali Haji",
    },
    affiliation: {
      "@type": "Organization",
      name: "Raja Ali Haji Research Network",
    },
    sameAs: [
      "https://scholar.google.com/citations?user=teno_PYAAAAJ&hl=en",
      "https://www.hossibarani.com"
    ],
    knowsAbout: [
      "Constitutional Law",
      "Comparative Constitutional Theory",
      "Malay Ethical Constitutionalism",
      "Raja Ali Haji",
      "Indigenous Constitutionalism",
      "Legal History"
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