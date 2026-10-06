# Editing the site visually

The site has a form-based editor at **/admin**, for example https://manedastudios.com/admin/. You log in, change text, prices, projects and images in plain forms, and press Save. The site republishes itself in 1 to 2 minutes. You never touch code.

## One-time setup: a GitHub access token
The editor saves your changes to GitHub. It needs a token that says "this person may edit this one project".

1. Sign in at github.com.
2. Click your profile picture, then **Settings**.
3. At the bottom of the left menu: **Developer settings**, then **Personal access tokens**, then **Fine-grained tokens**.
4. Click **Generate new token**.
5. Token name: `MDS site editor`. Expiration: 1 year (you will repeat these steps when it expires).
6. **Repository access:** choose **Only select repositories**, then pick `maneda-design-system`.
7. **Permissions:** open **Repository permissions** and set **Contents** to **Read and write**. Leave the rest alone.
8. Click **Generate token**. Copy it now. It starts with `github_pat_` and GitHub shows it only once.

## Logging in
1. Open `/admin/` on your site.
2. Click **Sign In Using Access Token** and paste the token.
3. Your browser remembers it. Treat the token like a password. If you lose it or share it by mistake, delete it on GitHub (same page) and make a new one.

## What you can edit
| In the left menu | What it changes |
|---|---|
| Page text: English / Portuguese | Every sentence on the pages, in each language. Open a section, change the words, Save. Keep both languages in step. |
| Prices and services | The three consultation prices, the site analysis prices, add-ons, credits, and the five service names. |
| Image slots | The gray frames. Click a slot, upload a picture, Save. |
| Projects | Case studies: text, images, and the show or hide switch. |
| Studio settings | Email, the reply promise, the on and off switches for Journal and Resources, and the launch switches. |
| Menus, buttons, footer | Button labels, menu names, footer lines, form messages. |
| Journal | Articles, when you start writing them. |

## Saving and publishing
Each Save is a published change. A few seconds later Cloudflare starts rebuilding. The new version is live in 1 to 2 minutes.

**Safety net.** Set Cloudflare's build command to `npm run build:safe` (see below). Then if an edit breaks a rule, such as an em dash or a banned word, Cloudflare refuses to publish it and the previous version stays live. Check the deployment list in Cloudflare if a change does not appear.

## Rules the checker enforces
- No em dashes.
- No banned words or diminutives.
- "Architect" only as a choice on the form, never as your title.
- The seal sentence stays exactly as written.
- Portuguese and English must have the same structure.

## Cloudflare setting (one time)
In Cloudflare: Workers and Pages, your project, **Settings**, **Build configuration**. Change **Build command** from `npm run build` to `npm run build:safe`. Save.

## Short videos
Short looping clips (muted, no sound, no controls) can fill an image slot or a service photo. They are added as files, not in the editor.
- For a slot: save `src/assets/videos/slots/<slot-id>.mp4`, a matching `.webm`, and a poster `<slot-id>.jpg`. The slot ids are the ones listed under "Image slots".
- For a service: the same three files in `src/assets/videos/services/<service-id>.*`. The ids are residential-design, interior-design, site-analysis, consultations, and construction-documents.
- Keep each clip 10 to 20 seconds and under 8 MB. The site plays it only while it is on screen, and shows the still poster to visitors who have reduced motion turned on.
- A clip takes the place of the image in that slot. Stock footage should only fill ambient spots, never a case study, and never with a caption that says it shows the studio's work.

## Good to know
- The editor writes to the same branch Cloudflare publishes. Today that is `claude/focused-cannon-kgwtpc`. When we move the site to `main`, ask me and I will point the editor at `main`.
- Images you upload from a project go in `src/assets`. Images for gray frames go in `src/assets/slots`.
- For a new project, use the same project number in English and Portuguese. The file name comes from the number.
- If the editor is ever unavailable, you can still edit files directly on GitHub, as the README explains, or ask me.
