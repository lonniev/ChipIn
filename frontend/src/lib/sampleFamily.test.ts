import { test } from "node:test";
import assert from "node:assert/strict";
import { laneOf, movesFor } from "./moves.ts";
import { earningsOf } from "./earnings.ts";
import { MUM, SAM, samplePayout, sampleTasks } from "./sampleFamily.ts";

const NOW = 1_800_000_000;

test("Sam sees chores he may take, chores he is doing, and what he was paid", () => {
  const tasks = sampleTasks("sam", NOW);
  assert.ok(tasks.every((t) => t.performer === SAM || t.performer === null));
  assert.ok(tasks.some((t) => movesFor(t).includes("claim")));
  assert.ok(tasks.some((t) => movesFor(t).includes("mark_done")));
  assert.ok(tasks.some((t) => movesFor(t).includes("accept")));
  const { earned, coming } = earningsOf(tasks, SAM);
  assert.ok(earned > 0 && coming > 0);
});

test("Mum sees every chore, with work to check and a chore to pay", () => {
  const tasks = sampleTasks("mum", NOW);
  assert.equal(tasks.length, 11);
  assert.ok(tasks.every((t) => t.purchaser === MUM));
  assert.ok(tasks.some((t) => movesFor(t).includes("grade")));
  assert.ok(tasks.some((t) => movesFor(t).includes("pay")));
});

test("every lane has something in it for both of them", () => {
  for (const viewer of ["sam", "mum"] as const) {
    const lanes = new Set(sampleTasks(viewer, NOW).map(laneOf));
    assert.deepEqual([...lanes].sort(), ["finished", "waiting", "yours"], viewer);
  }
});

test("each sample chore has its own id, and only the owed one has an invoice", () => {
  const tasks = sampleTasks("mum", NOW);
  assert.equal(new Set(tasks.map((t) => t.task_id)).size, tasks.length);
  assert.equal(tasks.filter((t) => samplePayout(t, NOW)).length, 1);
});

test("the sample's ids and invoice are plainly not real", () => {
  assert.match(SAM, /^npub1p+$/);
  assert.match(samplePayout(sampleTasks("mum", NOW).find((t) => t.standing === "owed")!, NOW)!.invoice, /^lnbc(sample)+$/);
});
