import { test } from "node:test";
import assert from "node:assert/strict";
import { laneOf, movesFor } from "./moves.ts";
import { earningsOf } from "./earnings.ts";
import { samples as englishSamples } from "../content/en/samples.ts";
import { translate } from "@tollbooth-dpyc/web";
import { registerChipIn, WORDS, type Translate } from "../i18n/index.ts";
import { MOM, SAM, sampleMembers, samplePayout, sampleTasks as tasksFrom, type Viewer } from "./sampleFamily.ts";
import { samplesIn } from "./samples.ts";

await registerChipIn();
const t: Translate = (key, vars) => translate(key, vars, WORDS);
const sampleTasks = (viewer: Viewer, now: number) => tasksFrom(viewer, now, samplesIn(englishSamples));

const NOW = 1_800_000_000;

test("Sam sees jobs he may take, jobs he is doing, and what he was paid", () => {
  const tasks = sampleTasks("sam", NOW);
  assert.ok(tasks.every((t) => t.performer === SAM || t.performer === null));
  assert.ok(tasks.some((t) => movesFor(t).includes("claim")));
  assert.ok(tasks.some((t) => movesFor(t).includes("mark_done")));
  assert.ok(tasks.some((t) => movesFor(t).includes("accept")));
  const { earned, coming } = earningsOf(tasks, SAM);
  assert.ok(earned > 0 && coming > 0);
});

test("Mom sees every job, with work to check and a job to pay", () => {
  const tasks = sampleTasks("mom", NOW);
  assert.equal(tasks.length, 11);
  assert.ok(tasks.every((t) => t.purchaser === MOM));
  assert.ok(tasks.some((t) => movesFor(t).includes("grade")));
  assert.ok(tasks.some((t) => movesFor(t).includes("pay")));
});

test("every lane has something in it for both of them", () => {
  for (const viewer of ["sam", "mom"] as const) {
    const lanes = new Set(sampleTasks(viewer, NOW).map(laneOf));
    assert.deepEqual([...lanes].sort(), ["finished", "waiting", "yours"], viewer);
  }
});

test("each sample job has its own id, and only the owed one has an invoice", () => {
  const tasks = sampleTasks("mom", NOW);
  assert.equal(new Set(tasks.map((t) => t.task_id)).size, tasks.length);
  assert.equal(tasks.filter((t) => samplePayout(t, NOW)).length, 1);
});

test("the sample's ids and invoice are plainly not real", () => {
  assert.match(SAM, /^npub1p+$/);
  assert.match(samplePayout(sampleTasks("mom", NOW).find((t) => t.standing === "owed")!, NOW)!.invoice, /^lnbc(sample)+$/);
});

test("the sample family is named in the language on screen", () => {
  assert.deepEqual(sampleMembers(t).map((m) => m.name), ["Mom", "Sam", "Ada"]);
});
