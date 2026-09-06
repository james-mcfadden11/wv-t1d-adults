# WV T1D Adults Website — Project Summary

## What It Is

A static HTML website for **WV T1D Adults**, a nonprofit community group for adults living with type 1 diabetes in West Virginia. The site is live at **https://wvt1dadults.org**, hosted on Netlify (free tier), with the domain registered/DNS managed through SiteGround.

The organization is sponsored by **Ties for Tim** and **Camp Kno-Koma**.

---

## Technology Stack

| Layer | Choice |
|---|---|
| HTML | Plain HTML5, no framework or build tool |
| CSS | Single `styles.css` file, CSS custom properties for theming |
| JavaScript | Single `script.js`, vanilla JS only |
| Fonts | Google Fonts (Crimson Pro + Work Sans) |
| Icons | Font Awesome 6.5 (used only on `connect.html`) |
| Hosting | Netlify (drag-and-drop deploy — no CI/CD pipeline) |
| Domain/DNS | SiteGround (ns1/ns2.siteground.net) |

There is no backend, database, build system, or npm/package.json. Updates are deployed by dragging the folder into Netlify's dashboard.

---

## File Structure

```
wv-t1d-adults/
├── index.html              # Home page
├── about.html              # Mission + leadership team bios
├── connect.html            # Social media links + email
├── upcoming-events.html    # Current event flyers + signup links
├── past-events.html        # Archive of past event flyers
├── gallery.html            # Photo gallery (auto-generated)
├── tims-story.html         # Tim's memorial/story page
├── styles.css              # All site styles
├── script.js               # Mobile nav + hero carousel logic
├── generate-gallery.py     # Script to rebuild gallery.html from images/
├── generate-gallery.sh     # Shell wrapper for the Python script
├── favicon.svg             # Favicon (SVG)
└── images/
    ├── WVT1D.PNG           # Logo (used in nav + favicon fallback)
    ├── logo.svg            # SVG logo variant
    ├── about-us/           # Leader photos (Maddie, Emmy, Tammy)
    ├── gallery/            # 132 community photos (PNG/JPG, hash-named)
    ├── hero/               # Hero carousel images (2023–2025)
    ├── past-events/        # Past event flyers (10 images)
    ├── tims-story/         # Tim's photo + story flyer
    ├── upcoming-events/    # Current event flyers
    └── archived-images/    # Old logo
```

---

## Pages

### Home (`index.html`)
- Hero section with an **auto-advancing carousel** (5 images, 5-second interval) showing photos from 2023–2025 events
- Three quick-link cards: Meet Our Team, Upcoming Events, Connect With Us
- Tagline: "Building Community, Creating Connections"

### About Us (`about.html`)
- Mission statement block
- Leadership grid with photo + bio for each of 3 leaders:
  - **Maddie** — clinical pharmacist, Camp Kno-Koma Board President, T1D since age 7
  - **Emmy** — nurse, CDCES, Cardiometabolic Educator, 22 years with T1D
  - **Tammy** — attorney at Goodwin & Goodwin LLP, T1D advocate, son diagnosed at 11

### How to Connect (`connect.html`)
- Cards linking to: Email, Facebook Page, Facebook Group, Instagram (@wvt1d_adults), WhatsApp group

### Upcoming Events (`upcoming-events.html`)
- Currently shows the **2026 Summer Retreat** flyer with a Microsoft Forms signup link

### Past Events (`past-events.html`)
- 10 event flyer images in reverse-chronological order:
  - Dinner Sept 2025, Rafting Sept 2025, Tailgate Aug 30 2025, Retreat 2025
  - Tailgate Sept 7 2024, Retreat 2024, Basketball March 2
  - Retreat 2023, Meet & Greet (x2)

### Photo Gallery (`gallery.html`)
- Responsive CSS grid of **132 community photos**
- Images use `loading="lazy"` for performance
- **Regenerated** by running `python3 generate-gallery.py` — the script scans `images/gallery/` and rewrites `gallery.html` automatically

### Tim's Story (`tims-story.html`)
- Side-by-side layout: Tim's photo + a story flyer image
- Appears to be a memorial/inspiration page for the "Ties for Tim" sponsorship connection

---

## How the JavaScript Works (`script.js`)

Three behaviors, all vanilla JS:

1. **Mobile nav toggle** — hamburger menu shows/hides `.nav-links` by toggling `.active` class
2. **Navbar scroll effect** — adds `.scrolled` class (increases box-shadow) after 50px scroll
3. **Hero carousel** — cycles through `.hero-slide` elements every 5 seconds; clickable dot navigation also available (`currentSlide(n)`)

---

## Design System

Defined as CSS custom properties in `:root`:

| Variable | Value | Role |
|---|---|---|
| `--primary-blue` | `#2c5f8d` | Main brand color, nav links, headings |
| `--deep-blue` | `#1a3a52` | Page headers, footer background |
| `--light-blue` | `#4a7ba7` | Accents |
| `--accent-blue` | `#5a9bd4` | Nav underlines, highlights |
| `--soft-gray` | `#f5f7fa` | Section backgrounds, cards |
| `--warm-white` | `#fdfefe` | Page background |

Typography: **Crimson Pro** (serif, for headings) + **Work Sans** (sans-serif, for body).

Mobile breakpoint: `max-width: 768px` — nav collapses to hamburger, grids go single-column.

---

## How to Update Common Things

**Add a new upcoming event:**
1. Drop the flyer image into `images/upcoming-events/`
2. Add a card to `upcoming-events.html` inside `.events-grid`

**Archive an event to past events:**
1. Move/copy flyer to `images/past-events/`
2. Add a card at the top of the `.events-grid` in `past-events.html`

**Add gallery photos:**
1. Drop images into `images/gallery/`
2. Run `python3 generate-gallery.py` — it rewrites `gallery.html` automatically

**Deploy any change:**
- Drag-and-drop the updated folder (or changed files) into the Netlify dashboard at netlify.com

**Change brand colors:**
- Edit the `:root` variables at the top of `styles.css`

---

## Known / Notable Details

- Gallery image filenames are MD5-style hashes (e.g., `00af3757...png`) — no human-readable names
- One gallery file has a ` copy` suffix (`296533e4... copy.jpg`) — minor inconsistency, won't break anything
- The `generate-gallery.py` script's nav template is slightly outdated (logo is text-only, missing the `<img>` tag and favicon link) — if regenerating, the output should be spot-checked against the other pages
- Copyright footer says "2025" across all pages — will need updating annually
- No contact form backend — the Connect page links to Gmail directly
- No analytics or tracking scripts present
