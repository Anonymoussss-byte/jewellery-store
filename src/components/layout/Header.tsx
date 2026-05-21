"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gem, Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/cn";

const navItems = [
  { href: "#collection", label: "Collection" },
  { href: "#categories", label: "Categories" },
  { href: "#showcase", label: "High Jewelry" },
  { href: "#atelier", label: "Atelier" },
  { href: "#contact", label: "Concierge" }
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, wishlistCount, openCart } = useCart();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-obsidian/70 backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="group flex items-center gap-3" aria-label="Aurelia Maison home">
          <span className="luxury-border grid h-11 w-11 place-items-center rounded-full bg-black/60 shadow-glow">
            <Gem className="h-5 w-5 text-gold-200 transition group-hover:scale-110" strokeWidth={1.4} />
          </span>
          <span>
            <span className="metallic-text font-display block text-xl uppercase tracking-[0.24em]">
              Aurelia
            </span>
            <span className="block text-[0.62rem] uppercase tracking-[0.34em] text-diamond-300/60">
              Maison
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-[0.22em] text-diamond-200/70 transition hover:text-gold-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-diamond-200/80 transition hover:border-gold-300/50 hover:text-gold-100"
            aria-label="Search the collection"
          >
            <Search className="h-4 w-4" />
          </button>
          <a
            href="#collection"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 text-diamond-200/80 transition hover:border-gold-300/50 hover:text-gold-100"
            aria-label={`${wishlistCount} wishlisted pieces`}
          >
            <Heart className={cn("h-4 w-4", wishlistCount > 0 && "fill-ruby text-ruby")} />
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold-300 px-1 text-[0.6rem] font-semibold text-black">
                {wishlistCount}
              </span>
            )}
          </a>
          <button
            type="button"
            onClick={openCart}
            className="shine-sweep relative inline-flex h-11 items-center gap-2 rounded-full border border-gold-300/35 bg-gold-300/10 px-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-100 shadow-glow transition hover:bg-gold-300/15"
            aria-label={`Open shopping cart with ${cartCount} items`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Bag</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-gold-200 px-1 text-[0.65rem] text-black">
              {cartCount}
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-diamond-100 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-t border-white/10 bg-obsidian/95 px-4 pb-6 pt-2 backdrop-blur-xl md:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-md px-2 py-3 text-sm uppercase tracking-[0.18em] text-diamond-200/80 transition hover:bg-white/5 hover:text-gold-100"
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  openCart();
                  closeMenu();
                }}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-gold-300/35 bg-gold-300/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-100"
              >
                <ShoppingBag className="h-4 w-4" />
                Open Bag ({cartCount})
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
