
interface Organization {
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  sameAs?: string[];
}

interface Article {
  '@type': 'Article';
  headline: string;
  image: string[];
  datePublished: string;
  dateModified?: string;
  author: {
    '@type': 'Person';
    name: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  description: string;
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
}

interface Report {
  '@type': 'Report';
  headline: string;
  author: {
    '@type': 'Person' | 'Organization';
    name: string;
  };
  datePublished: string;
  description: string;
  url: string;
}

export const generateOrganizationSchema = (
  name: string,
  url: string,
  logo: string,
  sameAs?: string[]
): Organization => ({
  '@type': 'Organization',
  name,
  url,
  logo,
  ...(sameAs && { sameAs }),
});

export const generateArticleSchema = (
  headline: string,
  images: string[],
  datePublished: string,
  authorName: string,
  publisherName: string,
  publisherLogo: string,
  description: string,
  articleUrl: string,
  dateModified?: string
): Article => ({
  '@type': 'Article',
  headline,
  image: images,
  datePublished,
  ...(dateModified && { dateModified }),
  author: {
    '@type': 'Person',
    name: authorName,
  },
  publisher: {
    '@type': 'Organization',
    name: publisherName,
    logo: {
      '@type': 'ImageObject',
      url: publisherLogo,
    },
  },
  description,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': articleUrl,
  },
});

export const generateReportSchema = (
  headline: string,
  authorName: string,
  datePublished: string,
  description: string,
  url: string,
  authorType: 'Person' | 'Organization' = 'Person'
): Report => ({
  '@type': 'Report',
  headline,
  author: {
    '@type': authorType,
    name: authorName,
  },
  datePublished,
  description,
  url,
});
