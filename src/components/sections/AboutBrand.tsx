"use client";

import { motion } from "framer-motion";
import { Hammer, Landmark, ScanEye, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: ScanEye,
    title: "Stone Curation",
    copy: "Each stone is examined for fire, symmetry, character, and how it behaves under evening light."
  },
  {
    icon: Hammer,
    title: "Atelier Finish",
    copy: "Hand polishing, hidden hinges, and micro-setting work are completed in small dedicated benches."
  },
  {
    icon: ShieldCheck,
    title: "Certified Provenance",
    copy: "Responsible sourcing documentation and valuation records ship with every collector piece."
  }
];

export function AboutBrand() {
  return (
    <section id="atelier" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gold-line opacity-40" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div data-reveal>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold-300/25 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.24em] text-gold-100">
            <Landmark className="h-4 w-4" />
            Founded for collectors
          </div>
          <h2 className="font-display text-4xl leading-tight text-diamond-100 sm:text-6xl">
            The maison exists for restraint, rarity, and impossible finishing.
          </h2>
          <p className="mt-6 text-base leading-8 text-diamond-200/72">
            Aurelia Maison designs fine jewelry around the moment a piece first meets
            light. The work is architectural, but never cold: every clasp, curve, and
            setting is refined until it feels inevitable.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <motion.article
                data-reveal
                key={pillar.title}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="glass-panel rounded-2xl p-6"
              >
                <div className="mb-8 grid h-12 w-12 place-items-center rounded-full border border-gold-300/25 bg-black/35 text-gold-100">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-2xl text-diamond-100">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-7 text-diamond-200/66">{pillar.copy}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
