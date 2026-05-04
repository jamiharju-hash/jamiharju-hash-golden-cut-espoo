# Golden Cut Parturi — full stack conversion site

Public website and lightweight lead-capture backend for Golden Cut Parturi, Kirkkojärventie 10 B, Espoo.

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
- Barbershop schema.org JSON-LD
- robots.txt and sitemap.xml
- Analytics helper with `window.gtag` support

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
