# WV T1D Adults Website — To-Do List

---

## In Progress / Immediate

- [x] **Mailing list link** — Added a "Join Our Mailing List" button in the footer on all pages, plus a matching card on the Connect page

- [x] **Update footer copyright year** — Footer now says "© 2026" on all pages

- [x] **Repo cleanup** — Moved generated docs into `docs/` (`docs/PROJECT_SUMMARY.md`, `docs/TODO.md`), added root `CLAUDE.md` pointing to them, updated `README.md` to reference the new locations, added `.gitignore` for `.DS_Store` and untracked the ones already in the repo

---

## Photo Gallery Overhaul

- [x] **Replace static gallery with Google Drive integration** — `gallery.html` now renders a custom masonry photo grid (`gallery-drive.js`) populated live via the Google Drive API from the shared folder (ID `1BT_miKec6jmGBonN8oi-KzWEQGXAqdIV`). Switched away from the raw `embeddedfolderview` iframe because it showed each photo's filename/link caption with no way to suppress it. `generate-gallery.py` removed (obsolete).
  - **Year grouping:** subfolders of the main Drive folder are treated as years and photos are grouped accordingly (newest subfolder first, no visible headers — tried headers, decided against them). Non-numeric folder names (e.g. `pre-2025`, for undated older photos) always sort last, after all numeric year folders. Any photos still sitting loose in the root folder appear after all named groups. Current subfolders: `2026`, `2025`, `pre-2025`.
  - No link to Google Drive or mention of Drive appears anywhere on the page (removed per request) — it's presented as just "the gallery."
  - **Note:** relies on (1) the folder's general access staying "Anyone with the link — Viewer" and (2) the Google Cloud API key in `gallery-drive.js` staying enabled/unrevoked and restricted to the Drive API + `wvt1dadults.org`. If either changes, the gallery silently shows a generic "unable to load photos" message.
  - **Gotcha (fixed):** Google's thumbnail CDN (`lh3.googleusercontent.com`) rejects image requests that carry a `Referer` header, which browsers send by default for `<img>` tags — this caused most photos to fail to load. Fixed by setting `referrerpolicy="no-referrer"` on each `<img>` in `gallery-drive.js`. Don't remove that attribute.
  - Layout uses a CSS-columns masonry grid (`.gallery-grid`/`.gallery-item` in `styles.css`) instead of a fixed-aspect-ratio grid, so portrait photos aren't cropped.
  - Existing Google Photos albums (separate product, not usable here) can be retired once photos are migrated to Drive:
    - https://photos.google.com/share/AF1QipNmRqciWqjDjQP_n-dKKfga_Ya2_NSqqnU--jBAn2Vet3qVQynHyIMsRrWCMcDN0A?key=T3NySTlWUWJQcURXaVBqY2FWcXpUR0o0N29zRXJ3
    - https://photos.google.com/share/AF1QipMp8Egnx2wHqu19K7q1HioeGv7MfEYBzLkggR-9365fl3AgAQfwYXKhDuirnQk6PQ?key=M3RQY1ZlMXpiOTRpajZPdWM0NDZUYkJ5dlhoVDdn

- [x] **Photo album organization effort** — All photos migrated into the Drive folder's `2026` / `2025` / `pre-2025` subfolders. `images/gallery/` (old static approach, 131 files) removed from the repo.

---

## New Features

- [ ] **Announcements / News tab** — New page for event announcements, social media post highlights, and general updates
  - Add the Bret Michaels post when building this out
  - Consider whether this is a static HTML page (manually updated) or pulls from a social feed

- [ ] **Contact form** — Currently the Connect page links directly to Gmail; a proper form would avoid exposing the email address and give a better UX
  - Options: Netlify Forms (free, no backend needed), Formspree

---

## Documentation

- [x] **Create `CLAUDE.md`** — Added at repo root as a short overview that points to `docs/PROJECT_SUMMARY.md` (full technical reference) and `docs/TODO.md` (current to-do list)

---

## Backlog / Future

- [ ] Newsletter signup integration
- [ ] Event calendar
