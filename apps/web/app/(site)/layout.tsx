import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

/**
 * Site chrome for every route except `/` (homepage has its own header/footer).
 * Route group `(site)` does not affect URLs.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="bg-white">{children}</div>
      <Footer />
    </>
  );
}
