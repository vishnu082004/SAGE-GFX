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

## Careers application endpoint

Career applications are accepted by the Node serverless function in `api/careers.js`. It checks required fields, confirms the selected position belongs to its department, and validates the resume's file signature before emailing the application with its attachment through Resend. The browser's file picker is only local selection; the page reports success only after Resend returns a message ID.

Configure these server-side environment variables before running or deploying the site:

- `RESEND_API_KEY` — a private Resend API key.
- `CAREERS_FROM_EMAIL` — a sender address on a domain verified in Resend.
- `CAREERS_TO_EMAIL` — optional; defaults to `sagegraphics2021@gmail.com`.

For local PowerShell development:

```powershell
$env:RESEND_API_KEY = 're_...'
$env:CAREERS_FROM_EMAIL = 'careers@your-verified-domain.com'
$env:CAREERS_TO_EMAIL = 'sagegraphics2021@gmail.com'
npm run dev
```

For Vercel, add the same variables in the project's Environment Variables settings and redeploy. Until the required variables are configured, submissions return an error and the form keeps its values. Resumes are restricted to 5 MB by this site.
