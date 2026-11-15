/** What you have earned through ChipIn, and where the same pace leads in a year. */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatSats } from "@tollbooth-dpyc/web";
import { useAppShell } from "@tollbooth-dpyc/web/react";
import GrowthChart from "../components/GrowthChart";
import Waiting from "../components/Waiting";
import { earningsOf } from "../lib/earnings";
import { asBitcoin, carriedForward, perWeek, runningTotal } from "../lib/savings";
import { listTasks, type Task } from "../lib/tasks";

export function SavingsSheet({ tasks, me, now }: { tasks: Task[]; me: string; now: number }) {
  const history = runningTotal(tasks, me);
  const { earned, coming } = earningsOf(tasks, me);
  const ahead = carriedForward(history, now);
  const pace = Math.round(perWeek(history, now));
  const inAYear = ahead[ahead.length - 1].sats;

  if (!history.length) {
    return (
      <div className="card panel empty">
        <span className="empty-picture" aria-hidden>🐷</span>
        <p className="text-xl font-semibold">Nothing saved yet.</p>
        <p className="muted">Your first paid chore starts the line.</p>
        <Link to="/chores" className="btn btn-go">Go to your chores</Link>
      </div>
    );
  }

  return (
    <>
      <div className="piggy">
        <div className="piggy-tile piggy-earned">
          <span className="piggy-label">You earned</span>
          <span className="piggy-sats num">{formatSats(earned)}</span>
          <span className="piggy-label num">₿ {asBitcoin(earned)}</span>
        </div>
        {coming > 0 && (
          <div className="piggy-tile">
            <span className="piggy-label">On its way</span>
            <span className="piggy-sats num">{formatSats(coming)}</span>
          </div>
        )}
      </div>

      <section className="card panel grid gap-2">
        <h2 className="panel-title">A year from now</h2>
        <GrowthChart history={history} ahead={ahead} now={now} />
        <dl className="facts">
          <dt>Your pace</dt><dd><span className="num">{formatSats(pace)}</span> sats a week</dd>
          <dt>In a year, at that pace</dt><dd><span className="num">{formatSats(inAYear)}</span> sats</dd>
        </dl>
        <p className="muted text-sm">The solid line is what you were paid. The dashed line is the same pace kept up.</p>
      </section>

      <section className="card panel grid gap-2">
        <h2 className="panel-title">Where these sats are</h2>
        <p>These are the sats ChipIn saw you paid for chores.</p>
        <p>They sit in your own Lightning wallet, and only your wallet app knows its balance.</p>
        <p>Open your wallet to see what you hold today.</p>
        <p className="muted">Why save? <Link to="/learn/save-some" className="ent">Save some</Link> · <Link to="/learn/why-nobody-can-make-more" className="ent">Why can nobody make more?</Link></p>
      </section>
    </>
  );
}

export default function Savings() {
  const { session } = useAppShell();
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [problem, setProblem] = useState("");
  const now = Math.floor(Date.now() / 1000);

  useEffect(() => {
    listTasks().then(setTasks, (e: Error) => setProblem(e.message));
  }, []);

  return (
    <div className="page grid gap-4">
      <h1 className="text-3xl font-bold">Savings</h1>
      {problem && <p className="card panel error">{problem}</p>}
      {!tasks && !problem && <div className="card panel"><Waiting heading="Counting your sats…" /></div>}
      {tasks && <SavingsSheet tasks={tasks} me={session.npub} now={now} />}
    </div>
  );
}
