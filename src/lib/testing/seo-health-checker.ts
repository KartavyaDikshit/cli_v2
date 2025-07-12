import { chromium, Browser, Page } from 'playwright';

interface SeoHealthReport {
  score: number;
  checks: {
    sitemapAccessible: boolean;
    robotsAccessible: boolean;
    homepageHasOrgSchema: boolean;
    homepageHasWebSiteSchema: boolean;
    // Add more checks as needed
  };
  recommendations: string[];
}

export async function runSeoHealthCheck(baseUrl: string = 'http://localhost:3000'): Promise<SeoHealthReport> {
  let browser: Browser | undefined;
  let page: Page | undefined;
  const report: SeoHealthReport = {
    score: 0,
    checks: {
      sitemapAccessible: false,
      robotsAccessible: false,
      homepageHasOrgSchema: false,
      homepageHasWebSiteSchema: false,
    },
    recommendations: [],
  };

  try {
    browser = await chromium.launch();
    page = await browser.newPage();

    // Check Sitemap Accessibility
    try {
      const sitemapResponse = await page.goto(`${baseUrl}/sitemap.xml`, { waitUntil: 'domcontentloaded' });
      report.checks.sitemapAccessible = sitemapResponse?.ok() || false;
    } catch (_sitemapError: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars // eslint-disable-line @typescript-eslint/no-unused-vars
      report.recommendations.push('Sitemap.xml is not accessible. Ensure the route is correctly set up.');
    }

    // Check Robots.txt Accessibility
    try {
      const robotsResponse = await page.goto(`${baseUrl}/robots.txt`, { waitUntil: 'domcontentloaded' });
      report.checks.robotsAccessible = robotsResponse?.ok() || false;
    } catch (_robotsError: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars // eslint-disable-line @typescript-eslint/no-unused-vars
      report.recommendations.push('Robots.txt is not accessible. Ensure the route is correctly set up.');
    }

    // Check Homepage Structured Data (Organization and WebSite Schema)
    try {
      await page.goto(`${baseUrl}/en`, { waitUntil: 'domcontentloaded' });
      const jsonLd = await page.evaluate(() => {
        const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
        return scripts.map(script => {
          try {
            return JSON.parse(script.textContent || '{}');
          } catch (_parseError: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars // eslint-disable-line @typescript-eslint/no-unused-vars
            return null;
          }
        }).filter(Boolean);
      });

      report.checks.homepageHasOrgSchema = jsonLd.some(schema => schema['@type'] === 'Organization');
      if (!report.checks.homepageHasOrgSchema) {
        report.recommendations.push('Homepage is missing Organization Schema.');
      }

      report.checks.homepageHasWebSiteSchema = jsonLd.some(schema => schema['@type'] === 'WebSite');
      if (!report.checks.homepageHasWebSiteSchema) {
        report.recommendations.push('Homepage is missing WebSite Schema.');
      }
    } catch (_homepageError: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      report.recommendations.push('Could not check homepage structured data. Ensure the homepage is accessible.');
    }

    // Calculate Score
    const totalChecks = Object.keys(report.checks).length;
    const passedChecks = Object.values(report.checks).filter(Boolean).length;
    report.score = Math.round((passedChecks / totalChecks) * 100);

  } catch (_error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars // eslint-disable-line @typescript-eslint/no-unused-vars
    console.error('Error during SEO health check:', error);
    report.recommendations.push(`An unexpected error occurred during the health check: ${error.message}`);
    report.score = 0;
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  return report;
}
