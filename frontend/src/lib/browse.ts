/**
 * Finding jobs in a long list: search them, order them, and put them on their
 * days. Pure functions over the list Task Booth gave.
 */

import { dayKey } from "@tollbooth-dpyc/web";
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

/** A job's kind is its picture; a job with none is a star. */
export function kindOf(task: Pick<Browsable, "title">): string {
  return splitPicture(task.title).picture || "⭐";
}

/** Whose job it is: the one doing it, or the one who posted it while nobody has taken it. */
export function personOf(task: Pick<Browsable, "performer" | "purchaser">): string {
  return task.performer ?? task.purchaser;
}

/**
 * Every word typed is found somewhere in the job: its title, details, people or standing.
 * `standing` says where a job stands in the language on screen.
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
 * The jobs in sections, soonest due first inside each.
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

/** The jobs due on each day, keyed `YYYY-MM-DD`. */
export function byDay<T extends Pick<Browsable, "needed_by">>(tasks: T[]): Map<string, T[]> {
  const days = new Map<string, T[]>();
  for (const t of tasks) days.set(dayKey(t.needed_by), [...(days.get(dayKey(t.needed_by)) ?? []), t]);
  return days;
}
