import Tick from "@/components/Tick";

const STEPS = [
  {
    title: "Understanding request",
    detail: "Extracted product: Black sneakers, size 42, quantity 2",
    time: "10:24",
  },
  {
    title: "Checking inventory",
    detail: "Found 2 available in stock",
    time: "10:24",
  },
  {
    title: "Creating order",
    detail: "Order #4521 created",
    time: "10:25",
  },
];

const SYSTEMS = [
  { label: "Inventory", detail: "Black sneakers, size 42 · 2 available" },
  { label: "Orders", detail: "Order #4521 · 2 × Black sneakers" },
  { label: "CRM", detail: "Chika Eze · new conversation logged" },
  { label: "Calendar", detail: "No pickup slot needed" },
  { label: "ERP", detail: "Order, inventory, and customer record synced" },
  { label: "Website / Store", detail: "Black sneakers · ₦12,500 · in stock" },
];

export default function DashboardMockup() {
  return (
    <div className="dashboard-mockup" aria-hidden="true">
      <div className="ui-card dashboard-mockup-card dashboard-mockup-flow">
        <div className="dashboard-mockup-header">
          <span className="dashboard-mockup-label">AI employee, working the order</span>
          <span className="dashboard-mockup-time mono">10:25</span>
        </div>

        <div className="dashboard-mockup-steps">
          {STEPS.map((step) => (
            <div className="dashboard-mockup-step" key={step.title}>
              <span className="dashboard-mockup-step-check" aria-hidden="true"><Tick /></span>
              <div>
                <div className="dashboard-mockup-step-row">
                  <span className="dashboard-mockup-step-title">{step.title}</span>
                  <span className="dashboard-mockup-step-time mono">{step.time}</span>
                </div>
                <p className="dashboard-mockup-step-detail">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-mockup-confirm">
          <span className="dashboard-mockup-step-check" aria-hidden="true"><Tick /></span>
          <div>
            <p className="ui-booking-title">Order confirmed</p>
            <p className="ui-booking-detail">
              2 &times; Black sneakers &middot; Customer notified <Tick />
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-mockup-systems" role="list">
        {SYSTEMS.map((system) => (
          <div className="ui-card dashboard-mockup-card dashboard-mockup-system" role="listitem" key={system.label}>
            <div className="dashboard-mockup-system-header">
              <span className="dashboard-mockup-label">{system.label}</span>
              <span className="dashboard-mockup-status-dot" aria-hidden="true"></span>
            </div>
            <p className="dashboard-mockup-system-detail">{system.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
