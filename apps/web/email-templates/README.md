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
| `events-notify-welcome.html` | You're on the list for Gold Trails field training |
| `certification-quiz-week-1-pass.html` | Nice work — you passed Week 1 |
| `certification-quiz-week-2-pass.html` | Week 2 quiz cleared — {{ person.quiz_week_2_score_percent }}% |
| `certification-quiz-week-3-pass.html` | Week 3 complete — {{ person.quiz_week_3_score_percent }}% in the field |
| `certification-quiz-week-4-pass.html` | All four weekly quizzes done — {{ person.quiz_week_4_score_percent }}% |
| `certification-quiz-final-pass.html` | You passed the final — claim your certificate & hat |

## Other email (not in this folder)

| Use | Location |
|-----|----------|
| Contact form (SendGrid) | `lib/contact-email.ts` |
| Masterclass lead notify (SendGrid, off) | `lib/masterclass-lead-email.ts` |

## Events notify list (`/events` page)

Signups post to `/api/subscribe/events` when `KLAVIYO_API_KEY` and `KLAVIYO_EVENTS_LIST_ID` are set.

**Recommended Klaviyo setup**

1. Create list: `Gold Trails — Events notify` (dedicated list; do not reuse the masterclass list).
2. Set `KLAVIYO_EVENTS_LIST_ID` in `.env.local` / Vercel.
3. Flow trigger (pick one or combine with AND):
   - **When someone is added to list:** `Gold Trails — Events notify`
   - **OR** when profile is tagged: `gold-trails-events-notify`
4. Segment filter (optional): profile property `gold_trails_events_notify` equals `true`.

**Profile fields set on subscribe**

| Field | Value |
|-------|--------|
| `gold_trails_events_notify` | `true` |
| `events_signup_source` | `goldtrails_events_page` |
| `events_signup_at` | ISO timestamp |
| Tag | `gold-trails-events-notify` (requires `tags:write` on API key) |

UTM / landing attribution is stored on `events_*` properties when available from the browser session.

### Events notify flow — step 1 (Day 0)

| Step | Day | Subject line | File |
|------|-----|--------------|------|
| 1 | 0 | You're on the list for Gold Trails field training | `events-notify-welcome.html` |

Paste `events-notify-welcome.html` into the first email action in your events-notify flow. Set subject and preview text from the HTML comment at the top of the file.

**Suggested follow-up steps** (build in Klaviyo as you add them):

| Step | Day | Idea |
|------|-----|------|
| 2 | 3–7 | Reminder when a session is open / low seats (manual or triggered) |
| 3 | — | New session announcement (triggered when you add Shopify events) |

## Certification list (`/new-home` page)

Signups post to `/api/subscribe/certification` when `KLAVIYO_API_KEY`, `KLAVIYO_CERTIFICATION_LIST_ID`, and `DATABASE_URL` are set.

**Recommended Klaviyo setup**

1. Create list: `Gold Trails — Certification` (dedicated list for the 12-lesson flow).
2. Set `KLAVIYO_CERTIFICATION_LIST_ID` in `.env.local` / Vercel.
3. Flow trigger: **When someone is added to list** `Gold Trails — Certification`.
4. Run Neon migrations:
   - `db/migrations/002_certification_enrollments.sql`
   - `db/migrations/003_certification_quiz_attempts.sql`

**Profile fields set on subscribe**

| Field | Value |
|-------|--------|
| `certification_enrolled` | `true` |
| `metal_detecting_certification` | `true` |
| `certification_token` | Opaque token for quiz magic links |
| `certification_signup_source` | `goldtrails_new_home` |
| `certification_enrolled_at` | ISO timestamp |
| Tag | `metal-detecting-certification` |

**Profile fields set when a quiz is passed** (sticky — failed retakes do not clear a pass)

| Field | Example |
|-------|---------|
| `quiz_week_1_passed` | `true` |
| `quiz_week_1_score_percent` | `83` |
| `quiz_week_1_passed_at` | ISO timestamp |
| `quiz_final_passed` | `true` (after final) |
| `certification_weekly_quizzes_passed` | `true` when weeks 1–4 all passed |
| `certification_quizzes_complete` / `certification_eligible` | `true` when weeks + final passed |

Also updated on every attempt: `quiz_*_last_score_percent`, `quiz_*_last_attempt_at`.

**Quiz button URL pattern (emails 3 / 6 / 9 / 12)**

```html
https://goldtrails.gold/certification/quiz/week-1?token={{ person.certification_token|urlencode }}
https://goldtrails.gold/certification/quiz/week-2?token={{ person.certification_token|urlencode }}
https://goldtrails.gold/certification/quiz/week-3?token={{ person.certification_token|urlencode }}
https://goldtrails.gold/certification/quiz/week-4?token={{ person.certification_token|urlencode }}
https://goldtrails.gold/certification/quiz/final?token={{ person.certification_token|urlencode }}
```

Quiz pages require a valid `token` query param matching Neon `certification_enrollments.access_token`.

### Quiz success emails (after each weekly pass)

Place each after **Wait until** `quiz_week_N_passed` equals true, then continue to the next lesson email.

| Week | Wait condition | Subject | File | Score merge field |
|------|----------------|---------|------|-------------------|
| 1 | `quiz_week_1_passed` | Nice work — you passed Week 1 | `certification-quiz-week-1-pass.html` | `{{ person.quiz_week_1_score_percent }}` |
| 2 | `quiz_week_2_passed` | Week 2 quiz cleared — {{ person.quiz_week_2_score_percent }}% | `certification-quiz-week-2-pass.html` | `{{ person.quiz_week_2_score_percent }}` |
| 3 | `quiz_week_3_passed` | Week 3 complete — {{ person.quiz_week_3_score_percent }}% in the field | `certification-quiz-week-3-pass.html` | `{{ person.quiz_week_3_score_percent }}` |
| 4 | `quiz_week_4_passed` | All four weekly quizzes done — {{ person.quiz_week_4_score_percent }}% | `certification-quiz-week-4-pass.html` | `{{ person.quiz_week_4_score_percent }}` (+ final quiz CTA) |

Shared merge fields: `{{ first_name|default:'Friend' }}`, `{% unsubscribe_link %}`.

Score properties are numbers (e.g. `83`) — templates append `%`.

### Final quiz success + reward claim

| Trigger | Subject | File |
|---------|---------|------|
| Wait until `quiz_final_passed` = true | You passed the final — claim your certificate & hat | `certification-quiz-final-pass.html` |

**Claim CTA**

```html
https://goldtrails.gold/certification/claim?token={{ person.certification_token|urlencode }}
```

`/certification/claim` verifies the enrollment token + final quiz pass in Neon, creates a Shopify cart for product `CERTIFICATION_REWARD_PRODUCT_ID` (default `10775411458358`), applies discount code `GTCertFinalPassed`, prefills email, and redirects to Checkout.

Env (optional overrides): `CERTIFICATION_REWARD_PRODUCT_ID`, `CERTIFICATION_REWARD_DISCOUNT_CODE`.
