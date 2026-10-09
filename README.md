# Tulir Design Studio

Responsive React and Vite website for Tulir Design Studio. It uses React Router for the site pages and keeps the current site content and assets in this project.

## Development

```sh
npm install
npm run dev
```

Vite prints the local development URL after startup.

## Build and preview

```sh
npm run build
npm run preview
```

The production build is written to `dist/`.

## Routes

- `/` — Home
- `/about` and `/about-us` — About
- `/services` — Services
- `/contact` and `/contact-us` — Contact
- `/privacy-policy` — Privacy Policy

## Project layout

- `src/components/` — Shared site sections and UI components
- `src/pages/` — Route page components
- `src/styles/` — Global, component, and responsive styles
- `src/assets/images/` — Source image assets
- `public/images/` — Images served at `/images/`
- `public/models/` — Optional 3D model assets

The active pages use the images in `public/images/`. No GLB or GLTF model file is currently included.
