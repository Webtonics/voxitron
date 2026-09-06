export default function DashboardMockup() {
  return (
    <div className="dashboard-mockup" aria-hidden="true">
      <div className="ui-card dashboard-mockup-card">
        <div className="dashboard-mockup-header">
          <span className="dashboard-mockup-label">Live message log</span>
          <span className="dashboard-mockup-time mono">14:02</span>
        </div>
        <div className="ui-chat">
          <div className="ui-msg-group">
            <p className="ui-msg-label">Customer</p>
            <div className="ui-msg ui-msg-customer">Do you have this in a size 42?</div>
          </div>
          <div className="ui-msg-group is-reply">
            <p className="ui-msg-label">Voxitron</p>
            <div className="ui-msg ui-msg-ai">Yes, in stock. Reserved it under your name.</div>
          </div>
        </div>
      </div>

      <div className="ui-card dashboard-mockup-card dashboard-mockup-card-stock">
        <div className="dashboard-mockup-header">
          <span className="dashboard-mockup-label">Stock check</span>
          <span className="dashboard-mockup-status-dot" aria-hidden="true"></span>
        </div>
        <p className="ui-booking-title">Black sneakers, size 42</p>
        <p className="ui-booking-detail">1 unit reserved, order #4521</p>
      </div>

      <div className="ui-card dashboard-mockup-card dashboard-mockup-card-handoff">
        <div className="ui-booking-status">
          <span className="dashboard-mockup-flag" aria-hidden="true"></span>
          Handoff flagged
        </div>
        <p className="ui-booking-title">Refund request, needs you directly</p>
        <p className="ui-booking-detail">Assigned to: you</p>
      </div>
    </div>
  );
}
