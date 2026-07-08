export const metadata: Metadata = {
  metadataBase: new URL("https://www.hossibarani.com"),

  title: {
    default: "Dr. Hos Arie Sibarani | Legal Scholar",
    template: "%s | Dr. Hos Arie Sibarani",
  },

  description:
    "Official academic website of Dr. Hos Arie Sibarani. Research on Constitutional Theory, Malay Ethical Constitutionalism, Raja Ali Haji, Private Law, Environmental Law, and Malay Studies.",

  keywords: [
    "Hos Arie Sibarani",
    "Malay Constitutionalism",
    "Raja Ali Haji",
    "Legal Scholar",
    "Environmental Law",
  ],

  authors: [{ name: "Dr. Hos Arie Sibarani" }],

  openGraph: {
    title: "Dr. Hos Arie Sibarani | Legal Scholar",
    description:
      "Official academic website of Dr. Hos Arie Sibarani.",

    url: "https://www.hossibarani.com",

    siteName: "Dr. Hos Arie Sibarani",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/hos-arie.jpeg",
        width: 1200,
        height: 630,
        alt: "Dr. Hos Arie Sibarani",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Dr. Hos Arie Sibarani",

    description:
      "Official academic website of Dr. Hos Arie Sibarani.",

    images: ["/hos-arie.jpeg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};