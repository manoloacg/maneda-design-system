# Content I still need from Manolo

Every placeholder on the site is written `[PLACEHOLDER: ...]` in the source and shows as a yellow flag in the preview. Run `npm run launch-check` to see the live count.

Done already: studio email (manedastudios@gmail.com), seal sentence in English (confirmed), home hero photo (the Ohio residence front render), rear render in design move 2, Web3Forms access key (the form now sends real email).

Domain: manedastudios.com, newly bought by Manolo, nothing hosted on it. Reply promise: within 1 business day (confirmed).

## Must have before launch

| # | Item | Where it goes |
|---|---|---|
| 5 | Written confirmation from the Ohio owner that the project, hero render and rear render may be published (verbal OK received) | Keep in your files |
| 6 | Ohio residence case study (optional, adds to the page): size in SF, the outcome (permit and build status), images for design moves 1, 3, 4 and 5, an early sketch beside the final plan or elevation, and one sheet excerpt with the title block, owner name and address removed. The page shows only what exists, so it is publishable now. | `src/content/projects/en/ohio-residence.md` and `pt/` |
| 7 | Written client approval before any real name or address appears (`clientApproved: true`). Not needed while the project stays anonymous. | Same files |
| 9 | FAQ: which states and jurisdictions you serve, if you want any named. Payment schedule is settled: half to start each phase, half on delivery, due in 7 days. Native Revit files: not shared (settled). Professional of record is settled: the owner hires and pays the structural engineer. | `process.faq` |
| 10 | Portrait: save a file named `portrait.jpg` (or .webp, .png) in `src/assets/`. The About page shows it automatically and shows no frame until then. | `src/assets/portrait.jpg` |
| 12 | Final read of the five service descriptions, now rewritten from your Service Pricing Guide, in both languages | `services.items` in both page files |
| 14 | Later, not needed for launch: checklist PDF, English and Portuguese, plus the three section titles for the Resources page. The page is off until then. | `public/resources/` and `resources.contents.items` |
| 15 | One legal review: see `LEGAL-CHECKLIST.md`. Then set `legalReviewDone` to true in `site.json`. | `LEGAL-CHECKLIST.md` |
| 16 | A native Portuguese read of all Portuguese copy, including the Portuguese seal sentence | `pt.json` files |

## Image slots

Gray frames show where images go while `showPlaceholders` is true in `site.json`. Fill any of them by saving a file in `src/assets/slots/` named after the slot (see README). Unfilled slots disappear at launch. None of them is required.

## Images that would improve the site

The Services page shows drawing-style diagrams until you add your own images (see README). Best candidates: an interior render or photo for interior design, a redacted site plan or site analysis page for site analysis, a consultation sketch or marked-up plan, and a redacted drawing sheet for construction documents. Save them in `src/assets/services/`.

## Should have

| Item | Notes |
|---|---|
| Journal and Resources are switched off in `site.json` (`features`) until real content exists. Journal needs a finished article. Resources needs the checklist PDFs and three section titles. Optional outlines for three more journal topics: what a site analysis includes, how a designer works with a builder, design cost versus construction cost | Journal template is ready |
| Real jurisdiction notes for any place page (Orlando area or elsewhere) | None are built. Only add a city when the content is real and different from the others. |
| Instagram link once the account is live | `site.json` (`social.instagram`). Hidden until filled. |
| Vector (SVG) logo files | The brand folder has PNG only. Also re-export `primary-square-white.png`, which is a cropped file with no wordmark. |
| A studio email on your own domain | Better for credibility than Gmail. Cloudflare Email Routing can forward it to Gmail. |
| Share images per page | Case studies use their own hero photo once supplied. Other pages use the default image in `public/images/og-default.png`. Supply branded images if you want them. |

## Decisions that stay with Manolo

- Whether to turn on analytics (LAUNCH.md section 9).
- Whether to follow up with checklist downloads by email. This needs an email tool and is a separate decision.
- Whether Maneda Photography is ever linked from this site. Default: no.
- The launch switch: `"indexing": true` in `site.json`. Nothing is public to search engines until this is set.

## Location decision

The site no longer says "Central Florida". It says the studio is based in Orlando, Florida, with projects across the United States. Confirm the claim holds in practice, especially how seals and local code review work for projects outside Florida. The FAQ placeholders on this are marked.

## From the Service Pricing Guide

The site publishes only fixed prices: the three consultations, the two site analysis tiers and add-ons, and the 90 minute site visit, plus their credits. Per square foot, percent of construction cost, hourly rates, and the future licensed tier are not published, by design. Package credits, durations, revision rounds, and engagement terms are published. The guide's licensure details (ARE progress, NCARB, the Architectural Designer III level) are not on the site.

Open question: your guide's disclosures say services are provided as an architectural designer, not a licensed architect. The site does not say this. Decide whether to add that one sentence.
