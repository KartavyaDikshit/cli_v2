import { test, expect } from '@playwright/test';

test.describe('Robots.txt Validation', () => {
  const baseUrl = 'http://localhost:3000';
  const robotsTxtUrl = `${baseUrl}/robots.txt`;

  test('robots.txt should be accessible', async ({ request }) => {
    const response = await request.get(robotsTxtUrl);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('text/plain');
  });

  test('robots.txt should have proper syntax and directives', async ({ request }) => {
    const response = await request.get(robotsTxtUrl);
    const robotsTxtContent = await response.text();

    expect(robotsTxtContent).toContain('User-agent: *');
    expect(robotsTxtContent).toContain('Allow: /');
    expect(robotsTxtContent).toContain('Disallow: /admin/');
    expect(robotsTxtContent).toContain('Disallow: /api/');
    expect(robotsTxtContent).toContain('Disallow: /private/');
  });

  test('robots.txt should correctly reference the sitemap.xml file', async ({ request }) => {
    const response = await request.get(robotsTxtUrl);
    const robotsTxtContent = await response.text();

    expect(robotsTxtContent).toContain(`Sitemap: ${baseUrl}/sitemap.xml`);
  });

  test('robots.txt should block access to specified paths', async ({ request }) => {
    // Test that /admin/ is disallowed
    const adminResponse = await request.get(`${baseUrl}/admin/some-page`, { failOnStatusCode: false });
    expect(adminResponse.status()).toBe(404); // Expecting 404 as it's not a real page, but should be disallowed

    // Test that /api/ is disallowed
    const apiResponse = await request.get(`${baseUrl}/api/some-endpoint`, { failOnStatusCode: false });
    expect(apiResponse.status()).toBe(404); // Expecting 404

    // Test that /private/ is disallowed
    const privateResponse = await request.get(`${baseUrl}/private/data`, { failOnStatusCode: false });
    expect(privateResponse.status()).toBe(404); // Expecting 404
  });
});
