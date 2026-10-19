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
/** A profile link from site.json "social", or undefined while it is still an [ADD ...] placeholder or empty. */
export const socialUrl = (v?: string) => (v && /^https?:\/\//.test(v) ? v : undefined);
const sameAs = () => [site.social.instagram, site.social.linkedin, site.social.upwork].map(socialUrl).filter(Boolean) as string[];
const personId = () => abs('/#manolo');
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
    areaServed: [
      { '@type': 'City', name: 'Orlando', containedInPlace: { '@type': 'State', name: 'Florida' } },
      { '@type': 'City', name: 'Apopka', containedInPlace: { '@type': 'State', name: 'Florida' } },
      { '@type': 'City', name: 'Winter Park', containedInPlace: { '@type': 'State', name: 'Florida' } },
      { '@type': 'City', name: 'Winter Garden', containedInPlace: { '@type': 'State', name: 'Florida' } },
      { '@type': 'Place', name: 'Central Florida' },
      { '@type': 'Country', name: 'United States' },
    ],
    knowsLanguage: ['en', 'pt-BR'],
    founder: person(lang),
    ...(sameAs().length ? { sameAs: sameAs() } : {}),
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
      url: `${abs(routeFor(lang, 'services'))}${s.id}/`,
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

export function articleSchema(
  lang: Lang,
  d: { title: string; description: string; date?: string; updated?: string; image?: string },
  url: string,
) {
  return {
    '@context': ctx,
    '@type': 'BlogPosting',
    '@id': `${abs(url)}#article`,
    headline: d.title,
    description: d.description,
    url: abs(url),
    mainEntityOfPage: abs(url),
    image: abs(d.image ?? '/images/og-default.png'),
    ...(d.date ? { datePublished: d.date, dateModified: d.updated && d.updated > d.date ? d.updated : d.date } : {}),
    author: { '@type': 'Person', '@id': personId(), name: 'Manolo Castaneda', url: abs(routeFor(lang, 'about')) },
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

/** Manolo, as a Person. Used on its own on the About page and as the founder inside ProfessionalService. */
function person(lang: Lang) {
  return {
    '@type': 'Person',
    '@id': personId(),
    name: 'Manolo Castaneda',
    jobTitle: 'Residential Designer',
    worksFor: { '@id': studioId() },
    url: abs(routeFor(lang, 'about')),
    image: abs('/images/manolo-castaneda.jpg'),
    address: { '@type': 'PostalAddress', addressLocality: 'Orlando', addressRegion: 'FL', addressCountry: 'US' },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'New Jersey Institute of Technology', alternateName: 'NJIT' },
      { '@type': 'CollegeOrUniversity', name: 'Universidade Católica de Brasília' },
    ],
    knowsLanguage: [
      { '@type': 'Language', name: 'English', alternateName: 'en' },
      { '@type': 'Language', name: 'Portuguese', alternateName: 'pt-BR' },
    ],
    ...(sameAs().length ? { sameAs: sameAs() } : {}),
  };
}

export function personSchema(lang: Lang) {
  return { '@context': ctx, ...person(lang) };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    '@context': ctx,
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
  };
}
