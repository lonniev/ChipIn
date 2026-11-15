import { test } from "node:test";
import assert from "node:assert/strict";
import { byReward, rubricFrom, STARTER_ROWS, topSats } from "./rubric.ts";

test("the starter rows make a rubric worth 1000 sats at most", () => {
  const made = rubricFrom(STARTER_ROWS);
  assert.ok("rubric" in made);
  assert.equal(topSats(made.rubric), 1000);
  assert.deepEqual(made.rubric.grades.map((g) => g.sats), [1000, 500, 0]);
});

test("blank rows are dropped, and a form of only blank rows is refused", () => {
  const made = rubricFrom([{ name: "Done", sats: "250", criteria: "" }, { name: " ", sats: "", criteria: "x" }]);
  assert.ok("rubric" in made);
  assert.equal(made.rubric.grades.length, 1);
  assert.deepEqual(rubricFrom([{ name: "", sats: "", criteria: "" }]), { problem: "Add at least one grade." });
});

test("sats must be a whole number that is not negative", () => {
  for (const sats of ["-5", "1.5", "lots", "1e3", ""]) {
    const made = rubricFrom([{ name: "Done", sats, criteria: "" }]);
    assert.ok("problem" in made, sats);
  }
});

test("two grades cannot share a name, whatever the capitals", () => {
  const made = rubricFrom([{ name: "Done", sats: "1", criteria: "" }, { name: "done", sats: "2", criteria: "" }]);
  assert.deepEqual(made, { problem: 'Two grades are named "done".' });
});

test("a grade worth more than the Operator allows is refused here first", () => {
  assert.ok("problem" in rubricFrom([{ name: "Done", sats: "100000001", criteria: "" }]));
  assert.ok("rubric" in rubricFrom([{ name: "Done", sats: "100000000", criteria: "" }]));
});

test("rewards read highest first without changing the rubric", () => {
  const grades = [{ name: "b", sats: 1, criteria: "" }, { name: "a", sats: 9, criteria: "" }];
  assert.deepEqual(byReward(grades).map((g) => g.name), ["a", "b"]);
  assert.equal(grades[0].name, "b");
});
