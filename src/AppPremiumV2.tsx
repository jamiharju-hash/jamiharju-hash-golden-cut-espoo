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
const luxuryEase = [0.16, 1, 0.3, 1] as const;

type MainCtaLabel = "Tule ilman ajanvarausta" | "Katso sijainti" | "Tule käymään";

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
  { name: "Skin fade", desc: "Moderni ja tarkka häivytys nollasta ylöspäin.", price: "20 €" },
  { name: "Mid fade / Taper fade", desc: "Luonnollinen ja helposti ylläpidettävä fade.", price: "20 €" },
  { name: "Lasten leikkaus", desc: "Rento ja nopea leikkaus perheen pienimmille.", price: "kysy" },
];

const beardServices = [
  { name: "Parran muotoilu", desc: "Linjojen siistiminen ja muodon hakeminen.", price: "15 €" },
  { name: "Koneajo", desc: "Nopea ja tarkka lyhennys koneella.", price: "10 €" },
  { name: "Hiukset + parta", desc: "Kokonaisuus, jossa leikkaus ja parta viimeistellään samalla käynnillä.", price: "35 €" },
];

const reveal = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
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
  label?: MainCtaLabel;
  source: string;
  className?: string;
}) {
  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackMaps(source)}
      className={`inline-flex min-h-14 w-full items-center justify-center gap-3 bg-amber-400 px-4 py-4 text-center text-[0.74rem] font-black uppercase tracking-[0.08em] text-black shadow-[0_18px_45px_rgba(251,191,36,0.18)] transition duration-500 luxury-ease hover:-translate-y-0.5 hover:bg-amber-300 min-[380px]:text-[0.78rem] sm:min-h-[4.25rem] sm:w-auto sm:px-8 sm:text-sm sm:tracking-[0.14em] ${className}`}
    >
      <span className="leading-none">{label}</span>
      <ArrowRight className="h-5 w-5 shrink-0" />
    </a>
  );
}

function Logo() {
  return (
    <a href="#etusivu" className="flex min-w-0 items-center gap-2.5 sm:gap-3" aria-label="Golden Cut etusivu">
      <Scissors className="h-6 w-6 shrink-0 text-white sm:h-8 sm:w-8" />
      <div className="min-w-0 leading-none">
        <p className="font-display truncate text-[0.88rem] font-black uppercase tracking-[0.1em] text-white min-[380px]:text-[0.96rem] sm:text-xl sm:tracking-[0.16em]">Golden Cut</p>
        <p className="mt-1 truncate text-[0.5rem] font-bold uppercase tracking-[0.21em] text-white/55 min-[380px]:text-[0.55rem] sm:text-[0.65rem] sm:tracking-[0.32em]">Parturi Espoo</p>
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
      className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-[#120303] px-4 py-5 text-white min-[380px]:px-5 min-[380px]:py-6 sm:px-10 sm:py-10"
    >
      <div className="mx-auto flex max-w-[100rem] items-start justify-between gap-4">
        <Logo />
        <button onClick={onClose} className="grid h-11 w-11 shrink-0 place-items-center text-white transition duration-500 luxury-ease hover:rotate-90 hover:text-amber-400 sm:h-14 sm:w-14" aria-label="Sulje valikko">
          <X className="h-8 w-8 sm:h-10 sm:w-10" />
        </button>
      </div>

      <div className="mx-auto grid max-w-[100rem] gap-10 pb-10 pt-12 min-[380px]:pt-16 sm:gap-16 sm:pt-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:pb-0 lg:pt-32 2xl:gap-24">
        <nav className="grid gap-5 min-[380px]:gap-7 sm:gap-10">
          {nav.map(([href, label], index) => (
            <motion.a
              key={href}
              href={href}
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.68, delay: 0.08 + index * 0.075, ease: luxuryEase }}
              onClick={onClose}
              className="font-display text-[clamp(2.35rem,13vw,7.4rem)] font-black leading-[0.9] tracking-[-0.075em] text-white/85 transition duration-500 luxury-ease hover:translate-x-2 hover:text-amber-400 2xl:text-[8rem]"
            >
              {label}
            </motion.a>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.78, delay: 0.36, ease: luxuryEase }}
          className="grid gap-7 border-t border-white/10 pt-7 min-[380px]:gap-8 min-[380px]:pt-8 sm:gap-10 sm:pt-10 lg:border-t-0 lg:pt-0"
        >
          <div>
            <p className="mb-2 font-serif text-lg font-black text-white/55 min-[380px]:mb-3 min-[380px]:text-xl sm:mb-4 sm:text-3xl">Sähköposti</p>
            <a href={emailHref} className="break-all text-[1.08rem] font-black uppercase leading-tight tracking-[-0.03em] text-white/85 transition duration-500 luxury-ease hover:text-amber-400 min-[380px]:text-[1.35rem] sm:text-4xl">
              {email}
            </a>
          </div>

          <div>
            <p className="mb-2 font-serif text-lg font-black text-white/55 min-[380px]:mb-3 min-[380px]:text-xl sm:mb-4 sm:text-3xl">Puhelin</p>
            <a href={phoneHref} onClick={() => trackPhone("full_menu_phone")} className="text-2xl font-black text-white/85 transition duration-500 luxury-ease hover:text-amber-400 sm:text-4xl">
              {phoneDisplay}
            </a>
          </div>

          <div>
            <p className="mb-2 font-serif text-lg font-black text-white/55 min-[380px]:mb-3 min-[380px]:text-xl sm:mb-4 sm:text-3xl">Osoite</p>
            <p className="max-w-xl text-[1.35rem] font-black leading-tight text-white min-[380px]:text-2xl sm:text-4xl">{address}</p>
          </div>

          <a href={mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps("full_menu_location")} className="inline-flex w-fit items-center gap-3 text-xl font-black uppercase tracking-[0.03em] text-white transition duration-500 luxury-ease hover:translate-x-2 hover:text-amber-400 min-[380px]:text-2xl sm:gap-5 sm:text-4xl">
            Katso sijainti
            <ArrowRight className="h-8 w-8 min-[380px]:h-10 min-[380px]:w-10 sm:h-12 sm:w-12" />
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
      <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-700 luxury-ease ${scrolled ? "border-b border-white/10 bg-black/85 shadow-[0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl" : "border-b border-white/5 bg-black/20 backdrop-blur-sm"}`}>
        <div className="mx-auto flex h-18 max-w-[100rem] items-center justify-between px-4 min-[380px]:h-20 min-[380px]:px-5 sm:h-24 sm:px-6 lg:px-8 2xl:px-12">
          <Logo />
          <nav className="hidden items-center gap-8 xl:flex 2xl:gap-10">
            {nav.map(([href, label]) => (
              <a key={href} href={href} className="text-xs font-black uppercase tracking-[0.16em] text-white/65 transition duration-500 luxury-ease hover:text-amber-400 2xl:text-sm">
                {label}
              </a>
            ))}
          </nav>
          <button onClick={() => setOpen(true)} className="grid h-11 w-11 shrink-0 place-items-center text-white transition duration-500 luxury-ease hover:text-amber-400 min-[380px]:h-12 min-[380px]:w-12 sm:h-14 sm:w-14" aria-label="Avaa valikko">
            <Menu className="h-7 w-7 min-[380px]:h-8 min-[380px]:w-8 sm:h-9 sm:w-9" />
          </button>
        </div>
      </header>
      <FullScreenMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function Hero() {
  return (
    <section id="etusivu" className="relative min-h-[100svh] overflow-hidden bg-black px-4 pb-24 pt-24 min-[380px]:px-5 min-[380px]:pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8 2xl:px-12">
      <div className="editorial-image-zoom absolute inset-0">
        <img src={heroPhoto.imageUrl} alt="Golden Cut Parturi Espoo" className="h-full w-full object-cover grayscale-[40%] brightness-50" loading="eager" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_35%,rgba(251,191,36,0.08),rgba(0,0,0,0.72)_42%,rgba(0,0,0,0.98)_100%)] sm:bg-[radial-gradient(circle_at_48%_42%,rgba(251,191,36,0.08),rgba(0,0,0,0.68)_44%,rgba(0,0,0,0.98)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.82)_58%,#000000_100%)] sm:bg-[linear-gradient(180deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.82)_68%,#000000_100%)]" />
      </div>
      <div className="relative mx-auto flex min-h-[calc(100svh-6rem)] max-w-[100rem] flex-col justify-end sm:min-h-[calc(100vh-8rem)]">
        <motion.div initial="hidden" animate="visible" variants={reveal} className="max-w-6xl 2xl:max-w-7xl">
          <p className="mb-4 text-[clamp(1.1rem,5.6vw,3.25rem)] font-black uppercase leading-[1.06] tracking-[0.12em] text-amber-400 min-[380px]:mb-5 sm:mb-8">Espoon keskus / walk-in</p>
          <h1 className="font-display max-w-[9.2ch] text-[14vw] font-black uppercase leading-[0.9] tracking-[-0.08em] text-white drop-shadow-[0_20px_70px_rgba(0,0,0,0.75)] sm:text-[72px] lg:text-[127px] 2xl:max-w-[10ch]">Espoon keskuksen luottoparturi miehille.</h1>
          <p className="mt-5 max-w-2xl text-[0.95rem] font-bold leading-7 text-white/75 min-[380px]:mt-6 min-[380px]:text-base sm:mt-8 sm:text-2xl sm:leading-8 2xl:max-w-3xl">Nopea, tarkka ja helposti saavutettava miesten parturi aivan Espoon juna-aseman vieressä — ilman ajanvarausta.</p>
          <div className="mt-8 flex items-center gap-3 text-lg font-black text-white min-[380px]:mt-9 min-[380px]:text-xl sm:mt-14 sm:gap-4 sm:text-3xl">
            <span className="relative flex h-3 w-3 min-[380px]:h-3.5 min-[380px]:w-3.5 sm:h-4 sm:w-4"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" /><span className="relative inline-flex h-3 w-3 rounded-full bg-amber-400 min-[380px]:h-3.5 min-[380px]:w-3.5 sm:h-4 sm:w-4" /></span>
            Walk-in avoinna
          </div>
          <div className="mt-6 grid max-w-3xl gap-3 min-[380px]:mt-7 sm:mt-10 sm:grid-cols-[1.2fr_0.8fr] sm:gap-4 2xl:max-w-4xl">
            <LocationCta source="hero_primary_location" />
            <LocationCta source="hero_secondary_location" label="Katso sijainti" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCategory({ title, services }: { title: string; services: Array<{ name: string; desc: string; price: string }> }) {
  return (
    <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
      <h3 className="mb-7 border-b border-white/10 pb-5 font-display text-lg font-black uppercase tracking-[0.14em] text-amber-400 min-[380px]:text-xl sm:mb-8 sm:text-2xl sm:tracking-[0.18em]">{title}</h3>
      <div className="grid gap-7 sm:gap-8">
        {services.map((service) => (
          <a key={service.name} href={mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps(`service_menu_${service.name}`)} className="group block">
            <div className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-4">
              <div className="min-w-0"><div className="flex items-start gap-4 sm:items-center"><h4 className="text-lg font-black leading-tight text-white transition duration-500 luxury-ease group-hover:text-amber-400 min-[380px]:text-xl sm:text-2xl">{service.name}</h4><div className="relative top-[-4px] hidden flex-1 border-b border-dashed border-white/15 sm:block" /></div><p className="mt-2 max-w-xl text-sm leading-6 text-neutral-400 sm:text-base">{service.desc}</p></div>
              <div className="shrink-0 text-xl font-black leading-none text-amber-400 min-[380px]:text-2xl">{service.price}</div>
            </div>
          </a>
        ))}
      </div>
    </motion.div>
  );
}

function ServicesMenu() {
  return (
    <section id="palvelut" className="bg-black px-4 py-20 min-[380px]:px-5 sm:px-6 sm:py-28 lg:px-8 2xl:px-12">
      <div className="mx-auto max-w-4xl 2xl:max-w-5xl"><motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mb-16 text-center sm:mb-20"><p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-amber-400">Palvelut</p><h2 className="font-display text-[clamp(2.45rem,11vw,6rem)] font-black uppercase leading-[0.94] tracking-[-0.07em] text-white">Tyylit ja palvelut.</h2><p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-neutral-400 sm:mt-8 sm:text-lg sm:leading-8">Miesten leikkaukset, fade-tyylit ja partapalvelut selkeällä hinnalla. Katso palvelut ja tule suoraan sisään.</p></motion.div>
        <div className="grid gap-16 sm:gap-20" id="hinnasto"><ServiceCategory title="Hiukset" services={haircutServices} /><ServiceCategory title="Parta" services={beardServices} /></div>
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 text-center sm:mt-20"><LocationCta source="services_bottom_location" label="Tule käymään" /></motion.div>
      </div>
    </section>
  );
}

function ProofSection() {
  const proof = [
    { icon: Clock, title: "Nopea palvelu", text: "Walk-in-malli sopii arkeen ilman ylimääräistä säätöä." },
    { icon: Scissors, title: "Tarkka työnjälki", text: "Skin fade, mid fade, taper fade ja partapalvelut." },
    { icon: Star, title: "4.7/5 Google", text: "Yli 300 arvostelua ja vahva paikallinen maine." },
    { icon: Train, title: "Aseman vieressä", text: "Helppo tulla junalla, autolla tai kävellen." },
  ];
  return <section className="border-y border-white/5 bg-[#0D0D0D] px-4 py-20 min-[380px]:px-5 sm:px-6 sm:py-28 lg:px-8 2xl:px-12"><div className="mx-auto max-w-[100rem]"><motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="max-w-4xl 2xl:max-w-5xl"><p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-amber-400">Miksi Golden Cut</p><h2 className="font-display text-[clamp(2.5rem,11vw,6.5rem)] font-black leading-[0.92] tracking-[-0.08em] text-white sm:leading-[0.9] 2xl:text-[7rem]">Reilu hinta. Hyvä jälki. Matala kynnys.</h2></motion.div><div className="mt-14 grid gap-9 sm:mt-20 sm:grid-cols-2 xl:grid-cols-4 2xl:gap-12">{proof.map((item) => <motion.div key={item.title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="border-t border-white/10 pt-7 sm:pt-8"><item.icon className="mb-6 h-7 w-7 text-amber-400 sm:mb-8 sm:h-8 sm:w-8" /><h3 className="text-xl font-black text-white sm:text-2xl 2xl:text-3xl">{item.title}</h3><p className="mt-3 leading-7 text-neutral-400 sm:mt-4 2xl:max-w-sm">{item.text}</p></motion.div>)}</div></div></section>;
}

function InterstitialImage() {
  return <section className="relative flex min-h-[64svh] items-center justify-center overflow-hidden bg-black px-4 py-24 text-center min-[380px]:px-5 sm:min-h-[70vh] sm:px-6 lg:px-8 2xl:px-12"><div className="editorial-image-zoom absolute inset-0"><img src={heroPhoto.imageUrl} className="h-full w-full object-cover grayscale-[40%] brightness-50" alt="Golden Cut Parturi Espoo" loading="lazy" /><div className="absolute inset-0 bg-[linear-gradient(180deg,#000000_0%,rgba(0,0,0,0.68)_42%,#000000_100%)]" /></div><motion.h2 variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="relative z-10 mx-auto max-w-5xl font-display text-[clamp(2.45rem,11vw,6rem)] font-black uppercase leading-[0.94] tracking-[-0.07em] text-white sm:leading-[0.92] 2xl:text-[7rem]">Aitoja tyylejä. Aitoa osaamista.</motion.h2></section>;
}

function ReviewSection() {
  const review = verifiedReviews[2] ?? verifiedReviews[0];
  return <section className="bg-black px-4 py-20 min-[380px]:px-5 sm:px-6 sm:py-28 lg:px-8 2xl:px-12"><motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mx-auto max-w-4xl border-l-4 border-amber-400 py-4 pl-7 min-[380px]:pl-10"><p className="font-display text-[clamp(2rem,8vw,4.5rem)] font-black italic leading-[1.02] tracking-[-0.05em] text-white">“{review.quote}”</p><p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-amber-400">— {review.source}</p></motion.div></section>;
}

function GalleryStrip() {
  return <section id="kuvat" className="bg-black px-4 py-20 min-[380px]:px-5 sm:px-6 sm:py-24 lg:px-8 2xl:px-12"><motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mx-auto max-w-[100rem]"><p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-amber-400">Galleria</p><h2 className="font-display max-w-4xl text-[clamp(2.45rem,11vw,6rem)] font-black leading-[0.94] tracking-[-0.07em] text-white sm:leading-[0.92] 2xl:max-w-5xl 2xl:text-[7rem]">Katso Golden Cutin työnjälki.</h2><a href={heroPhoto.sourceUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps("gallery_photo")} className="editorial-image-zoom relative mt-10 block overflow-hidden border border-white/10 bg-black sm:mt-12"><img src={heroPhoto.imageUrl} alt={heroPhoto.title} className="h-[300px] w-full object-cover grayscale-[40%] brightness-50 min-[380px]:h-[320px] sm:h-[460px] xl:h-[560px] 2xl:h-[680px]" loading="lazy" /><div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.62)_100%)]" /></a></motion.div></section>;
}

function SocialIcons() {
  return <div className="flex items-center gap-5"><a href={instagramUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_instagram", { source: "footer_icons" })} aria-label="Instagram" className="text-white/70 transition duration-500 luxury-ease hover:text-amber-400"><Instagram className="h-5 w-5" /></a><a href={facebookUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_facebook", { source: "footer_icons" })} aria-label="Facebook" className="grid h-5 w-5 place-items-center text-sm font-black leading-none text-white/70 transition duration-500 luxury-ease hover:text-amber-400">f</a><a href={tiktokUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_tiktok", { source: "footer_icons" })} aria-label="TikTok" className="text-white/70 transition duration-500 luxury-ease hover:text-amber-400"><span className="text-lg font-black">♪</span></a></div>;
}

function Footer() {
  return (
    <footer id="sijainti" className="bg-[#0D0D0D] px-4 py-16 pb-32 min-[380px]:px-5 sm:px-6 sm:py-20 lg:px-8 2xl:px-12">
      <div className="mx-auto max-w-[100rem]"><motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14 2xl:gap-24"><div><Logo /><h2 className="mt-12 font-display text-[clamp(3rem,13vw,7rem)] font-black uppercase leading-[0.9] tracking-[-0.08em] text-white">Kävele <br /><span className="text-amber-400">sisään.</span></h2><nav className="mt-10 grid gap-4 sm:mt-14">{footerLinks.map(([href, label]) => <a key={href} href={href} className="w-fit text-xs font-black uppercase tracking-[0.2em] text-white/80 transition duration-500 luxury-ease hover:text-amber-400">{label}</a>)}</nav><div className="mt-9 sm:mt-10"><SocialIcons /></div></div><div className="grid gap-10"><div id="yhteys" className="grid gap-8 lg:grid-cols-2 lg:gap-10 2xl:gap-14"><a href={mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps("footer_location")} className="flex gap-4 border-t border-white/10 pt-6 sm:gap-5"><MapPin className="mt-1 h-7 w-7 shrink-0 text-white/50 sm:h-8 sm:w-8" /><div className="min-w-0"><p className="text-xl font-black text-white/65 sm:text-2xl">Osoite</p><p className="mt-3 text-[1.55rem] font-black leading-tight text-white min-[380px]:text-2xl sm:mt-4 sm:text-3xl">{address}</p><span className="mt-6 inline-flex items-center gap-3 text-xl font-black uppercase text-white transition duration-500 luxury-ease hover:translate-x-1 hover:text-amber-400 sm:mt-7 sm:gap-4 sm:text-2xl">Katso sijainti <ArrowRight className="h-8 w-8 sm:h-10 sm:w-10" /></span></div></a><div className="flex gap-4 border-t border-white/10 pt-6 sm:gap-5"><Clock className="mt-1 h-7 w-7 shrink-0 text-white/50 sm:h-8 sm:w-8" /><div><p className="text-xl font-black text-white/65 sm:text-2xl">Aukioloajat</p><p className="mt-3 text-[1.55rem] font-black leading-tight text-white min-[380px]:text-2xl sm:mt-4 sm:text-3xl">Ma–la 10–19<br />Su 11–18</p></div></div><a href={emailHref} className="flex gap-4 border-t border-white/10 pt-6 sm:gap-5"><Mail className="mt-1 h-7 w-7 shrink-0 text-white/50 sm:h-8 sm:w-8" /><div className="min-w-0"><p className="text-xl font-black text-white/65 sm:text-2xl">Sähköposti</p><p className="mt-3 break-all text-lg font-black uppercase leading-tight text-white min-[380px]:text-xl sm:mt-4 sm:text-2xl">{email}</p></div></a><a href={phoneHref} onClick={() => trackPhone("footer_phone")} className="flex gap-4 border-t border-white/10 pt-6 sm:gap-5"><Phone className="mt-1 h-7 w-7 shrink-0 text-white/50 sm:h-8 sm:w-8" /><div><p className="text-xl font-black text-white/65 sm:text-2xl">Puhelin</p><p className="mt-3 text-[1.55rem] font-black leading-tight text-white min-[380px]:text-2xl sm:mt-4 sm:text-3xl">{phoneDisplay}</p></div></a></div><div className="h-[360px] overflow-hidden border border-white/10 bg-black grayscale-[40%] brightness-75 sm:h-[420px] lg:h-[520px]"><iframe title="Golden Cut Parturi kartta" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.4696338415222!2d24.655731276847625!3d60.20605967505068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x468df36efe27437b%3A0x71e90b46c830dc97!2sGolden%20Cut-parturi!5e0!3m2!1sfi!2sfi!4v1777578700979!5m2!1sfi!2sfi" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div></motion.div><div className="mt-12 sm:mt-16"><LocationCta source="footer_primary_location" label="Tule ilman ajanvarausta" className="w-full sm:w-full" /></div><div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-8 text-xs font-bold uppercase tracking-[0.16em] text-white/45 sm:mt-20 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Golden Cut Parturi Espoo</p><p>Ilman ajanvarausta · Tervetuloa suoraan sisään</p></div></div><div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/95 p-3 backdrop-blur md:hidden"><LocationCta source="mobile_sticky_location" label="Tule ilman ajanvarausta" className="w-full" /></div>
    </footer>
  );
}

export default function AppPremiumV2() {
  return <div className="min-h-screen overflow-x-hidden bg-black text-white antialiased"><Header /><main><Hero /><ProofSection /><ServicesMenu /><InterstitialImage /><ReviewSection /><GalleryStrip /><Footer /></main></div>;
}
