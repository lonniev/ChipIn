/** The front door: what ChipIn does for a family, a few chores to show it, and where to learn more. */

import { Link } from "react-router-dom";
import SampleCard from "../components/SampleCard";
import { artFor } from "../lib/lessonArt";
import { usePictures } from "../lib/PicturesContext";
import { SAMPLE_CHORES } from "../lib/samples";

/** One of each rhythm: a daily habit, a weekly job, a big one-off, and a kindness. */
const SHOWN = [0, 2, 4, 6].map((i) => SAMPLE_CHORES[i]);

export default function Home() {
  const { set } = usePictures();
  const scene = artFor("earn-it", set);
  return (
    <div className="page grid gap-4 py-6">
      <section className="card grid gap-4 p-6">
        {scene && <img src={scene} alt="A mother hands her daughter a coin for sweeping the kitchen floor." className="lesson-art" width={960} height={644} />}
        <h1 className="text-4xl font-semibold">A family learns the worth of work.</h1>
        <div className="hero-lines">
          <p>Children take on chores around the home.</p>
          <p>Parents look at the work and reward a job well done.</p>
          <p>Everyone learns sound money, responsibility, and the good of a clean home.</p>
          <p>The reward is a little bitcoin, real money a child can save, give or spend.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/look" className="chip chip-money">Look around first</Link>
          <Link to="/signin" className="chip chip-accent">Start your family</Link>
          <Link to="/guide" className="chip">How it works</Link>
          <Link to="/learn" className="chip">Learn about money</Link>
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
