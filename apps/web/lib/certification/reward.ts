/** Shopify Admin product ID for the cert + hat reward bundle (reference / docs). */
export const CERTIFICATION_REWARD_PRODUCT_ID =
  process.env.CERTIFICATION_REWARD_PRODUCT_ID?.trim() || "10775411458358";

/**
 * Numeric Online Store variant ID for cart permalinks.
 * Prefer this over Storefront cartCreate for claim (avoids headless checkoutUrl quirks).
 */
export const CERTIFICATION_REWARD_VARIANT_ID =
  process.env.CERTIFICATION_REWARD_VARIANT_ID?.trim() || "54217881256246";

/** Discount code applied via Online Store cart/discount permalink. */
export const CERTIFICATION_REWARD_DISCOUNT_CODE =
  process.env.CERTIFICATION_REWARD_DISCOUNT_CODE?.trim() || "GTCertFinalPassed";

/**
 * Checkout host for Online Store cart permalinks (primary domain).
 * Defaults to gpaastore.com — GraphQL still uses SHOPIFY_STORE_DOMAIN (*.myshopify.com).
 */
export const CERTIFICATION_CHECKOUT_DOMAIN = (
  process.env.SHOPIFY_CHECKOUT_DOMAIN?.trim() || "gpaastore.com"
)
  .replace(/^https?:\/\//i, "")
  .replace(/\/$/, "");

/**
 * Build an Online Store cart permalink with discount.
 * Same family of links as gpaastore.com/discount/...?redirect=/cart/...
 * Requires the variant to be published to the Online Store sales channel.
 */
export function buildCertificationClaimCheckoutUrl(email?: string | null): string {
  const variantId = CERTIFICATION_REWARD_VARIANT_ID.replace(/\D/g, "");
  const code = CERTIFICATION_REWARD_DISCOUNT_CODE;
  const domain = CERTIFICATION_CHECKOUT_DOMAIN;

  // /discount/CODE?redirect=/cart/VARIANT:1 — proven on this shop for promo deep-links
  const redirectPath = `/cart/${variantId}:1`;
  const url = new URL(`https://${domain}/discount/${encodeURIComponent(code)}`);
  url.searchParams.set("redirect", redirectPath);

  // Best-effort email prefill once they reach checkout (ignored if Shopify drops it).
  if (email?.trim()) {
    url.searchParams.set("checkout[email]", email.trim());
  }

  return url.toString();
}
