const LOGO_URL =
  "https://cdn.shopify.com/s/files/1/2568/9508/files/goldtrailslogo.jpg?v=1774307068";

export type ReviewApprovalEmailInput = {
  reviewerName: string;
  reviewerEmail: string | null;
  rating: number;
  bodyPreview: string;
  approveUrl: string;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildReviewApprovalText(input: ReviewApprovalEmailInput): string {
  return [
    "New masterclass book review — pending approval",
    "",
    `Name: ${input.reviewerName}`,
    `Email: ${input.reviewerEmail ?? "(not provided)"}`,
    `Rating: ${input.rating} / 5`,
    "",
    "Review:",
    input.bodyPreview,
    "",
    "Approve (one-time link):",
    input.approveUrl,
    "",
    "If you did not request this email, ignore it.",
  ].join("\n");
}

export function buildReviewApprovalHtml(input: ReviewApprovalEmailInput): string {
  const name = escapeHtml(input.reviewerName);
  const email = escapeHtml(input.reviewerEmail ?? "(not provided)");
  const preview = escapeHtml(input.bodyPreview);
  const hrefAttr = input.approveUrl.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;padding:0;background:#f5f0e6;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e6;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:600px;background:#fff;border:1px solid #e0d4b3;border-radius:12px;">
        <tr><td style="padding:24px;text-align:center;"><img src="${LOGO_URL}" width="56" alt="" style="display:block;margin:0 auto;"/></td></tr>
        <tr><td style="padding:0 24px 8px;font-family:Georgia,serif;font-size:20px;color:#1a140f;text-align:center;">Review pending approval</td></tr>
        <tr><td style="padding:12px 24px;font-size:13px;color:#6b5e4e;text-align:center;">Masterclass book — Gold Trails</td></tr>
        <tr><td style="padding:16px 24px;font-size:14px;color:#1a140f;">
          <p style="margin:0 0 8px;"><strong>Name</strong> ${name}</p>
          <p style="margin:0 0 8px;"><strong>Email</strong> ${email}</p>
          <p style="margin:0 0 12px;"><strong>Rating</strong> ${input.rating} / 5</p>
          <p style="margin:0 0 8px;color:#6b5e4e;"><strong>Preview</strong></p>
          <p style="margin:0;padding:12px;background:#f5f0e6;border-radius:8px;white-space:pre-wrap;">${preview}</p>
        </td></tr>
        <tr><td style="padding:8px 24px 28px;text-align:center;">
          <a href="${hrefAttr}" style="display:inline-block;background:#1a140f;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;">Approve review</a>
        </td></tr>
        <tr><td style="padding:16px 24px;border-top:1px solid #e0d4b3;font-size:11px;color:#6b5e4e;text-align:center;">One-time link. Gold Trails automated notification.</td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export async function sendReviewApprovalEmail(input: ReviewApprovalEmailInput): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.SENDGRID_FROM_EMAIL;
  const to = process.env.SENDGRID_CONTACT_TO_EMAIL || process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    console.error(
      "[reviews] SendGrid not configured: SENDGRID_API_KEY, SENDGRID_FROM_EMAIL, SENDGRID_CONTACT_TO_EMAIL.",
    );
    throw new Error("Email not configured.");
  }

  const subject = `Approve masterclass review — ${input.reviewerName}`;

  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }], subject }],
      from: { email: from },
      content: [
        { type: "text/plain", value: buildReviewApprovalText(input) },
        { type: "text/html", value: buildReviewApprovalHtml(input) },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`SendGrid error ${res.status}: ${errText.slice(0, 200)}`);
  }
}
