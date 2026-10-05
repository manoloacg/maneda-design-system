# Content I still need from Manolo

Every placeholder on the site is written `[PLACEHOLDER: ...]` in the source and shows as a yellow flag in the preview. Run `npm run launch-check` to see the live count.

Done already: studio email (manedastudios@gmail.com), seal sentence in English (confirmed), home hero photo (the Ohio residence front render), rear render in design move 2, Web3Forms access key (the form now sends real email).

Domain: manedastudios.com, newly bought by Manolo, nothing hosted on it. Reply promise: within 1 business day (confirmed).

## Must have before launch

| # | Item | Where it goes |
|---|---|---|
| 5 | Written confirmation from the Ohio owner that the project, hero render and rear render may be published (verbal OK received) | Keep in your files |
| 6 | Ohio residence case study, still missing: size in SF, the outcome (permit and build status), images for design moves 1, 3, 4 and 5 (sauna plan, sight lines, bedroom egress before and after, garage and entry), an early sketch beside the final plan or elevation, and one sheet excerpt with the title block, owner name and address removed. Text drafted by Claude from the August 22 meeting minutes, still needs Manolo's read. | `src/content/projects/en/ohio-residence.md` and `pt/` |
| 7 | Written client approval before any real name or address appears (`clientApproved: true`). Not needed while the project stays anonymous. | Same files |
| 8 | Typical duration for each of the 6 process phases | `pages/en.json` and `pt.json`, `process.phases` |
| 9 | FAQ answers: permit timelines for the places you serve, how the professional of record is engaged and billed (including outside Florida), revision rounds per phase, CAD and model file delivery, deposit and payment schedule, which states and jurisdictions you serve and how local code review works outside Florida | `process.faq` |
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
