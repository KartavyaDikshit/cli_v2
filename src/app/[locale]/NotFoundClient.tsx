import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

interface NotFoundClientProps {
  children: ReactNode;
}

export function NotFoundClient({ children }: NotFoundClientProps) {
  return (
    <>
      {children}
    </>
  );
}

export function NotFoundPageContent() {
  const t = useTranslations();

  return (
    <div className='container mx-auto px-4 py-8 text-center'>
      <h1 className='text-4xl font-bold text-red-600 mb-4'>
        {t('notFound.title')}
      </h1>
      <p className='text-lg text-gray-700 mb-8'>
        {t('notFound.description')}
      </p>
      <Link href="/" className='text-blue-600 hover:underline'>
        {t('notFound.goHome')}
      </Link>
    </div>
  );
}
