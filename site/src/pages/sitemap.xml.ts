import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import site from '../content/site.json';
import { alternatePath, routes, type Lang } from '../i18n/utils';
import { hasPlaceholder } from '../lib/journal';
import services from '../content/services.json';
import lastmod from '../content/lastmod.json';

/* XML sitemap with English and Portuguese alternates.
   Left out on purpose: /admin/, thank-you pages, 404, draft journal posts,
   and any case study that still contains [PLACEHOLDER] text.
   <lastmod> comes from git history (scripts/lastmod.mjs writes src/content/lastmod.json), never the build time. */
const dates = lastmod as Record<string, string>;
const latest = (keys: string[]) => keys.map((k) => dates[k]).filter(Boolean).sort().at(-1);
export const GET: APIRoute = async () => {
  const skip = new Set(['thankYou', 'resourcesThankYou', 'areas']);
  if (!site.features.resources) skip.add('resources');
  if (!site.features.journal) skip.add('journal');
  // Each page: its English path, and the content sources whose last change dates the page, per language.
  const pages: { path: string; keys: (l: Lang) => string[] }[] = [];
  const projects = (await getCollection('projects')).filter((p) => p.id.startsWith('en/') && p.data.published && !hasPlaceholder(p.data));
  const posts = (site.features.journal ? await getCollection('journal') : []).filter((p) => p.id.startsWith('en/') && !p.data.draft && !hasPlaceholder(p.data));
  const slug = (id: string) => id.split('/')[1];
  const pageKey: Partial<Record<string, string>> = { home: 'home', services: 'services', work: 'work', process: 'process', about: 'about', contact: 'contact', journal: 'journal', privacy: 'privacy' };
  for (const [key, r] of Object.entries(routes)) {
    if (skip.has(key)) continue;
    pages.push({
      path: r.en,
      keys: (l) => [
        `page:${l}:${pageKey[key] ?? key}`,
        ...(key === 'services' ? [...services.services.map((sv) => `services.json:${sv.id}`), 'pricing.json'] : []),
        ...(key === 'work' ? projects.map((p) => `file:src/content/projects/${l}/${slug(p.id)}.md`) : []),
        ...(key === 'journal' ? posts.map((p) => `file:src/content/journal/${l}/${slug(p.id)}.md`) : []),
      ],
    });
  }
  for (const sv of services.services) {
    const priced = sv.pricing === 'consultations' || sv.pricing === 'siteAnalysis';
    pages.push({ path: `${routes.services.en}${sv.id}/`, keys: (l) => [`page:${l}:service-${sv.id}`, `services.json:${sv.id}`, ...(priced ? ['pricing.json'] : [])] });
  }
  for (const p of projects) pages.push({ path: `${routes.work.en}${slug(p.id)}/`, keys: (l) => [`file:src/content/projects/${l}/${slug(p.id)}.md`, `page:${l}:caseStudy`] });
  for (const p of posts) pages.push({ path: `${routes.journal.en}${slug(p.id)}/`, keys: (l) => [`file:src/content/journal/${l}/${slug(p.id)}.md`] });
  const cities = await getCollection('cities');
  for (const c of cities.filter((c) => c.id.startsWith('en/') && c.data.published)) pages.push({ path: `${routes.areas.en}${slug(c.id)}/`, keys: () => [] });

  const abs = (p: string) => new URL(p, site.url).href;
  const link = (hreflang: string, p: string) => `<xhtml:link rel="alternate" hreflang="${hreflang}" href="${abs(p)}"/>`;
  const entry = (page: (typeof pages)[number], lang: Lang) => {
    const { path } = page;
    const own = lang === 'en' ? path : alternatePath(path, 'pt');
    const mod = latest(page.keys(lang));
    return `<url><loc>${abs(own)}</loc>${mod ? `<lastmod>${mod}</lastmod>` : ''}${link('en', path)}${link('pt-BR', alternatePath(path, 'pt'))}${link('x-default', path)}</url>`;
  };
  const body = pages.flatMap((p) => [entry(p, 'en'), entry(p, 'pt')]).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
