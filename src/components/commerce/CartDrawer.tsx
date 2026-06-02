"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Minus, Plus, ShieldCheck, ShoppingBag, Tag, Trash2, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/format";
import { CheckoutModal } from "./CheckoutModal";

function CustomDropdown({ options, value, onChange, direction = "down" }: { options: string[], value: string, onChange: (val: string) => void, direction?: "up" | "down" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("relative", isOpen ? "z-50" : "z-10")} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex min-h-11 w-full items-center justify-between rounded-xl px-4 text-sm transition-all",
          isOpen ? "bg-black/60 text-gold-100 shadow-[0_0_0_1px_rgba(215,166,61,0.5)]" : "bg-black/35 text-diamond-100 hover:bg-black/50"
        )}
      >
        {value}
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen ? "rotate-180 text-gold-200" : "text-diamond-300/50")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: direction === "down" ? -8 : 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: direction === "down" ? -8 : 8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute left-0 right-0 z-50 overflow-hidden rounded-xl border border-gold-300/20 bg-obsidian shadow-2xl",
              direction === "down" ? "top-[calc(100%+0.5rem)]" : "bottom-[calc(100%+0.5rem)]"
            )}
            style={{ willChange: "transform, opacity" }}
          >
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => { onChange(option); setIsOpen(false); }}
                className={cn(
                  "w-full px-4 py-3 text-left text-sm transition-colors",
                  value === option ? "bg-gold-300/10 text-gold-100" : "text-diamond-200/70 hover:bg-white/5 hover:text-diamond-100"
                )}
              >
                {option}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CartDrawer() {
  const {
    lines,
    cartCount,
    totals,
    couponCode,
    couponResult,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    setCouponCode,
    clearCart
  } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("Insured overnight");
  const [paymentMethod, setPaymentMethod] = useState("Private card link");

  useEffect(() => {
    if (!isCartOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCart();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeCart, isCartOpen]);

  const submitCheckout = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (lines.length > 0) {
      setIsCheckoutOpen(true);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            style={{ willChange: "opacity" }}
          >
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Shopping cart"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="ml-auto flex h-full w-full max-w-[34rem] flex-col bg-obsidian/96 shadow-2xl backdrop-blur-2xl"
              style={{ willChange: "transform" }}
            >
              <div className="flex items-center justify-between px-5 py-5 sm:px-7">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-gold-100">Aurelia bag</p>
                  <h2 className="font-display mt-1 text-3xl text-diamond-100">
                    {cartCount} {cartCount === 1 ? "piece" : "pieces"}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="grid h-11 w-11 place-items-center rounded-full text-diamond-100 transition hover:bg-white/5 hover:text-gold-200"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="hide-scrollbar flex-1 overflow-y-auto px-5 py-5 sm:px-7">
                {lines.length === 0 ? (
                  <div className="grid min-h-[20rem] place-items-center text-center">
                    <div>
                      <ShoppingBag className="mx-auto h-12 w-12 text-gold-200/70" />
                      <h3 className="font-display mt-5 text-3xl text-diamond-100">Your bag is waiting.</h3>
                      <p className="mt-3 max-w-xs text-sm leading-6 text-diamond-200/60">
                        Add a collector piece to begin a private checkout.
                      </p>
                    </div>
                  </div>
                ) : (
                  <motion.ul layout className="space-y-4">
                    <AnimatePresence initial={false}>
                      {lines.map((line) => (
                        <motion.li
                          layout
                          initial={{ opacity: 0, y: 20, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                          key={line.lineId}
                          className="diamond-panel grid grid-cols-[6.5rem_1fr] gap-4 rounded-2xl p-3"
                        >
                        <div className="relative aspect-square overflow-hidden rounded-xl bg-black">
                          <Image
                            src={line.product.image}
                            alt={line.product.imageAlt}
                            fill
                            sizes="112px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-display text-xl leading-tight text-diamond-100">
                                {line.product.name}
                              </h3>
                              <p className="mt-1 text-xs leading-5 text-diamond-300/58">
                                {line.variation.metal}
                                {line.variation.size ? ` / ${line.variation.size}` : ""} /{" "}
                                {line.variation.gemstone}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(line.lineId)}
                              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-diamond-300/70 transition hover:bg-white/5 hover:text-ruby"
                              aria-label={`Remove ${line.product.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-4 flex items-center justify-between gap-3">
                            <div className="inline-flex items-center rounded-full bg-black/25">
                              <button
                                type="button"
                                onClick={() => updateQuantity(line.lineId, line.quantity - 1)}
                                className="grid h-9 w-9 place-items-center text-diamond-100 transition hover:text-gold-100"
                                aria-label={`Decrease ${line.product.name} quantity`}
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="grid h-9 min-w-8 place-items-center text-sm text-diamond-100">
                                {line.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(line.lineId, line.quantity + 1)}
                                className="grid h-9 w-9 place-items-center text-diamond-100 transition hover:text-gold-100"
                                aria-label={`Increase ${line.product.name} quantity`}
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <p className="font-display text-xl text-gold-100">
                              {formatCurrency(line.product.price * line.quantity)}
                            </p>
                          </div>
                        </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </motion.ul>
                )}

                <div className="mt-6 rounded-2xl bg-white/[0.03] p-4">
                  <label htmlFor="coupon" className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-100">
                    <Tag className="h-4 w-4" />
                    Concierge code
                  </label>
                  <input
                    id="coupon"
                    value={couponCode}
                    onChange={(event) => setCouponCode(event.target.value)}
                    placeholder="AURELIA10"
                    className="mt-3 min-h-12 w-full rounded-full bg-black/35 px-4 text-sm uppercase tracking-[0.16em] text-diamond-100 placeholder:text-diamond-300/35 focus:outline-none focus:ring-1 focus:ring-gold-300/50"
                  />
                  <p
                    className={cn(
                      "mt-3 text-sm",
                      couponCode && couponResult.isValid ? "text-gold-100" : "text-diamond-300/58"
                    )}
                  >
                    {couponCode ? couponResult.message : "Codes: AURELIA10, DIAMOND500, ROYAL15."}
                  </p>
                </div>

                <form onSubmit={submitCheckout} className="mt-6 rounded-2xl bg-white/[0.03] p-4">
                  <p className="mb-4 text-xs uppercase tracking-[0.24em] text-gold-100">
                    Premium checkout
                  </p>
                  <div className="grid gap-3">
                    <CustomDropdown 
                      options={["Insured overnight", "White-glove courier", "Atelier pickup"]} 
                      value={shippingMethod} 
                      onChange={setShippingMethod}
                      direction="up"
                    />
                    <CustomDropdown 
                      options={["Private card link", "Bank wire concierge", "Split deposit"]} 
                      value={paymentMethod} 
                      onChange={setPaymentMethod}
                      direction="up"
                    />
                  </div>
                  <button
                    type="submit"
                    className="shine-sweep mt-4 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-gold-200 px-6 text-xs font-semibold uppercase tracking-[0.18em] text-black shadow-glow transition hover:bg-gold-100"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Secure Checkout
                  </button>
                </form>
              </div>

              <div className="px-5 py-5 sm:px-7 mt-4">
                <div className="space-y-2 text-sm text-diamond-200/72">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(totals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span>-{formatCurrency(totals.discount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insured shipping</span>
                    <span>{totals.shipping === 0 ? "Included" : formatCurrency(totals.shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated tax</span>
                    <span>{formatCurrency(totals.tax)}</span>
                  </div>
                </div>
                <div className="mt-6 flex items-end justify-between pt-4">
                  <span className="text-xs uppercase tracking-[0.24em] text-diamond-300/58">
                    Total
                  </span>
                  <span className="font-display text-3xl text-gold-100">
                    {formatCurrency(totals.total)}
                  </span>
                </div>
                {lines.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="mt-4 w-full rounded-full bg-white/[0.03] px-4 py-3 text-xs uppercase tracking-[0.18em] text-diamond-200/70 transition hover:bg-ruby/10 hover:text-ruby"
                  >
                    Clear Bag
                  </button>
                )}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
      
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        totals={totals}
        onSuccess={() => {
          clearCart();
          closeCart();
        }}
      />
    </>
  );
}
