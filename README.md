# Unpacking Grief – donation page (static site)

Plain HTML/CSS/JS. No build step.

## Deploy on Vercel
1. Go to vercel.com → Add New → Project.
2. Drag this folder (or the zip, unzipped) into the import area, or push it to a GitHub repo and import that.
3. Framework preset: **Other**. Build command: leave empty. Output directory: leave empty (root).
4. Deploy. Your URL will look like `https://unpacking-grief.vercel.app`.

Or with the CLI from inside this folder: `npx vercel --prod`

## Edit
- Funding meter: in `index.html`, change `data-filled="7"` on `#boxes` (0–17).
- Placeholders still to fill: `$[RAISED]`, `$[GOAL]`, `[N]`, the festival/grant slots and the endorsement quote.
- Colors and fonts: top of `styles.css` (`:root`).

Note: the mailing list, sample password and contact forms are visual only on this static build (no backend).
