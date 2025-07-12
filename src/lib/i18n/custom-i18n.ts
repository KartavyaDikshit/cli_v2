export const locales = ['en', 'fr', 'de', 'ja', 'ko'] as const;
export type Locale = typeof locales[number];

export async function getDictionary(locale: Locale) {
  try {
    const messages = await import(`../../../messages/${locale}/common.json`);
    return messages.default;
  } catch (error) {
    console.error(`Failed to load dictionary for locale ${locale}:`, error);
    // Fallback to English if translation file doesn't exist
    const fallback = await import(`../../../messages/en/common.json`);
    return fallback.default;
  }
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
