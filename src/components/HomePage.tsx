"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AboutBrand } from "@/components/sections/AboutBrand";
import { Categories } from "@/components/sections/Categories";
import { FeaturedCollection } from "@/components/sections/FeaturedCollection";
import { Hero } from "@/components/sections/Hero";
import { Showcase } from "@/components/sections/Showcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { CartProvider } from "@/lib/cart-context";
import type { Product, ProductCategory } from "@/types/product";

const AmbientStage = dynamic(() => import("@/components/effects/AmbientStage"), {
  ssr: false
});

const BootIntro = dynamic(() => import("@/components/effects/BootIntro"), {
  ssr: false
});

const MotionOrchestrator = dynamic(() => import("@/components/effects/MotionOrchestrator"), {
  ssr: false
});

const CartDrawer = dynamic(
  () => import("@/components/commerce/CartDrawer").then((module) => module.CartDrawer),
  { ssr: false }
);

const QuickViewModal = dynamic(
  () => import("@/components/commerce/QuickViewModal").then((module) => module.QuickViewModal),
  { ssr: false }
);

export function HomePage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <CartProvider>
      <AmbientStage />
      <MotionOrchestrator />
      <BootIntro />
      <Header />
      <main className="relative z-10">
        <Hero onQuickView={setQuickViewProduct} />
        <FeaturedCollection
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onQuickView={setQuickViewProduct}
        />
        <Categories activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
        <Showcase onQuickView={setQuickViewProduct} />
        <Testimonials />
        <AboutBrand />
      </main>
      <SiteFooter />
      <CartDrawer />
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </CartProvider>
  );
}
