// The Lego contract behind the WhatsApp agent. A block is something the agent
// can do (check stock, book a slot, save a contact). A provider is one tool
// that can do it (Google Sheets, Google Calendar, HubSpot). The agent only ever
// talks to blocks, so plugging in a tool a customer already uses means writing
// one provider against these types and adding it to registry.ts. Nothing else
// changes: not the agent, not n8n, not the database. A customer_tools row (see
// supabase/migrations/014_customer_tools.sql) is one provider plugged in for
// one customer.

export type BlockId = "stock" | "bookings" | "crm";

/**
 * A connection problem someone has to fix (sheet unshared, token revoked).
 * The message is shown to Voxitron's team and on the customer's Connections
 * page, so it says what to do, in plain words.
 */
export class BlockError extends Error {}

export type ProviderField = {
  key: string;
  label: string;
  hint?: string;
  placeholder?: string;
  /** Stored encrypted (see secrets.ts) and never sent back to the browser. */
  secret?: boolean;
  optional?: boolean;
};

export type Connection = {
  config: Record<string, string>;
  secret: string | null;
};

type ProviderBase = {
  id: string;
  label: string;
  fields: ProviderField[];
  /** Turns what was typed on the Build screen into stored config. Throws BlockError if it's unusable. */
  parseConfig(input: Record<string, string>): Record<string, string>;
  /** Proves the connection works without changing anything. Throws BlockError if it doesn't. */
  check(connection: Connection): Promise<void>;
};

export type StockProvider = ProviderBase & {
  block: "stock";
  search(connection: Connection, query: string): Promise<string>;
};

export type BookingsProvider = ProviderBase & {
  block: "bookings";
  findSlots(connection: Connection, range: { from: string; to: string }): Promise<string>;
  bookSlot(
    connection: Connection,
    booking: { date: string; time: string; name: string; phone: string; note: string }
  ): Promise<string>;
};

export type CrmProvider = ProviderBase & {
  block: "crm";
  saveContact(
    connection: Connection,
    contact: { name: string; phone: string; email: string; note: string }
  ): Promise<string>;
};

export type Provider = StockProvider | BookingsProvider | CrmProvider;
