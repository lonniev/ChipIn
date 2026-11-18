/** Task Booth's tools, as ChipIn calls them. A job is a Task Booth task. */

import { callTool } from "@tollbooth-dpyc/web";
import type { Role, Standing } from "./moves.ts";
import type { Rubric } from "./rubric.ts";

export interface Assessment {
  grade: string;
  sats: number;
  assessor: string;
  reasons: string;
  at: number;
  appeal?: { reasons: string; at: number; first_grade?: string; first_sats?: number; decision_reasons?: string };
  /** Set when lateness took sats off: what the grade earns on time, and how much came off. */
  full_sats?: number;
  days_late?: number;
  pct_off?: number;
}

/** What happens when a job is done after its due day. */
export type LateRule = { kind: "full" } | { kind: "discount"; pct_per_day: number } | { kind: "cancel" };

export type NudgeKind = "pay" | "due";

/** A reminder sent about a job: who sent it and when. Cleared when the job moves on. */
export interface Nudge {
  by: string;
  at: number;
}

export interface Task {
  task_id: string;
  title: string;
  description: string;
  rubric: Rubric;
  purchaser: string;
  performer: string | null;
  audience: string[];
  assessors: string[];
  tie_breaker: string;
  standing: Standing;
  final: boolean;
  your_roles: Role[];
  needed_by: number;
  every_days: number;
  assessment?: Assessment | null;
  rejection?: { by: string; reasons: string; at: number } | null;
  /** When it was posted, taken on, finished and paid. */
  created_at: number;
  claimed_at?: number;
  accomplished_at?: number;
  paid_at?: number;
  late: LateRule;
  /** Whole days past the due day: to when it was done, or to now while it is being done. */
  days_late: number;
  nudges: Partial<Record<NudgeKind, Nudge>>;
}

export interface Payout {
  sats: number;
  invoice: string;
  lightning_uri: string;
  payment_hash: string;
  expires_at: number;
  paid_at: number | null;
}

export interface TaskEvent {
  seq: number;
  at: number;
  actor: string;
  action: string;
  from: string | null;
  to: string;
  grade?: string;
  sats?: number;
  reasons?: string;
}

interface Answer {
  ok?: boolean;
  error?: string;
}

/** A Task Booth answer, or its refusal raised as the sentence Task Booth gave. */
/** This site's name on the tasks it posts. Task Booth serves several sites; each lists its own tasks and every unstamped one. */
const SITE = "chipin";

async function ask<T>(tool: string, args: Record<string, unknown> = {}): Promise<T> {
  const r = await callTool<T & Answer>(tool, args);
  if (r.ok !== true) throw new Error(r.error ?? `${tool} did not answer.`);
  return r;
}

export const listTasks = async () => (await ask<{ tasks: Task[] }>("list_tasks", { site: SITE })).tasks;

export const getTask = (taskId: string) => ask<{ task: Task; payout?: Payout }>("get_task", { task_id: taskId });

export const taskHistory = async (taskId: string) =>
  (await ask<{ events: TaskEvent[] }>("task_history", { task_id: taskId })).events;

export interface NewJob {
  title: string;
  description: string;
  rubric: Rubric;
  audience: string[];
  needed_by: number;
  every_days: number;
  late: LateRule;
}

export const postTask = async (job: NewJob) => (await ask<{ task: Task }>("post_task", { ...job, site: SITE })).task;

/** Change an open job's terms. Give only what changes. */
export const editTask = async (taskId: string, changes: Partial<NewJob>) =>
  (await ask<{ task: Task }>("edit_task", { task_id: taskId, ...changes })).task;

/** Remind the other side: the performer asks to be paid, the purchaser says it is due. */
export const nudge = async (taskId: string, kind: NudgeKind) =>
  (await ask<{ task: Task }>("nudge_task", { task_id: taskId, kind })).task;

/** The moves that need nothing but the job. */
const PLAIN = {
  claim: "claim_task",
  release: "release_claim",
  withdraw: "withdraw_task",
  mark_done: "mark_done",
  accept: "accept_assessment",
  confirm_paid: "confirm_paid",
} as const;

export type PlainMove = keyof typeof PLAIN;

export const isPlain = (move: string): move is PlainMove => move in PLAIN;

export const move = async (taskId: string, what: PlainMove) =>
  (await ask<{ task: Task }>(PLAIN[what], { task_id: taskId })).task;

export const assess = async (taskId: string, grade: string, reasons: string) =>
  (await ask<{ task: Task }>("assess_task", { task_id: taskId, grade, reasons })).task;

export const decideAppeal = async (taskId: string, grade: string, reasons: string) =>
  (await ask<{ task: Task }>("decide_appeal", { task_id: taskId, grade, reasons })).task;

export const reject = async (taskId: string, reasons: string) =>
  (await ask<{ task: Task }>("reject_task", { task_id: taskId, reasons })).task;

export const appeal = async (taskId: string, reasons: string) =>
  (await ask<{ task: Task }>("appeal_assessment", { task_id: taskId, reasons })).task;

export const requestPayout = async (taskId: string) =>
  (await ask<{ payout: Payout }>("request_payout", { task_id: taskId })).payout;

/** The performer's own request for the sats, made in their wallet. */
export const handInInvoice = async (taskId: string, invoice: string) =>
  (await ask<{ payout: Payout }>("request_payout", { task_id: taskId, invoice })).payout;

export interface Feed {
  token: string;
  name: string;
  zone: string;
  created_at: number;
  fetches: number;
  last_fetch: number | null;
}

export const listFeeds = async () => (await ask<{ feeds: Feed[] }>("calendar_list")).feeds;

export const publishFeed = async (name: string, timeZone: string) =>
  (await ask<{ feed: Feed }>("calendar_publish", { name, time_zone: timeZone, site: SITE })).feed;

export const revokeFeed = async (token: string) => { await ask("calendar_revoke", { token }); };

export interface PriceReading {
  fiat: string;
  /** What one bitcoin costs. */
  price: number;
  observed_at: number;
  history: { observed_at: number; price: number }[];
  source: string;
  source_url: string;
}

export const btcPrice = async (fiat: string, years = 4) => ask<PriceReading>("btc_price", { fiat, years });
