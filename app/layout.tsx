import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import JsonLd from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair-display" });

export const metadata: Metadata = {
  title: {
    default: "ABS Jewellery | Premium Handcrafted Collection",
    template: "%s | ABS Jewellery"
  },
  description: "Discover timeless elegance with ABS Jewellery. Explore our exclusive collection of invisible chains, premium earrings, and handcrafted accessories designed for every occasion.",
  keywords: ["jewellery", "gold", "earrings", "invisible chain", "handcrafted", "premium accessories", "Sofiya Joice", "ABS Jewellery"],
  authors: [{ name: "Sofiya Joice" }],
  creator: "ABS Jewellery",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://absjewellery.online",
    title: "ABS Jewellery | Premium Handcrafted Collection",
    description: "Discover timeless elegance with ABS Jewellery. Explore our exclusive collection of invisible chains, premium earrings, and handcrafted accessories.",
    siteName: "ABS Jewellery",
    images: [
      {
        url: "/hero_bg_new.png", // Assuming this exists or using a default
        width: 1200,
        height: 630,
        alt: "ABS Jewellery Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ABS Jewellery | Premium Handcrafted Collection",
    description: "Discover timeless elegance with ABS Jewellery. Handcrafted invisible chains and premium earrings.",
    images: ["/hero_bg_new.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-black text-white`}>
        <JsonLd />
        <Navbar />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
