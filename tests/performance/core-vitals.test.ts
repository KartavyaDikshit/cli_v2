// tests/performance/core-vitals.test.ts
import { test, expect } from '@playwright/test';

const locales = ['en', 'de', 'fr', 'ja', 'ko'];

test.describe('Core Web Vitals and Performance Tests', () => {
  // Measures LCP, FID, CLS across all locales
  for (const locale of locales) {
    test(`Core Web Vitals for homepage in ${locale} locale`, async ({ page }) => {
      await page.goto(`/${locale}`);

      // Measure LCP (Largest Contentful Paint)
      const lcp = await page.evaluate(() => {
        return new Promise(resolve => {
          new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            resolve(lastEntry.startTime);
          }).observe({ type: 'largest-contentful-paint', buffered: true });
        });
      });
      console.log(`LCP for /${locale}: ${lcp}ms`);
      expect(lcp).toBeLessThan(2500); // Example threshold: LCP should be under 2.5 seconds

      // Measure CLS (Cumulative Layout Shift)
      const cls = await page.evaluate(() => {
        return new Promise(resolve => {
          let clsValue = 0;
          const observer = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            }
          });
          observer.observe({ type: 'layout-shift', buffered: true });
          // Give some time for layout shifts to occur, then resolve
          setTimeout(() => resolve(clsValue), 3000); // Wait 3 seconds for shifts
        });
      });
      console.log(`CLS for /${locale}: ${cls}`);
      expect(cls).toBeLessThan(0.1); // Example threshold: CLS should be under 0.1

      // FID (First Input Delay) is harder to measure directly without user interaction.
      // You would typically simulate user interaction (e.g., click a button) and then measure.
      // For a more robust FID measurement, consider integrating with Lighthouse or WebPageTest.
      test.skip('FID measurement requires user interaction simulation');
    });
  }

  // Tests image optimization effectiveness
  test('Image optimization effectiveness', async ({ page }) => {
    await page.goto('/en'); // Go to a page with images
    const images = await page.locator('img').all();
    for (const img of images) {
      const src = await img.getAttribute('src');
      const currentSrc = await img.getAttribute('currentSrc'); // For srcset
      const loading = await img.getAttribute('loading');

      // Expect images to be using Next.js Image component features (e.g., optimized URLs, lazy loading)
      expect(src).toMatch(/_next\/image/); // Check if Next.js image optimization is applied
      expect(loading).toBe('lazy'); // Expect lazy loading
      // You could also check image dimensions vs. rendered dimensions for proper sizing
    }
  });

  // Validates caching strategies
  test('Caching strategies validation', async ({ page, request }) => {
    // This test would involve checking HTTP headers for caching directives
    await page.goto('/en');
    const response = await page.waitForResponse(response => response.url().includes('/en'));
    const headers = response.headers();

    expect(headers['cache-control']).toContain('public');
    expect(headers['cache-control']).toContain('max-age');
    // You might also check for ETag or Last-Modified headers for revalidation

    // Test static assets caching
    const staticAssetResponse = await request.get('/next.svg'); // Example static asset
    const staticAssetHeaders = staticAssetResponse.headers();
    expect(staticAssetHeaders['cache-control']).toContain('immutable');
    expect(staticAssetHeaders['cache-control']).toContain('max-age=31536000');
  });

  // Checks mobile responsiveness
  test('Mobile responsiveness check', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE dimensions
    await page.goto('/en');
    // Check for elements that should be visible/hidden on mobile
    // Example: expect(page.locator('.mobile-menu-button')).toBeVisible();
    // Example: expect(page.locator('.desktop-navigation')).toBeHidden();

    // Take a screenshot to visually inspect responsiveness
    await page.screenshot({ path: './test-results/screenshots/mobile-homepage.png' });

    await page.setViewportSize({ width: 1024, height: 768 }); // Tablet dimensions
    await page.screenshot({ path: './test-results/screenshots/tablet-homepage.png' });

    await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop dimensions
    await page.screenshot({ path: './test-results/screenshots/desktop-homepage.png' });

    // Add more specific assertions for layout, font sizes, etc., on different screen sizes
  });
});
