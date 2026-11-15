/** Times as a household says them. Task Queue speaks Unix seconds. */

const DAY = 86_400;

/** The local calendar day a time falls on, as days since the epoch in local time. */
function dayNumber(seconds: number): number {
  const d = new Date(seconds * 1000);
  return Math.round(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / (DAY * 1000));
}

/** "today", "tomorrow", "in 3 days", "yesterday", "4 days ago". */
export function dueText(neededBy: number, now: number): string {
  const days = dayNumber(neededBy) - dayNumber(now);
  if (days === 0) return "today";
  if (days === 1) return "tomorrow";
  if (days === -1) return "yesterday";
  return days > 0 ? `in ${days} days` : `${-days} days ago`;
}

/** The last second of a `YYYY-MM-DD` day in this device's time zone, or null. */
export function endOfDay(date: string): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 23, 59, 59);
  if (d.getMonth() !== Number(m[2]) - 1) return null;
  return Math.floor(d.getTime() / 1000);
}

/** `YYYY-MM-DD` for the local day `days` from `now`, for a date field. */
export function dayFrom(now: number, days: number): string {
  const d = new Date(now * 1000);
  d.setDate(d.getDate() + days);
  const two = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${two(d.getMonth() + 1)}-${two(d.getDate())}`;
}

export function repeatText(everyDays: number): string {
  if (everyDays <= 0) return "";
  if (everyDays === 1) return "Every day";
  if (everyDays === 7) return "Every week";
  return `Every ${everyDays} days`;
}
