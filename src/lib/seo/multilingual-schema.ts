// src/lib/seo/multilingual-schema.ts

interface SchemaOptions {
  locale: string;
  url: string;
  title: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    name: string;
    url?: string;
  };
  // Add more fields as needed for different content types
}

interface HreflangEntry {
  hreflang: string;
  href: string;
}

/**
 * Generates basic structured data for a webpage.
 * @param options - Options for generating the schema.
 * @returns A JSON-LD schema object.
 */
export const generateWebPageSchema = (options: SchemaOptions) => {
  const { locale, url, title, description, image, datePublished, dateModified } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: url,
    inLanguage: locale,
    ...(image && { primaryImageOfPage: { '@type': 'ImageObject', url: image } }),
    ...(datePublished && { datePublished: datePublished }),
    ...(dateModified && { dateModified: dateModified }),
    // Placeholder for hreflang. This would typically be generated dynamically based on available translations.
    // Example: 'alternateName': getHreflangEntries(url),
  };
};

/**
 * Generates structured data for a Report.
 * @param options - Options for generating the schema.
 * @returns A JSON-LD schema object.
 */
export const generateReportSchema = (options: SchemaOptions & { reportId: string; publisher: string }) => {
  const { locale, url, title, description, image, datePublished, publisher, reportId } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'Report',
    name: title,
    description: description,
    url: url,
    inLanguage: locale,
    reportId: reportId,
    publisher: {
      '@type': 'Organization',
      name: publisher,
    },
    ...(image && { primaryImageOfPage: { '@type': 'ImageObject', url: image } }),
    ...(datePublished && { datePublished: datePublished }),
    // Add more report-specific fields
  };
};

/**
 * Generates structured data for an Article.
 * @param options - Options for generating the schema.
 * @returns A JSON-LD schema object.
 */
export const generateArticleSchema = (options: SchemaOptions & { authorName: string; articleBody: string }) => {
  const { locale, url, title, description, image, datePublished, dateModified, authorName, articleBody } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    articleBody: articleBody,
    url: url,
    inLanguage: locale,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    ...(image && { image: [image] }),
    ...(datePublished && { datePublished: datePublished }),
    ...(dateModified && { dateModified: dateModified }),
    // Add more article-specific fields
  };
};

/**
 * Generates structured data for an FAQPage.
 * @param options - Options for generating the schema.
 * @returns A JSON-LD schema object.
 */
export const generateFAQPageSchema = (options: SchemaOptions & { mainEntity: Record<string, unknown>[] }) => {
  const { locale, url, title, description, mainEntity } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: title,
    description: description,
    url: url,
    inLanguage: locale,
    mainEntity: mainEntity,
  };
};

/**
 * Helper to generate hreflang entries for a given URL.
 * This is a simplified example; in a real application, you'd fetch all available localized URLs.
 * @param baseUrl - The base URL of the page.
 * @param availableLocales - An array of locales for which translations exist.
 * @returns An array of HreflangEntry objects.
 */
export const getHreflangEntries = (baseUrl: string, availableLocales: string[]): HreflangEntry[] => {
  return availableLocales.map(locale => ({
    hreflang: locale,
    href: `${baseUrl.replace(/\/[a-z]{2}(\/|$)/, `/${locale}$1`)}` // Simple replacement, might need more robust logic
  }));
};

/**
 * Formats currency based on locale.
 * @param amount - The amount to format.
 * @param locale - The target locale (e.g., 'en-US', 'de-DE').
 * @param currency - The currency code (e.g., 'USD', 'EUR').
 * @returns Formatted currency string.
 */
export const formatCurrency = (amount: number, locale: string, currency: string): string => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(amount);
};

/**
 * Formats date based on locale.
 * @param date - The date to format.
 * @param locale - The target locale (e.g., 'en-US', 'de-DE').
 * @param options - Intl.DateTimeFormatOptions.
 * @returns Formatted date string.
 */
export const formatDate = (date: Date, locale: string, options?: Intl.DateTimeFormatOptions): string => {
  return new Intl.DateTimeFormat(locale, options).format(date);
};
