import 'server-only';

const dictionaries = {
  en: () => import('../../../public/locales/en/homepage.json').then((module) => module.default),
  fr: () => import('../../../public/locales/fr/homepage.json').then((module) => module.default),
  de: () => import('../../../public/locales/de/homepage.json').then((module) => module.default),
  ja: () => import('../../../public/locales/ja/homepage.json').then((module) => module.default),
  ko: () => import('../../../public/locales/ko/homepage.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) =>
  dictionaries[locale as keyof typeof dictionaries]();