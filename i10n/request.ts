import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale is valid
  const validLocales = ['en', 'fr', 'de', 'ja', 'ko'];
  if (!validLocales.includes(locale)) {
    locale = 'en'; // Fallback to English
  }

  try {
    return {
      locale,
      messages: (await import(`../messages/${locale}/common.json`)).default
    };
  } catch (error) {
    // Fallback to English if translation file doesn't exist
    return {
      locale: 'en',
      messages: (await import(`../messages/en/common.json`)).default
    };
  }
});
