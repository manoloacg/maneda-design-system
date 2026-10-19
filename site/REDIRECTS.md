# Redirects

The site is hosted on Cloudflare Pages. Path redirects (an old address on this domain to a new one) go in `public/_redirects` and deploy with the site. Host redirects, such as `www` to the root domain, cannot be done there: Pages `_redirects` only matches paths, not hostnames. They are set once in the Cloudflare dashboard.

## www to the root domain (301)

Goal: every `https://www.manedastudios.com/<path>?<query>` answers with a permanent 301 to `https://manedastudios.com/<path>?<query>`.

1. Log in at dash.cloudflare.com and open the `manedastudios.com` zone (the domain, not the Pages project).
2. Check the DNS record first: **DNS > Records**. There must be a record named `www` with the proxy status **Proxied** (orange cloud). If it is "DNS only" (gray cloud), click Edit and switch it to Proxied. The redirect rule only runs on proxied traffic.
3. Go to **Rules > Redirect Rules** and click **Create rule**. If Cloudflare offers the template **Redirect from WWW to root**, you can use it and check that the settings match step 4. Otherwise build it by hand:
4. Settings:
   - **Rule name:** `www to root`
   - **If incoming requests match:** Custom filter expression
     - Field: `Hostname`, Operator: `equals`, Value: `www.manedastudios.com`
   - **Then:**
     - Type: `Dynamic`
     - Expression: `concat("https://manedastudios.com", http.request.uri.path)`
     - Status code: `301`
     - **Preserve query string:** checked
5. Click **Deploy**.
6. Leave `www.manedastudios.com` attached to the Pages project as a custom domain. It keeps the certificate valid. The rule answers before Pages does.

### Check it

Open a terminal and run:

```
curl -sI "https://www.manedastudios.com/services/?test=1"
```

You should see `HTTP/2 301` and `location: https://manedastudios.com/services/?test=1`. Also try `http://www.manedastudios.com/` (it may take two hops: http to https, then www to root; both must be 301).

Then in Google Search Console, use **URL Inspection** on `https://www.manedastudios.com/` and request indexing. Google will see the redirect and drop the duplicate over the next few weeks.

### The pages.dev address

The project also answers at its `*.pages.dev` address. That domain belongs to Cloudflare, so no redirect rule can be set on it. Every page names `https://manedastudios.com/...` as its canonical, which is the correct signal for Google. Do not link to the pages.dev address anywhere.

## Portuguese slugs (path redirects in `public/_redirects`)

Portuguese detail pages use Portuguese addresses, set in `src/i18n/slugs.json`. Content files and service ids keep their English names; only the `/pt/` address changes. The old English-slug addresses answer with a 301 to the new ones, with and without the trailing slash:

| Old | New |
|---|---|
| /pt/servicos/residential-design/ | /pt/servicos/projeto-residencial/ |
| /pt/servicos/interior-design/ | /pt/servicos/design-de-interiores/ |
| /pt/servicos/site-analysis/ | /pt/servicos/analise-de-terreno/ |
| /pt/servicos/consultations/ | /pt/servicos/consultorias/ |
| /pt/servicos/full-design/ | /pt/servicos/projeto-completo/ |
| /pt/trabalhos/industrial-site-plan/ | /pt/trabalhos/implantacao-industrial/ |
| /pt/trabalhos/ohio-residence/ | /pt/trabalhos/residencia-ohio/ |
| /pt/trabalhos/wood-shop/ | /pt/trabalhos/oficina-de-marcenaria/ |
| /pt/artigos/architect-or-residential-designer/ | /pt/artigos/arquiteto-ou-designer-residencial/ |

For a new project or article, add its Portuguese slug to `slugs.json` before it goes live. Then no redirect is needed. If you ever change a slug that is already live, add a line to `public/_redirects`: `old-path new-path 301`.

### Check it after the deploy

```
curl -sI https://manedastudios.com/pt/trabalhos/ohio-residence/
```

You should see `HTTP/2 301` and `location: /pt/trabalhos/residencia-ohio/`.
