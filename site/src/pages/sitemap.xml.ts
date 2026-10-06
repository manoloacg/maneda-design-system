import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import site from '../content/site.json';
import { alternatePath, routes, type Lang } from '../i18n/utils';
import { hasPlaceholder } from '../lib/journal';
import services from '../content/services.json';

/* XML sitemap with English and Portuguese alternates.
   Left out on purpose: style guide, thank-you pages, 404, journal outlines,
   and any case study that still contains [PLACEHOLDER] text. */
export const GET: APIRoute = async () => {
  const skip = new Set(['thankYou', 'resourcesThankYou', 'areas']);
  if (!site.features.resources) skip.add('resources');
  if (!site.features.journal) skip.add('journal');
  const paths: string[] = Object.entries(routes)
    .filter(([key]) => !skip.has(key))
    .map(([, r]) => r.en);

  for (const sv of services.services) paths.push(`${routes.services.en}${sv.id}/`);
  const projects = await getCollection('projects');
  for (const p of projects.filter((p) => p.id.startsWith('en/') && p.data.published && !hasPlaceholder(p.data))) paths.push(`${routes.work.en}${p.id.split('/')[1]}/`);
  const posts = site.features.journal ? await getCollection('journal') : [];
  for (const p of posts.filter((p) => p.id.startsWith('en/') && !p.data.draft && !hasPlaceholder(p.data))) paths.push(`${routes.journal.en}${p.id.split('/')[1]}/`);
  const cities = await getCollection('cities');
  for (const c of cities.filter((c) => c.id.startsWith('en/') && c.data.published)) paths.push(`${routes.areas.en}${c.id.split('/')[1]}/`);

  const abs = (p: string) => new URL(p, site.url).href;
  const link = (hreflang: string, p: string) => `<xhtml:link rel="alternate" hreflang="${hreflang}" href="${abs(p)}"/>`;
  const entry = (path: string, lang: Lang) => {
    const own = lang === 'en' ? path : alternatePath(path, 'pt');
    return `<url><loc>${abs(own)}</loc>${link('en', path)}${link('pt-BR', alternatePath(path, 'pt'))}${link('x-default', path)}</url>`;
  };
  const body = paths.flatMap((p) => [entry(p, 'en'), entry(p, 'pt')]).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
