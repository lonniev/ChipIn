import { test } from "node:test";
import assert from "node:assert/strict";
import { needsPayoutAddress } from "./problems.ts";

test("the Operator's payout refusal is recognised", () => {
  assert.equal(
    needsPayoutAddress('Set your payout_address first, so you can be paid: taskqueue_set_my_property(name="payout_address", value="name@wallet.example").'),
    true,
  );
});

test("any other refusal is shown as it came", () => {
  assert.equal(needsPayoutAddress("This chore is already taken."), false);
  assert.equal(needsPayoutAddress(""), false);
});
