/** Every chore you have a part in: the ones waiting on you first. */

import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, CheckCheck, Hourglass, Plus, RefreshCw, Repeat } from "lucide-react";
import { formatSats } from "@tollbooth-dpyc/web";
import Actions from "../components/Actions";
import { choreHref, PersonLink } from "../components/Links";
import StandingBadge from "../components/StandingBadge";
import Waiting from "../components/Waiting";
import { laneOf, type Lane } from "../lib/moves";
import { topSats } from "../lib/rubric";
import { listTasks, type Task } from "../lib/tasks";
import { dueText, repeatText } from "../lib/when";

const LANES: { lane: Lane; title: string; icon: typeof Bell }[] = [
  { lane: "yours", title: "Your move", icon: Bell },
  { lane: "waiting", title: "Waiting", icon: Hourglass },
  { lane: "finished", title: "Finished", icon: CheckCheck },
];

function Row({ task, now, onChanged }: { task: Task; now: number; onChanged: (t: Task) => void }) {
  const earned = task.assessment?.sats;
  return (
    <li className="chore-row">
      <div className="chore-main">
        <Link to={choreHref(task.task_id)} className="ent chore-title">{task.title}</Link>
        <div className="chore-meta muted">
          <StandingBadge standing={task.standing} />
          <span>Due {dueText(task.needed_by, now)}</span>
          {task.every_days > 0 && <span title={repeatText(task.every_days)}><Repeat size={14} aria-label={repeatText(task.every_days)} /></span>}
          {task.performer ? <PersonLink npub={task.performer} /> : <PersonLink npub={task.purchaser} />}
        </div>
      </div>
      <div className="chore-side">
        <span className="num chore-sats">{formatSats(earned ?? topSats(task.rubric))}</span>
        <Actions task={task} onChanged={onChanged} quick />
      </div>
    </li>
  );
}

export default function Chores() {
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
    <div className="page grid gap-3">
      <div className="toolbar">
        <h1 className="text-2xl font-semibold">Chores</h1>
        <div className="toolbar-actions">
          <button type="button" className="icon-btn" onClick={() => void load()} disabled={loading} aria-label="Look again" title="Look again">
            <RefreshCw size={18} aria-hidden />
          </button>
          <Link to="/chores/new" className="fab" aria-label="New chore" title="New chore"><Plus size={22} aria-hidden /></Link>
        </div>
      </div>

      {problem && <p className="card panel error">{problem}</p>}
      {loading && !tasks && <div className="card panel"><Waiting heading="Fetching the chores…" /></div>}

      {tasks && !tasks.length && (
        <div className="card panel grid gap-3 text-right">
          <p className="text-lg">No chores yet.</p>
          <div className="flex justify-end"><Link to="/chores/new" className="chip chip-accent"><Plus size={16} aria-hidden />Post the first one</Link></div>
        </div>
      )}

      {tasks && LANES.map(({ lane, title, icon: Icon }) => {
        const rows = tasks.filter((t) => laneOf(t) === lane);
        if (!rows.length) return null;
        return (
          <section key={lane} className="card panel">
            <h2 className="panel-title lane-title"><Icon size={18} aria-hidden />{title} ({rows.length})</h2>
            <ul>{rows.map((t) => <Row key={t.task_id} task={t} now={now} onChanged={changed} />)}</ul>
          </section>
        );
      })}
    </div>
  );
}
