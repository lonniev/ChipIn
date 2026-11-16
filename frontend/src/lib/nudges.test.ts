import { test } from "node:test";
import assert from "node:assert/strict";
import { DUE_WINDOW, NUDGE_GAP, nudgeFor, nudgeOpen, nudgeSent } from "./nudges.ts";
import type { Task } from "./tasks.ts";

const NOW = 1_800_000_000;
const job = (over: Partial<Task>): Task => ({ standing: "claimed", your_roles: [], needed_by: NOW + DUE_WINDOW, nudges: {}, ...over } as Task);

test("the one doing an owed job may ask to be paid, and the one who posted it may not", () => {
  assert.equal(nudgeOpen(job({ standing: "owed", your_roles: ["performer"] }), NOW), "pay");
  assert.equal(nudgeOpen(job({ standing: "owed", your_roles: ["purchaser"] }), NOW), null);
});

test("the one who posted may say it is due only from two days before", () => {
  const parent = { your_roles: ["purchaser" as const] };
  assert.equal(nudgeOpen(job({ ...parent, needed_by: NOW + DUE_WINDOW + 1 }), NOW), null);
  assert.equal(nudgeOpen(job({ ...parent, needed_by: NOW + DUE_WINDOW }), NOW), "due");
  assert.equal(nudgeOpen(job({ ...parent, needed_by: NOW - 5 }), NOW), "due");
  assert.equal(nudgeOpen(job({ your_roles: ["performer"], needed_by: NOW }), NOW), null);
});

test("a reminder rests twelve hours, and says it was sent meanwhile", () => {
  const sent = job({ standing: "owed", your_roles: ["performer"], nudges: { pay: { by: "x", at: NOW - NUDGE_GAP + 1 } } });
  assert.equal(nudgeOpen(sent, NOW), null);
  assert.ok(nudgeSent(sent, "pay", NOW));
  assert.equal(nudgeOpen(sent, NOW + 1), "pay");
  assert.equal(nudgeSent(sent, "pay", NOW + 1), null);
});

test("a reminder waits for the one it is meant for", () => {
  const pay = { by: "kid", at: NOW - 60 };
  assert.deepEqual(nudgeFor(job({ standing: "owed", your_roles: ["purchaser"], nudges: { pay } }), NOW), { kind: "pay", nudge: pay });
  assert.equal(nudgeFor(job({ standing: "owed", your_roles: ["performer"], nudges: { pay } }), NOW), null);
  const due = { by: "mom", at: NOW - 60 };
  assert.deepEqual(nudgeFor(job({ your_roles: ["performer"], nudges: { due } }), NOW), { kind: "due", nudge: due });
  assert.equal(nudgeFor(job({ standing: "paid", your_roles: ["purchaser"], nudges: { pay } }), NOW), null);
});
