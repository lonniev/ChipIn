import { test } from "node:test";
import assert from "node:assert/strict";
import { gradeRowsOf, openPointsOf, repeatOf, type ChoreDraft, withAnswers } from "./draft.ts";
import { MAX_GRADE_SATS } from "./rubric.ts";

const draft: ChoreDraft = {
  said: { title: "Tidy your room", brief: "Tidy your room.", needed_by: null, repeat_days: 7 },
  proposed: { grades: [{ name: "Spotless", amount: 2, sats: 2_500, criteria: "Nothing on the floor" },
    { name: "Not done", amount: 0, sats: 0, criteria: "" }] },
  questions: ["Should the bed be made too?"],
  assumptions: ["Saturday means every Saturday."],
  currency: "USD",
};

test("suggested rewards become the form's rows", () => {
  assert.deepEqual(gradeRowsOf(draft.proposed.grades), [
    { name: "Spotless", sats: "2500", criteria: "Nothing on the floor" },
    { name: "Not done", sats: "0", criteria: "" },
  ]);
});

test("a reward is never more than a grade may earn", () => {
  assert.equal(gradeRowsOf([{ name: "Huge", amount: 1e9, sats: 5e9, criteria: "" }])[0].sats, String(MAX_GRADE_SATS));
});

test("every question and assumption is a point to settle", () => {
  assert.deepEqual(openPointsOf(draft), ["Should the bed be made too?", "Saturday means every Saturday."]);
});

test("a repeat is once, daily or weekly", () => {
  assert.equal(repeatOf(7), 7);
  assert.equal(repeatOf(1), 1);
  assert.equal(repeatOf(3), 0);
});

test("answers become the job's last section, rewritten whole", () => {
  const once = withAnswers("Tidy your room.", [{ point: "Which day?", answer: "Saturday" }], "Details");
  assert.equal(once, "Tidy your room.\n\n### Details\n\n- Which day? **Saturday**\n");
  assert.equal(withAnswers(once, [], "Details"), "Tidy your room.");
});
