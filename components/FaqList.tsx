import JsonLd from "@/components/JsonLd";
import { faqJsonLd, type FaqItem } from "@/lib/structuredData";

// Renders the FAQ accordion and its FAQPage schema from the same items, so the
// structured data always matches what the visitor actually reads.
export default function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <>
      <div className="faq-list" role="list">
        {items.map((item) => (
          <details key={item.question} className="faq-item" role="listitem">
            <summary>
              {item.question}
              <span className="faq-icon" aria-hidden="true">+</span>
            </summary>
            <p className="faq-body">{item.answer}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqJsonLd(items)} />
    </>
  );
}
