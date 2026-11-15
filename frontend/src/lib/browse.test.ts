import { test } from "node:test";
import assert from "node:assert/strict";
import { byDay, dayKey, grouped, kindOf, matches, monthWeeks, personOf, shiftMonth, type Browsable } from "./browse.ts";

const MUM = "npub1mum", SAM = "npub1sam", ADA = "npub1ada";
const names: Record<string, string> = { [MUM]: "Mum", [SAM]: "Sam", [ADA]: "Ada" };
const name = (n: string) => names[n] ?? n;
const at = (y: number, m: number, d: number) => Math.floor(new Date(y, m - 1, d, 23, 59, 59).getTime() / 1000);

const chore = (id: string, title: string, more: Partial<Browsable> = {}): Browsable => ({
  task_id: id, title, description: "", purchaser: MUM, performer: SAM, standing: "claimed", needed_by: at(2026, 11, 20), ...more,
});

const sweep = chore("1", "🧹 Sweep the kitchen floor", { description: "After supper.", needed_by: at(2026, 11, 18) });
const bins = chore("2", "🗑️ Take the bins to the kerb", { performer: ADA, needed_by: at(2026, 11, 19), standing: "owed" });
const weed = chore("3", "🌱 Weed the front flower bed", { performer: null, standing: "posted", needed_by: at(2026, 11, 21) });
const porch = chore("4", "🧹 Sweep the porch", { performer: ADA, needed_by: at(2026, 11, 17) });
const all = [sweep, bins, weed, porch];

test("search finds a chore by its title, its details, a person's name, or where it stands", () => {
  const found = (q: string) => all.filter((t) => matches(t, q, name)).map((t) => t.task_id);
  assert.deepEqual(found("sweep"), ["1", "4"]);
  assert.deepEqual(found("supper"), ["1"]);
  assert.deepEqual(found("ada"), ["2", "4"]);
  assert.deepEqual(found("to pay"), ["2"]);
  assert.deepEqual(found("SWEEP ada"), ["4"]);
  assert.deepEqual(found("   "), ["1", "2", "3", "4"]);
  assert.deepEqual(found("dragon"), []);
});

test("a chore's kind is its picture, and its person is whoever is doing it or else who posted it", () => {
  assert.equal(kindOf(sweep), "🧹");
  assert.equal(kindOf(chore("9", "Tidy up")), "⭐");
  assert.equal(personOf(sweep), SAM);
  assert.equal(personOf(weed), MUM);
});

test("by due is one section, soonest first", () => {
  const g = grouped(all, "due", name);
  assert.equal(g.length, 1);
  assert.deepEqual(g[0].rows.map((t) => t.task_id), ["4", "1", "2", "3"]);
  assert.deepEqual(grouped([], "due", name), []);
});

test("by person is a section per person in name order, soonest first inside", () => {
  const g = grouped(all, "person", name);
  assert.deepEqual(g.map((s) => name(s.key)), ["Ada", "Mum", "Sam"]);
  assert.deepEqual(g[0].rows.map((t) => t.task_id), ["4", "2"]);
});

test("by kind is a section per picture", () => {
  const g = grouped(all, "kind", name);
  assert.deepEqual(g.find((s) => s.key === "🧹")?.rows.map((t) => t.task_id), ["4", "1"]);
  assert.equal(g.length, 3);
});

test("a month is whole weeks, Sunday first, holding every one of its days once", () => {
  const nov = monthWeeks(2026, 10);
  assert.ok(nov.every((w) => w.length === 7));
  assert.equal(nov[0][0].key, "2026-11-01");
  assert.equal(nov.flat().filter((d) => d.inMonth).length, 30);
  const feb = monthWeeks(2026, 1);
  assert.equal(feb.length, 4);
  assert.equal(feb.flat().filter((d) => d.inMonth).length, 28);
  const aug = monthWeeks(2026, 7);
  assert.equal(aug.length, 6);
  assert.equal(aug[0][0].inMonth, false);
});

test("chores land on the local day they are due", () => {
  const days = byDay(all);
  assert.deepEqual(days.get("2026-11-18")?.map((t) => t.task_id), ["1"]);
  assert.equal(dayKey(at(2026, 1, 5)), "2026-01-05");
});

test("the month before January is December of the year before", () => {
  assert.deepEqual(shiftMonth(2026, 0, -1), { year: 2025, month: 11 });
  assert.deepEqual(shiftMonth(2026, 11, 1), { year: 2027, month: 0 });
});
