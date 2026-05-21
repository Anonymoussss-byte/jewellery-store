"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useCart, type SelectedVariation } from "@/lib/cart-context";
import { formatCurrency, formatRating } from "@/lib/format";
import type { Product } from "@/types/product";

type QuickViewModalProps = {
  product: Product | null;
  onClose: () => void;
};

const getDefaultVariation = (product: Product): SelectedVariation => ({
  metal: product.variations.metals[0] ?? "18k Gold",
  size: product.variations.sizes?.[0],
  gemstone: product.variations.gemstones[0] ?? "Diamond"
});

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addItem, openCart, toggleWishlist, isWishlisted } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [variation, setVariation] = useState<SelectedVariation | null>(null);

  useEffect(() => {
    if (!product) {
      return;
    }

    setActiveImage(0);
    setQuantity(1);
    setVariation(getDefaultVariation(product));
  }, [product]);

  useEffect(() => {
    if (!product) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, product]);

  if (!product || !variation) {
    return null;
  }

  const wishlisted = isWishlisted(product.id);

  const addToBag = () => {
    addItem(product, quantity, variation);
    openCart();
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[75] grid place-items-center overflow-y-auto bg-black/70 p-4 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} quick view`}
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.28 }}
          onClick={(event) => event.stopPropagation()}
          className="luxury-border grid w-full max-w-6xl overflow-hidden rounded-2xl bg-obsidian shadow-2xl lg:grid-cols-[1.08fr_0.92fr]"
        >
          <div className="relative min-h-[28rem] bg-black">
            <Image
              src={product.gallery[activeImage] ?? product.image}
              alt={product.imageAlt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.42))]" />
            <div className="absolute bottom-5 left-5 right-5 flex gap-3 overflow-x-auto">
              {product.gallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={cn(
                    "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border transition",
                    activeImage === index ? "border-gold-200" : "border-white/15"
                  )}
                  aria-label={`View ${product.name} image ${index + 1}`}
                >
                  <Image src={image} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="relative p-6 sm:p-8">
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/12 text-diamond-100 transition hover:border-gold-300/45"
              aria-label="Close quick view"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="pr-12 text-xs uppercase tracking-[0.28em] text-gold-100">
              {product.collection}
            </p>
            <h2 className="font-display mt-3 pr-12 text-4xl leading-tight text-diamond-100 sm:text-5xl">
              {product.name}
            </h2>
            <div className="mt-4 flex items-center gap-2 text-sm text-diamond-200/72">
              <Star className="h-4 w-4 fill-gold-300 text-gold-300" />
              {formatRating(product.rating)} from {product.reviews} private reviews
            </div>
            <p className="mt-6 text-base leading-8 text-diamond-200/70">{product.description}</p>

            <div className="mt-7 space-y-5">
              <OptionGroup
                label="Metal"
                options={product.variations.metals}
                value={variation.metal}
                onChange={(metal) => setVariation((current) => current && { ...current, metal })}
              />
              {product.variations.sizes && (
                <OptionGroup
                  label="Size"
                  options={product.variations.sizes}
                  value={variation.size ?? product.variations.sizes[0]}
                  onChange={(size) => setVariation((current) => current && { ...current, size })}
                />
              )}
              <OptionGroup
                label="Gemstone"
                options={product.variations.gemstones}
                value={variation.gemstone}
                onChange={(gemstone) =>
                  setVariation((current) => current && { ...current, gemstone })
                }
              />
            </div>

            <ul className="mt-7 grid gap-2 text-sm text-diamond-200/68">
              {product.details.map((detail) => (
                <li key={detail} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-300 shadow-glow" />
                  {detail}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-diamond-300/58">Price</p>
                <p className="font-display mt-1 text-4xl text-gold-100">
                  {formatCurrency(product.price)}
                </p>
              </div>
              <div className="inline-flex w-fit items-center rounded-full border border-white/12 bg-black/35">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  className="grid h-11 w-11 place-items-center text-diamond-100 transition hover:text-gold-100"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="grid h-11 min-w-10 place-items-center text-sm text-diamond-100">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.min(9, current + 1))}
                  className="grid h-11 w-11 place-items-center text-diamond-100 transition hover:text-gold-100"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={addToBag}
                className="shine-sweep inline-flex min-h-12 flex-1 items-center justify-center gap-3 rounded-full bg-gold-200 px-6 text-xs font-semibold uppercase tracking-[0.18em] text-black shadow-glow transition hover:bg-gold-100"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Bag
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={cn(
                  "inline-flex min-h-12 items-center justify-center rounded-full border px-6 text-xs font-semibold uppercase tracking-[0.18em] transition",
                  wishlisted
                    ? "border-ruby text-ruby"
                    : "border-white/15 text-diamond-100 hover:border-gold-300/45"
                )}
              >
                {wishlisted ? "Wishlisted" : "Wishlist"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function OptionGroup({
  label,
  options,
  value,
  onChange
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-diamond-300/58">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition",
              value === option
                ? "border-gold-200 bg-gold-200 text-black"
                : "border-white/12 text-diamond-200/72 hover:border-gold-300/45 hover:text-gold-100"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
