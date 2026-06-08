# Fleecon Kenya Ltd — Website

A multi-page commercial site built with vanilla HTML, CSS, and JavaScript.

## Folder structure

```
fleecon/
├── index.html                    Landing page
│
├── assets/
│   ├── css/
│   │   ├── main.css              Shared (every page)
│   │   ├── home.css              Landing-page only
│   │   ├── service.css           All /services/ pages
│   │   └── form.css              Contact form
│   │
│   ├── js/
│   │   ├── main.js               Site-wide (nav, reveals, back-to-top)
│   │   ├── gallery.js            Lightbox + filter (stub, to be built)
│   │   └── form.js               Form handling
│   │
│   └── images/
│       ├── logo/                 logo.png, logo-emblem.png
│       ├── hero/                 Hero & parallax backgrounds
│       ├── services/             Service-card hover photos (1 per service)
│       ├── projects/             Project portfolio photos
│       └── team/                 Founder & team photos
│
├── services/
│   ├── new-builds.html           Built — template for the others
│   ├── renovations.html          To build
│   ├── finishing.html            To build
│   ├── roofing.html              To build
│   ├── project-management.html   To build
│   └── consultation.html         To build
│
└── projects/
    └── index.html                Full portfolio page — to build
```

## How the styles split

Every page links `main.css` first (shared design tokens, nav, footer,
buttons). Then page-specific CSS layers on top:

- Landing: `main.css` + `home.css` + `form.css`
- Service pages: `main.css` + `service.css`
- Future projects page: `main.css` + `gallery.css` (to be created when
  the page is built)

## How the JS splits

- `main.js` — loaded on every page. Handles the nav, mobile menu,
  scroll reveals, and back-to-top. Pure vanilla, no dependencies.
- `form.js` — loaded only on pages with a contact form (currently
  the landing page). Fake submit by default; uncomment
  `handleWhatsAppSubmit()` to wire to WhatsApp instead.
- `gallery.js` — loaded on service gallery pages and the future
  projects page. Currently a stub — lightbox and filter logic to come.

## Replacing placeholders

Before going live, swap:

1. **Photos** — every `https://images.unsplash.com/...` URL should be
   replaced with a local path like `assets/images/projects/karen-home.jpg`.
2. **Phone number** — `+254 700 000 000` appears in:
   - `index.html` (contact section, WhatsApp & call buttons)
   - `assets/js/form.js` (`phoneNumber` variable)
   - Each service page CTA strip
3. **Email** — `hello@fleecon.co.ke` in the contact section.
4. **Stats** — 12 years, 180 projects, 47 counties — confirm with client.

## Adding a new service page

1. Copy `services/new-builds.html`
2. Rename to e.g. `services/finishing.html`
3. Update:
   - `<title>` and meta description
   - Breadcrumb last item
   - Eyebrow "Service / 01" → correct number
   - Hero heading, intro section, "what's included" list
   - Gallery images and captions
   - CTA strip heading
4. Done. The nav, footer, and all styles are inherited automatically.
