import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { AttributionBootstrap } from "@/components/analytics/attribution-bootstrap";
import { MobileMasterclassCta } from "@/components/mobile-masterclass-cta";
import { CartProvider } from "@/components/cart/cart-provider";
import { Toaster } from "@/components/ui/toaster";
import { DEFAULT_SITE_DESCRIPTION, DEFAULT_SITE_TITLE, getSiteUrl, SITE_NAME } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: DEFAULT_SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_SITE_DESCRIPTION,
  keywords: [
    "metal detecting",
    "gold prospecting",
    "Kevin Hoagland",
    "Gold Trails",
    "GPAA",
    "metal detector training",
    "masterclass",
    "gold nuggets",
  ],
  authors: [{ name: "Kevin Hoagland", url: getSiteUrl() }],
  creator: "Gold Trails",
  publisher: "Gold Trails",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getSiteUrl(),
    siteName: SITE_NAME,
    title: DEFAULT_SITE_TITLE,
    description: DEFAULT_SITE_DESCRIPTION,
    images: [{ url: "/bookcover/uUgPy.jpg", width: 900, height: 1200, alt: "Metal Detecting masterclass ebook cover" }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_SITE_TITLE,
    description: DEFAULT_SITE_DESCRIPTION,
    images: ["/bookcover/uUgPy.jpg"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="bg-white text-foreground antialiased min-h-screen flex flex-col">
        <CartProvider>
          <AttributionBootstrap />
          <Header />
          <main className="flex-1">
            <div className="bg-white">{children}</div>
          </main>
          <Footer />
          <MobileMasterclassCta />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
