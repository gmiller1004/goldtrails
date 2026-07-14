/**
 * Full-page navigate to Shopify checkoutUrl (same pattern as other GPAA headless).
 *
 * Shopify checkout sets X-Frame-Options: DENY / frame-ancestors 'none'. Loading it
 * inside an iframe → ERR_BLOCKED_BY_RESPONSE. Always drive the top browsing context.
 */
export function navigateToShopifyCheckout(checkoutUrl: string): void {
  if (typeof window === "undefined") return;

  try {
    if (window.top && window.top !== window.self) {
      window.top.location.href = checkoutUrl;
      return;
    }
  } catch {
    // Cross-origin parent (e.g. IDE preview) — cannot assign top; open a real tab.
    const opened = window.open(checkoutUrl, "_blank", "noopener,noreferrer");
    if (!opened) {
      window.location.assign(checkoutUrl);
    }
    return;
  }

  window.location.assign(checkoutUrl);
}
