import { test } from "node:test";
import assert from "node:assert/strict";
import { translate } from "@tollbooth-dpyc/web";
import { registerChipIn, say, WORDS, type Translate } from "../i18n/index.ts";
import { dayFrom, dueText as dueSaid, endOfDay, repeatText as repeatSaid } from "./when.ts";

// As a page says them, in English.
await registerChipIn();
const t: Translate = (key, vars) => translate(key, vars, WORDS);
const dueText = (neededBy: number, now: number) => say(t, dueSaid(neededBy, now));
const repeatText = (everyDays: number) => say(t, repeatSaid(everyDays));

const noon = (y: number, m: number, d: number) => Math.floor(new Date(y, m - 1, d, 12).getTime() / 1000);

test("due times read as days from today", () => {
  const now = noon(2026, 11, 15);
  assert.equal(dueText(endOfDay("2026-11-15")!, now), "today");
  assert.equal(dueText(endOfDay("2026-11-16")!, now), "tomorrow");
  assert.equal(dueText(endOfDay("2026-11-18")!, now), "in 3 days");
  assert.equal(dueText(endOfDay("2026-11-14")!, now), "yesterday");
  assert.equal(dueText(endOfDay("2026-11-11")!, now), "4 days ago");
});

test("a job due late tonight is still due today early this morning", () => {
  const early = Math.floor(new Date(2026, 10, 15, 0, 5).getTime() / 1000);
  assert.equal(dueText(endOfDay("2026-11-15")!, early), "today");
});

test("the end of a day is its last second, and a day that does not exist is refused", () => {
  const end = new Date(endOfDay("2026-11-15")! * 1000);
  assert.deepEqual([end.getDate(), end.getHours(), end.getMinutes(), end.getSeconds()], [15, 23, 59, 59]);
  assert.equal(endOfDay("2026-02-30"), null);
  assert.equal(endOfDay("tomorrow"), null);
});

test("a date field's day crosses a month end", () => {
  assert.equal(dayFrom(noon(2026, 11, 29), 2), "2026-12-01");
  assert.equal(dayFrom(noon(2026, 11, 15), 0), "2026-11-15");
});

test("what is said is a message and its numbers, so any language can say it", () => {
  const now = noon(2026, 11, 15);
  assert.deepEqual(dueSaid(endOfDay("2026-11-18")!, now), { key: "due.inDays", vars: { days: 3 } });
  assert.deepEqual(dueSaid(endOfDay("2026-11-11")!, now), { key: "due.daysAgo", vars: { days: 4 } });
  assert.equal(repeatSaid(0), null);
  assert.deepEqual(repeatSaid(3), { key: "repeat.everyDays", vars: { days: 3 } });
});

test("repeats read plainly", () => {
  assert.equal(repeatText(0), "");
  assert.equal(repeatText(1), "Every day");
  assert.equal(repeatText(7), "Every week");
  assert.equal(repeatText(3), "Every 3 days");
});
