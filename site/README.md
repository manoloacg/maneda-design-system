# Maneda Design Studios website

Written for a non-developer. This file grows as the build moves through its phases.

## Run it on your computer

1. Install Node.js (version 20 or newer).
2. In a terminal, go into this `site` folder.
3. Run `npm install` once.
4. Run `npm run dev`. Open the address it prints (usually http://localhost:4321).
5. Run `npm run build` to make the final files in the `dist` folder.

## Where things live

| What | File |
|---|---|
| Colors, fonts, spacing | `src/styles/tokens.css` |
| Studio name, email, social links | `src/content/site.json` |
| Prices | `src/content/pricing.json` |
| The five services | `src/content/services.json` |
| English interface text | `src/i18n/en.json` |
| Portuguese interface text | `src/i18n/pt.json` |
| Logos and images | `public/images/` |

## Style guide

Open `/styleguide/` (English) or `/pt/styleguide/` (Portuguese) while the site is running. It shows every color, type size, button, form field, card and placeholder. It is hidden from search engines and gets removed before launch.

## Rules for all copy

No em dashes. No diminutives. No emojis. Never use the word "architect" as a title for Manolo, and never say "licensed" about him. Anything unfinished is written as `[PLACEHOLDER: ...]` and listed in `CONTENT-NEEDED.md`.

## Language

Every page exists in English (`/`) and Portuguese (`/pt/`). The EN | PT links in the header keep the visitor on the matching page. A visitor's choice is remembered, but the browser language never forces a redirect.
