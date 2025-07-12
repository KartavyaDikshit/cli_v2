import Link from 'next/link';
import { getDictionary } from '@/lib/i18n/custom-i18n';

export default async function ReportsIndexPage({ params }) {
  const { locale } = params;
  const dictionary = await getDictionary(locale);

  // Placeholder for a list of reports
  const reports = [
    { slug: 'global-market-trends', title: dictionary.report1Title },
    { slug: 'ai-in-healthcare', title: dictionary.report2Title },
    { slug: 'future-of-e-commerce', title: dictionary.report3Title },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{dictionary.reportsIndexTitle}</h1>
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
