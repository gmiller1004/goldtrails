/**
 * Gold Trails–styled HTML + plain text for SendGrid contact form notifications.
 * Source of truth for the HTML layout (table-based, email-client safe).
 */

const LOGO_URL =
  "https://cdn.shopify.com/s/files/1/2568/9508/files/goldtrailslogo.jpg?v=1774307068";

export type ContactEmailPayload = {
  name?: string;
  email: string;
  subject?: string;
  message: string;
};

export function buildContactNotificationText({
  name,
  email,
  subject,
  message,
}: ContactEmailPayload): string {
  return [
    "New message — Gold Trails contact form",
    "",
    `Name: ${name?.trim() || "(not provided)"}`,
    `Email: ${email}`,
    `Subject: ${subject?.trim() || "(none)"}`,
    "",
    "---",
    "",
    message,
    "",
    "---",
    "Reply directly to this email to respond to the visitor (Reply-To is set to their address).",
  ].join("\n");
}

export function buildContactNotificationHtml({
  name,
  email,
  subject,
  message,
}: ContactEmailPayload): string {
  const nameHtml = escapeHtml(name?.trim() || "(not provided)");
  const emailHtml = escapeHtml(email);
  const emailMailto = encodeURIComponent(email);
  const subjectHtml = escapeHtml(subject?.trim() || "(none)");
  const messageHtml = escapeHtml(message);

  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Gold Trails contact message</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f5f0e6;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f5f0e6; margin:0; padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px; background-color:#ffffff; border:1px solid #e0d4b3; border-radius:12px;">
            <tr>
              <td style="padding:24px 24px 8px 24px; text-align:center;">
                <img
                  src="${LOGO_URL}"
                  alt="Gold Trails logo"
                  width="56"
                  style="display:block; margin:0 auto; width:56px; height:auto; border:0; outline:none; text-decoration:none;"
                />
              </td>
            </tr>
            <tr>
              <td style="padding:8px 24px 0 24px; font-family:Georgia, 'Times New Roman', serif; color:#1a140f; font-size:24px; line-height:1.3; text-align:center;">
                New contact message
              </td>
            </tr>
            <tr>
              <td style="padding:12px 24px 0 24px; font-family:Arial, Helvetica, sans-serif; color:#6b5e4e; font-size:13px; line-height:1.5; text-align:center;">
                Sent from the Gold Trails website contact form
              </td>
            </tr>
            <tr>
              <td style="padding:20px 24px 0 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse; font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#1a140f;">
                  <tr>
                    <td style="padding:8px 12px 8px 0; vertical-align:top; color:#6b5e4e; width:88px;"><strong>Name</strong></td>
                    <td style="padding:8px 0; vertical-align:top;">${nameHtml}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 12px 8px 0; vertical-align:top; color:#6b5e4e;"><strong>Email</strong></td>
                    <td style="padding:8px 0; vertical-align:top;"><a href="mailto:${emailMailto}" style="color:#d4a017; text-decoration:none; font-weight:600;">${emailHtml}</a></td>
                  </tr>
                  <tr>
                    <td style="padding:8px 12px 8px 0; vertical-align:top; color:#6b5e4e;"><strong>Subject</strong></td>
                    <td style="padding:8px 0; vertical-align:top;">${subjectHtml}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 24px 24px 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f5f0e6; border:1px solid #e0d4b3; border-radius:8px;">
                  <tr>
                    <td style="padding:16px 18px; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:1.65; color:#1a140f; white-space:pre-wrap;">${messageHtml}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 20px 24px; font-family:Arial, Helvetica, sans-serif; font-size:12px; line-height:1.5; color:#6b5e4e; text-align:center;">
                Reply-To on this email is set to the visitor so you can respond in one click.
              </td>
            </tr>
            <tr>
              <td style="padding:16px 24px 24px 24px; border-top:1px solid #e0d4b3; font-family:Arial, Helvetica, sans-serif; color:#6b5e4e; font-size:11px; line-height:1.5; text-align:center;">
                Gold Trails with Kevin Hoagland · This is an automated notification from your website.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
