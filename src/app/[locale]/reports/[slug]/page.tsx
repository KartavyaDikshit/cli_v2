import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BASE_URL } from '@/lib/config/environment';
import { getDictionary } from '@/lib/i18n/custom-i18n';

// Mock function to fetch a single report by slug and locale
// In a real application, this would fetch data from a CMS or database
async function getReportBySlug(slug: string, locale: string) {
  // Simulate fetching data
  const reports = [
    { id: '1', slug: 'global-market-trends', title: 'Global Market Trends', description: 'A comprehensive analysis of global market trends.', content: 'Lorem ipsum dolor sit amet...', category: 'Market Research', tags: ['global', 'trends'], updatedAt: new Date(), locale: 'en' },
    { id: '2', slug: 'ai-in-healthcare', title: 'AI in Healthcare', description: 'Exploring the impact of AI on the healthcare industry.', content: 'Consectetur adipiscing elit...', category: 'Healthcare', tags: ['AI', 'healthcare'], updatedAt: new Date(), locale: 'en' },
    // Add more mock data for other locales if needed
    { id: '3', slug: 'tendances-du-marche-mondial', title: 'Tendances du Marché Mondial', description: 'Une analyse complète des tendances du marché mondial.', content: 'Lorem ipsum dolor sit amet...', category: 'Recherche de Marché', tags: ['mondial', 'tendances'], updatedAt: new Date(), locale: 'fr' },
  ];
  return reports.find(report => report.slug === slug && report.locale === locale);
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug, locale } = params;
  const report = await getReportBySlug(slug, locale);

  if (!report) {
    return {}; // Return empty metadata if report not found, notFound() will handle the 404
  }

  return {
    title: report.title,
    description: report.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/reports/${slug}`,
    },
  };
}

export default async function ReportDetailPage({ params }) {
  const { slug, locale } = params;
  const report = await getReportBySlug(slug, locale);

  if (!report) {
    notFound(); // Trigger Next.js 404 page
  }

  const dictionary = await getDictionary(locale);

  const reportSchema = {
    "@context": "https://schema.org",
    "@type": "Report",
    "headline": report.title,
    "description": report.description,
    "url": `${BASE_URL}/${locale}/reports/${report.slug}`,
    "datePublished": report.updatedAt.toISOString(),
    "author": {
      "@type": "Organization",
      "name": dictionary.siteTitle // Using dictionary for siteTitle
    },
    "publisher": {
      "@type": "Organization",
      "name": dictionary.siteTitle,
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/logo.png`
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": dictionary.backToHome,
        "item": `${BASE_URL}/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": dictionary.reportsIndexTitle,
        "item": `${BASE_URL}/${locale}/reports`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": report.title,
        "item": `${BASE_URL}/${locale}/reports/${report.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reportSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{report.title}</h1>
        <p>{report.content}</p>
      </div>
    </>
  );
}
