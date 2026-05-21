import { HomePage } from "@/components/HomePage";
import { products } from "@/data/products";

export default function Page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Aurelia Maison",
    image:
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1600&q=88",
    description:
      "Ultra-luxury fine jewelry maison offering diamond rings, high jewelry necklaces, bracelets, earrings, and watches.",
    brand: {
      "@type": "Brand",
      name: "Aurelia Maison"
    },
    makesOffer: products.map((product) => ({
      "@type": "Offer",
      name: product.name,
      price: product.price,
      priceCurrency: "USD",
      itemOffered: {
        "@type": "Product",
        name: product.name,
        image: product.image,
        description: product.description,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviews
        }
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePage />
    </>
  );
}
