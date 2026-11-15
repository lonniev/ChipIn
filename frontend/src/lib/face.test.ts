import { test } from "node:test";
import assert from "node:assert/strict";
import { hueOf, initialOf, splitPicture } from "./face.ts";

test("an npub keeps its colour", () => {
  assert.equal(hueOf("npub1abc"), hueOf("npub1abc"));
  assert.ok(hueOf("npub1abc") >= 0 && hueOf("npub1abc") < 360);
});

test("an initial is the first letter, capital, and a blank name is a question mark", () => {
  assert.equal(initialOf(" sam"), "S");
  assert.equal(initialOf("You"), "Y");
  assert.equal(initialOf("  "), "?");
});

test("a title's picture is split from its words", () => {
  assert.deepEqual(splitPicture("🧹 Sweep the porch"), { picture: "🧹", rest: "Sweep the porch" });
  assert.deepEqual(splitPicture("🛏️ Make your bed"), { picture: "🛏️", rest: "Make your bed" });
  assert.deepEqual(splitPicture("Sweep the porch"), { picture: "", rest: "Sweep the porch" });
});
