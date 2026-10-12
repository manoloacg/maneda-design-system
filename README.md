# Maneda Design Studios: Design System

Reference source of truth for brand identity. Pull from this repo for any design tool, artifact, or asset generation (Claude Design, Canva specs, web builds, proposals).

Maneda Design Studios is an architectural design practice. Principal: Manolo Castaneda, architectural designer with 10+ years of professional experience.

Archetype: Sage (dominant, 70%) + Hero (secondary, 30%). Sober, precise, collegial. No superlatives, no sales language, no em-dashes.

---

## Colors

| Token | Name | Hex | Usage |
|---|---|---|---|
| `--obsidian` | Obsidian | `#0D0D0D` | Primary background |
| `--charcoal` | Charcoal | `#1A1A1A` | Secondary background, cards |
| `--graphite` | Graphite | `#2C2C2C` | Borders, dividers, linework |
| `--slate` | Slate | `#4A4A4A` | Secondary accent |
| `--stone` | Stone | `#7A7A7A` | Muted text |
| `--mist` | Mist | `#B8B0A8` | Body text on dark |
| `--linen` | Linen | `#E8E2DA` | Light text, backgrounds |
| `--ivory` | Ivory | `#F5F2ED` | Headlines on dark |
| `--warm-white` | Warm White | `#FAFAF8` | Light-mode background |
| `--gold` | Gold | `#C4A882` | Accent only, never base |
| `--gold-light` | Gold Light | `#D4BC9E` | Hover states |
| `--gold-dark` | Gold Dark | `#A88B62` | Pressed states |

Rule: the palette is built on the materials of architecture: concrete, stone, shadow tones. Gold appears as a single accent, never as a base. No vibrant or saturated colors anywhere in the brand.

## Typography

- **Display / Headlines / Brand name:** Cormorant Garamond, weight 300, generous letter-spacing (0.08em on hero titles)
- **Body / Descriptions:** Montserrat Light (300), letter-spacing 0.05em, line-height 1.7 to 1.9
- **Captions / Labels / Categories:** Montserrat Medium (500), uppercase, letter-spacing 0.2 to 0.4em, small size (0.55 to 0.75rem)
- **Italic accents (quotes, taglines):** Cormorant Garamond italic, gold color

Google Fonts import:
```
https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap
```

## Professional Documents

Proposals, fee agreements, and project documents do not use the web typography or gold. They follow the document style: US Letter, Helvetica throughout, grays only (`#404040` headings, `#808080` body, `#BFBFBF` rules), logo top left on every page, footer with document title and page count. File naming: `MDS_<Client>_<Document-Type>.docx`. Deliver Word first, PDF only after approval.

## Voice

**Use:** design intent, program, site, massing, circulation, materiality, coordinate, resolve, document, deliver, from concept through construction documents.

**Avoid:** passionate about design, dream home, stunning, award-winning, one-stop shop, DM me, special prices, years of experience, dedicated professional.

Bio structure (three moves, order fixed): (1) value proposition: what the client gets, (2) credential: 10+ years of architectural design practice, (3) call to action: direct, no pressure.

## Services

Organized by design phase. Confirm scope language per project before use.

1. Schematic Design: program, site analysis, layout options, massing, renderings
2. Design Development: coordinated plans, elevations, sections, materials, systems
3. Construction Documents: permit and construction-ready drawing sets, notes, details
4. Permitting and Construction Support: jurisdiction coordination, responses to comments, RFIs

## Social Content Structure (Instagram, LinkedIn)

Rhythm of 3: project image → project image → text. Never two text posts in a row. Never three images of the same type in a row; alternate drawings, renderings, models, built work, and process. Text posts under 5 visible lines.

Image content, in priority order: drawings and plans, renderings, models and process sketches, built work, site conditions. Present the design decision, not only the result.

## Visual Posture (profile / on-site images)

1. Always in architectural context: studio, drafting table, site, or project, never a neutral backdrop
2. Serious but approachable expression, direct eye contact, no forced smile
3. Neutral dark wardrobe: black, gray, dark beige, no visible logos
4. Tools of the practice (scale, drawings, laptop with a model open) present as natural extensions, not props
5. Same treatment as the project imagery: dark, contrasted, warm shadow tint
6. Post with purpose, not on a schedule

## Files in this repo

- `README.md`: this file, full identity overview
- `tokens.css`: CSS custom properties for the palette, ready to import into any build
- `brand.json`: machine-readable version of colors, type, voice, services, and logo paths
- `VOICE.md`: bio structure, positioning, tone rules, manifesto
- `Logos/`: all logo files and usage rules (see `Logos/README.md`)

## How to point a tool at this repo

**Claude Design / Claude (this chat or Cowork):** share the GitHub repo URL, or the raw file URLs, in a prompt. Claude will fetch and use it as spec.

**Canva:** no live sync. Open Canva → Brand Kit → upload the logo files from `Logos/`, enter the hex codes from this README or `brand.json`, and add the two font families. Update the Brand Kit by hand any time this repo changes. Treat this repo as the master copy, Canva as a mirror.

**Any code build (website, app):** import `tokens.css` directly, or parse `brand.json`.

## Source

Derived from `Identity.html` (internal brand guide) and `Bio.docx` (positioning guide). Update this repo if either source document changes.
