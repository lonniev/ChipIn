## What ChipIn is for

A household posts chores and pays for them in sats.
ChipIn is a page over the Task Queue Operator; an agent uses Task Queue's tools directly.

## A chore, start to finish

`taskqueue_post_task` posts it with a rubric: the grades, and the sats each one earns.
`taskqueue_claim_task` and `taskqueue_mark_done` are the performer's.
`taskqueue_assess_task` gives the grade.
`taskqueue_request_payout` returns a Lightning invoice for exactly the grade's sats, which the purchaser pays from their own wallet.
A performer with no `payout_address` passes their own invoice for that amount as `invoice`.
`taskqueue_confirm_paid` is the performer saying the sats arrived.

Every tool acts for the calling npub, and the connection must prove that npub.
