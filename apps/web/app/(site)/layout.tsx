/**
 * Route group for non-home pages. Site chrome lives in the root layout.
 * Kept so URLs stay stable while pages are organized under `(site)`.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
