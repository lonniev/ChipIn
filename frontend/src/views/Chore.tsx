/** One chore: where it stands, its rewards, what you may do, and the invoice when it is owed. */

import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, RefreshCw, Repeat } from "lucide-react";
import { formatSats } from "@tollbooth-dpyc/web";
import Actions from "../components/Actions";
import InvoicePanel from "../components/InvoicePanel";
import RequestPanel from "../components/RequestPanel";
import { People, PersonLink } from "../components/Links";
import StandingBadge from "../components/StandingBadge";
import Waiting from "../components/Waiting";
import { useFamily } from "../lib/FamilyContext";
import { splitPicture } from "../lib/face";
import { byReward } from "../lib/rubric";
import { waitsOnTheirRequest } from "../lib/problems";
import { getTask, requestPayout, taskHistory, type Payout, type Task, type TaskEvent } from "../lib/tasks";
import { dueText, repeatText } from "../lib/when";

function History({ taskId }: { taskId: string }) {
  const { name } = useFamily();
  const [events, setEvents] = useState<TaskEvent[] | null>(null);
  const [problem, setProblem] = useState("");

  async function open(isOpen: boolean) {
    if (!isOpen || events) return;
    try {
      setEvents(await taskHistory(taskId));
    } catch (e) {
      setProblem((e as Error).message);
    }
  }

  return (
    <details className="card panel" onToggle={(e) => void open(e.currentTarget.open)}>
      <summary className="panel-title cursor-pointer">History</summary>
      {problem && <p className="error mt-2">{problem}</p>}
      {!events && !problem && <p className="muted mt-2">Fetching…</p>}
      {events && (
        <ul className="mt-2">
          {events.map((e) => (
            <li key={e.seq} className="history-row">
              <span>{name(e.actor)} · {e.action.replace(/_/g, " ")}{e.grade ? ` · ${e.grade}` : ""}</span>
              <time className="muted num" dateTime={new Date(e.at * 1000).toISOString()}>{new Date(e.at * 1000).toLocaleString()}</time>
            </li>
          ))}
        </ul>
      )}
    </details>
  );
}

/** The chore itself: its facts, the buttons, the invoice when it is owed, and its rewards. */
export function Sheet({ task, payout, now, onChanged, onPay, onRequested = () => {}, paying = false, problem = "" }: {
  task: Task; payout: Payout | null; now: number; onChanged: (t: Task) => void; onPay: () => void;
  onRequested?: (p: Payout) => void; paying?: boolean; problem?: string;
}) {
  const graded = task.assessment;
  const { picture, rest } = splitPicture(task.title);
  const owed = task.standing === "owed";
  const mayPay = owed && task.your_roles.includes("purchaser");
  const live = payout && payout.expires_at > now ? payout : null;
  const mayAsk = owed && !live && task.your_roles.includes("performer") && !!graded;
  const waiting = waitsOnTheirRequest(problem);

  return (
    <>
      <section className="card panel grid gap-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h1 className="chore-head"><span className="chore-picture" aria-hidden>{picture || "⭐"}</span>{rest}</h1>
          <StandingBadge standing={task.standing} />
        </div>
        {task.description && <p className="whitespace-pre-wrap">{task.description}</p>}
        <dl className="facts">
          <dt>Due</dt><dd>{dueText(task.needed_by, now)}{task.every_days > 0 && <> · <Repeat size={14} aria-hidden className="inline" /> {repeatText(task.every_days)}</>}</dd>
          <dt>Posted by</dt><dd><PersonLink npub={task.purchaser} /></dd>
          {task.performer
            ? <><dt>Doing it</dt><dd><PersonLink npub={task.performer} /></dd></>
            : <><dt>Who may do it</dt><dd><People npubs={task.audience} /></dd></>}
          {graded && <><dt>Grade</dt><dd>{graded.grade} · <span className="num">{formatSats(graded.sats)} sats</span>{!task.final && " · waiting to be accepted"}</dd></>}
        </dl>
        {graded?.reasons && <p className="muted">“{graded.reasons}”</p>}
        {graded?.appeal?.reasons && <p className="muted">Appeal: “{graded.appeal.reasons}”</p>}
        {task.rejection?.reasons && <p className="muted">“{task.rejection.reasons}”</p>}
        {task.standing === "paid" && graded && (
          <p className="paid-banner"><span aria-hidden>🎉</span> Paid <span className="num">{formatSats(graded.sats)}</span> sats</p>
        )}
        <Actions task={task} onChanged={onChanged} onPay={onPay} />
        {paying && <p className="muted text-right">Asking for the invoice…</p>}
        {waiting && task.performer && !mayAsk && (
          <p className="muted text-right"><span aria-hidden>⏳</span> <PersonLink npub={task.performer} /> asks for their sats first.</p>
        )}
        {problem && !waiting && <p className="error text-right">{problem}</p>}
      </section>

      {mayAsk && graded && (
        <section className="card panel grid gap-2">
          <h2 className="panel-title">Get your sats</h2>
          <RequestPanel taskId={task.task_id} sats={graded.sats} onTaken={onRequested} />
        </section>
      )}

      {owed && live && (
        <section className="card panel grid gap-2">
          <h2 className="panel-title text-right">{mayPay ? "Pay from your wallet" : "The invoice"}</h2>
          <InvoicePanel payout={live} now={now} />
          {task.performer && (
            <p className="muted text-right text-sm">
              The sats go straight to <PersonLink npub={task.performer} />, who taps “I got it!” when they arrive.
            </p>
          )}
        </section>
      )}

      <section className="card panel">
        <h2 className="panel-title mb-1">Rewards</h2>
        <table className="ledger">
          <tbody>
            {byReward(task.rubric.grades).map((g) => (
              <tr key={g.name} className={graded?.grade === g.name ? "grade-given" : undefined}>
                <td className="font-medium">{g.name}</td>
                <td className="muted">{g.criteria}</td>
                <td className="num text-right">{formatSats(g.sats)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </>
  );
}

export default function Chore() {
  const { taskId = "" } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [payout, setPayout] = useState<Payout | null>(null);
  const [problem, setProblem] = useState("");
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const now = Math.floor(Date.now() / 1000);

  const load = useCallback(async () => {
    setLoading(true);
    setProblem("");
    try {
      const r = await getTask(taskId);
      setTask(r.task);
      setPayout(r.payout ?? null);
    } catch (e) {
      setProblem((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  useEffect(() => { void load(); }, [load]);

  async function pay() {
    setPaying(true);
    setProblem("");
    try {
      setPayout(await requestPayout(taskId));
    } catch (e) {
      setProblem((e as Error).message);
    } finally {
      setPaying(false);
    }
  }

  if (!task) {
    return (
      <div className="page">
        <div className="card panel">
          {problem ? <p className="error">{problem}</p> : <Waiting heading="Fetching the chore…" />}
        </div>
      </div>
    );
  }

  return (
    <div className="page grid gap-3">
      <div className="toolbar">
        <Link to="/chores" className="btn btn-quiet"><ArrowLeft size={22} aria-hidden />Chores</Link>
        <button type="button" className="icon-btn" onClick={() => void load()} disabled={loading} aria-label="Look again" title="Look again">
          <RefreshCw size={22} aria-hidden />
        </button>
      </div>

      <Sheet task={task} payout={payout} now={now} onChanged={setTask} onPay={() => void pay()} onRequested={setPayout} paying={paying} problem={problem} />
      {task.your_roles.some((r) => r !== "audience") && <History taskId={task.task_id} />}
    </div>
  );
}
