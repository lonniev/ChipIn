import { test } from "node:test";
import assert from "node:assert/strict";
import { isNpub, membersFrom, nameOf, shortNpub, withMember, withoutMember } from "./family.ts";

const A = "npub1" + "q".repeat(58);
const B = "npub1" + "p".repeat(58);

test("an npub is npub1 and 58 bech32 characters", () => {
  assert.equal(isNpub(A), true);
  assert.equal(isNpub(` ${A} `), true);
  assert.equal(isNpub("npub1short"), false);
  assert.equal(isNpub("nsec1" + "q".repeat(58)), false);
  assert.equal(isNpub("npub1" + "b".repeat(58)), false);
});

test("adding the same npub again renames it", () => {
  const list = withMember(withMember([], A, "Sam"), A, "Samantha");
  assert.deepEqual(list, [{ npub: A, name: "Samantha" }]);
});

test("a member with no name or a bad npub is not added", () => {
  assert.deepEqual(withMember([], A, "  "), []);
  assert.deepEqual(withMember([], "npub1nope", "Sam"), []);
});

test("members sort by name, and removing one leaves the rest", () => {
  const list = withMember(withMember([], A, "Zoe"), B, "Abe");
  assert.deepEqual(list.map((m) => m.name), ["Abe", "Zoe"]);
  assert.deepEqual(withoutMember(list, B), [{ npub: A, name: "Zoe" }]);
});

test("a person is You, their name here, or a short npub", () => {
  const list = withMember([], A, "Sam");
  assert.equal(nameOf(list, A, B, "You"), "Sam");
  assert.equal(nameOf(list, A, A, "You"), "You");
  assert.equal(nameOf(list, B, A, "You"), shortNpub(B));
  assert.equal(shortNpub(B), "npub1pppp…pppp");
});

test("stored names that are not well formed are dropped", () => {
  assert.deepEqual(membersFrom("nonsense"), []);
  assert.deepEqual(membersFrom([null, { npub: 7, name: "x" }, { npub: A, name: "Sam" }, { npub: "bad", name: "y" }]),
    [{ npub: A, name: "Sam" }]);
});
