# Influenza AI website

The marketing site for the Influenza AI app (Android, package `com.aiinfluencer.app`).
Next.js 15 + Tailwind CSS 4 + GSAP (ScrollTrigger) + Lenis smooth scrolling. It is a
showcase only: no sign-in, no forms, no calls to the app's backend.

## Run it

```bash
npm install
npm run dev -- -p 3107     # http://localhost:3107
```

Don't run `npm run build` while the dev server is running: both use `.next/`, and the
dev server starts answering "Internal Server Error". Stop it first.

## Publish it on Vercel

The GitHub repo is `Abdulhaadi123/influenza-website`. On vercel.com: **Add New → Project →
Import** that repo, keep the defaults (Framework: Next.js, build command `npm run build`) and
**Deploy**. No environment variables are needed. Every push to `main` then redeploys the site,
and a push to any other branch gets its own preview address.

To use your own domain: Vercel project → **Settings → Domains → Add**, then create the DNS
record Vercel shows. Put that address into Play Console (see "Legal pages" below).

## Publish it anywhere else

```bash
npm run build              # writes a static site to out/
```

Upload `out/` to any static host. On the existing server with Caddy:

```caddy
influenza.example.com {            # PLACEHOLDER: the real domain
	root * /srv/influenza-site/out
	encode zstd gzip
	file_server
	@assets path /_next/static/* /img/*
	header @assets Cache-Control "public, max-age=31536000, immutable"
}
```

## What is on the page

| Section | File |
|---|---|
| Hero: the influencer, orbs, status chips | `src/components/sections/Hero.tsx` |
| Moving strip: Create, Promote, Move, Share | `Marquee.tsx` |
| Create Influencer (typing prompt, reveal, features to match) | `Create.tsx` |
| Same influencer, any look (3D card fan) | `Looks.tsx` |
| Product Videos (a clip that plays with the scroll) | `Promote.tsx` |
| Motion Copy (dancing figure, pose tracking) | `Motion.tsx` |
| Inside the app (real screens, sideways scroll) | `InsideApp.tsx` |
| Statement, Made for, How it works, Credit packs, Privacy, Questions, Early access, Footer | `BrandPage.tsx` |

Words, prices and links that may change live in `src/lib/site.ts`.

## Placeholders to change before going public

In `src/lib/site.ts`:

- `PLAY_STORE_URL`: empty, so the page says "Coming soon to Google Play".
- `EARLY_ACCESS_EMAIL`: `earlyaccess@example.com`.
- `CONTACT_EMAIL`: `hello@example.com`.

Also the domain in the Caddy block above. For the legal pages (next section) these three
must also be filled in, in the same file: `OPERATOR_NAME`, `OPERATOR_COUNTRY`, and
`CONTACT_EMAIL` (above), and `BACKUP_RETENTION_DAYS` must be true. `npm run build` warns
while any placeholder is left (`scripts/check-legal.mjs`).

## Legal pages (what Google Play asks for)

| URL | What it is | Where Play Console uses it |
|---|---|---|
| `/privacy/` | Privacy Policy | Store listing → Privacy policy; App content → Data safety |
| `/terms/` | Terms of Use | Link it in the store listing description and from the app |
| `/delete-account/` | How to delete an account and what is removed | App content → Data safety → Data deletion |
| `/support/` | Help: sign-in, credits, reports, refunds | Store listing → Contact details (website) |

Source: `src/app/<page>/page.tsx`, framed by `src/components/legal/LegalPage.tsx` and
`legal.css`. The text is written from what the app and its server do; when either changes
(a new service that receives data, a new kind of data kept, a different retention time),
change the page and `LEGAL_UPDATED` in `src/lib/site.ts`. Two promises need something done
on the server: database backups must expire after `BACKUP_RETENTION_DAYS` (an S3 lifecycle
rule on `backups/`, see the backend README), and a deletion asked for by email is done by an
admin within `DELETION_REPLY_DAYS` (admin panel → Accounts → delete).

The pages are plain static files (`trailingSlash: true` writes `privacy/index.html`), so they
need a public HTTPS address before Play will accept them. Play Console wants the exact URLs,
for example `https://influenza.example.com/privacy/`. Have a lawyer read them before launch:
they are written from the code, not from legal advice.

`PLAY_CONSOLE_ANSWERS.md` (not published) lists what to enter in the Console's own forms.

## Images (`public/img/`)

- `look-*.webp`, `hero-neon.webp`, `product-bag.webp`, `orb-*.webp`: from the app's own
  Figma design ("Influenza App"). A designer's monogram on the black handbag was painted
  out (it resembled a real fashion brand's logo). Confirm the designer's images may be used
  publicly.
- `app-profile/videos/motion/gallery.webp`: real app screenshots (influencer "Nova Prime").
- `app-home.webp`, `app-create.webp`: the design's frames; the "Pro" badge was removed from
  Home because the app has no Pro tier.

The sources and working files are in `../influenza-site-assets/`.

## Later: an AI film

`src/hooks/useFrameSequence.ts` (from the scroll-site generator) can scrub a
frame sequence from `public/frames/<name>/` listed in `public/frames/index.json`. It is not
used yet; it is for when real video clips of the influencer have been generated.
