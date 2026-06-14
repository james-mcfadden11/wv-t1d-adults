# WV T1D Adults Website

Professional website for the WV T1D Adults nonprofit organization.

## Files Included

- `index.html` - Home page
- `about.html` - About Us page with mission statement and leadership team
- `connect.html` - How to Connect page with social media links
- `upcoming-events.html` - Upcoming Events page
- `past-events.html` - Past Events page (now shows your event flyers)
- `gallery.html` - Photo Gallery page
- `tims-story.html` - Tim's Story page (now shows Tim's photos)
- `styles.css` - All styling for the website
- `script.js` - JavaScript for mobile menu and interactions
- `generate-gallery.py` - Python script to auto-generate gallery with all 134 photos

## IMPORTANT: Generating the Photo Gallery

Your gallery has 134 photos! To automatically add them all to gallery.html:

**Option 1: Run the Python script (Easiest)**
1. Make sure Python is installed on your computer
2. Place all 134 gallery photos in `images/gallery/` folder
3. Open terminal/command prompt in the wvt1d-website folder
4. Run: `python generate-gallery.py` (or `python3 generate-gallery.py`)
5. The script will automatically create gallery.html with all your photos!

**Option 2: Manual** (Not recommended for 134 photos)
- You can manually edit gallery.html, but with 134 photos this is tedious

The leadership photos, Tim's story photos, and past event flyers are already configured!

## How to Use

### Preview Locally
1. Open `index.html` in your web browser
2. Click through the navigation to see all pages

### Deployment

**Live site:** https://wvt1dadults.org

**Host:** Netlify (free tier)

**Domain registrar/DNS:** SiteGround (nameservers: ns1.siteground.net, ns2.siteground.net)

To update the site, drag and drop the updated files (or the whole folder) into the Netlify dashboard. Changes go live immediately.

### Deploy to Web (first-time options)

#### Option 1: Netlify (Recommended - FREE)
1. Sign up for a free account at [netlify.com](https://netlify.com)
2. Drag and drop the entire website folder into Netlify
3. Connect your custom domain in the Netlify settings
4. Done! Your site is live and will auto-update when you upload new files

#### Option 2: Vercel (Also FREE)
1. Sign up at [vercel.com](https://vercel.com)
2. Click "New Project" and upload your website folder
3. Connect your domain
4. Deploy!

#### Option 3: Replace WordPress Site
1. Access your web hosting control panel (cPanel, etc.)
2. Navigate to the public_html or www folder
3. Delete the WordPress files (make a backup first!)
4. Upload all these HTML files
5. Your site is now live at your domain

## Customizing Content

### Adding Photos

**Leadership Team:**
- Replace the colored letter placeholders in `about.html`
- Change this: `<div class="leader-image">M</div>`
- To this: `<img src="images/maddie.jpg" alt="Maddie" style="width: 100%; height: 300px; object-fit: cover;">`

**Photo Gallery:**
- In `gallery.html`, replace the placeholders
- Change: `<div class="gallery-placeholder">Photo 1</div>`
- To: `<img src="images/retreat1.jpg" alt="Retreat photo" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;">`

**Tim's Story:**
- In `tims-story.html`, replace the photo placeholder
- Update the text content with Tim's actual story

### Adding Events

**Upcoming Events:**
- Add the flyer image to `images/upcoming-events/`
- Edit `upcoming-events.html` and add an event card with a link to the signup form:
```html
<div class="event-card" style="text-align: center; max-width: 700px;">
    <img src="images/upcoming-events/your-flyer.png" alt="Event Name">
    <a href="YOUR_SIGNUP_URL" target="_blank" rel="noopener noreferrer" class="cta-button" style="margin-top: 2rem; background: var(--primary-blue); color: white;">Sign Up</a>
</div>
```

**Past Events:**
- Add the flyer image to `images/past-events/`
- Edit `past-events.html` and add an event card at the top of the list:
```html
<div class="event-card">
    <img src="images/past-events/your-flyer.png" alt="Event Name">
</div>
```
- For landscape (wide) flyers, add `style="max-width: 700px;"` to the card so it displays at a readable size

### Changing Colors

All colors are defined at the top of `styles.css`:
```css
:root {
    --primary-blue: #2c5f8d;
    --deep-blue: #1a3a52;
    --light-blue: #4a7ba7;
    --accent-blue: #5a9bd4;
}
```
Change these hex codes to adjust the color scheme.

### Updating Text Content

Simply open any `.html` file in a text editor and modify the text between the HTML tags.

## Folder Structure for Images

Create an `images` folder in the same directory as the HTML files:
```
wvt1d-website/
├── index.html
├── about.html
├── connect.html
├── ...
├── styles.css
├── script.js
└── images/
    ├── maddie.jpg
    ├── emmy.jpg
    ├── tammy.jpg
    ├── tim.jpg
    └── gallery/
        ├── retreat1.jpg
        ├── retreat2.jpg
        └── ...
```

## Mobile Responsive

The website automatically adapts to mobile devices. Test by resizing your browser window.

## Support

For questions about the website structure or how to make changes, refer to this README or search for HTML/CSS tutorials online.

## Future Enhancements

Consider adding:
- Contact form (requires backend service like Formspree or Netlify Forms)
- Event calendar
- Blog section for updates
- Newsletter signup

---

Built for WV T1D Adults - Building community, creating connections.