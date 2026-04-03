import type { Metadata } from "next";

/** Short name for Open Graph `siteName` and title template */
export const SITE_NAME = "Gold Trails";

/** Full homepage `<title>` / default Open Graph title */
export const DEFAULT_SITE_TITLE =
  "Gold Trails with Kevin Hoagland – Metal Detecting Masterclass & Events";

export const DEFAULT_SITE_DESCRIPTION =
  "Metal detecting masterclass, Gold Trails field events, and gear from Kevin Hoagland — GPAA leader, Gold Trails TV host, and 55+ years in the field.";

/**
 * Canonical site origin (no trailing slash). Set `NEXT_PUBLIC_SITE_URL` in production
 * (e.g. https://goldtrails.gold) so metadata, sitemap, and JSON-LD use the correct domain.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://goldtrails.gold";
  return raw.replace(/\/$/, "");
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
};

/** Per-route SEO: description, Open Graph, Twitter, canonical URL. */
export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}
