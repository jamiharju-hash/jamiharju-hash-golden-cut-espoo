import {
  CalendarDays,
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

// Replace with live provider URLs when integrations are ready.
const bookingUrl = phoneHref;
const giftCardUrl = instagramUrl;
const productStoreUrl = instagramUrl;

const nav = [
  ["#palvelut", "Palvelut"],
  ["#hinnasto", "Hinnasto"],
  ["#lahjakortti", "Lahjakortti"],
  ["#tuotteet", "Tuotteet"],
  ["#kuvat", "Galleria"],
  ["#sijainti", "Yhteystiedot"],
] as const;

const mobileNav = [
  ["#ajanvaraus", "Varaa aika"],
  ["#palvelut", "Palvelut"],
  ["#lahjakortti", "Lahjakortti"],
  ["#tuotteet", "Tuotteet"],
  ["#sijainti", "Yhteystiedot"],
] as const;

const services = [
  ["Miesten leikkaus", "alk. 20 €", "30 min", "Selkeä ja siisti arkileikkaus."],
  ["Fade / Skin fade", "alk. 20 €", "30–45 min", "Tarkka häivytys ja viimeistelty lopputulos."],
  ["Mid fade", "alk. 20 €", "30–45 min", "Moderni, siisti ja helposti ylläpidettävä tyyli."],
  ["Taper fade", "alk. 20 €", "30–45 min", "Luonnollinen häivytys niskasta ja sivuilta."],
  ["Hiukset + parta", "kysy liikkeestä", "45–60 min", "Kokonaisuus hiuksille ja parralle."],
  ["Lasten leikkaus", "kysy liikkeestä", "20–30 min", "Rento ja lapsiystävällinen palvelu."],
] as const;

const products = [
  ["Shaving gel", "Parranajoon", "15,00 €"],
  ["Partasaippua", "Beard soap", "10,00 €"],
  ["Partaöljy 30 ml", "Parturin valinta", "25,00 €"],
  ["Cutrin Shampoo Bio+", "Hiuksille", "20,00 €"],
  ["Beard Balm", "Partavaha", "20,00 €"],
] as const;

const giftCards = [
  ["30 €", "Sopii nopeaan siistimiseen tai osaksi palvelua."],
  ["50 €", "Hyvä valinta leikkaukseen tai lahjaksi."],
  ["75 €", "Sopii hiuksiin, partaan tai tuotteisiin."],
  ["100 €", "Selkeä lahja paljon palveluita käyttävälle."],
] as const;

const quickChoices = ["Miesten leikkaus", "Fade / Skin fade", "Parta", "Hiukset + parta", "Lasten leikkaus"] as const;

const section = "px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28";
const surfaceSection = `${section} border-y border-[#f4c54214] bg-[#0a0a0a]`;
const container = "mx-auto max-w-7xl";
const card = "surface-card rounded-3xl border border-[#f4c5423d] p-6";
const compactCard = "surface-card rounded-2xl border border-[#f4c5423d] p-4";
const gold = "text-[#f4c542]";
const muted = "text-[#e7e7e7]";

function trackMaps(source: string) {
  trackEvent("click_walk_in_maps", { source });
}

function trackPhone(source: string) {
  trackEvent("click_phone_call", { source });
}

function PrimaryCta({ source, className = "" }: { source: string; className?: string }) {
  return (
    <a href={bookingUrl} onClick={() => trackPhone(source)} className={`premium-cta inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-black text-[#050505] transition hover:-translate-y-0.5 ${className}`}>
      <CalendarDays className="h-4 w-4" />
      Varaa aika
    </a>
  );
}

function SecondaryCta({ href, label, icon, source, className = "" }: { href: string; label: string; icon: "map" | "gift" | "phone" | "shop"; source: string; className?: string }) {
  const Icon = icon === "map" ? MapPin : icon === "gift" ? Gift : icon === "phone" ? Phone : ShoppingBag;
  const isExternal = href.startsWith("http");
  return (
    <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined} onClick={() => icon === "phone" ? trackPhone(source) : trackEvent(source, { source })} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#f4c54257] bg-white/[0.045] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:border-[#f4c54280] hover:bg-[#f4c5421a] ${className}`}>
      <Icon className="h-4 w-4 text-[#f4c542]" />
      {label}
    </a>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-[#f4c542]">{children}</p>;
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-3xl">
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="font-display text-[clamp(2rem,5vw,2.65rem)] font-black leading-[1.08] tracking-[-0.045em] text-white sm:text-4xl">{title}</h2>
      {text && <p className={`mt-4 text-base leading-8 ${muted}`}>{text}</p>}
    </div>
  );
}

function Logo() {
  return (
    <a href="#etusivu" className="flex min-w-0 max-w-[calc(100vw-6.6rem)] items-center gap-3 sm:max-w-none" aria-label="Golden Cut etusivu">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[0.95rem] border border-[#f4c5425c] bg-[linear-gradient(145deg,#171717,#080808)] text-[#f4c542] shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_14px_30px_rgba(0,0,0,.35)] sm:h-[3.2rem] sm:w-[3.2rem] sm:rounded-2xl">
        <Scissors className="h-5 w-5" />
      </span>
      <span className="min-w-0 leading-none">
        <span className="font-display block truncate text-[clamp(.94rem,4.7vw,1.1rem)] font-black uppercase tracking-[0.17em] text-white sm:text-[1.18rem] sm:tracking-[0.2em]">Golden Cut</span>
        <span className="mt-1 block truncate text-[0.61rem] uppercase tracking-[0.26em] text-[#b9b9b9] sm:text-[0.68rem] sm:tracking-[0.34em]">Parturi Espoo</span>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[#f4c5422e] bg-[#050505]/95 shadow-[0_18px_45px_rgba(0,0,0,.42)] backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-[0.2rem] rounded-full border border-[#f4c5421f] bg-white/[0.035] p-[0.35rem] text-sm font-bold xl:flex">
          {nav.map(([href, label]) => <a key={href} href={href} className="rounded-full px-[0.82rem] py-[0.56rem] text-[0.84rem] font-extrabold text-[#e7e7e7] transition hover:bg-[#f4c5421f] hover:text-white">{label}</a>)}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a href={instagramUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_instagram", { source: "header" })} className="grid h-12 w-12 place-items-center rounded-2xl border border-[#f4c54233] bg-white/[0.035] text-[#e7e7e7] transition hover:border-[#f4c5426b] hover:bg-[#f4c5421a] hover:text-[#f4c542]" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
          <PrimaryCta source="header_booking" className="hidden lg:inline-flex" />
        </div>
        <button className="grid h-[3.05rem] w-[3.05rem] shrink-0 place-items-center rounded-[0.95rem] border border-[#f4c54233] bg-white/[0.035] text-[#e7e7e7] transition hover:border-[#f4c5426b] hover:bg-[#f4c5421a] hover:text-[#f4c542] xl:hidden" onClick={() => setOpen(!open)} aria-label="Avaa valikko">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>
      {open && (
        <div className="border-t border-[#f4c5423d] bg-[#050505]/98 px-4 py-4 xl:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {mobileNav.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)} className="flex min-h-[3.35rem] items-center rounded-2xl border border-[#f4c5422e] bg-white/[0.035] px-4 font-extrabold text-white">{label}</a>)}
            <div className="grid gap-2 pt-2 sm:grid-cols-2"><PrimaryCta source="mobile_booking" /><SecondaryCta href={mapsUrl} label="Navigoi perille" icon="map" source="mobile_maps" /></div>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="etusivu" className="premium-hero relative overflow-hidden px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-24">
      <div className="hero-depth pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="max-w-4xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f4c54247] bg-[#f4c5421a] px-4 py-[0.72rem] text-sm font-black text-[#f4c542]"><Star className="h-4 w-4 fill-current" /> 4.7/5 Google • yli 300 arvostelua</div>
          <h1 className="font-display max-w-[12ch] text-[clamp(2.45rem,10vw,3.35rem)] font-black leading-[1.035] tracking-[-0.048em] text-white sm:max-w-none sm:text-6xl lg:text-7xl lg:leading-[1.01] lg:tracking-[-0.055em]">6 vuotta tarkkaa parturityötä — paikallisten luottopaikka.</h1>
          <p className="mt-5 max-w-2xl text-[1.03rem] leading-[1.78] text-[#e7e7e7] sm:text-lg sm:leading-8">Modernit miesten leikkaukset, viimeistellyt fade-tyylit ja rento palvelu ilman turhaa säätöä. Reilu hinta, nopea palvelu ja sijainti Espoon aseman vieressä.</p>
          <div className="mt-7 grid gap-3 sm:flex"><PrimaryCta source="hero_booking" className="w-full sm:w-auto" /><SecondaryCta href={giftCardUrl} label="Osta lahjakortti" icon="gift" source="hero_gift_card" className="w-full sm:w-auto" /><SecondaryCta href={mapsUrl} label="Tule ilman ajanvarausta" icon="map" source="hero_maps" className="w-full sm:w-auto" /></div>
          <div className="mt-7 flex flex-wrap gap-2">
            {quickChoices.map((choice) => <a key={choice} href="#palvelut" className="rounded-full border border-[#f4c54233] bg-black/60 px-4 py-2 text-sm font-bold text-[#e7e7e7]">{choice}</a>)}
          </div>
        </div>
        <a href={heroPhoto.sourceUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps("hero_google_photo")} className="hidden overflow-hidden rounded-[2rem] border border-[#f4c5423d] shadow-[0_22px_70px_rgba(0,0,0,.4)] lg:block">
          <img src={heroPhoto.imageUrl} alt="Golden Cut Parturi Espoo" className="h-[420px] w-full object-cover xl:h-[500px]" loading="eager" />
          <div className="grid gap-4 border-t border-[#f4c5423d] bg-[#030302]/95 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
            <div><p className="text-xs font-black uppercase tracking-[0.26em] text-[#f4c542]">Golden Cut Parturi</p><p className="mt-2 text-sm leading-6 text-[#e7e7e7]">Kirkkojärventie 10 B, Espoo. Katso reitti ja lisäkuvat Google-profiilista.</p></div>
            <span className="text-sm font-black text-[#f4c542]">Avaa profiili →</span>
          </div>
        </a>
      </div>
    </section>
  );
}

function TrustBlock() {
  const items = [
    [Clock, "6 vuotta samalla paikalla", "Paikallinen parturi, johon asiakkaat palaavat."],
    [Star, "Vahva paikallinen maine", "4.7/5 Google-arvosana ja yli 300 arvostelua."],
    [Scissors, "Tarkka työnjälki", "Fade-tyylit, klassiset leikkaukset ja parta."],
    [Train, "Helppo sijainti", "Aivan Espoon juna-aseman vieressä."],
  ] as const;
  return <section className={section}><div className={container}><SectionHeading eyebrow="Luottamus" title="Hyvä jälki, reilu hinta ja nopea palvelu." text="Golden Cut ei myy spa-luksusta. Se myy luotettavaa arjen premiumia: siisti lopputulos ilman turhaa säätöä." /><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{items.map(([Icon, title, text]) => <article key={title} className={card}><Icon className="mb-4 h-6 w-6 text-[#f4c542]" /><h3 className="font-display text-xl font-black text-white">{title}</h3><p className={`mt-2 text-sm leading-7 ${muted}`}>{text}</p></article>)}</div></div></section>;
}

function ConversionSitemap() {
  const paths = [
    [CalendarDays, "Ajanvaraus", "Valitse palvelu ja siirry ajanvaraukseen tai kysy sopivaa aikaa puhelimitse.", "Varaa aika", bookingUrl, "click_book_appointment"],
    [Gift, "Lahjakortti", "Anna lahjaksi siisti leikkaus. Valitse valmis summa tai kysy lahjakortista.", "Osta lahjakortti", giftCardUrl, "click_gift_card"],
    [ShoppingBag, "Tuotteet", "Parturin suosikkituotteet kotiin tai mukaan käynniltä.", "Katso tuotteet", productStoreUrl, "click_product_availability"],
    [MapPin, "Sijainti", "Tule suoraan liikkeeseen Espoon juna-aseman vieressä.", "Navigoi perille", mapsUrl, "click_walk_in_maps"],
  ] as const;
  return <section id="ajanvaraus" className={surfaceSection}><div className={container}><SectionHeading eyebrow="Nopeat valinnat" title="Yksi selkeä seuraava askel." text="Jokaisesta pääpolusta pääsee joko varaamaan ajan, ostamaan lahjakortin, katsomaan tuotteet tai navigoimaan perille." /><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{paths.map(([Icon, title, text, cta, href, event]) => <a key={title} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} onClick={() => trackEvent(event, { source: "conversion_sitemap" })} className={`${card} transition hover:-translate-y-1`}><Icon className="mb-4 h-6 w-6 text-[#f4c542]" /><h3 className="font-display text-xl font-black text-white">{title}</h3><p className={`mt-2 text-sm leading-7 ${muted}`}>{text}</p><p className="mt-4 text-sm font-black text-[#f4c542]">{cta} →</p></a>)}</div></div></section>;
}

function Services() {
  return <section id="palvelut" className={section}><div className={container}><div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><SectionHeading eyebrow="Palvelut" title="Miesten leikkaukset, fade-tyylit ja partapalvelut." text="Valitse palvelu ja siirry suoraan ajanvaraukseen tai kysy sopivaa aikaa." /><PrimaryCta source="services_booking" /></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map(([name, price, duration, desc]) => <article key={name} className={card}><Scissors className="mb-4 h-6 w-6 text-[#f4c542]" /><h3 className="font-display text-xl font-black text-white">{name}</h3><p className={`mt-2 text-sm leading-7 ${muted}`}>{desc}</p><div className="mt-6 grid gap-2 border-t border-[#f4c5423d] pt-4 text-sm"><div className="flex justify-between"><span className="text-[#b9b9b9]">Hinta</span><strong className="text-[#f4c542]">{price}</strong></div><div className="flex justify-between"><span className="text-[#b9b9b9]">Kesto</span><strong className="text-white">{duration}</strong></div></div><a href={bookingUrl} onClick={() => trackPhone(`service_booking_${name}`)} className="mt-5 inline-flex text-sm font-black text-[#f4c542]">Varaa tämä palvelu →</a></article>)}</div></div></section>;
}

function Pricing() {
  return <section id="hinnasto" className={surfaceSection}><div className={container}><SectionHeading eyebrow="Hinnasto" title="Selkeä hinta poistaa epävarmuuden." text="Hinnastosivulla varauspolku pysyy näkyvissä jokaisella palvelurivillä." /><div className="mt-8 overflow-hidden rounded-3xl border border-[#f4c5423d] bg-[#050505]">{services.slice(0, 5).map(([name, price, duration]) => <div key={name} className="grid gap-3 border-b border-[#f4c5423d] p-4 last:border-0 sm:grid-cols-[1fr_auto_auto_auto] sm:items-center"><span className="font-bold text-white">{name}</span><span className="font-black text-[#f4c542]">{price}</span><span className="text-sm text-[#e7e7e7]">{duration}</span><a href={bookingUrl} onClick={() => trackPhone(`pricing_booking_${name}`)} className="text-sm font-black text-white">Varaa →</a></div>)}</div></div></section>;
}

function GiftCardStore() {
  return <section id="lahjakortti" className={section}><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]"><div><SectionHeading eyebrow="Lahjakortti Store" title="Anna lahjaksi siisti leikkaus." text="Helppo lahja isälle, puolisolle, veljelle, ystävälle tai työkaverille." /><div className="mt-6 flex flex-wrap gap-2 text-sm font-bold text-[#e7e7e7]">{["Isälle", "Puolisolle", "Veljelle", "Ystävälle", "Työkaverille"].map((tag) => <span key={tag} className="rounded-full border border-[#f4c54233] px-4 py-2">{tag}</span>)}</div><div className="mt-6 grid gap-3 sm:flex"><SecondaryCta href={giftCardUrl} label="Osta lahjakortti" icon="gift" source="gift_card_store" /><SecondaryCta href="#palvelut" label="Katso palvelut" icon="shop" source="gift_services" /></div></div><div className="grid gap-3 sm:grid-cols-2">{giftCards.map(([amount, text]) => <a key={amount} href={giftCardUrl} target="_blank" rel="noreferrer" className={card}><Gift className="mb-4 h-6 w-6 text-[#f4c542]" /><h3 className="font-display text-3xl font-black text-white">{amount}</h3><p className={`mt-2 text-sm leading-7 ${muted}`}>{text}</p><p className="mt-4 text-sm font-black text-[#f4c542]">Lisää ostoskoriin →</p></a>)}</div></div></section>;
}

function Products() {
  return <section id="tuotteet" className={surfaceSection}><div className={container}><div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><SectionHeading eyebrow="Tuotekauppa" title="Parturin suosikkituotteet kotiin." text="Valitut hius- ja partatuotteet, joita käytämme ja suosittelemme itse." /><SecondaryCta href={productStoreUrl} label="Katso tuotteet" icon="shop" source="products_open" /></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{products.map(([name, desc, price]) => <a key={name} href={productStoreUrl} target="_blank" rel="noreferrer" className={card}><ShoppingBag className="mb-4 h-6 w-6 text-[#f4c542]" /><p className="mb-2 inline-flex rounded-full bg-[#f4c5421a] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#f4c542]">Parturin valinta</p><h3 className="font-display text-lg font-black text-white">{name}</h3><p className="mt-1 text-sm text-[#b9b9b9]">{desc}</p><p className="mt-4 text-xl font-black text-[#f4c542]">{price}</p><p className="mt-4 text-sm font-black text-white">Lisää ostoskoriin →</p></a>)}</div></div></section>;
}

function GalleryReviews() {
  return <section id="kuvat" className={section}><div className={container}><SectionHeading eyebrow="Galleria ja arviot" title="Katso Golden Cutin työnjälki." text="Kuvamaailman pitää olla aito ja raaka parturimeininki. Se pitää brändin helposti lähestyttävänä ja madaltaa walk-in-kynnystä." /><div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]"><a href={heroPhoto.sourceUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps("gallery_google_photo")} className="overflow-hidden rounded-3xl border border-[#f4c5423d] shadow-[0_22px_70px_rgba(0,0,0,.4)]"><img src={heroPhoto.imageUrl} alt={heroPhoto.title} className="h-full min-h-[360px] w-full object-cover" loading="lazy" /></a><div className="grid gap-4">{verifiedReviews.map((review) => <blockquote key={review.quote} className={card}><div className="mb-3 flex gap-1 text-[#f4c542]">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div><p className="text-lg leading-8 text-white">“{review.quote}”</p><p className="mt-3 text-xs font-black uppercase tracking-[0.2em] text-[#f4c542]">{review.label}</p><a href={bookingUrl} className="mt-4 inline-flex text-sm font-black text-[#f4c542]">Varaa samanlainen tyyli →</a></blockquote>)}<a href={mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps("reviews_google_profile")} className="text-sm font-black text-[#f4c542]">Katso Google-profiili ja kaikki arvostelut →</a></div></div></div></section>;
}

function LocationContact() {
  const contact = [[MapPin, address, mapsUrl], [Phone, phoneDisplay, phoneHref], [Instagram, "@goldencut_parturi", instagramUrl], [Mail, email, emailHref]] as const;
  const hours = ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai", "Sunnuntai"];
  return <section id="sijainti" className="px-5 py-20 pb-28 sm:px-6 sm:py-24 lg:px-8 lg:py-28 lg:pb-28"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]"><div><SectionHeading eyebrow="Yhteystiedot" title="Aivan Espoon juna-aseman vieressä." text="Tule ilman ajanvarausta, varaa aika tai navigoi suoraan perille." /><div className="mt-6 grid gap-3">{contact.map(([Icon, label, href]) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className={`${compactCard} flex gap-3 text-[#e7e7e7]`}><Icon className="h-5 w-5 shrink-0 text-[#f4c542]" />{label}</a>)}</div><div className={`${card} mt-4`}><SectionLabel>Aukioloajat</SectionLabel>{hours.map((day, index) => <div key={day} className="flex justify-between border-b border-[#f4c5423d] py-2 text-sm text-[#e7e7e7] last:border-0"><span>{day}</span><strong className="text-white">{index === 6 ? "11–18" : "10–19"}</strong></div>)}</div></div><div className="overflow-hidden rounded-3xl border border-[#f4c5423d] bg-[#050505]"><iframe title="Golden Cut-parturi kartta" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.4696338415222!2d24.655731276847625!3d60.20605967505068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x468df36efe27437b%3A0x71e90b46c830dc97!2sGolden%20Cut-parturi!5e0!3m2!1sfi!2sfi!4v1777578700979!5m2!1sfi!2sfi" width="100%" height="460" className="h-[340px] lg:h-[460px]" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div></section>;
}

function Footer() {
  return <footer className="border-t border-[#f4c5423d] bg-[#050505] px-5 py-10 pb-28 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4"><div><Logo /><p className="mt-4 text-sm leading-7 text-[#e7e7e7]">Nopea, tarkka ja helposti saavutettava miesten parturi Espoon keskuksessa — ilman ajanvarausta.</p></div><div><h3 className="font-bold uppercase tracking-[0.22em] text-[#f4c542]">Palvelut</h3><div className="mt-4 grid gap-2 text-sm text-[#e7e7e7]"><a href="#palvelut">Miesten leikkaus</a><a href="#palvelut">Fade</a><a href="#palvelut">Skin fade</a><a href="#palvelut">Parta</a></div></div><div><h3 className="font-bold uppercase tracking-[0.22em] text-[#f4c542]">Osta</h3><div className="mt-4 grid gap-2 text-sm text-[#e7e7e7]"><a href="#lahjakortti">Lahjakortti</a><a href="#tuotteet">Tuotteet</a><a href="#hinnasto">Hinnasto</a></div></div><div><h3 className="font-bold uppercase tracking-[0.22em] text-[#f4c542]">Seuraa</h3><div className="mt-4 grid gap-2 text-sm text-[#e7e7e7]"><a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a><a href={facebookUrl} target="_blank" rel="noreferrer">Facebook</a><a href={tiktokUrl} target="_blank" rel="noreferrer">TikTok</a><a href={mapsUrl} target="_blank" rel="noreferrer">Google Business Profile</a></div></div></div><div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#f4c5423d] bg-black/95 p-3 backdrop-blur md:hidden"><PrimaryCta source="mobile_sticky_booking" className="w-full" /></div></footer>;
}

export default function AppFinal() {
  return <div className="min-h-screen bg-[#050505] text-white antialiased"><Header /><main><Hero /><TrustBlock /><ConversionSitemap /><Services /><Pricing /><GiftCardStore /><Products /><GalleryReviews /><LocationContact /></main><Footer /></div>;
}
