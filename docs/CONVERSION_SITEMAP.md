# Golden Cut Parturi — conversion-optimized sitemap

## Objective

The website must convert visitors into measurable actions: booking/contact, gift card purchases, product purchases and walk-in visits.

## Primary navigation

| Page / section | Purpose | Primary CTA | Secondary CTA |
|---|---|---|---|
| Home | Establish trust and local relevance | Tule ilman ajanvarausta | Kysy aikaa |
| Ajanvaraus | Let customers reserve or ask for a suitable time through the selected provider | Varaa aika | Soita |
| Lahjakortti Store | Sell gift cards directly | Osta lahjakortti | Kysy lahjakortista |
| Tuotekauppa | Sell selected barber products | Osta tuote | Kysy saatavuus |
| Palvelut | Show service fit and pricing logic | Kysy aikaa | Katso sijainti |
| Kuvat ja arvostelut | Build trust with proof | Katso Google-profiili | Avaa Instagram |
| Sijainti | Convert local intent into visit | Avaa Google Maps | Soita |

## Recommended URL structure

```txt
/
/ajanvaraus
/lahjakortti
/tuotteet
/palvelut
/kuvat
/sijainti
```

Current implementation can be a single-page application using anchors:

```txt
/#ajanvaraus
/#lahjakortti
/#tuotteet
/#palvelut
/#kuvat
/#sijainti
```

## Funnel priority

1. **Ajanvaraus / kysy aikaa** — highest-intent users who want certainty.
2. **Walk-in / Google Maps** — local users near Espoon keskus.
3. **Lahjakortti Store** — gift buyers.
4. **Tuotekauppa** — add-on revenue from existing and returning customers.
5. **Instagram / Google profile** — proof and fast communication.

## Home page structure

1. Header
   - Logo
   - Palvelut
   - Ajanvaraus
   - Lahjakortti
   - Tuotteet
   - Sijainti
   - CTA: Kysy aikaa
   - CTA: Tule ilman ajanvarausta

2. Hero
   - Trust badge: 4.7/5 Google • yli 300 arvostelua
   - Headline: Espoon keskuksen luottoparturi — ilman ajanvarausta.
   - Body: Nopea, tarkka ja helposti saavutettava parturi Espoon aseman vieressä.
   - CTA 1: Tule ilman ajanvarausta
   - CTA 2: Kysy aikaa
   - CTA 3: Soita

3. Conversion cards
   - Ajanvaraus
   - Lahjakortti Store
   - Tuotteet
   - Sijainti

4. Services
   - Miesten leikkaus
   - Skin fade
   - Mid fade
   - Taper fade
   - Parta
   - Lasten leikkaus

5. Lahjakortti Store
   - 30 €
   - 50 €
   - 75 €
   - 100 €
   - custom amount later

6. Tuotekauppa
   - Shaving gel
   - Partasaippua
   - Partaöljy 30 ml
   - Cutrin Shampoo Bio+
   - Beard Balm

7. Google proof
   - Real review excerpts
   - Google Business Profile link
   - Image section

8. Location
   - Google Maps embed
   - Address
   - Phone
   - Instagram
   - Email

## Required integrations

| Integration | Needed value |
|---|---|
| Booking provider | Booking URL from third-party booking system |
| Gift card checkout | Store/checkout URL for gift cards |
| Product checkout | Store/checkout URL or product collection URL |
| Analytics | GA4 / gtag ID |
| Lead fallback | Phone, Instagram and email |

## Production rule

Do not show a fake checkout flow. If the booking, gift card or product checkout provider URL is not ready, route the CTA to the best live channel until the provider link exists.
