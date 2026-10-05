import { getCollection } from 'astro:content';
import type { Lang } from '../i18n/utils';

/** Case studies for one language, in display order. The slug is the file name. */
export async function getProjects(lang: Lang) {
  const all = await getCollection('projects');
  return all
    .filter((p) => p.id.startsWith(`${lang}/`))
    .map((p) => ({ ...p, slug: p.id.split('/')[1] }))
    .sort((a, b) => a.data.order - b.data.order);
}
