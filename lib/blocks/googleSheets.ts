import { googleFetch, serviceAccountEmail } from "@/lib/blocks/googleAuth";
import { BlockError, type StockProvider } from "@/lib/blocks/types";

const SCOPE = "https://www.googleapis.com/auth/spreadsheets.readonly";
const MAX_MATCHES = 10;

function notSharedMessage(): string {
  return `Voxitron can't open that sheet. Share it with ${serviceAccountEmail() || "Voxitron's service account"} as a Viewer.`;
}

/** Accepts a full Google Sheets URL or a bare sheet id. */
export function sheetIdFrom(input: string): string | null {
  const value = input.trim();
  const fromUrl = value.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (fromUrl) return fromUrl[1];
  return /^[a-zA-Z0-9_-]{20,}$/.test(value) ? value : null;
}

/** Every row of a tab (the first tab if none is named), header row first. */
export async function readSheetRows(sheetId: string, tab?: string): Promise<string[][]> {
  const range = tab ? `'${tab.replace(/'/g, "''")}'!A:Z` : "A:Z";
  const response = await googleFetch(
    SCOPE,
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}`
  );

  if (response.status === 403 || response.status === 404) throw new BlockError(notSharedMessage());
  if (response.status === 400 && tab) throw new BlockError(`There's no tab called "${tab}" in that sheet.`);
  if (!response.ok) {
    console.error("Google Sheets read failed:", response.status, await response.text());
    throw new BlockError("Google Sheets didn't answer. Try again in a moment.");
  }

  const data: { values?: string[][] } = await response.json();
  return data.values || [];
}

function rowToLine(headers: string[], row: string[]): string {
  return headers.map((header, index) => `${header}: ${row[index] ?? ""}`).join(" | ");
}

/** One "Item: Ankara | Price: 4500" line per row, the shape the knowledge base and the agent both read best. */
export function sheetRowsToText(rows: string[][]): string {
  const [headers = [], ...dataRows] = rows;
  return dataRows
    .filter((row) => row.some((cell) => String(cell).trim()))
    .map((row) => rowToLine(headers, row))
    .join("\n");
}

function matchRows(rows: string[][], query: string): string[][] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const texts = rows.map((row) => row.join(" ").toLowerCase());

  // Every word first, so "red ankara" finds that row rather than everything red.
  const all = rows.filter((_, index) => words.every((word) => texts[index].includes(word)));
  if (all.length > 0) return all;
  return rows.filter((_, index) => words.some((word) => texts[index].includes(word)));
}

export const googleSheetsStock: StockProvider = {
  id: "google_sheets",
  block: "stock",
  label: "Google Sheet",
  fields: [
    { key: "sheet_id", label: "Google Sheet URL", placeholder: "https://docs.google.com/spreadsheets/d/..." },
    { key: "tab", label: "Tab name", hint: "Leave empty to use the first tab", optional: true },
  ],

  parseConfig(input) {
    const sheetId = sheetIdFrom(input.sheet_id || "");
    if (!sheetId) throw new BlockError("That doesn't look like a Google Sheets URL.");
    return { sheet_id: sheetId, ...(input.tab?.trim() ? { tab: input.tab.trim() } : {}) };
  },

  async check({ config }) {
    const rows = await readSheetRows(config.sheet_id, config.tab);
    if (rows.length < 2) throw new BlockError("That sheet needs a header row and at least one row of data.");
  },

  async search({ config }, query) {
    if (!query) return "No search term given. Say which item to look for.";

    const [headers = [], ...dataRows] = await readSheetRows(config.sheet_id, config.tab);
    const matches = matchRows(dataRows, query).slice(0, MAX_MATCHES);
    if (matches.length === 0) return `Nothing matching "${query}" in the live sheet.`;
    return matches.map((row) => rowToLine(headers, row)).join("\n");
  },
};
