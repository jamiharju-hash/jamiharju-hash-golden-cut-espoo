# Golden Cut Parturi — production conversion site

Full stack conversion website for **Golden Cut Parturi**, Kirkkojärventie 10 B, Espoo.

The site is built for a walk-in-first barber shop. The commercial priority is not traditional appointment booking, but measurable local conversion: Google Maps clicks, phone calls, gift card requests, product-interest leads and contact form submissions.

## Production status

Current production entrypoint:

```txt
src/AppProduction.tsx
```

Current React mount:

```txt
src/main.tsx
```

Current deployment target:

```txt
Vercel / Vite / dist
```

The current public UI is production-oriented and contains no visible placeholder sections, fake review cards or stock-work claims. The visible social proof is based on project-provided Google review excerpts and Google Business Profile content references.

## Business goal

The site converts local search, Google profile, social media and referral traffic into these actions:

1. **Walk-in visits** via Google Maps clicks
2. **Phone calls** via `tel:` links
3. **Gift card requests** through a serverless form
4. **Product-interest leads** through a serverless form
5. **Contact form submissions** through a serverless form

## Brand positioning

Golden Cut is positioned as practical premium:

> Fast, accurate and fairly priced men’s barber in Espoon keskus, next to the train station, without appointment friction.

Primary message:

```txt
Espoon keskuksen luottoparturi miehille.
```

Primary CTA:

```txt
Tule ilman ajanvarausta
```

Secondary CTA:

```txt
Soita 040 058 8484
```

## Stack

- Vite
- React 19
- TypeScript
- Tailwind CSS
- Vercel serverless functions
- Optional webhook forwarding for CRM / email / automation

## Features

### Frontend

- Responsive dark premium UI
- Walk-in-first conversion structure
- Google Maps CTA flow
- Phone CTA flow
- Gift card request section
- Product availability request section
- Real Google-review excerpt section
- Google Business Profile image section
- Google Maps embed
- FAQ section
- Mobile sticky CTA
- Local SEO metadata
- Barbershop JSON-LD
- FAQ JSON-LD
- `robots.txt`
- `sitemap.xml`

### Backend

- `POST /api/leads`
- `POST /api/gift-cards`
- Input validation
- Email and phone validation
- Lead metadata capture
- Optional webhook forwarding
- Vercel Function Logs fallback

### Analytics

The site includes a lightweight analytics helper:

```txt
src/lib/analytics.ts
```

It sends events through `window.gtag` when Google Analytics is installed. In development, events are logged to the console.

Tracked events:

```txt
click_walk_in_maps
click_phone_call
click_instagram
click_facebook
click_tiktok
click_gift_card
click_product_availability
submit_gift_card_form
submit_product_interest_form
submit_contact_form
```

## Project structure

```txt
api/
  _utils.js
  gift-cards.js
  leads.js

src/
  components/
    LeadForms.tsx
  data/
    socialProof.ts
  lib/
    analytics.ts
  AppProduction.tsx
  main.tsx
  index.css

public/
  robots.txt
  sitemap.xml

docs/
  API.md
  CONTENT_SOURCING.md
  DEPLOYMENT.md
  DESIGN_SYSTEM.md
```

## Important files

| File | Purpose |
|---|---|
| `src/AppProduction.tsx` | Current production UI |
| `src/components/LeadForms.tsx` | Gift card, product and contact forms |
| `src/data/socialProof.ts` | Review and Google Business Profile content data |
| `src/lib/analytics.ts` | Conversion event helper |
| `api/leads.js` | Contact and product-interest backend endpoint |
| `api/gift-cards.js` | Gift card backend endpoint |
| `vercel.json` | Vercel Vite configuration |
| `index.html` | SEO metadata and JSON-LD |

## Documentation

- [Design system](docs/DESIGN_SYSTEM.md)
- [API documentation](docs/API.md)
- [Deployment guide](docs/DEPLOYMENT.md)
- [Content sourcing workflow](docs/CONTENT_SOURCING.md)

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

If `CONTACT_WEBHOOK_URL` is empty, valid leads are logged in Vercel Function Logs.

Recommended forwarding options:

- Make webhook → Gmail / Google Sheets / Notion CRM
- Zapier webhook → email / Sheets / CRM
- Pipedream webhook → custom processing
- n8n webhook → self-hosted workflow
- Slack webhook → internal lead notification

## Local development

```bash
npm install
npm run dev
```

Local site:

```txt
http://localhost:3000
```

## Production build

```bash
npm run build
```

Expected output:

```txt
dist/
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

Use these Vercel settings:

| Setting | Value |
|---|---|
| Framework preset | Vite |
| Install command | `npm install` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Root directory | repository root / empty |

## Design QA checklist

Test the layout at:

```txt
375px
430px
768px
1024px
1440px
```

Checklist:

- [ ] Header does not overflow.
- [ ] Mobile menu opens and closes.
- [ ] Hero headline is readable at 375px.
- [ ] Hero CTA buttons stack cleanly on mobile.
- [ ] Desktop hero image does not crop awkwardly.
- [ ] Sticky mobile CTA does not hide form buttons.
- [ ] Service cards have consistent height and spacing.
- [ ] Product cards do not contain fake images or placeholders.
- [ ] Google-profile image section uses authentic content only.
- [ ] Review section uses real excerpts only.
- [ ] Contact form is usable on mobile.
- [ ] Map embed does not overflow.

## Functional QA checklist

- [ ] `npm run build` passes.
- [ ] `/robots.txt` loads.
- [ ] `/sitemap.xml` loads.
- [ ] Walk-in CTA opens Google Maps.
- [ ] Phone CTA opens the phone app.
- [ ] Gift card form submits.
- [ ] Product-interest form submits.
- [ ] Contact form submits.
- [ ] Vercel Function Logs show leads when webhook is not configured.
- [ ] Webhook receives leads when `CONTACT_WEBHOOK_URL` is configured.
- [ ] JSON-LD validates in Google Rich Results Test.

## Content policy for production

Do not publish:

- fabricated reviews
- stock photos presented as client work
- copied customer names without permission
- Google profile images as local assets without client permission
- placeholder work-photo sections

Approved current approach:

- use project-provided Google review excerpts
- link Google Business Profile image/content to the Google profile
- replace linked Google media with client-owned `.webp` files when Golden Cut provides original images

Recommended owned asset path:

```txt
public/images/work/
  skin-fade-01.webp
  mid-fade-01.webp
  taper-fade-01.webp
  beard-01.webp
  kids-cut-01.webp
  shop-interior-01.webp
```

## Deployment verification

After deploy, verify:

```txt
/
/api/leads
/api/gift-cards
/robots.txt
/sitemap.xml
```

The live page should not contain the words:

```txt
placeholder
puuttuvat työnäytteet
webhook
CRM
lisää lopulliseen tuotantoon
```

Technical documentation may contain these terms, but the public customer-facing UI should not.
