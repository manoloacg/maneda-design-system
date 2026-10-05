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
      published: z.boolean().default(true), // false hides the project everywhere without deleting the file
      type: z.enum(['residential', 'outdoor', 'commercial', 'interiors']),
      location: z.string(), // city or county level only
      size: z.string().optional(),
      scope: z.string(),
      role: z.string(),
      year: z.string(),
      result: z.string(), // one line, shown on the project card
      clientApproved: z.boolean().default(false), // must be true before real names or addresses appear
      heroImage: image().optional(),
      cardImage: image().optional(), // image for the project card, if different from the hero
      heroAlt: z.string(),
      brief: z.string(),
      context: z.string(),
      moves: z
        .array(z.object({ title: z.string(), text: z.string(), visual: z.string().optional(), image: image().optional(), alt: z.string().optional() }))
        .min(3)
        .max(5),
      // Optional parts. Leave a field out and its section is left out of the page.
      sketch: z
        .object({
          early: z.string().optional(),
          final: z.string().optional(),
          earlyImage: image().optional(),
          earlyAlt: z.string().optional(),
          finalImage: image().optional(),
          finalAlt: z.string().optional(),
        })
        .optional(),
      documents: z.string().optional(),
      documentsImage: image().optional(),
      documentsAlt: z.string().optional(),
      outcome: z.string().optional(),
    }),
});

/* Journal posts: src/content/journal/en/<slug>.md and pt/<slug>.md (same slug in both).
   draft: true marks an outline. Drafts are noindex and left out of the sitemap and structured data. */
const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().optional(), // YYYY-MM-DD, required before a post is published
    draft: z.boolean().default(true),
  }),
});

/* City pages: src/content/cities/en/<slug>.md and pt/<slug>.md.
   A page is only built when published: true. Publishing requires real, distinct local content,
   so any leftover [PLACEHOLDER] text makes the build fail on purpose. */
const cities = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cities' }),
  schema: z
    .object({
      city: z.string(),
      county: z.string(),
      published: z.boolean().default(false),
      intro: z.string(),
      jurisdictionNotes: z.array(z.string()).min(2),
      typicalProjects: z.array(z.string()).min(2),
    })
    .superRefine((v, ctx) => {
      if (v.published && JSON.stringify(v).includes('[PLACEHOLDER')) {
        ctx.addIssue({ code: 'custom', message: 'A published city page cannot contain [PLACEHOLDER] text.' });
      }
    }),
});

export const collections = { projects, journal, cities };
