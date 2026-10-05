import { getCollection } from 'astro:content';
import type { Lang } from '../i18n/utils';

export const hasPlaceholder = (value: unknown) => JSON.stringify(value).includes('[PLACEHOLDER');

/** Journal posts for one language. The slug is the file name. */
export async function getPosts(lang: Lang) {
  const all = await getCollection('journal');
  return all
    .filter((p) => p.id.startsWith(`${lang}/`))
    .map((p) => ({ ...p, slug: p.id.split('/')[1] }))
    .sort((a, b) => (b.data.date ?? '').localeCompare(a.data.date ?? ''));
}

/** Published city pages for one language. Empty until real local content exists. */
export async function getCities(lang: Lang) {
  const all = await getCollection('cities');
  return all.filter((c) => c.id.startsWith(`${lang}/`) && c.data.published).map((c) => ({ ...c, slug: c.id.split('/')[1] }));
}
