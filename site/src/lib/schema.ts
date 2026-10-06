/* Structured data (JSON-LD). Builders return plain objects that BaseLayout prints.
   Rules: no street address, no personal phone, and never any [PLACEHOLDER] text. */
import site from '../content/site.json';
import services from '../content/services.json';
import pricing from '../content/pricing.json';
import { getPage, isPlaceholder, pick, routeFor, t, type Lang } from '../i18n/utils';

export const abs = (path: string) => new URL(path, site.url).href;
export const stripPlaceholders = (text: string) => text.replace(/\s*\[PLACEHOLDER[^\]]*\]/g, '').trim();
/** First sentences of a text, up to a character limit, for short structured-data descriptions. */
export function shorten(text: string, limit = 200) {
  const clean = stripPlaceholders(text);
  const sentences = clean.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [clean];
  let out = '';
  for (const sentence of sentences) {
    if ((out + sentence).trim().length > limit) break;
    out += sentence;
  }
  return (out || sentences[0]).trim();
}
const ctx = 'https://schema.org';
const studioId = () => abs('/#studio');

export function studioSchema(lang: Lang) {
  return {
    '@context': ctx,
    '@type': 'ProfessionalService',
    '@id': studioId(),
    name: site.name,
    url: abs(routeFor(lang, 'home')),
    description: t(lang, 'meta.defaultDescription'),
    logo: abs('/images/logo/logo-horizontal-black.png'),
    image: abs('/images/og-default.png'),
    ...(isPlaceholder(site.email) ? {} : { email: site.email }),
    // City level only. No street address is published.
    address: { '@type': 'PostalAddress', addressLocality: 'Orlando', addressRegion: 'FL', addressCountry: 'US' },
    areaServed: { '@type': 'Country', name: 'United States' },
    knowsLanguage: ['en', 'pt-BR'],
    founder: { '@type': 'Person', name: 'Manolo Castaneda', jobTitle: 'Architectural Designer' },
    ...(site.social.instagram ? { sameAs: [site.social.instagram] } : {}),
  };
}

export function servicesSchema(lang: Lang) {
  const items = getPage(lang).services.items as Record<string, { what: string }>;
  return services.services.map((s) => {
    const offers =
      s.pricing === 'consultations'
        ? pricing.consultations.map((c) => ({
            '@type': 'Offer',
            name: pick(lang, c.duration),
            price: c.amount,
            priceCurrency: pricing.currency,
          }))
        : s.pricing === 'siteAnalysis'
          ? pricing.siteAnalysis.tiers.map((t) => ({
              '@type': 'Offer',
              name: pick(lang, t.label),
              price: t.amount,
              priceCurrency: pricing.currency,
            }))
          : undefined;
    return {
      '@context': ctx,
      '@type': 'Service',
      name: pick(lang, s.title),
      description: shorten(items[s.id].what),
      url: `${abs(routeFor(lang, 'services'))}#${s.id}`,
      provider: { '@id': studioId() },
      areaServed: 'United States',
      ...(offers ? { offers } : {}),
    };
  });
}

export function faqSchema(items: { q: string; a: string }[]) {
  const entities = items
    .map((i) => ({ q: i.q, a: stripPlaceholders(i.a) }))
    .filter((i) => i.a.length > 0)
    .map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } }));
  return { '@context': ctx, '@type': 'FAQPage', mainEntity: entities };
}

export function caseStudySchema(lang: Lang, d: { title: string; brief: string }, url: string) {
  return {
    '@context': ctx,
    '@type': 'CreativeWork',
    name: d.title,
    url: abs(url),
    description: d.brief,
    creator: { '@id': studioId() },
    inLanguage: lang === 'pt' ? 'pt-BR' : 'en',
  };
}

export function articleSchema(lang: Lang, d: { title: string; description: string; date?: string }, url: string) {
  return {
    '@context': ctx,
    '@type': 'Article',
    headline: d.title,
    description: d.description,
    url: abs(url),
    ...(d.date ? { datePublished: d.date } : {}),
    author: { '@type': 'Person', name: 'Manolo Castaneda' },
    publisher: { '@id': studioId() },
    inLanguage: lang === 'pt' ? 'pt-BR' : 'en',
  };
}

export function websiteSchema(lang: Lang) {
  return {
    '@context': ctx,
    '@type': 'WebSite',
    '@id': abs('/#website'),
    name: site.name,
    url: abs(routeFor(lang, 'home')),
    inLanguage: lang === 'pt' ? 'pt-BR' : 'en',
    publisher: { '@id': studioId() },
  };
}

export function personSchema(lang: Lang) {
  return {
    '@context': ctx,
    '@type': 'Person',
    '@id': abs('/#manolo'),
    name: 'Manolo Castaneda',
    jobTitle: 'Architectural Designer',
    worksFor: { '@id': studioId() },
    url: abs(routeFor(lang, 'about')),
    address: { '@type': 'PostalAddress', addressLocality: 'Orlando', addressRegion: 'FL', addressCountry: 'US' },
    knowsLanguage: ['en', 'pt-BR'],
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    '@context': ctx,
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
  };
}
