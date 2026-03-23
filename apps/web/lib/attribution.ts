"use client";

export const ATTRIBUTION_STORAGE_KEY = "goldtrails-attribution";

export type AttributionData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_path: string;
  referrer: string;
  captured_at: string;
};

function sanitize(value: string | null) {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

export function getAttribution(): AttributionData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AttributionData;
    return parsed?.captured_at ? parsed : null;
  } catch {
    return null;
  }
}

export function captureAttributionFromLocation() {
  if (typeof window === "undefined") return;
  const existing = getAttribution();
  if (existing) return;

  const params = new URLSearchParams(window.location.search);
  const attribution: AttributionData = {
    utm_source: sanitize(params.get("utm_source")),
    utm_medium: sanitize(params.get("utm_medium")),
    utm_campaign: sanitize(params.get("utm_campaign")),
    utm_term: sanitize(params.get("utm_term")),
    utm_content: sanitize(params.get("utm_content")),
    landing_path: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer || "direct",
    captured_at: new Date().toISOString(),
  };

  localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
}
