import type { Metadata } from 'next';
import '../globals.css';
import Header from '../../components/UI/Header';
import Footer from '../../components/UI/Footer';
import { BASE_URL, SEO_CONFIG } from '@/lib/config/environment';
import { getMessages, getLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { organizationSchema } from '@/lib/seo/structured-data';


export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        'en': `${BASE_URL}/en`,
        'fr': `${BASE_URL}/fr`,
        'de': `${BASE_URL}/de`,
        'ja': `${BASE_URL}/ja`,
        'ko': `${BASE_URL}/ko`,
        'x-default': `${BASE_URL}/en`,
      },
    },
  };
}

export function generateStaticParams() {
  return ['en', 'fr', 'de', 'ja', 'ko'].map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}