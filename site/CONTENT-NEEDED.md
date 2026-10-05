# Content still needed from Manolo

Every placeholder on the site is marked `[PLACEHOLDER: ...]` in the source and shows as a yellow flag in the preview. This list grows each phase.

## Needed now (Phase 1)

| Item | Where it goes | Status |
|---|---|---|
| Studio email | `src/content/site.json` (`email`) | Done: manedastudios@gmail.com. A domain email is better for credibility later. |
| Domain name | `src/content/site.json` (`url`) | Open. Canonical and hreflang tags use a temporary address until set. |
| Web3Forms access key | `src/content/site.json` (`form.accessKey`) | Open. Created in Phase 2 setup. |
| Seal sentence (EN) | `src/i18n/en.json` (`footer.seal`) | Confirmed by Manolo. The Portuguese version is a translation and still needs a native read. |
| Reply window promise | `src/content/site.json` (`replyWindow`) | Open |
| Instagram link, once live | `src/content/site.json` (`social.instagram`) | Open. Hidden until filled. |
| Vector (SVG) logo source | `Logos/` | Open. Web PNGs are generated from the large PNGs. |
| Replacement for `Logos/primary-square-white.png` | `Logos/` | That file is a cropped piece of the mark with no wordmark. The site uses a white version derived from the horizontal black lockup instead. |

## Needed for Phase 2 content

| Item | Where it goes | Status |
|---|---|---|
| Hero photo | Home page hero | Open |
| Details for the 3 case studies (brief, context, 3 design moves each with a sketch or 3D view, sketch to final pair, one sheet excerpt, outcome) | `src/content/projects/en/*.md` and `pt/*.md` | Open. Do not publish until each project is approved. |
| Permission for each project (`clientApproved`) | Same files | Open. Defaults to false. |
| Typical duration for each of the 6 phases | `pages/en.json` and `pt.json`, `process.phases` | Open |
| FAQ answers: permit timelines, professional of record, revision rounds, file formats, payment schedule, counties served | `process.faq` | Open |
| Reply window promise | `site.json` (`replyWindow`) | Open |
| Portrait | About page | Open |
| About page "What I value" in your own words | `about.values` | Open |
| Confirm the line "Manolo is completing the ARE toward Florida licensure." | `about.story` | Open. Confirm exact wording. |
| Confirm service inclusions and not-included lists for all five services, especially consultations | `services.items` | Open. Drafted by Claude, not by Manolo. |
| What moves a site analysis above $700 | `services.items.site-analysis.pricingNote` | Open |
| Native Portuguese read of all Portuguese copy | `pt.json` files | Open |
| Privacy policy date and legal review | `privacy` | Open |
| Web3Forms access key | `site.json` | Open. Form stays in test mode until set. |

## Coming in later phases

Hero photo, project photos and drawings, project approvals (`clientApproved`), portrait, real jurisdictions, typical durations per phase, FAQ answers, the checklist PDF content.
