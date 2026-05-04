import {
  CalendarDays,
  Car,
  CheckCircle2,
  Clock,
  Gift,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scissors,
  ShoppingBag,
  Star,
  Train,
  X,
} from "lucide-react";
import { useState } from "react";
import { verifiedReviews, verifiedWorkPhotos } from "./data/socialProof";
import { trackEvent } from "./lib/analytics";

const phoneDisplay = "040 058 8484";
const phoneHref = "tel:+358400588484";
const email = "Goldencutparturi@gmail.com";
const emailHref = "mailto:Goldencutparturi@gmail.com";
const address = "Kirkkojärventie 10 B, 02770 Espoo";
const mapsUrl = "https://maps.app.goo.gl/5Q13WYSJaTtNGvio9";
const instagramUrl = "https://www.instagram.com/goldencut_parturi/";
const facebookUrl = "https://www.facebook.com/goldencutparturi/?locale=fi_FI";
const tiktokUrl = "https://www.tiktok.com/@goldencutparturi";
const heroPhoto = verifiedWorkPhotos[0];

// Vaihda nämä oikeisiin palveluntarjoajien linkkeihin, kun checkoutit / ajanvaraus ovat valmiit.
const bookingUrl = phoneHref;
const giftCardUrl = instagramUrl;
const productStoreUrl = instagramUrl;

const nav = [
  ["#ajanvaraus", "Ajanvaraus"],
  ["#lahjakortti", "Lahjakortti"],
  ["#tuotteet", "Tuotteet"],
  ["#palvelut", "Palvelut"],
  ["#sijainti", "Sijainti"],
] as const;

const services = [
  ["Miesten leikkaus", "alk. 20 €", "Klassinen tai moderni leikkaus asiakkaan toiveiden mukaan."],
  ["Skin fade", "alk. 20 €", "Tarkka häivytys ja viimeistelty lopputulos."],
  ["Mid fade", "alk. 20 €", "Moderni, siisti ja helposti ylläpidettävä tyyli."],
  ["Taper fade", "alk. 20 €", "Luonnollinen häivytys niskasta ja sivuilta."],
  ["Parta", "kysy liikkeestä", "Parran muotoilu, siistiminen ja viimeistely."],
  ["Lasten leikkaus", "kysy liikkeestä", "Rento ja lapsiystävällinen palvelu."],
] as const;

const products = [
  ["Shaving gel", "15,00 €"],
  ["Partasaippua", "10,00 €"],
  ["Partaöljy 30 ml", "25,00 €"],
  ["Cutrin Shampoo Bio+", "20,00 €"],
  ["Beard Balm", "20,00 €"],
] as const;

const giftCards = ["30 €", "50 €", "75 €", "100 €"] as const;

const valueProps = [
  [Clock, "Nopea palvelu", "Walk-in sopii arkeen, kun haluat siistin lopputuloksen ilman turhaa säätöä."],
  [Scissors, "Hyvä jälki", "Fade-tyylit, miesten leikkaukset ja partapalvelut tehdään tarkasti."],
  [Star, "Vahva asiakastyytyväisyys", "4.7/5 Google-arvosana ja yli 300 arvostelua kertovat tasaisesta laadusta."],
  [Train, "Espoon aseman vieressä", "Helppo tulla junalla, autolla tai kävellen Espoon keskuksessa."],
] as const;

const faqs = [
  ["Tarvitseeko ajanvarauksen?", "Voit tulla ilman ajanvarausta. Jos haluat varmistaa sopivan ajan, kysy nopeasti soittamalla tai Instagramissa."],
  ["Voiko lahjakortin ostaa?", "Kyllä. Lahjakortin voi ostaa tai varata yhteydenotolla. Suora lahjakorttikauppa voidaan kytkeä erilliseen checkout-linkkiin."],
  ["Voiko tuotteita ostaa mukaan?", "Kyllä. Suosikkituotteita voi ostaa mukaan käynnin yhteydessä. Saatavuuden voi kysyä etukäteen."],
  ["Missä liike sijaitsee?", "Kirkkojärventie 10 B, aivan Espoon juna-aseman vieressä."],
] as const;

function trackMaps(source: string) {
  trackEvent("click_walk_in_maps", { source });
}

function trackPhone(source: string) {
  trackEvent("click_phone_call", { source });
}

function PrimaryCta({ source, className = "" }: { source: string; className?: string }) {
  return (
    <a href={mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps(source)} className={`premium-cta inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-black text-[var(--ink)] ${className}`}>
      <MapPin className="h-4 w-4" />
      Tule ilman ajanvarausta
    </a>
  );
}

function BookingCta({ source, className = "" }: { source: string; className?: string }) {
  return (
    <a href={bookingUrl} onClick={() => trackPhone(source)} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--brass-soft)] bg-[rgba(255,255,255,0.045)] px-6 py-3 text-sm font-black text-[var(--bone)] ${className}`}>
      <CalendarDays className="h-4 w-4 text-[var(--champagne)]" />
      Varaa / kysy aikaa
    </a>
  );
}

function PhoneCta({ source, className = "" }: { source: string; className?: string }) {
  return (
    <a href={phoneHref} onClick={() => trackPhone(source)} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--brass-soft)] bg-[rgba(255,255,255,0.045)] px-6 py-3 text-sm font-black text-[var(--champagne)] ${className}`}>
      <Phone className="h-4 w-4" />
      Soita {phoneDisplay}
    </a>
  );
}

function StoreCta({ href, label, source, className = "" }: { href: string; label: string; source: string; className?: string }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} onClick={() => trackEvent(source, { source })} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.045)] px-6 py-3 text-sm font-black text-[var(--bone)] ${className}`}>
      <ShoppingBag className="h-4 w-4 text-[var(--champagne)]" />
      {label}
    </a>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-[var(--champagne)]">{children}</p>;
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-3xl">
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="font-display text-3xl font-black leading-[1.05] tracking-[-0.045em] text-[var(--bone)] sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-8 text-[var(--soft)]">{text}</p>}
    </div>
  );
}

function Logo() {
  return (
    <a href="#etusivu" className="brand-logo flex min-w-0 items-center gap-3" aria-label="Golden Cut etusivu">
      <span className="brand-mark"><Scissors className="h-5 w-5" /></span>
      <span className="min-w-0 leading-none">
        <span className="brand-wordmark font-display block truncate font-black uppercase">Golden Cut</span>
        <span className="brand-subtitle mt-1 block uppercase">Parturi Espoo</span>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header sticky top-0 z-50">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="site-nav hidden items-center text-sm font-bold lg:flex">
          {nav.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a href={instagramUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_instagram", { source: "header" })} className="icon-button" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
          <BookingCta source="header_booking" className="hidden xl:inline-flex" />
          <PrimaryCta source="header" className="hidden xl:inline-flex" />
        </div>
        <button className="icon-button lg:hidden" onClick={() => setOpen(!open)} aria-label="Avaa valikko">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>
      {open && (
        <div className="mobile-menu border-t border-[var(--line)] px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {nav.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
            <a href="#kuvat" onClick={() => setOpen(false)}>Kuvat ja palaute</a>
            <div className="grid gap-2 pt-2 sm:grid-cols-2"><BookingCta source="mobile_booking" /><PrimaryCta source="mobile_menu" /></div>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="etusivu" className="premium-hero relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="pointer-events-none absolute inset-0 hero-depth" />
      <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="max-w-4xl">
          <div className="trust-badge mb-5 inline-flex items-center gap-2"><Star className="h-4 w-4 fill-current" /> 4.7/5 Google • yli 300 arvostelua</div>
          <h1 className="font-display text-4xl font-black leading-[1.01] tracking-[-0.055em] text-[var(--bone)] sm:text-6xl lg:text-7xl">Nopea, tarkka ja helposti saavutettava miesten parturi Espoon keskuksessa.</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--soft)] sm:text-lg">Luotettava arjen premium: hyvä jälki, reilu hinta, nopea palvelu ja erinomainen sijainti Espoon aseman vieressä. Tule ilman ajanvarausta, varaa aika, osta lahjakortti tai tilaa tuotteet.</p>
          <div className="mt-7 grid gap-3 sm:flex"><PrimaryCta source="hero" /><BookingCta source="hero_booking" /><PhoneCta source="hero" /></div>
          <div className="mt-7 grid gap-3 text-sm sm:grid-cols-2">
            {[[Clock, "Nopea palvelu"], [Train, "Espoon aseman vieressä"], [Gift, "Lahjakortit"], [ShoppingBag, "Tuotteet mukaan"]].map(([Icon, text]) => <div key={String(text)} className="premium-fact flex items-center gap-2 rounded-2xl border p-3"><Icon className="h-4 w-4 shrink-0 text-[var(--champagne)]" />{String(text)}</div>)}
          </div>
        </div>
        <a href={heroPhoto.sourceUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps("hero_google_photo")} className="hero-media hidden overflow-hidden rounded-[2rem] lg:block">
          <img src={heroPhoto.imageUrl} alt="Golden Cut Parturi Espoo" className="h-[420px] w-full object-cover xl:h-[500px]" loading="eager" />
          <div className="grid gap-4 border-t border-[var(--line)] bg-[rgba(3,3,2,0.96)] p-5 sm:grid-cols-[1fr_auto] sm:items-center">
            <div><p className="text-xs font-black uppercase tracking-[0.26em] text-[var(--champagne)]">Golden Cut Parturi</p><p className="mt-2 text-sm leading-6 text-[var(--soft)]">Kirkkojärventie 10 B, Espoo. Katso reitti ja lisäkuvat Google-profiilista.</p></div>
            <span className="text-sm font-black text-[var(--champagne)]">Avaa profiili →</span>
          </div>
        </a>
      </div>
    </section>
  );
}

function ValueProps() {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Brändilupaus" title="Luotettava arjen premium — ei turhaa luksuspuhetta." text="Golden Cutin vahvin myyntikulma on käytännöllinen: hyvä jälki, reilu hinta, nopea palvelu, vahva asiakastyytyväisyys ja helppo sijainti Espoon asemalla." />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {valueProps.map(([Icon, title, text]) => (
            <article key={title} className="premium-card rounded-3xl p-6">
              <Icon className="mb-4 h-6 w-6 text-[var(--champagne)]" />
              <h3 className="font-display text-xl font-black text-[var(--bone)]">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--soft)]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConversionSitemap() {
  const paths = [
    [CalendarDays, "Ajanvaraus", "Varmista sopiva aika kolmannen osapuolen ajanvarauksella tai puhelimitse.", "Varaa / kysy aikaa", bookingUrl, "click_booking"],
    [Gift, "Lahjakortti Store", "Osta lahjakortti suoraan lahjaksi tai kysy lahjakortista Instagramissa.", "Osta lahjakortti", giftCardUrl, "click_gift_card"],
    [ShoppingBag, "Tuotemyynti", "Pieni verkkokauppa suosikkituotteille: partaöljy, shampoo, vaha ja ajotuotteet.", "Katso tuotteet", productStoreUrl, "click_product_availability"],
    [MapPin, "Sijainti", "Tule suoraan liikkeeseen Espoon juna-aseman vieressä.", "Avaa kartta", mapsUrl, "click_walk_in_maps"],
  ] as const;

  return <section id="ajanvaraus" className="section-surface px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Sivustokartta" title="Nopea reitti ostoon, varaukseen ja käyntiin." text="Pääpolut on rakennettu konversiota varten: ajanvaraus, lahjakortit, tuotteet ja walk-in-käynti." /><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{paths.map(([Icon, title, text, cta, href, event]) => <a key={title} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} onClick={() => trackEvent(event, { source: "conversion_sitemap" })} className="premium-card rounded-3xl p-6"><Icon className="mb-4 h-6 w-6 text-[var(--champagne)]" /><h3 className="font-display text-xl font-black text-[var(--bone)]">{title}</h3><p className="mt-2 text-sm leading-7 text-[var(--soft)]">{text}</p><p className="mt-4 text-sm font-black text-[var(--champagne)]">{cta} →</p></a>)}</div></div></section>;
}

function Services() {
  return <section id="palvelut" className="px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><SectionHeading eyebrow="Palvelut" title="Miesten leikkaukset, fade-tyylit ja partapalvelut." text="Nopea, tarkka ja reilusti hinnoiteltu palvelu. Tule sisään, näytä tyyli ja anna parturin hoitaa loput." /><div className="grid gap-3 sm:flex"><BookingCta source="services_booking" /><PrimaryCta source="services_top" /></div></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map(([name, price, desc]) => <article key={name} className="premium-card rounded-3xl p-6"><Scissors className="mb-4 h-6 w-6 text-[var(--champagne)]" /><h3 className="font-display text-xl font-black text-[var(--bone)]">{name}</h3><p className="mt-2 text-sm leading-7 text-[var(--soft)]">{desc}</p><div className="mt-6 flex items-center justify-between border-t border-[var(--line)] pt-4"><span className="font-black text-[var(--champagne)]">{price}</span><a href={phoneHref} onClick={() => trackPhone(`service_${name}`)} className="text-sm font-bold text-[var(--bone)]">Kysy aikaa →</a></div></article>)}</div></div></section>;
}

function GiftCardStore() {
  return <section id="lahjakortti" className="section-surface px-4 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]"><div><SectionHeading eyebrow="Lahjakortti Store" title="Lahjakortti siistiin tyyliin." text="Helppo lahja miehelle, joka arvostaa nopeaa palvelua ja tarkkaa lopputulosta." /><div className="mt-6 grid gap-3 sm:flex"><StoreCta href={giftCardUrl} label="Osta lahjakortti" source="click_gift_card" /><PhoneCta source="gift_card_phone" /></div></div><div className="grid gap-3 sm:grid-cols-2">{giftCards.map((amount) => <a key={amount} href={giftCardUrl} target="_blank" rel="noreferrer" className="premium-card rounded-3xl p-6"><Gift className="mb-4 h-6 w-6 text-[var(--champagne)]" /><h3 className="font-display text-3xl font-black text-[var(--bone)]">{amount}</h3><p className="mt-2 text-sm leading-7 text-[var(--soft)]">Golden Cut -lahjakortti hiustenleikkaukseen, fade-tyyliin tai parturikäyntiin.</p><p className="mt-4 text-sm font-black text-[var(--champagne)]">Osta →</p></a>)}</div></div></section>;
}

function PricingProducts() {
  return <section id="hinnasto" className="px-4 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2"><div><SectionHeading eyebrow="Hinnasto" title="Reilu hinta. Tarkka jälki." text="Miesten hiustenleikkaus on ollut noin 20 €. Tarkka hinta vahvistetaan liikkeessä palvelun mukaan." /><div className="mt-8 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--ink)]">{services.slice(0, 5).map(([name, price]) => <div key={name} className="flex items-center justify-between gap-4 border-b border-[var(--line)] p-4 last:border-0"><span className="font-bold text-[var(--bone)]">{name}</span><span className="shrink-0 font-black text-[var(--champagne)]">{price}</span></div>)}</div></div><div id="tuotteet"><SectionHeading eyebrow="Tuotekauppa" title="Suosikkituotteet mukaan tai verkkokaupasta." text="Pieni tuotekauppa parturin suosikkituotteille. Kysy saatavuus liikkeessä, Instagramissa tai puhelimitse." /><div className="mt-8 grid gap-3 sm:grid-cols-2">{products.map(([name, price]) => <a key={name} href={productStoreUrl} target="_blank" rel="noreferrer" className="premium-card flex items-center justify-between rounded-2xl p-4"><span className="font-bold text-[var(--bone)]">{name}</span><span className="font-black text-[var(--champagne)]">{price}</span></a>)}</div><div className="mt-6 grid gap-3 sm:flex"><StoreCta href={productStoreUrl} label="Avaa tuotekauppa" source="click_product_availability" className="w-full sm:w-auto" /><PhoneCta source="products_phone" className="w-full sm:w-auto" /></div></div></div></section>;
}

function GalleryReviews() {
  return <section id="kuvat" className="section-surface px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Kuvat ja palaute" title="Asiakastyytyväisyys näkyy Google-profiilissa." text="Katso liikkeen kuvat, sijainti ja kaikki arvostelut Google-profiilista." /><div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]"><a href={heroPhoto.sourceUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps("gallery_google_photo")} className="hero-media overflow-hidden rounded-3xl"><img src={heroPhoto.imageUrl} alt={heroPhoto.title} className="h-full min-h-[360px] w-full object-cover" loading="lazy" /></a><div className="grid gap-4">{verifiedReviews.map((review) => <blockquote key={review.quote} className="premium-card rounded-3xl p-6"><div className="mb-3 flex gap-1 text-[var(--champagne)]">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div><p className="text-lg leading-8 text-[var(--bone)]">“{review.quote}”</p><p className="mt-3 text-xs font-black uppercase tracking-[0.2em] text-[var(--champagne)]">{review.label}</p></blockquote>)}<a href={mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps("reviews_google_profile")} className="text-sm font-black text-[var(--champagne)]">Katso Google-profiili ja kaikki arvostelut →</a></div></div></div></section>;
}

function LocationContact() {
  const hours = ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai", "Sunnuntai"];
  return <section id="sijainti" className="px-4 pb-28 sm:px-6 lg:px-8 lg:pb-28"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]"><div><SectionHeading eyebrow="Sijainti ja yhteys" title="Aivan Espoon juna-aseman vieressä." text="Tule ilman ajanvarausta tai kysy sopivaa aikaa puhelimella, Instagramissa tai sähköpostilla." /><div className="mt-6 grid gap-3"><a href={mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps("location_card")} className="premium-card flex gap-3 rounded-2xl p-4 text-[var(--soft)]"><MapPin className="h-5 w-5 shrink-0 text-[var(--champagne)]" />{address}</a><a href={phoneHref} onClick={() => trackPhone("location_card")} className="premium-card flex gap-3 rounded-2xl p-4 text-[var(--soft)]"><Phone className="h-5 w-5 shrink-0 text-[var(--champagne)]" />{phoneDisplay}</a><a href={instagramUrl} target="_blank" rel="noreferrer" className="premium-card flex gap-3 rounded-2xl p-4 text-[var(--soft)]"><Instagram className="h-5 w-5 shrink-0 text-[var(--champagne)]" />@goldencut_parturi</a><a href={emailHref} className="premium-card flex gap-3 rounded-2xl p-4 text-[var(--soft)]"><Mail className="h-5 w-5 shrink-0 text-[var(--champagne)]" />{email}</a></div><div className="premium-card mt-4 rounded-3xl p-6"><SectionLabel>Aukioloajat</SectionLabel>{hours.map((day, index) => <div key={day} className="flex justify-between border-b border-[var(--line)] py-2 text-sm text-[var(--soft)] last:border-0"><span>{day}</span><strong className="text-[var(--bone)]">{index === 6 ? "11–18" : "10–19"}</strong></div>)}</div></div><div className="overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--ink)]"><iframe title="Golden Cut-parturi kartta" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.4696338415222!2d24.655731276847625!3d60.20605967505068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x468df36efe27437b%3A0x71e90b46c830dc97!2sGolden%20Cut-parturi!5e0!3m2!1sfi!2sfi!4v1777578700979!5m2!1sfi!2sfi" width="100%" height="460" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div></section>;
}

function FAQ() {
  return <section className="section-surface px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Usein kysyttyä" title="Nopeat vastaukset ennen käyntiä." /><div className="mt-8 grid gap-4 md:grid-cols-2">{faqs.map(([question, answer]) => <article key={question} className="premium-card rounded-3xl p-6"><CheckCircle2 className="mb-3 h-5 w-5 text-[var(--champagne)]" /><h3 className="font-black text-[var(--bone)]">{question}</h3><p className="mt-2 leading-7 text-[var(--soft)]">{answer}</p></article>)}</div></div></section>;
}

function Footer() {
  return <footer className="border-t border-[var(--line)] bg-[var(--ink)] px-4 py-10 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3"><div><Logo /><p className="mt-4 text-sm leading-7 text-[var(--soft)]">Nopea, tarkka ja helposti saavutettava miesten parturi Espoon keskuksessa — ilman ajanvarausta.</p></div><div><h3 className="font-bold uppercase tracking-[0.22em] text-[var(--champagne)]">Pikalinkit</h3><div className="mt-4 grid gap-2 text-sm text-[var(--soft)]">{nav.map(([href, label]) => <a key={href} href={href}>{label}</a>)}<a href="#kuvat">Kuvat ja palaute</a></div></div><div><h3 className="font-bold uppercase tracking-[0.22em] text-[var(--champagne)]">Seuraa</h3><div className="mt-4 flex flex-wrap gap-2"><a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a><a href={facebookUrl} target="_blank" rel="noreferrer">Facebook</a><a href={tiktokUrl} target="_blank" rel="noreferrer">TikTok</a></div></div></div><div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-[rgba(0,0,0,0.96)] p-3 backdrop-blur md:hidden"><PrimaryCta source="mobile_sticky_walk_in" className="w-full" /></div></footer>;
}

export default function AppFinal() {
  return <div className="min-h-screen bg-[var(--ink)] text-[var(--bone)] antialiased"><Header /><main><Hero /><ValueProps /><ConversionSitemap /><Services /><GiftCardStore /><PricingProducts /><GalleryReviews /><FAQ /><LocationContact /></main><Footer /></div>;
}
