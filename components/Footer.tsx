import Link from "next/link";
import Tick from "@/components/Tick";

const WA_CONTACT_HREF =
  "https://wa.me/2348120907050?text=Hi%20Voxitron%2C%20I%27d%20like%20to%20know%20more";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-columns">
        <div className="footer-col footer-col-brand">
          <span className="footer-wordmark">VOXITRON</span>
          <p className="footer-tagline">
            AI agents that answer, quote, and sell for busy service businesses.
          </p>
          <span className="footer-credit">
            A product by{" "}
            <a href="https://digitalwebtonics.com" target="_blank" rel="noopener noreferrer">
              Digitalwebtonics
            </a>
          </span>
        </div>

        <div className="footer-col">
          <span className="footer-col-title">Solutions</span>
          <ul className="footer-link-list">
            <li><Link href="/whatsapp-agent">WhatsApp Sales</Link></li>
            <li><Link href="/speed-to-lead">Never Miss a Call</Link></li>
            <li><Link href="/quoting-agent">Instant Quotes</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <span className="footer-col-title">Industries</span>
          <ul className="footer-link-list">
            <li><Link href="/real-estate">Real Estate</Link></li>
            <li><Link href="/diagnostic-centre">Diagnostic Centres</Link></li>
            <li><Link href="/retail">Retailers</Link></li>
            <li><Link href="/ecommerce">E-commerce Brands</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <span className="footer-col-title">Tools &amp; More</span>
          <ul className="footer-link-list">
            <li><Link href="/compare">Compare</Link></li>
            <li><Link href="/tools/missed-lead-calculator">Lead Calculator</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <span className="footer-col-title">Get in Touch</span>
          <ul className="footer-link-list">
            <li><Link href="/contact">Contact us</Link></li>
            <li><a href="mailto:hello@voxitron.com">hello@voxitron.com</a></li>
            <li>
              <a
                href={WA_CONTACT_HREF}
                className="footer-wa-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M16.004 4C9.377 4 4 9.373 4 15.996c0 2.11.552 4.166 1.6 5.98L4.06 28l6.17-1.617a11.98 11.98 0 0 0 5.773 1.47h.005c6.626 0 12.003-5.374 12.003-11.997A11.93 11.93 0 0 0 24.5 7.5 11.93 11.93 0 0 0 16.004 4Zm0 21.955h-.004a9.94 9.94 0 0 1-5.07-1.388l-.363-.216-3.66.96.977-3.567-.237-.366a9.94 9.94 0 0 1-1.525-5.312c0-5.502 4.478-9.978 9.986-9.978a9.92 9.92 0 0 1 7.06 2.926 9.9 9.9 0 0 1 2.921 7.061c0 5.503-4.48 9.98-9.985 9.98Zm5.475-7.474c-.3-.15-1.775-.876-2.05-.976-.276-.1-.476-.15-.677.15-.2.301-.777.977-.953 1.177-.176.2-.351.226-.652.075-.3-.15-1.266-.467-2.412-1.487-.892-.795-1.494-1.777-1.669-2.077-.176-.301-.019-.463.131-.613.135-.134.301-.351.451-.526.15-.176.2-.301.301-.502.1-.2.05-.376-.025-.526-.075-.15-.677-1.631-.928-2.234-.244-.587-.492-.508-.677-.517a13.05 13.05 0 0 0-.577-.011c-.2 0-.526.075-.802.376-.276.301-1.052 1.028-1.052 2.508s1.077 2.909 1.227 3.11c.15.2 2.12 3.236 5.135 4.539.717.31 1.278.495 1.715.633.72.229 1.375.197 1.893.12.578-.087 1.775-.726 2.025-1.427.25-.7.25-1.301.176-1.427-.075-.125-.276-.2-.576-.35Z"
                  />
                </svg>
                Chat on WhatsApp
              </a>
            </li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&#169; 2026 Voxitron. All rights reserved.</span>
        <span className="footer-bottom-replied mono">
          Message us. Replied <Tick /> before you finish reading this.
        </span>
      </div>
    </footer>
  );
}
