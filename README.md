# Golden Cut Parturi — full stack conversion site

Public website and lightweight lead-capture backend for Golden Cut Parturi, Kirkkojärventie 10 B, Espoo.

## Business goal

The site is built to convert local search and social traffic into measurable actions:

1. Walk-in visits via Google Maps clicks
2. Phone calls
3. Gift card requests
4. Product-interest leads
5. Contact form submissions

## Stack

- Vite
- React 19
- TypeScript
- Tailwind CSS
- Vercel serverless functions
- Optional webhook forwarding for CRM / email / automation

## Features

- Responsive dark premium UI
- Walk-in conversion CTA
- Gift card lead form
- Product interest form
- Contact form
- Google Maps embed
- Local SEO metadata
- FAQ schema and Barbershop schema.org JSON-LD
- robots.txt and sitemap.xml
- Analytics helper with `window.gtag` support
- Vercel serverless API endpoints

## Project structure

```txt
api/
  _utils.js
  gift-cards.js
  leads.js
src/
  components/
    LeadForms.tsx
  lib/
    analytics.ts
  AppFullStack.tsx
  main.tsx
  index.css
public/
  robots.txt
  sitemap.xml
docs/
  API.md
  DEPLOYMENT.md
  DESIGN_SYSTEM.md
```

## Documentation

- [Design system](docs/DESIGN_SYSTEM.md)
- [API documentation](docs/API.md)
- [Deployment guide](docs/DEPLOYMENT.md)

## API endpoints

### `POST /api/leads`

General contact and product-interest leads.

Required:

- `name`
- `message`
- either `email` or `phone`

### `POST /api/gift-cards`

Gift card requests.

Required:

- `buyerName`
- `recipientName`
- `amount`
- either `buyerEmail` or `buyerPhone`

## Environment variables

```bash
CONTACT_WEBHOOK_URL=
```

If `CONTACT_WEBHOOK_URL` is empty, leads are logged in the Vercel function logs. Add a Zapier, Make, Pipedream, n8n, Slack, CRM or custom webhook URL to forward leads.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Vercel settings

The repository includes `vercel.json`:

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

In Vercel, use:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## QA checklist

- [ ] Build passes with `npm run build`.
- [ ] Home page works at 375px, 430px, 768px, 1024px and 1440px.
- [ ] Walk-in CTA opens Google Maps.
- [ ] Phone CTA opens phone link.
- [ ] Gift card form submits.
- [ ] Product form submits.
- [ ] Contact form submits.
- [ ] `/robots.txt` loads.
- [ ] `/sitemap.xml` loads.
- [ ] JSON-LD validates.
