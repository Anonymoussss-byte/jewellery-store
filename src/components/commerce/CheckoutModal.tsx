"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CreditCard, Loader2, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/format";

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  totals: { total: number };
  onSuccess: () => void;
};

export function CheckoutModal({ isOpen, onClose, totals, onSuccess }: CheckoutModalProps) {
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const limitedValue = value.substring(0, 16);
    setCardNumber(limitedValue.replace(/(\d{4})(?=\d)/g, "$1 "));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const limitedValue = value.substring(0, 4);
    if (limitedValue.length >= 3) {
      setExpiry(`${limitedValue.substring(0, 2)}/${limitedValue.substring(2)}`);
    } else {
      setExpiry(limitedValue);
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvc(e.target.value.replace(/\D/g, "").substring(0, 4));
  };

  useEffect(() => {
    if (isOpen) {
      setStep("form");
      setCardNumber("");
      setExpiry("");
      setCvc("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && step !== "processing") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, step]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    
    // Simulate API call
    setTimeout(() => {
      setStep("success");
    }, 2500);
  };

  const handleFinish = () => {
    onSuccess();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/80 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => step !== "processing" && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-gold-300/10 bg-obsidian shadow-[0_0_80px_rgba(215,166,61,0.08)]"
          >
            {step === "form" && (
              <div className="p-6 sm:p-8">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-3xl text-diamond-100">Secure Payment</h2>
                    <p className="mt-2 text-sm text-diamond-300/60 flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-gold-200" />
                      End-to-end encrypted concierge checkout
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="grid h-10 w-10 place-items-center rounded-full text-diamond-100 transition hover:bg-white/5 hover:text-gold-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-diamond-300/60">
                      Cardholder Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Name on card"
                      className="min-h-12 w-full rounded-xl bg-black/40 px-4 text-sm text-diamond-100 placeholder:text-diamond-300/30 focus:outline-none focus:ring-1 focus:ring-gold-300/50"
                    />
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-diamond-300/60">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-diamond-300/40" />
                      <input
                        required
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        className="min-h-12 w-full rounded-xl bg-black/40 pl-11 pr-4 text-sm text-diamond-100 placeholder:text-diamond-300/30 focus:outline-none focus:ring-1 focus:ring-gold-300/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-diamond-300/60">
                        Expiry Date
                      </label>
                      <input
                        required
                        type="text"
                        value={expiry}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="min-h-12 w-full rounded-xl bg-black/40 px-4 text-sm text-diamond-100 placeholder:text-diamond-300/30 focus:outline-none focus:ring-1 focus:ring-gold-300/50"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-diamond-300/60">
                        Security Code
                      </label>
                      <input
                        required
                        type="password"
                        value={cvc}
                        onChange={handleCvcChange}
                        placeholder="CVC"
                        maxLength={4}
                        className="min-h-12 w-full rounded-xl bg-black/40 px-4 text-sm tracking-widest text-diamond-100 placeholder:text-diamond-300/30 focus:outline-none focus:ring-1 focus:ring-gold-300/50"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="shine-sweep mt-6 w-full rounded-full bg-gold-200 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-gold-100"
                  >
                    Pay {formatCurrency(totals.total)}
                  </button>
                </form>
              </div>
            )}

            {step === "processing" && (
              <div className="grid min-h-[400px] place-items-center p-8 text-center">
                <div className="flex flex-col items-center">
                  <Loader2 className="mb-6 h-12 w-12 animate-spin text-gold-200" />
                  <h3 className="font-display text-2xl text-diamond-100">Processing Payment</h3>
                  <p className="mt-3 text-sm text-diamond-300/60">
                    Securing your luxury piece... Please do not close this window.
                  </p>
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="grid min-h-[400px] place-items-center p-8 text-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <div className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-gold-300/10">
                    <CheckCircle2 className="h-10 w-10 text-gold-200" />
                  </div>
                  <h3 className="font-display text-3xl text-diamond-100">Order Confirmed</h3>
                  <p className="mt-4 max-w-xs text-sm leading-relaxed text-diamond-300/70">
                    Your exclusive piece has been secured. A concierge will contact you shortly regarding delivery arrangements.
                  </p>
                  <button
                    type="button"
                    onClick={handleFinish}
                    className="mt-8 rounded-full border border-gold-300/30 bg-white/5 px-8 py-3 text-xs uppercase tracking-[0.15em] text-gold-100 transition hover:bg-gold-300/10"
                  >
                    Return to Store
                  </button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
