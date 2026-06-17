import { Helmet } from 'react-helmet-async';

export interface SeoData {
  title?: string;
  metaDescription?: string;
  focusKeyword?: string;
  urlSlug?: string;
  canonicalUrl?: string;
  robots?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schemaType?: string;
}

export function SEO({ seo }: { seo?: SeoData }) {
  if (!seo) return null;

  // Defaults
  const title = seo.title || "Oneroof Solar | Darwin's #1 Solar & Battery Installation Experts";
  const description = seo.metaDescription || 'Oneroof Solar provides premium solar panel and battery installations across Darwin, Alice Springs, and the Northern Territory.';
  const type = 'website';

  let schemaJson = null;
  if (seo.schemaType) {
    schemaJson = {
      "@context": "https://schema.org",
      "@type": seo.schemaType,
      "name": title,
      "description": description,
    };
  }

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {seo.focusKeyword && <meta name="keywords" content={seo.focusKeyword} />}
      {seo.robots && <meta name="robots" content={seo.robots} />}
      {seo.canonicalUrl && <link rel="canonical" href={seo.canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seo.openGraphTitle || title} />
      <meta property="og:description" content={seo.openGraphDescription || description} />
      {seo.openGraphImage && <meta property="og:image" content={seo.openGraphImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.twitterTitle || title} />
      <meta name="twitter:description" content={seo.twitterDescription || description} />
      {seo.twitterImage && <meta name="twitter:image" content={seo.twitterImage} />}

      {/* Dynamic Schema Types */}
      {schemaJson && (
        <script type="application/ld+json">
          {JSON.stringify(schemaJson)}
        </script>
      )}
    </Helmet>
  );
}
