import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import site from './src/content/site.json' with { type: 'json' };

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
  vite: { plugins: [tailwindcss()] },
});
