import { Menu, Scissors, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  address,
  email,
  emailHref,
  luxuryEase,
  mapsUrl,
  nav,
  phoneDisplay,
  phoneHref,
} from "../lib/goldenCutConfig";
import { trackMaps, trackPhone } from "./LocationCta";

export function Logo() {
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
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Navigation() {
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
