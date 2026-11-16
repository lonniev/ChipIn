/**
 * A sample family, for looking around before signing in and for look reviews.
 * Nothing here is sent to Task Booth, and none of these ids is a real key.
 */

import type { MessageKey } from "../i18n/en.ts";
import type { Member } from "./family.ts";
import type { Role, Standing } from "./moves.ts";
import type { SampleJob } from "./samples.ts";
import type { Payout, Task } from "./tasks.ts";

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

/** Where each sample job stands in this family's week: who has it, how far along, and how it was graded. */
const WEEK: { sample: number; standing: Standing; by: string | null; dueIn: number; grade?: number; final?: boolean; paidAgo?: number }[] = [
  { sample: 0, standing: "posted", by: null, dueIn: 0 },
  { sample: 1, standing: "claimed", by: SAM, dueIn: 1 },
  { sample: 3, standing: "done", by: SAM, dueIn: 0 },
  { sample: 5, standing: "assessed", by: SAM, dueIn: 2, grade: 1 },
  { sample: 2, standing: "owed", by: SAM, dueIn: -1, grade: 0, final: true },
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

/** The family's jobs as `viewer` sees them, made from the sample jobs in the language on screen. */
export function sampleTasks(viewer: Viewer, now: number, samples: ReadonlyArray<SampleJob>): Task[] {
  return WEEK.map((w, i) => {
    const sample = samples[w.sample];
    const rubric = rubricOf(sample);
    const graded = w.grade === undefined ? null : rubric.grades[w.grade];
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
      needed_by: now + w.dueIn * DAY,
      every_days: sample.everyDays,
      assessment: graded
        ? { grade: graded.name, sats: graded.sats, assessor: MOM, reasons: "", at: now - (w.paidAgo ?? 0) * DAY }
        : null,
    };
  }).filter((t) => t.your_roles.length > 0);
}

/** The invoice the sample's owed job would show. It pays nobody. */
export function samplePayout(task: Task, now: number): Payout | null {
  if (task.standing !== "owed" || !task.assessment) return null;
  const invoice = "lnbc" + "sample".repeat(30);
  return { sats: task.assessment.sats, invoice, lightning_uri: `lightning:${invoice}`, payment_hash: "0".repeat(64), expires_at: now + 3540, paid_at: null };
}
