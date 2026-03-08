import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.DONATION_FROM_EMAIL ?? "UnitedRelief <onboarding@resend.dev>";

export type SendDonationThankYouResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Sends a thank-you email to the donor. No-op if RESEND_API_KEY is not set.
 */
export async function sendDonationThankYouEmail(
  to: string,
  firstName: string,
  lastName: string,
  amount: string
): Promise<SendDonationThankYouResult> {
  if (!process.env.RESEND_API_KEY) {
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }

  const displayName = [firstName, lastName].filter(Boolean).join(" ") || "Donor";

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #1f2937; max-width: 36em; margin: 0 auto; padding: 1.5rem;">
  <p>Dear ${escapeHtml(displayName)},</p>
  <p>Thank you for your donation of <strong>${escapeHtml(amount)}</strong> to UnitedRelief. Your contribution helps us connect disaster victims with resources and support.</p>
  <p>You will receive a separate email regarding your donation for tax purposes. Please keep it for your records.</p>
  <p>With gratitude,<br>The UnitedRelief Team</p>
</body>
</html>
`.trim();

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [to],
    subject: "Thank you for your donation to UnitedRelief",
    html,
  });

  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
