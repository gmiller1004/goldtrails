# Funnel Events (Gold Trails)

This document defines the baseline funnel events available for reporting.

## Core Events

- `lead_form_view`
- `lead_form_submit`
- `lead_form_success`
- `lead_form_failure`
- `add_to_cart`
- `remove_from_cart`
- `product_detail_click`
- `checkout_click`
- `event_reserve_click`
- `pdf_download_click`
- `guide_cta_click`
- `sticky_mobile_cta_click`
- `home_cta_click`
- `masterclass_cta_click`
- `thank_you_cta_click`
- `contact_form_submit`
- `contact_form_success`
- `contact_form_failure`

## Event Payload Guidance

Use these fields when available:

- `page_path`: current pathname
- `page_type`: `home`, `masterclass`, `guide`, `shop`, `events`, `thank-you`, `contact`
- `cta`: short identifier such as `masterclass`, `shop`, `events`, `gpaa_membership`, `next-guide`
- `guide`: guide slug for guide CTA events
- `source`: CTA location such as `shop-grid`, `thank-you-upsell`, `thank-you-hero`
- `product_id`, `product_title`, `variant_id`, `price` for commerce events
- attribution fields (auto-attached): `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `referrer`, `first_seen_at`

## Reporting Starter Views

- **Lead Funnel**: `lead_form_view` -> `lead_form_submit` -> `lead_form_success`
- **Guide Assist Funnel**: `guide_cta_click` -> destination page session depth -> `lead_form_submit`
- **Page CTA Funnel**: (`home_cta_click` | `masterclass_cta_click` | `thank_you_cta_click`) -> destination conversion
- **Commerce Funnel**: `product_detail_click` -> `add_to_cart` -> `checkout_click`
- **Event Funnel**: `event_reserve_click` -> `checkout_click`
- **Asset Engagement Funnel**: `pdf_download_click` -> `thank_you_cta_click` or `add_to_cart`

## Notes

- Keep naming stable; avoid renaming events once dashboards are in use.
- If a new CTA is added, track it with an existing event name plus a specific `cta` value.

## GA4 Mapping (Starter)

Use these event names directly in GA4. Mark key outcomes as conversions.

### Recommended Conversions

- `lead_form_success`
- `checkout_click`
- `event_reserve_click`

### Recommended Event-Scoped Custom Dimensions

- `cta`
- `guide`
- `source`
- `page_type`
- `product_id`
- `product_title`
- `event_id`
- `event_title`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `referrer`

### Recommended Custom Metrics (Optional)

- `price` (currency value if sent as a numeric parameter)
- `ts` (timestamp, mostly for debugging consistency)

### Quick GA4 Setup Checklist

1. Open GA4 -> Admin -> Custom definitions.
2. Create event-scoped dimensions for the fields above.
3. Create custom metrics for numeric fields you plan to report on.
4. Open GA4 -> Admin -> Events, and mark conversion events.
5. Validate in Realtime and DebugView while clicking key CTAs on:
   - home
   - masterclass
   - guides
   - events
   - thank-you
   - cart

## Looker Studio Dashboard Spec (1-Page)

Use this as a starter blueprint for a weekly growth dashboard.

### Data Source

- GA4 property for `goldtrails.gold`
- Date range default: Last 28 days
- Compare to: Previous period

### Global Filters (top row)

- Date range control
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `page_type`
- Device category

### KPI Row (scorecards)

- Leads: count of `lead_form_success`
- Lead CVR: `lead_form_success / lead_form_view`
- Add-to-cart count: `add_to_cart`
- Checkout clicks: `checkout_click`
- Event reserve clicks: `event_reserve_click`

### Section 1: Lead Funnel

- Funnel chart:
  - `lead_form_view`
  - `lead_form_submit`
  - `lead_form_success`
- Breakdown table by `page_path`:
  - views, submits, successes, view->success CVR

### Section 2: CTA Performance

- Table by `event_name` + `cta` + `source`:
  - event count
  - unique users
  - downstream `lead_form_success` count (same session if modeled)
- Include:
  - `home_cta_click`
  - `masterclass_cta_click`
  - `thank_you_cta_click`
  - `guide_cta_click`
  - `sticky_mobile_cta_click`

### Section 3: Commerce Intent

- Funnel chart:
  - `product_detail_click`
  - `add_to_cart`
  - `checkout_click`
- Table by `product_title`:
  - detail clicks, add-to-cart, checkout clicks

### Section 4: Event Intent

- Time series (daily):
  - `event_reserve_click`
  - `checkout_click`
- Table by `event_title`:
  - reserve clicks

### Section 5: Traffic Quality

- Table by `utm_source / utm_medium / utm_campaign`:
  - users
  - leads (`lead_form_success`)
  - lead CVR
  - checkout clicks

### Naming and Governance

- Keep event names and parameter keys stable.
- Document any new event in this file before release.
- Review outlier events weekly (sudden drops/spikes) to catch tracking regressions.
