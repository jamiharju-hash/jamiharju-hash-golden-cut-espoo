import {
  Car,
  CheckCircle2,
  Clock,
  Gift,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Scissors,
  ShieldCheck,
  ShoppingBag,
  Star,
  Train,
  X,
} from "lucide-react";
import { useState } from "react";
import { trackEvent } from "./lib/analytics";

const phoneDisplay = "040 058 8484";
const phoneHref = "tel:+358400588484";
const address = "Kirkkojärventie 10 B, 02770 Espoo";
const mapsUrl = "https://maps.app.goo.gl/5Q13WYSJaTtNGvio9";
const instagramUrl = "https://www.instagram.com/goldencut_parturi/";
const facebookUrl = "https://www.facebook.com/goldencutparturi/?locale=fi_FI";
const tiktokUrl = "https://www.tiktok.com/@goldencutparturi";

const mainNav = [
  ["#palvelut", "Palvelut"],
  ["#hinnasto", "Hinnasto"],
  ["#lahjakortti", "Lahjakortti"],
  ["#sijainti", "Sijainti"],
];

const fullNav = [
  ...mainNav,
  ["#tuotteet", "Tuotteet"],
  ["#galleria", "Galleria"],
  ["#yhteystiedot", "Yhteystiedot"],
];

const services = [
  ["Miesten leikkaus", "alk. 20 €", "Klassinen tai moderni leikkaus toiveesi mukaan."],
  ["Skin fade", "alk. 20 €", "Tarkka häivytys ja siisti viimeistely."],
  ["Mid fade", "alk. 20 €", "Moderni ja helposti ylläpidettävä tyyli."],
  ["Taper fade", "alk. 20 €", "Luonnollinen häivytys niskasta ja sivuilta."],
  ["Parta", "kysy liikkeestä", "Parran muotoilu, siistiminen ja viimeistely."],
  ["Lasten leikkaus", "kysy liikkeestä", "Rento ja lapsiystävällinen käynti."],
];

const products = [
  ["Shaving gel", "15,00 €"],
  ["Partasaippua", "10,00 €"],
  ["Partaöljy 30 ml", "25,00 €"],
  ["Cutrin Shampoo Bio+", "20,00 €"],
  ["Beard Balm", "20,00 €"],
];

const reviews = [
  "Todella nopea ja tarkka tukan leikkaus.",
  "Laatu pysyy hyvänä kerrasta toiseen.",
  "Ainoa paikka, johon poika suostuu mielellään parturiin.",
];

function trackMaps(source: string) {
  trackEvent("click_walk_in_maps", { source });
}

function trackPhone(source: string) {
  trackEvent("click_phone_call", { source });
}

function PrimaryCta({ source, className = "" }: { source: string; className?: string }) {
  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackMaps(source)}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-black text-black transition hover:bg-amber-300 ${className}`}
    >
      <MapPin className="h-4 w-4" />
      Tule ilman ajanvarausta
    </a>
  );
}

function PhoneCta({ source, className = "" }: { source: string; className?: string }) {
  return (
    <a
      href={phoneHref}
      onClick={() => trackPhone(source)}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-amber-400/30 px-5 py-3 text-sm font-bold text-amber-100 transition hover:bg-amber-400/10 ${className}`}
    >
      <Phone className="h-4 w-4" />
      Soita {phoneDisplay}
    </a>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-amber-300">{children}</p>;
}

function Logo() {
  return (
    <a href="#etusivu" className="flex min-w-0 items-center gap-3" aria-label="Golden Cut etusivu">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-amber-400/50 text-amber-300">
        <Scissors className="h-5 w-5" />
      </span>
      <span className="min-w-0 leading-none">
        <span className="block truncate text-base font-black uppercase tracking-[0.16em] text-amber-100 sm:text-lg">Golden Cut</span>
        <span className="mt-1 block text-[10px] uppercase tracking-[0.28em] text-zinc-500">Barber Shop</span>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-900 bg-black/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm font-bold text-zinc-300 lg:flex">
          {mainNav.map(([href, label]) => (
            <a key={href} href={href} className="hover:text-amber-300">
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("click_instagram", { source: "header" })}
            className="grid h-11 w-11 place-items-center rounded-full border border-zinc-800 text-zinc-300 hover:border-amber-400/50 hover:text-amber-300"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <PrimaryCta source="header" className="hidden xl:inline-flex" />
        </div>
        <button className="grid h-11 w-11 place-items-center rounded-full border border-zinc-800 text-amber-200 lg:hidden" onClick={() => setOpen(!open)} aria-label="Avaa valikko">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-zinc-900 bg-black px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-6xl gap-2">
            {fullNav.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl border border-zinc-900 px-4 py-3 text-zinc-200">
                {label}
              </a>
            ))}
            <div className="grid gap-2 pt-2 sm:grid-cols-2">
              <PrimaryCta source="mobile_menu" className="w-full" />
              <PhoneCta source="mobile_menu" className="w-full" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="etusivu" className="bg-black px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-2 text-xs font-bold text-amber-200 sm:text-sm">
            <Star className="h-4 w-4 fill-amber-300" /> 4.7/5 Google • yli 300 arvostelua
          </div>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Espoon keskuksen luottoparturi miehille.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
            Nopea, tarkka ja reilusti hinnoiteltu Golden Cut Parturi aivan Espoon juna-aseman vieressä. Kävele sisään ilman ajanvarausta.
          </p>
          <div className="mt-7 grid gap-3 sm:flex">
            <PrimaryCta source="hero" />
            <PhoneCta source="hero" />
          </div>
          <div className="mt-7 grid gap-2 text-sm text-zinc-300 sm:grid-cols-2 lg:max-w-2xl">
            <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-amber-300" /> Ma–la 10–19, su 11–18</div>
            <div className="flex items-center gap-2"><Train className="h-4 w-4 text-amber-300" /> Espoon aseman vieressä</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-amber-300" /> Pyörätuoliystävällinen sisäänkäynti</div>
            <div className="flex items-center gap-2"><Car className="h-4 w-4 text-amber-300" /> Ilmainen pysäköinti lähellä</div>
          </div>
        </div>
        <div className="hidden overflow-hidden rounded-3xl border border-amber-400/15 bg-zinc-950 lg:block">
          <div className="aspect-[4/5] bg-[url('https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-75" />
        </div>
      </div>
    </section>
  );
}

function QuickPaths() {
  const paths = [
    [MapPin, "Walk-in", "Tule suoraan paikan päälle ilman ajanvarausta.", "Sijainti", mapsUrl, "quick_walk_in"],
    [Gift, "Lahjakortti", "Helppo lahja parturikäyntiin tai tuotteisiin.", "Kysy lahjakorttia", phoneHref, "quick_gift_card"],
    [ShoppingBag, "Tuotteet", "Parta- ja hiustuotteet mukaan käynnin yhteydessä.", "Tarkista saatavuus", phoneHref, "quick_products"],
  ] as const;

  return (
    <section className="border-y border-zinc-900 bg-zinc-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        {paths.map(([Icon, title, text, cta, href, source]) => (
          <a
            key={title}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            onClick={() => source === "quick_walk_in" ? trackMaps(source) : trackEvent(source === "quick_gift_card" ? "click_gift_card" : "click_product_availability", { source })}
            className="rounded-3xl border border-zinc-800 bg-black p-5 transition hover:border-amber-400/40"
          >
            <Icon className="mb-4 h-6 w-6 text-amber-300" />
            <h3 className="text-lg font-black text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p>
            <p className="mt-4 text-sm font-black text-amber-300">{cta} →</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="palvelut" className="bg-black px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Palvelut</SectionLabel>
            <h2 className="max-w-3xl text-3xl font-black text-white sm:text-4xl">Miesten leikkaukset, fade-tyylit ja partapalvelut.</h2>
          </div>
          <PrimaryCta source="services_top" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([name, price, desc]) => (
            <article key={name} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
              <Scissors className="mb-4 h-6 w-6 text-amber-300" />
              <h3 className="text-lg font-black text-white">{name}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{desc}</p>
              <div className="mt-5 flex items-center justify-between border-t border-zinc-900 pt-4">
                <span className="font-black text-amber-300">{price}</span>
                <a href={mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps(`service_${name}`)} className="text-sm font-bold text-zinc-200 hover:text-amber-300">Tule sisään →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="hinnasto" className="bg-zinc-950 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionLabel>Hinnasto</SectionLabel>
          <h2 className="text-3xl font-black text-white sm:text-4xl">Reilu hinta. Tarkka jälki.</h2>
          <p className="mt-4 text-zinc-400">Miesten hiustenleikkaus on ollut noin 20 €. Tarkka hinta vahvistetaan liikkeessä valitun palvelun mukaan.</p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-black">
          {services.slice(0, 5).map(([name, price]) => (
            <div key={name} className="flex items-center justify-between gap-4 border-b border-zinc-900 p-4 last:border-0">
              <span className="font-bold text-white">{name}</span>
              <span className="shrink-0 font-black text-amber-300">{price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GiftCards() {
  return (
    <section id="lahjakortti" className="bg-black px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl border border-amber-400/20 bg-zinc-950 p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <SectionLabel>Lahjakortti</SectionLabel>
            <h2 className="text-3xl font-black text-white sm:text-4xl">Helppo lahja miehelle, joka arvostaa siistiä tyyliä.</h2>
            <p className="mt-4 max-w-2xl text-zinc-400">Valitse summa ja kysy lahjakorttia suoraan liikkeestä. Sopii parturikäyntiin tai tuotteisiin.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["30 €", "50 €", "75 €", "100 €", "vapaa summa"].map((value) => <span key={value} className="rounded-full border border-amber-400/25 px-4 py-2 text-sm font-bold text-amber-100">{value}</span>)}
            </div>
          </div>
          <a href={phoneHref} onClick={() => { trackEvent("click_gift_card", { source: "gift_card_section" }); trackPhone("gift_card_section"); }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 font-black text-black hover:bg-amber-300">
            <Gift className="h-5 w-5" /> Kysy lahjakorttia
          </a>
        </div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="tuotteet" className="bg-zinc-950 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Tuotteet</SectionLabel>
            <h2 className="text-3xl font-black text-white sm:text-4xl">Parturin suosikkituotteet kotiin.</h2>
          </div>
          <a href={phoneHref} onClick={() => { trackEvent("click_product_availability", { source: "products_top" }); trackPhone("products_top"); }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-amber-400/30 px-5 py-3 text-sm font-bold text-amber-100 hover:bg-amber-400/10">
            <ShoppingBag className="h-4 w-4" /> Tarkista saatavuus
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {products.map(([name, price]) => (
            <article key={name} className="rounded-3xl border border-zinc-800 bg-black p-5">
              <div className="mb-4 aspect-square rounded-2xl bg-[radial-gradient(circle,rgba(245,158,11,.16),transparent_60%),#111]" />
              <h3 className="font-bold text-white">{name}</h3>
              <p className="mt-3 text-xl font-black text-amber-300">{price}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const gallery = ["Skin fade", "Mid fade", "Taper fade", "Klassinen leikkaus", "Parta", "Lasten leikkaus"];
  return (
    <section id="galleria" className="bg-black px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Galleria</SectionLabel>
        <h2 className="text-3xl font-black text-white sm:text-4xl">Katso tyyli. Kävele sisään.</h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item, index) => (
            <a key={item} href={mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps(`gallery_${item}`)} className="group relative min-h-52 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
              <div className="absolute inset-0 bg-cover bg-center opacity-65 transition group-hover:scale-105" style={{ backgroundImage: `url(https://images.unsplash.com/photo-${index % 2 === 0 ? "1622287162716-f311baa1a2b8" : "1512690459411-b9245aed614b"}?auto=format&fit=crop&q=80)` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-0 p-5"><h3 className="text-xl font-black text-white">{item}</h3><p className="mt-1 text-sm font-bold text-amber-300">Tule näyttämään tyyli →</p></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="bg-zinc-950 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Asiakkaiden sanomaa</SectionLabel>
        <h2 className="text-3xl font-black text-white sm:text-4xl">4.7/5 Google-arvosana yli 300 arvostelulla.</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <blockquote key={review} className="rounded-3xl border border-zinc-800 bg-black p-5">
              <div className="mb-4 flex gap-1 text-amber-300">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div>
              <p className="leading-7 text-zinc-200">“{review}”</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  const facts = [
    [MapPin, address],
    [Train, "Keskeinen sijainti Espoon aseman vieressä."],
    [ShieldCheck, "Pyörätuoliystävällinen sisäänkäynti."],
    [Car, "Läheltä löytyy ilmaista pysäköintitilaa."],
  ] as const;

  return (
    <section id="sijainti" className="bg-black px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionLabel>Sijainti ja saavutettavuus</SectionLabel>
          <h2 className="text-3xl font-black text-white sm:text-4xl">Aivan Espoon juna-aseman vieressä.</h2>
          <div className="mt-6 grid gap-3">
            {facts.map(([Icon, text]) => (
              <div key={String(text)} className="flex gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-zinc-300"><Icon className="h-5 w-5 shrink-0 text-amber-300" />{text}</div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
          <iframe title="Golden Cut-parturi kartta" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.4696338415222!2d24.655731276847625!3d60.20605967505068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x468df36efe27437b%3A0x71e90b46c830dc97!2sGolden%20Cut-parturi!5e0!3m2!1sfi!2sfi!4v1777578700979!5m2!1sfi!2sfi" width="100%" height="420" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const hours = ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai", "Sunnuntai"];
  return (
    <section id="yhteystiedot" className="bg-zinc-950 px-4 py-14 pb-28 sm:px-6 lg:px-8 lg:pb-14">
      <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-zinc-800 bg-black p-6">
          <SectionLabel>Yhteystiedot</SectionLabel>
          <h2 className="text-2xl font-black text-white">Tule paikan päälle.</h2>
          <div className="mt-5 grid gap-3 text-zinc-300">
            <a href={phoneHref} onClick={() => trackPhone("contact_card")} className="flex gap-3 hover:text-amber-300"><Phone className="h-5 w-5 text-amber-300" />{phoneDisplay}</a>
            <a href={mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps("contact_card")} className="flex gap-3 hover:text-amber-300"><MapPin className="h-5 w-5 text-amber-300" />{address}</a>
            <a href={instagramUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_instagram", { source: "contact_card" })} className="flex gap-3 hover:text-amber-300"><Instagram className="h-5 w-5 text-amber-300" />@goldencut_parturi</a>
          </div>
        </div>
        <div className="rounded-3xl border border-zinc-800 bg-black p-6">
          <SectionLabel>Aukioloajat</SectionLabel>
          <div className="grid gap-2 text-sm">{hours.map((day, index) => <div key={day} className="flex justify-between border-b border-zinc-900 pb-2 text-zinc-300 last:border-0"><span>{day}</span><strong className="text-white">{index === 6 ? "11–18" : "10–19"}</strong></div>)}</div>
        </div>
        <div className="rounded-3xl border border-zinc-800 bg-black p-6">
          <SectionLabel>Nopea päätös</SectionLabel>
          <h2 className="text-2xl font-black text-white">Ei ajanvarausta.</h2>
          <p className="mt-3 text-zinc-400">Kävele sisään, me hoidamme tyylin kuntoon.</p>
          <div className="mt-5 grid gap-2"><PrimaryCta source="contact_decision" className="w-full" /><PhoneCta source="contact_decision" className="w-full" /></div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-black px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div><Logo /><p className="mt-4 text-sm leading-6 text-zinc-500">Nopea, tarkka ja reilusti hinnoiteltu miesten parturi Espoon keskuksessa.</p></div>
        <div><h3 className="font-bold uppercase tracking-[0.2em] text-amber-300">Pikalinkit</h3><div className="mt-4 grid gap-2 text-sm text-zinc-400">{fullNav.map(([href, label]) => <a key={href} href={href} className="hover:text-amber-300">{label}</a>)}</div></div>
        <div>
          <h3 className="font-bold uppercase tracking-[0.2em] text-amber-300">Seuraa</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href={instagramUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_instagram", { source: "footer" })} className="rounded-full border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300 hover:text-amber-300">Instagram</a>
            <a href={facebookUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_facebook", { source: "footer" })} className="rounded-full border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300 hover:text-amber-300">Facebook</a>
            <a href={tiktokUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_tiktok", { source: "footer" })} className="rounded-full border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300 hover:text-amber-300">TikTok</a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-zinc-900 pt-6 text-sm text-zinc-600">© 2026 Golden Cut Parturi.</div>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-amber-400/20 bg-black/95 p-3 backdrop-blur md:hidden"><PrimaryCta source="mobile_sticky" className="w-full" /></div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white antialiased">
      <Header />
      <main>
        <Hero />
        <QuickPaths />
        <Services />
        <Pricing />
        <GiftCards />
        <Products />
        <Gallery />
        <Reviews />
        <Location />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
