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
      <p>Thanks for reaching out to Voxitron. We've got your details and we're building and connecting your agent now, expect it live on your existing number in about a week.</p>
      <p>In the meantime, if anything's urgent, message us on WhatsApp: <a href="https://wa.me/2348120907050">wa.me/2348120907050</a></p>
      <p>Talk soon,<br>The Voxitron team</p>
    `,
  });

  if (error) {
    console.error("Failed to send lead confirmation email:", error);
  }
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Tells Voxitron's team which customers' tools just stopped working. See app/api/cron/check-connections. */
export async function sendConnectionAlertEmail(
  broken: { businessName: string; tool: string; problem: string }[]
): Promise<void> {
  const resend = getClient();
  if (!resend) {
    console.warn("RESEND_API_KEY is not set, skipping connection alert email:", broken);
    return;
  }

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: "hello@voxitron.com",
    subject: `${broken.length} customer connection${broken.length === 1 ? "" : "s"} just broke`,
    html: `
      <p>These stopped working in last night's check. The agents behind them are telling customers the team will confirm instead of answering.</p>
      <ul>${broken
        .map((item) => `<li><strong>${escapeHtml(item.businessName)}</strong>, ${escapeHtml(item.tool)}: ${escapeHtml(item.problem)}</li>`)
        .join("")}</ul>
      <p>Fix them on the Build screen: <a href="https://www.voxitron.com/dashboard/build">voxitron.com/dashboard/build</a></p>
    `,
  });

  if (error) {
    console.error("Failed to send connection alert email:", error);
  }
}
