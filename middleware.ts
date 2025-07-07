
import createMiddleware from 'next-intl/middleware';
import { locales } from './src/lib/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale: 'en',
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
