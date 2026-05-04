# Golden Cut design system

## Objective

Define the visual and interaction standards for the Golden Cut Parturi website. The system is built for a local service business where the main commercial actions are walk-in visits, phone calls, gift card requests and product-interest leads.

## Brand position

Golden Cut is not positioned as a luxury spa. The correct position is practical premium:

> Fast, accurate and fairly priced men’s barber in Espoon keskus, next to the train station, without appointment friction.

## Tone of voice

Use a voice that is:

- Direct
- Professional
- Local
- Confident
- Practical
- Modern masculine

Avoid:

- Excessive luxury language
- Over-polished salon vocabulary
- Vague wellness language
- Claims that imply appointment booking if the business is walk-in-first

## Core message

Primary headline:

> Espoon keskuksen luottoparturi miehille.

Primary CTA:

> Tule ilman ajanvarausta

Secondary CTA:

> Soita 040 058 8484

## Visual system

### Color palette

| Role | Tailwind utility | Usage |
|---|---|---|
| Background | `bg-black`, `bg-zinc-950` | Main site background and alternating sections |
| Surface | `bg-black`, `bg-zinc-950` | Cards, forms, map containers |
| Border | `border-zinc-800`, `border-zinc-900` | Card and layout separation |
| Accent | `amber-300`, `amber-400` | CTA, icons, labels, key figures |
| Body text | `text-zinc-300`, `text-zinc-400` | Paragraphs and supporting copy |
| Muted text | `text-zinc-500` | Descriptions and metadata |
| Headline | `text-white` | Main headings |

### Layout

Use a maximum page width of:

```txt
max-w-6xl
```

This keeps the layout controlled on large desktop screens and prevents the page from feeling stretched.

### Section rhythm

Default section spacing:

```txt
px-4 py-16 sm:px-6 lg:px-8
```

For compact conversion strips:

```txt
px-4 py-8 sm:px-6 lg:px-8
```

### Cards

Default card style:

```txt
rounded-3xl border border-zinc-800 bg-black p-5
```

Use amber borders sparingly. Amber should guide attention, not decorate every element.

## Responsive rules

### Mobile

- Single-column layout
- Sticky walk-in CTA at the bottom
- Header shows logo and hamburger only
- Forms stack vertically
- Hero image is hidden

### Tablet

- Cards use 2-column grids where useful
- Header still avoids overcrowding
- CTA buttons may sit side-by-side

### Desktop

- Header shows the core navigation only
- Hero uses two columns
- Product cards can use 5 columns
- Forms can sit next to explanatory copy

## Conversion hierarchy

1. Walk-in maps click
2. Phone call
3. Gift card request
4. Product interest request
5. Social clicks

Do not put all actions at equal visual weight. The walk-in CTA is the primary business action.

## Analytics events

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

Each click event should include a `source` parameter such as:

```txt
hero
header
mobile_menu
mobile_sticky
services_top
gift_card_section
products_top
contact_card
footer
```

## Accessibility standards

- CTA buttons must have clear action labels.
- Icon-only links need `aria-label`.
- Form inputs need visible labels.
- Text contrast must remain high on black backgrounds.
- Do not rely only on color to communicate state.
- Touch targets should be at least 44px high.

## Implementation checklist

- [ ] Header does not overflow at 1024px.
- [ ] Hero is readable at 375px width.
- [ ] Sticky CTA does not cover form submit buttons.
- [ ] Forms are usable on mobile.
- [ ] Map loads and does not overflow.
- [ ] All primary CTAs track events.
- [ ] `/api/leads` accepts valid contact leads.
- [ ] `/api/gift-cards` accepts valid gift-card leads.
- [ ] `CONTACT_WEBHOOK_URL` forwarding works in production.
