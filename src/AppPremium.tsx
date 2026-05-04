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
import { motion } from "motion/react";
import { useState } from "react";
import { ContactForm, GiftCardForm, ProductInterestForm } from "./components/LeadForms";
import { verifiedReviews, verifiedWorkPhotos } from "./data/socialProof";
import { trackEvent } from "./lib/analytics";

const phoneDisplay = "040 058 8484";
const phoneHref = "tel:+358400588484";
const address = "Kirkkojärventie 10 B, 02770 Espoo";
const mapsUrl = "https://maps.app.goo.gl/5Q13WYSJaTtNGvio9";
const instagramUrl = "https://www.instagram.com/goldencut_parturi/";
const facebookUrl = "https://www.facebook.com/goldencutparturi/?locale=fi_FI";
const tiktokUrl = "https://www.tiktok.com/@goldencutparturi";
const heroPhoto = verifiedWorkPhotos[0];

const nav = [
  ["#palvelut", "Palvelut"],
  ["#hinnasto", "Hinnasto"],
  ["#lahjakortti", "Lahjakortti"],
  ["#kuvat", "Kuvat"],
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
  ["Shaving gel", "Parranajoon", "15,00 €"],
  ["Partasaippua", "Beard soap", "10,00 €"],
  ["Partaöljy 30 ml", "Beard & Moustache Oil", "25,00 €"],
  ["Cutrin Shampoo Bio+", "Hiuksille", "20,00 €"],
  ["Beard Balm", "Partavaha", "20,00 €"],
] as const;

const faqs = [
  ["Tarvitseeko ajanvarauksen?", "Ei. Golden Cut palvelee ilman ajanvarausta. Voit tulla suoraan liikkeeseen aukioloaikoina."],
  ["Missä liike sijaitsee?", "Kirkkojärventie 10 B, 02770 Espoo. Liike on aivan Espoon juna-aseman vieressä."],
  ["Mitä palveluita teette?", "Miesten leikkaukset, skin fade, mid fade, taper fade, partapalvelut ja lasten leikkaukset."],
  ["Voiko lahjakortin ostaa?", "Kyllä. Voit lähettää lahjakorttipyynnön verkkosivun lomakkeella tai soittaa liikkeeseen."],
] as const;

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function trackMaps(source: string) {
  trackEvent("click_walk_in_maps", { source });
}

function trackPhone(source: string) {
  trackEvent("click_phone_call", { source });
}

function PrimaryCta({ source, className = "" }: { source: string; className?: string }) {
  return (
    <motion.a
      href={mapsUrl}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackMaps(source)}
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      className={`premium-cta inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-black text-[var(--ink)] ${className}`}
    >
      <MapPin className="h-4 w-4" />
      Tule ilman ajanvarausta
    </motion.a>
  );
}

function PhoneCta({ source, className = "" }: { source: string; className?: string }) {
  return (
    <motion.a
      href={phoneHref}
      onClick={() => trackPhone(source)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--brass-soft)] bg-[rgba(12,10,8,0.72)] px-6 py-3 text-sm font-bold text-[var(--champagne)] transition hover:bg-[rgba(201,154,61,0.12)] ${className}`}
    >
      <Phone className="h-4 w-4" />
      Soita {phoneDisplay}
    </motion.a>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[var(--brass)]">{children}</p>;
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="max-w-3xl">
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="font-display text-3xl font-black tracking-[-0.045em] text-[var(--bone)] sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-7 text-[var(--muted)]">{text}</p>}
    </motion.div>
  );
}

function Logo() {
  return (
    <a href="#etusivu" className="flex min-w-0 items-center gap-3" aria-label="Golden Cut etusivu">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--brass-soft)] bg-[var(--charcoal)] text-[var(--brass)]">
        <Scissors className="h-5 w-5" />
      </span>
      <span className="min-w-0 leading-none">
        <span className="font-display block truncate text-base font-black uppercase tracking-[0.18em] text-[var(--champagne)] sm:text-lg">Golden Cut</span>
        <span className="mt-1 block text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">Parturi Espoo</span>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(5,4,3,0.86)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm font-bold text-[var(--muted)] lg:flex">
          {nav.map(([href, label]) => (
            <a key={href} href={href} className="transition hover:text-[var(--champagne)]">
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <motion.a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("click_instagram", { source: "header" })}
            whileHover={{ y: -2 }}
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition hover:border-[var(--brass-soft)] hover:text-[var(--brass)]"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </motion.a>
          <PrimaryCta source="header" className="hidden xl:inline-flex" />
        </div>
        <button className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] text-[var(--champagne)] lg:hidden" onClick={() => setOpen(!open)} aria-label="Avaa valikko">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="border-t border-[var(--line)] bg-[var(--ink)] px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {[...nav, ["#tuotteet", "Tuotteet"], ["#yhteystiedot", "Yhteystiedot"]].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-2xl border border-[var(--line)] px-4 py-3 text-[var(--bone)]">
                {label}
              </a>
            ))}
            <div className="grid gap-2 pt-2 sm:grid-cols-2">
              <PrimaryCta source="mobile_menu" className="w-full" />
              <PhoneCta source="mobile_menu" className="w-full" />
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="etusivu" className="premium-hero relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(201,154,61,0.22),transparent_25%),radial-gradient(circle_at_82%_8%,rgba(58,17,17,0.55),transparent_28%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
        <motion.div variants={reveal} initial="hidden" animate="visible" className="max-w-4xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--brass-soft)] bg-[rgba(201,154,61,0.12)] px-3 py-2 text-xs font-bold text-[var(--champagne)] sm:text-sm">
            <Star className="h-4 w-4 fill-[var(--brass)] text-[var(--brass)]" /> 4.7/5 Google • yli 300 arvostelua
          </div>
          <h1 className="font-display text-4xl font-black leading-[0.99] tracking-[-0.06em] text-[var(--bone)] sm:text-6xl lg:text-7xl">
            Espoon keskuksen luottoparturi — ilman ajanvarausta.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
            Nopea, tarkka ja helposti saavutettava miesten parturi Espoon juna-aseman vieressä. Miesten leikkaukset, skin fade, mid fade, taper fade ja partapalvelut reilulla hinnalla.
          </p>
          <div className="mt-8 grid gap-3 sm:flex">
            <PrimaryCta source="hero" />
            <PhoneCta source="hero" />
          </div>
          <div className="mt-8 grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-2">
            {[[Clock, "Ma–la 10–19, su 11–18"], [Train, "Espoon aseman vieressä"], [ShieldCheck, "Pyörätuoliystävällinen sisäänkäynti"], [Car, "Ilmainen pysäköinti lähellä"]].map(([Icon, text]) => (
              <div key={String(text)} className="premium-fact flex items-center gap-2 rounded-2xl border border-[var(--line)] p-3">
                <Icon className="h-4 w-4 text-[var(--brass)]" /> {String(text)}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.a
          href={heroPhoto.sourceUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackMaps("hero_google_photo")}
          initial={{ opacity: 0, scale: 0.96, rotate: -1 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="hidden overflow-hidden rounded-[2rem] border border-[var(--brass-soft)] bg-[var(--charcoal)] shadow-2xl shadow-black/50 lg:block"
        >
          <img src={heroPhoto.imageUrl} alt="Golden Cut Parturi Espoo" className="h-[440px] w-full object-cover opacity-90 xl:h-[520px]" loading="eager" />
          <div className="grid gap-4 border-t border-[var(--brass-soft)] bg-[rgba(5,4,3,0.96)] p-5 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--brass)]">Golden Cut Parturi</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Kirkkojärventie 10 B, Espoo. Katso reitti ja lisäkuvat Google-profiilista.</p>
            </div>
            <span className="text-sm font-black text-[var(--champagne)]">Avaa profiili →</span>
          </div>
        </motion.a>
      </div>
    </section>
  );
}

function QuickPaths() {
  const paths = [
    [MapPin, "Walk-in", "Tule suoraan paikan päälle ilman ajanvarausta.", "Katso sijainti", mapsUrl, "quick_walk_in"],
    [Gift, "Lahjakortti", "Lähetä lahjakorttipyyntö ja Golden Cut ottaa yhteyttä.", "Lahjakorttilomake", "#lahjakortti", "quick_gift_card"],
    [ShoppingBag, "Tuotteet", "Kysy tuotteiden saatavuus ennen käyntiä.", "Tuotekysely", "#tuotteet", "quick_products"],
  ] as const;

  return (
    <section className="border-y border-[var(--line)] bg-[var(--charcoal)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
        {paths.map(([Icon, title, text, cta, href, source], index) => (
          <motion.a
            key={title}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            onClick={() => source === "quick_walk_in" ? trackMaps(source) : trackEvent(source === "quick_gift_card" ? "click_gift_card" : "click_product_availability", { source })}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className="premium-card group rounded-3xl p-5"
          >
            <Icon className="mb-4 h-6 w-6 text-[var(--brass)]" />
            <h3 className="font-display text-lg font-black text-[var(--bone)]">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{text}</p>
            <p className="mt-4 text-sm font-black text-[var(--champagne)]">{cta} →</p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="palvelut" className="bg-[var(--ink)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Palvelut" title="Miesten leikkaukset, fade-tyylit ja partapalvelut." text="Tarkka työnjälki, nopea asiointi ja selkeä hinta. Tule sisään, näytä tyyli ja anna parturin hoitaa loput." />
          <PrimaryCta source="services_top" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([name, price, desc], index) => (
            <motion.article key={name} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.03 }} whileHover={{ y: -4 }} className="premium-card rounded-3xl p-5">
              <Scissors className="mb-4 h-6 w-6 text-[var(--brass)]" />
              <h3 className="font-display text-lg font-black text-[var(--bone)]">{name}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{desc}</p>
              <div className="mt-5 flex items-center justify-between border-t border-[var(--line)] pt-4">
                <span className="font-black text-[var(--champagne)]">{price}</span>
                <a href={mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps(`service_${name}`)} className="text-sm font-bold text-[var(--bone)] hover:text-[var(--brass)]">Tule sisään →</a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="hinnasto" className="bg-[var(--charcoal)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeading eyebrow="Hinnasto" title="Reilu hinta. Tarkka jälki." text="Miesten hiustenleikkaus on ollut noin 20 €. Tarkka hinta vahvistetaan liikkeessä valitun palvelun mukaan." />
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--ink)]">
          {services.slice(0, 5).map(([name, price]) => (
            <div key={name} className="flex items-center justify-between gap-4 border-b border-[var(--line)] p-4 last:border-0">
              <span className="font-bold text-[var(--bone)]">{name}</span>
              <span className="shrink-0 font-black text-[var(--champagne)]">{price}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function GiftCards() {
  return (
    <section id="lahjakortti" className="bg-[var(--ink)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading eyebrow="Lahjakortti" title="Helppo lahja miehelle, joka arvostaa siistiä tyyliä." text="Valitse summa, vastaanottaja ja viesti. Golden Cut vahvistaa lahjakortin tiedot yhteydenotolla." />
          <div className="mt-5 flex flex-wrap gap-2">
            {["30 €", "50 €", "75 €", "100 €", "vapaa summa"].map((value) => <span key={value} className="rounded-full border border-[var(--brass-soft)] px-4 py-2 text-sm font-bold text-[var(--champagne)]">{value}</span>)}
          </div>
        </div>
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}><GiftCardForm /></motion.div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="tuotteet" className="bg-[var(--charcoal)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8"><SectionHeading eyebrow="Tuotteet" title="Parturin suosikkituotteet kotiin." text="Pieni valikoima hius- ja partatuotteita. Tarkista saatavuus lomakkeella tai kysy tuotteita käynnin yhteydessä." /></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {products.map(([name, desc, price]) => (
            <motion.article key={name} whileHover={{ y: -4 }} className="premium-card rounded-3xl p-5">
              <ShoppingBag className="mb-5 h-7 w-7 text-[var(--brass)]" />
              <h3 className="font-bold text-[var(--bone)]">{name}</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">{desc}</p>
              <p className="mt-4 text-xl font-black text-[var(--champagne)]">{price}</p>
            </motion.article>
          ))}
        </div>
        <div className="mt-6"><ProductInterestForm /></div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="kuvat" className="bg-[var(--ink)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Kuvat" title="Golden Cut Google-profiilissa." text="Katso liikkeen kuvat, sijainti ja lisätiedot Google-profiilista." />
        <div className="mt-8 grid gap-4 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
          <motion.a href={heroPhoto.sourceUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps("gallery_google_photo")} whileHover={{ scale: 0.995 }} className="group overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--charcoal)]">
            <img src={heroPhoto.imageUrl} alt={heroPhoto.title} className="h-full min-h-[360px] w-full object-cover opacity-90 transition duration-700 group-hover:scale-105" loading="lazy" />
          </motion.a>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="premium-card rounded-3xl p-6 lg:p-8">
            <h3 className="font-display text-2xl font-black text-[var(--bone)]">{heroPhoto.title}</h3>
            <p className="mt-3 max-w-2xl leading-7 text-[var(--muted)]">{heroPhoto.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--ink)] p-4 text-sm text-[var(--muted)]"><MapPin className="mb-3 h-5 w-5 text-[var(--brass)]" />{address}</div>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--ink)] p-4 text-sm text-[var(--muted)]"><Star className="mb-3 h-5 w-5 fill-[var(--brass)] text-[var(--brass)]" />4.7/5 Google-arvosana</div>
            </div>
            <a href={heroPhoto.sourceUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps("gallery_google_profile")} className="mt-6 inline-flex text-sm font-black text-[var(--champagne)] hover:text-[var(--brass)]">Avaa Google-profiili →</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="bg-[var(--charcoal)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Google-arvostelut" title="4.7/5 Google-arvosana yli 300 arvostelulla." text="Asiakkaat kiittävät erityisesti nopeutta, tarkkuutta, tasaista laatua ja lapsiystävällistä palvelua." />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {verifiedReviews.map((review) => (
            <motion.blockquote key={review.quote} whileHover={{ y: -4 }} className="premium-card rounded-3xl p-5">
              <div className="mb-4 flex gap-1 text-[var(--brass)]">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div>
              <p className="leading-7 text-[var(--bone)]">“{review.quote}”</p>
              <div className="mt-5 border-t border-[var(--line)] pt-4">
                <p className="text-sm font-black text-[var(--bone)]">{review.label}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--brass)]">{review.source}</p>
              </div>
            </motion.blockquote>
          ))}
        </div>
        <a href={mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps("reviews_google_profile")} className="mt-6 inline-flex text-sm font-black text-[var(--champagne)] hover:text-[var(--brass)]">Katso Google-profiili ja kaikki arvostelut →</a>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="ukk" className="bg-[var(--ink)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Usein kysyttyä" title="Nopeat vastaukset ennen käyntiä." />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faqs.map(([question, answer]) => (
            <article key={question} className="premium-card rounded-3xl p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[var(--brass)]" />
                <div>
                  <h3 className="font-black text-[var(--bone)]">{question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{answer}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  const facts = [[MapPin, address], [Train, "Keskeinen sijainti Espoon aseman vieressä."], [ShieldCheck, "Pyörätuoliystävällinen sisäänkäynti."], [Car, "Läheltä löytyy ilmaista pysäköintitilaa."]] as const;

  return (
    <section id="sijainti" className="bg-[var(--charcoal)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading eyebrow="Sijainti ja saavutettavuus" title="Aivan Espoon juna-aseman vieressä." />
          <div className="mt-6 grid gap-3">
            {facts.map(([Icon, text]) => <div key={String(text)} className="premium-card flex gap-3 rounded-2xl p-4 text-[var(--muted)]"><Icon className="h-5 w-5 shrink-0 text-[var(--brass)]" />{text}</div>)}
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--ink)]">
          <iframe title="Golden Cut-parturi kartta" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.4696338415222!2d24.655731276847625!3d60.20605967505068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x468df36efe27437b%3A0x71e90b46c830dc97!2sGolden%20Cut-parturi!5e0!3m2!1sfi!2sfi!4v1777578700979!5m2!1sfi!2sfi" width="100%" height="420" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const hours = ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai", "Sunnuntai"];

  return (
    <section id="yhteystiedot" className="bg-[var(--ink)] px-4 py-16 pb-28 sm:px-6 lg:px-8 lg:pb-16">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <div className="premium-card rounded-3xl p-6">
            <SectionLabel>Yhteystiedot</SectionLabel>
            <h2 className="font-display text-2xl font-black text-[var(--bone)]">Tule paikan päälle.</h2>
            <div className="mt-5 grid gap-3 text-[var(--muted)]">
              <a href={phoneHref} onClick={() => trackPhone("contact_card")} className="flex gap-3 hover:text-[var(--brass)]"><Phone className="h-5 w-5 text-[var(--brass)]" />{phoneDisplay}</a>
              <a href={mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps("contact_card")} className="flex gap-3 hover:text-[var(--brass)]"><MapPin className="h-5 w-5 text-[var(--brass)]" />{address}</a>
              <a href={instagramUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_instagram", { source: "contact_card" })} className="flex gap-3 hover:text-[var(--brass)]"><Instagram className="h-5 w-5 text-[var(--brass)]" />@goldencut_parturi</a>
            </div>
          </div>
          <div className="premium-card rounded-3xl p-6">
            <SectionLabel>Aukioloajat</SectionLabel>
            <div className="grid gap-2 text-sm">{hours.map((day, index) => <div key={day} className="flex justify-between border-b border-[var(--line)] pb-2 text-[var(--muted)] last:border-0"><span>{day}</span><strong className="text-[var(--bone)]">{index === 6 ? "11–18" : "10–19"}</strong></div>)}</div>
          </div>
          <div className="premium-card rounded-3xl p-6 text-sm leading-6 text-[var(--muted)]">
            <p className="font-bold text-[var(--bone)]">Golden Cut 17</p>
            <p>Y-tunnus 3011295-1 • Kampaamot ja parturit</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--ink)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div><Logo /><p className="mt-4 text-sm leading-6 text-[var(--muted)]">Nopea, tarkka ja reilusti hinnoiteltu miesten parturi Espoon keskuksessa.</p></div>
        <div><h3 className="font-bold uppercase tracking-[0.22em] text-[var(--brass)]">Pikalinkit</h3><div className="mt-4 grid gap-2 text-sm text-[var(--muted)]">{nav.map(([href, label]) => <a key={href} href={href} className="hover:text-[var(--brass)]">{label}</a>)}<a href="#tuotteet" className="hover:text-[var(--brass)]">Tuotteet</a><a href="#yhteystiedot" className="hover:text-[var(--brass)]">Yhteystiedot</a></div></div>
        <div><h3 className="font-bold uppercase tracking-[0.22em] text-[var(--brass)]">Seuraa</h3><div className="mt-4 flex flex-wrap gap-2"><a href={instagramUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_instagram", { source: "footer" })} className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-bold text-[var(--muted)] hover:text-[var(--brass)]">Instagram</a><a href={facebookUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_facebook", { source: "footer" })} className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-bold text-[var(--muted)] hover:text-[var(--brass)]">Facebook</a><a href={tiktokUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_tiktok", { source: "footer" })} className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-bold text-[var(--muted)] hover:text-[var(--brass)]">TikTok</a></div></div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)]">© 2026 Golden Cut Parturi.</div>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--brass-soft)] bg-[rgba(5,4,3,0.96)] p-3 backdrop-blur md:hidden"><PrimaryCta source="mobile_sticky" className="w-full" /></div>
    </footer>
  );
}

export default function AppPremium() {
  return <div className="min-h-screen bg-[var(--ink)] text-[var(--bone)] antialiased"><Header /><main><Hero /><QuickPaths /><Services /><Pricing /><GiftCards /><Products /><Gallery /><Reviews /><FAQ /><Location /><Contact /></main><Footer /></div>;
}
