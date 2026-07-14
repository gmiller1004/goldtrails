/** Shopify Admin product ID for the cert + hat reward bundle. */
export const CERTIFICATION_REWARD_PRODUCT_ID =
  process.env.CERTIFICATION_REWARD_PRODUCT_ID?.trim() || "10775411458358";

/** Discount code applied at cart create for final-pass claim checkout. */
export const CERTIFICATION_REWARD_DISCOUNT_CODE =
  process.env.CERTIFICATION_REWARD_DISCOUNT_CODE?.trim() || "GTCertFinalPassed";
