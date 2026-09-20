import Image from "next/image";

type Integration = {
  name: string;
  category: string;
  logo: string;
};

const INTEGRATIONS: Integration[] = [
  { name: "Odoo", category: "ERP", logo: "/assets/logos/odoo.svg" },
  { name: "Shopify", category: "E-commerce", logo: "/assets/logos/shopify.svg" },
  { name: "WooCommerce", category: "E-commerce", logo: "/assets/logos/woocommerce.svg" },
  { name: "Zoho CRM", category: "CRM", logo: "/assets/logos/zoho.svg" },
  { name: "QuickBooks", category: "Accounting", logo: "/assets/logos/quickbooks.svg" },
  { name: "Sage", category: "Accounting", logo: "/assets/logos/sage.svg" },
  { name: "Paystack", category: "Payments", logo: "/assets/logos/paystack.svg" },
  { name: "Flutterwave", category: "Payments", logo: "/assets/logos/flutterwave.png" },
  { name: "Moniepoint", category: "Payments", logo: "/assets/logos/moniepoint.svg" },
  { name: "Google Sheets", category: "Spreadsheets", logo: "/assets/logos/googlesheets.svg" },
  { name: "Microsoft Excel", category: "Spreadsheets", logo: "/assets/logos/microsoftexcel.svg" },
  { name: "HubSpot", category: "CRM", logo: "/assets/logos/hubspot.svg" },
  { name: "Salesforce", category: "CRM", logo: "/assets/logos/salesforce.svg" },
];

export default function IntegrationsGrid() {
  return (
    <div className="section-inner-wide">
      <div className="section-inner-wide-header">
        <span className="section-label">INTEGRATIONS</span>
        <h2 id="integrations-title" className="section-title">
          Connects to the tools
          <br />
          <span className="accent">you already run the business on.</span>
        </h2>
        <p className="section-body">
          Orders, stock, and payments stay in sync with your ERP, CRM, and payment
          gateway. No manual re-entry, no separate spreadsheet.
        </p>
      </div>

      <div className="integrations-grid" role="list">
        {INTEGRATIONS.map((item) => (
          <div className="integration-tile" role="listitem" key={item.name}>
            <span className="integration-icon">
              <Image src={item.logo} alt={`${item.name} logo`} width={28} height={28} />
            </span>
            <span className="integration-name">{item.name}</span>
            <span className="integration-category mono">{item.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
