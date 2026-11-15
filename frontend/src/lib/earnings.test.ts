import { test } from "node:test";
import assert from "node:assert/strict";
import { earningsOf } from "./earnings.ts";

const ME = "npub1me";

test("paid chores are earned and owed chores are coming", () => {
  const tasks = [
    { performer: ME, standing: "paid", assessment: { sats: 1000 } },
    { performer: ME, standing: "paid", assessment: { sats: 250 } },
    { performer: ME, standing: "owed", assessment: { sats: 500 } },
  ];
  assert.deepEqual(earningsOf(tasks, ME), { earned: 1250, coming: 500 });
});

test("a grade not yet final, a rejected chore and someone else's chore count for nothing", () => {
  const tasks = [
    { performer: ME, standing: "assessed", assessment: { sats: 800 } },
    { performer: ME, standing: "rejected", assessment: null },
    { performer: "npub1other", standing: "paid", assessment: { sats: 9000 } },
    { performer: null, standing: "posted" },
  ];
  assert.deepEqual(earningsOf(tasks, ME), { earned: 0, coming: 0 });
});

test("nobody signed in has earned nothing, even from unclaimed chores", () => {
  assert.deepEqual(earningsOf([{ performer: "", standing: "paid", assessment: { sats: 5 } }], ""), { earned: 0, coming: 0 });
});
