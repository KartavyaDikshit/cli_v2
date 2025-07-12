import { test, expect } from '@playwright/test';

test.describe('Sitemap Validation', () => {
  const baseUrl = 'http://localhost:3000';
  const sitemapUrl = `${baseUrl}/sitemap.xml`;
  const locales = ['en', 'fr', 'de', 'ja', 'ko'];

  test('sitemap.xml should be accessible', async ({ request }) => {
    const response = await request.get(sitemapUrl);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('application/xml');
  });

  test('sitemap.xml should have valid XML structure and schema', async ({ page }) => {
    await page.goto(sitemapUrl);
    // Basic check for XML structure by looking for <urlset> and <url> tags
    const urlsetCount = await page.locator('urlset').count();
    const urlCount = await page.locator('url').count();
    expect(urlsetCount).toBe(1);
    expect(urlCount).toBeGreaterThan(0);

    // You might need a more robust XML schema validation if a specific XSD is available
    // For now, we rely on Playwright's ability to parse the XML as a DOM
  });

  test('sitemap.xml should include expected static URLs for each locale', async ({ request }) => {
    const response = await request.get(sitemapUrl);
    const sitemapText = await response.text();

    locales.forEach(locale => {
      expect(sitemapText).toContain(`<loc>${baseUrl}/${locale}</loc>`);
      expect(sitemapText).toContain(`<loc>${baseUrl}/${locale}/reports</loc>`);
    });
  });

  test('sitemap.xml should include expected dynamic report URLs', async ({ request }) => {
    const response = await request.get(sitemapUrl);
    const sitemapText = await response.text();

    locales.forEach(locale => {
      // These are placeholders from the sitemap generation, adjust if your dynamic data changes
      expect(sitemapText).toContain(`<loc>${baseUrl}/${locale}/reports/global-market-trends</loc>`);
      expect(sitemapText).toContain(`<loc>${baseUrl}/${locale}/reports/ai-in-healthcare</loc>`);
    });
  });

  test('sitemap.xml URLs should have valid lastModified, changeFrequency, and priority', async ({ request }) => {
    const response = await request.get(sitemapUrl);
    const sitemapText = await response.text();

    const urls = sitemapText.match(/<url>[\s\S]*?<\/url>/g);
    expect(urls).not.toBeNull();

    urls?.forEach(urlEntry => {
      expect(urlEntry).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z<\/lastmod>/);
      expect(urlEntry).toMatch(/<changefreq>(always|hourly|daily|weekly|monthly|yearly|never)<\/changefreq>/);
      expect(urlEntry).toMatch(/<priority>([0-1](\.\d)?|0\.\d)<\/priority>/);
    });
  });

  test('sitemap.xml should not contain broken or duplicate URLs', async ({ request }) => {
    const response = await request.get(sitemapUrl);
    const sitemapText = await response.text();

    const locs = sitemapText.match(/<loc>(.*?)<\/loc>/g)?.map(loc => loc.replace(/<loc>|<\/loc>/g, ''));
    expect(locs).not.toBeNull();

    // Check for duplicates
    const uniqueLocs = new Set(locs);
    expect(uniqueLocs.size).toBe(locs?.length);

    // Check for broken URLs (by making requests)
    for (const loc of locs!) {
      const urlResponse = await request.head(loc, { failOnStatusCode: false });
      expect(urlResponse.status()).toBeLessThan(400); // Expect 2xx or 3xx status codes
    }
  });

  test('sitemap.xml should load under 500ms', async ({ page }) => {
    const startTime = Date.now();
    await page.goto(sitemapUrl, { waitUntil: 'domcontentloaded' });
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    expect(loadTime).toBeLessThan(500);
  });
});
