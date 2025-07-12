import { test, expect } from '@playwright/test';
import { BASE_URL } from '@/lib/config/environment';

test.describe('Multilingual URL Structure Validation', () => {
  const locales = ['en', 'fr', 'de', 'ja', 'ko'];

  test('All locale URLs should be accessible', async ({ page }) => {
    for (const locale of locales) {
      const url = `${BASE_URL}/${locale}`;
      const response = await page.goto(url);
      expect(response?.ok()).toBeTruthy();
      expect(page.url()).toBe(url); // Ensure no unexpected redirects
    }
  });

  test('Root URL should redirect to /en', async ({ page }) => {
    await page.goto(BASE_URL);
    expect(page.url()).toBe(`${BASE_URL}/en`);
  });

  test('URL consistency across all locales for reports', async ({ page }) => {
    const reportSlug = 'global-market-trends'; // Use a placeholder report slug
    for (const locale of locales) {
      const url = `${BASE_URL}/${locale}/reports/${reportSlug}`;
      const response = await page.goto(url);
      expect(response?.ok()).toBeTruthy();
      expect(page.url()).toBe(url);
    }
  });

  test('Proper 404 handling for invalid locales', async ({ page }) => {
    const invalidLocaleUrl = `${BASE_URL}/xx`; // Assuming 'xx' is an invalid locale
    const response = await page.goto(invalidLocaleUrl, { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(404);
    // You might also check for specific 404 page content if available
    expect(await page.textContent('body')).toContain('404'); // Basic check
  });

  test('sitemap.xml should be accessible and valid', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/sitemap.xml`);
    expect(response?.ok()).toBeTruthy();
    const sitemap = await response.text();
    expect(sitemap).toContain('<loc>');
    expect(sitemap).toContain(`${BASE_URL}/en/reports/global-market-trends`);
  });

  test('robots.txt should be accessible and valid', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/robots.txt`);
    expect(response?.ok()).toBeTruthy();
    const robots = await response.text();
    expect(robots).toContain('User-agent: *');
    expect(robots).toContain(`Sitemap: ${BASE_URL}/sitemap.xml`);
  });
});
