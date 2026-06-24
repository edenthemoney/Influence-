import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/booking/success'],
      },
    ],
    sitemap: 'https://influencemodels.agency/sitemap.xml',
  };
}
