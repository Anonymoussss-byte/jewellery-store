export type ProductCategory =
  | "rings"
  | "necklaces"
  | "earrings"
  | "bracelets"
  | "watches"
  | "diamonds";

export type ProductVariation = {
  metals: string[];
  sizes?: string[];
  gemstones: string[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  collection: string;
  price: number;
  rating: number;
  reviews: number;
  badge: string;
  image: string;
  gallery: string[];
  imageAlt: string;
  description: string;
  details: string[];
  variations: ProductVariation;
};

export type CategoryCard = {
  id: ProductCategory;
  label: string;
  description: string;
  image: string;
  count: number;
};
