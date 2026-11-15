/** Task Queue's tools, as ChipIn calls them. A chore is a Task Queue task. */

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

/** A Task Queue answer, or its refusal raised as the sentence Task Queue gave. */
async function ask<T>(tool: string, args: Record<string, unknown> = {}): Promise<T> {
  const r = await callTool<T & Answer>(tool, args);
  if (r.ok !== true) throw new Error(r.error ?? `${tool} did not answer.`);
  return r;
}

export const listTasks = async () => (await ask<{ tasks: Task[] }>("list_tasks")).tasks;

export const getTask = (taskId: string) => ask<{ task: Task; payout?: Payout }>("get_task", { task_id: taskId });

export const taskHistory = async (taskId: string) =>
  (await ask<{ events: TaskEvent[] }>("task_history", { task_id: taskId })).events;

export interface NewChore {
  title: string;
  description: string;
  rubric: Rubric;
  audience: string[];
  needed_by: number;
  every_days: number;
}

export const postTask = async (chore: NewChore) => (await ask<{ task: Task }>("post_task", { ...chore })).task;

/** The moves that need nothing but the chore. */
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
