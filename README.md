# Epoxy Flooring Astro Template

Currently skinned for **East Texas Concrete Coatings**. A single-page marketing site for an epoxy flake and marble epoxy flooring contractor serving residential and commercial customers (garages, warehouses, showrooms, patios), built with [Astro](https://astro.build). Branding, contact details, navigation, and all section content live in one JSON file, so the template can be reused for a new client without touching component code.

Sections: sticky header, full-bleed hero, services grid, filterable project gallery with lightbox, FAQ accordion, quote-request form, footer. Plus a placeholder privacy page.

## Quick start

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve dist/ locally
```

## Configuration

Edit `src/config/site.json`. Every component reads from it through the typed helper in `src/lib/config.ts`, so a typo in a key name shows up as a type error in your editor.

| Key           | Controls |
| ------------- | -------- |
| `company`     | Name, tagline, description, logo, year founded, an optional `license` line, and `shareImage` (the picture shown when the site is shared on social media). `name` is the wordmark in the header and footer. |
| `contact`     | Phone, optional `altPhone`, email, address, hours, service area, and the optional `bookingNote`. Used by the header, contact section, footer, and search-engine metadata. |
| `social`      | Social links in the contact section and footer. `platform` picks the icon: `instagram`, `facebook`, `youtube`, `tiktok`, `google`, `yelp`, `linkedin`, `x`. |
| `nav`         | Header links and footer quick links. |
| `header`      | The header button (`cta`, remove it to hide) and whether the phone number shows (`showPhone`). |
| `hero`        | `layout` (`photo` or `banner`, see below), eyebrow, headline, subheading, image, buttons, the `highlights` check list, and the optional stats row. |
| `services`    | Service cards. `icon` picks from: `garage`, `marble`, `forklift`, `sun`, `storefront`, `grinder`, `roller`, `shield`, `droplet`, `ruler`. `features`, `bestFor`, and `startingAt` are optional. |
| `portfolio`   | Gallery items, the category filter buttons, and the optional `options` block ("Our Options": floor systems with CSS-drawn swatches from a `colors` list, plus a `finishes` chip row). |
| `pages`       | Extra pages keyed by URL slug (`"full-flake"` becomes `/full-flake`), each with a title, intro, image, sections (paragraphs, bullets, or numbered steps), and a button. Link an option card to one with its `href`; `newTab: true` opens it in a new tab. |
| `faq`         | Question-and-answer accordion. Optional: delete the key or empty `items` to hide the section. Search engines read it as FAQ structured data. |
| `contactForm` | Form heading, the property / project / timeline dropdown options, button label, and submission endpoint. |
| `footer`      | Legal line and extra links. |
| `theme`       | Brand colors, injected as CSS custom properties. `onAccent` sets the text color on accent-colored buttons. |

### Changing the logo and company name

```json
"company": {
  "name": "East Texas Concrete Coatings",
  "logo": { "src": "/brand/logo.png", "alt": "East Texas Concrete Coatings logo", "showName": true }
}
```

- **Icon + name** (default): put your mark in `public/` and point `logo.src` at it. PNG, SVG, or WebP all work.
- **Name only**: set `logo.src` to `""`. The name renders as a condensed uppercase wordmark.
- **Logo image only**: set `showName` to `false`, for logos that already include the name.

Brand artwork lives in `public/brand/`: `banner.png` (the hero banner and social share image), `logo.png` (the Texas-flag mark, cropped from the merch sheet), `merch.jpg`, and `banner-rounded.jpg`. `public/favicon.png` is the same mark at 128px. Replace `logo.png` with a transparent PNG of the official mark when one is available.

### Contact information

Everything under `contact` updates the header phone link, the contact section, the footer, and the structured data search engines read. `address.street` and `address.zip` are optional, so a mobile-only crew can list just a city and state.

### Adding project photos

1. Drop image files into `src/assets/images/`.
2. Reference them by filename in `site.json`:

```json
{
  "src": "smith-garage.jpg",
  "alt": "Two-car garage with a gray and blue full-flake epoxy floor",
  "title": "Two-Car Garage, Full Flake",
  "system": "1/4\" Tidal Wave blend · polyaspartic topcoat",
  "location": "Katy, TX",
  "category": "Garages",
  "orientation": "landscape"
}
```

Images in that folder are converted to WebP and resized into responsive sizes at build time, so you can drop in full-resolution phone photos without slowing the site down. The lightbox uses a version capped at 2400px.

- `portfolio.grid` is `uniform` by default: every tile is the same 3:2 shape with even gaps. Set it to `mixed` to let each item's `orientation` shape its tile: `landscape` (3:2), `wide` (spans two columns), `square`, or `portrait` (4:5).
- `category` must match one of `portfolio.categories` for the filter buttons to find it. Remove a category from the list to hide its button.
- `system` and `location` are optional and show in the caption and lightbox.
- A `src` starting with `/` (a file in `public/`) or `https://` is used as-is, without optimization.
- A filename that doesn't exist stops the build with a message naming the missing file.

All gallery photos are the client's own job photos. Captions (blend names, towns, square footage) are placeholders to replace with the real job details. The original illustrated placeholders are parked in `src/assets/images/placeholders/`, where the site ignores them.

For the hero, `hero.imagePosition` (for example `"center 60%"`) sets which part of the image stays in frame when it's cropped.

### Hero layouts

- **`"layout": "banner"`** (current): shows `hero.image` sharp across the top of the page, with a blurred copy filling the section behind it and the headline, buttons, and highlights below. `imageFit: "cover"` fills the width and crops; `imageFit: "contain"` shows the whole graphic uncropped, with rounded corners masked to match the East Texas banner. `hideImage: true` (current) drops the sharp graphic and keeps only the blurred backdrop behind the headline.
- **`"layout": "photo"`**: a full-screen background image with the headline laid over it and the header floating transparently on top. With a clean job-site photo, leave `imageBlur` at 0. With a graphic that has its own lettering, set `imageBlur` to a few px (currently 8) so it becomes a soft, darkened backdrop and the headline stays readable.

### Contact form

The form collects name, phone, email, ZIP, property type, project type, square footage, timeline, and a message, with a hidden honeypot field to catch bots.

- **With a form service**: set `contactForm.action` to your endpoint (Formspree, Basin, Netlify Forms, Web3Forms, or your own API) and `method` to `POST`. The form submits with `fetch` and shows `successMessage` inline.
- **Without one** (default, `action: ""`): submitting opens the visitor's email app with the request pre-written to `contact.email`. Good enough for a demo; use a real endpoint before launch so requests are never lost.

### Theme

```json
"theme": {
  "background": "#0b0d10",
  "surface": "#14171c",
  "text": "#f2f4f7",
  "accent": "#1a7fe0",
  "accentDark": "#1465b4",
  "onAccent": "#ffffff"
}
```

The current theme is near-black with East Texas Concrete Coatings' blue. Swap `accent` for another brand color; `accentDark` is the hover state and `onAccent` is the button text color (use a dark value for light accents like orange or yellow). Fonts are Barlow Condensed for headings and Inter for body text, set in `src/styles/global.css`.

## Project structure

```
src/
  config/site.json         All content and settings
  lib/config.ts            Types + helpers (address, tel:, image resolution)
  layouts/BaseLayout.astro Head tags, theme variables, JSON-LD, header/footer
  components/
    Header.astro           Sticky nav, mobile menu, phone + CTA
    Hero.astro             Full-bleed image, headline, highlights, stats
    Services.astro         Service card grid
    Portfolio.astro        Filterable gallery + lightbox
    Faq.astro              Accordion of common questions
    Contact.astro          Details + quote form
    Footer.astro
    Logo.astro / SiteImage.astro / ServiceIcon.astro / SocialIcon.astro
  pages/index.astro        Assembles the sections
  pages/[slug].astro       One route per entry under `pages` in site.json
  pages/privacy.astro      Placeholder policy page
  assets/images/           Gallery and hero images (optimized at build)
public/brand/              banner.png, logo.png, merch.jpg
public/favicon.png
```

## Deploying

`npm run build` produces a fully static `dist/` folder. Deploy it to Netlify, Vercel, Cloudflare Pages, GitHub Pages, or any static host. Set `site` in `astro.config.mjs` to the production URL so canonical links and social previews resolve correctly.
