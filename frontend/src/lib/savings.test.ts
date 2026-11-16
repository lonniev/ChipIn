import { test } from "node:test";
import assert from "node:assert/strict";
import { asBitcoin, carriedForward, perWeek, runningTotal } from "./savings.ts";

const ME = "npub1me", WEEK = 7 * 86_400, T0 = 1_800_000_000;
const paid = (sats: number, at: number, more = {}) => ({ performer: ME, standing: "paid", assessment: { sats, at }, ...more });

test("only jobs paid to you count, oldest first, as a running total", () => {
  const tasks = [paid(500, T0 + WEEK), paid(300, T0), paid(900, T0, { performer: "npub1other" }), paid(700, T0, { standing: "owed" })];
  assert.deepEqual(runningTotal(tasks, ME), [{ at: T0, sats: 300 }, { at: T0 + WEEK, sats: 800 }]);
  assert.deepEqual(runningTotal(tasks, ""), []);
});

test("the pace is sats per week since the first payment", () => {
  const history = runningTotal([paid(1000, T0), paid(1000, T0 + 2 * WEEK)], ME);
  assert.equal(perWeek(history, T0 + 4 * WEEK), 500);
  assert.equal(perWeek([], T0), 0);
});

test("a first job paid today counts as one week's pace", () => {
  assert.equal(perWeek(runningTotal([paid(300, T0)], ME), T0 + 60), 300);
});

test("carried forward, a year at 500 a week adds about 26,000", () => {
  const history = runningTotal([paid(1000, T0), paid(1000, T0 + 2 * WEEK)], ME);
  const ahead = carriedForward(history, T0 + 4 * WEEK);
  assert.equal(ahead.length, 13);
  assert.equal(ahead[0].sats, 2000);
  assert.ok(Math.abs(ahead[12].sats - (2000 + 500 * (365 / 7))) < 2);
  assert.ok(ahead.every((p, i) => i === 0 || p.sats >= ahead[i - 1].sats));
});

test("nothing earned carries forward as nothing", () => {
  assert.ok(carriedForward([], T0).every((p) => p.sats === 0));
});

test("sats read as bitcoin to eight places", () => {
  assert.equal(asBitcoin(1000), "0.00001000");
  assert.equal(asBitcoin(100_000_000), "1.00000000");
  assert.equal(asBitcoin(0), "0.00000000");
});
