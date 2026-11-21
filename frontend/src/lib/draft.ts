/**
 * Drafting a job from a parent's few words (Task Booth's `draft_task`, kind "chore").
 *
 * What the parent said fills the form; the suggested rewards are applied only by
 * choice; its questions and assumptions are points to settle before posting.
 */

import { callTool, checkPrice } from "@tollbooth-dpyc/web";
import { MAX_GRADE_SATS, type GradeRow } from "./rubric.ts";

/** Task Booth's frozen id for `draft_task`, for its fare. */
export const DRAFT_TASK_ID = "f076ae67-8f1d-4ff0-8a15-96cf8564a91f";
export const IDEA_MAX = 500;

export interface ChoreDraft {
  said: { title: string; brief: string; needed_by: string | null; repeat_days: number };
  proposed: { grades: { name: string; amount: number; sats: number; criteria: string }[] };
  questions: string[];
  assumptions: string[];
  currency: string;
}

interface Answer extends ChoreDraft {
  ok?: boolean;
  error?: string;
}

/** A draft of a job from `idea`, with suggested rewards in `currency` and in sats. */
export async function draftChore(idea: string, currency: string): Promise<ChoreDraft> {
  const r = await callTool<Answer>("draft_task", { idea, kind: "chore", currency }, { timeoutMs: 90_000 });
  if (r.ok !== true) throw new Error(r.error ?? "The draft did not come back.");
  return r;
}

/** What a draft costs, in api_sats; null when the fare cannot be read. */
export const draftFare = () => checkPrice(DRAFT_TASK_ID).catch(() => null);

/** The suggested rewards as the form's rows, each within what a grade may earn. */
export const gradeRowsOf = (grades: ChoreDraft["proposed"]["grades"]): GradeRow[] =>
  grades.map((g) => ({ name: g.name, sats: String(Math.min(MAX_GRADE_SATS, Math.max(0, g.sats))), criteria: g.criteria }));

/** Every question, then every assumption: the points to settle before posting. */
export const openPointsOf = (d: ChoreDraft): string[] => [...d.questions, ...d.assumptions];

/** How often a drafted job repeats, as one of the form's choices. */
export const repeatOf = (days: number): 0 | 1 | 7 => (days === 1 || days === 7 ? days : 0);

/** One settled point that carries words for the brief: a question's answer or an assumption's correction. */
export interface Answered {
  point: string;
  answer: string;
}

/**
 * `brief` with its answers section set to `answered`, under `heading`.
 *
 * The section is the brief's last part, from its heading to the end, and is rewritten whole each
 * time an answer changes; whatever the person wrote above it is kept as it is. No answers, no section.
 */
export function withAnswers(brief: string, answered: Answered[], heading: string): string {
  const marker = `\n\n### ${heading}\n`;
  const at = brief.indexOf(marker);
  const above = (at === -1 ? brief : brief.slice(0, at)).trimEnd();
  const lines = answered
    .filter((a) => a.answer.trim())
    .map((a) => `- ${a.point.trim()} **${a.answer.trim()}**`);
  return lines.length ? `${above}${marker}\n${lines.join("\n")}\n` : above;
}
