# Gold Trails Site Roadmap

This roadmap tracks the full build from trust and lead capture through headless storefront conversion.

## Storefront Rule (Important)

- This is a **headless storefront**.
- Users shop and manage cart **on this site**.
- Only when the user clicks checkout from the on-site cart do we redirect to the Shopify store domain.
- No "View on Shopify" product CTAs in primary user flow.

## 1) Shop MVP (Highest Priority)

Status: ✅ Complete

- Build `/shop` with clear sections:
  - Detectors
  - Coils
  - Field Gear / Accessories
- Product cards include:
  - image, title, price, short teaser
  - `Add to Cart` (on-site cart)
- Add "Kevin's Picks" badges for curated products.

## 2) Product Detail Experience

Status: ✅ Complete

- Build `/shop/[handle]` product detail pages:
  - overview, specs, ideal use case
  - "Why Kevin recommends it"
  - add-to-cart + related products
- Add simple comparison blocks for top detector options.

## 3) Lead-to-Shop Bridge

Status: ✅ Complete

- Add upsell blocks on `/thank-you`:
  - "Top picks for beginners"
  - direct add-to-cart paths
- Tie nurture sequence to shop intent:
  - beginner guide -> detector picks -> accessories -> events.

## 4) Trust & Authority Expansion

Status: ✅ Complete

- Build `/about` with Kevin timeline, credentials, and field story.
- Build a full testimonials page and place testimonial modules on key conversion pages.
- Expand trust badges/affiliations and real event/photo assets.

## 5) Navigation & UX Completeness

Status: ✅ Complete

- Final global nav:
  - Home, Masterclass, Events, Shop, About, Cart
- Add sticky mobile CTA for masterclass capture.
- Ensure consistent footer structure and legal/contact links.

## 6) Funnel Analytics

Status: 🟡 In progress

- Track:
  - lead form views/submits/success
  - cart add/remove
  - checkout click
  - event reserve click
  - PDF download
- Persist UTM/source and pass into lead + purchase attribution.

## 7) SEO & Content Engine

Status: 🟡 In progress

- Publish high-intent pages:
  - best detector for beginners
  - ground balancing guide
  - how to find gold nuggets
- Add schema (FAQ/article) and internal links to Masterclass, Events, Shop.

## Immediate Build Sequence

1. `/shop` + on-site cart
2. `/cart` + checkout redirect flow to Shopify domain
3. Shop upsell module on `/thank-you`
4. Basic analytics hooks for funnel events

## Remaining Items

- Finalize analytics coverage for all CTA surfaces (`guide_cta_click` now wired).
- Add JSON-LD schema to guide pages (FAQ or Article) for richer SEO.
- Optional: place `MediaTrust` on `/masterclass` and `/shop`.
