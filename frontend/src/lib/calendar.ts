/**
 * A family's jobs as things that happened, or will, on days: posted, taken on,
 * finished, graded, paid, due, late and missed. Pure, so a month and a day's
 * list are both made from the same events.
 */

import { eventsByDay as byDayOf } from "@tollbooth-dpyc/web";
import { isFinished } from "./moves.ts";
import type { Task } from "./tasks.ts";

export type EventKind = "posted" | "accepted" | "done" | "graded" | "paid" | "due" | "late" | "missed";

export interface JobEvent {
  at: number;
  kind: EventKind;
  task: Task;
  /** Whose doing it was: the one who posted, took, finished, graded or paid. */
  who: string;
}

/** The order a day's events read in when two fall on one moment. */
const ORDER: EventKind[] = ["posted", "accepted", "done", "graded", "paid", "due", "late", "missed"];

/** The picture each kind of event shows on a month. */
export const EVENT_MARK: Record<EventKind, string> = {
  posted: "📌",
  accepted: "🤝",
  done: "✅",
  graded: "⭐",
  paid: "💰",
  due: "📅",
  late: "⏰",
  missed: "✖️",
};

/** Everything that happened, or is due, on a family's jobs. */
export function eventsOf(tasks: Task[]): JobEvent[] {
  const out: JobEvent[] = [];
  for (const task of tasks) {
    const doer = task.performer ?? task.purchaser;
    const add = (at: number | undefined | null, kind: EventKind, who: string) => { if (at) out.push({ at, kind, task, who }); };
    add(task.created_at, "posted", task.purchaser);
    add(task.claimed_at, "accepted", doer);
    add(task.accomplished_at, "done", doer);
    add(task.assessment?.at, "graded", task.assessment?.assessor ?? task.purchaser);
    add(task.paid_at, "paid", task.purchaser);
    if (task.standing === "missed") add(task.needed_by, "missed", doer);
    else if (!isFinished(task) && !task.accomplished_at && task.days_late > 0) add(task.needed_by, "late", doer);
    else if (task.standing !== "withdrawn" && task.standing !== "rejected") add(task.needed_by, "due", doer);
  }
  return out.sort((a, b) => a.at - b.at || ORDER.indexOf(a.kind) - ORDER.indexOf(b.kind) || a.task.title.localeCompare(b.task.title));
}

/** Whether a job is this person's: they posted it, are doing it, or may take it while it is open. */
export function involves(task: Task, npub: string): boolean {
  return task.purchaser === npub || task.performer === npub
    || (task.performer === null && task.audience.includes(npub));
}

/** The events about one person's jobs, or everyone's when `npub` is empty. */
export function eventsFor(events: JobEvent[], npub: string): JobEvent[] {
  return npub ? events.filter((e) => involves(e.task, npub)) : events;
}

/** The events on each day, keyed `YYYY-MM-DD`. */
export function eventsByDay(events: JobEvent[]): Map<string, JobEvent[]> {
  return byDayOf(events, (e) => e.at);
}
