## What ChipIn is for

A household posts chores and pays for them in sats.
ChipIn is a page over the Task Booth Operator; an agent uses Task Booth's tools directly.

## A chore, start to finish

`taskbooth_post_task` posts it with a rubric: the grades, and the sats each one earns.
`taskbooth_claim_task` and `taskbooth_mark_done` are the performer's.
`taskbooth_assess_task` gives the grade.
`taskbooth_request_payout` returns a Lightning invoice for exactly the grade's sats, which the purchaser pays from their own wallet.
A performer with no `payout_address` passes their own invoice for that amount as `invoice`.
`taskbooth_confirm_paid` is the performer saying the sats arrived.

Every tool acts for the calling npub, and the connection must prove that npub.
