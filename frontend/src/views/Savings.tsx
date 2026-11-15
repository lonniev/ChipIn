/** What you have earned through ChipIn, and where the same pace leads in a year. */

import { useEffect, useState } from "react";
import type React from "react";
import { Link } from "react-router-dom";
import { formatSats } from "@tollbooth-dpyc/web";
import { useAppShell } from "@tollbooth-dpyc/web/react";
import GrowthChart from "../components/GrowthChart";
import WorthChart from "../components/WorthChart";
import Waiting from "../components/Waiting";
import { earningsOf } from "../lib/earnings";
import { asBitcoin, carriedForward, perWeek, runningTotal } from "../lib/savings";
import { btcPrice, listTasks, type PriceReading, type Task } from "../lib/tasks";
import { asMoney, FIATS, isFiat, worth, worthAhead, yearlyGrowth, type Fiat } from "../lib/worth";

const FIAT_KEY = "chipin:fiat";

/** The currency this device last chose, remembered here only as a convenience. */
function rememberedFiat(): Fiat {
  try {
    const kept = localStorage.getItem(FIAT_KEY);
    return isFiat(kept) ? kept : "USD";
  } catch {
    return "USD";
  }
}

/** What the sats are worth in a chosen currency, today and a year on. */
export function WorthPanel({ earned, ahead, now, fiat, onFiat, reading, problem }: {
  earned: number; ahead: { at: number; sats: number }[]; now: number; fiat: Fiat; onFiat: (f: Fiat) => void;
  reading: PriceReading | null; problem: string;
}) {
  const growth = reading ? yearlyGrowth(reading) : null;
  const points = reading ? worthAhead(ahead, reading.price, growth, now) : [];
  const end = points[points.length - 1];
  const seen = reading ? new Date(reading.observed_at * 1000).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "";
  return (
    <section className="card panel grid gap-2">
      <div className="toolbar">
        <h2 className="panel-title">In your money</h2>
        <div className="flex flex-wrap gap-1" role="group" aria-label="Currency">
          {FIATS.map((f) => (
            <button key={f} type="button" className={f === fiat ? "chip chip-on" : "chip"} aria-pressed={f === fiat} onClick={() => onFiat(f)}>{f}</button>
          ))}
        </div>
      </div>
      {problem && <p className="error text-right">{problem}</p>}
      {!reading && !problem && <p className="muted text-right">Asking what a bitcoin costs…</p>}
      {reading && end && (
        <>
          <dl className="facts">
            <dt>Worth today</dt><dd className="num">{asMoney(worth(earned, reading.price), fiat)}</dd>
            <dt>One bitcoin</dt><dd className="num">{asMoney(reading.price, fiat)}</dd>
          </dl>
          <WorthChart points={points} fiat={fiat} grows={!!growth} />
          <dl className="facts">
            <dt>In a year, at today's price</dt><dd className="num">{asMoney(end.steady, fiat)}</dd>
            {growth && <><dt>In a year, if bitcoin keeps its pace</dt><dd className="num">{asMoney(end.grown, fiat)}</dd></>}
          </dl>
          {growth && (
            <p className="muted text-sm">
              Over the last {Math.round(growth.years)} years a bitcoin's price {growth.perYear >= 0 ? "grew" : "fell"} about{" "}
              <span className="num">{Math.abs(Math.round(growth.perYear * 100))}%</span> a year in {fiat}.
            </p>
          )}
          <p className="muted text-sm">Nobody knows what it will do next. The price can fall as well as rise.</p>
          <p className="muted text-sm">
            Price from <a href={reading.source_url} target="_blank" rel="noopener noreferrer" className="ent">{reading.source}</a>, seen {seen}.
          </p>
        </>
      )}
    </section>
  );
}

export function SavingsSheet({ tasks, me, now, worthPanel }: { tasks: Task[]; me: string; now: number; worthPanel?: (earned: number, ahead: { at: number; sats: number }[]) => React.ReactNode }) {
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

      {worthPanel?.(earned, ahead)}

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

  const [fiat, setFiat] = useState<Fiat>(rememberedFiat);
  const [reading, setReading] = useState<PriceReading | null>(null);
  const [priceProblem, setPriceProblem] = useState("");

  useEffect(() => {
    listTasks().then(setTasks, (e: Error) => setProblem(e.message));
  }, []);

  useEffect(() => {
    let live = true;
    setReading(null);
    setPriceProblem("");
    btcPrice(fiat).then((r) => live && setReading(r), (e: Error) => live && setPriceProblem(e.message));
    return () => { live = false; };
  }, [fiat]);

  function choose(f: Fiat) {
    setFiat(f);
    try { localStorage.setItem(FIAT_KEY, f); } catch { /* the choice lasts this visit */ }
  }

  return (
    <div className="page grid gap-4">
      <h1 className="text-3xl font-bold">Savings</h1>
      {problem && <p className="card panel error">{problem}</p>}
      {!tasks && !problem && <div className="card panel"><Waiting heading="Counting your sats…" /></div>}
      {tasks && (
        <SavingsSheet tasks={tasks} me={session.npub} now={now} worthPanel={(earned, ahead) => (
          <WorthPanel earned={earned} ahead={ahead} now={now} fiat={fiat} onFiat={choose} reading={reading} problem={priceProblem} />
        )} />
      )}
    </div>
  );
}
