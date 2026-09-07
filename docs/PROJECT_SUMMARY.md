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
| Photo gallery | Google Drive (photos live in a shared Drive folder, not the repo), fetched client-side via the Google Drive API |

There is no backend, database, build system, or npm/package.json. Updates are deployed by dragging the folder into Netlify's dashboard. The one exception to "everything lives in the repo" is the photo gallery, which pulls from Google Drive at page-load time (see Photo Gallery section below).

---

## File Structure

```
wv-t1d-adults/
├── index.html              # Home page
├── about.html              # Mission + leadership team bios
├── connect.html            # Social media links + email
├── upcoming-events.html    # Current event flyers + signup links
├── past-events.html        # Archive of past event flyers
├── gallery.html            # Photo gallery (photos loaded live from Google Drive)
├── tims-story.html         # Tim's memorial/story page
├── styles.css              # All site styles
├── script.js               # Mobile nav + hero carousel logic
├── gallery-drive.js        # Fetches photos from Google Drive API and renders gallery.html's grid
├── favicon.svg             # Favicon (SVG)
├── CLAUDE.md               # Short project overview, points here and to docs/TODO.md
├── docs/
│   ├── PROJECT_SUMMARY.md  # This file
│   └── TODO.md             # Current to-do list
└── images/
    ├── WVT1D.PNG           # Logo (used in nav + favicon fallback)
    ├── logo.svg            # SVG logo variant
    ├── about-us/           # Leader photos (Maddie, Emmy, Tammy)
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
- Cards linking to: Email, Facebook Page, Facebook Group, Instagram (@wvt1d_adults), WhatsApp group, and a "Join our mailing list" card (Microsoft Forms link)

### Upcoming Events (`upcoming-events.html`)
- Currently shows the **2026 Summer Retreat** flyer with a Microsoft Forms signup link

### Past Events (`past-events.html`)
- 10 event flyer images in reverse-chronological order:
  - Dinner Sept 2025, Rafting Sept 2025, Tailgate Aug 30 2025, Retreat 2025
  - Tailgate Sept 7 2024, Retreat 2024, Basketball March 2
  - Retreat 2023, Meet & Greet (x2)

### Photo Gallery (`gallery.html`)
- Photos are **not stored in the repo** — `gallery-drive.js` fetches them live from a shared Google Drive folder via the Google Drive API (browser-side `fetch`, no backend) and renders them into a CSS-columns masonry grid (`.gallery-grid`/`.gallery-item` in `styles.css`), so portrait and landscape photos both show at full size with no cropping.
- **Folder structure = display grouping:** the Drive folder can contain year subfolders (e.g. `2026`, `2025`, `pre-2025`); each becomes its own group of photos, newest subfolder first, with no visible header — just ordering. Subfolders with a plain numeric (year) name sort newest-first among themselves; any non-numeric-named subfolder (e.g. `pre-2025`, for undated older photos) always sorts after all numeric years, regardless of its name. Any photos left loose in the root folder are grouped after all named subfolders. No mention of "Google Drive" or any link to Drive appears on the page itself — it's presented as just "the gallery."
- All photos have been migrated: `images/gallery/` (the old static repo folder) has been deleted. Current Drive subfolders: `2026`, `2025`, `pre-2025`.
- **Dependencies to know about** (both silent-failure points — if broken, the grid shows "Unable to load photos right now"):
  1. The Drive folder's general access must stay "Anyone with the link — Viewer."
  2. The Google Cloud API key hardcoded in `gallery-drive.js` must stay enabled and restricted to the Drive API + HTTP referrers `https://wvt1dadults.org/*` (and `https://www.wvt1dadults.org/*`). It's safe to have in client-side code specifically because of that restriction.
- **Gotcha:** every `<img>` sets `referrerpolicy="no-referrer"` — without it, Google's thumbnail CDN (`lh3.googleusercontent.com`) rejects the image request because browsers send a `Referer` header by default. Don't remove that attribute.

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
1. Upload the photo(s) into the shared Google Drive gallery folder — into the current year's subfolder if one exists, or create a new year subfolder (name it just the year, e.g. `2027`) when a new year starts
2. That's it — no rebuild step. The site fetches the folder's contents live, so new photos appear on next page load. Just don't change the folder's sharing setting (must stay "Anyone with the link — Viewer") or the gallery breaks for visitors

**Deploy any change:**
- Drag-and-drop the updated folder (or changed files) into the Netlify dashboard at netlify.com

**Change brand colors:**
- Edit the `:root` variables at the top of `styles.css`

---

## Known / Notable Details

- Copyright footer says "2026" across all pages — will need updating annually (bump the year in the `<footer>` block on all 7 pages)
- Footer on every page also has a "Join Our Mailing List" button (`.footer-mailing-list`) linking to a Microsoft Forms signup
- No contact form backend — the Connect page links to Gmail directly
- No analytics or tracking scripts present
- The Google Drive API key in `gallery-drive.js` is intentionally visible in client-side source — it's restricted (Drive API only, HTTP referrer locked to this domain) so exposing it is not a security issue, but don't remove the referrer restriction in Google Cloud Console
