import { test } from "node:test";
import assert from "node:assert/strict";
import { asMoney, isFiat, worth, worthAhead, yearlyGrowth } from "./worth.ts";

const NOW = 1_800_000_000, YEAR = 365 * 86_400;

test("a hundred thousand sats at 60,000 a bitcoin is 60", () => {
  assert.equal(worth(100_000, 60_000), 60);
  assert.equal(worth(0, 60_000), 0);
});

test("a price that doubled in two years grew about 41% a year", () => {
  const g = yearlyGrowth({ price: 60_000, observed_at: NOW, history: [{ observed_at: NOW - YEAR, price: 45_000 }, { observed_at: NOW - 2 * YEAR, price: 30_000 }] });
  assert.ok(g && Math.abs(g.perYear - (Math.SQRT2 - 1)) < 1e-9);
  assert.ok(g && Math.abs(g.years - 2) < 1e-9);
});

test("a price that fell shows as a fall", () => {
  const g = yearlyGrowth({ price: 30_000, observed_at: NOW, history: [{ observed_at: NOW - YEAR, price: 60_000 }] });
  assert.ok(g && Math.abs(g.perYear + 0.5) < 1e-9);
});

test("with no history, or too little, there is no growth to speak of", () => {
  assert.equal(yearlyGrowth({ price: 60_000, observed_at: NOW, history: [] }), null);
  assert.equal(yearlyGrowth({ price: 60_000, observed_at: NOW, history: [{ observed_at: NOW - 86_400, price: 59_000 }] }), null);
  assert.equal(yearlyGrowth({ price: 60_000, observed_at: NOW, history: [{ observed_at: NOW - YEAR, price: 0 }] }), null);
});

test("ahead, the same sats are worth more only if the price grows", () => {
  const ahead = [{ at: NOW, sats: 100_000 }, { at: NOW + YEAR, sats: 200_000 }];
  const out = worthAhead(ahead, 60_000, { perYear: 0.5, years: 4 }, NOW);
  assert.deepEqual(out[0], { at: NOW, steady: 60, grown: 60 });
  assert.equal(out[1].steady, 120);
  assert.ok(Math.abs(out[1].grown - 180) < 1e-9);
  const flat = worthAhead(ahead, 60_000, null, NOW);
  assert.equal(flat[1].grown, flat[1].steady);
});

test("only the currencies the price feed quotes are offered", () => {
  assert.equal(isFiat("EUR"), true);
  assert.equal(isFiat("XAU"), false);
  assert.equal(isFiat(undefined), false);
});

test("money keeps its cents while small", () => {
  assert.match(asMoney(1.234, "USD"), /1\.23/);
  assert.doesNotMatch(asMoney(1234.5, "USD"), /\./);
});
