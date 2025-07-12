import { test, expect } from '@playwright/test';

test.describe('Structured Data Validation', () => {
  const baseUrl = 'http://localhost:3000';
  const locales = ['en', 'fr', 'de', 'ja', 'ko'];

  // Helper function to extract JSON-LD from a page
  async function getJsonLd(page) {
    return await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      return scripts.map(script => {
        try {
          return JSON.parse(script.textContent || '{}');
        } catch (e) {
          console.error('Error parsing JSON-LD', e);
          return null;
        }
      }).filter(Boolean);
    });
  }

  test('Homepage for each locale should have Organization and WebSite schema', async ({ page }) => {
    for (const locale of locales) {
      await page.goto(`${baseUrl}/${locale}`);
      const jsonLd = await getJsonLd(page);

      const organizationSchema = jsonLd.find(schema => schema['@type'] === 'Organization');
      expect(organizationSchema).toBeDefined();
      expect(organizationSchema.name).toBeDefined();
      expect(organizationSchema.url).toBeDefined();

      const websiteSchema = jsonLd.find(schema => schema['@type'] === 'WebSite');
      expect(websiteSchema).toBeDefined();
      expect(websiteSchema.url).toBeDefined();
      expect(websiteSchema.potentialAction).toBeDefined();
      expect(websiteSchema.potentialAction['@type']).toBe('SearchAction');
    }
  });

  test('Report pages should have Report schema', async ({ page }) => {
    // Assuming a placeholder report page exists
    const reportSlug = 'global-market-trends';
    for (const locale of locales) {
      await page.goto(`${baseUrl}/${locale}/reports/${reportSlug}`);
      const jsonLd = await getJsonLd(page);

      const reportSchema = jsonLd.find(schema => schema['@type'] === 'Report');
      expect(reportSchema).toBeDefined();
      expect(reportSchema.headline).toBeDefined();
      expect(reportSchema.author).toBeDefined();
      expect(reportSchema.datePublished).toBeDefined();
      expect(reportSchema.description).toBeDefined();
      expect(reportSchema.url).toBeDefined();
    }
  });

  test('BreadcrumbList schema should be present on report pages', async ({ page }) => {
    const reportSlug = 'global-market-trends';
    for (const locale of locales) {
      await page.goto(`${baseUrl}/${locale}/reports/${reportSlug}`);
      const jsonLd = await getJsonLd(page);

      const breadcrumbSchema = jsonLd.find(schema => schema['@type'] === 'BreadcrumbList');
      expect(breadcrumbSchema).toBeDefined();
      expect(breadcrumbSchema.itemListElement).toBeDefined();
      expect(breadcrumbSchema.itemListElement.length).toBeGreaterThan(0);
      expect(breadcrumbSchema.itemListElement[0].name).toBeDefined();
      expect(breadcrumbSchema.itemListElement[0].position).toBe(1);
    }
  });

  // Note: For full validation against Google's Structured Data Testing Tool, you would typically
  // use an API or manually copy-paste the JSON-LD. This test focuses on presence and basic structure.
});
