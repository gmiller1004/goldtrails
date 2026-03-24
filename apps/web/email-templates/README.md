# Email templates

| Use | Location |
|-----|----------|
| **Masterclass download** (Mailchimp) | `masterclass-download.html` — uses Mailchimp merge tags like `*\|FNAME\|*`. |
| **Contact form notifications** (SendGrid) | Built in **`lib/contact-email.ts`** (`buildContactNotificationHtml` / `buildContactNotificationText`). The API route `app/api/contact/route.ts` sends these when someone submits `/contact`. Styling matches the site (Gold Trails logo, `#f5f0e6` / `#d4a017` / `#1a140f`). |

To change how contact notifications look, edit `lib/contact-email.ts` and redeploy.
