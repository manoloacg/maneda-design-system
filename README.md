# Maneda Photography — Design System

Reference source of truth for brand identity. Pull from this repo for any design tool, artifact, or asset generation (Claude Design, Canva specs, web builds).

Archetype: Sage (dominant, 70%) + Hero (secondary, 30%). Sober, precise, collegial. No superlatives, no sales language, no em-dashes.

---

## Colors

| Token | Name | Hex | Usage |
|---|---|---|---|
| `--obsidian` | Obsidian | `#0D0D0D` | Primary background |
| `--charcoal` | Charcoal | `#1A1A1A` | Secondary background, cards |
| `--graphite` | Graphite | `#2C2C2C` | Borders, dividers |
| `--slate` | Slate | `#4A4A4A` | Secondary accent |
| `--stone` | Stone | `#7A7A7A` | Muted text |
| `--mist` | Mist | `#B8B0A8` | Body text on dark |
| `--linen` | Linen | `#E8E2DA` | Light text, backgrounds |
| `--ivory` | Ivory | `#F5F2ED` | Headlines on dark |
| `--warm-white` | Warm White | `#FAFAF8` | Light-mode background |
| `--gold` | Gold | `#C4A882` | Accent only — never base |
| `--gold-light` | Gold Light | `#D4BC9E` | Hover states |
| `--gold-dark` | Gold Dark | `#A88B62` | Pressed states |

Rule: the palette is built on absence of color — stone, concrete, shadow tones. Gold appears as a single accent, never as a base. No vibrant, saturated, or warm colors anywhere in the brand.

## Typography

- **Display / Headlines / Brand name:** Cormorant Garamond, weight 300, generous letter-spacing (0.08em on hero titles)
- **Body / Descriptions:** Montserrat Light (300), letter-spacing 0.05em, line-height 1.7–1.9
- **Captions / Labels / Categories:** Montserrat Medium (500), uppercase, letter-spacing 0.2–0.4em, small size (0.55–0.75rem)
- **Italic accents (quotes, taglines):** Cormorant Garamond italic, gold color

Google Fonts import:
```
https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap
```

## Voice

**Use:** Reveal, Interpret, Understand, Communicate, the intent behind, what the project meant to say, with the eye of someone who designs, before raising the camera.

**Avoid:** Passionate about photography, capture unique moments, incredible photos, DM me, special prices, years of experience, dedicated professional.

Bio structure (three moves, order fixed): (1) value proposition — what the client gets, (2) credential — architectural design background, (3) call to action — direct, no pressure.

## Instagram Feed Structure

Rhythm of 3: photo → photo → text. Never two text posts in a row. Never three photos of the same type. Text posts under 5 visible lines.

## Visual Posture (profile / on-camera photos)

1. Always in architectural context — never a neutral studio background
2. Serious but approachable expression, direct eye contact, no forced smile
3. Neutral dark wardrobe — black, gray, dark beige, no visible logos
4. Camera present as natural extension, not a prop
5. Same edit treatment as the portfolio — dark, contrasted, warm shadow tint
6. Post with purpose, not on a schedule

## Files in this repo

- `README.md` — this file, full identity overview
- `tokens.css` — CSS custom properties for the palette, ready to import into any build
- `brand.json` — machine-readable version of colors, type, voice, and logo paths
- `VOICE.md` — full bio structure, positioning, tone rules, manifesto
- `logos/` — all logo files and usage rules (see `logos/README.md`)

## How to point a tool at this repo

**Claude Design / Claude (this chat or Cowork):** share the GitHub repo URL, or the raw file URLs, in a prompt. Claude will fetch and use it as spec.

**Canva:** no live sync. Open Canva → Brand Kit → upload the logo files from `logos/`, enter the hex codes from this README or `brand.json`, and add the two font families. Update the Brand Kit by hand any time this repo changes — treat this repo as the master copy, Canva as a mirror.

**Any code build (website, app):** import `tokens.css` directly, or parse `brand.json`.

## Source

Derived from `Identity.html` (internal brand guide) and `Bio.docx` (positioning guide). Update this repo if either source document changes.
