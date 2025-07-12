import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/config/environment';
const locales = ['en', 'fr', 'de', 'ja', 'ko'];

// Mock function to fetch reports - replace with your actual data fetching logic
async function getReports() {
  return [
    { slug: 'global-market-trends', updatedAt: new Date() },
    { slug: 'ai-in-healthcare', updatedAt: new Date() },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const reports = await getReports();

  const reportUrls: MetadataRoute.Sitemap = reports.flatMap((report) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/reports/${report.slug}`,
      lastModified: report.updatedAt,
      changeFrequency: 'daily',
      priority: 0.7,
    }))
  );

  const staticUrls: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/${locale}/reports`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]);

  return [...staticUrls, ...reportUrls];
}
