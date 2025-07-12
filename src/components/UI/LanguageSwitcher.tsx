// src/components/UI/LanguageSwitcher.tsx
import Link from 'next/link';
import { useRouter } from 'next/router'; // Note: Next.js 13+ uses `next/navigation` for app router, `next/router` for pages router. Assuming pages router for now.

interface Language {
  locale: string;
  name: string; // Native language name
  flag: string; // Placeholder for flag emoji or image path
}

const languages: Language[] = [
  { locale: 'en', name: 'English', flag: '🇺🇸' },
  { locale: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { locale: 'fr', name: 'Français', flag: '🇫🇷' },
  { locale: 'ja', name: '日本語', flag: '🇯🇵' },
  { locale: 'ko', name: '한국어', flag: '🇰🇷' },
];

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const handleLanguageChange = (newLocale: string) => {
    // Preserve the current path when switching languages
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <nav aria-label="Language selection">
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '10px' }}>
        {languages.map((lang) => (
          <li key={lang.locale}>
            <Link href={asPath} locale={lang.locale} passHref>
              <a
                onClick={() => handleLanguageChange(lang.locale)}
                aria-current={router.locale === lang.locale ? 'page' : undefined}
                // Basic keyboard navigation: can be enhanced with onKeyDown for arrow keys
              >
                <span role="img" aria-label={`${lang.name} flag`}>{lang.flag}</span> {lang.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LanguageSwitcher;
