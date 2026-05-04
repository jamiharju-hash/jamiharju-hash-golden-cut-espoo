import { motion } from "motion/react";
import { Phone } from "lucide-react";
import { heroPhoto, heroVideoUrl, phoneDisplay, phoneHref, reveal } from "../lib/goldenCutConfig";
import { LocationCta, trackPhone } from "./LocationCta";

export function Hero() {
  return (
    <section id="etusivu" className="relative min-h-[100svh] overflow-hidden bg-black px-4 pb-24 pt-24 min-[380px]:px-5 min-[380px]:pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8 2xl:px-12">
      <div className="editorial-image-zoom absolute inset-0">
        {heroVideoUrl ? (
          <video className="h-full w-full object-cover grayscale-[40%] brightness-50" autoPlay muted loop playsInline poster={heroPhoto.imageUrl}>
            <source src={heroVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <img src={heroPhoto.imageUrl} alt="Golden Cut Parturi Espoo" className="h-full w-full object-cover grayscale-[40%] brightness-50" loading="eager" />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_35%,rgba(251,191,36,0.08),rgba(0,0,0,0.72)_42%,rgba(0,0,0,0.98)_100%)] sm:bg-[radial-gradient(circle_at_48%_42%,rgba(251,191,36,0.08),rgba(0,0,0,0.68)_44%,rgba(0,0,0,0.98)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.82)_58%,#000000_100%)] sm:bg-[linear-gradient(180deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.82)_68%,#000000_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-6rem)] max-w-[100rem] flex-col justify-end sm:min-h-[calc(100vh-8rem)]">
        <motion.div initial="hidden" animate="visible" variants={reveal} className="max-w-6xl 2xl:max-w-7xl">
          <p className="mb-4 text-[clamp(1.1rem,5.6vw,3.25rem)] font-black uppercase leading-[1.06] tracking-[0.12em] text-amber-400 min-[380px]:mb-5 sm:mb-8">Espoon keskus / walk-in</p>
          <h1 className="font-display max-w-[9.2ch] text-[14vw] font-black uppercase leading-[0.9] tracking-[-0.08em] text-white drop-shadow-[0_20px_70px_rgba(0,0,0,0.75)] sm:text-[72px] lg:text-[127px] 2xl:max-w-[10ch]">
            Espoon keskuksen luottoparturi miehille.
          </h1>
          <p className="mt-5 max-w-2xl text-[0.95rem] font-bold leading-7 text-white/75 min-[380px]:mt-6 min-[380px]:text-base sm:mt-8 sm:text-2xl sm:leading-8 2xl:max-w-3xl">
            Nopea, tarkka ja helposti saavutettava miesten parturi aivan Espoon juna-aseman vieressä — ilman ajanvarausta.
          </p>
          <div className="mt-8 flex items-center gap-3 text-lg font-black text-white min-[380px]:mt-9 min-[380px]:text-xl sm:mt-14 sm:gap-4 sm:text-3xl">
            <span className="relative flex h-3 w-3 min-[380px]:h-3.5 min-[380px]:w-3.5 sm:h-4 sm:w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-400 min-[380px]:h-3.5 min-[380px]:w-3.5 sm:h-4 sm:w-4" />
            </span>
            Walk-in avoinna
          </div>
          <div className="mt-6 grid max-w-3xl gap-3 min-[380px]:mt-7 sm:mt-10 sm:grid-cols-[1.2fr_0.8fr] sm:gap-4 2xl:max-w-4xl">
            <LocationCta source="hero_primary_location" />
            <LocationCta source="hero_secondary_location" label="Katso sijainti" />
          </div>
          <a href={phoneHref} onClick={() => trackPhone("hero_phone_text")} className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-white/65 transition duration-500 luxury-ease hover:text-amber-400 sm:mt-7">
            <Phone className="h-4 w-4 text-amber-400" />
            Soita {phoneDisplay}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
