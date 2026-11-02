# Unbroken — unbrokenops.com

Production site for Unbroken: an AI-native enterprise platform for logistics and supply chain, currently in stealth. It's a faithful port of the approved homepage design. It's built the same way as Class of One.

> **The forms deliver nothing.** The "Talk to Rajat" form and the footer email box are front end only: they validate in the browser and show a success message, but nothing is sent or stored, so messages reach no one. The only working way to reach Unbroken is the contact email shown on the site, which must be a real mailbox.

Everything lives in one Next.js 16 app in [`web/`](web/). There is no database, no email sending and no API beyond a health check.

```
unbrokenops/
├── design/project/              Approved design (Main.dc.html is the source of truth)
└── web/                         Next.js 16 (App Router, React 19, TypeScript), deployed to Vercel
    ├── assets/                  Archivo ExtraBold, used only to render the OG image
    └── src/
        ├── app/
        │   ├── page.tsx         homepage: assembles the sections, Organization JSON-LD
        │   ├── layout.tsx       fonts (next/font), metadata
        │   ├── globals.css      design tokens + shared classes
        │   ├── api/health/      GET { status: "ok" }
        │   ├── privacy/ terms/  legal pages (shared layout: components/LegalDoc.tsx)
        │   ├── not-found.tsx    styled 404
        │   └── opengraph-image.tsx, twitter-image.tsx, icon.svg, apple-icon.tsx, sitemap.ts, robots.ts
        ├── components/          one component + CSS Module per section
        └── lib/
            ├── scrollStore.ts   shared client state for the nav (current section, progress)
            ├── talk/            zod schema, footer email draft
            └── site.ts          site URL, contact email, founder name and links
```

## Sections and what runs in the browser

Sections are Server Components and ship no JavaScript, except the interactive pieces marked "client" below.

| Section | Component | Client JS |
|---|---|---|
| Nav | `Nav` (server), with `JumpMenu` and `ProgressRail` | client: those two |
| Hero | `Hero` (server), with `Journey` | client: fragmented/unbroken toggle |
| 01 Problem | `Problem` (server), with `ScrollTrigger` | client: trigger only |
| Quote band | `Band` | none |
| 02 Timing | `Timing` (server), with `LagPanel` | client: slider |
| 03 Observations | `Observations` | none |
| 04 Build status | `Status` | none |
| 05 Founder | `Founder` (server), with `ScrollTrigger` | client: trigger only |
| 06 Talk | `Talk` (server), with `TalkForm` | client: form |
| Footer | `Footer` (server), with `FooterTalk` and `ScrollTrigger` | client: email box, line trigger |

## Placeholders still to replace

- **Domain.** `unbrokenops.com` is inferred from the `hello@unbrokenops.com` address in the design. Change the default in `web/src/lib/site.ts` (or set `NEXT_PUBLIC_SITE_URL`) if the site will live elsewhere.
- **Legal review.** `/privacy` and `/terms` are drafts for Indian law (IT Act 2000, SPDI Rules 2011, DPDP Act 2023 with the DPDP Rules 2025), adapted from Class of One to what this site does. Have them reviewed by a lawyer before launch. They name no legal entity, because none was supplied. They also make statements you need to keep true: a real Grievance Officer behind that address, limited access to the data, the 24-month retention period and the ₹5,000 liability cap. Shared values are in `web/src/lib/legal.ts`.
- **Facts in the design copy** were kept word for word and not checked: the founder's career dates, "22+ years" and the build status list.

## Local setup

Requirements: Node 20.9 or later.

```bash
cd web
npm install
cp .env.example .env.local      # optional, only sets the site URL
npm run dev                     # http://localhost:3000
```

### Scripts (in `web/`)

| Script | What it does |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (`eslint-config-next`) |
| `npm run typecheck` | `next typegen` + `tsc --noEmit` |

## Environment variables

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | no | Defaults to `https://unbrokenops.com`. Used for canonical URLs, sitemap and OG tags. |

## How the "Talk to Rajat" form works

1. `onSubmit` in `src/components/TalkForm.tsx` calls `preventDefault` and validates name, work email and area with the zod schema in `src/lib/talk/schema.ts`.
2. If validation fails, the errors show next to each field and what the person typed stays.
3. If it passes, the design's "Received" card shows. No network request is made.
4. The inputs have no `name`, so with JavaScript off, submitting just reloads the page and nothing typed goes into the URL.

The email box in the footer stores nothing either. It carries the address to this form and moves the cursor to Name (`src/lib/talk/draft.ts`).

## Deploy to Vercel

1. Push the repo to GitHub, GitLab or Bitbucket, then in Vercel choose **Add New → Project** and import it.
2. Set **Root Directory** to `web`. The framework preset (Next.js) and the build command are detected automatically.
3. Deploy. Preview deployments serve a `Disallow: /` robots.txt, so they stay out of search results.

## Connect the domain

1. In Vercel: Project → **Settings → Domains** → add `unbrokenops.com`, then `www.unbrokenops.com`, and choose to **redirect `www` to the apex**.
2. Vercel shows the exact DNS records to create (typically an **A** record for `@` and a **CNAME** for `www`). Add them at your domain registrar, removing any default "Parked" records first.
3. Wait for both domains to show **Valid Configuration**. HTTPS certificates are issued automatically.

To receive mail at hello@unbrokenops.com, set up a mailbox provider (Google Workspace, Zoho, etc.) and add its MX records. This address is the only way people can reach Unbroken through the site.

## Fidelity notes (vs. the approved design, `Main.dc.html`)

Compared side by side in Chrome at 1440px and 390px, full page, with animations off so both are caught in the same state, before the founder and footer changes below:
- **Layout:** every section has the same top and height as in the design at both widths.
- **Pixel difference:** 0.000% at 1440px. 0.012% at 390px, all of it the timeline label change below.

Intentional differences:
- **Footer:** replaced on request with the Class of One footer layout (brand, Explore, Policies, email box, line band, legal strip) in Unbroken's colours. The design's giant wordmark and "Building in stealth" chip are gone from it.
- **Wordmark:** reads "unbrokenops" in the nav, footer, 404 and share image, where the design has "unbroken". The nav shrinks it and the button slightly below 390px so they stay on one row. The company name in running text and page titles is still "Unbroken".
- **Founder card:** uses Rajat's photo, cropped round because it was supplied that way, and links to LinkedIn instead of the Netlify site.
- **The form validates.** The design's form flipped straight to a thank-you. It now checks the fields in the browser first, then shows the same thank-you. It delivers nothing.
- **Pages added:** Privacy and Terms are real pages (they were `#top` in the design), plus a styled 404. Nav and footer links point to `/#section`, so they work from every page. The jump menu shows only on the homepage.
- **Timeline labels below 1320px:** as designed, "Exception happens" and "Seen 3 days later" hang past the panel, which runs them off the screen at narrower widths, including 1280px laptops and phones. Below 1320px they now stay inside the panel. Above that, they match the design.
- **Section 06 in the nav:** the design's Talk section has no `data-sec`, so the jump bar could never reach "06 / 06" and stayed on Founder. It now does.
- **Jump menu:** also closes on Esc and on a click outside.
- **Anchors** land below the sticky nav. In the design, Observations and Talk scrolled their first line under it.
- **External links** (marked ↗) open in a new tab.
- **Problem task rows** are hidden before their animation only when JavaScript is on, so they read without it.

Kept as designed, worth a decision later:
- **Small mono labels** in the hero journey ("Requirement") and career chart ("NIIT Technologies"). The design's CSS appears to intend Archivo 15px and Geist 14.5px for these, but its runtime wraps values in a `<span>` that picks up the `.node span` and `.meta span` rules, so the design displays them small and mono. The site matches what the design displays. To get the larger type, remove the inner `<span>` in `Journey.tsx` and `Founder.tsx`.
