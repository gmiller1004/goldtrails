/**
 * SendGrid notification body when someone requests the masterclass PDF.
 */

const LOGO_URL =
  "https://cdn.shopify.com/s/files/1/2568/9508/files/goldtrailslogo.jpg?v=1774307068";

export type MasterclassLeadAttribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_path?: string;
  referrer?: string;
  captured_at?: string;
};

export type MasterclassLeadPayload = {
  name?: string;
  email: string;
  attribution?: MasterclassLeadAttribution;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function attributionLines(label: string, attribution?: MasterclassLeadAttribution): string[] {
  if (!attribution) return [`${label}: (none captured)`];
  const rows: string[] = [];
  const add = (k: string, v?: string) => {
    if (v?.trim()) rows.push(`${k}: ${v.trim()}`);
  };
  add("utm_source", attribution.utm_source);
  add("utm_medium", attribution.utm_medium);
  add("utm_campaign", attribution.utm_campaign);
  add("utm_term", attribution.utm_term);
  add("utm_content", attribution.utm_content);
  add("landing_path", attribution.landing_path);
  add("referrer", attribution.referrer);
  add("captured_at", attribution.captured_at);
  return rows.length ? [`${label}:`, ...rows.map((r) => `  ${r}`)] : [`${label}: (none captured)`];
}

export function buildMasterclassLeadText({ name, email, attribution }: MasterclassLeadPayload): string {
  return [
    "New masterclass download — Gold Trails",
    "",
    `Name: ${name?.trim() || "(not provided)"}`,
    `Email: ${email}`,
    "",
    ...attributionLines("Attribution", attribution),
    "",
    "They were added to Mailchimp with tag ebook-masterclass.",
    "Reply directly to this email to reach the subscriber (Reply-To is set to their address).",
  ].join("\n");
}

export function buildMasterclassLeadHtml({ name, email, attribution }: MasterclassLeadPayload): string {
  const nameHtml = escapeHtml(name?.trim() || "(not provided)");
  const emailHtml = escapeHtml(email);
  const emailMailto = encodeURIComponent(email);

  const attrRows: string[] = [];
  if (attribution) {
    const entries: [string, string][] = [
      ["utm_source", attribution.utm_source ?? ""],
      ["utm_medium", attribution.utm_medium ?? ""],
      ["utm_campaign", attribution.utm_campaign ?? ""],
      ["utm_term", attribution.utm_term ?? ""],
      ["utm_content", attribution.utm_content ?? ""],
      ["landing_path", attribution.landing_path ?? ""],
      ["referrer", attribution.referrer ?? ""],
      ["captured_at", attribution.captured_at ?? ""],
    ];
    for (const [key, val] of entries) {
      if (!val.trim()) continue;
      const k = escapeHtml(key);
      const v = escapeHtml(val.trim());
      attrRows.push(
        `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#6b5e4e;width:112px;"><strong>${k}</strong></td><td style="padding:6px 0;vertical-align:top;word-break:break-word;overflow-wrap:anywhere;white-space:normal;">${v}</td></tr>`,
      );
    }
  }
  const attrBlock =
    attrRows.length > 0
      ? attrRows.join("")
      : `<tr><td colspan="2" style="padding:8px 0;font-style:italic;color:#6b5e4e;">No attribution captured</td></tr>`;

  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New masterclass download</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f5f0e6;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f5f0e6; margin:0; padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px; background-color:#ffffff; border:1px solid #e0d4b3; border-radius:12px;">
            <tr>
              <td style="padding:24px 24px 8px 24px; text-align:center;">
                <img src="${LOGO_URL}" alt="Gold Trails logo" width="56" style="display:block;margin:0 auto;width:56px;height:auto;border:0;" />
              </td>
            </tr>
            <tr>
              <td style="padding:8px 24px 0 24px; font-family:Georgia, 'Times New Roman', serif; color:#1a140f; font-size:22px; line-height:1.3; text-align:center;">
                Masterclass PDF download
              </td>
            </tr>
            <tr>
              <td style="padding:12px 24px 0 24px; font-family:Arial, Helvetica, sans-serif; color:#6b5e4e; font-size:13px; line-height:1.5; text-align:center;">
                Someone completed the masterclass signup form and was added to Mailchimp with tag <span style="font-family:monospace;font-size:12px;">ebook-masterclass</span>.
              </td>
            </tr>
            <tr>
              <td style="padding:20px 24px 0 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse; font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#1a140f;">
                  <tr>
                    <td style="padding:8px 12px 8px 0; vertical-align:top; color:#6b5e4e; width:100px;"><strong>Name</strong></td>
                    <td style="padding:8px 0; vertical-align:top;">${nameHtml}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 12px 8px 0; vertical-align:top; color:#6b5e4e;"><strong>Email</strong></td>
                    <td style="padding:8px 0; vertical-align:top;"><a href="mailto:${emailMailto}" style="color:#d4a017;text-decoration:none;font-weight:600;">${emailHtml}</a></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 24px 20px 24px;">
                <p style="margin:0 0 8px 0; font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#6b5e4e;"><strong>Attribution</strong></p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1a140f;table-layout:fixed;">${attrBlock}</table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 24px 24px; border-top:1px solid #e0d4b3; font-family:Arial, Helvetica, sans-serif; color:#6b5e4e; font-size:11px; line-height:1.5; text-align:center;">
                Gold Trails with Kevin Hoagland · Automated notification
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Notify internal inbox via SendGrid. Swallows errors (subscriber flow already succeeded). */
export async function sendMasterclassLeadNotification(payload: MasterclassLeadPayload): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.SENDGRID_FROM_EMAIL;
  const to = process.env.SENDGRID_CONTACT_TO_EMAIL || process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    console.warn(
      "[subscribe] SendGrid masterclass notification skipped: set SENDGRID_API_KEY, SENDGRID_FROM_EMAIL, and SENDGRID_CONTACT_TO_EMAIL.",
    );
    return;
  }

  const namePart = payload.name?.trim() ? ` — ${payload.name.trim()}` : "";
  const subject = `Masterclass download${namePart} (${payload.email})`;
  const textBody = buildMasterclassLeadText(payload);
  const htmlBody = buildMasterclassLeadHtml(payload);

  try {
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }], subject }],
        from: { email: from },
        reply_to: { email: payload.email },
        content: [
          { type: "text/plain", value: textBody },
          { type: "text/html", value: htmlBody },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[subscribe] SendGrid masterclass notification failed:", res.status, errText);
    }
  } catch (error) {
    console.error("[subscribe] SendGrid masterclass notification error:", error);
  }
}
