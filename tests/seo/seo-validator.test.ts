
import { test, expect } from '@playwright/test';
import { locales } from '../../src/lib/i18n/config';

test.describe('SEO Validation', () => {
  for (const locale of locales) {
    test(`Homepage SEO for locale: ${locale}`,
      async ({ page }) => {
        await page.goto(`/${locale}`);

        // Assert Title
        await expect(page).toHaveTitle(/Your Site Title/); // Replace with your actual site title pattern

        // Assert Meta Description
        const metaDescription = page.locator('meta[name="description"]');
        await expect(metaDescription).toHaveAttribute(
          'content',
          /Your site description for ${locale}/ // Replace with your actual description pattern
        );

        // Assert Canonical URL
        const canonicalLink = page.locator('link[rel="canonical"]');
        await expect(canonicalLink).toHaveAttribute(
          'href',
          new RegExp(`http://localhost:3000/${locale}`)
        ); // Adjust base URL if needed

        // Assert Hreflang tags
        for (const hreflangLocale of locales) {
          const hreflangLink = page.locator(
            `link[rel="alternate"][hreflang="${hreflangLocale}"]`
          );
          await expect(hreflangLink).toHaveAttribute(
            'href',
            new RegExp(`http://localhost:3000/${hreflangLocale}`)
          ); // Adjust base URL if needed
        }
      }
    );
  }
});
