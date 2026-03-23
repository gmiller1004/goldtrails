import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { AttributionBootstrap } from "@/components/analytics/attribution-bootstrap";
import { MobileMasterclassCta } from "@/components/mobile-masterclass-cta";
import { CartProvider } from "@/components/cart/cart-provider";
import { Toaster } from "@/components/ui/toaster";
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
  title: "Gold Trails with Kevin Hoagland – Metal Detecting Masterclass & Events",
  description:
    "Masterclass lessons, events, and resources for metal detecting enthusiasts.",
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
