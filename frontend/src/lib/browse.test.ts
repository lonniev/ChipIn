import { test } from "node:test";
import assert from "node:assert/strict";
import english from "../i18n/en.ts";
import { standingKey, type Standing } from "./moves.ts";
import { dayKey } from "@tollbooth-dpyc/web";
import { byDay, grouped, kindOf, matches, personOf, type Browsable } from "./browse.ts";

const MOM = "npub1mum", SAM = "npub1sam", ADA = "npub1ada";
const names: Record<string, string> = { [MOM]: "Mom", [SAM]: "Sam", [ADA]: "Ada" };
const name = (n: string) => names[n] ?? n;
const standing = (s: Standing) => english[standingKey(s)];
const at = (y: number, m: number, d: number) => Math.floor(new Date(y, m - 1, d, 23, 59, 59).getTime() / 1000);

const job = (id: string, title: string, more: Partial<Browsable> = {}): Browsable => ({
  task_id: id, title, description: "", purchaser: MOM, performer: SAM, standing: "claimed", needed_by: at(2026, 11, 20), ...more,
});

const sweep = job("1", "🧹 Sweep the kitchen floor", { description: "After supper.", needed_by: at(2026, 11, 18) });
const bins = job("2", "🗑️ Take the trash cans to the curb", { performer: ADA, needed_by: at(2026, 11, 19), standing: "owed" });
const weed = job("3", "🌱 Weed the front flower bed", { performer: null, standing: "posted", needed_by: at(2026, 11, 21) });
const porch = job("4", "🧹 Sweep the porch", { performer: ADA, needed_by: at(2026, 11, 17) });
const all = [sweep, bins, weed, porch];

test("search finds a job by its title, its details, a person's name, or where it stands", () => {
  const found = (q: string) => all.filter((t) => matches(t, q, name, standing)).map((t) => t.task_id);
  assert.deepEqual(found("sweep"), ["1", "4"]);
  assert.deepEqual(found("supper"), ["1"]);
  assert.deepEqual(found("ada"), ["2", "4"]);
  assert.deepEqual(found("to pay"), ["2"]);
  assert.deepEqual(found("SWEEP ada"), ["4"]);
  assert.deepEqual(found("   "), ["1", "2", "3", "4"]);
  assert.deepEqual(found("dragon"), []);
});

test("a job's kind is its picture, and its person is whoever is doing it or else who posted it", () => {
  assert.equal(kindOf(sweep), "🧹");
  assert.equal(kindOf(job("9", "Tidy up")), "⭐");
  assert.equal(personOf(sweep), SAM);
  assert.equal(personOf(weed), MOM);
});

test("by due is one section, soonest first", () => {
  const g = grouped(all, "due", name);
  assert.equal(g.length, 1);
  assert.deepEqual(g[0].rows.map((t) => t.task_id), ["4", "1", "2", "3"]);
  assert.deepEqual(grouped([], "due", name), []);
});

test("by person is a section per person in name order, soonest first inside", () => {
  const g = grouped(all, "person", name);
  assert.deepEqual(g.map((s) => name(s.key)), ["Ada", "Mom", "Sam"]);
  assert.deepEqual(g[0].rows.map((t) => t.task_id), ["4", "2"]);
});

test("by kind is a section per picture", () => {
  const g = grouped(all, "kind", name);
  assert.deepEqual(g.find((s) => s.key === "🧹")?.rows.map((t) => t.task_id), ["4", "1"]);
  assert.equal(g.length, 3);
});

test("jobs land on the local day they are due", () => {
  const days = byDay(all);
  assert.deepEqual(days.get("2026-11-18")?.map((t) => t.task_id), ["1"]);
  assert.equal(dayKey(at(2026, 1, 5)), "2026-01-05");
});
