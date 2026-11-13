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

## Form submissions

The Contact page, home inquiry forms, and Careers applications submit to FormSubmit and send to `sagegraphics2021@gmail.com`. Text forms use FormSubmit's AJAX endpoint. Career applications open FormSubmit's response in a new tab. FormSubmit may send an activation email the first time; confirm the inbox before expecting submissions to be delivered. These site forms do not require Resend environment variables.

The Express app (`server.js`) serves the Vite build from `dist/`; `GET /health` is available for health checks.

### Hostinger Business Node.js Web App deployment

Create a Node.js Web App in Hostinger and deploy the project root (the folder containing `package.json`). Set:

- Node.js version: 20 or 22
- Build command: `npm run build`
- Output directory: `dist`
- Start command: `npm start` (entry file: `server.js`)

The server listens on Hostinger's `PORT`; do not set a custom port. The forms send to FormSubmit directly, so no email API keys need to be added to Hostinger for form delivery.

After deployment, open `https://your-domain/health` and expect `{"status":"ok"}`. Submit each form and confirm delivery in the destination inbox. Hostinger's Node.js app setup supports configuring the build command, output directory, and entry file ([Hostinger deployment guide](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/)).
