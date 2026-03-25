import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Ga4PageView } from "@/components/analytics/ga4-pageview";
import { MetaPixelPageView } from "@/components/analytics/meta-pixel-pageview";
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
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const enableMetaPixel = process.env.NODE_ENV === "production" && Boolean(pixelId);
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  const enableGa4 = process.env.NODE_ENV === "production" && Boolean(gaMeasurementId);

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="bg-white text-foreground antialiased min-h-screen flex flex-col">
        <CartProvider>
          {enableGa4 ? (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
                strategy="afterInteractive"
              />
              <Script id="ga4-init" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('js', new Date());
                  gtag('config', '${gaMeasurementId}', { send_page_view: false });
                `}
              </Script>
              <Ga4PageView />
            </>
          ) : null}
          {enableMetaPixel ? (
            <>
              <Script id="meta-pixel" strategy="afterInteractive">
                {`
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${pixelId}');
                `}
              </Script>
              <noscript>
                <img
                  height="1"
                  width="1"
                  style={{ display: "none" }}
                  src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                  alt=""
                />
              </noscript>
              <MetaPixelPageView />
            </>
          ) : null}
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
