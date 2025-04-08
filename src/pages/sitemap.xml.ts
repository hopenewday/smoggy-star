import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const urls = [
    { loc: 'https://yourdomain.com/', priority: 1.0, changefreq: 'daily' },
    { loc: 'https://yourdomain.com/about', priority: 0.8, changefreq: 'monthly' },
    // Add dynamic article URLs here by fetching from CMS
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `<url>
  <loc>${u.loc}</loc>
  <priority>${u.priority}</priority>
  <changefreq>${u.changefreq}</changefreq>
</url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};