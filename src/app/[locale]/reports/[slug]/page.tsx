'use client';

import { useTranslations } from 'next-intl';

export default function ReportDetailPage({ params }: { params: { locale: string; slug: string } }) {
  const t = useTranslations('reports');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('reportDetailTitle', { slug: params.slug })}</h1>
      <p>{t('reportDetailContent', { slug: params.slug })}</p>
    </div>
  );
}