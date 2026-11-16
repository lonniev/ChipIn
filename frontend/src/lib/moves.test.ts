import { test } from "node:test";
import assert from "node:assert/strict";
import english from "../i18n/en.ts";
import { isFinished, laneOf, movesFor, standingKey, type Role, type Standing } from "./moves.ts";

const at = (standing: Standing, your_roles: Role[], final = false) => ({ standing, your_roles, final });

test("a child in the audience may claim an open chore, and the parent may withdraw it", () => {
  assert.deepEqual(movesFor(at("posted", ["audience"])), ["claim"]);
  assert.deepEqual(movesFor(at("posted", ["purchaser", "assessor"])), ["withdraw"]);
});

test("an expired chore can only be withdrawn", () => {
  assert.deepEqual(movesFor(at("expired", ["audience"])), []);
  assert.deepEqual(movesFor(at("expired", ["purchaser"])), ["withdraw"]);
});

test("the performer finishes or gives back; the parent may only take back", () => {
  assert.deepEqual(movesFor(at("claimed", ["performer"])), ["mark_done", "release"]);
  assert.deepEqual(movesFor(at("claimed", ["purchaser"])), ["release"]);
});

test("only an assessor grades finished work", () => {
  assert.deepEqual(movesFor(at("done", ["assessor"])), ["grade", "reject"]);
  assert.deepEqual(movesFor(at("done", ["performer"])), []);
});

test("a grade that is not final waits for the performer; a final one waits for nobody", () => {
  assert.deepEqual(movesFor(at("assessed", ["performer"])), ["accept", "appeal"]);
  assert.deepEqual(movesFor(at("assessed", ["performer"], true)), []);
  assert.equal(isFinished(at("assessed", [], true)), true);
  assert.equal(isFinished(at("assessed", [], false)), false);
});

test("only the tie-breaker decides an appeal", () => {
  assert.deepEqual(movesFor(at("appealed", ["tie_breaker"])), ["decide"]);
  assert.deepEqual(movesFor(at("appealed", ["performer", "assessor"])), []);
});

test("an owed chore is the parent's to pay and the child's to confirm", () => {
  assert.deepEqual(movesFor(at("owed", ["purchaser"], true)), ["pay"]);
  assert.deepEqual(movesFor(at("owed", ["performer"], true)), ["confirm_paid"]);
});

test("one npub holding every role sees every move, so a parent can try it alone", () => {
  const all: Role[] = ["purchaser", "audience", "performer", "assessor", "tie_breaker"];
  assert.deepEqual(movesFor(at("posted", all)), ["claim", "withdraw"]);
  assert.deepEqual(movesFor(at("owed", all, true)), ["pay", "confirm_paid"]);
});

test("paid, rejected and withdrawn chores are finished and offer nothing", () => {
  for (const s of ["paid", "rejected", "withdrawn"] as const) {
    assert.deepEqual(movesFor(at(s, ["purchaser", "performer", "assessor", "tie_breaker", "audience"], true)), []);
    assert.equal(laneOf(at(s, ["purchaser"], true)), "finished");
  }
});

test("a chore sits with you when you can move it, and waits otherwise", () => {
  assert.equal(laneOf(at("done", ["assessor"])), "yours");
  assert.equal(laneOf(at("done", ["performer"])), "waiting");
});

test("every standing has a word to say", () => {
  const standings: Standing[] = ["posted", "expired", "claimed", "done", "assessed", "appealed", "owed", "paid", "rejected", "withdrawn"];
  for (const s of standings) assert.ok(english[standingKey(s)], s);
  assert.equal(english[standingKey("owed")], "To pay");
});
