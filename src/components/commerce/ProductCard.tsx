"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import { useRef, type PointerEvent } from "react";
import { categoryLabels } from "@/data/products";
import { cn } from "@/lib/cn";
import { useCart } from "@/lib/cart-context";
import { formatCurrency, formatRating } from "@/lib/format";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  index: number;
  onQuickView: (product: Product) => void;
};

export function ProductCard({ product, index, onQuickView }: ProductCardProps) {
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const { addItem, openCart, toggleWishlist, isWishlisted } = useCart();
  const wishlisted = isWishlisted(product.id);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = tiltRef.current;

    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 9;
    const rotateX = ((y / rect.height) - 0.5) * -9;

    element.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0,-5px,0)`;
  };

  const resetTilt = () => {
    if (tiltRef.current) {
      tiltRef.current.style.transform =
        "perspective(1100px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)";
    }
  };

  const addToBag = () => {
    addItem(product);
    openCart();
  };

  return (
    <motion.article
      data-reveal
      initial={false}
      transition={{ delay: index * 0.04 }}
      className="gpu-layer"
    >
      <div
        ref={tiltRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        className="luxury-border group shine-sweep relative h-full overflow-hidden rounded-2xl bg-charcoal/60 transition-transform duration-300 ease-out"
      >
        <div className="relative aspect-[0.82] overflow-hidden bg-black">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.58))]" />
          <div className="absolute left-4 top-4 rounded-full border border-gold-300/25 bg-black/50 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-gold-100 backdrop-blur-md">
            {product.badge}
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.86 }}
            animate={wishlisted ? { scale: [1, 1.25, 1] } : { scale: 1 }}
            onClick={() => toggleWishlist(product.id)}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/45 text-diamond-100 backdrop-blur-md transition hover:border-gold-300/45"
            aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          >
            <Heart className={cn("h-4 w-4", wishlisted && "fill-ruby text-ruby")} />
          </motion.button>
          <div className="absolute bottom-4 left-4 right-4 flex translate-y-4 gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-diamond-100 backdrop-blur-md transition hover:border-gold-300/45"
            >
              <Eye className="h-4 w-4" />
              Quick View
            </button>
            <button
              type="button"
              onClick={addToBag}
              className="grid h-11 w-11 place-items-center rounded-full bg-gold-200 text-black shadow-glow transition hover:bg-gold-100"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingBag className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <div className="flex items-center justify-between gap-3 text-[0.68rem] uppercase tracking-[0.2em] text-diamond-300/58">
              <span>{categoryLabels[product.category]}</span>
              <span>{product.collection}</span>
            </div>
            <h3 className="mt-3 font-display text-2xl leading-tight text-diamond-100">
              {product.name}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-diamond-200/62">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-2xl text-gold-100">
                {formatCurrency(product.price)}
              </p>
              <div className="mt-1 flex items-center gap-1 text-xs text-diamond-200/70">
                <Star className="h-3.5 w-3.5 fill-gold-300 text-gold-300" />
                {formatRating(product.rating)}
                <span className="text-diamond-300/42">({product.reviews})</span>
              </div>
            </div>
            <button
              type="button"
              onClick={addToBag}
              className="rounded-full border border-gold-300/25 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-100 transition hover:border-gold-200 hover:bg-gold-300/10"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
