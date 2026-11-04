import { googleFetch, serviceAccountEmail } from "@/lib/blocks/googleAuth";
import { BlockError, type BookingsProvider } from "@/lib/blocks/types";

const SCOPE = "https://www.googleapis.com/auth/calendar";
const API = "https://www.googleapis.com/calendar/v3";
const MAX_RANGE_DAYS = 14;
const MAX_SLOTS = 24;
const MINIMUM_NOTICE_MS = 30 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

type Hours = { timeZone: string; open: string; close: string; slotMinutes: number; closedDays: string[] };
type Interval = { start: number; end: number };

function hoursFrom(config: Record<string, string>): Hours {
  return {
    timeZone: config.timezone || "Africa/Lagos",
    open: config.open || "09:00",
    close: config.close || "17:00",
    slotMinutes: Number(config.slot_minutes || 60),
    closedDays: (config.closed_days || "").split(/[\s,]+/).filter(Boolean),
  };
}

function offsetMs(instant: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).formatToParts(new Date(instant));
  const part = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const asUtc = Date.UTC(part("year"), part("month") - 1, part("day"), part("hour"), part("minute"), part("second"));
  return asUtc - Math.floor(instant / 1000) * 1000;
}

/** The instant a wall-clock time happens in a time zone. Looked up twice so it lands right across a clock change. */
function zonedInstant(date: string, time: string, timeZone: string): number {
  const wallClock = Date.parse(`${date}T${time}:00Z`);
  const firstGuess = wallClock - offsetMs(wallClock, timeZone);
  return wallClock - offsetMs(firstGuess, timeZone);
}

function todayIn(timeZone: string): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone }).format(new Date());
}

function addDays(date: string, days: number): string {
  return new Date(Date.parse(`${date}T00:00:00Z`) + days * DAY_MS).toISOString().slice(0, 10);
}

function dayName(date: string): string {
  return DAY_NAMES[new Date(`${date}T00:00:00Z`).getUTCDay()];
}

function minutesOf(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function timeOf(minutes: number): string {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

function isDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function notSharedMessage(): string {
  return `Voxitron can't use that calendar. Share it with ${serviceAccountEmail() || "Voxitron's service account"} and choose "Make changes to events".`;
}

async function busyIntervals(calendarId: string, from: number, to: number): Promise<Interval[]> {
  const response = await googleFetch(SCOPE, `${API}/freeBusy`, {
    method: "POST",
    body: JSON.stringify({
      timeMin: new Date(from).toISOString(),
      timeMax: new Date(to).toISOString(),
      items: [{ id: calendarId }],
    }),
  });

  if (!response.ok) {
    console.error("Google Calendar freeBusy failed:", response.status, await response.text());
    throw new BlockError("Google Calendar didn't answer. Try again in a moment.");
  }

  const data: {
    calendars?: Record<string, { busy?: { start: string; end: string }[]; errors?: unknown[] }>;
  } = await response.json();
  const calendar = data.calendars?.[calendarId];

  // Google answers 200 even when it can't see the calendar, and reports the problem per calendar.
  if (!calendar || calendar.errors?.length) throw new BlockError(notSharedMessage());

  return (calendar.busy || []).map((busy) => ({ start: Date.parse(busy.start), end: Date.parse(busy.end) }));
}

function overlaps(start: number, end: number, busy: Interval[]): boolean {
  return busy.some((interval) => start < interval.end && end > interval.start);
}

export const googleCalendarBookings: BookingsProvider = {
  id: "google_calendar",
  block: "bookings",
  label: "Google Calendar",
  fields: [
    {
      key: "calendar_id",
      label: "Calendar ID",
      hint: "Usually their Gmail address. Otherwise: calendar Settings, Integrate calendar",
      placeholder: "shop@gmail.com",
    },
    { key: "open", label: "Opens at", placeholder: "09:00", optional: true },
    { key: "close", label: "Closes at", placeholder: "17:00", optional: true },
    { key: "closed_days", label: "Closed days", placeholder: "Sun", optional: true },
    { key: "slot_minutes", label: "Minutes per booking", placeholder: "60", optional: true },
    { key: "timezone", label: "Time zone", placeholder: "Africa/Lagos", optional: true },
  ],

  parseConfig(input) {
    const calendarId = (input.calendar_id || "").trim();
    if (!calendarId) throw new BlockError("A calendar ID is required.");

    const config: Record<string, string> = { calendar_id: calendarId };
    for (const key of ["open", "close", "closed_days", "slot_minutes", "timezone"]) {
      if (input[key]?.trim()) config[key] = input[key].trim();
    }

    const hours = hoursFrom(config);
    if (!TIME_PATTERN.test(hours.open) || !TIME_PATTERN.test(hours.close)) {
      throw new BlockError("Opening and closing times need to look like 09:00 or 17:30.");
    }
    if (minutesOf(hours.open) >= minutesOf(hours.close)) {
      throw new BlockError("Closing time has to be after opening time.");
    }
    if (!Number.isInteger(hours.slotMinutes) || hours.slotMinutes < 5) {
      throw new BlockError("Minutes per booking has to be a whole number, 5 or more.");
    }
    if (hours.closedDays.some((day) => !DAY_NAMES.includes(day))) {
      throw new BlockError("Write closed days like: Sat, Sun.");
    }

    try {
      new Intl.DateTimeFormat("en", { timeZone: hours.timeZone });
    } catch {
      throw new BlockError("That time zone isn't recognised. Try one like Africa/Lagos or Europe/London.");
    }

    return config;
  },

  async check({ config }) {
    const response = await googleFetch(
      SCOPE,
      `${API}/calendars/${encodeURIComponent(config.calendar_id)}/events?maxResults=1`
    );

    if (response.status === 403 || response.status === 404) throw new BlockError(notSharedMessage());
    if (!response.ok) {
      console.error("Google Calendar check failed:", response.status, await response.text());
      throw new BlockError("Google Calendar didn't answer. Try again in a moment.");
    }

    // Booking writes events, so read-only sharing has to fail here, not in front of a customer.
    const data: { accessRole?: string } = await response.json();
    if (data.accessRole !== "writer" && data.accessRole !== "owner") throw new BlockError(notSharedMessage());
  },

  async findSlots({ config }, range) {
    const hours = hoursFrom(config);
    const today = todayIn(hours.timeZone);
    const from = isDate(range.from) && range.from > today ? range.from : today;
    const lastAllowed = addDays(from, MAX_RANGE_DAYS - 1);
    const to = isDate(range.to) && range.to >= from ? (range.to < lastAllowed ? range.to : lastAllowed) : addDays(from, 6);

    const busy = await busyIntervals(
      config.calendar_id,
      zonedInstant(from, hours.open, hours.timeZone),
      zonedInstant(to, hours.close, hours.timeZone)
    );

    const earliest = Date.now() + MINIMUM_NOTICE_MS;
    const lastStart = minutesOf(hours.close) - hours.slotMinutes;
    const lines: string[] = [];
    let total = 0;

    for (let date = from; date <= to && total < MAX_SLOTS; date = addDays(date, 1)) {
      if (hours.closedDays.includes(dayName(date))) continue;

      const times: string[] = [];
      for (let minute = minutesOf(hours.open); minute <= lastStart && total < MAX_SLOTS; minute += hours.slotMinutes) {
        const start = zonedInstant(date, timeOf(minute), hours.timeZone);
        const end = start + hours.slotMinutes * 60 * 1000;
        if (start >= earliest && !overlaps(start, end, busy)) {
          times.push(timeOf(minute));
          total += 1;
        }
      }

      if (times.length > 0) lines.push(`${date} (${dayName(date)}): ${times.join(", ")}`);
    }

    if (lines.length === 0) return `No free slots between ${from} and ${to}.`;
    return `Free slots, ${hours.slotMinutes} minutes each, ${hours.timeZone} time:\n${lines.join("\n")}`;
  },

  async bookSlot({ config }, booking) {
    const hours = hoursFrom(config);
    if (!isDate(booking.date) || !TIME_PATTERN.test(booking.time)) {
      return "Not booked: the date has to be YYYY-MM-DD and the time HH:MM.";
    }

    const startMinute = minutesOf(booking.time);
    const endMinute = startMinute + hours.slotMinutes;
    if (
      hours.closedDays.includes(dayName(booking.date)) ||
      startMinute < minutesOf(hours.open) ||
      endMinute > minutesOf(hours.close)
    ) {
      return "Not booked: that's outside opening hours. Check free slots and offer one of those.";
    }

    const start = zonedInstant(booking.date, booking.time, hours.timeZone);
    if (start < Date.now()) {
      return "Not booked: that time has already passed. Check free slots and offer one of those.";
    }

    const end = start + hours.slotMinutes * 60 * 1000;
    if (overlaps(start, end, await busyIntervals(config.calendar_id, start, end))) {
      return "Not booked: that slot has just been taken. Check free slots and offer another.";
    }

    const response = await googleFetch(
      SCOPE,
      `${API}/calendars/${encodeURIComponent(config.calendar_id)}/events?sendUpdates=none`,
      {
        method: "POST",
        body: JSON.stringify({
          summary: `${booking.name || booking.phone} (WhatsApp booking)`,
          description: [`Phone: ${booking.phone}`, booking.note, "Booked by your Voxitron agent."]
            .filter(Boolean)
            .join("\n"),
          start: { dateTime: `${booking.date}T${booking.time}:00`, timeZone: hours.timeZone },
          end: { dateTime: `${booking.date}T${timeOf(endMinute)}:00`, timeZone: hours.timeZone },
        }),
      }
    );

    if (response.status === 403 || response.status === 404) throw new BlockError(notSharedMessage());
    if (!response.ok) {
      console.error("Google Calendar booking failed:", response.status, await response.text());
      throw new BlockError("Google Calendar didn't save that booking. Try again in a moment.");
    }

    return `Booked: ${dayName(booking.date)} ${booking.date} at ${booking.time} (${hours.timeZone} time) for ${hours.slotMinutes} minutes.`;
  },
};
