"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/commerce/ProductCard";
import { categoryLabels, products } from "@/data/products";
import { cn } from "@/lib/cn";
import type { Product, ProductCategory } from "@/types/product";

type FeaturedCollectionProps = {
  activeCategory: ProductCategory | "all";
  onSelectCategory: (category: ProductCategory | "all") => void;
  onQuickView: (product: Product) => void;
};

export function FeaturedCollection({
  activeCategory,
  onSelectCategory,
  onQuickView
}: FeaturedCollectionProps) {
  const visibleProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const filters: Array<{ id: ProductCategory | "all"; label: string }> = [
    { id: "all", label: "All" },
    ...Object.entries(categoryLabels).map(([id, label]) => ({
      id: id as ProductCategory,
      label
    }))
  ];

  return (
    <section id="collection" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div data-reveal>
            <p className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-gold-100">
              <SlidersHorizontal className="h-4 w-4" />
              Featured Jewelry Collection
            </p>
            <h2 className="font-display max-w-3xl text-4xl leading-tight text-diamond-100 sm:text-6xl">
              Objects of light, shaped by hand and finished like sculpture.
            </h2>
          </div>

          <div
            data-reveal
            className="hide-scrollbar flex max-w-full gap-2 overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-1"
            aria-label="Filter featured products"
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => onSelectCategory(filter.id)}
                className={cn(
                  "whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition",
                  activeCategory === filter.id
                    ? "bg-gold-200 text-black shadow-glow"
                    : "text-diamond-200/68 hover:bg-white/[0.07] hover:text-gold-100"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onQuickView={onQuickView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
