# Niyi Art Studio — Olaniyi Omotayo

Portfolio site for painter Olaniyi Omotayo, built with Next.js 16 (App Router).

## Structure

- `app/page.tsx`: home. Paintings drift through 3D space; scroll, swipe or arrow keys speed them up, and each painting links to its series.
- `app/work`: index of series and projects, plus one editorial page per project (`/work/[slug]`).
- `app/info`: biography, studio film, exhibitions and press.
- `app/contact`: contact details.
- `lib/content.ts`: **all site text and project data.** Edit this file to change copy, add works or reorder series.
- `lib/images.json`: image dimensions (generated).
- `public/works`: artwork images (max 2400px, JPEG).
- `public/media`: studio film.

## Adding a work

1. Put the image in `public/works/<name>.jpg`.
2. Add its entry, with `src`, `width` and `height`, to `lib/images.json`.
3. Reference it in `lib/content.ts` with `img("<name>", "alt text", "optional caption")`.

## Develop

```bash
npm install
npm run dev
```

Deploys as-is on Vercel. Fonts: Switzer (Fontshare, free for commercial use) is self-hosted from `app/fonts`.
