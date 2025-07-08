import { MetadataRoute } from 'next';
import { locales } from '../lib/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.yourcompany.com'; // Placeholder: Replace with your actual base URL

  const staticPages = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/${locale}/reports`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]);

  // Placeholder for dynamic report pages
  const dynamicReportPages = [
    // Example: Replace with actual data fetching for reports
    {
      url: `${baseUrl}/en/reports/global-market-trends`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/reports/ai-in-healthcare`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  return [...staticPages, ...dynamicReportPages];
}
