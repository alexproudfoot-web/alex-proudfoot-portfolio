# Photography and motion portfolio

A hand-built Astro site. Stills hang in mats with gallery wall labels; films
break the mat and run edge to edge. No CMS, no database, no cart — the pages are
static files, and print orders hand off to Stripe or Shopify.

## Run it

You need Node 18.17 or newer.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
npm run preview  # check the built site before deploying
```

The placeholder images are grey stand-ins so the layout renders on the first
run. Replace them and they disappear.

## Edit these first

1. **`src/site.ts`** — your name, email, location, social links, rates. Every
   page reads from this file.
2. **`astro.config.mjs`** — change `site` to your real domain before deploying.
3. **`public/og-image.jpg`** — the image that shows up when someone shares a
   link. Make it one of your strongest frames, around 1200×630.

## Add a photograph

1. Drop the full-size JPEG into `src/assets/images/`. Don't resize it — Astro
   generates the responsive sizes and modern formats at build time. Feed it
   something big (2400px on the long edge is plenty).
2. Create a markdown file in `src/content/stills/`. The filename becomes the
   URL, so `salt-flat-dusk.md` lives at `/stills/salt-flat-dusk/`.

```markdown
---
title: "Salt Flat, Dusk"
place: "Atacama, Chile"
year: 2025
image: "../../assets/images/your-file.jpg"
alt: "Describe what is in the frame, for people using screen readers."
span: "wide"      # wide, standard, or tall — controls the hang
order: 1          # lower numbers come first; your best work is 1
hero: true        # only one picture should have this
print:
  available: true
  process: "Archival pigment print on cotton rag"
  edition: "Edition of 15"
  sizes: '16 x 24 in and 24 x 36 in'
  priceFrom: "$180"
  buyUrl: "https://buy.stripe.com/your-link"
---

An optional note about the picture. Two or three sentences at most.
```

Leave out the whole `print:` block for work that isn't for sale. It simply
won't appear on the prints page.

## Add a film

Upload to Vimeo (a paid tier removes their branding) or Mux, then create a file
in `src/content/films/`:

```markdown
---
title: "Tide Work"
client: "Coastal Trust"
year: 2025
runtime: "3 min 40 s"
role: "Director and DP"
embedUrl: "https://player.vimeo.com/video/000000000"
poster: "../../assets/images/your-poster.jpg"
alt: "Describe the poster frame."
order: 1
---
```

Nothing loads from Vimeo until a visitor presses play, so a page full of films
still loads fast. Export a poster frame from the edit — it's the still most
people will judge the film by.

Don't put video files in this repo. Self-hosted MP4s will wreck your load times
and your bandwidth bill.

## Selling prints

There is deliberately no shopping cart. Each print links out to a checkout you
control:

- **Stripe Payment Links** — make one link per size in the Stripe dashboard,
  paste it into `buyUrl`. Simplest option, no monthly fee.
- **Shopify Buy Button** — worth it if you want inventory, discount codes, and
  tax handling.

Pair either with a print-on-demand lab (Prodigi, WHCC, or Printful) and you
never touch packaging. If you print and ship yourself, set expectations on the
prints page about turnaround.

## Deploy

Push to GitHub, then connect the repo to Netlify or Vercel. Both detect Astro
automatically — build command `npm run build`, output directory `dist`. Every
push republishes the site. The free tiers are more than enough for a portfolio.

## Structure

```
src/
  site.ts              your details, edit first
  content.config.ts    the shape of a still and a film
  content/
    stills/            one markdown file per photograph
    films/             one markdown file per film
  assets/images/       full-size photographs, optimized at build
  components/
    Plate.astro        a matted photograph with its wall label
    Film.astro         full-bleed video, loads only on play
    Header.astro
    Footer.astro
  layouts/Base.astro   head tags, fonts, page shell
  pages/               each file becomes a URL
  styles/global.css    colours, type scale, shared pieces
public/                files served as-is (og-image, favicon)
```

## A note on editing

The hardest part isn't the code — it's the edit. Twelve to twenty photographs
beat eighty. If you're unsure about a picture, it goes in the `order: 99` pile
or out entirely. Art directors decide in the first three frames.
