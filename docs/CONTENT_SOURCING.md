# Authentic content sourcing

## Objective

Keep reviews and photo assets authentic, traceable and legally safe.

## Current implementation

Authentic social proof is stored in:

```txt
src/data/socialProof.ts
```

The data is consumed by:

```txt
src/AppAuthentic.tsx
```

The live app entrypoint is:

```txt
src/main.tsx
```

## Reviews

Current review snippets are based on Google review excerpts and review themes delivered in the project brief.

Current snippets:

- "Todella nopea ja tarkka tukan leikkaus."
- "Laatu pysyy hyvänä kerrasta toiseen."
- "Ainoa paikka, johon poika suostuu mielellään parturiin."

Each review object includes:

```ts
{
  quote: string;
  label: string;
  source: string;
  note: string;
}
```

## Photos

The current Google Business Profile image URL is stored as a traceable source reference in `verifiedWorkPhotos`.

Important: before final production use, replace or supplement Google-hosted images with images that the client owns or has written permission to use.

Recommended final production structure:

```txt
public/images/work/
  skin-fade-01.webp
  mid-fade-01.webp
  taper-fade-01.webp
  beard-01.webp
  kids-cut-01.webp
  shop-interior-01.webp
```

Then update `verifiedWorkPhotos` to use local paths:

```ts
imageUrl: "/images/work/skin-fade-01.webp"
```

## Required photo slots

- Skin fade
- Mid fade
- Taper fade
- Parta
- Lasten leikkaus
- Liikkeen sisäkuva

## Safe workflow

1. Download/export photos only from sources the client owns or has explicit permission to use.
2. Convert photos to `.webp`.
3. Resize large images to 1600px max width.
4. Store photos under `public/images/work/`.
5. Update `src/data/socialProof.ts`.
6. Keep original source notes in the data file.
7. Run `npm run build`.

## Do not do this

- Do not fabricate reviews.
- Do not use full reviewer names without permission.
- Do not imply that a paraphrased review is a direct quote.
- Do not scrape or redistribute Google images without client permission.
- Do not use stock photos as actual client work.

## Recommended next step

Ask Golden Cut to provide 10–20 original work photos and 6–10 approved review quotes. Then replace temporary Google-linked content with owned assets.
