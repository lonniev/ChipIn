import { test } from "node:test";
import assert from "node:assert/strict";
import { BITCOIN_EVER, CHARACTER_LESSONS, KEEP_LEARNING, MONEY_LESSONS, SATS_PER_BITCOIN, WORDS } from "./lessons.ts";
import { CHIPIN_QUOTES } from "./quotes.ts";

const lessons = [...MONEY_LESSONS, ...CHARACTER_LESSONS];

test("a lesson is a few short sentences, one to a line", () => {
  for (const l of lessons) {
    assert.ok(l.lines.length >= 2 && l.lines.length <= 4, l.title);
    for (const line of l.lines) {
      assert.match(line, /[.!]$/, `${l.title}: "${line}"`);
      assert.ok(line.length <= 90, `${l.title}: "${line}" is long`);
    }
  }
});

test("the numbers taught are Bitcoin's own", () => {
  assert.equal(SATS_PER_BITCOIN, 100_000_000);
  assert.equal(BITCOIN_EVER, 21_000_000);
  assert.ok(MONEY_LESSONS.some((l) => l.lines.some((s) => s.includes("100,000,000"))));
  assert.ok(MONEY_LESSONS.some((l) => l.lines.some((s) => s.includes("21,000,000"))));
});

test("sayings stay the lighter part: fewer lessons carry one than money lessons do without", () => {
  assert.ok(MONEY_LESSONS.filter((l) => l.saying).length <= 1);
  for (const l of lessons) if (l.saying) assert.match(l.saying.from, /^[1-3A-Z][A-Za-z ]+ \d+:\d+$/, l.title);
});

test("every word explained is explained once, briefly", () => {
  assert.equal(new Set(WORDS.map((w) => w.word)).size, WORDS.length);
  for (const w of WORDS) assert.ok(w.means.length <= 100, w.word);
});

test("every place to keep learning is an https link", () => {
  for (const k of KEEP_LEARNING) assert.match(k.href, /^https:\/\//, k.name);
});

test("the quotations are distinct and each names where it is from", () => {
  assert.equal(new Set(CHIPIN_QUOTES.map((q) => q.text)).size, CHIPIN_QUOTES.length);
  for (const q of CHIPIN_QUOTES) assert.ok(q.text && q.author, q.text);
  const scripture = CHIPIN_QUOTES.filter((q) => /\d+:\d+/.test(q.author ?? "")).length;
  assert.ok(scripture >= 8 && scripture < CHIPIN_QUOTES.length, "scripture is well represented, with other voices beside it");
});
