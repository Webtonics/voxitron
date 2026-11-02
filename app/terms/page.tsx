import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of Service | Voxitron",
  description: "The terms businesses agree to when they use Voxitron's AI agents and customer dashboard.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="page-hero">
          <div className="section-inner">
            <span className="section-label">TERMS OF SERVICE</span>
            <h1 className="section-title">The terms of working with us.</h1>
            <div className="section-body">
              <p>
                Last updated November 2, 2026. These terms apply to every business that uses
                Voxitron&apos;s AI agents and dashboard.
              </p>
            </div>
          </div>
        </section>

        <div className="article-body">
          <h2>Who we are</h2>
          <p>
            Voxitron (&quot;Voxitron,&quot; &quot;we,&quot; &quot;us&quot;) is a product of
            Webtonics Ltd. These terms are between us and the business that uses Voxitron
            (&quot;you&quot;). By using the service, or by agreeing a proposal or invoice with
            us, you accept them.
          </p>

          <h2>The service</h2>
          <p>
            We set up, host, and maintain AI agents that reply to your customers on WhatsApp
            and any other channel we agree with you, using information you give us. You also
            get a dashboard to see conversations, leads, and your agent&apos;s settings.
          </p>
          <p>
            What&apos;s included, the price, and any pilot or trial are set out in the proposal
            or invoice we agree with you in writing. If that agreement and these terms ever
            conflict, the agreement wins.
          </p>

          <h2>Your account</h2>
          <ul>
            <li>We create dashboard logins for the people you name.</li>
            <li>Keep login details private. You&apos;re responsible for what&apos;s done under your logins.</li>
            <li>
              Tell us straight away if a login is lost or misused, or when someone leaves your
              team, so we can remove their access.
            </li>
          </ul>

          <h2>What you&apos;re responsible for</h2>
          <ul>
            <li>
              <strong>Accurate information.</strong> The agent answers from the prices, stock,
              policies, and hours you give us. Keep them current.
            </li>
            <li>
              <strong>Lawful messaging.</strong> Only message people who contacted you or agreed
              to hear from you, and follow WhatsApp&apos;s Business Messaging and Commerce
              Policies.
            </li>
            <li>
              <strong>Your content.</strong> Only upload catalogs, documents, and sheets you have
              the right to share.
            </li>
            <li>
              <strong>Acceptable use.</strong> Don&apos;t use Voxitron for anything illegal,
              deceptive, or harmful, or to sell anything WhatsApp&apos;s Commerce Policy
              prohibits.
            </li>
          </ul>

          <h2>What the AI agent can and can&apos;t do</h2>
          <p>
            The agent answers from your knowledge base and flags a conversation for you when
            it can&apos;t help. Like any automated system, it can still get things wrong.
          </p>
          <p>
            Check your dashboard, step in when a conversation is flagged, and don&apos;t rely on
            the agent for anything that needs a qualified person, such as medical, legal, or
            financial advice.
          </p>

          <h2>Fees and payment</h2>
          <ul>
            <li>Fees are set in your agreement with us.</li>
            <li>Invoices are due by the date shown on them.</li>
            <li>If a payment is overdue, we may pause your agents, after telling you first.</li>
            <li>
              Messaging fees Meta charges for WhatsApp conversations are handled as set out in
              your agreement.
            </li>
          </ul>

          <h2>Your data</h2>
          <p>
            You own your business content and your customer conversations. We process your
            customers&apos; personal data on your behalf, only to run the service for you, as
            described in our <Link href="/privacy">Privacy Policy</Link> and in line with
            Nigeria&apos;s Data Protection Act 2023. We never sell it or use it to train AI
            models.
          </p>
          <p>
            Where the law requires it, you&apos;re responsible for telling your customers that
            an automated agent handles their messages. If you leave, you can ask for an export
            before we delete your data.
          </p>

          <h2>Services we rely on</h2>
          <p>
            Voxitron runs on third-party platforms, including Meta&apos;s WhatsApp Business
            Platform, OpenAI, Supabase, and Vercel. Their outages or policy changes can affect
            the service, and they&apos;re outside our control. If Meta restricts a number
            because of how it was used, we&apos;ll help you appeal, but that decision is
            Meta&apos;s.
          </p>

          <h2>Availability and changes</h2>
          <p>
            We work to keep your agents running 24/7, but we can&apos;t promise the service
            will never be interrupted. We may improve or change features over time, and
            we&apos;ll tell you before any change that reduces what you&apos;re paying for.
          </p>

          <h2>Ending the service</h2>
          <ul>
            <li>You can stop at any time by telling us, subject to any minimum term in your agreement.</li>
            <li>
              We can suspend or end the service if you break these terms, misuse the service, or
              don&apos;t pay. We&apos;ll normally give notice and a chance to fix it first,
              unless the problem is serious or puts others at risk.
            </li>
          </ul>

          <h2>Ownership</h2>
          <p>
            Voxitron&apos;s software, workflows, and agent design stay ours. Your content stays
            yours, and you let us use it only to run the service for you.
          </p>

          <h2>Liability</h2>
          <p>
            We provide the service with reasonable care and skill. As far as the law allows,
            we aren&apos;t liable for indirect losses such as lost profits or lost business,
            and our total liability to you is limited to the fees you paid us in the 12 months
            before the claim.
          </p>
          <p>Nothing in these terms limits any liability that the law doesn&apos;t allow us to limit.</p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of the Federal Republic of Nigeria. If we ever
            disagree, we&apos;ll try to resolve it directly with you first.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            If we change these terms, we&apos;ll update the date at the top of this page and tell
            existing customers about any material change before it takes effect.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms: email{" "}
            <a href="mailto:hello@voxitron.com">hello@voxitron.com</a>, or message us on
            WhatsApp.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
