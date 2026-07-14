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
 *
 * Do not append checkout[email] — Shopify mangles it into an invalid
 * `checkout={"email"=>...}` query and checkout fails with
 * "expected String to be a Hash: checkout".
 */
export function buildCertificationClaimCheckoutUrl(): string {
  const variantId = CERTIFICATION_REWARD_VARIANT_ID.replace(/\D/g, "");
  const code = CERTIFICATION_REWARD_DISCOUNT_CODE;
  const domain = CERTIFICATION_CHECKOUT_DOMAIN;

  // /discount/CODE?redirect=/cart/VARIANT:1 — proven on this shop for promo deep-links
  const url = new URL(`https://${domain}/discount/${encodeURIComponent(code)}`);
  url.searchParams.set("redirect", `/cart/${variantId}:1`);
  return url.toString();
}
