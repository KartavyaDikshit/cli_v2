import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'reports' });

  return {
    title: t('reportsIndexTitle'),
    description: t('reportsIndexDescription'), // You'll need to add this to your reports.json
  };
}

export default function ReportsLayout({ children }: Props) {
  return (
    <>
      {children}
    </>
  );
}
