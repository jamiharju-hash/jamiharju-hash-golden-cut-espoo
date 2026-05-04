# API documentation

## Objective

Document the serverless API endpoints used by the Golden Cut website.

The backend is intentionally lightweight. It captures form submissions, validates input, enriches the request with metadata and optionally forwards the lead to a webhook.

## Environment variables

```bash
CONTACT_WEBHOOK_URL=
```

If `CONTACT_WEBHOOK_URL` is set, every valid lead is forwarded as JSON.

If it is not set, the lead is written to Vercel Function Logs using `console.info`.

## Shared behavior

All endpoints return JSON.

Success response:

```json
{
  "ok": true,
  "forwarded": true
}
```

If no webhook is configured:

```json
{
  "ok": true,
  "forwarded": false
}
```

Validation error:

```json
{
  "ok": false,
  "error": "Missing required fields",
  "missing": ["name"]
}
```

Server error:

```json
{
  "ok": false,
  "error": "Internal server error"
}
```

## `POST /api/leads`

Captures general contact leads and product-interest leads.

### Payload

```json
{
  "type": "contact",
  "name": "Example Customer",
  "email": "customer@example.com",
  "phone": "040 000 0000",
  "message": "Hei, kysyn tuotteesta.",
  "source": "contact_form"
}
```

### Required fields

- `name`
- `message`
- either `email` or `phone`

### Supported lead types

```txt
contact
product_interest
```

The endpoint does not hard-block other lead types, but production usage should keep naming consistent.

## `POST /api/gift-cards`

Captures gift card requests.

### Payload

```json
{
  "buyerName": "Example Buyer",
  "buyerEmail": "buyer@example.com",
  "buyerPhone": "040 000 0000",
  "recipientName": "Gift Recipient",
  "amount": "50",
  "customAmount": "",
  "message": "Hyvää syntymäpäivää",
  "source": "gift_card_form"
}
```

### Required fields

- `buyerName`
- `recipientName`
- `amount`
- either `buyerEmail` or `buyerPhone`

### Allowed amounts

```txt
30
50
75
100
custom
```

If `amount` is `custom`, `customAmount` is required.

## Webhook payload

When forwarding is enabled, the API sends:

```json
{
  "type": "gift_card",
  "lead": {
    "buyerName": "Example Buyer",
    "buyerEmail": "buyer@example.com",
    "buyerPhone": "040 000 0000",
    "recipientName": "Gift Recipient",
    "amount": "50",
    "message": "Hyvää syntymäpäivää",
    "source": "gift_card_form",
    "meta": {
      "userAgent": "...",
      "referer": "...",
      "ip": "...",
      "createdAt": "2026-04-30T00:00:00.000Z"
    }
  }
}
```

## Testing with curl

### Contact lead

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"type":"contact","name":"Testi","phone":"0400000000","message":"Testiviesti","source":"curl"}'
```

### Gift card lead

```bash
curl -X POST http://localhost:3000/api/gift-cards \
  -H "Content-Type: application/json" \
  -d '{"buyerName":"Testi","buyerPhone":"0400000000","recipientName":"Saaja","amount":"50","message":"Testi","source":"curl"}'
```

## Production notes

- Use HTTPS webhook URLs only.
- Avoid sending sensitive personal data beyond what is needed for the lead workflow.
- If forwarding to Google Sheets or a CRM, store `createdAt`, `source`, `type`, `name`, `phone`, `email`, and message fields.
- Add spam protection later if traffic increases.
