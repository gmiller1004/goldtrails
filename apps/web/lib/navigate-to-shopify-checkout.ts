/**
 * Navigate to Shopify checkout.
 *
 * gpaastore.com sets X-Frame-Options: DENY / frame-ancestors 'none', so
 * navigations from embedded shells surface as ERR_BLOCKED_BY_RESPONSE.
 * Use a new tab when framed; same-tab assign in a normal browser window.
 */
export function navigateToShopifyCheckout(checkoutUrl: string): void {
  if (typeof window === "undefined") return;

  let embedded = false;
  try {
    embedded = window.self !== window.top;
  } catch {
    embedded = true;
  }

  if (embedded) {
    const opened = window.open(checkoutUrl, "_blank", "noopener,noreferrer");
    if (!opened) {
      window.location.assign(checkoutUrl);
    }
    return;
  }

  window.location.assign(checkoutUrl);
}
