import { Clock, Instagram, Mail, MapPin, Phone, Star, Train } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Hero } from "./components/Hero";
import { LocationCta, trackMaps, trackPhone } from "./components/LocationCta";
import { Logo, Navigation } from "./components/Navigation";
import { ServiceMenu } from "./components/ServiceMenu";
import { verifiedReviews } from "./data/socialProof";
import {
  address,
  email,
  emailHref,
  facebookUrl,
  footerLinks,
  heroPhoto,
  instagramUrl,
  mapsUrl,
  phoneDisplay,
  phoneHref,
  proofItems,
  reveal,
  tiktokUrl,
} from "./lib/goldenCutConfig";
import { trackEvent } from "./lib/analytics";

function ProofSection() {
  return (
    <section className="border-y border-white/5 bg-[#0D0D0D] px-4 py-20 min-[380px]:px-5 sm:px-6 sm:py-28 lg:px-8 2xl:px-12">
      <div className="mx-auto max-w-[100rem]">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="max-w-4xl 2xl:max-w-5xl">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-amber-400">Miksi Golden Cut</p>
          <h2 className="font-display text-[clamp(2.5rem,11vw,6.5rem)] font-black leading-[0.92] tracking-[-0.08em] text-white sm:leading-[0.9] 2xl:text-[7rem]">Reilu hinta. Hyvä jälki. Matala kynnys.</h2>
        </motion.div>
        <div className="mt-14 grid gap-9 sm:mt-20 sm:grid-cols-2 xl:grid-cols-4 2xl:gap-12">
          {proofItems.map((item) => (
            <motion.div key={item.title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="border-t border-white/10 pt-7 sm:pt-8">
              <item.icon className="mb-6 h-7 w-7 text-amber-400 sm:mb-8 sm:h-8 sm:w-8" />
              <h3 className="text-xl font-black text-white sm:text-2xl 2xl:text-3xl">{item.title}</h3>
              <p className="mt-3 leading-7 text-neutral-400 sm:mt-4 2xl:max-w-sm">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InterstitialImage() {
  return (
    <section className="relative flex min-h-[64svh] items-center justify-center overflow-hidden bg-black px-4 py-24 text-center min-[380px]:px-5 sm:min-h-[70vh] sm:px-6 lg:px-8 2xl:px-12">
      <div className="editorial-image-zoom absolute inset-0">
        <img src={heroPhoto.imageUrl} className="h-full w-full object-cover grayscale-[40%] brightness-50" alt="Golden Cut Parturi Espoo" loading="lazy" />
        <div className="absolute inset-0 editorial-mask-deep" />
      </div>
      <motion.h2 variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="relative z-10 mx-auto max-w-5xl font-display text-[clamp(2.45rem,11vw,6rem)] font-black uppercase leading-[0.94] tracking-[-0.07em] text-white sm:leading-[0.92] 2xl:text-[7rem]">
        Aitoja tyylejä. Aitoa osaamista.
      </motion.h2>
    </section>
  );
}

function ReviewSection() {
  const review = verifiedReviews[2] ?? verifiedReviews[0];

  return (
    <section className="bg-black px-4 py-20 min-[380px]:px-5 sm:px-6 sm:py-28 lg:px-8 2xl:px-12">
      <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mx-auto max-w-4xl border-l-4 border-amber-400 py-4 pl-7 min-[380px]:pl-10">
        <p className="font-display text-[clamp(2rem,8vw,4.5rem)] font-black italic leading-[1.02] tracking-[-0.05em] text-white">“{review.quote}”</p>
        <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-amber-400">— {review.source}</p>
      </motion.div>
    </section>
  );
}

function GalleryStrip() {
  return (
    <section id="kuvat" className="bg-black px-4 py-20 min-[380px]:px-5 sm:px-6 sm:py-24 lg:px-8 2xl:px-12">
      <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mx-auto max-w-[100rem]">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-amber-400">Galleria</p>
        <h2 className="font-display max-w-4xl text-[clamp(2.45rem,11vw,6rem)] font-black leading-[0.94] tracking-[-0.07em] text-white sm:leading-[0.92] 2xl:max-w-5xl 2xl:text-[7rem]">Katso Golden Cutin työnjälki.</h2>
        <a href={heroPhoto.sourceUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps("gallery_photo")} className="editorial-image-zoom relative mt-10 block overflow-hidden border border-white/10 bg-black sm:mt-12">
          <img src={heroPhoto.imageUrl} alt={heroPhoto.title} className="h-[300px] w-full object-cover grayscale-[40%] brightness-50 min-[380px]:h-[320px] sm:h-[460px] xl:h-[560px] 2xl:h-[680px]" loading="lazy" />
          <div className="pointer-events-none absolute inset-0 editorial-mask-gallery" />
        </a>
      </motion.div>
    </section>
  );
}

function SocialIcons() {
  return (
    <div className="flex items-center gap-5">
      <a href={instagramUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_instagram", { source: "footer_icons" })} aria-label="Instagram" className="text-white/70 transition duration-500 luxury-ease hover:text-amber-400"><Instagram className="h-5 w-5" /></a>
      <a href={facebookUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_facebook", { source: "footer_icons" })} aria-label="Facebook" className="grid h-5 w-5 place-items-center text-sm font-black leading-none text-white/70 transition duration-500 luxury-ease hover:text-amber-400">f</a>
      <a href={tiktokUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_tiktok", { source: "footer_icons" })} aria-label="TikTok" className="text-white/70 transition duration-500 luxury-ease hover:text-amber-400">♪</a>
    </div>
  );
}

function MobileStickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const hero = document.getElementById("etusivu");
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : window.innerHeight;
      setShow(heroBottom < window.innerHeight * 0.35);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/95 p-3 backdrop-blur transition duration-500 luxury-ease md:hidden ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"}`}>
      <LocationCta source="mobile_sticky_location" label="Tule ilman ajanvarausta" className="w-full" />
    </div>
  );
}

function Footer() {
  return (
    <footer id="sijainti" className="bg-[#0D0D0D] px-4 py-16 pb-32 min-[380px]:px-5 sm:px-6 sm:py-20 lg:px-8 2xl:px-12">
      <div className="mx-auto max-w-[100rem]">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14 2xl:gap-24">
          <div>
            <Logo />
            <h2 className="mt-12 font-display text-[clamp(3rem,13vw,7rem)] font-black uppercase leading-[0.9] tracking-[-0.08em] text-white">Kävele <br /><span className="text-amber-400">sisään.</span></h2>
            <nav className="mt-10 grid gap-4 sm:mt-14">
              {footerLinks.map(([href, label]) => <a key={href} href={href} className="w-fit text-xs font-black uppercase tracking-[0.2em] text-white/80 transition duration-500 luxury-ease hover:text-amber-400">{label}</a>)}
            </nav>
            <div className="mt-9 sm:mt-10"><SocialIcons /></div>
          </div>
          <div className="grid gap-10">
            <div id="yhteys" className="grid gap-8 lg:grid-cols-2 lg:gap-10 2xl:gap-14">
              <a href={mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackMaps("footer_location")} className="flex gap-4 border-t border-white/10 pt-6 sm:gap-5"><MapPin className="mt-1 h-7 w-7 shrink-0 text-white/50 sm:h-8 sm:w-8" /><div className="min-w-0"><p className="text-xl font-black text-white/65 sm:text-2xl">Osoite</p><p className="mt-3 text-[1.55rem] font-black leading-tight text-white min-[380px]:text-2xl sm:mt-4 sm:text-3xl">{address}</p><span className="mt-6 inline-flex items-center gap-3 text-xl font-black uppercase text-white transition duration-500 luxury-ease hover:translate-x-1 hover:text-amber-400 sm:mt-7 sm:gap-4 sm:text-2xl">Katso sijainti</span></div></a>
              <div className="flex gap-4 border-t border-white/10 pt-6 sm:gap-5"><Clock className="mt-1 h-7 w-7 shrink-0 text-white/50 sm:h-8 sm:w-8" /><div><p className="text-xl font-black text-white/65 sm:text-2xl">Aukioloajat</p><p className="mt-3 text-[1.55rem] font-black leading-tight text-white min-[380px]:text-2xl sm:mt-4 sm:text-3xl">Ma–la 10–19<br />Su 11–18</p></div></div>
              <a href={emailHref} className="flex gap-4 border-t border-white/10 pt-6 sm:gap-5"><Mail className="mt-1 h-7 w-7 shrink-0 text-white/50 sm:h-8 sm:w-8" /><div className="min-w-0"><p className="text-xl font-black text-white/65 sm:text-2xl">Sähköposti</p><p className="mt-3 break-all text-lg font-black uppercase leading-tight text-white min-[380px]:text-xl sm:mt-4 sm:text-2xl">{email}</p></div></a>
              <a href={phoneHref} onClick={() => trackPhone("footer_phone")} className="flex gap-4 border-t border-white/10 pt-6 sm:gap-5"><Phone className="mt-1 h-7 w-7 shrink-0 text-white/50 sm:h-8 sm:w-8" /><div><p className="text-xl font-black text-white/65 sm:text-2xl">Puhelin</p><p className="mt-3 text-[1.55rem] font-black leading-tight text-white min-[380px]:text-2xl sm:mt-4 sm:text-3xl">{phoneDisplay}</p></div></a>
            </div>
            <div className="h-[360px] overflow-hidden border border-white/10 bg-black grayscale-[40%] brightness-75 sm:h-[420px] lg:h-[520px]"><iframe title="Golden Cut Parturi kartta" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.4696338415222!2d24.655731276847625!3d60.20605967505068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x468df36efe27437b%3A0x71e90b46c830dc97!2sGolden%20Cut-parturi!5e0!3m2!1sfi!2sfi!4v1777578700979!5m2!1sfi!2sfi" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
          </div>
        </motion.div>
        <div className="mt-12 sm:mt-16"><LocationCta source="footer_primary_location" label="Tule ilman ajanvarausta" className="w-full sm:w-full" /></div>
        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-8 text-xs font-bold uppercase tracking-[0.16em] text-white/45 sm:mt-20 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Golden Cut Parturi Espoo</p><p>Ilman ajanvarausta · Tervetuloa suoraan sisään</p></div>
      </div>
      <MobileStickyCta />
    </footer>
  );
}

export default function AppStructured() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white antialiased">
      <Navigation />
      <main>
        <Hero />
        <ProofSection />
        <ServiceMenu />
        <InterstitialImage />
        <ReviewSection />
        <GalleryStrip />
        <Footer />
      </main>
    </div>
  );
}
