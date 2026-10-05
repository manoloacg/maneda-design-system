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

## How to change the home page photo

Replace `src/assets/hero-home.jpg` with another image of at least 2000 pixels wide, ideally 4:3 or wider with the house in the lower half. Update its description in `home.hero.alt` in both page files.

## How to add your own images to the Services page

Each service shows a drawing-style diagram until you add an image. To replace one, save your image in `src/assets/services/` named after the service: `residential-design.jpg`, `interior-design.jpg`, `site-analysis.jpg`, `consultations.jpg`, or `construction-documents.jpg` (`.webp` and `.png` work too). Use `builders.jpg` for the builders and developers section. The site picks it up on the next build. Use only your own work, and remove names and addresses first.

## How to add an image to a design move

Put the image in `src/assets/`. In the project file, under that move, add two lines: `image: ../../../assets/your-image.jpg` and `alt: "A real description of the image"`. Remove the matching `[PLACEHOLDER: ...]` text from `visual`. See move 2 in `src/content/projects/en/ohio-residence.md`.

## How to add a photo

Put the image in `src/assets/` (create the folder if needed), then add `heroImage: ../../../assets/your-photo.jpg` to the project file. The site resizes it automatically. Always write a real description in `heroAlt`.

## Search visibility switch (important)

In `src/content/site.json`, `"indexing": false` keeps the whole site hidden from Google. Every page is marked noindex and `robots.txt` blocks crawlers. Change it to `true` only on launch day. Separately, three kinds of page stay hidden even after launch until they are real: case studies and journal posts that still contain `[PLACEHOLDER]` text, journal posts marked `draft: true`, and the thank-you pages. They are also left out of `sitemap.xml`.

## Turning sections on and off

In `src/content/site.json`, `features.resources` and `features.journal` are both `false`. While false, those pages are left out of the website completely: no pages, no footer links, no sitemap entries. Set one to `true` when its content is real (the checklist PDFs for Resources, a finished article for Journal).

## Journal

Add a post by copying `src/content/journal/en/start-a-custom-home.md` and its Portuguese twin in `pt/`, same file name in both. Write the article below the dashes. Set `draft: false` and add `date: 2026-11-01` (use the real date) when it is ready.

## City pages

None are built, on purpose. A thin or repeated city page hurts search. To add one, copy `src/content/cities/_TEMPLATE.md` to `en/<city>.md` and `pt/<city>.md`, write real local content, and set `published: true`. The build refuses to publish a city page that still has `[PLACEHOLDER]` text.

## Structured data

Search engines read hidden data on each page: the studio (home, services, contact), each service with its fixed prices, the FAQ, and case studies and journal posts once they are real. It never includes an address or personal phone number.

## Analytics

Off. To turn on Cloudflare Web Analytics, set `analytics.enabled` to `true` and paste the token in `site.json`. The privacy page switches to the matching wording by itself. Do this only after you approve it.

## The checklist PDF

Replace `public/resources/before-you-hire-a-designer.pdf` and `antes-de-contratar-um-designer.pdf` with the real files, keeping the same names. The visitor gets the download on the thank-you page. Following up by email later needs an email tool such as Buttondown or Mailchimp. That is a separate decision.

## How to publish

Read `LAUNCH.md`. It walks through the form key, the Cloudflare setup, the domain, the launch-day order, and the Google and Bing checklists. Run `npm run launch-check` at any time to see what still blocks launch. Nothing goes live until you say so.

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
