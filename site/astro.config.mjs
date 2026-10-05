import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import site from './src/content/site.json' with { type: 'json' };

// Leaves unfinished sections out of the build. Switch them on in src/content/site.json ("features").
const hideOffFeatures = {
  name: 'hide-off-features',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const root = fileURLToPath(dir);
      const sections = { resources: ['resources', 'pt/recursos'], journal: ['journal', 'pt/artigos'] };
      for (const [feature, folders] of Object.entries(sections)) {
        if (site.features?.[feature]) continue;
        for (const folder of folders) rmSync(root + folder, { recursive: true, force: true });
      }
    },
  },
};

// The public address comes from src/content/site.json ("url").
export default defineConfig({
  site: site.url,
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [hideOffFeatures],
  vite: { plugins: [tailwindcss()] },
});
