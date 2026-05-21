"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import type { ReactNode } from "react";
import { productMap } from "@/data/products";
import { resolveCoupon, type CouponResult } from "@/lib/coupons";
import type { Product } from "@/types/product";

export type SelectedVariation = {
  metal: string;
  size?: string;
  gemstone: string;
};

export type CartLine = {
  lineId: string;
  productId: string;
  quantity: number;
  variation: SelectedVariation;
};

export type HydratedCartLine = CartLine & {
  product: Product;
};

type CartTotals = {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
};

type CartContextValue = {
  lines: HydratedCartLine[];
  wishlist: string[];
  cartCount: number;
  wishlistCount: number;
  totals: CartTotals;
  couponCode: string;
  couponResult: CouponResult;
  isCartOpen: boolean;
  addItem: (product: Product, quantity?: number, variation?: Partial<SelectedVariation>) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  setCouponCode: (code: string) => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  openCart: () => void;
  closeCart: () => void;
};

const STORAGE_KEY = "aurelia-commerce-state-v1";

const CartContext = createContext<CartContextValue | null>(null);

const defaultVariation = (product: Product): SelectedVariation => ({
  metal: product.variations.metals[0] ?? "18k Gold",
  size: product.variations.sizes?.[0],
  gemstone: product.variations.gemstones[0] ?? "Diamond"
});

const lineKey = (productId: string, variation: SelectedVariation) =>
  [productId, variation.metal, variation.size ?? "standard", variation.gemstone].join("__");

const normalizeQuantity = (quantity: number) => Math.max(1, Math.min(9, Math.floor(quantity)));

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved) as {
          lines?: CartLine[];
          wishlist?: string[];
          couponCode?: string;
        };

        setLines(Array.isArray(parsed.lines) ? parsed.lines : []);
        setWishlist(Array.isArray(parsed.wishlist) ? parsed.wishlist : []);
        setCouponCode(typeof parsed.couponCode === "string" ? parsed.couponCode : "");
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHasLoadedStorage(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedStorage) {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        lines,
        wishlist,
        couponCode
      })
    );
  }, [couponCode, hasLoadedStorage, lines, wishlist]);

  const hydratedLines = useMemo<HydratedCartLine[]>(
    () =>
      lines
        .map((line) => {
          const product = productMap.get(line.productId);
          return product ? { ...line, product } : null;
        })
        .filter((line): line is HydratedCartLine => Boolean(line)),
    [lines]
  );

  const subtotal = useMemo(
    () =>
      hydratedLines.reduce(
        (total, line) => total + line.product.price * line.quantity,
        0
      ),
    [hydratedLines]
  );

  const couponResult = useMemo(
    () => resolveCoupon(couponCode, subtotal),
    [couponCode, subtotal]
  );

  const totals = useMemo<CartTotals>(() => {
    const discount = couponResult.isValid ? couponResult.discount : 0;
    const taxable = Math.max(subtotal - discount, 0);
    const shipping = subtotal === 0 || subtotal >= 10000 ? 0 : 95;
    const tax = taxable * 0.045;

    return {
      subtotal,
      discount,
      shipping,
      tax,
      total: taxable + shipping + tax
    };
  }, [couponResult.discount, couponResult.isValid, subtotal]);

  const addItem = useCallback(
    (product: Product, quantity = 1, variation?: Partial<SelectedVariation>) => {
      const selected = {
        ...defaultVariation(product),
        ...variation
      };
      const quantityToAdd = normalizeQuantity(quantity);
      const id = lineKey(product.id, selected);

      setLines((current) => {
        const existing = current.find((line) => line.lineId === id);

        if (existing) {
          return current.map((line) =>
            line.lineId === id
              ? { ...line, quantity: normalizeQuantity(line.quantity + quantityToAdd) }
              : line
          );
        }

        return [
          ...current,
          {
            lineId: id,
            productId: product.id,
            quantity: quantityToAdd,
            variation: selected
          }
        ];
      });
    },
    []
  );

  const removeItem = useCallback((lineId: string) => {
    setLines((current) => current.filter((line) => line.lineId !== lineId));
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    setLines((current) =>
      current.map((line) =>
        line.lineId === lineId ? { ...line, quantity: normalizeQuantity(quantity) } : line
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
    setCouponCode("");
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines: hydratedLines,
      wishlist,
      cartCount: hydratedLines.reduce((count, line) => count + line.quantity, 0),
      wishlistCount: wishlist.length,
      totals,
      couponCode,
      couponResult,
      isCartOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      setCouponCode,
      toggleWishlist,
      isWishlisted,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false)
    }),
    [
      addItem,
      clearCart,
      couponCode,
      couponResult,
      hydratedLines,
      isCartOpen,
      isWishlisted,
      removeItem,
      toggleWishlist,
      totals,
      updateQuantity,
      wishlist
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};
