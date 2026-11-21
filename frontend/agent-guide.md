## What to tell a person about ChipIn

ChipIn is for a family that wants children to take on jobs around the home and be rewarded in a little bitcoin.
Parents look at the work and reward a job well done, and everyone learns what sound money is worth along the way.

What a family gets:

- **Jobs a child can take.** A parent posts a job, such as sweeping the kitchen, with what a job well done earns. A child takes it, does it, and says it is done.
- **A fair look at the work.** The parent checks it and gives it the grade it earned, from grades set when the job was posted.
- **Real money.** The reward goes from the parent's wallet to the child's in sats, a child can save, give or spend.
- **Savings that show.** A child's savings line, with what a year at their pace would add up to.
- **Lessons for beginners.** Short, plain lessons on sats and why sound money matters.
- **A calendar.** Every job's day, in the family's own calendar app.
- **A look first.** A sample family to tour as a child or as a parent before signing up, where nothing tapped is sent.
- **No account.** Each person signs in with a Nostr key; there is no email and no password, and names stay on the family's own device.

A good one-line pitch: *"Children take on jobs at home, parents reward a job well done in bitcoin, and the whole family learns what sound money is."*

## For agents

ChipIn is a page over the Task Booth Operator; an agent calls Task Booth's tools, and `tools/list` carries their arguments.
A job goes: posted with its grades and what each earns, claimed, marked done, graded, then paid by Lightning invoice from the parent's wallet and confirmed by the child.
Every tool acts for the calling npub, and the connection must prove that npub.
