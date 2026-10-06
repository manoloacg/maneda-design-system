/* Image slots. Each slot has an id. Two ways to fill a slot:
   1. In the visual editor (/admin), under "Image slots".
   2. Or save your image as src/assets/slots/<id>.jpg (or .jpeg, .png, .webp).
   While "showPlaceholders" is true in site.json, an empty slot shows a gray frame.
   At launch, set it to false and every empty slot disappears. */
import type { ImageMetadata } from 'astro';
import site from '../content/site.json';
import chosen from '../content/slots.json';

const files = import.meta.glob<ImageMetadata>('../assets/**/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
const byName = (name: string) => Object.entries(files).find(([k]) => k.split('/').pop() === name)?.[1];

const videoFiles = import.meta.glob<string>('../assets/videos/slots/*.mp4', { eager: true, query: '?url', import: 'default' });
const webmFiles = import.meta.glob<string>('../assets/videos/slots/*.webm', { eager: true, query: '?url', import: 'default' });
const posterFiles = import.meta.glob<string>('../assets/videos/slots/*.jpg', { eager: true, query: '?url', import: 'default' });
const byId = (files: Record<string, string>, id: string) => Object.entries(files).find(([k]) => (k.split('/').pop() ?? '').startsWith(`${id}.`))?.[1];

/** A short looping clip for a slot: save it as src/assets/videos/slots/<id>.mp4, with a poster <id>.jpg beside it. */
export const slotVideo = (id: string): { src: string; webm?: string; poster?: string } | undefined => {
  const src = byId(videoFiles, id);
  return src ? { src, webm: byId(webmFiles, id), poster: byId(posterFiles, id) } : undefined;
};

export const slotImage = (id: string): ImageMetadata | undefined => {
  const picked = (chosen as Record<string, string>)[id];
  if (picked) {
    const hit = byName(picked.split('/').pop() ?? '');
    if (hit) return hit;
  }
  return Object.entries(files).find(([k]) => k.includes('/assets/slots/') && (k.split('/').pop() ?? '').startsWith(`${id}.`))?.[1];
};

/** True when the slot will show something: a real image, or a gray frame in preview mode. */
export const slotVisible = (id: string) => !!slotVideo(id) || !!slotImage(id) || site.showPlaceholders;
