/**
 * Refusals the Operator words for an agent, which ChipIn says its own way.
 */

/** The Operator will not let someone take a chore until it knows where to pay them. */
export function needsPayoutAddress(message: string): boolean {
  return /payout_address/.test(message);
}
