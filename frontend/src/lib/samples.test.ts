import { test } from "node:test";
import assert from "node:assert/strict";
import { CHORE_PICTURES } from "./face.ts";
import { rubricFrom } from "./rubric.ts";
import { SAMPLE_CHORES } from "./samples.ts";

test("every sample can be posted as it stands", () => {
  for (const s of SAMPLE_CHORES) {
    assert.ok(CHORE_PICTURES.includes(s.picture), `${s.title}: picture`);
    const made = rubricFrom(s.rows);
    assert.ok("rubric" in made, `${s.title}: ${"problem" in made ? made.problem : ""}`);
    assert.ok(s.title.length <= 180, s.title);
  }
});

test("every sample says when, where and how to finish, one sentence to a line", () => {
  for (const s of SAMPLE_CHORES) {
    const lines = s.description.split("\n");
    assert.ok(lines.length >= 3, `${s.title}: needs when, where and how to finish`);
    for (const line of lines) assert.match(line, /\.$/, `${s.title}: "${line}"`);
  }
});

test("every paying grade says what earns it", () => {
  for (const s of SAMPLE_CHORES) {
    for (const row of s.rows) {
      if (Number(row.sats) > 0) assert.ok(row.criteria.length > 0, `${s.title}: ${row.name}`);
    }
  }
});

test("the samples show more than one kind of chore and more than one rhythm", () => {
  assert.ok(new Set(SAMPLE_CHORES.map((s) => s.kind)).size >= 5);
  assert.deepEqual([...new Set(SAMPLE_CHORES.map((s) => s.everyDays))].sort(), [0, 1, 7]);
});
