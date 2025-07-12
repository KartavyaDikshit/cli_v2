import Head from 'next/head';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  hreflangLinks?: { href: string; hreflang: string }[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: 'website' | 'article' | 'book' | 'profile'; // Added ogType
  articlePublishedTime?: string; // Added for article specific meta
  articleModifiedTime?: string; // Added for article specific meta
  articleAuthor?: string; // Added for article specific meta
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterCreator?: string;
  twitterSite?: string;
  jsonLd?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  hreflangLinks,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  ogType = 'website',
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  twitterCard = 'summary_large_image',
  twitterCreator,
  twitterSite,
  jsonLd,
}) => {
  const defaultOgImage = '/logo.png'; // Default Open Graph image

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      {hreflangLinks &&
        hreflangLinks.map((link) => (
          <link key={link.hreflang} rel="alternate" href={link.href} hreflang={link.hreflang} />
        ))}

      {/* Viewport for responsiveness */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta property="og:url" content={ogUrl || canonicalUrl} />
      <meta property="og:type" content={ogType} />

      {/* Article specific Open Graph tags */}
      {ogType === 'article' && (
        <>
          {articlePublishedTime && <meta property="article:published_time" content={articlePublishedTime} />}
          {articleModifiedTime && <meta property="article:modified_time" content={articleModifiedTime} />}
          {articleAuthor && <meta property="article:author" content={articleAuthor} />}
        </>
      )}

      {/* Twitter Cards */}
      <meta name="twitter:card" content={twitterCard} />
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage || defaultOgImage} />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
};

export default SEOHead;