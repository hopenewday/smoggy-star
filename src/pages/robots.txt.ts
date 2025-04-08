import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(
    `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /staging/
Crawl-delay: 10
Sitemap: https://yourdomain.com/sitemap.xml
`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
};