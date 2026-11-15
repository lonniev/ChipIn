/** The front door: what ChipIn is, a few chores to show it, and where to learn more. */

import { Link } from "react-router-dom";
import SampleCard from "../components/SampleCard";
import { SAMPLE_CHORES } from "../lib/samples";

/** One of each rhythm: a daily habit, a weekly job, a big one-off, and a kindness. */
const SHOWN = [0, 2, 4, 6].map((i) => SAMPLE_CHORES[i]);

export default function Home() {
  return (
    <div className="page grid gap-4 py-6">
      <section className="card grid gap-4 p-6">
        <h1 className="text-4xl font-semibold">Chores, paid in sats.</h1>
        <div className="hero-lines">
          <p>Post a chore and what it earns.</p>
          <p>Your child does it, and you grade it.</p>
          <p>The sats go from your Lightning wallet straight to theirs.</p>
          <p>Along the way a child learns to work, to save, and what sound money is.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/signin" className="chip chip-accent">Sign in with your npub</Link>
          <Link to="/look" className="chip chip-money">Look around first</Link>
          <Link to="/guide" className="chip">How it works</Link>
          <Link to="/learn" className="chip">Learn about sats</Link>
        </div>
      </section>

      <section className="grid gap-3">
        <h2 className="section-title">Chores a family might post</h2>
        <div className="samples">{SHOWN.map((s) => <SampleCard key={s.title} sample={s} />)}</div>
        <p className="muted text-right"><Link to="/guide" className="ent">See them all</Link></p>
      </section>
    </div>
  );
}
