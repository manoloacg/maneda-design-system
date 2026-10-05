/* Image slots. Each slot has an id. To fill a slot, save your image as
   src/assets/slots/<id>.jpg (or .jpeg, .png, .webp). The site picks it up on the next build.
   While "showPlaceholders" is true in site.json, an empty slot shows a gray frame.
   At launch, set it to false and every empty slot disappears. */
import type { ImageMetadata } from 'astro';
import site from '../content/site.json';

const files = import.meta.glob<ImageMetadata>('../assets/slots/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });

export const slotImage = (id: string): ImageMetadata | undefined =>
  Object.entries(files).find(([k]) => (k.split('/').pop() ?? '').startsWith(`${id}.`))?.[1];

/** True when the slot will show something: a real image, or a gray frame in preview mode. */
export const slotVisible = (id: string) => !!slotImage(id) || site.showPlaceholders;
