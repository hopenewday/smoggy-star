import fs from 'fs';
import path from 'path';
import { fetchNavigation } from '../src/utils/cmsApi.js';

async function generateSitemap() {
  const baseUrl = process.env.SITE_URL || 'https://yourdomain.com';
  const navItems = await fetchNavigation();

  const urls = new Set();

  function addUrls(items) {
    items.forEach(item => {
      urls.add(new URL(item.url, baseUrl).href);
      if (item.children) addUrls(item.children);
    });
  }

  addUrls(navItems);

  const sitemapEntries = Array.from(urls).map(url => `
    <url>
      <loc>${url}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
  `).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`;

  const outputPath = path.resolve('public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemap.trim());
  console.log('Sitemap generated at', outputPath);
}

generateSitemap().catch(console.error);