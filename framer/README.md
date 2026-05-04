# Framer templates

This folder contains Framer-ready layout specifications for recreating the Golden Cut website in Framer.

## Files

```txt
golden-cut-framer-template.json
```

## How to use in Framer

Framer does not import this JSON as a complete website automatically. Use it as a structured build specification:

1. Create a new Framer project.
2. Set the design tokens from `colors`, `typography` and `layout`.
3. Build the sections in the same order as `pages[0].sections`.
4. Use the exact copy from each section.
5. Link CTAs to:
   - Google Maps: `https://maps.app.goo.gl/5Q13WYSJaTtNGvio9`
   - Phone: `tel:+358400588484`
   - Instagram: `https://www.instagram.com/goldencut_parturi/`
6. Keep review snippets and Google Business Profile content traceable.

## Recommended Framer structure

```txt
Header
Hero
QuickPaths
Services
Pricing
GiftCard
Products
Gallery
Reviews
FAQ
Location
Contact
Footer
```

## Breakpoints

Use these as the primary QA widths:

```txt
375px
430px
768px
1024px
1440px
```

## Important content rule

Do not use placeholder barber work photos or stock images as client work. Use either:

- client-owned work photos, or
- traceable Google Business Profile content linked to the Google profile.
