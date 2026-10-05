import en from './en.json';
import pt from './pt.json';

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
  journal: { en: '/journal/', pt: '/pt/diario/' },
  resources: { en: '/resources/', pt: '/pt/recursos/' },
  privacy: { en: '/privacy/', pt: '/pt/privacidade/' },
  styleguide: { en: '/styleguide/', pt: '/pt/styleguide/' },
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

/** Equivalent path in another language. Works for nested pages such as /work/some-project/. */
export function alternatePath(pathname: string, target: Lang): string {
  const current = getLang(pathname);
  if (current === target) return pathname;
  const path = pathname.endsWith('/') ? pathname : pathname + '/';
  const entries = Object.values(routes).filter((r) => r.en !== '/');
  for (const r of entries) {
    if (path === r[current]) return r[target];
    if (path.startsWith(r[current])) return r[target] + path.slice(r[current].length);
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
