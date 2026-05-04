import { ArrowRight } from "lucide-react";
import { mapsUrl, type MainCtaLabel } from "../lib/goldenCutConfig";
import { trackEvent } from "../lib/analytics";

export function trackMaps(source: string) {
  trackEvent("click_walk_in_maps", { source });
}

export function trackPhone(source: string) {
  trackEvent("click_phone_call", { source });
}

export function LocationCta({ label = "Tule ilman ajanvarausta", source, className = "" }: { label?: MainCtaLabel; source: string; className?: string }) {
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
