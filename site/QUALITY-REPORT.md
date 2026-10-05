# Quality report (Phase 4)

Run on the final build of 33 pages, English and Portuguese.

| Area | Test | Result |
|---|---|---|
| Performance | Lighthouse mobile: home, case study, PT home, services, process, contact | 100 on every page |
| Accessibility | Lighthouse mobile, same pages | 100 |
| Accessibility | axe-core, WCAG 2.0 and 2.1 A and AA plus best practices, 33 pages at 375px and 1440px | 0 violations |
| Best practices | Lighthouse mobile | 100 |
| SEO | Lighthouse mobile | 100 on home, PT home, services, process, contact. Case study: 100 with real text. 69 while it holds placeholder text, because it is noindex by design (exception, see below). |
| Layout shift | CLS on tested pages | 0 to 0.001 |
| Load | LCP, TBT on tested pages | 1.4 s, 0 ms |
| JavaScript | Total per page | Under 3 KB inline. No JavaScript files. Target was 100 KB. |
| Responsive | 33 pages at 375, 768, 1024, 1440 px | 0 horizontal scroll |
| Tap targets | Every visible control at all four widths | 0 under 44px |
| Keyboard | Skip link first, moves to main, visible focus ring on 14 of 14 tab stops | Pass |
| Console | Errors and failed requests at all four widths | 0 |
| Images | Width and height set on every image | Pass |
| Links | Internal links and anchors in the build | 0 broken |
| Em dashes | Source and built pages | 0 |
| Banned words, diminutives, emoji | Source and built pages | 0 |
| Legal wording | "architect" only as a visitor choice on the form. "licensed" only in the seal sentence. No mention of ARE or licensure. | Pass |
| Metadata | Unique title and description per indexable page, canonical, hreflang, Open Graph | Pass |
| Spelling | English and Portuguese, built text | 0 errors found. Flagged words were valid terms and hex codes. |
| Bilingual structure | EN and PT files match key for key | Pass |
| Browser behavior | Form validation, test mode, pre-selection, language memory, banner, filter, downloads | 26 of 26 |

## Exceptions and notes

- **Case study SEO 69 with placeholders.** Lighthouse fails only "page is not crawlable", because pages with `[PLACEHOLDER]` text are noindex on purpose. With real text the same page scores 100, tested.
- **Lighthouse was run with indexing temporarily on**, since the site ships with indexing off until launch. It was set back to off afterwards.
- **Desktop navigation now starts at 1280px.** Below that the menu button is used. Portuguese labels did not fit in a single row at 1024px.
- **Spelling was machine-checked only.** A native Portuguese reader should still read all Portuguese copy.
- **Not measured here:** real-device testing, and Lighthouse on the live domain. Both belong in Phase 5 after deploy.

## Fixes made in this phase

- Home service links now read "Read more about Residential design" so each link is distinct.
- Footer and header navigation have different landmark names.
- The language banner and the mobile quote bar sit inside labeled landmarks.
- Work page cards use H2 under the H1, so heading levels do not skip.
- Logo link, header links and footer links are at least 44px.
- Desktop navigation breakpoint moved from 1024px to 1280px.
- Journal list columns fixed at 768px.
- Long page titles shorten to "| MDS".
- Portuguese "área construível" changed to "área edificável".
