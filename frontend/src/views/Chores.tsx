/** Every chore you have a part in: the ones waiting on you first, each a card with one big button. */

import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, CheckCheck, Hourglass, Plus, RefreshCw, Repeat } from "lucide-react";
import { formatSats } from "@tollbooth-dpyc/web";
import { useAppShell } from "@tollbooth-dpyc/web/react";
import Actions from "../components/Actions";
import { choreHref, PersonLink } from "../components/Links";
import StandingBadge from "../components/StandingBadge";
import Waiting from "../components/Waiting";
import { earningsOf } from "../lib/earnings";
import { splitPicture } from "../lib/face";
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

/** What you earned, then the chores in their lanes. */
export function Board({ tasks, me, now, onChanged }: { tasks: Task[]; me: string; now: number; onChanged: (t: Task) => void }) {
  const { earned, coming } = earningsOf(tasks, me);
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

      {LANES.map(({ lane, title, icon: Icon }) => {
        const rows = tasks.filter((t) => laneOf(t) === lane);
        if (!rows.length) return null;
        return (
          <section key={lane} className="grid gap-2">
            <h2 className="lane-title"><Icon size={22} aria-hidden />{title} ({rows.length})</h2>
            <ul className="chore-list">{rows.map((t) => <Card key={t.task_id} task={t} now={now} onChanged={onChanged} />)}</ul>
          </section>
        );
      })}
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
