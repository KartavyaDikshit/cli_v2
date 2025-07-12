import { test, expect } from '@playwright/test';

test.describe('Performance Baseline Testing', () => {
  const baseUrl = 'http://localhost:3000';
  const locales = ['en', 'fr', 'de', 'ja', 'ko'];

  test('Measure Core Web Vitals and page load times for all locale homepages', async ({ page }) => {
    for (const locale of locales) {
      const url = `${baseUrl}/${locale}`;
      await page.goto(url, { waitUntil: 'networkidle' });

      // Measure page load time
      const loadTime = await page.evaluate(() => {
        return performance.timing.loadEventEnd - performance.timing.navigationStart;
      });
      console.log(`Locale: ${locale}, Load Time: ${loadTime}ms`);
      expect(loadTime).toBeLessThan(3000); // Example threshold

      // Measure LCP (Largest Contentful Paint)
      const lcp = await page.evaluate(() => {
        return new Promise(resolve => {
          new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            resolve(lastEntry.renderTime || lastEntry.loadTime);
          }).observe({ type: 'largest-contentful-paint', buffered: true });
        });
      });
      console.log(`Locale: ${locale}, LCP: ${lcp}ms`);
      expect(lcp).toBeLessThan(2500); // Example threshold

      // Measure CLS (Cumulative Layout Shift) - requires more complex interaction or a dedicated library
      // For simplicity, we'll just log a placeholder for now.
      console.log(`Locale: ${locale}, CLS: [Requires dedicated measurement]`);

      // Measure FID (First Input Delay) - requires user interaction, difficult to automate directly
      // For simplicity, we'll just log a placeholder for now.
      console.log(`Locale: ${locale}, FID: [Requires user interaction]`);
    }
  });

  test('Measure sitemap.xml load time and size', async ({ request }) => {
    const sitemapUrl = `${baseUrl}/sitemap.xml`;
    const startTime = Date.now();
    const response = await request.get(sitemapUrl);
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    const sitemapText = await response.text();
    const sizeInBytes = new TextEncoder().encode(sitemapText).length;

    console.log(`Sitemap Load Time: ${loadTime}ms`);
    console.log(`Sitemap Size: ${sizeInBytes} bytes`);

    expect(loadTime).toBeLessThan(500); // Example threshold
    expect(sizeInBytes).toBeLessThan(100 * 1024); // Example threshold: 100KB
  });

  test('Test mobile vs desktop performance for homepage', async ({ browser }) => {
    const desktopContext = await browser.newContext();
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(`${baseUrl}/en`, { waitUntil: 'networkidle' });
    const desktopLoadTime = await desktopPage.evaluate(() => performance.timing.loadEventEnd - performance.timing.navigationStart);
    console.log(`Desktop Load Time (en): ${desktopLoadTime}ms`);
    expect(desktopLoadTime).toBeLessThan(3000);
    await desktopContext.close();

    const mobileContext = await browser.newContext({ viewport: { width: 375, height: 667, isMobile: true } });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`${baseUrl}/en`, { waitUntil: 'networkidle' });
    const mobileLoadTime = await mobilePage.evaluate(() => performance.timing.loadEventEnd - performance.timing.navigationStart);
    console.log(`Mobile Load Time (en): ${mobileLoadTime}ms`);
    expect(mobileLoadTime).toBeLessThan(3500); // Slightly higher threshold for mobile
    await mobileContext.close();
  });
});
