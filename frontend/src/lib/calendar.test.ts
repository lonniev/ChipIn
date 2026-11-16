import { test } from "node:test";
import assert from "node:assert/strict";
import { samples as englishSamples } from "../content/en/samples.ts";
import { eventsByDay, eventsFor, eventsOf, involves } from "./calendar.ts";
import { dayKey } from "./browse.ts";
import { ADA, MOM, SAM, sampleTasks } from "./sampleFamily.ts";
import { samplesIn } from "./samples.ts";

const NOW = 1_800_000_000;
const DAY = 86_400;
const family = sampleTasks("mom", NOW, samplesIn(englishSamples));

test("every stage a job reached is an event, in time order", () => {
  const events = eventsOf(family);
  const kinds = new Set(events.map((e) => e.kind));
  for (const kind of ["posted", "accepted", "done", "graded", "paid", "due", "late", "missed"]) assert.ok(kinds.has(kind as never), kind);
  for (let i = 1; i < events.length; i++) assert.ok(events[i - 1].at <= events[i].at);
});

test("a paid job tells its whole story: posted, taken, done, graded, paid, and when it was due", () => {
  const paid = family.find((t) => t.standing === "paid")!;
  const story = eventsOf([paid]).map((e) => e.kind);
  assert.deepEqual([...story].sort(), ["accepted", "done", "due", "graded", "paid", "posted"]);
});

test("a late job shows as late on its due day, a missed one as missed, never also as due", () => {
  const late = family.find((t) => t.standing === "claimed" && t.days_late > 0)!;
  const lateKinds = eventsOf([late]).map((e) => e.kind);
  assert.ok(lateKinds.includes("late") && !lateKinds.includes("due"));
  const missed = family.find((t) => t.standing === "missed")!;
  const missedKinds = eventsOf([missed]).map((e) => e.kind);
  assert.ok(missedKinds.includes("missed") && !missedKinds.includes("due"));
  assert.equal(eventsOf([missed]).find((e) => e.kind === "missed")!.at, missed.needed_by);
});

test("each event names who did it", () => {
  const paid = family.find((t) => t.standing === "paid")!;
  const by = Object.fromEntries(eventsOf([paid]).map((e) => [e.kind, e.who]));
  assert.equal(by.posted, MOM);
  assert.equal(by.accepted, SAM);
  assert.equal(by.done, SAM);
  assert.equal(by.graded, MOM);
  assert.equal(by.paid, MOM);
});

test("one person's calendar holds the jobs they posted, do, or may still take", () => {
  const open = family.find((t) => t.performer === null)!;
  assert.ok(involves(open, SAM) && involves(open, ADA) && involves(open, MOM));
  const adas = family.find((t) => t.performer === ADA)!;
  assert.ok(involves(adas, ADA) && !involves(adas, SAM));
  const events = eventsOf(family);
  assert.equal(eventsFor(events, "").length, events.length);
  assert.ok(eventsFor(events, SAM).every((e) => involves(e.task, SAM)));
  assert.ok(eventsFor(events, SAM).length < events.length);
});

test("a day holds exactly the events that fall on it", () => {
  const days = eventsByDay(eventsOf(family));
  const today = days.get(dayKey(NOW)) ?? [];
  assert.ok(today.every((e) => dayKey(e.at) === dayKey(NOW)));
  const total = [...days.values()].reduce((n, list) => n + list.length, 0);
  assert.equal(total, eventsOf(family).length);
  assert.ok(days.has(dayKey(NOW - 2 * DAY)), "the missed job's day");
});
