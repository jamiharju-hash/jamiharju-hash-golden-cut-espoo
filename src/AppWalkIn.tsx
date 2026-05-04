import {
  ArrowRight,
  Clock,
  Facebook,
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
  hidden: { opacity: 0, y: 42, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
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
      className={`inline-flex min-h-[4.25rem] items-center justify-center gap-3 bg-amber-400 px-8 py-4 text-sm font-black uppercase tracking-[0.14em] text-black shadow-[0_22px_55px_rgba(251,191,36,0.2)] transition hover:-translate-y-0.5 hover:bg-amber-300 ${className}`}
    >
      {label}
      <ArrowRight className="h-5 w-5" />
    </a>
  );
}

function Logo() {
  return (
    <a href="#etusivu" className="flex items-center gap-3" aria-label="Golden Cut etusivu">
      <Scissors className="h-8 w-8 text-white" />
      <div className="leading-none">
        <p className="font-display text-xl font-black uppercase tracking-[0.16em] text-white">Golden Cut</p>
        <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.32em] text-white/55">Parturi Espoo</p>
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
      className="fixed inset-0 z-[80] overflow-y-auto bg-[#120303] px-6 py-10 text-white sm:px-10"
    >
      <div className="mx-auto flex max-w-7xl items-start justify-between gap-6">
        <Logo />
        <button onClick={onClose} className="grid h-14 w-14 shrink-0 place-items-center text-white" aria-label="Sulje valikko">
          <X className="h-10 w-10" />
        </button>
      </div>

      <div className="mx-auto grid max-w-7xl gap-16 pt-24 sm:pt-32 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
        <nav className="grid gap-10 sm:gap-12">
          {nav.map(([href, label], index) => (
            <motion.a
              key={href}
              href={href}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onClick={onClose}
              className="font-display text-[clamp(3.35rem,12vw,7rem)] font-black leading-[0.88] tracking-[-0.075em] text-white/85 transition hover:text-amber-400"
            >
              {label}
            </motion.a>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 border-t border-white/10 pt-10 lg:border-t-0 lg:pt-0"
        >
          <div>
            <p className="mb-4 font-serif text-2xl font-black text-white/55 sm:text-3xl">Email</p>
            <a href={emailHref} className="break-all text-2xl font-black uppercase tracking-[-0.03em] text-white/85 sm:text-4xl">
              {email}
            </a>
          </div>

          <div>
            <p className="mb-4 font-serif text-2xl font-black text-white/55 sm:text-3xl">Puhelin</p>
            <a href={phoneHref} onClick={() => trackPhone("full_menu_phone")} className="text-3xl font-black text-white/85 sm:text-4xl">
              {phoneDisplay}
            </a>
          </div>

          <div>
            <p className="mb-4 font-serif text-2xl font-black text-white/55 sm:text-3xl">Osoite</p>
            <p className="max-w-xl text-3xl font-black leading-tight text-white sm:text-4xl">{address}</p>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackMaps("full_menu_directions")}
            className="inline-flex items-center gap-5 text-2xl font-black uppercase tracking-[0.03em] text-white transition hover:text-amber-400 sm:text-4xl"
          >
            Hae reitit
            <ArrowRight className="h-12 w-12" />
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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-black/85 shadow-[0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            : "border-b border-white/5 bg-black/20 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Logo />

          <nav className="hidden items-center gap-8 xl:flex">
            {nav.map(([href, label]) => (
              <a key={href} href={href} className="text-xs font-black uppercase tracking-[0.16em] text-white/65 transition hover:text-amber-400">
                {label}
              </a>
            ))}
          </nav>

          <button onClick={() => setOpen(true)} className="grid h-14 w-14 place-items-center text-white" aria-label="Avaa valikko">
            <Menu className="h-9 w-9" />
          </button>
        </div>
      </header>

      <FullScreenMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function Hero() {
  return (
    <section id="etusivu" className="relative min-h-screen overflow-hidden bg-black px-5 pb-16 pt-32 sm:px-6 lg:px-8">
      <div className="absolute inset-0">
        <img src={heroPhoto.imageUrl} alt="Golden Cut Parturi Espoo" className="h-full w-full object-cover grayscale brightness-50" loading="eager" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_42%,rgba(251,191,36,0.09),rgba(0,0,0,0.58)_44%,rgba(0,0,0,0.94)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.76)_68%,#000000_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col justify-end">
        <motion.div initial="hidden" animate="visible" variants={reveal} className="max-w-6xl">
          <p className="mb-8 text-[clamp(1.65rem,4.8vw,3.25rem)] font-black leading-[1.05] tracking-[-0.04em] text-white/65">Welcome to Golden Cut.</p>
          <h1 className="font-display max-w-[8.8ch] text-[clamp(5rem,16vw,12rem)] font-black leading-[0.84] tracking-[-0.09em] text-white drop-shadow-[0_20px_70px_rgba(0,0,0,0.75)]">
            Expert Grooming. Distinct Style.
          </h1>
          <p className="mt-8 max-w-2xl text-xl font-bold leading-8 text-white/70 sm:text-2xl">
            Nopea, tarkka ja helposti saavutettava miesten parturi Espoon keskuksessa — ilman ajanvarausta.
          </p>
          <div className="mt-14 flex items-center gap-4 text-2xl font-black text-white sm:text-3xl">
            <span className="relative flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-4 w-4 rounded-full bg-amber-400" />
            </span>
            Walk-in avoinna
          </div>
          <div className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-[1.2fr_0.8fr]">
            <LocationCta source="hero_primary_location" />
            <a
              href={phoneHref}
              onClick={() => trackPhone("hero_phone")}
              className="inline-flex min-h-[4.25rem] items-center justify-center gap-3 border border-white/15 bg-white/[0.035] px-8 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-400/10"
            >
              Soita {phoneDisplay}
              <Phone className="h-5 w-5 text-amber-400" />
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
    <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }}>
      <h3 className="mb-8 border-b border-white/10 pb-5 font-display text-2xl font-black uppercase tracking-[0.18em] text-amber-400">{title}</h3>
      <div className="grid gap-7">
        {services.map((service) => (
          <a key={service.name} href={mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps(`service_menu_${service.name}`)} className="group block">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <h4 className="text-xl font-black text-white transition-colors group-hover:text-amber-400 sm:text-2xl">{service.name}</h4>
                  <div className="relative top-[-4px] hidden flex-1 border-b border-dashed border-white/15 sm:block" />
                </div>
                <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-400 sm:text-base">{service.desc}</p>
              </div>
              <div className="shrink-0 text-2xl font-black text-amber-400">{service.price}</div>
            </div>
          </a>
        ))}
      </div>
    </motion.div>
  );
}

function ServicesMenu() {
  return (
    <section id="palvelut" className="bg-black px-5 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} className="mb-20 text-center">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-amber-400">Services</p>
          <h2 className="font-display text-[clamp(3rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.07em] text-white">Tyylit ja palvelut.</h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-neutral-400">Huipputason hiustenleikkaukset, häivytykset ja parranajot asenteella. Selaa palveluita ja kävele suoraan sisään.</p>
        </motion.div>
        <div className="grid gap-20" id="hinnasto">
          <ServiceCategory title="Hiustenleikkaukset" services={haircutServices} />
          <ServiceCategory title="Partapalvelut" services={beardServices} />
        </div>
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-20 text-center">
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
    <section className="border-y border-white/5 bg-[#0D0D0D] px-5 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} className="max-w-4xl">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-amber-400">Why Golden Cut</p>
          <h2 className="font-display text-[clamp(3rem,8vw,6.5rem)] font-black leading-[0.9] tracking-[-0.08em] text-white">Reilu hinta. Hyvä jälki. Matala kynnys.</h2>
        </motion.div>
        <div className="mt-20 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {proof.map((item) => (
            <motion.div key={item.title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} className="border-t border-white/10 pt-8">
              <item.icon className="mb-8 h-8 w-8 text-amber-400" />
              <h3 className="text-2xl font-black text-white">{item.title}</h3>
              <p className="mt-4 leading-7 text-neutral-400">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryStrip() {
  return (
    <section id="kuvat" className="bg-black px-5 py-24 sm:px-6 lg:px-8">
      <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-amber-400">Gallery</p>
        <h2 className="font-display max-w-4xl text-[clamp(3rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.07em] text-white">Aitoa parturityötä. Ei geneeristä stock-kuvaa.</h2>
        <a href={heroPhoto.sourceUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps("gallery_photo") } className="mt-12 block overflow-hidden border border-white/10">
          <img src={heroPhoto.imageUrl} alt={heroPhoto.title} className="h-[460px] w-full object-cover grayscale brightness-50 transition duration-700 hover:grayscale-0 hover:brightness-75" loading="lazy" />
        </a>
      </motion.div>
    </section>
  );
}

function SocialIcons() {
  return (
    <div className="flex items-center gap-5">
      <a href={instagramUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_instagram", { source: "footer_icons" })} aria-label="Instagram" className="text-white/70 transition hover:text-amber-400">
        <Instagram className="h-5 w-5" />
      </a>
      <a href={facebookUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_facebook", { source: "footer_icons" })} aria-label="Facebook" className="text-white/70 transition hover:text-amber-400">
        <Facebook className="h-5 w-5" />
      </a>
      <a href={tiktokUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_tiktok", { source: "footer_icons" })} aria-label="TikTok" className="text-white/70 transition hover:text-amber-400">
        <span className="text-lg font-black">♪</span>
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer id="sijainti" className="bg-[#0D0D0D] px-5 py-20 pb-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <Logo />
            <nav className="mt-14 grid gap-4">
              {footerLinks.map(([href, label]) => (
                <a key={href} href={href} className="w-fit text-xs font-black uppercase tracking-[0.2em] text-white/80 transition hover:text-amber-400">
                  {label}
                </a>
              ))}
            </nav>
            <div className="mt-10">
              <SocialIcons />
            </div>
          </div>

          <div id="yhteys" className="grid gap-10 lg:grid-cols-2">
            <a href={mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps("footer_location")} className="flex gap-5 border-t border-white/10 pt-6">
              <MapPin className="mt-1 h-8 w-8 shrink-0 text-white/50" />
              <div>
                <p className="text-2xl font-black text-white/65">Osoite</p>
                <p className="mt-4 text-3xl font-black leading-tight text-white">{address}</p>
                <span className="mt-7 inline-flex items-center gap-4 text-2xl font-black uppercase text-white transition hover:text-amber-400">
                  Hae reitit <ArrowRight className="h-10 w-10" />
                </span>
              </div>
            </a>

            <div className="flex gap-5 border-t border-white/10 pt-6">
              <Clock className="mt-1 h-8 w-8 shrink-0 text-white/50" />
              <div>
                <p className="text-2xl font-black text-white/65">Aukioloajat</p>
                <p className="mt-4 text-3xl font-black leading-tight text-white">Ma–la 10–19<br />Su 11–18</p>
              </div>
            </div>

            <a href={emailHref} className="flex gap-5 border-t border-white/10 pt-6">
              <Mail className="mt-1 h-8 w-8 shrink-0 text-white/50" />
              <div>
                <p className="text-2xl font-black text-white/65">Email</p>
                <p className="mt-4 break-all text-2xl font-black uppercase leading-tight text-white">{email}</p>
              </div>
            </a>

            <a href={phoneHref} onClick={() => trackPhone("footer_phone")} className="flex gap-5 border-t border-white/10 pt-6">
              <Phone className="mt-1 h-8 w-8 shrink-0 text-white/50" />
              <div>
                <p className="text-2xl font-black text-white/65">Puhelin</p>
                <p className="mt-4 text-3xl font-black leading-tight text-white">{phoneDisplay}</p>
              </div>
            </a>
          </div>
        </motion.div>

        <div className="mt-16">
          <LocationCta source="footer_primary_location" className="w-full" />
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-white/10 pt-8 text-xs font-bold uppercase tracking-[0.16em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
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
