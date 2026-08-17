type Props = {
  title: string;
  description?: string;
  image?: string;
  publishedAt?: string;
  slug: string;
};

export default function ArticleSchema({
  title,
  description,
  image,
  publishedAt,
  slug,
}: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",

    headline: title,

    description,

    image: image
      ? [image]
      : ["https://www.hossibarani.com/opengraph-image.png"],

    author: {
      "@type": "Person",
      name: "Dr. Hos Arie Rhamadhan Sibarani",
      url: "https://www.hossibarani.com",
    },

    publisher: {
      "@type": "Person",
      name: "Dr. Hos Arie Rhamadhan Sibarani",
    },

    datePublished: publishedAt,

    dateModified: publishedAt,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.hossibarani.com/opinions/${slug}`,
    },

    inLanguage: "en",

    isAccessibleForFree: true,
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