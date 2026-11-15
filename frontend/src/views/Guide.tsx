/** How a chore goes, in six steps. */

import { BadgeCheck, Check, ClipboardList, Hand, ThumbsUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const STEPS = [
  { icon: ClipboardList, title: "Post", says: "A parent posts a chore, who may do it, and what each grade earns." },
  { icon: Hand, title: "Claim", says: "A child taps “I'll do it!”." },
  { icon: Check, title: "Do it", says: "The child does the chore and taps “I'm done!”." },
  { icon: ThumbsUp, title: "Grade", says: "The parent checks the work and picks a grade." },
  { icon: Zap, title: "Pay", says: "The parent pays the invoice from their own Lightning wallet." },
  { icon: BadgeCheck, title: "Paid", says: "The child taps “I got it!” when the sats arrive." },
];

export default function Guide() {
  return (
    <div className="page grid gap-3">
      <h1 className="text-2xl font-semibold">How it works</h1>
      <ol className="steps">
        {STEPS.map(({ icon: Icon, title, says }, i) => (
          <li key={title} className="card panel step">
            <span className="step-mark"><Icon size={22} aria-hidden />{i + 1}</span>
            <div>
              <h2 className="panel-title">{title}</h2>
              <p className="muted">{says}</p>
            </div>
          </li>
        ))}
      </ol>
      <section className="card panel grid gap-2">
        <h2 className="panel-title">Good to know</h2>
        <p>Everyone signs in with their own npub.</p>
        <p>Any Lightning wallet works. When a chore is owed, the person who did it asks their wallet for the sats and pastes the request in. A Lightning address on their <Link to="/profile" className="ent">Profile</Link> skips that step.</p>
        <p>The sats go from the parent's wallet straight to the child's.</p>
        <p>A child who disagrees with a grade may ask for one more look.</p>
        <p>You can post a chore to yourself to try it.</p>
      </section>
    </div>
  );
}
