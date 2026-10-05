import type { APIRoute } from 'astro';
import site from '../content/site.json';

/* While "indexing" is false in site.json, crawlers are blocked. Flip it at launch. */
export const GET: APIRoute = () => {
  const body = site.indexing
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site.url).href}\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
