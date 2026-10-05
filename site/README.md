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

## How to edit text

- Page copy (home, services, process, about, contact, privacy): `src/content/pages/en.json` (English) and `src/content/pages/pt.json` (Portuguese). The two files have the same structure. Edit one line in one, then the matching line in the other.
- Buttons, menus, footer, form messages: `src/i18n/en.json` and `src/i18n/pt.json`.
- Anything shown in a yellow box with `[PLACEHOLDER: ...]` still needs real content. Replace the whole bracket.

## How to change prices

Open `src/content/pricing.json`. Change the `amount` numbers for the three consultations, or `from` and the label for site analysis. Everything else reads "Quoted per project scope". Do not add per-square-foot or hourly rates.

## How to add a project

1. Copy `src/content/projects/en/barndominium.md` to a new file with a short name, for example `lake-house.md`.
2. Copy the Portuguese file in `src/content/projects/pt/` the same way. The file name must be identical in both folders.
3. Fill in every field. Keep `clientApproved: false` until the client approves in writing. Use city or county only, never a street address.
4. Run `npm run build`. The project appears on the Work page and gets its own page.

## How to add a photo

Put the image in `src/assets/` (create the folder if needed), then add `heroImage: ../../../assets/your-photo.jpg` to the project file. The site resizes it automatically. Always write a real description in `heroAlt`.

## The inquiry form

The form uses Web3Forms. Until a real access key is added in `src/content/site.json` (`form.accessKey`), the form runs in test mode: it checks the fields, shows the thank-you page with a test note, and sends nothing. The confirmation email text is in `src/content/pages/en.json` and `pt.json` under `contact.confirmationEmail`.

## Checks

Run `npm run build`, then `npm run check`. It looks for em dashes, banned words, possible diminutives, the word "architect" used as a title, broken internal links, missing alt text, and English and Portuguese files that no longer match.

## Style guide

Open `/styleguide/` (English) or `/pt/styleguide/` (Portuguese) while the site is running. It shows every color, type size, button, form field, card and placeholder. It is hidden from search engines and gets removed before launch.

## Rules for all copy

No em dashes. No diminutives. No emojis. Never use the word "architect" as a title for Manolo, and never say "licensed" about him. Anything unfinished is written as `[PLACEHOLDER: ...]` and listed in `CONTENT-NEEDED.md`.

## Language

Every page exists in English (`/`) and Portuguese (`/pt/`). The EN | PT links in the header keep the visitor on the matching page. A visitor's choice is remembered, but the browser language never forces a redirect.
