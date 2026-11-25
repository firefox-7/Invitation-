# Aarav & Ananya — Royal Indian Wedding Invitation

A static, mobile-first Royal Indian wedding invitation web application built with React, TypeScript, Tailwind CSS, and Vite.

## Customization

All couple details, dates, photo slides, music settings, and **Event Patna** contact/venue details are stored inside the `WEDDING_CONFIG` object at the top of `src/App.tsx`.

## Local Development

```bash
npm install
npm run dev
```

## Deploying to Cloudflare Pages via GitHub

1. Push this repository to GitHub.
2. In **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git**, select your repository.
3. Configure the build settings:
   - **Framework preset**: `Vite` (or `None`)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. **Environment Variables**: None required. The embedded Google Map automatically works zero-config (or optionally uses `VITE_GOOGLE_MAPS_API_KEY` if provided).
