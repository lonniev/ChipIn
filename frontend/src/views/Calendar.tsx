/** The family's jobs on a month: when each was posted, taken on, done, graded and paid, and when it is due. */

import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import { useAppShell } from "@tollbooth-dpyc/web/react";
import { Face, useJobHref } from "../components/Links";
import MonthCalendar from "../components/MonthCalendar";
import { NudgeBell, NudgeButton } from "../components/Nudges";
import StandingBadge from "../components/StandingBadge";
import Waiting from "../components/Waiting";
import { say, useT } from "../i18n";
import { EVENT_MARK, eventsFor, eventsOf, type JobEvent } from "../lib/calendar";
import { splitPicture } from "../lib/face";
import { useFamily } from "../lib/FamilyContext";
import { listTasks, type Task } from "../lib/tasks";
import { lateText } from "../lib/when";

/** One thing that happened on the picked day: what, to which job, and the reminder it allows. */
function Happening({ event, now, onChanged }: { event: JobEvent; now: number; onChanged: (t: Task) => void }) {
  const t = useT();
  const { name } = useFamily();
  const jobHref = useJobHref();
  const { picture, rest } = splitPicture(event.task.title);
  const late = event.kind === "late" ? lateText(event.task.days_late) : null;
  return (
    <li className="happening">
      <span className="happening-mark" aria-hidden>{EVENT_MARK[event.kind]}</span>
      <div className="grid gap-1">
        <Link to={jobHref(event.task.task_id)} className="happening-job">
          <span aria-hidden>{picture || "⭐"}</span> {rest}
        </Link>
        <span>{t(`cal.event.${event.kind}`, { name: name(event.who) })}{late && <> · {say(t, late)}</>}</span>
        <span className="flex flex-wrap items-center gap-2">
          <StandingBadge standing={event.task.standing} />
          <NudgeBell task={event.task} now={now} />
        </span>
        {(event.kind === "due" || event.kind === "late" || event.kind === "graded") && (
          <NudgeButton task={event.task} now={now} onChanged={onChanged} />
        )}
      </div>
    </li>
  );
}

/** The month and whose jobs it shows. Used signed in and in the sample family alike. */
export function CalendarSheet({ tasks, me, now, onChanged }: { tasks: Task[]; me: string; now: number; onChanged: (t: Task) => void }) {
  const t = useT();
  const { members, name } = useFamily();
  const [whose, setWhose] = useState("");
  const all = useMemo(() => eventsOf(tasks), [tasks]);
  const shown = eventsFor(all, whose);
  const people = [me, ...members.map((m) => m.npub).filter((n) => n !== me)];

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t("cal.whose")}>
        <button type="button" className={whose === "" ? "pick pick-on" : "pick"} aria-pressed={whose === ""} onClick={() => setWhose("")}>
          {t("cal.everyone")}
        </button>
        {people.map((npub) => (
          <button key={npub} type="button" className={whose === npub ? "pick pick-on" : "pick"} aria-pressed={whose === npub} onClick={() => setWhose(npub)}>
            <Face npub={npub} name={name(npub)} />{name(npub)}
          </button>
        ))}
      </div>
      <MonthCalendar events={shown} now={now} renderDay={(events) => (
        <ul className="happenings">{events.map((e, i) => <Happening key={`${e.task.task_id}-${e.kind}-${i}`} event={e} now={now} onChanged={onChanged} />)}</ul>
      )} />
    </>
  );
}

export default function Calendar() {
  const { session } = useAppShell();
  const t = useT();
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
  const changed = (next: Task) => setTasks((list) => (list ?? []).map((task) => (task.task_id === next.task_id ? next : task)));

  return (
    <div className="page grid gap-4">
      <div className="toolbar">
        <h1 className="text-3xl font-bold">{t("cal.title")}</h1>
        <div className="toolbar-actions">
          <button type="button" className="icon-btn" onClick={() => void load()} disabled={loading} aria-label={t("actions.lookAgain")} title={t("actions.lookAgain")}>
            <RefreshCw size={22} aria-hidden />
          </button>
        </div>
      </div>
      <p className="muted">{t("cal.intro")}</p>
      {problem && <p className="card panel error">{problem}</p>}
      {loading && !tasks && <div className="card panel"><Waiting heading={t("waiting.fetchingJobs")} /></div>}
      {tasks && <CalendarSheet tasks={tasks} me={session.npub} now={now} onChanged={changed} />}
    </div>
  );
}
