
export const locales = ['en', 'fr', 'de', 'ja', 'ko'] as const;

export type Locale = typeof locales[number];

export const localeConfig: Record<Locale, { name: string; currency: string; dateFormat: string }> = {
  en: {
    name: 'English',
    currency: 'USD',
    dateFormat: 'MM/dd/yyyy',
  },
  fr: {
    name: 'Français',
    currency: 'EUR',
    dateFormat: 'dd/MM/yyyy',
  },
  de: {
    name: 'Deutsch',
    currency: 'EUR',
    dateFormat: 'dd.MM.yyyy',
  },
  ja: {
    name: '日本語',
    currency: 'JPY',
    dateFormat: 'yyyy/MM/dd',
  },
  ko: {
    name: '한국어',
    currency: 'KRW',
    dateFormat: 'yyyy. MM. dd',
  },
};
