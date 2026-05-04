import {
  ArrowRight,
  Clock,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scissors,
  Star,
  Train,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { verifiedWorkPhotos } from "./data/socialProof";
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
const luxuryEase = [0.16, 1, 0.3, 1] as const;

const nav = [
  ["#palvelut", "Palvelut"],
  ["#hinnasto", "Hinnasto"],
  ["#kuvat", "Galleria"],
  ["#sijainti", "Sijainti"],
] as const;

const footerLinks = [
  ["#etusivu", "Etusivu"],
  ["#palvelut", "Palvelut"],
  ["#hinnasto", "Hinnasto"],
  ["#kuvat", "Galleria"],
  ["#sijainti", "Yhteys"],
] as const;

const haircutServices = [
  { name: "Klassinen leikkaus", desc: "Perinteinen kone- tai saksileikkaus siisteillä linjoilla.", price: "20 €" },
  { name: "Skin Fade", desc: "Moderni ja tarkka häivytys nollasta ylöspäin.", price: "20 €" },
  { name: "Mid / Taper Fade", desc: "Luonnollinen ja helposti ylläpidettävä fade.", price: "20 €" },
  { name: "Lasten leikkaus", desc: "Rento ja nopea leikkaus perheen pienimmille.", price: "kysy" },
];

const beardServices = [
  { name: "Parran muotoilu", desc: "Linjojen siistiminen ja muodon hakeminen.", price: "15 €" },
  { name: "Koneajo", desc: "Nopea ja tarkka lyhennys koneella.", price: "10 €" },
  { name: "Hiukset + Parta", desc: "Täydellinen paketti: fade ja parran viimeistely.", price: "35 €" },
];

const reveal = {
  hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.82, ease: luxuryEase },
  },
};

function trackMaps(source: string) {
  trackEvent("click_walk_in_maps", { source });
}

function trackPhone(source: string) {
  trackEvent("click_phone_call", { source });
}

function LocationCta({
  label = "Tule ilman ajanvarausta",
  source,
  className = "",
}: {
  label?: string;
  source: string;
  className?: string;
}) {
  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackMaps(source)}
      className={`inline-flex min-h-14 items-center justify-center gap-3 bg-amber-400 px-5 py-4 text-center text-[0.78rem] font-black uppercase tracking-[0.1em] text-black shadow-[0_18px_45px_rgba(251,191,36,0.18)] transition duration-500 luxury-ease hover:-translate-y-0.5 hover:bg-amber-300 sm:min-h-[4.25rem] sm:px-8 sm:text-sm sm:tracking-[0.14em] ${className}`}
    >
      {label}
      <ArrowRight className="h-5 w-5 shrink-0" />
    </a>
  );
}

function Logo() {
  return (
    <a href="#etusivu" className="flex min-w-0 items-center gap-2.5 sm:gap-3" aria-label="Golden Cut etusivu">
      <Scissors className="h-6 w-6 shrink-0 text-white sm:h-8 sm:w-8" />
      <div className="min-w-0 leading-none">
        <p className="font-display truncate text-[0.96rem] font-black uppercase tracking-[0.12em] text-white sm:text-xl sm:tracking-[0.16em]">Golden Cut</p>
        <p className="mt-1 truncate text-[0.55rem] font-bold uppercase tracking-[0.24em] text-white/55 sm:text-[0.65rem] sm:tracking-[0.32em]">Parturi Espoo</p>
      </div>
    </a>
  );
}

function FullScreenMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.48, ease: luxuryEase }}
      className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-[#120303] px-5 py-6 text-white sm:px-10 sm:py-10"
    >
      <div className="mx-auto flex max-w-7xl items-start justify-between gap-4">
        <Logo />
        <button onClick={onClose} className="grid h-12 w-12 shrink-0 place-items-center text-white transition duration-500 luxury-ease hover:rotate-90 hover:text-amber-400 sm:h-14 sm:w-14" aria-label="Sulje valikko">
          <X className="h-9 w-9 sm:h-10 sm:w-10" />
        </button>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 pb-10 pt-16 sm:gap-16 sm:pt-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:pb-0 lg:pt-32">
        <nav className="grid gap-7 sm:gap-10">
          {nav.map(([href, label], index) => (
            <motion.a
              key={href}
              href={href}
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.68, delay: 0.08 + index * 0.075, ease: luxuryEase }}
              onClick={onClose}
              className="font-display text-[clamp(2.7rem,14vw,7rem)] font-black leading-[0.9] tracking-[-0.075em] text-white/85 transition duration-500 luxury-ease hover:translate-x-2 hover:text-amber-400"
            >
              {label}
            </motion.a>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.78, delay: 0.36, ease: luxuryEase }}
          className="grid gap-8 border-t border-white/10 pt-8 sm:gap-10 sm:pt-10 lg:border-t-0 lg:pt-0"
        >
          <div>
            <p className="mb-3 font-serif text-xl font-black text-white/55 sm:mb-4 sm:text-3xl">Email</p>
            <a href={emailHref} className="break-all text-[1.35rem] font-black uppercase leading-tight tracking-[-0.03em] text-white/85 transition duration-500 luxury-ease hover:text-amber-400 sm:text-4xl">
              {email}
            </a>
          </div>

          <div>
            <p className="mb-3 font-serif text-xl font-black text-white/55 sm:mb-4 sm:text-3xl">Puhelin</p>
            <a href={phoneHref} onClick={() => trackPhone("full_menu_phone")} className="text-2xl font-black text-white/85 transition duration-500 luxury-ease hover:text-amber-400 sm:text-4xl">
              {phoneDisplay}
            </a>
          </div>

          <div>
            <p className="mb-3 font-serif text-xl font-black text-white/55 sm:mb-4 sm:text-3xl">Osoite</p>
            <p className="max-w-xl text-2xl font-black leading-tight text-white sm:text-4xl">{address}</p>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackMaps("full_menu_directions")}
            className="inline-flex w-fit items-center gap-4 text-2xl font-black uppercase tracking-[0.03em] text-white transition duration-500 luxury-ease hover:translate-x-2 hover:text-amber-400 sm:gap-5 sm:text-4xl"
          >
            Hae reitit
            <ArrowRight className="h-10 w-10 sm:h-12 sm:w-12" />
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-700 luxury-ease ${
          scrolled
            ? "border-b border-white/10 bg-black/85 shadow-[0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            : "border-b border-white/5 bg-black/20 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:h-24 sm:px-6 lg:px-8">
          <Logo />

          <nav className="hidden items-center gap-8 xl:flex">
            {nav.map(([href, label]) => (
              <a key={href} href={href} className="text-xs font-black uppercase tracking-[0.16em] text-white/65 transition duration-500 luxury-ease hover:text-amber-400">
                {label}
              </a>
            ))}
          </nav>

          <button onClick={() => setOpen(true)} className="grid h-12 w-12 shrink-0 place-items-center text-white transition duration-500 luxury-ease hover:text-amber-400 sm:h-14 sm:w-14" aria-label="Avaa valikko">
            <Menu className="h-8 w-8 sm:h-9 sm:w-9" />
          </button>
        </div>
      </header>

      <FullScreenMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function Hero() {
  return (
    <section id="etusivu" className="relative min-h-[100svh] overflow-hidden bg-black px-5 pb-24 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
      <div className="editorial-image-zoom absolute inset-0">
        <img src={heroPhoto.imageUrl} alt="Golden Cut Parturi Espoo" className="h-full w-full object-cover grayscale brightness-50" loading="eager" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_35%,rgba(251,191,36,0.1),rgba(0,0,0,0.6)_42%,rgba(0,0,0,0.96)_100%)] sm:bg-[radial-gradient(circle_at_48%_42%,rgba(251,191,36,0.09),rgba(0,0,0,0.58)_44%,rgba(0,0,0,0.94)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.74)_62%,#000000_100%)] sm:bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.76)_68%,#000000_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-7rem)] max-w-7xl flex-col justify-end sm:min-h-[calc(100vh-8rem)]">
        <motion.div initial="hidden" animate="visible" variants={reveal} className="max-w-6xl">
          <p className="mb-5 text-[clamp(1.25rem,6vw,3.25rem)] font-black leading-[1.06] tracking-[-0.04em] text-white/65 sm:mb-8">Welcome to Golden Cut.</p>
          <h1 className="font-display max-w-[8.8ch] text-[clamp(3.35rem,16vw,12rem)] font-black leading-[0.88] tracking-[-0.085em] text-white drop-shadow-[0_20px_70px_rgba(0,0,0,0.75)] sm:leading-[0.84] sm:tracking-[-0.09em]">
            Expert Grooming. Distinct Style.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-bold leading-7 text-white/70 sm:mt-8 sm:text-2xl sm:leading-8">
            Nopea, tarkka ja helposti saavutettava miesten parturi Espoon keskuksessa — ilman ajanvarausta.
          </p>
          <div className="mt-9 flex items-center gap-3 text-xl font-black text-white sm:mt-14 sm:gap-4 sm:text-3xl">
            <span className="relative flex h-3.5 w-3.5 sm:h-4 sm:w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-amber-400 sm:h-4 sm:w-4" />
            </span>
            Walk-in avoinna
          </div>
          <div className="mt-7 grid max-w-3xl gap-3 sm:mt-10 sm:grid-cols-[1.2fr_0.8fr] sm:gap-4">
            <LocationCta source="hero_primary_location" />
            <a
              href={phoneHref}
              onClick={() => trackPhone("hero_phone")}
              className="inline-flex min-h-14 items-center justify-center gap-3 border border-white/15 bg-white/[0.035] px-5 py-4 text-center text-[0.78rem] font-black uppercase tracking-[0.1em] text-white transition duration-500 luxury-ease hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-400/10 sm:min-h-[4.25rem] sm:px-8 sm:text-sm sm:tracking-[0.14em]"
            >
              Soita {phoneDisplay}
              <Phone className="h-5 w-5 shrink-0 text-amber-400" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCategory({
  title,
  services,
}: {
  title: string;
  services: Array<{ name: string; desc: string; price: string }>;
}) {
  return (
    <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
      <h3 className="mb-7 border-b border-white/10 pb-5 font-display text-xl font-black uppercase tracking-[0.16em] text-amber-400 sm:mb-8 sm:text-2xl sm:tracking-[0.18em]">{title}</h3>
      <div className="grid gap-7 sm:gap-8">
        {services.map((service) => (
          <a key={service.name} href={mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps(`service_menu_${service.name}`)} className="group block">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-4 sm:items-center">
                  <h4 className="text-xl font-black leading-tight text-white transition duration-500 luxury-ease group-hover:text-amber-400 sm:text-2xl">{service.name}</h4>
                  <div className="relative top-[-4px] hidden flex-1 border-b border-dashed border-white/15 sm:block" />
                </div>
                <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-400 sm:text-base">{service.desc}</p>
              </div>
              <div className="shrink-0 text-2xl font-black leading-none text-amber-400 sm:text-2xl">{service.price}</div>
            </div>
          </a>
        ))}
      </div>
    </motion.div>
  );
}

function ServicesMenu() {
  return (
    <section id="palvelut" className="bg-black px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mb-16 text-center sm:mb-20">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-amber-400">Services</p>
          <h2 className="font-display text-[clamp(2.65rem,12vw,6rem)] font-black leading-[0.94] tracking-[-0.07em] text-white">Tyylit ja palvelut.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-neutral-400 sm:mt-8 sm:text-lg sm:leading-8">Huipputason hiustenleikkaukset, häivytykset ja parranajot asenteella. Selaa palveluita ja kävele suoraan sisään.</p>
        </motion.div>
        <div className="grid gap-16 sm:gap-20" id="hinnasto">
          <ServiceCategory title="Hiustenleikkaukset" services={haircutServices} />
          <ServiceCategory title="Partapalvelut" services={beardServices} />
        </div>
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 text-center sm:mt-20">
          <LocationCta source="services_bottom_location" label="Tule näyttämään tyyli" />
        </motion.div>
      </div>
    </section>
  );
}

function ProofSection() {
  const proof = [
    { icon: Clock, title: "Nopea palvelu", text: "Walk-in-malli sopii arkeen ilman ylimääräistä säätöä." },
    { icon: Scissors, title: "Tarkka työnjälki", text: "Fade-tyylit, klassiset leikkaukset ja partapalvelut." },
    { icon: Star, title: "4.7/5 Google", text: "Yli 300 arvostelua ja vahva paikallinen maine." },
    { icon: Train, title: "Aseman vieressä", text: "Helppo tulla junalla, autolla tai kävellen." },
  ];

  return (
    <section className="border-y border-white/5 bg-[#0D0D0D] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="max-w-4xl">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-amber-400">Why Golden Cut</p>
          <h2 className="font-display text-[clamp(2.7rem,12vw,6.5rem)] font-black leading-[0.92] tracking-[-0.08em] text-white sm:leading-[0.9]">Reilu hinta. Hyvä jälki. Matala kynnys.</h2>
        </motion.div>
        <div className="mt-14 grid gap-9 sm:mt-20 md:grid-cols-2 xl:grid-cols-4">
          {proof.map((item) => (
            <motion.div key={item.title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="border-t border-white/10 pt-7 sm:pt-8">
              <item.icon className="mb-6 h-7 w-7 text-amber-400 sm:mb-8 sm:h-8 sm:w-8" />
              <h3 className="text-xl font-black text-white sm:text-2xl">{item.title}</h3>
              <p className="mt-3 leading-7 text-neutral-400 sm:mt-4">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryStrip() {
  return (
    <section id="kuvat" className="bg-black px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
      <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-amber-400">Gallery</p>
        <h2 className="font-display max-w-4xl text-[clamp(2.65rem,12vw,6rem)] font-black leading-[0.94] tracking-[-0.07em] text-white sm:leading-[0.92]">Aitoa parturityötä. Ei geneeristä stock-kuvaa.</h2>
        <a href={heroPhoto.sourceUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps("gallery_photo") } className="editorial-image-zoom mt-10 block overflow-hidden border border-white/10 sm:mt-12">
          <img src={heroPhoto.imageUrl} alt={heroPhoto.title} className="h-[320px] w-full object-cover grayscale brightness-50 transition duration-700 hover:grayscale-0 hover:brightness-75 sm:h-[460px]" loading="lazy" />
        </a>
      </motion.div>
    </section>
  );
}

function SocialIcons() {
  return (
    <div className="flex items-center gap-5">
      <a href={instagramUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_instagram", { source: "footer_icons" })} aria-label="Instagram" className="text-white/70 transition duration-500 luxury-ease hover:text-amber-400">
        <Instagram className="h-5 w-5" />
      </a>
      <a href={facebookUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_facebook", { source: "footer_icons" })} aria-label="Facebook" className="grid h-5 w-5 place-items-center text-sm font-black leading-none text-white/70 transition duration-500 luxury-ease hover:text-amber-400">
        f
      </a>
      <a href={tiktokUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_tiktok", { source: "footer_icons" })} aria-label="TikTok" className="text-white/70 transition duration-500 luxury-ease hover:text-amber-400">
        <span className="text-lg font-black">♪</span>
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer id="sijainti" className="bg-[#0D0D0D] px-5 py-16 pb-32 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
          <div>
            <Logo />
            <nav className="mt-10 grid gap-4 sm:mt-14">
              {footerLinks.map(([href, label]) => (
                <a key={href} href={href} className="w-fit text-xs font-black uppercase tracking-[0.2em] text-white/80 transition duration-500 luxury-ease hover:text-amber-400">
                  {label}
                </a>
              ))}
            </nav>
            <div className="mt-9 sm:mt-10">
              <SocialIcons />
            </div>
          </div>

          <div id="yhteys" className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <a href={mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps("footer_location")} className="flex gap-4 border-t border-white/10 pt-6 sm:gap-5">
              <MapPin className="mt-1 h-7 w-7 shrink-0 text-white/50 sm:h-8 sm:w-8" />
              <div className="min-w-0">
                <p className="text-xl font-black text-white/65 sm:text-2xl">Osoite</p>
                <p className="mt-3 text-2xl font-black leading-tight text-white sm:mt-4 sm:text-3xl">{address}</p>
                <span className="mt-6 inline-flex items-center gap-3 text-xl font-black uppercase text-white transition duration-500 luxury-ease hover:translate-x-1 hover:text-amber-400 sm:mt-7 sm:gap-4 sm:text-2xl">
                  Hae reitit <ArrowRight className="h-8 w-8 sm:h-10 sm:w-10" />
                </span>
              </div>
            </a>

            <div className="flex gap-4 border-t border-white/10 pt-6 sm:gap-5">
              <Clock className="mt-1 h-7 w-7 shrink-0 text-white/50 sm:h-8 sm:w-8" />
              <div>
                <p className="text-xl font-black text-white/65 sm:text-2xl">Aukioloajat</p>
                <p className="mt-3 text-2xl font-black leading-tight text-white sm:mt-4 sm:text-3xl">Ma–la 10–19<br />Su 11–18</p>
              </div>
            </div>

            <a href={emailHref} className="flex gap-4 border-t border-white/10 pt-6 sm:gap-5">
              <Mail className="mt-1 h-7 w-7 shrink-0 text-white/50 sm:h-8 sm:w-8" />
              <div className="min-w-0">
                <p className="text-xl font-black text-white/65 sm:text-2xl">Email</p>
                <p className="mt-3 break-all text-xl font-black uppercase leading-tight text-white sm:mt-4 sm:text-2xl">{email}</p>
              </div>
            </a>

            <a href={phoneHref} onClick={() => trackPhone("footer_phone")} className="flex gap-4 border-t border-white/10 pt-6 sm:gap-5">
              <Phone className="mt-1 h-7 w-7 shrink-0 text-white/50 sm:h-8 sm:w-8" />
              <div>
                <p className="text-xl font-black text-white/65 sm:text-2xl">Puhelin</p>
                <p className="mt-3 text-2xl font-black leading-tight text-white sm:mt-4 sm:text-3xl">{phoneDisplay}</p>
              </div>
            </a>
          </div>
        </motion.div>

        <div className="mt-12 sm:mt-16">
          <LocationCta source="footer_primary_location" className="w-full" />
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-8 text-xs font-bold uppercase tracking-[0.16em] text-white/45 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Golden Cut Parturi Espoo</p>
          <p>Walk-in only · no appointment needed</p>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/95 p-3 backdrop-blur md:hidden">
        <LocationCta source="mobile_sticky_location" className="w-full" />
      </div>
    </footer>
  );
}

export default function AppWalkIn() {
  return (
    <div className="min-h-screen bg-black text-white antialiased">
      <Header />
      <main>
        <Hero />
        <ProofSection />
        <ServicesMenu />
        <GalleryStrip />
        <Footer />
      </main>
    </div>
  );
}
