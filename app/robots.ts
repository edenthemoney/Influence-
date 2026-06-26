import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/booking/success'],
      },
      // Explicitly allow major AI/LLM crawlers
      { userAgent: 'GPTBot',           allow: '/' },
      { userAgent: 'ChatGPT-User',     allow: '/' },
      { userAgent: 'PerplexityBot',    allow: '/' },
      { userAgent: 'ClaudeBot',        allow: '/' },
      { userAgent: 'anthropic-ai',     allow: '/' },
      { userAgent: 'cohere-ai',        allow: '/' },
      { userAgent: 'Googlebot-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended',  allow: '/' },
      { userAgent: 'Bytespider',       allow: '/' },
      { userAgent: 'FacebookBot',      allow: '/' },
    ],
    sitemap: 'https://influencemodels.agency/sitemap.xml',
  };
}
