export type ShopifyProduct = {
  id: string;
  title: string;
  rawTitle: string;
  price: string;
  image: string | null;
  images: string[];
  handle: string;
  description: string;
  tags: string[];
  eventDate?: string | null;
  eventStartDate?: string | null;
  eventEndDate?: string | null;
  eventLocation?: string | null;
  variantId: string | null;
  variantTitle?: string | null;
  availableForSale: boolean;
  variants: Array<{
    id: string;
    title: string;
    price: string;
    availableForSale: boolean;
  }>;
  reserveUrl: string;
};

type ProductNode = {
  id: string;
  title: string;
  handle: string;
  description: string;
  tags: string[];
  featuredImage: {
    url: string;
  } | null;
  images: {
    edges: Array<{
      node: {
        url: string;
      };
    }>;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  metafield: {
    value: string | null;
  } | null;
  startDateMetafield: {
    value: string | null;
  } | null;
  endDateMetafield: {
    value: string | null;
  } | null;
  locationMetafield: {
    value: string | null;
  } | null;
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
};

type ProductsQueryResponse = {
  products: {
    edges: Array<{
      node: ProductNode;
    }>;
  };
};

const PRODUCTS_QUERY = `
  query ProductsByTag($query: String!) {
    products(first: 100, query: $query) {
      edges {
        node {
          id
          title
          handle
          description
          tags
          featuredImage {
            url
          }
          images(first: 12) {
            edges {
              node {
                url
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          metafield(namespace: "custom", key: "event_date") {
            value
          }
          startDateMetafield: metafield(namespace: "custom", key: "start-date") {
            value
          }
          endDateMetafield: metafield(namespace: "custom", key: "end-date") {
            value
          }
          locationMetafield: metafield(namespace: "custom", key: "location") {
            value
          }
          variants(first: 50) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

function getStorefrontConfig() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? "2025-01";

  if (!domain || !token) {
    return null;
  }

  return {
    endpoint: `https://${domain}/api/${apiVersion}/graphql.json`,
    token,
  };
}

async function storefrontRequest<T>(query: string, variables: Record<string, unknown>) {
  const config = getStorefrontConfig();
  if (!config) {
    console.error("Shopify Storefront configuration is missing.");
    return null as T | null;
  }

  try {
    const response = await fetch(config.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": config.token,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Shopify Storefront API request failed.", response.status);
      return null as T | null;
    }

    const payload = (await response.json()) as {
      data?: T;
      errors?: Array<{ message?: string }>;
    };

    if (payload.errors?.length) {
      console.error(
        "Shopify Storefront GraphQL errors:",
        payload.errors.map((err) => err.message).filter(Boolean).join("; "),
      );
      return null as T | null;
    }

    return payload.data ?? null;
  } catch (error) {
    console.error("Shopify request exception:", error);
    return null as T | null;
  }
}

function mapProduct(node: ProductNode): ShopifyProduct {
  const eventStartDate = node.startDateMetafield?.value ?? node.metafield?.value ?? null;
  const eventEndDate = node.endDateMetafield?.value ?? null;
  const isEvent = node.tags.includes("gold-trails-event");
  const variants = node.variants.edges.map((edge) => {
    const variant = edge.node;
    return {
      id: variant.id,
      title: variant.title,
      availableForSale: variant.availableForSale,
      price: `${variant.price.currencyCode} ${Number(variant.price.amount).toFixed(2)}`,
    };
  });
  const defaultVariant = variants.find((variant) => variant.availableForSale) ?? null;
  const { amount, currencyCode } = node.priceRange.minVariantPrice;
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const variantId = defaultVariant?.id ?? null;
  const availableForSale = variants.some((variant) => variant.availableForSale);

  const reserveUrl =
    domain ? `https://${domain}/products/${node.handle}` : `/products/${node.handle}`;

  return {
    id: node.id,
    title: cleanProductTitle(node.title, isEvent),
    rawTitle: node.title,
    price: defaultVariant?.price ?? `${currencyCode} ${Number(amount).toFixed(2)}`,
    image: node.featuredImage?.url ?? null,
    images: node.images.edges.map((edge) => edge.node.url).filter(Boolean),
    handle: node.handle,
    description: node.description,
    tags: node.tags,
    eventDate: node.metafield?.value ?? null,
    eventStartDate,
    eventEndDate,
    eventLocation: node.locationMetafield?.value?.trim() || null,
    variantId,
    variantTitle: defaultVariant?.title ?? null,
    availableForSale,
    variants,
    reserveUrl,
  };
}

function cleanProductTitle(title: string, isEvent: boolean) {
  if (!isEvent) return title;

  const separators = [" | ", " - ", " — ", " – "];
  for (const separator of separators) {
    const idx = title.lastIndexOf(separator);
    if (idx < 0) continue;
    const suffix = title.slice(idx + separator.length).trim();
    if (looksLikeDateSegment(suffix)) {
      return title.slice(0, idx).trim();
    }
  }

  return title.replace(/\s+\((?:\d{1,2}\/\d{1,2}(?:\/\d{2,4})?|[A-Za-z]{3,9}\s+\d{1,2}(?:,\s*\d{4})?)\)$/, "").trim();
}

function looksLikeDateSegment(value: string) {
  if (!value) return false;
  if (/\d{1,2}\/\d{1,2}(?:\/\d{2,4})?/.test(value)) return true;
  if (/\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\b/i.test(value) && /\d/.test(value)) {
    return true;
  }
  if (/\b\d{4}\b/.test(value) && /\d{1,2}/.test(value)) return true;
  return false;
}

type CartCreateResponse = {
  cartCreate: {
    cart: {
      checkoutUrl: string;
    } | null;
    userErrors: Array<{
      field?: string[];
      message: string;
    }>;
  };
};

const CART_CREATE_MUTATION = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function createCheckoutUrl(
  lines: Array<{ variantId: string; quantity: number }>,
): Promise<string | null> {
  const data = await storefrontRequest<CartCreateResponse>(CART_CREATE_MUTATION, {
    input: {
      lines: lines.map((line) => ({
        merchandiseId: line.variantId,
        quantity: line.quantity,
      })),
    },
  });

  if (!data) return null;

  if (data.cartCreate.userErrors.length) {
    console.error(
      "Shopify cartCreate errors:",
      data.cartCreate.userErrors.map((error) => error.message).join("; "),
    );
    return null;
  }

  return data.cartCreate.cart?.checkoutUrl ?? null;
}

function parseEventDate(node: ProductNode) {
  const rawValue = node.startDateMetafield?.value ?? node.metafield?.value;
  if (!rawValue) {
    return null;
  }

  const parsed = Date.parse(rawValue);
  if (Number.isNaN(parsed)) {
    return null;
  }

  return parsed;
}

export async function getEvents(): Promise<ShopifyProduct[]> {
  const data = await storefrontRequest<ProductsQueryResponse>(PRODUCTS_QUERY, {
    query: "tag:gold-trails-event",
  });

  if (!data) {
    return [];
  }

  const nodes = data.products.edges.map((edge) => edge.node);
  const now = Date.now();

  const sorted = [...nodes].sort((a, b) => {
    const aDate = parseEventDate(a);
    const bDate = parseEventDate(b);

    if (aDate && bDate) {
      const aUpcoming = aDate >= now;
      const bUpcoming = bDate >= now;

      if (aUpcoming && !bUpcoming) return -1;
      if (!aUpcoming && bUpcoming) return 1;
      return aDate - bDate;
    }

    if (aDate && !bDate) return -1;
    if (!aDate && bDate) return 1;
    return a.title.localeCompare(b.title);
  });

  return sorted.map(mapProduct);
}

export async function getDetectors(): Promise<ShopifyProduct[]> {
  const data = await storefrontRequest<ProductsQueryResponse>(PRODUCTS_QUERY, {
    query: "tag:metal-detector OR tag:coil OR tag:field-gear OR tag:detecting-gear",
  });

  if (!data) {
    return [];
  }

  return data.products.edges.map((edge) => edge.node).map(mapProduct);
}

export async function getShopProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const [gear, events] = await Promise.all([getDetectors(), getEvents()]);
  const products = [...gear, ...events];
  return products.find((product) => product.handle === handle) ?? null;
}
