// src/app/[locale]/error.tsx
'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const t = useTranslations();

  return (
    <div className='container mx-auto px-4 py-8 text-center'>
      <h2 className='text-4xl font-bold text-red-600 mb-4'>
        {t('error.title')}
      </h2>
      <p className='text-lg text-gray-700 mb-8'>
        {t('error.description')}
      </p>
      <button
        className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transform transition-transform hover:scale-105'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        {t('error.tryAgain')}
      </button>
    </div>
  );
}
