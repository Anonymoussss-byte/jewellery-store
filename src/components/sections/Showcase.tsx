"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Gem, Sparkles } from "lucide-react";
import { featuredProduct } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types/product";

type ShowcaseProps = {
  onQuickView: (product: Product) => void;
};

export function Showcase({ onQuickView }: ShowcaseProps) {
  const { addItem, openCart } = useCart();

  const addFeatured = () => {
    addItem(featuredProduct);
    openCart();
  };

  return (
    <section id="showcase" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
        <div
          data-reveal
          className="luxury-border relative min-h-[34rem] overflow-hidden rounded-[1.75rem] bg-black shadow-2xl"
        >
          <Image
            src={featuredProduct.gallery[1]}
            alt={featuredProduct.imageAlt}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
            data-parallax
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.72),rgba(0,0,0,0.12)_52%,rgba(0,0,0,0.82))]" />
          <div className="absolute left-6 top-6 rounded-full border border-gold-300/25 bg-black/50 px-4 py-2 text-xs uppercase tracking-[0.22em] text-gold-100 backdrop-blur-md">
            High Jewelry Spotlight
          </div>
          <div className="absolute bottom-0 left-0 max-w-xl p-6 sm:p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-gold-100">
              {featuredProduct.collection}
            </p>
            <h2 className="font-display mt-3 text-4xl leading-tight text-diamond-100 sm:text-6xl">
              A collar built like light itself has architecture.
            </h2>
          </div>
        </div>

        <div data-reveal className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-3 rounded-full border border-gold-300/25 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.24em] text-gold-100">
            <Gem className="h-4 w-4" />
            Private atelier
          </div>
          <h3 className="font-display text-4xl leading-tight text-diamond-100 sm:text-6xl">
            {featuredProduct.name}
          </h3>
          <p className="mt-5 text-base leading-8 text-diamond-200/70">
            {featuredProduct.description} Every joint is hidden, every stone is balanced,
            and every reflection is tuned against the skin by master setters.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {featuredProduct.details.map((detail) => (
              <div key={detail} className="diamond-panel rounded-2xl p-4">
                <BadgeCheck className="mb-3 h-5 w-5 text-gold-200" />
                <p className="text-sm leading-6 text-diamond-100/82">{detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => onQuickView(featuredProduct)}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-diamond-100 transition hover:border-gold-300/40"
            >
              <Sparkles className="h-4 w-4" />
              View Details
            </button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={addFeatured}
              className="shine-sweep inline-flex items-center justify-center gap-3 rounded-full bg-gold-200 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-black shadow-glow transition hover:bg-gold-100"
            >
              Reserve {formatCurrency(featuredProduct.price)}
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
