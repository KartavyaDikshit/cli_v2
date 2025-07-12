// src/app/[locale]/maintenance.tsx
import { useTranslations } from 'next-intl';

export default function MaintenancePage() {
  const t = useTranslations();

  return (
    <html>
      <body>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>{t('maintenance.title')}</h1>
          <p>{t('maintenance.description')}</p>
        </div>
      </body>
    </html>
  );
}
