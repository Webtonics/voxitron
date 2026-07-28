import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="footer-wordmark">VOXITRON</span>
        <span className="footer-credit">
          A product by{" "}
          <a
            href="https://digitalwebtonics.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Digitalwebtonics
          </a>
        </span>
      </div>
      <div className="footer-meta">
        <span>&#169; 2026</span>
        <span className="footer-sep">&#183;</span>
        <Link href="/privacy">Privacy Policy</Link>
        <span className="footer-sep">&#183;</span>
        <a href="mailto:hello@voxitron.com">hello@voxitron.com</a>
      </div>
    </footer>
  );
}
