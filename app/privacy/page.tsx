import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";

export const metadata: Metadata = {
  title: "Privacy Policy | Voxitron",
  description: "How Voxitron collects, uses, stores, and protects your information, including WhatsApp messages processed through our AI agents.",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="page-hero">
          <div className="section-inner">
            <span className="section-label">PRIVACY POLICY</span>
            <h1 className="section-title">How we handle your information.</h1>
            <div className="section-body">
              <p>
                Last updated August 22, 2026. This covers both visitors to our website and
                anyone who messages a WhatsApp number that runs on Voxitron.
              </p>
            </div>
          </div>
        </section>

        <div className="article-body">
          <h2>Who we are</h2>
          <p>
            Voxitron (&quot;Voxitron,&quot; &quot;we,&quot; &quot;us&quot;) builds AI agents
            that reply to customers, book appointments, and take orders for businesses in
            Nigeria, primarily over WhatsApp. This policy explains what information we
            collect, why, where it&apos;s stored, who else sees it, and what rights you
            have over it, whether you&apos;re a business considering Voxitron, a business
            we already work with, or a customer messaging one of our clients on WhatsApp.
          </p>
          <p>
            We process personal data in line with Nigeria&apos;s Data Protection Act 2023
            (NDPA), and this policy is written to explain our practices in plain language
            rather than the minimum legally required disclosure.
          </p>

          <h2>Information we collect from website visitors</h2>
          <p>
            If you fill out a form on voxitron.com (Get Started, Contact, or the missed-lead
            calculator), we collect your name, business name, email, phone number, which
            agent or industry you&apos;re interested in, and anything you write in an
            optional notes field. This is stored in our
            database (Supabase) and used only to respond to your enquiry and, if you become
            a customer, to set up your account.
          </p>
          <p>
            We use Vercel Analytics to understand overall site traffic (pages viewed,
            approximate location by country, device type). This is privacy-focused,
            cookieless analytics: it does not use tracking cookies, does not build an
            individual profile of you, and does not share data with advertisers. We do not
            use any advertising or cross-site tracking pixels on this site.
          </p>

          <h2>WhatsApp messaging: what happens when you message an agent</h2>
          <p>
            This is the core of what Voxitron does, so it gets its own detailed section.
            When you or your customers message a WhatsApp number operated through Voxitron,
            we receive and process those messages, including message content, your WhatsApp
            phone number, profile name, and any media you send (photos or voice notes), via
            the Meta WhatsApp Business Platform, in order to respond to enquiries, answer
            questions, check stock or pricing, and complete bookings or orders.
          </p>
          <ul>
            <li>
              <strong>Message content</strong> (text, and voice notes transcribed to text) is
              sent to our AI agent to generate a reply. It is matched against the specific
              business&apos;s own knowledge base (their product catalog, prices, and
              policies) to answer accurately, rather than guessing.
            </li>
            <li>
              <strong>Photos you send</strong> (for example, a picture of a product you&apos;re
              asking about) are described by an AI vision model in one or two sentences so
              the agent can respond to what&apos;s in the image. The description, not the
              raw photo, becomes part of the conversation record.
            </li>
            <li>
              <strong>Voice notes</strong> are transcribed to text automatically. The
              transcript, not the audio recording itself, becomes part of the conversation
              record.
            </li>
            <li>
              <strong>Your WhatsApp phone number and profile name</strong> are used to
              recognize you across messages in the same conversation and to address you by
              name if you&apos;ve set one on WhatsApp.
            </li>
          </ul>
          <p>
            Every message, inbound and outbound, is logged and stored so the business you
            messaged has a record of the conversation, the same way a human staff member
            keeping a chat log would. This is stored in Supabase (Postgres, hosted in the
            EU), access-controlled so a business can only see its own customers&apos;
            conversations, never another business&apos;s.
          </p>

          <h2>Third-party processors we use</h2>
          <p>
            We rely on a small number of specialist providers to actually run the agent.
            None of them are given more access than they need to do their specific job, and
            none of them are permitted to use your data for their own purposes (advertising,
            model training, or otherwise) under our agreements with them.
          </p>
          <ul>
            <li>
              <strong>Meta (WhatsApp Business Platform)</strong>: delivers and receives every
              WhatsApp message. Meta&apos;s own privacy policy governs how it handles message
              transport; see WhatsApp&apos;s Business Messaging Terms.
            </li>
            <li>
              <strong>OpenAI</strong>: message content is sent to OpenAI&apos;s API solely to
              generate a reply (text generation), describe an image you sent (vision), or
              transcribe a voice note (speech-to-text). OpenAI processes this data under its
              API data usage policy, which does not use API data to train its models by
              default.
            </li>
            <li>
              <strong>Qdrant</strong>: stores each business&apos;s knowledge base (product
              catalog, prices, policies) as searchable data, so the agent can look up
              accurate answers instead of guessing. This does not contain your personal
              conversation history, only the business&apos;s own reference content.
            </li>
            <li>
              <strong>Supabase</strong>: our primary database, storing customer accounts,
              conversation logs, and website form submissions, with encryption at rest and
              in transit.
            </li>
            <li>
              <strong>Vercel</strong>: hosts this website and its cookieless analytics.
            </li>
          </ul>
          <p>
            We do not sell your data to anyone, and we do not use your message content or
            contact details for advertising, ours or anyone else&apos;s.
          </p>

          <h2>How long we keep information</h2>
          <p>
            Conversation logs and account data are kept for as long as a business remains a
            Voxitron customer, so they have a continuous record of their own customer
            conversations. If a business stops using Voxitron, we retain their data for a
            reasonable transition period in case they need an export, then delete it, unless
            we&apos;re legally required to keep it longer.
          </p>
          <p>
            Website form submissions (leads) that don&apos;t convert into a customer
            relationship are kept while we&apos;re in contact with you about your enquiry,
            and deleted on request at any time.
          </p>

          <h2>Your rights</h2>
          <p>
            Under the NDPA, you have the right to know what personal data we hold about you,
            request a copy of it, ask us to correct inaccurate data, and ask us to delete
            it. If you&apos;re a customer messaging a business&apos;s WhatsApp agent and
            want your conversation history deleted, you can ask either that business
            directly or us, and we&apos;ll act on it either way.
          </p>
          <p>
            You can exercise any of these rights, or ask us anything about this policy, by
            emailing{" "}
            <a href="mailto:hello@voxitron.com">hello@voxitron.com</a>. We aim to respond
            within a few business days.
          </p>

          <h2>Data security</h2>
          <p>
            Data in transit is encrypted (HTTPS/TLS). Data at rest in our database is
            encrypted. Access to customer conversation data is restricted by row-level
            security, so one business&apos;s team can never see another business&apos;s
            customer conversations, and only authorized Voxitron team members can access
            infrastructure-level data for support and maintenance.
          </p>
          <p>
            If we become aware of a data breach likely to pose a risk to your rights, we
            will notify Nigeria&apos;s Data Protection Commission within 72 hours, as
            required by the NDPA, and notify affected individuals directly where the risk is
            high.
          </p>

          <h2>Children&apos;s privacy</h2>
          <p>
            Voxitron&apos;s services are intended for use by businesses and their adult
            customers. We do not knowingly collect personal data from children.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If we make a material change to how we handle your data, we&apos;ll update the
            date at the top of this page and, where appropriate, notify affected businesses
            directly.
          </p>

          <h2>Contact</h2>
          <p>
            Questions, data requests, or concerns about this policy: email{" "}
            <a href="mailto:hello@voxitron.com">hello@voxitron.com</a>, or message us on
            WhatsApp.
          </p>
        </div>
      </main>
      <Footer />
      <WaFloat />
    </>
  );
}
