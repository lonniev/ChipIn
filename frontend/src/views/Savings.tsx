/** What you have earned through ChipIn, and where the same pace leads in a year. */

import { useEffect, useState } from "react";
import type React from "react";
import { Link } from "react-router-dom";
import { formatSats } from "@tollbooth-dpyc/web";
import { Tx, useAppShell } from "@tollbooth-dpyc/web/react";
import GrowthChart from "../components/GrowthChart";
import WorthChart from "../components/WorthChart";
import Waiting from "../components/Waiting";
import { useT, WORDS } from "../i18n";
import { useLessons } from "../lib/content";
import { useLanguageLocale } from "@tollbooth-dpyc/web/react";
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
  const t = useT();
  const locale = useLanguageLocale();
  const growth = reading ? yearlyGrowth(reading) : null;
  const points = reading ? worthAhead(ahead, reading.price, growth, now) : [];
  const end = points[points.length - 1];
  const seen = reading ? new Date(reading.observed_at * 1000).toLocaleString(locale, { dateStyle: "medium", timeStyle: "short" }) : "";
  return (
    <section className="card panel grid gap-2">
      <div className="toolbar">
        <h2 className="panel-title">{t("worth.title")}</h2>
        <div className="flex flex-wrap gap-1" role="group" aria-label={t("worth.currency")}>
          {FIATS.map((f) => (
            <button key={f} type="button" className={f === fiat ? "chip chip-on" : "chip"} aria-pressed={f === fiat} onClick={() => onFiat(f)}>{f}</button>
          ))}
        </div>
      </div>
      {problem && <p className="error text-right">{problem}</p>}
      {!reading && !problem && <p className="muted text-right">{t("worth.asking")}</p>}
      {reading && end && (
        <>
          <dl className="facts">
            <dt>{t("worth.today")}</dt><dd className="num">{asMoney(worth(earned, reading.price), fiat, locale)}</dd>
            <dt>{t("worth.oneBitcoin")}</dt><dd className="num">{asMoney(reading.price, fiat, locale)}</dd>
          </dl>
          <WorthChart points={points} fiat={fiat} grows={!!growth} />
          <dl className="facts">
            <dt>{t("worth.yearSteady")}</dt><dd className="num">{asMoney(end.steady, fiat, locale)}</dd>
            {growth && <><dt>{t("worth.yearGrown")}</dt><dd className="num">{asMoney(end.grown, fiat, locale)}</dd></>}
          </dl>
          {growth && (
            <p className="muted text-sm">
              <Tx
                ns={WORDS}
                k={growth.perYear >= 0 ? "worth.grew" : "worth.fell"}
                vars={{ years: Math.round(growth.years), fiat }}
                components={{ percent: <span className="num">{Math.abs(Math.round(growth.perYear * 100))}%</span> }}
              />
            </p>
          )}
          <p className="muted text-sm">{t("worth.nobodyKnows")}</p>
          <p className="muted text-sm">
            <Tx
              ns={WORDS}
              k="worth.priceFrom"
              vars={{ when: seen }}
              components={{ source: <a href={reading.source_url} target="_blank" rel="noopener noreferrer" className="ent">{reading.source}</a> }}
            />
          </p>
        </>
      )}
    </section>
  );
}

export function SavingsSheet({ tasks, me, now, worthPanel }: { tasks: Task[]; me: string; now: number; worthPanel?: (earned: number, ahead: { at: number; sats: number }[]) => React.ReactNode }) {
  const t = useT();
  const library = useLessons();
  const history = runningTotal(tasks, me);
  const { earned, coming } = earningsOf(tasks, me);
  const ahead = carriedForward(history, now);
  const pace = Math.round(perWeek(history, now));
  const inAYear = ahead[ahead.length - 1].sats;

  if (!history.length) {
    return (
      <div className="card panel empty">
        <span className="empty-picture" aria-hidden>🐷</span>
        <p className="text-xl font-semibold">{t("savings.nothing")}</p>
        <p className="muted">{t("savings.firstPaid")}</p>
        <Link to="/jobs" className="btn btn-go">{t("jobs.go")}</Link>
      </div>
    );
  }

  return (
    <>
      <div className="piggy">
        <div className="piggy-tile piggy-earned">
          <span className="piggy-label">{t("piggy.earned")}</span>
          <span className="piggy-sats num">{formatSats(earned)}</span>
          <span className="piggy-label num">₿ {asBitcoin(earned)}</span>
        </div>
        {coming > 0 && (
          <div className="piggy-tile">
            <span className="piggy-label">{t("piggy.coming")}</span>
            <span className="piggy-sats num">{formatSats(coming)}</span>
          </div>
        )}
      </div>

      <section className="card panel grid gap-2">
        <h2 className="panel-title">{t("savings.yearFromNow")}</h2>
        <GrowthChart history={history} ahead={ahead} now={now} />
        <dl className="facts">
          <dt>{t("savings.pace")}</dt><dd><Tx ns={WORDS} k="savings.paceValue" components={{ sats: <span className="num">{formatSats(pace)}</span> }} /></dd>
          <dt>{t("savings.inAYear")}</dt><dd className="num">{t("sats.amount", { sats: formatSats(inAYear) })}</dd>
        </dl>
        <p className="muted text-sm">{t("savings.lines")}</p>
      </section>

      {worthPanel?.(earned, ahead)}

      <section className="card panel grid gap-2">
        <h2 className="panel-title">{t("savings.where.title")}</h2>
        <p>{t("savings.where.saw")}</p>
        <p>{t("savings.where.wallet")}</p>
        <p>{t("savings.where.open")}</p>
        <p className="muted"><Tx ns={WORDS} k="savings.whySave" components={{
          saveSome: <Link to="/learn/save-some" className="ent">{library.at("save-some")?.title}</Link>,
          whyScarce: <Link to="/learn/why-nobody-can-make-more" className="ent">{library.at("why-nobody-can-make-more")?.title}</Link>,
        }} /></p>
      </section>
    </>
  );
}

export default function Savings() {
  const { session } = useAppShell();
  const t = useT();
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
      <h1 className="text-3xl font-bold">{t("savings.title")}</h1>
      {problem && <p className="card panel error">{problem}</p>}
      {!tasks && !problem && <div className="card panel"><Waiting heading={t("waiting.counting")} /></div>}
      {tasks && (
        <SavingsSheet tasks={tasks} me={session.npub} now={now} worthPanel={(earned, ahead) => (
          <WorthPanel earned={earned} ahead={ahead} now={now} fiat={fiat} onFiat={choose} reading={reading} problem={priceProblem} />
        )} />
      )}
    </div>
  );
}
