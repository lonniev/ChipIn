/**
 * What someone has earned through ChipIn over time, and where that pace leads.
 * Every number comes from their own paid jobs; nothing is assumed.
 */

const WEEK = 7 * 86_400;

interface Earned {
  performer: string | null;
  standing: string;
  assessment?: { sats: number; at: number } | null;
}

export interface Point {
  /** Unix seconds. */
  at: number;
  /** Sats held by then. */
  sats: number;
}

/** Each payment received, oldest first, as a running total. */
export function runningTotal(tasks: Earned[], me: string): Point[] {
  let sats = 0;
  return tasks
    .filter((t) => !!me && t.performer === me && t.standing === "paid" && t.assessment)
    .map((t) => ({ at: t.assessment!.at, sats: t.assessment!.sats }))
    .sort((a, b) => a.at - b.at)
    .map((p) => ({ at: p.at, sats: (sats += p.sats) }));
}

/**
 * Sats earned per week, from the first payment to now.
 * Less than a week of history counts as one week, so a first job does not read as a fortune.
 */
export function perWeek(history: Point[], now: number): number {
  if (!history.length) return 0;
  const weeks = Math.max(1, (now - history[0].at) / WEEK);
  return history[history.length - 1].sats / weeks;
}

/** The same pace carried forward: one point a month for `months` months. */
export function carriedForward(history: Point[], now: number, months = 12): Point[] {
  const held = history.length ? history[history.length - 1].sats : 0;
  const rate = perWeek(history, now);
  return Array.from({ length: months + 1 }, (_, i) => {
    const at = now + Math.round((i * 365 * 86_400) / 12);
    return { at, sats: Math.round(held + (rate * (at - now)) / WEEK) };
  });
}

/** Sats as bitcoin, to eight places: 1,000 sats is "0.00001000". */
export function asBitcoin(sats: number): string {
  return (sats / 100_000_000).toFixed(8);
}
