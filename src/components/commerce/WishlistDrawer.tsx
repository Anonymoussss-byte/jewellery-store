"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Trash2, X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useCart } from "@/lib/cart-context";
import { formatCurrency } from "@/lib/format";
import { productMap } from "@/data/products";
import type { Product } from "@/types/product";

export function WishlistDrawer() {
  const {
    wishlist,
    wishlistCount,
    isWishlistOpen,
    closeWishlist,
    toggleWishlist,
    addItem,
    openCart
  } = useCart();

  const wishlistProducts = useMemo(() => {
    return wishlist
      .map((id) => productMap.get(id))
      .filter((p): p is Product => Boolean(p));
  }, [wishlist]);

  useEffect(() => {
    if (!isWishlistOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeWishlist();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeWishlist, isWishlistOpen]);

  const moveToCart = (product: Product) => {
    addItem(product);
    toggleWishlist(product.id);
    closeWishlist();
    openCart();
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <motion.div
          className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeWishlist}
          style={{ willChange: "opacity" }}
        >
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Wishlist"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="ml-auto flex h-full w-full max-w-[34rem] flex-col border-l border-gold-300/18 bg-obsidian/96 shadow-2xl backdrop-blur-2xl"
            style={{ willChange: "transform" }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-7">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-ruby">Curated Collection</p>
                <h2 className="font-display mt-1 text-3xl text-diamond-100">
                  {wishlistCount} {wishlistCount === 1 ? "piece" : "pieces"}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeWishlist}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-diamond-100 transition hover:border-gold-300/45"
                aria-label="Close wishlist"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="hide-scrollbar flex-1 overflow-y-auto px-5 py-5 sm:px-7">
              {wishlistProducts.length === 0 ? (
                <div className="grid min-h-[20rem] place-items-center text-center">
                  <div>
                    <Heart className="mx-auto h-12 w-12 text-ruby/70" />
                    <h3 className="font-display mt-5 text-3xl text-diamond-100">No pieces saved yet.</h3>
                    <p className="mt-3 max-w-xs text-sm leading-6 text-diamond-200/60">
                      Heart a piece from the collection to save it for later consideration.
                    </p>
                  </div>
                </div>
              ) : (
                <motion.ul layout className="space-y-4">
                  <AnimatePresence initial={false}>
                    {wishlistProducts.map((product) => (
                      <motion.li
                        layout
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                        key={product.id}
                        className="diamond-panel grid grid-cols-[6.5rem_1fr] gap-4 rounded-2xl p-3"
                      >
                      <div className="relative aspect-square overflow-hidden rounded-xl bg-black">
                        <Image
                          src={product.image}
                          alt={product.imageAlt}
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-display text-xl leading-tight text-diamond-100">
                              {product.name}
                            </h3>
                            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold-100">
                              {product.collection}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleWishlist(product.id)}
                            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-diamond-300/70 transition hover:border-ruby hover:text-ruby"
                            aria-label={`Remove ${product.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <p className="font-display text-xl text-gold-100">
                            {formatCurrency(product.price)}
                          </p>
                          <button
                            type="button"
                            onClick={() => moveToCart(product)}
                            className="rounded-full bg-gold-200 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-black transition hover:bg-gold-100"
                          >
                            Add to bag
                          </button>
                        </div>
                      </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              )}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
