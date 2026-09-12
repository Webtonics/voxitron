export type SwitcherNumber = { id: string; label: string | null; whatsapp_number: string };

/**
 * Filters a dashboard page down to one of the customer's WhatsApp numbers,
 * or all of them pooled. Shared between /dashboard (Overview) and
 * /dashboard/inbox so both pages read from the same ?number= param and stay
 * on the same standard, instead of each page growing its own inline
 * switcher markup and URL-building logic.
 */
export default function NumberSwitcher({
  basePath,
  numbers,
  activeNumberId,
  extraParams = {},
}: {
  basePath: string;
  numbers: SwitcherNumber[];
  activeNumberId?: string;
  extraParams?: Record<string, string | undefined>;
}) {
  if (numbers.length <= 1) return null;

  function hrefFor(numberId?: string) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(extraParams)) {
      if (value) params.set(key, value);
    }
    if (numberId) params.set("number", numberId);
    const query = params.toString();
    return query ? `${basePath}?${query}` : basePath;
  }

  return (
    <div className="dashboard-number-switcher">
      <a href={hrefFor()} className={`dashboard-number-tab${!activeNumberId ? " is-active" : ""}`}>
        All numbers
      </a>
      {numbers.map((n) => (
        <a
          key={n.id}
          href={hrefFor(n.id)}
          className={`dashboard-number-tab${activeNumberId === n.id ? " is-active" : ""}`}
        >
          {n.label || n.whatsapp_number}
        </a>
      ))}
    </div>
  );
}
