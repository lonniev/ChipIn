/**
 * A sample family, for looking around before signing in and for look reviews.
 * Nothing here is sent to Task Booth, and none of these ids is a real key.
 */

import type { MessageKey } from "../i18n/en.ts";
import type { Member } from "./family.ts";
import type { Role, Standing } from "./moves.ts";
import type { SampleJob } from "./samples.ts";
import type { LateRule, NudgeKind, Payout, Task } from "./tasks.ts";

const sampleId = (c: string) => "npub1" + c.repeat(58);
export const MOM = sampleId("q");
export const SAM = sampleId("p");
export const ADA = sampleId("z");

/** The sample family, named in the language on screen. */
export function sampleMembers(name: (key: MessageKey) => string): Member[] {
  return [
    { npub: MOM, name: name("sample.member.mom") },
    { npub: SAM, name: name("sample.member.sam") },
    { npub: ADA, name: name("sample.member.ada") },
  ];
}

export type Viewer = "sam" | "mom";
export const viewerNpub = (viewer: Viewer) => (viewer === "mom" ? MOM : SAM);

const DAY = 86_400;
const HOUR = 3_600;

interface Week {
  sample: number;
  standing: Standing;
  by: string | null;
  dueIn: number;
  grade?: number;
  final?: boolean;
  paidAgo?: number;
  late?: LateRule;
  /** A reminder already sent, and who sent it. */
  nudge?: { kind: NudgeKind; by: string };
}

/** Where each sample job stands in this family's week: who has it, how far along, how it was graded, and how lateness counts. */
const WEEK: Week[] = [
  { sample: 0, standing: "posted", by: null, dueIn: 0 },
  { sample: 1, standing: "claimed", by: SAM, dueIn: 1 },
  { sample: 4, standing: "claimed", by: SAM, dueIn: -1, late: { kind: "discount", pct_per_day: 10 } },
  { sample: 6, standing: "missed", by: SAM, dueIn: -2, final: true, late: { kind: "cancel" } },
  { sample: 3, standing: "done", by: SAM, dueIn: 0 },
  { sample: 5, standing: "assessed", by: SAM, dueIn: 2, grade: 1 },
  { sample: 2, standing: "owed", by: SAM, dueIn: -1, grade: 0, final: true, nudge: { kind: "pay", by: SAM } },
  { sample: 4, standing: "posted", by: null, dueIn: 4 },
  { sample: 6, standing: "claimed", by: ADA, dueIn: 5 },
  { sample: 0, standing: "paid", by: SAM, dueIn: -3, grade: 0, final: true, paidAgo: 3 },
  { sample: 3, standing: "paid", by: SAM, dueIn: -9, grade: 0, final: true, paidAgo: 9 },
  { sample: 1, standing: "paid", by: SAM, dueIn: -16, grade: 0, final: true, paidAgo: 16 },
  { sample: 2, standing: "paid", by: SAM, dueIn: -24, grade: 1, final: true, paidAgo: 24 },
];

function rolesOf(viewer: Viewer, performer: string | null): Role[] {
  if (viewer === "mom") return ["purchaser", "assessor", "tie_breaker"];
  if (performer === SAM) return ["performer"];
  return performer === null ? ["audience"] : [];
}

function rubricOf(sample: SampleJob) {
  return { grades: sample.rows.map((r) => ({ name: r.name, sats: Number(r.sats), criteria: r.criteria })), appeal: "" };
}

const FINISHED: Standing[] = ["done", "assessed", "appealed", "owed", "paid"];

/** Whole days past the due day, any part of a day counting as one. */
const daysPast = (neededBy: number, at: number) => (at <= neededBy ? 0 : Math.ceil((at - neededBy) / DAY));

/** When each step of a sample job happened, made up but in order: posted, taken, done, graded, paid. */
function timesOf(w: Week, now: number, neededBy: number) {
  const paidAt = w.paidAgo === undefined ? undefined : now - w.paidAgo * DAY;
  const gradedAt = w.grade === undefined ? undefined : paidAt !== undefined ? paidAt - 2 * HOUR : now - 6 * HOUR;
  const doneAt = FINISHED.includes(w.standing) ? (gradedAt ?? now) - 3 * HOUR : undefined;
  const createdAt = Math.min(now - HOUR, neededBy - 3 * DAY);
  const claimedAt = w.by ? createdAt + 2 * HOUR : undefined;
  return { createdAt, claimedAt, doneAt, gradedAt, paidAt };
}

/** The family's jobs as `viewer` sees them, made from the sample jobs in the language on screen. */
export function sampleTasks(viewer: Viewer, now: number, samples: ReadonlyArray<SampleJob>): Task[] {
  return WEEK.map((w, i) => {
    const sample = samples[w.sample];
    const rubric = rubricOf(sample);
    const graded = w.grade === undefined ? null : rubric.grades[w.grade];
    const neededBy = now + w.dueIn * DAY;
    const at = timesOf(w, now, neededBy);
    return {
      task_id: `sample-${i + 1}`,
      title: `${sample.picture} ${sample.title}`,
      description: sample.description,
      rubric,
      purchaser: MOM,
      performer: w.by,
      audience: [SAM, ADA],
      assessors: [MOM],
      tie_breaker: MOM,
      standing: w.standing,
      final: w.final ?? false,
      your_roles: rolesOf(viewer, w.by),
      needed_by: neededBy,
      every_days: sample.everyDays,
      assessment: graded && at.gradedAt !== undefined
        ? { grade: graded.name, sats: graded.sats, assessor: MOM, reasons: "", at: at.gradedAt }
        : null,
      created_at: at.createdAt,
      claimed_at: at.claimedAt,
      accomplished_at: at.doneAt,
      paid_at: at.paidAt,
      late: w.late ?? { kind: "full" },
      days_late: at.doneAt !== undefined ? daysPast(neededBy, at.doneAt) : w.standing === "claimed" ? daysPast(neededBy, now) : 0,
      nudges: w.nudge ? { [w.nudge.kind]: { by: w.nudge.by, at: now - 2 * HOUR } } : {},
    };
  }).filter((t) => t.your_roles.length > 0);
}

/** The invoice the sample's owed job would show. It pays nobody. */
export function samplePayout(task: Task, now: number): Payout | null {
  if (task.standing !== "owed" || !task.assessment) return null;
  const invoice = "lnbc" + "sample".repeat(30);
  return { sats: task.assessment.sats, invoice, lightning_uri: `lightning:${invoice}`, payment_hash: "0".repeat(64), expires_at: now + 3540, paid_at: null };
}
