import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

const SEO = ({
  title = "GoLeadorTips - Premium Football Predictions & Betting Tips",
  description = "Join thousands of winners with our expert football predictions. Get data-driven betting tips with high success rates. Silver, Gold & Platinum packages available.",
  keywords = "football predictions, betting tips, soccer predictions, football betting, sports betting, accumulator tips, betting advice, football tips",
  ogImage = "https://jibajgtbholuaoxcmhch.supabase.co/storage/v1/object/public/assets/og-image.jpg",
  ogType = "website",
  canonicalUrl,
  structuredData,
}: SEOProps) => {
  const siteUrl = "https://goleadortips.com";
  const fullUrl = canonicalUrl || siteUrl;

  // Default structured data
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GoLeadorTips",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: description,
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@goleadortips.com",
      contactType: "Customer Service",
    },
    sameAs: [
      "https://twitter.com/goleadortips",
      "https://facebook.com/goleadortips",
    ],
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="GoLeadorTips" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="GoLeadorTips" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
