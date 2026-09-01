import { Resend } from "resend";

const FROM_ADDRESS = "Voxitron <hello@voxitron.com>";

let client: Resend | null = null;

function getClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

/**
 * Confirmation email sent right after a /get-started (or /contact,
 * lead-calculator) submission. Silently no-ops if RESEND_API_KEY isn't set
 * yet, logging a warning instead of failing the lead submission, since the
 * lead is already saved in Supabase regardless of whether this email goes
 * out. Once a key is set, this becomes a real send.
 */
export async function sendLeadConfirmationEmail({
  to,
  name,
}: {
  to: string;
  name: string;
}): Promise<void> {
  const resend = getClient();
  if (!resend) {
    console.warn("RESEND_API_KEY is not set, skipping lead confirmation email.");
    return;
  }

  const firstName = name.trim().split(/\s+/)[0] || "there";

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: "We've got your details, Voxitron",
    html: `
      <p>Hi ${firstName},</p>
      <p>Thanks for reaching out to Voxitron. We've got your details and we're setting up your agent now, expect it live within 48 hours.</p>
      <p>In the meantime, if anything's urgent, message us on WhatsApp: <a href="https://wa.me/2348120907050">wa.me/2348120907050</a></p>
      <p>Talk soon,<br>The Voxitron team</p>
    `,
  });

  if (error) {
    console.error("Failed to send lead confirmation email:", error);
  }
}
