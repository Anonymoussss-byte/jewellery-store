"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Gem, ShieldCheck, Sparkles } from "lucide-react";
import { featuredProduct } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types/product";

type HeroProps = {
  onQuickView: (product: Product) => void;
};

export function Hero({ onQuickView }: HeroProps) {
  const { addItem, openCart } = useCart();

  const reserveSignature = () => {
    addItem(featuredProduct);
    openCart();
  };

  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden pt-28">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(0,0,0,0.7),rgba(0,0,0,0.24)_45%,rgba(5,5,5,0.92)_100%)]" />
      <div className="absolute inset-x-0 top-20 -z-10 h-px bg-gold-line opacity-40" />

      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative z-10"
        >
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-gold-300/25 bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.25em] text-gold-100 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            Private high jewelry release
          </div>
          <h1 className="font-display max-w-4xl text-5xl leading-[0.92] text-diamond-100 sm:text-7xl lg:text-8xl">
            Aurelia Maison
          </h1>
          <p className="metallic-text font-display mt-4 max-w-3xl text-3xl leading-tight sm:text-5xl">
            Jewelry engineered for impossible light.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-diamond-200/72 sm:text-lg">
            Discover diamond architecture, luminous gold, and hand-finished atelier pieces
            composed for collectors who notice the smallest reflection.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#collection"
              className="shine-sweep inline-flex items-center justify-center gap-3 rounded-full bg-gold-200 px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-black shadow-glow transition hover:bg-gold-100"
            >
              Explore Collection
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-diamond-200/20 bg-white/5 px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-diamond-100 transition hover:border-gold-300/40 hover:bg-white/10"
            >
              <CalendarDays className="h-4 w-4" />
              Private Appointment
            </a>
          </div>

          <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-y border-white/10 py-5">
            {[
              ["18k", "recycled gold"],
              ["VVS", "stone curation"],
              ["48h", "concierge reply"]
            ].map(([value, label]) => (
              <div key={value}>
                <dt className="font-display text-3xl text-gold-100">{value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.18em] text-diamond-300/58">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotateX: 6 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
          className="relative"
        >
          <div className="absolute -left-8 top-10 z-10 hidden rounded-full border border-gold-300/30 bg-black/45 px-5 py-3 text-xs uppercase tracking-[0.22em] text-gold-100 shadow-glow backdrop-blur-xl sm:block">
            {formatCurrency(featuredProduct.price)}
          </div>

          <div className="luxury-border shine-sweep relative aspect-[0.78] overflow-hidden rounded-[2rem] bg-black shadow-2xl md:aspect-[0.9]">
            <Image
              src={featuredProduct.image}
              alt={featuredProduct.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.48)_72%,rgba(0,0,0,0.88))]" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <div className="glass-panel rounded-2xl p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.28em] text-gold-100">
                    {featuredProduct.collection}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-diamond-200/80">
                    <ShieldCheck className="h-4 w-4 text-emerald" />
                    Certified
                  </span>
                </div>
                <h2 className="font-display text-2xl text-diamond-100 sm:text-3xl">
                  {featuredProduct.name}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-diamond-200/68">
                  {featuredProduct.description}
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => onQuickView(featuredProduct)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-diamond-100 transition hover:border-gold-300/40"
                  >
                    <Gem className="h-4 w-4" />
                    Inspect Piece
                  </button>
                  <button
                    type="button"
                    onClick={reserveSignature}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-200 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-gold-100"
                  >
                    Reserve
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
