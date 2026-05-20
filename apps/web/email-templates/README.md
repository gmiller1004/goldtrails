# Email templates (Klaviyo)

HTML files for **one masterclass nurture flow** in Klaviyo. Paste each file into a timed email step. The site posts signups via `/api/subscribe` → Klaviyo when `KLAVIYO_API_KEY` and `KLAVIYO_LIST_ID` are set.

## Business goals (in order of emphasis)

| Goal | URL |
|------|-----|
| **GPAA membership** (north star) | [goldprospectors.org/join](https://www.goldprospectors.org/join) |
| **Property / claims access** | [goldprospectors.org/properties](https://www.goldprospectors.org/properties) |
| **Gold Trails events** | [goldtrails.gold/events](https://goldtrails.gold/events) |
| **Magazine / publications** (same email for all; sign in to catch up) | [goldprospectors.org/publications](https://www.goldprospectors.org/publications) |
| **YouTube** (education, no hard sell) | [youtube.com/@goldprospectors](https://www.youtube.com/@goldprospectors) |
| **Masterclass review** | [goldtrails.gold/review/masterclass](https://goldtrails.gold/review/masterclass) |

Mix **value** emails (tips, YouTube) with **conversion** emails (events, property guide, join). Not every message needs a button or a membership pitch.

## Flow trigger

**When someone is added to list:** `Gold Trails — Masterclass` (dedicated list only for form signups).

- Re-entry: **do not re-enter** (or long cooldown) so resubmits don’t restart the series.
- Optional tag on API subscribe: `ebook-masterclass` (same as Mailchimp today).
- Optional filter later: exclude `gpaa_member` if you sync that from Shopify/GPAA.

## Recommended sequence (~45 days, 10 emails)

Adjust delays in Klaviyo to taste. Days are from list subscribe. **Subject lines** below match the HTML comment at the top of each template (copy into Klaviyo as-is; preview text is in those same comments).

| Step | Day | Subject line | File | Tone | Primary link |
|------|-----|--------------|------|------|----------------|
| 1 | 0 | Your Gold Trails Masterclass Download | `masterclass-download.html` | Deliver value | PDF / EPUB |
| 2 | 3 | A little field time between hunts? | `nurture-youtube-checkin.html` | Soft / edu | YouTube |
| 3 | 10 | Quick favor — how’s the masterclass landing for you? | `masterclass-review-request.html` | Ask (after reading time) | Review page |
| 4 | 11 | One habit that changed my hunts | `nurture-prospecting-tip.html` | Tip only | — |
| 5 | 15 | Ready for hands-on training in the field with me? | `gold-trails-events-invite.html` | Event invite | goldtrails.gold/events |
| 6 | 19 | Prospect tips from Gold Prospectors Magazine | `gpaa-publications-magazine.html` | Magazine (all recipients) | publications (subtle join note below CTA) |
| 7 | 24 | Where can you actually swing a detector on gold ground? | `gpaa-property-guide.html` | Property Guide (all recipients) | properties → login → subtle join |
| 8 | 30 | Ready to hunt real gold-bearing ground with your family? | `gpaa-membership-nonmembers.html` | **Main GPAA ask** | goldprospectors.org/join |
| 9 | 38 | One more rabbit hole for detectorists | `nurture-youtube-followup.html` | Soft / edu | YouTube |
| 10 | 45 | Still planning your next prospecting trip? | `gpaa-membership-reminder.html` | Light second ask | goldprospectors.org/join |

After step 10, move non-converters to a **monthly newsletter** or **sunset** segment — don’t keep hammering join in the same flow.

### Klaviyo build tips

- One flow, **10 email actions**, each with a **time delay** from the previous step (not all from day 0).
- Set subject + preview text from the HTML comment at the top of each file.
- Split test subject lines on step 8 (membership) first — highest impact.
- Verify [join page](https://www.goldprospectors.org/join) pricing in step 8 before launch (template comment references current public pricing).

## Klaviyo personalization

| Purpose | Syntax |
|---------|--------|
| First name | `{{ first_name|default:'Friend' }}` |
| Unsubscribe URL | `{% unsubscribe_link %}` |

## File index

| File | Subject line |
|------|----------------|
| `masterclass-download.html` | Your Gold Trails Masterclass Download |
| `nurture-youtube-checkin.html` | A little field time between hunts? |
| `masterclass-review-request.html` | Quick favor — how’s the masterclass landing for you? |
| `nurture-prospecting-tip.html` | One habit that changed my hunts |
| `gold-trails-events-invite.html` | Ready for hands-on training in the field with me? |
| `gpaa-publications-magazine.html` | Prospect tips from Gold Prospectors Magazine |
| `gpaa-property-guide.html` | Where can you actually swing a detector on gold ground? |
| `gpaa-membership-nonmembers.html` | Ready to hunt real gold-bearing ground with your family? |
| `nurture-youtube-followup.html` | One more rabbit hole for detectorists |
| `gpaa-membership-reminder.html` | Still planning your next prospecting trip? |

## Other email (not in this folder)

| Use | Location |
|-----|----------|
| Contact form (SendGrid) | `lib/contact-email.ts` |
| Masterclass lead notify (SendGrid, off) | `lib/masterclass-lead-email.ts` |
