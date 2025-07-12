// tests/seo/seo-comprehensive.test.ts
import { test, expect } from '@playwright/test';

const locales = ['en', 'de', 'fr', 'ja', 'ko']; // Define your supported locales

test.describe('SEO Comprehensive Tests', () => {
  // Test all locale homepages for proper meta tags
  for (const locale of locales) {
    test(`Homepage meta tags for locale: ${locale}`, async ({ page }) => {
      await page.goto(`/${locale}`);
      // Example: Check title tag
      await expect(page).toHaveTitle(/Your Site Title/);
      // Example: Check meta description
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription).toContain('Your site description');
      // Add more meta tag checks as needed (e.g., Open Graph, Twitter Cards)
    });
  }

  // Validate hreflang implementation across all pages
  test('Hreflang implementation validation', async ({ page }) => {
    // This is a complex test and might require crawling multiple pages
    // and checking their <link rel="alternate" hreflang="..."> tags.
    // For a basic example, let's check the homepage.
    await page.goto('/en');
    const hreflangLinks = await page.locator('link[rel="alternate"][hreflang]').all();
    expect(hreflangLinks.length).toBeGreaterThan(0); // Expect at least one hreflang link
    // Example: Check for specific hreflang links
    const enHreflang = await page.locator('link[rel="alternate"][hreflang="en"]').getAttribute('href');
    expect(enHreflang).toBe('http://localhost:3000/en'); // Adjust base URL as needed
    const deHreflang = await page.locator('link[rel="alternate"][hreflang="de"]').getAttribute('href');
    expect(deHreflang).toBe('http://localhost:3000/de'); // Adjust base URL as needed
    // Add more comprehensive checks for all locales and pages
  });

  // Checks structured data validity
  test('Structured data validity', async ({ page }) => {
    await page.goto('/en'); // Or a page known to have structured data
    const scriptTags = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(scriptTags.length).toBeGreaterThan(0);
    // You would typically parse the JSON-LD and validate its content
    // For example, check if a specific property exists or has a correct value.
    const structuredData = JSON.parse(scriptTags[0]);
    expect(structuredData['@context']).toBe('https://schema.org');
    expect(structuredData['@type']).toBe('WebPage');
    // Consider using a third-party library or API for more robust schema validation
  });

  // Verifies sitemap accessibility and content
  test('Sitemap accessibility and content', async ({ request }) => {
    const sitemapResponse = await request.get('/sitemap.xml');
    expect(sitemapResponse.ok()).toBeTruthy();
    const sitemapContent = await sitemapResponse.text();
    expect(sitemapContent).toContain('<urlset');
    expect(sitemapContent).toContain('<loc>http://localhost:3000/en</loc>'); // Check for a specific URL
    // Parse the sitemap XML and validate all URLs, lastmod, changefreq, etc.
  });

  // Tests Core Web Vitals performance (LCP, FID, CLS) - Playwright can simulate, but dedicated tools are better
  test('Core Web Vitals performance (LCP, FID, CLS)', async ({ page }) => {
    // Playwright can capture performance metrics, but for accurate Core Web Vitals,
    // consider integrating with Lighthouse or WebPageTest.
    // This is a simplified example.
    await page.goto('/en');
    // You can use page.evaluate to access performance APIs
    const lcp = await page.evaluate(() => {
      return new Promise(resolve => {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ type: 'largest-contentful-paint', buffered: true });
      });
    });
    console.log(`LCP for /en: ${lcp}ms`);
    expect(lcp).toBeLessThan(2500); // Example threshold for LCP
    // Similar checks for CLS and FID (requires user interaction simulation for FID)
  });
});
