import Link from "next/link";

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
              <a href={WA_CONTACT_HREF} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&#169; 2026 Voxitron. All rights reserved.</span>
      </div>
    </footer>
  );
}
