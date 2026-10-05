import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* One Markdown file per case study per language:
   src/content/projects/en/<slug>.md and src/content/projects/pt/<slug>.md
   Use the same slug in both languages so the EN | PT switcher lands on the matching page. */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      number: z.string(), // sheet-style number, for example MDS-26-01
      order: z.number(),
      type: z.enum(['residential', 'outdoor', 'commercial', 'interiors']),
      location: z.string(), // city or county level only
      size: z.string(),
      scope: z.string(),
      role: z.string(),
      year: z.string(),
      result: z.string(), // one line, shown on the project card
      clientApproved: z.boolean().default(false), // must be true before real names or addresses appear
      heroImage: image().optional(),
      heroAlt: z.string(),
      brief: z.string(),
      context: z.string(),
      moves: z.array(z.object({ title: z.string(), text: z.string(), visual: z.string() })).min(3).max(5),
      sketch: z.object({ early: z.string(), final: z.string() }),
      documents: z.string(),
      outcome: z.string(),
    }),
});

export const collections = { projects };
