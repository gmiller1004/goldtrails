type JudgeMeReview = {
  id: number;
  rating: number;
  title?: string | null;
  body?: string | null;
  reviewer?: {
    name?: string | null;
  } | null;
  product_title?: string | null;
  created_at?: string | null;
  hidden?: boolean;
};

type JudgeMeResponse = {
  reviews?: JudgeMeReview[];
};

type JudgeMeProduct = {
  external_id?: number | string;
  title?: string | null;
};

type JudgeMeProductsResponse = {
  products?: JudgeMeProduct[];
};

export type EventTestimonial = {
  id: number;
  rating: number;
  title: string | null;
  body: string;
  reviewerName: string;
  productTitle: string;
  createdAt: string | null;
};

const PAGE_SIZE = 100;
const MAX_PRODUCT_PAGES = 20;
const MAX_REVIEW_PAGES_PER_PRODUCT = 10;
const EVENT_REVIEW_TITLE_PATTERN = /(gold trails|claim meetup|kevin hoagland)/i;

function getJudgeMeConfig() {
  const apiKey = process.env.JUDGEME_API_KEY;
  const shopDomain = process.env.JUDGEME_SHOP_DOMAIN ?? process.env.SHOPIFY_STORE_DOMAIN;

  if (!apiKey || !shopDomain) return null;
  return { apiKey, shopDomain };
}

function isTargetEventProduct(title?: string | null) {
  if (!title) return false;
  return EVENT_REVIEW_TITLE_PATTERN.test(title);
}

export async function getGoldTrailsTestimonials(): Promise<EventTestimonial[]> {
  const config = getJudgeMeConfig();
  if (!config) {
    console.error("Judge.me config missing: JUDGEME_API_KEY or SHOP domain.");
    return [];
  }

  try {
    const products: JudgeMeProduct[] = [];

    for (let page = 1; page <= MAX_PRODUCT_PAGES; page += 1) {
      const url = new URL("https://judge.me/api/v1/products");
      url.searchParams.set("api_token", config.apiKey);
      url.searchParams.set("shop_domain", config.shopDomain);
      url.searchParams.set("per_page", String(PAGE_SIZE));
      url.searchParams.set("page", String(page));

      const response = await fetch(url.toString(), {
        next: { revalidate: 60 * 30 },
      });

      if (!response.ok) {
        console.error("Judge.me products request failed.", response.status);
        break;
      }

      const payload = (await response.json()) as JudgeMeProductsResponse;
      const pageProducts = payload.products ?? [];

      if (!pageProducts.length) break;
      products.push(...pageProducts);

      if (pageProducts.length < PAGE_SIZE) break;
    }

    const targetExternalIds = Array.from(
      new Set(
        products
          .filter((product) => isTargetEventProduct(product.title))
          .map((product) => String(product.external_id ?? "").trim())
          .filter(Boolean),
      ),
    );

    if (!targetExternalIds.length) {
      return [];
    }

    const collected: JudgeMeReview[] = [];

    for (const productExternalId of targetExternalIds) {
      for (let page = 1; page <= MAX_REVIEW_PAGES_PER_PRODUCT; page += 1) {
        const url = new URL("https://judge.me/api/v1/reviews");
        url.searchParams.set("api_token", config.apiKey);
        url.searchParams.set("shop_domain", config.shopDomain);
        url.searchParams.set("product_external_id", productExternalId);
        url.searchParams.set("per_page", String(PAGE_SIZE));
        url.searchParams.set("page", String(page));

        const response = await fetch(url.toString(), {
          next: { revalidate: 60 * 30 },
        });

        if (!response.ok) {
          console.error("Judge.me reviews request failed.", response.status, productExternalId);
          break;
        }

        const payload = (await response.json()) as JudgeMeResponse;
        const reviews = payload.reviews ?? [];
        if (!reviews.length) break;
        collected.push(...reviews);

        if (reviews.length < PAGE_SIZE) break;
      }
    }

    return Array.from(new Map(collected.map((review) => [review.id, review])).values())
      .filter((review) => (review.rating ?? 0) >= 4)
      .filter((review) => !review.hidden)
      .filter((review) => isTargetEventProduct(review.product_title))
      .map((review) => ({
        id: review.id,
        rating: review.rating,
        title: review.title?.trim() || null,
        body: review.body?.trim() || "",
        reviewerName: review.reviewer?.name?.trim() || "Gold Trails Member",
        productTitle: review.product_title?.trim() || "Gold Trails",
        createdAt: review.created_at ?? null,
      }))
      .filter((review) => review.body.length > 0)
      .sort((a, b) => {
        const aTime = a.createdAt ? Date.parse(a.createdAt) : 0;
        const bTime = b.createdAt ? Date.parse(b.createdAt) : 0;
        return bTime - aTime;
      });
  } catch (error) {
    console.error("Judge.me reviews fetch failed:", error);
    return [];
  }
}

