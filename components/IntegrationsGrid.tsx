type Integration = {
  name: string;
  category: string;
  icon: React.ReactNode;
};

function OdooIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="6" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="7" r="3.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="18" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="17" r="3.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ShoppingBagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 8.5H18L17.3 19A1.5 1.5 0 0 1 15.8 20.4H8.2A1.5 1.5 0 0 1 6.7 19L6 8.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M9 8.5V6.5C9 4.8 10.3 3.5 12 3.5C13.7 3.5 15 4.8 15 6.5V8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function WooIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="2.4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 10.5L8.4 14.5L10 10.8L11.6 14.5L13 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.3 10.5C14.3 10.5 13.8 14.5 16 14.5C18 14.5 17.5 10.5 17.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ZohoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function LedgerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4.5" y="3.5" width="15" height="17" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 8H16M8 12H16M8 16H12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CalculatorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="5" y="3.5" width="14" height="17" rx="1.8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 7.5H16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8.3" cy="12" r="0.9" fill="currentColor" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" />
      <circle cx="15.7" cy="12" r="0.9" fill="currentColor" />
      <circle cx="8.3" cy="15.6" r="0.9" fill="currentColor" />
      <circle cx="12" cy="15.6" r="0.9" fill="currentColor" />
      <circle cx="15.7" cy="15.6" r="0.9" fill="currentColor" />
    </svg>
  );
}

function CardPaymentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 9.5H21" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.5 14.5H10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M13 3L6 13.5H11.5L10.5 21L18 10.5H12.5L13 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 7.5C4 6.4 4.9 5.5 6 5.5H17C18.1 5.5 19 6.4 19 7.5V17C19 18.1 18.1 19 17 19H6C4.9 19 4 18.1 4 17V7.5Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M15 12.5H17.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4 9.5H19" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function SpreadsheetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="3.5" width="16" height="17" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 9H20M4 14H20M9.5 9V20.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function GridWindowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="15" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.5 9.5H20.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8.5 9.5V20" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function FunnelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 5H20L14 12.5V18L10 20V12.5L4 5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7.5 17.5C5.6 17.5 4 15.9 4 14C4 12.3 5.2 10.9 6.8 10.6C7.2 8.3 9.2 6.5 11.6 6.5C14.1 6.5 16.2 8.4 16.5 10.9C18.4 11.1 20 12.7 20 14.6C20 16.6 18.4 18.2 16.4 18.2H7.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3.5 13.5C5 13.5 5 11 6.5 11C8 11 8 13.5 9.5 13.5C11 13.5 11 11 12.5 11C14 11 14 13.5 15.5 13.5C17 13.5 17 11 18.5 11C20 11 20 13.5 20.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 17.5C5 17.5 5 15 6.5 15C8 15 8 17.5 9.5 17.5C11 17.5 11 15 12.5 15C14 15 14 17.5 15.5 17.5C17 17.5 17 15 18.5 15C20 15 20 17.5 20.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7" r="2.6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function WebhookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8.5 15.5L5.5 10L9.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.5 8.5L18.5 14L14.5 19.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

const INTEGRATIONS: Integration[] = [
  { name: "Odoo", category: "ERP", icon: <OdooIcon /> },
  { name: "Shopify", category: "E-commerce", icon: <ShoppingBagIcon /> },
  { name: "WooCommerce", category: "E-commerce", icon: <WooIcon /> },
  { name: "Zoho CRM", category: "CRM", icon: <ZohoIcon /> },
  { name: "QuickBooks", category: "Accounting", icon: <LedgerIcon /> },
  { name: "Sage", category: "Accounting", icon: <CalculatorIcon /> },
  { name: "Paystack", category: "Payments", icon: <CardPaymentIcon /> },
  { name: "Flutterwave", category: "Payments", icon: <LightningIcon /> },
  { name: "Moniepoint", category: "Payments", icon: <WalletIcon /> },
  { name: "Google Sheets", category: "Spreadsheets", icon: <SpreadsheetIcon /> },
  { name: "Microsoft Excel", category: "Spreadsheets", icon: <GridWindowIcon /> },
  { name: "HubSpot", category: "CRM", icon: <FunnelIcon /> },
  { name: "Salesforce", category: "CRM", icon: <CloudIcon /> },
  { name: "Wave Accounting", category: "Accounting", icon: <WaveIcon /> },
  { name: "Open API / Webhook", category: "Custom", icon: <WebhookIcon /> },
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
            <span className="integration-icon">{item.icon}</span>
            <span className="integration-name">{item.name}</span>
            <span className="integration-category mono">{item.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
