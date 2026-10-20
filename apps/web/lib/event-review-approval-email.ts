import { escapeHtml, LOGO_URL, sendApprovalEmail } from "@/lib/review-approval-email";

export type EventReviewApprovalEmailInput = {
  reviewerName: string;
  reviewerEmail: string;
  rating: number;
  eventLabel: string;
  title: string | null;
  bodyPreview: string;
  photoUrls: string[];
  photoConsent: boolean;
  approveUrl: string;
};

function buildText(input: EventReviewApprovalEmailInput): string {
  return [
    "New Gold Trails event review — pending approval",
    "",
    `Event: ${input.eventLabel}`,
    `Name: ${input.reviewerName}`,
    `Email: ${input.reviewerEmail}`,
    `Rating: ${input.rating} / 5`,
    input.title ? `Headline: ${input.title}` : null,
    "",
    "Review:",
    input.bodyPreview,
    "",
    input.photoUrls.length
      ? `Photos (${input.photoUrls.length}) — marketing consent: ${input.photoConsent ? "YES" : "NO"}`
      : "Photos: none",
    ...input.photoUrls,
    "",
    "Approve (one-time link):",
    input.approveUrl,
    "",
    "If you did not request this email, ignore it.",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

function buildHtml(input: EventReviewApprovalEmailInput): string {
  const hrefAttr = input.approveUrl.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  const photos = input.photoUrls
    .map((url) => {
      const src = escapeHtml(url);
      return `<a href="${src}" style="display:inline-block;margin:0 6px 6px 0;"><img src="${src}" width="120" height="90" alt="" style="display:block;width:120px;height:90px;object-fit:cover;border-radius:6px;border:1px solid #e0d4b3;"/></a>`;
    })
    .join("");

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;padding:0;background:#f5f0e6;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e6;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:600px;background:#fff;border:1px solid #e0d4b3;border-radius:12px;">
        <tr><td style="padding:24px;text-align:center;"><img src="${LOGO_URL}" width="56" alt="" style="display:block;margin:0 auto;"/></td></tr>
        <tr><td style="padding:0 24px 8px;font-family:Georgia,serif;font-size:20px;color:#1a140f;text-align:center;">Event review pending approval</td></tr>
        <tr><td style="padding:12px 24px;font-size:13px;color:#6b5e4e;text-align:center;">${escapeHtml(input.eventLabel)}</td></tr>
        <tr><td style="padding:16px 24px;font-size:14px;color:#1a140f;">
          <p style="margin:0 0 8px;"><strong>Name</strong> ${escapeHtml(input.reviewerName)}</p>
          <p style="margin:0 0 8px;"><strong>Email</strong> ${escapeHtml(input.reviewerEmail)}</p>
          <p style="margin:0 0 12px;"><strong>Rating</strong> ${input.rating} / 5</p>
          ${input.title ? `<p style="margin:0 0 8px;"><strong>Headline</strong> ${escapeHtml(input.title)}</p>` : ""}
          <p style="margin:0 0 8px;color:#6b5e4e;"><strong>Preview</strong></p>
          <p style="margin:0;padding:12px;background:#f5f0e6;border-radius:8px;white-space:pre-wrap;">${escapeHtml(input.bodyPreview)}</p>
          ${
            input.photoUrls.length
              ? `<p style="margin:16px 0 8px;color:#6b5e4e;"><strong>Photos (${input.photoUrls.length})</strong> — marketing consent: <strong style="color:#1a140f;">${input.photoConsent ? "Yes" : "No"}</strong></p><div>${photos}</div>`
              : ""
          }
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

export async function sendEventReviewApprovalEmail(input: EventReviewApprovalEmailInput): Promise<void> {
  await sendApprovalEmail({
    subject: `Approve event review — ${input.reviewerName} (${input.eventLabel})`,
    text: buildText(input),
    html: buildHtml(input),
  });
}
