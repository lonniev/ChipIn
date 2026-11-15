/** Every chore you have a part in: the ones waiting on you first, each a card with one big button. */

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Bell, CalendarDays, CheckCheck, Hourglass, List, Plus, RefreshCw, Repeat, Search, X } from "lucide-react";
import { formatSats } from "@tollbooth-dpyc/web";
import { useAppShell } from "@tollbooth-dpyc/web/react";
import Actions from "../components/Actions";
import { PersonLink, useChoreHref } from "../components/Links";
import MonthCalendar from "../components/MonthCalendar";
import PiggyBank from "../components/PiggyBank";
import StandingBadge from "../components/StandingBadge";
import Waiting from "../components/Waiting";
import { grouped, matches, type Order } from "../lib/browse";
import { earningsOf } from "../lib/earnings";
import { splitPicture } from "../lib/face";
import { useFamily } from "../lib/FamilyContext";
import { laneOf, type Lane } from "../lib/moves";
import { topSats } from "../lib/rubric";
import { listTasks, type Task } from "../lib/tasks";
import { dueText, repeatText } from "../lib/when";

const LANES: { lane: Lane; title: string; icon: typeof Bell }[] = [
  { lane: "yours", title: "Your turn", icon: Bell },
  { lane: "waiting", title: "Waiting", icon: Hourglass },
  { lane: "finished", title: "Finished", icon: CheckCheck },
];

function Card({ task, now, onChanged }: { task: Task; now: number; onChanged: (t: Task) => void }) {
  const { picture, rest } = splitPicture(task.title);
  const who = task.performer ?? task.purchaser;
  const choreHref = useChoreHref();
  return (
    <li className={`chore chore-${laneOf(task)}`}>
      <Link to={choreHref(task.task_id)} className="chore-open">
        <span className="chore-picture" aria-hidden>{picture || "⭐"}</span>
        <span className="chore-words">
          <span className="chore-title">{rest}</span>
          <span className="chore-meta muted">
            <StandingBadge standing={task.standing} />
            <span>{dueText(task.needed_by, now)}</span>
            {task.every_days > 0 && <Repeat size={16} aria-label={repeatText(task.every_days)} />}
          </span>
        </span>
        <span className="coin num">{formatSats(task.assessment?.sats ?? topSats(task.rubric))}</span>
      </Link>
      <div className="chore-foot">
        <PersonLink npub={who} />
        <Actions task={task} onChanged={onChanged} quick />
      </div>
    </li>
  );
}

const ORDERS: { order: Order; label: string }[] = [
  { order: "due", label: "Due" },
  { order: "person", label: "Person" },
  { order: "kind", label: "Kind" },
];

/** Search, order and the month view appear once the list is long enough to need them. */
const BROWSE_FROM = 4;

/** What you earned, a way to find a chore, then the chores: in lanes, in sections, or on a month. */
export function Board({ tasks, me, now, onChanged }: { tasks: Task[]; me: string; now: number; onChanged: (t: Task) => void }) {
  const { earned, coming } = earningsOf(tasks, me);
  const { name } = useFamily();
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<Order>("due");
  const [month, setMonth] = useState(false);

  const found = tasks.filter((t) => matches(t, query, name));
  const list = (rows: Task[]): ReactNode => (
    <ul className="chore-list">{rows.map((t) => <Card key={t.task_id} task={t} now={now} onChanged={onChanged} />)}</ul>
  );
  const byDue = grouped(found, "due", name)[0]?.rows ?? [];

  return (
    <>
      {(earned > 0 || coming > 0) && (
        <div className="piggy">
          <div className="piggy-tile piggy-earned">
            <span className="piggy-label">You earned</span>
            <span className="piggy-sats num">{formatSats(earned)}</span>
          </div>
          {coming > 0 && (
            <div className="piggy-tile">
              <span className="piggy-label">On its way</span>
              <span className="piggy-sats num">{formatSats(coming)}</span>
            </div>
          )}
        </div>
      )}

      {tasks.length >= BROWSE_FROM && (
        <div className="browse">
          <label className="browse-search">
            <Search size={22} aria-hidden />
            <input className="field" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a chore" aria-label="Find a chore" />
            {query && (
              <button type="button" className="icon-btn" onClick={() => setQuery("")} aria-label="Clear" title="Clear"><X size={22} aria-hidden /></button>
            )}
          </label>
          <div className="browse-picks">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Order by">
              {ORDERS.map((o) => (
                <button key={o.order} type="button" className={!month && order === o.order ? "pick pick-on" : "pick"} aria-pressed={!month && order === o.order}
                  onClick={() => { setOrder(o.order); setMonth(false); }}>
                  {o.label}
                </button>
              ))}
            </div>
            <button type="button" className={month ? "pick pick-on" : "pick"} aria-pressed={month} onClick={() => setMonth((v) => !v)}>
              {month ? <List size={20} aria-hidden /> : <CalendarDays size={20} aria-hidden />}
              {month ? "List" : "Month"}
            </button>
          </div>
        </div>
      )}

      {query && !found.length && <p className="card panel muted">No chore matches “{query}”.</p>}

      {month && <MonthCalendar tasks={found} now={now} renderDay={list} />}

      {!month && order === "due" && LANES.map(({ lane, title, icon: Icon }) => {
        const rows = byDue.filter((t) => laneOf(t) === lane);
        if (!rows.length) return null;
        return (
          <section key={lane} className="grid gap-2">
            <h2 className="lane-title"><Icon size={22} aria-hidden />{title} ({rows.length})</h2>
            {list(rows)}
          </section>
        );
      })}

      {!month && order !== "due" && grouped(found, order, name).map((g) => (
        <section key={g.key} className="grid gap-2">
          <h2 className="lane-title">
            {order === "person" ? <PersonLink npub={g.key} /> : <span className="kind-mark" aria-hidden>{g.key}</span>}
            <span>({g.rows.length})</span>
          </h2>
          {list(g.rows)}
        </section>
      ))}

      <PiggyBank earned={earned} coming={coming} />
    </>
  );
}

export default function Chores() {
  const { session } = useAppShell();
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [problem, setProblem] = useState("");
  const [loading, setLoading] = useState(true);
  const now = Math.floor(Date.now() / 1000);

  const load = useCallback(async () => {
    setLoading(true);
    setProblem("");
    try {
      setTasks(await listTasks());
    } catch (e) {
      setProblem((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const changed = (next: Task) => setTasks((list) => (list ?? []).map((t) => (t.task_id === next.task_id ? next : t)));

  return (
    <div className="page grid gap-4">
      <div className="toolbar">
        <h1 className="text-3xl font-bold">Chores</h1>
        <div className="toolbar-actions">
          <button type="button" className="icon-btn" onClick={() => void load()} disabled={loading} aria-label="Look again" title="Look again">
            <RefreshCw size={22} aria-hidden />
          </button>
          <Link to="/chores/new" className="fab" aria-label="New chore" title="New chore"><Plus size={28} aria-hidden /></Link>
        </div>
      </div>

      {problem && <p className="card panel error">{problem}</p>}
      {loading && !tasks && <div className="card panel"><Waiting heading="Fetching the chores…" /></div>}

      {tasks && !tasks.length && (
        <div className="card panel empty">
          <span className="empty-picture" aria-hidden>🧹</span>
          <p className="text-xl font-semibold">No chores yet.</p>
          <Link to="/chores/new" className="btn btn-go"><Plus size={22} aria-hidden />Post the first one</Link>
        </div>
      )}

      {tasks && tasks.length > 0 && <Board tasks={tasks} me={session.npub} now={now} onChanged={changed} />}
    </div>
  );
}
