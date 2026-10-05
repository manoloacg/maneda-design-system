# Content I still need from Manolo

Every placeholder on the site is written `[PLACEHOLDER: ...]` in the source and shows as a yellow flag in the preview. Run `npm run launch-check` to see the live count.

Done already: studio email (manedastudios@gmail.com), seal sentence in English (confirmed), home hero photo, Web3Forms access key (the form now sends real email).

Tentative: domain manedastudios.com. Confirm it is registered to MDS. Your brand file lists it for Maneda Photography, so decide whether the two businesses share it.

## Must have before launch

| # | Item | Where it goes |
|---|---|---|
| 1 | Confirm the domain manedastudios.com (see above) | `src/content/site.json` (`url`) |
| 3 | Reply promise, for example "within 1 business day", in English and Portuguese | `site.json` (`replyWindow`) |
| 5 | Which of the three projects you approve for public case studies | `src/content/projects/` |
| 6 | For each approved project: the brief, the site and code context, 3 design moves with a sketch, diagram or 3D view each, an early sketch beside the final plan or elevation, one sheet excerpt, and the outcome | `src/content/projects/en/*.md` and `pt/*.md` |
| 7 | Written client approval before any real name or address appears (`clientApproved: true`) | Same files |
| 8 | Typical duration for each of the 6 process phases | `pages/en.json` and `pt.json`, `process.phases` |
| 9 | FAQ answers: permit timelines by county and city, how the professional of record is engaged and billed, revision rounds per phase, CAD and model file delivery, deposit and payment schedule, counties served | `process.faq` |
| 10 | Portrait of Manolo, in an architectural setting | About page |
| 11 | "What I value" in Manolo's own words (three short statements) | `about.values` |
| 12 | Confirm or correct the service inclusions, exclusions and deliverables for all five services, especially consultations. These were drafted by Claude. | `services.items` in both page files |
| 13 | What moves a site analysis above the $700 starting price | `services.items.site-analysis.pricingNote` |
| 14 | Checklist PDF, English and Portuguese, plus the three section titles for the Resources page | `public/resources/` and `resources.contents.items` |
| 15 | Privacy policy date and a legal review | `privacy` in both page files |
| 16 | A native Portuguese read of all Portuguese copy, including the Portuguese seal sentence | `pt.json` files |

## Should have

| Item | Notes |
|---|---|
| Outlines for three more journal topics: what a site analysis includes, how a designer works with a builder, design cost versus construction cost | Journal template is ready |
| Real jurisdiction notes for any city page | None are built. Only add a city when the content is real and different from the others. |
| Instagram link once the account is live | `site.json` (`social.instagram`). Hidden until filled. |
| Vector (SVG) logo files | The brand folder has PNG only. Also re-export `primary-square-white.png`, which is a cropped file with no wordmark. |
| A studio email on your own domain | Better for credibility than Gmail. Cloudflare Email Routing can forward it to Gmail. |
| Share images per page | Case studies use their own hero photo once supplied. Other pages use the default image in `public/images/og-default.png`. Supply branded images if you want them. |

## Decisions that stay with Manolo

- Whether to turn on analytics (LAUNCH.md section 9).
- Whether to follow up with checklist downloads by email. This needs an email tool and is a separate decision.
- Whether Maneda Photography is ever linked from this site. Default: no.
- The launch switch: `"indexing": true` in `site.json`. Nothing is public to search engines until this is set.
