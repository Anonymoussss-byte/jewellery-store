"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Circle, Gem, Sparkles, Watch } from "lucide-react";
import { categories } from "@/data/products";
import { cn } from "@/lib/cn";
import type { ProductCategory } from "@/types/product";

type CategoriesProps = {
  activeCategory: ProductCategory | "all";
  onSelectCategory: (category: ProductCategory | "all") => void;
};

const iconMap = {
  rings: Gem,
  necklaces: Sparkles,
  earrings: Circle,
  bracelets: Circle,
  watches: Watch,
  diamonds: Gem
};

export function Categories({ activeCategory, onSelectCategory }: CategoriesProps) {
  const selectCategory = (category: ProductCategory) => {
    onSelectCategory(category);
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="categories" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gold-line opacity-40" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-100">
              Curated departments
            </p>
            <h2 className="font-display mt-3 max-w-3xl text-4xl leading-tight text-diamond-100 sm:text-6xl">
              Choose the form your light should take.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onSelectCategory("all")}
            className="w-fit rounded-full border border-white/15 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-diamond-100 transition hover:border-gold-300/40"
          >
            Reset All
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = iconMap[category.id];
            const isActive = activeCategory === category.id;

            return (
              <motion.button
                data-reveal
                key={category.id}
                type="button"
                initial={false}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                onClick={() => selectCategory(category.id)}
                className={cn(
                  "luxury-border group relative min-h-[18rem] overflow-hidden rounded-2xl bg-black text-left shadow-2xl",
                  isActive && "shadow-glow"
                )}
              >
                <Image
                  src={category.image}
                  alt={`${category.label} jewelry category`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.82))]" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="mb-5 inline-grid h-11 w-11 place-items-center rounded-full border border-gold-300/30 bg-black/50 text-gold-100 backdrop-blur-md">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <h3 className="font-display text-3xl text-diamond-100">{category.label}</h3>
                      <p className="mt-2 max-w-sm text-sm leading-6 text-diamond-200/68">
                        {category.description}
                      </p>
                    </div>
                    <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-diamond-200/72">
                      {category.count}
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
