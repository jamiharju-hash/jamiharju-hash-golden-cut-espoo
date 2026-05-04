import { motion } from "motion/react";
import { beardServices, haircutServices, mapsUrl, reveal } from "../lib/goldenCutConfig";
import { LocationCta, trackMaps } from "./LocationCta";

function ServiceCategory({ title, services }: { title: string; services: Array<{ name: string; desc: string; price: string }> }) {
  return (
    <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
      <h3 className="mb-7 border-b border-white/10 pb-5 font-display text-lg font-black uppercase tracking-[0.14em] text-amber-400 min-[380px]:text-xl sm:mb-8 sm:text-2xl sm:tracking-[0.18em]">{title}</h3>
      <div className="grid gap-7 sm:gap-8">
        {services.map((service) => (
          <a key={service.name} href={mapsUrl} onClick={() => trackMaps(`service_menu_${service.name}`)} className="group block">
            <div className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-4">
              <div className="min-w-0">
                <div className="flex items-start gap-4 sm:items-center">
                  <h4 className="text-lg font-black leading-tight text-white transition duration-500 luxury-ease group-hover:text-amber-400 min-[380px]:text-xl sm:text-2xl">{service.name}</h4>
                  <div className="relative top-[-4px] hidden flex-1 border-b border-dashed border-white/15 sm:block" />
                </div>
                <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-400 sm:text-base">{service.desc}</p>
              </div>
              <div className="shrink-0 text-xl font-black leading-none text-amber-400 min-[380px]:text-2xl">{service.price}</div>
            </div>
          </a>
        ))}
      </div>
    </motion.div>
  );
}

export function ServiceMenu() {
  return (
    <section id="palvelut" className="bg-black px-4 py-20 min-[380px]:px-5 sm:px-6 sm:py-28 lg:px-8 2xl:px-12">
      <div className="mx-auto max-w-4xl 2xl:max-w-5xl">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mb-16 text-center sm:mb-20">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-amber-400">Palvelut</p>
          <h2 className="font-display text-[clamp(2.45rem,11vw,6rem)] font-black uppercase leading-[0.94] tracking-[-0.07em] text-white">Tyylit ja palvelut.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-neutral-400 sm:mt-8 sm:text-lg sm:leading-8">Miesten leikkaukset, fade-tyylit ja partapalvelut selkeällä hinnalla. Katso palvelut ja tule suoraan sisään.</p>
        </motion.div>
        <div className="grid gap-16 sm:gap-20" id="hinnasto">
          <ServiceCategory title="Hiukset" services={haircutServices} />
          <ServiceCategory title="Parta" services={beardServices} />
        </div>
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 text-center sm:mt-20">
          <LocationCta source="services_bottom_location" label="Tule käymään" />
        </motion.div>
      </div>
    </section>
  );
}
