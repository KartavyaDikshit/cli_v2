import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function ReportsIndexPage() {
  const t = useTranslations('reports');

  // Placeholder for a list of reports
  const reports = [
    { slug: 'global-market-trends', title: t('report1Title') },
    { slug: 'ai-in-healthcare', title: t('report2Title') },
    { slug: 'future-of-e-commerce', title: t('report3Title') },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('reportsIndexTitle')}</h1>
      <ul className="space-y-4">
        {reports.map((report) => (
          <li key={report.slug}>
            <Link href={`/reports/${report.slug}`} className="text-blue-600 hover:underline text-xl">
              {report.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
