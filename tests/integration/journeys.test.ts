import { test, expect } from '@playwright/test';
import { BASE_URL } from '@/lib/config/environment';

test.describe('User Journeys and Integration Tests', () => {
  const locales = ['en', 'fr', 'de', 'ja', 'ko'];

  test('should navigate from homepage to a report page', async ({ page }) => {
    for (const locale of locales) {
      await page.goto(`${BASE_URL}/${locale}`);

      // Click on the reports link
      await page.click('a[href*="/reports"]');
      await page.waitForURL(`${BASE_URL}/${locale}/reports`);

      // Click on the first report
      await page.locator('a[href*="/reports/"]').first().click();
      await page.waitForURL(`${BASE_URL}/${locale}/reports/**`);

      // Verify the report page has a title
      const title = await page.title();
      expect(title).not.toBe('');
    }
  });

  test('should have correct structured data on report page', async ({ page }) => {
    const locale = 'en';
    const reportSlug = 'global-market-trends';
    await page.goto(`${BASE_URL}/${locale}/reports/${reportSlug}`);

    const ldJson = await page.locator('script[type="application/ld+json"]').all();
    const schemas = await Promise.all(ldJson.map(async (locator) => JSON.parse(await locator.innerText())));

    const reportSchema = schemas.find((s) => s['@type'] === 'Report');
    expect(reportSchema).toBeDefined();
    expect(reportSchema.headline).toBeDefined();

    const breadcrumbSchema = schemas.find((s) => s['@type'] === 'BreadcrumbList');
    expect(breadcrumbSchema).toBeDefined();
    expect(breadcrumbSchema.itemListElement).toHaveLength(3);
  });
});
