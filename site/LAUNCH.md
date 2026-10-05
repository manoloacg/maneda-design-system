# Launch guide

Plain-language steps to put the Maneda Design Studios site online. Nothing here has been done yet. No domain, DNS, form account, analytics, or deploy has been connected.

Prices and screen names for outside services change. Where this guide names a button or a cost, check it on the service's own page at the time.

## 1. What you decide first

| Decision | Why it matters |
|---|---|
| Domain name | Everything else points to it. Nothing can go live without it. |
| Studio email | The form sends inquiries here. Currently manedastudios@gmail.com. |
| Which real projects are public | Each case study needs your approval and real content. |

Domain ideas. Check each one is free and not confusing:
- manedadesignstudios.com
- manedastudios.com. Your brand file lists this for Maneda Photography. If it belongs to the photography business, decide whether the two businesses share a domain.

A .com usually costs about $10 to $15 per year. Check the price when you buy.

## 2. Accounts you need (all have free plans)

1. **Cloudflare.** Hosts the site and can sell and manage the domain.
2. **Web3Forms.** Delivers form submissions to your email.
3. **GitHub.** You already have this. The site code is in the repo `manoloacg/maneda-design-system`, folder `site`.

Optional later: Google Business Profile, Google Search Console, Bing Webmaster Tools.

## 3. Set up the form (Web3Forms)

1. Go to web3forms.com and enter the studio email.
2. Confirm the email they send you. They give you an **access key**.
3. Open `src/content/site.json` and replace `[PLACEHOLDER: Web3Forms access key]` with the key.
4. If their dashboard offers an "allowed domains" setting, add your domain.
5. Check whether your plan includes an automatic reply to the visitor. If it does, paste in the text from `src/content/pages/en.json` and `pt.json`, under `contact.confirmationEmail`. If it does not, the thank-you page already confirms receipt.
6. Fill in the reply promise in `site.json` (`replyWindow`). Only promise what you will keep.

The access key is visible in the page source. That is normal for this service. Spam is blocked by a hidden trap field and the service's own filters. After deploying, send one real test inquiry in English and one in Portuguese, and confirm both arrive.

## 4. Get a private preview first (no launch)

You can see the real site online before it is public.

1. In Cloudflare, go to Workers and Pages, then Create, then Pages, then Connect to Git.
2. Choose the repo `manoloacg/maneda-design-system`.
3. Use these settings:
   - Framework preset: Astro
   - Root directory: `site`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable: `NODE_VERSION` = `22`
4. Cloudflare builds the branch and gives you a `.pages.dev` address.

While `"indexing": false` is set in `site.json`, the preview tells search engines to stay away. Share the link only with people you trust.

## 5. Connect the domain

**Check first.** Your brand file lists manedastudios.com as the website of Maneda Photography. If a site already lives there, pointing the domain at this one replaces it. If photography uses it, give MDS the main address and move photography to a subdomain such as photo.manedastudios.com first. Ask me and I will write those steps.

1. Buy the domain in Cloudflare, or add your existing domain to Cloudflare so it manages the DNS.
2. In the Pages project, open Custom domains and add the domain. Cloudflare sets up the DNS records and the HTTPS certificate.
3. Choose one main address, with or without `www`, and send the other to it. Use a redirect rule in Cloudflare.
4. Put the exact main address in `site.json` (`url`), for example `https://manedadesignstudios.com`. The sitemap, canonical tags and share links all use it.

## 6. Launch day, in this order

1. Replace every placeholder. Run `npm run launch-check` to see what is left. It lists blockers in plain language.
2. Put the real checklist PDFs in `public/resources`, with the same file names.
3. Delete the internal style guide: `src/pages/styleguide.astro`, `src/pages/pt/styleguide.astro`, and `src/components/StyleGuide.astro`.
4. Set `"url"` to the real domain in `site.json`.
5. Set `"indexing": true` in `site.json`. This is the switch that lets Google see the site.
6. Run `npm run build`, then `npm run check`. Both must pass.
7. Merge to the main branch. Cloudflare publishes it.
8. Verify the live site (section 7).

If anything looks wrong, set `"indexing": false` again and push. Cloudflare also keeps every earlier version, and you can roll back to one from the Pages dashboard.

## 7. Check the live site

- Open `/robots.txt`. It should say `Allow: /` and list the sitemap.
- Open `/sitemap.xml`. It should list real pages only, in both languages.
- Send a real form inquiry in English and in Portuguese.
- Switch language on three different pages. You should land on the matching page.
- Open the site on your own phone, on mobile data.
- Run Lighthouse on the live home page and one case study. Targets: 95 or higher on all four scores.
- Paste the address into securityheaders.com to confirm the security headers are active.

## 8. Search tools (after launch)

Do these only after you approve. None are set up.

**Google Business Profile**
- Choose "service area business". You can hide your address from the public. Google may still ask for it to verify you.
- Use the exact name "Maneda Design Studios".
- Pick a business category from Google's list that describes design work. Do not choose the architect category. You are not a licensed architect.
- Add services and the website address. Google limits a profile's service area to places within about two hours' drive of your base, so check Google's current rules. Work outside that range is reached through the website, not the profile.
- Add photos only of real MDS work.
- Verification may need a video or a postcard. Follow what Google asks.

**Google Search Console**
- Add a Domain property and verify it with the DNS record Google gives you. Add that record in Cloudflare.
- Submit `https://your-domain/sitemap.xml`.
- Use URL Inspection on the home page and ask for indexing.

**Bing Webmaster Tools**
- Sign in and import the site from Google Search Console, or add the site and submit the same sitemap.

## 9. Analytics (optional)

Cloudflare Web Analytics does not use cookies. To turn it on:
1. In Cloudflare, create a Web Analytics site and copy the token.
2. In `site.json`, set `analytics.enabled` to `true` and paste the token.
3. The privacy page changes its wording automatically.

## 10. After launch

- Replace placeholder case studies with real ones, one at a time, with approval. Keep `clientApproved: false` unless the client approved real names in writing.
- Ask real clients for reviews. Never publish a review you did not receive.
- Write journal posts from the outline. Add city pages only when you can write real, different local content for each.
- Replace the logo PNGs with an SVG when you have the original file.

## Rough costs

Domain: about $10 to $15 per year. Hosting, form service and analytics: free plans cover this site's size. Check each plan's current limits.
