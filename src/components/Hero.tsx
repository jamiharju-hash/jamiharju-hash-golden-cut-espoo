import { motion } from "motion/react";
import { Phone } from "lucide-react";
import { heroPhoto, heroVideoUrl, phoneDisplay, phoneHref, reveal } from "../lib/goldenCutConfig";
import { LocationCta, trackPhone } from "./LocationCta";

export function Hero() {
  return (
    <section id="etusivu" className="relative min-h-[100svh] overflow-hidden bg-black px-4 pb-20 pt-24 min-[380px]:px-5 min-[380px]:pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8 2xl:px-12">
      <div className="editorial-image-zoom absolute inset-0">
        {heroVideoUrl ? (
          <video className="h-full w-full object-cover grayscale-[40%] brightness-50" autoPlay muted loop playsInline poster={heroPhoto.imageUrl}>
            <source src={heroVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <img src={heroPhoto.imageUrl} alt="Golden Cut Parturi Espoo" className="h-full w-full object-cover grayscale-[40%] brightness-50" loading="eager" />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_35%,rgba(251,191,36,0.08),rgba(0,0,0,0.74)_42%,rgba(0,0,0,0.985)_100%)] sm:bg-[radial-gradient(circle_at_48%_42%,rgba(251,191,36,0.08),rgba(0,0,0,0.68)_44%,rgba(0,0,0,0.98)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.84)_56%,#000000_100%)] sm:bg-[linear-gradient(180deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.82)_68%,#000000_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-5.5rem)] max-w-[100rem] flex-col justify-end sm:min-h-[calc(100vh-8rem)]">
        <motion.div initial="hidden" animate="visible" variants={reveal} className="max-w-6xl 2xl:max-w-7xl">
          <p className="mb-3 text-[clamp(0.78rem,3.6vw,1.05rem)] font-black uppercase leading-none tracking-[0.14em] text-amber-400 min-[380px]:mb-4 sm:mb-8 sm:text-[clamp(1.1rem,5.6vw,3.25rem)] sm:leading-[1.06] sm:tracking-[0.12em]">
            Espoon keskus / walk-in
          </p>
          <h1 className="font-display max-w-[8.6ch] text-[clamp(2.55rem,12.2vw,3.35rem)] font-black uppercase leading-[0.96] tracking-[-0.065em] text-white drop-shadow-[0_20px_70px_rgba(0,0,0,0.75)] min-[380px]:max-w-[9.2ch] min-[380px]:text-[clamp(3rem,12.5vw,4.1rem)] sm:text-[72px] sm:leading-[0.92] sm:tracking-[-0.08em] lg:text-[127px] lg:leading-[0.9] 2xl:max-w-[10ch]">
            Espoon keskuksen luottoparturi miehille.
          </h1>
          <p className="mt-4 max-w-[34rem] text-[0.92rem] font-bold leading-[1.62] text-white/78 min-[380px]:mt-5 min-[380px]:text-[0.98rem] sm:mt-8 sm:max-w-2xl sm:text-2xl sm:leading-[1.38] 2xl:max-w-3xl">
            Nopea, tarkka ja helposti saavutettava miesten parturi aivan Espoon juna-aseman vieressä — ilman ajanvarausta.
          </p>
          <div className="mt-6 flex items-center gap-3 text-base font-black text-white min-[380px]:mt-7 min-[380px]:text-lg sm:mt-14 sm:gap-4 sm:text-3xl">
            <span className="relative flex h-3 w-3 min-[380px]:h-3.5 min-[380px]:w-3.5 sm:h-4 sm:w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-400 min-[380px]:h-3.5 min-[380px]:w-3.5 sm:h-4 sm:w-4" />
            </span>
            Walk-in avoinna
          </div>
          <div className="mt-5 grid max-w-3xl gap-3 min-[380px]:mt-6 sm:mt-10 sm:grid-cols-[1.2fr_0.8fr] sm:gap-4 2xl:max-w-4xl">
            <LocationCta source="hero_primary_location" />
            <LocationCta source="hero_secondary_location" label="Katso sijainti" />
          </div>
          <a href={phoneHref} onClick={() => trackPhone("hero_phone_text")} className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-white/65 transition duration-500 luxury-ease hover:text-amber-400 min-[380px]:mt-5 sm:mt-7 sm:text-sm sm:tracking-[0.16em]">
            <Phone className="h-4 w-4 text-amber-400" />
            Soita {phoneDisplay}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
