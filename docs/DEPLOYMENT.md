# Deployment guide

## Objective

Deploy the Golden Cut website to Vercel as a Vite + React application with serverless API endpoints.

## Vercel project settings

Use these settings:

| Setting | Value |
|---|---|
| Framework preset | Vite |
| Install command | `npm install` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Root directory | empty / repository root |

The repository includes `vercel.json` with these values.

## Environment variables

Optional:

```bash
CONTACT_WEBHOOK_URL=
```

Add this in Vercel:

```txt
Project → Settings → Environment Variables
```

Set it for Production, Preview and Development if needed.

## Webhook setup options

Recommended no-code options:

1. Make webhook → Gmail / Google Sheets / Notion CRM
2. Zapier webhook → Gmail / Sheets / CRM
3. Pipedream webhook → custom routing
4. n8n webhook → self-hosted automation
5. Slack incoming webhook → lead notifications

## Deployment process

1. Push to `main`.
2. Vercel detects the commit.
3. Vercel runs `npm install`.
4. Vercel runs `npm run build`.
5. Static frontend is served from `dist`.
6. API files under `/api` are deployed as serverless functions.

## Post-deploy checklist

### Frontend

- [ ] Home page loads.
- [ ] Header does not overflow at 1024px.
- [ ] Mobile menu opens and closes.
- [ ] Sticky CTA is visible on mobile.
- [ ] Hero is readable at 375px.
- [ ] Map embed loads.
- [ ] Product cards do not overflow.
- [ ] Forms are usable on mobile.

### API

- [ ] Gift card form submits successfully.
- [ ] Product interest form submits successfully.
- [ ] Contact form submits successfully.
- [ ] Invalid form data returns validation errors.
- [ ] Vercel Function Logs show leads if no webhook is configured.
- [ ] Webhook receives leads if `CONTACT_WEBHOOK_URL` is configured.

### SEO

- [ ] `/robots.txt` loads.
- [ ] `/sitemap.xml` loads.
- [ ] Page title is correct.
- [ ] Meta description is correct.
- [ ] JSON-LD validates in Rich Results Test.

## Common Vercel issue

If Vercel says:

```txt
No Next.js version detected
```

then the Vercel project is using the wrong framework preset.

Fix:

```txt
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

## Rollback

Use Vercel Deployments tab and promote the last working deployment.

Repository-level rollback can be done by reverting the problematic commit in GitHub.
