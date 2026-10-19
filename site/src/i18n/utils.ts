import en from './en.json';
import pt from './pt.json';
import pagesEn from '../content/pages/en.json';
import pagesPt from '../content/pages/pt.json';
import slugs from './slugs.json';

export type Lang = 'en' | 'pt';
export const languages: Lang[] = ['en', 'pt'];
const dictionaries = { en, pt } as const;

/* Page routes. The language switcher uses this map to land on the equivalent page.
   Add a new page here first, then create the file in src/pages and src/pages/pt. */
export const routes = {
  home: { en: '/', pt: '/pt/' },
  services: { en: '/services/', pt: '/pt/servicos/' },
  work: { en: '/work/', pt: '/pt/trabalhos/' },
  process: { en: '/process/', pt: '/pt/processo/' },
  about: { en: '/about/', pt: '/pt/sobre/' },
  contact: { en: '/contact/', pt: '/pt/contato/' },
  journal: { en: '/journal/', pt: '/pt/artigos/' },
  resources: { en: '/resources/', pt: '/pt/recursos/' },
  resourcesThankYou: { en: '/resources/thank-you/', pt: '/pt/recursos/obrigado/' },
  areas: { en: '/areas/', pt: '/pt/regioes/' },
  thankYou: { en: '/contact/thank-you/', pt: '/pt/contato/obrigado/' },
  privacy: { en: '/privacy/', pt: '/pt/privacidade/' },
} as const;
export type RouteKey = keyof typeof routes;

export function getLang(pathname: string): Lang {
  return pathname === '/pt' || pathname.startsWith('/pt/') ? 'pt' : 'en';
}

export function routeFor(lang: Lang, key: RouteKey): string {
  return routes[key][lang];
}

/** Look up a UI string by dotted key, for example t('en', 'cta.requestQuote'). */
export function t(lang: Lang, key: string): string {
  const read = (l: Lang) =>
    key.split('.').reduce<unknown>((o, k) => (o as Record<string, unknown> | undefined)?.[k], dictionaries[l]);
  const value = read(lang) ?? read('en');
  if (typeof value !== 'string') throw new Error(`Missing i18n key: ${key}`);
  return value;
}

/* Detail pages (a service, a case study, an article) have a Portuguese slug of their own, from slugs.json.
   Content files and service ids keep the English slug; only the /pt/ address changes. */
export type DetailSection = 'services' | 'work' | 'journal';
const slugMap = slugs as unknown as Record<DetailSection, Record<string, string>>;
/** The slug to use in a URL, for an English slug. */
export const localSlug = (lang: Lang, section: DetailSection, enSlug: string) => (lang === 'pt' ? slugMap[section][enSlug] ?? enSlug : enSlug);
/** The English slug behind a Portuguese one. */
export const englishSlug = (section: DetailSection, ptSlug: string) => Object.entries(slugMap[section]).find(([, pt]) => pt === ptSlug)?.[0] ?? ptSlug;
/** Address of a detail page, for example detailPath('pt', 'work', 'ohio-residence') is /pt/trabalhos/residencia-ohio/. */
export const detailPath = (lang: Lang, section: DetailSection, enSlug: string) => `${routes[section][lang]}${localSlug(lang, section, enSlug)}/`;

/** Equivalent path in another language. Works for nested pages such as /work/some-project/. */
export function alternatePath(pathname: string, target: Lang): string {
  const current = getLang(pathname);
  if (pathname === '/404/') return routes.home[target];
  if (current === target) return pathname;
  const path = pathname.endsWith('/') ? pathname : pathname + '/';
  const entries = (Object.entries(routes) as [RouteKey, (typeof routes)[RouteKey]][]).filter(([, r]) => r.en !== '/');
  const exact = entries.find(([, r]) => r[current] === path);
  if (exact) return exact[1][target];
  for (const [key, r] of entries) {
    if (!path.startsWith(r[current])) continue;
    const rest = path.slice(r[current].length);
    if (key === 'services' || key === 'work' || key === 'journal') {
      const [seg, ...more] = rest.split('/');
      const en = current === 'pt' ? englishSlug(key, seg) : seg;
      return r[target] + [localSlug(target, key, en), ...more].join('/');
    }
    return r[target] + rest;
  }
  return target === 'pt' ? '/pt/' : '/';
}

/** Pick the right language from a { en, pt } object used in the JSON content files. */
export function pick<T>(lang: Lang, value: { en: T; pt: T }): T {
  return value[lang];
}

export const isPlaceholder = (text: string) => text.includes('[PLACEHOLDER');

/** Wrap [PLACEHOLDER: ...] text so it shows as a yellow flag in the preview. */
export function markPlaceholders(text: string): string {
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return escaped.replace(/\[PLACEHOLDER[^\]]*\]/g, (m) => `<mark class="ph">${m}</mark>`);
}

/** Page copy for a language, from src/content/pages/<lang>.json. Both files share one structure. */
export type PageCopy = typeof pagesEn;
export const getPage = (lang: Lang): PageCopy => (lang === 'pt' ? pagesPt : pagesEn) as PageCopy;

/** Replace {name} tokens in a string. */
export const fill = (text: string, vars: Record<string, string>) =>
  text.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');

export const formatUsd = (lang: Lang, amount: number) =>
  lang === 'pt' ? `US$ ${amount.toLocaleString('pt-BR')}` : `$${amount.toLocaleString('en-US')}`;

/** "Title | Maneda Design Studios", shortened to "| MDS" when the full form is too long for a search result. */
/** Page title with the studio name. Search results cut titles near 60 characters, so it falls back to " | MDS". */
export const withSiteName = (title: string) => {
  const full = `${title} | Maneda Design Studios`;
  return full.length < 60 ? full : `${title} | MDS`;
};
