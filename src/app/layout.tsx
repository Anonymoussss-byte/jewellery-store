import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const title = "Aurelia Maison | Ultra Luxury Jewelry";
const description =
  "A cinematic ultra-luxury jewelry ecommerce experience for diamond rings, high jewelry necklaces, watches, bracelets, and private atelier collections.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "Aurelia Maison",
  metadataBase: new URL("https://aurelia-maison.example"),
  keywords: [
    "luxury jewelry",
    "diamond rings",
    "high jewelry",
    "fine watches",
    "gold bracelets",
    "designer necklaces"
  ],
  authors: [{ name: "Aurelia Maison" }],
  creator: "Aurelia Maison",
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Aurelia Maison",
    images: [
      {
        url: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1600&q=88",
        width: 1600,
        height: 1067,
        alt: "Diamond high jewelry with cinematic reflections"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050505",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
