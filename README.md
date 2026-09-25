# Drikr — marketing site

The public page for the Drikr app. Next.js 15, deployed on Vercel.

This is a **standalone project**, a sibling of the Expo app rather than a folder
inside it:

```
D:\Drikr\
  Drikr-App-SIH\   the Expo app
  Sensor\          firmware
  web\             this site
```

Keeping it outside the app repo means Metro never crawls Next's `node_modules`, and
the app's `npx tsc --noEmit` gate never sees web sources — neither project needs to
know the other exists, and neither needs config to ignore the other.

```bash
cd D:\Drikr\web
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

## Deploying to Vercel

This directory is the project root, so there is no Root Directory to override.

Quickest route, no git needed:

```bash
cd D:\Drikr\web
npx vercel          # preview deploy
npx vercel --prod   # production
```

To deploy from git instead, give this folder its own repository — it is not part of
the app's repo:

```bash
cd D:\Drikr\web
git init && git add . && git commit -m "Drikr marketing site"
gh repo create drikr-web --private --source=. --push
```

then import it at [vercel.com/new](https://vercel.com/new). Framework preset Next.js,
detected automatically. Nothing else to configure.

`vercel.json` pins the serverless region to `bom1` (Mumbai) — the audience is in
India, and static assets are on the CDN everywhere regardless.

## Putting the APK on the site

There is no APK here, and the download section says so rather than rendering a button
that 404s. To publish one, build it from the **app** repo next door:

```bash
cd D:\Drikr\Drikr-App-SIH
npx eas-cli login
npx eas-cli init                                          # once
npx eas-cli build --platform android --profile preview    # plain APK, sideloadable
```

EAS prints a download URL when the build finishes. Then either:

- **Host it yourself** — drop the file at `public/drikr.apk` and set
  `APK.url = '/drikr.apk'` in [lib/site.ts](lib/site.ts). Note `.gitignore` excludes
  `public/*.apk`, since an ~80 MB binary in git history is hard to undo; remove that
  line if you want it committed.
- **Link the EAS or a GitHub Release URL** — set `APK.url` to that URL instead. This
  is the better option: the binary stays out of the deploy, and Vercel's deployment
  size limit stops being a concern.

Fill in `sizeMb` and `builtAt` at the same time and they appear under the button.

`next.config.ts` already sets `Content-Disposition: attachment` and a long cache on
`/drikr.apk`, so a self-hosted file downloads instead of the browser trying to render
it.

## The design system

Set in [app/globals.css](app/globals.css), as `@theme` tokens.

Tokens are transcribed from `DESIGN.md` (Minimalist Editorial).

**Palette.** Strict monochrome — `#f9f9f9` ground, `#000000` primary, `#5e5e5e`
secondary, `#cfc4c5` outline-variant, and the tonal surface tiers between. Colour
carries no meaning here; hierarchy comes from type, tonal greys and negative space.
There is no hue anywhere in `app/` or `components/`, which is worth keeping true —
one accent colour would undo the whole register.

**Type.** Roboto Slab for headlines, Roboto for everything read quickly. `DESIGN.md`
specifies Noto Serif + Manrope; this pairing was chosen over it. Same roles, and
because both faces share one skeleton the slab reads as emphasis rather than as a
second voice. The full scale (`headline-xl` → `label-sm`) is defined as `@theme`
tokens, so `text-headline-lg` carries its size, leading, weight and tracking together.

Both are variable fonts — do **not** pass a `weight` array to `next/font`. It then
looks for static instances Google no longer serves and fails the build with a null
deref inside the loader rather than a useful message.

**Shape.** `DESIGN.md` reserves the 20px radius for media and content-heavy
containers and forbids it on functional UI. That rule is enforced by naming: the
token is `rounded-media`, so a 20px corner on a button would be visible in review.
Buttons and inputs use the small radii; pills use `rounded-[100px]`.

**Shadow.** One, the ambient `0 10px 40px rgba(0,0,0,0.04)` `DESIGN.md` allows on a
floating panel. Everything else is structured with 1px hairlines.

### Two places the reference implementation and DESIGN.md disagree

`code.html` is one implementation of the system, not the system. Where they conflict,
`DESIGN.md` wins:

- `shadow-2xl` on the floating panel → the ambient shadow above, under "avoids heavy
  shadows".
- `rounded-full` on that panel → `rounded-xl` (12px). That class only renders
  correctly in the reference because its own Tailwind config redefines `full` as
  `0.75rem`; under `DESIGN.md`'s `full: 9999px` it would round the panel into a pill.

## Why so few libraries

The brief that produced the first version of this site asked for ~40 animation and
UI libraries. Most of that list is mutually redundant, and the editorial art
direction that replaced it made most of them actively wrong. What ships:

| Library | What it does here |
|---|---|
| **Lenis** | Smooth scroll, on its own rAF loop. Short duration, gentle easing — it is there so the page settles rather than snaps |
| **Motion** | One vocabulary: fade plus a 16px rise, via [`Reveal`](components/ui/Reveal.tsx). No blur, no scale, no parallax |
| **Tailwind v4** | The design system. MUI, Chakra, AntD, Mantine and DaisyUI each impose a look; this page needed its own |

Icons come from Material Symbols Outlined, loaded as a stylesheet in `app/layout.tsx`,
matching the reference.

Removed along the way, with reasons: **three / R3F / drei** (abstract WebGL is the
first thing that reads as generated), **tsParticles** (decorative motes),
**GSAP + ScrollTrigger** (the pinned pipeline cost five viewport-heights of scroll and
said nothing with motion disabled), **ECharts** (a megabyte of canvas renderer to draw
eight bars, and it looked like a dashboard widget pasted onto a brochure — the bars are
CSS now), **Embla**, **Radix**, **lucide-react**. That removed 154 packages.

## Imagery and the logo

**There are no photographs.** The app repository contains none —
`assets/images/header.png` is a 1×1 transparent placeholder — so the media slots the
reference fills with landscape stock are filled by
[`FieldPlan`](components/FieldPlan.tsx): a plan-view survey drawing whose contour
lines are generated by marching squares over the same inverse-distance weighting the
app runs in `healthMap.ts`. It is the thing itself rather than a mood, and it does not
pretend to show a field nobody has photographed. Real field photos drop into those
slots cleanly if they ever exist.

**The logo is drawn, not cropped.** The mark inside `assets/drikr-logo.png` is only
189×189 px on the page, so any crop is a 5× enlargement with soft concave curves.
[`Logo.tsx`](components/Logo.tsx) reproduces it from the geometry in
`assets/source/make-icons.py` — a rounded square minus four edge-bite discs,
`rc 0.1468 / rb 0.2768 / waist 0.1825`, fitted to the original at IoU 0.981 — as an
SVG mask. Same construction the app icons are generated from, exact at any size, and
it inherits `currentColor`.

The wordmark is live text rather than artwork, so it stays crisp, selectable and
readable by a screen reader. The lockup reads **DRIKR SYSTEMS™**, which is what the
artwork says.

## Accessibility and motion

- `prefers-reduced-motion` is honoured in JavaScript, not only CSS: Lenis never
  initialises and the reveals resolve to their final state.
- The reveal lists are real `<button>`s with `aria-expanded`, not `:hover`-only. The
  reference opens them on hover alone, which leaves two of three items permanently
  shut on a touch screen.
- The map demo is **keyboard-operable** — tab to a station, move it with the arrow
  keys — not pointer-only.
- One `<h1>`, then `<h2>`/`<h3>` in order, and a real `<table>` and `<dl>` rather
  than divs.
- Skip link; focus is a 1px black outline at 3px offset, never a glow.
- The page is complete and legible with CSS animation and JavaScript disabled.

## Where the content comes from

[lib/site.ts](lib/site.ts) holds every claim on the page in one file. Figures traceable
to the app's source — the cost model, the 14/21 disease-window provenance, the drone
link statuses, the crop aliases — are copied from it rather than rewritten, so the site
and the app cannot drift apart silently.
