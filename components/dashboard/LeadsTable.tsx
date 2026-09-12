import Pill from "@/components/dashboard/Pill";

export type LeadRow = {
  id: string;
  name: string;
  wants: string;
  time: string;
  status: "needs-you" | "booked" | "new-lead";
};

const AVATAR_TONES = ["dashboard-avatar-1", "dashboard-avatar-2", "dashboard-avatar-3", "dashboard-avatar-4"];

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export default function LeadsTable({ rows }: { rows: LeadRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="dashboard-empty-state" style={{ textAlign: "left" }}>
        <p>No leads yet.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-table-wrap">
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>What they wanted</th>
            <th>When</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id}>
              <td>
                <div className="dashboard-table-who">
                  <span className={`dashboard-table-avatar ${AVATAR_TONES[i % AVATAR_TONES.length]}`}>
                    {initialsFor(row.name)}
                  </span>
                  <span>{row.name}</span>
                </div>
              </td>
              <td>{row.wants}</td>
              <td className="mono dashboard-table-time">{row.time}</td>
              <td>
                {row.status === "needs-you" && <Pill variant="needs-you">Needs you</Pill>}
                {row.status === "booked" && <Pill variant="booked">Booked</Pill>}
                {row.status === "new-lead" && <Pill variant="new-lead">New lead</Pill>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
