import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/config/environment';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/private/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
