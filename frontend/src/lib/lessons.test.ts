import { test } from "node:test";
import assert from "node:assert/strict";
import { BITCOIN_EVER, bookHref, CHARACTER_LESSONS, lessonAt, LESSONS, MONEY_LESSONS, SATS_PER_BITCOIN, SHELVES, WORDS } from "./lessons.ts";
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

test("every book links to its page at Good Brew, and no book is shelved twice", () => {
  const books = SHELVES.flatMap((s) => s.books);
  assert.equal(new Set(books.map((b) => b.handle)).size, books.length);
  for (const b of books) assert.match(bookHref(b), /^https:\/\/cafe\.tollbooth-dpyc\.com\/products\/[a-z0-9-]+$/, b.name);
  assert.ok(SHELVES.some((s) => /farm/i.test(s.title)));
});

test("every lesson opens into a longer telling at its own address", () => {
  assert.equal(new Set(LESSONS.map((l) => l.slug)).size, LESSONS.length);
  for (const l of LESSONS) {
    assert.match(l.slug, /^[a-z0-9-]+$/);
    assert.equal(lessonAt(l.slug), l);
    assert.ok(l.more.length >= 5, l.title);
    for (const line of l.more) assert.match(line, /[.!]$/, `${l.title}: "${line}"`);
    assert.match(l.ask, /\?$/, l.title);
    assert.ok(l.tryThis.length > 0, l.title);
  }
  assert.equal(lessonAt("no-such-lesson"), undefined);
});

test("the quotations are distinct and each names where it is from", () => {
  assert.equal(new Set(CHIPIN_QUOTES.map((q) => q.text)).size, CHIPIN_QUOTES.length);
  for (const q of CHIPIN_QUOTES) assert.ok(q.text && q.author, q.text);
  const scripture = CHIPIN_QUOTES.filter((q) => /\d+:\d+/.test(q.author ?? "")).length;
  assert.ok(scripture >= 8 && scripture < CHIPIN_QUOTES.length, "scripture is well represented, with other voices beside it");
});
