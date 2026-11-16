/**
 * Finding chores in a long list: search them, order them, and lay them on a
 * month. Pure functions over the list Task Booth gave.
 */

import { splitPicture } from "./face.ts";
import type { Standing } from "./moves.ts";

export interface Browsable {
  task_id: string;
  title: string;
  description: string;
  purchaser: string;
  performer: string | null;
  standing: Standing;
  needed_by: number;
}

export type Order = "due" | "person" | "kind";

/** A chore's kind is its picture; a chore with none is a star. */
export function kindOf(task: Pick<Browsable, "title">): string {
  return splitPicture(task.title).picture || "⭐";
}

/** Whose chore it is: the one doing it, or the one who posted it while nobody has taken it. */
export function personOf(task: Pick<Browsable, "performer" | "purchaser">): string {
  return task.performer ?? task.purchaser;
}

/**
 * Every word typed is found somewhere in the chore: its title, details, people or standing.
 * `standing` says where a chore stands in the language on screen.
 */
export function matches(task: Browsable, query: string, name: (npub: string) => string, standing: (s: Standing) => string): boolean {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const hay = [task.title, task.description, name(task.purchaser), task.performer ? name(task.performer) : "", standing(task.standing)]
    .join(" ").toLowerCase();
  return words.every((w) => hay.includes(w));
}

export interface Group<T> {
  key: string;
  rows: T[];
}

/**
 * The chores in sections, soonest due first inside each.
 * By person, sections go by name; by kind, by picture; by due, one section.
 */
export function grouped<T extends Browsable>(tasks: T[], order: Order, name: (npub: string) => string): Group<T>[] {
  const byDue = [...tasks].sort((a, b) => a.needed_by - b.needed_by || a.title.localeCompare(b.title));
  if (order === "due") return byDue.length ? [{ key: "", rows: byDue }] : [];
  const keyOf = order === "person" ? (t: T) => personOf(t) : (t: T) => kindOf(t);
  const found = new Map<string, T[]>();
  for (const t of byDue) found.set(keyOf(t), [...(found.get(keyOf(t)) ?? []), t]);
  const label = order === "person" ? name : (k: string) => k;
  return [...found.entries()]
    .map(([key, rows]) => ({ key, rows }))
    .sort((a, b) => label(a.key).localeCompare(label(b.key)));
}

const two = (n: number) => String(n).padStart(2, "0");

/** The local `YYYY-MM-DD` a time falls on. */
export function dayKey(seconds: number): string {
  const d = new Date(seconds * 1000);
  return `${d.getFullYear()}-${two(d.getMonth() + 1)}-${two(d.getDate())}`;
}

export interface MonthDay {
  /** `YYYY-MM-DD`. */
  key: string;
  day: number;
  /** Belongs to the month shown, as against the days that pad its first and last weeks. */
  inMonth: boolean;
}

/** The weeks of a month, Sunday first, padded to whole weeks. `month` is 0 to 11. */
export function monthWeeks(year: number, month: number): MonthDay[][] {
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());
  const weeks: MonthDay[][] = [];
  for (let d = new Date(start); weeks.length < 6; ) {
    const week: MonthDay[] = [];
    for (let i = 0; i < 7; i++) {
      week.push({ key: `${d.getFullYear()}-${two(d.getMonth() + 1)}-${two(d.getDate())}`, day: d.getDate(), inMonth: d.getMonth() === month });
      d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    }
    if (weeks.length >= 4 && !week.some((x) => x.inMonth)) break;
    weeks.push(week);
  }
  return weeks;
}

/** The chores due on each day, keyed `YYYY-MM-DD`. */
export function byDay<T extends Pick<Browsable, "needed_by">>(tasks: T[]): Map<string, T[]> {
  const days = new Map<string, T[]>();
  for (const t of tasks) days.set(dayKey(t.needed_by), [...(days.get(dayKey(t.needed_by)) ?? []), t]);
  return days;
}

/** The month before or after: `{ year, month }` with month 0 to 11. */
export function shiftMonth(year: number, month: number, by: number): { year: number; month: number } {
  const d = new Date(year, month + by, 1);
  return { year: d.getFullYear(), month: d.getMonth() };
}
