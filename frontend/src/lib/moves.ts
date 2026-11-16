/**
 * What the signed-in person may do to a job from where it stands.
 *
 * Task Booth decides what is allowed; this table only chooses which buttons a
 * page draws, from the roles Task Booth says the person holds (`your_roles`).
 */

import type { MessageKey } from "../i18n/en.ts";

export type Standing =
  | "posted" | "expired" | "claimed" | "done" | "assessed"
  | "appealed" | "owed" | "paid" | "rejected" | "withdrawn" | "missed";

export type Role = "purchaser" | "audience" | "performer" | "assessor" | "tie_breaker";

export type Move =
  | "claim" | "release" | "withdraw" | "mark_done" | "grade" | "reject"
  | "accept" | "appeal" | "decide" | "pay" | "confirm_paid";

export interface Stands {
  standing: Standing;
  /** The grade is settled: accepted, decided on appeal, or the top grade. */
  final: boolean;
  your_roles: Role[];
}

const OPEN: Partial<Record<Standing, [Move, Role[]][]>> = {
  posted: [["claim", ["audience"]], ["withdraw", ["purchaser"]]],
  expired: [["withdraw", ["purchaser"]]],
  claimed: [["mark_done", ["performer"]], ["release", ["performer", "purchaser"]]],
  done: [["grade", ["assessor"]], ["reject", ["assessor"]]],
  assessed: [["accept", ["performer"]], ["appeal", ["performer"]]],
  appealed: [["decide", ["tie_breaker"]]],
  owed: [["pay", ["purchaser"]], ["confirm_paid", ["performer"]]],
};

/** The moves open to this person, most likely first. */
export function movesFor(task: Stands): Move[] {
  if (task.standing === "assessed" && task.final) return [];
  return (OPEN[task.standing] ?? [])
    .filter(([, roles]) => roles.some((r) => task.your_roles.includes(r)))
    .map(([move]) => move);
}

/** Nothing more can happen to it. */
export function isFinished(task: Pick<Stands, "standing" | "final">): boolean {
  if (task.standing === "paid" || task.standing === "rejected" || task.standing === "withdrawn" || task.standing === "missed") return true;
  return task.standing === "assessed" && task.final;
}

export type Lane = "yours" | "waiting" | "finished";

/** Where a job sits on the list: waiting on you, waiting on someone else, or over. */
export function laneOf(task: Stands): Lane {
  if (movesFor(task).length) return "yours";
  return isFinished(task) ? "finished" : "waiting";
}

/** The message that says where a job stands. */
export const standingKey = (standing: Standing) => `standing.${standing}` as const satisfies MessageKey;

/** Its terms may still change: nobody has taken it on, and it is yours. */
export const mayEdit = (task: Pick<Stands, "standing" | "your_roles">) =>
  (task.standing === "posted" || task.standing === "expired") && task.your_roles.includes("purchaser");
