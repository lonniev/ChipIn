/**
 * Reminders about a job. A child who finished asks to be paid; a parent says a
 * due day is near. Task Booth keeps them and refuses one sent too soon; these
 * functions only choose which button and which bell a page shows.
 */

import type { Nudge, NudgeKind, Task } from "./tasks.ts";

/** The least time between two reminders of one kind about one job. */
export const NUDGE_GAP = 12 * 3600;
/** A parent may say a job is due from two days before its due day. */
export const DUE_WINDOW = 2 * 86_400;

type Nudgeable = Pick<Task, "standing" | "your_roles" | "needed_by" | "nudges">;

const rested = (sent: Nudge | undefined, now: number) => !sent || now - sent.at >= NUDGE_GAP;

/** The reminder this person may send about this job now, if any. */
export function nudgeOpen(task: Nudgeable, now: number): NudgeKind | null {
  if (task.standing === "owed" && task.your_roles.includes("performer") && rested(task.nudges?.pay, now)) return "pay";
  if (task.standing === "claimed" && task.your_roles.includes("purchaser")
    && task.needed_by - now <= DUE_WINDOW && rested(task.nudges?.due, now)) return "due";
  return null;
}

/** When the reminder of this kind was sent and is still resting, so the button says so rather than vanishing. */
export function nudgeSent(task: Nudgeable, kind: NudgeKind, now: number): Nudge | null {
  const sent = task.nudges?.[kind];
  return sent && !rested(sent, now) ? sent : null;
}

/** A reminder waiting for this person: to pay (for the one who posted it) or that it is due (for the one doing it). */
export function nudgeFor(task: Nudgeable, now: number): { kind: NudgeKind; nudge: Nudge } | null {
  const pay = task.nudges?.pay;
  if (pay && task.standing === "owed" && task.your_roles.includes("purchaser")) return { kind: "pay", nudge: pay };
  const due = task.nudges?.due;
  if (due && task.standing === "claimed" && task.your_roles.includes("performer") && now >= due.at) return { kind: "due", nudge: due };
  return null;
}
