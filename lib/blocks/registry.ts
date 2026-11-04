import { googleCalendarBookings } from "@/lib/blocks/googleCalendar";
import { googleSheetsStock } from "@/lib/blocks/googleSheets";
import { hubspotCrm } from "@/lib/blocks/hubspot";
import type { BlockId, Provider } from "@/lib/blocks/types";

// Plugging in another tool a customer already uses: write the provider, add it here.
export const PROVIDERS: Provider[] = [googleSheetsStock, googleCalendarBookings, hubspotCrm];

export function providerById(id: string): Provider | undefined {
  return PROVIDERS.find((provider) => provider.id === id);
}

export const BLOCKS: { id: BlockId; label: string; description: string; onboardingQuestion: string }[] = [
  {
    id: "stock",
    label: "Stock and prices",
    description: "Checks live prices and availability",
    onboardingQuestion: "Where do you keep your prices and stock?",
  },
  {
    id: "bookings",
    label: "Bookings",
    description: "Finds free slots and books them",
    onboardingQuestion: "How do you take bookings today?",
  },
  {
    id: "crm",
    label: "Customer records",
    description: "Saves each customer and what they asked for",
    onboardingQuestion: "Where do you keep your customers' details?",
  },
];
