import type { LucideIcon } from "lucide-react";
import { Clock, Scissors, Star, Train } from "lucide-react";
import { verifiedWorkPhotos } from "../data/socialProof";

export type MainCtaLabel = "Tule ilman ajanvarausta" | "Katso sijainti" | "Tule käymään";

export const phoneDisplay = "040 058 8484";
export const phoneHref = "tel:+358400588484";
export const email = "Goldencutparturi@gmail.com";
export const emailHref = "mailto:Goldencutparturi@gmail.com";
export const address = "Kirkkojärventie 10 B, 02770 Espoo";
export const mapsUrl = "https://maps.app.goo.gl/5Q13WYSJaTtNGvio9";
export const instagramUrl = "https://www.instagram.com/goldencut_parturi/";
export const facebookUrl = "https://www.facebook.com/goldencutparturi/?locale=fi_FI";
export const tiktokUrl = "https://www.tiktok.com/@goldencutparturi";
export const heroPhoto = verifiedWorkPhotos[0];

// Add a real hosted file to public/assets/golden-cut-hero.mp4 when available.
// Empty string keeps the image fallback active and avoids broken video requests.
export const heroVideoUrl = "";

export const luxuryEase = [0.16, 1, 0.3, 1] as const;

export const nav = [
  ["#palvelut", "Palvelut"],
  ["#hinnasto", "Hinnasto"],
  ["#kuvat", "Galleria"],
  ["#sijainti", "Sijainti"],
] as const;

export const footerLinks = [
  ["#etusivu", "Etusivu"],
  ["#palvelut", "Palvelut"],
  ["#hinnasto", "Hinnasto"],
  ["#kuvat", "Galleria"],
  ["#sijainti", "Yhteys"],
] as const;

export const haircutServices = [
  { name: "Klassinen leikkaus", desc: "Perinteinen kone- tai saksileikkaus siisteillä linjoilla.", price: "20 €" },
  { name: "Skin fade", desc: "Moderni ja tarkka häivytys nollasta ylöspäin.", price: "20 €" },
  { name: "Mid fade / Taper fade", desc: "Luonnollinen ja helposti ylläpidettävä fade.", price: "20 €" },
  { name: "Lasten leikkaus", desc: "Rento ja nopea leikkaus perheen pienimmille.", price: "kysy" },
];

export const beardServices = [
  { name: "Parran muotoilu", desc: "Linjojen siistiminen ja muodon hakeminen.", price: "15 €" },
  { name: "Koneajo", desc: "Nopea ja tarkka lyhennys koneella.", price: "10 €" },
  { name: "Hiukset + parta", desc: "Kokonaisuus, jossa leikkaus ja parta viimeistellään samalla käynnillä.", price: "35 €" },
];

export type ProofItem = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export const proofItems: ProofItem[] = [
  { icon: Clock, title: "Nopea palvelu", text: "Walk-in-malli sopii arkeen ilman ylimääräistä säätöä." },
  { icon: Scissors, title: "Tarkka työnjälki", text: "Skin fade, mid fade, taper fade ja partapalvelut." },
  { icon: Star, title: "4.7/5 Google", text: "Yli 300 arvostelua ja vahva paikallinen maine." },
  { icon: Train, title: "Aseman vieressä", text: "Helppo tulla junalla, autolla tai kävellen." },
];

export const reveal = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.82, ease: luxuryEase },
  },
};
