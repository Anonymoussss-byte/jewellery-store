import type { CategoryCard, Product, ProductCategory } from "@/types/product";

const image = (id: string, width = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=88`;

export const categories: CategoryCard[] = [
  {
    id: "rings",
    label: "Rings",
    description: "Sculptural solitaires, signets, and ceremonial diamond pieces.",
    image: image("photo-1605100804763-247f67b3557e"),
    count: 14
  },
  {
    id: "necklaces",
    label: "Necklaces",
    description: "Riviera necklaces, chokers, collars, and luminous pendants.",
    image: image("photo-1515562141207-7a88fb7ce338"),
    count: 11
  },
  {
    id: "earrings",
    label: "Earrings",
    description: "Diamond drops, pearl signatures, and evening ear sculpture.",
    image: image("photo-1611591437281-460bfbe1220a"),
    count: 18
  },
  {
    id: "bracelets",
    label: "Bracelets",
    description: "Tennis bracelets and atelier links with hidden clasp work.",
    image: image("photo-1617038260897-41a1f14a8ca0"),
    count: 9
  },
  {
    id: "watches",
    label: "Watches",
    description: "Swiss movements wrapped in diamond-set precious metals.",
    image: image("photo-1522312346375-d1a52e2b99b3"),
    count: 7
  },
  {
    id: "diamonds",
    label: "Diamond Collections",
    description: "High jewelry compositions with exceptional stones.",
    image: image("photo-1506630448388-4e683c67ddb0"),
    count: 6
  }
];

export const products: Product[] = [
  {
    id: "aurelia-halo-ring",
    slug: "maison-aurelia-diamond-halo-ring",
    name: "Maison Aurelia Halo Ring",
    category: "rings",
    collection: "Aurelia Signature",
    price: 8950,
    rating: 4.9,
    reviews: 142,
    badge: "Bestseller",
    image: image("photo-1605100804763-247f67b3557e"),
    gallery: [
      image("photo-1605100804763-247f67b3557e", 1600),
      image("photo-1589674781759-c21c37956a44", 1600),
      image("photo-1599643478518-a784e5dc4c8f", 1600)
    ],
    imageAlt: "Diamond halo ring set in polished gold on a dark velvet surface",
    description:
      "A brilliant-cut center diamond wrapped in a micro-pave halo, hand finished in polished 18k gold.",
    details: ["1.42 ct center stone", "18k recycled gold", "Hand-set micro-pave halo"],
    variations: {
      metals: ["18k Yellow Gold", "Platinum", "18k Rose Gold"],
      sizes: ["5", "6", "7", "8"],
      gemstones: ["Natural Diamond", "Lab Diamond"]
    }
  },
  {
    id: "celeste-riviera-necklace",
    slug: "celeste-sapphire-riviera-necklace",
    name: "Celeste Sapphire Riviera",
    category: "necklaces",
    collection: "Celeste",
    price: 14800,
    rating: 4.8,
    reviews: 88,
    badge: "New Season",
    image: image("photo-1515562141207-7a88fb7ce338"),
    gallery: [
      image("photo-1515562141207-7a88fb7ce338", 1600),
      image("photo-1602173574767-37ac01994b2a", 1600),
      image("photo-1611652022419-a9419f74343d", 1600)
    ],
    imageAlt: "Luxury sapphire and diamond necklace with reflective highlights",
    description:
      "Graduated sapphires and diamond stations create a midnight blue river of light around the collarbone.",
    details: ["7.6 ct sapphires", "Diamond station clasp", "Adjustable 15-17 inch length"],
    variations: {
      metals: ["Platinum", "18k White Gold"],
      gemstones: ["Blue Sapphire", "Tanzanite", "Diamond Only"]
    }
  },
  {
    id: "etoile-pear-earrings",
    slug: "etoile-pear-diamond-earrings",
    name: "Etoile Pear Diamond Drops",
    category: "earrings",
    collection: "Etoile",
    price: 6400,
    rating: 4.7,
    reviews: 119,
    badge: "Atelier Favorite",
    image: image("photo-1611591437281-460bfbe1220a"),
    gallery: [
      image("photo-1611591437281-460bfbe1220a", 1600),
      image("photo-1601121141461-9d6647bca1ed", 1600),
      image("photo-1573408301185-9146fe634ad0", 1600)
    ],
    imageAlt: "Pear-shaped diamond earrings arranged on a black jewelry tray",
    description:
      "A floating pear silhouette with hidden hinge movement, calibrated to catch light from every angle.",
    details: ["2.10 tcw diamonds", "Hidden comfort hinge", "Mirror-polished basket setting"],
    variations: {
      metals: ["18k White Gold", "Platinum", "18k Yellow Gold"],
      gemstones: ["Natural Diamond", "Lab Diamond", "White Sapphire"]
    }
  },
  {
    id: "seraphina-tennis-bracelet",
    slug: "seraphina-diamond-tennis-bracelet",
    name: "Seraphina Tennis Bracelet",
    category: "bracelets",
    collection: "Seraphina",
    price: 12200,
    rating: 5,
    reviews: 73,
    badge: "Limited",
    image: image("photo-1617038260897-41a1f14a8ca0"),
    gallery: [
      image("photo-1617038260897-41a1f14a8ca0", 1600),
      image("photo-1602751584552-8ba73aad10e1", 1600),
      image("photo-1543294001-f7cd5d7fb516", 1600)
    ],
    imageAlt: "Diamond tennis bracelet with high polish links on charcoal silk",
    description:
      "A low-profile line bracelet with individually articulated diamond settings and a concealed double lock.",
    details: ["5.20 tcw diamonds", "Concealed safety clasp", "Made to measure"],
    variations: {
      metals: ["Platinum", "18k White Gold", "18k Yellow Gold"],
      sizes: ["6.25 in", "6.75 in", "7.25 in"],
      gemstones: ["Natural Diamond", "Lab Diamond"]
    }
  },
  {
    id: "regent-moonphase-watch",
    slug: "regent-moonphase-diamond-watch",
    name: "Regent Moonphase Watch",
    category: "watches",
    collection: "Regent",
    price: 22000,
    rating: 4.9,
    reviews: 51,
    badge: "Swiss Made",
    image: image("photo-1522312346375-d1a52e2b99b3"),
    gallery: [
      image("photo-1522312346375-d1a52e2b99b3", 1600),
      image("photo-1523170335258-f5ed11844a49", 1600),
      image("photo-1547996160-81dfa63595aa", 1600)
    ],
    imageAlt: "Luxury moonphase watch with a polished case and dark strap",
    description:
      "A diamond-set moonphase timepiece with a hand-finished automatic movement and exhibition caseback.",
    details: ["Automatic caliber", "Diamond bezel", "Alligator strap with deployant clasp"],
    variations: {
      metals: ["18k Rose Gold", "Platinum", "18k Yellow Gold"],
      sizes: ["34 mm", "38 mm", "41 mm"],
      gemstones: ["Diamond Bezel", "Plain Bezel"]
    }
  },
  {
    id: "aurora-high-jewelry-collar",
    slug: "aurora-high-jewelry-diamond-collar",
    name: "Aurora High Jewelry Collar",
    category: "diamonds",
    collection: "Aurora",
    price: 38500,
    rating: 5,
    reviews: 24,
    badge: "High Jewelry",
    image: image("photo-1506630448388-4e683c67ddb0"),
    gallery: [
      image("photo-1506630448388-4e683c67ddb0", 1600),
      image("photo-1602173574767-37ac01994b2a", 1600),
      image("photo-1611652022419-a9419f74343d", 1600)
    ],
    imageAlt: "High jewelry diamond collar with prism reflections",
    description:
      "A sculptural collar designed around exceptional stones, built with flexible invisible architecture.",
    details: ["12.8 tcw diamonds", "Invisible hinge architecture", "Private atelier certificate"],
    variations: {
      metals: ["Platinum", "18k White Gold"],
      gemstones: ["Natural Diamond", "Yellow Diamond", "Diamond and Sapphire"]
    }
  },
  {
    id: "solstice-emerald-signet",
    slug: "solstice-emerald-signet-ring",
    name: "Solstice Emerald Signet",
    category: "rings",
    collection: "Solstice",
    price: 7200,
    rating: 4.8,
    reviews: 67,
    badge: "Made to Order",
    image: image("photo-1599643478518-a784e5dc4c8f"),
    gallery: [
      image("photo-1599643478518-a784e5dc4c8f", 1600),
      image("photo-1589674781759-c21c37956a44", 1600),
      image("photo-1605100804763-247f67b3557e", 1600)
    ],
    imageAlt: "Emerald signet ring with engraved gold shoulder details",
    description:
      "A luminous emerald cabochon set flush into a softened signet form with engraved sunburst shoulders.",
    details: ["2.4 ct emerald cabochon", "Hand engraving", "Low-profile comfort fit"],
    variations: {
      metals: ["18k Yellow Gold", "18k Rose Gold"],
      sizes: ["6", "7", "8", "9"],
      gemstones: ["Emerald", "Onyx", "Diamond Pave"]
    }
  },
  {
    id: "opaline-pearl-drops",
    slug: "opaline-pearl-diamond-drop-earrings",
    name: "Opaline Pearl Diamond Drops",
    category: "earrings",
    collection: "Opaline",
    price: 5100,
    rating: 4.7,
    reviews: 96,
    badge: "Evening",
    image: image("photo-1601121141461-9d6647bca1ed"),
    gallery: [
      image("photo-1601121141461-9d6647bca1ed", 1600),
      image("photo-1611591437281-460bfbe1220a", 1600),
      image("photo-1573408301185-9146fe634ad0", 1600)
    ],
    imageAlt: "Pearl and diamond drop earrings glowing against black silk",
    description:
      "South Sea pearl drops suspended from diamond arcs, balanced for a soft gliding movement.",
    details: ["10-11 mm South Sea pearls", "0.62 tcw diamonds", "Convertible drop length"],
    variations: {
      metals: ["18k White Gold", "18k Yellow Gold"],
      gemstones: ["White Pearl", "Golden Pearl", "Diamond Only"]
    }
  }
];

export const productMap = new Map(products.map((product) => [product.id, product]));

export const featuredProduct = products.find(
  (product) => product.id === "aurora-high-jewelry-collar"
) as Product;

export const categoryLabels: Record<ProductCategory, string> = {
  rings: "Rings",
  necklaces: "Necklaces",
  earrings: "Earrings",
  bracelets: "Bracelets",
  watches: "Watches",
  diamonds: "Diamond Collections"
};
