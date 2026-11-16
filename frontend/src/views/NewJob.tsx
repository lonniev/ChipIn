/** Post a job: what, who may do it, by when, and what each grade earns. */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Trash2, UserPlus } from "lucide-react";
import { useAppShell } from "@tollbooth-dpyc/web/react";
import { jobHref, Face } from "../components/Links";
import { useSamples, useT } from "../i18n/I18nContext";
import type { MessageKey } from "../i18n/en";
import { useFamily } from "../lib/FamilyContext";
import { JOB_PICTURES } from "../lib/face";
import { MAX_GRADES, rubricFrom, starterRows, type GradeRow } from "../lib/rubric";
import type { SampleJob } from "../lib/samples";
import { postTask } from "../lib/tasks";
import { dayFrom, endOfDay } from "../lib/when";

const REPEATS: { days: number; label: MessageKey }[] = [
  { days: 0, label: "repeat.once" },
  { days: 1, label: "repeat.daily" },
  { days: 7, label: "repeat.weekly" },
];

export default function NewJob() {
  const { session } = useAppShell();
  const { members } = useFamily();
  const go = useNavigate();
  const t = useT();
  const samples = useSamples();
  const now = Math.floor(Date.now() / 1000);

  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState(JOB_PICTURES[0]);
  const [description, setDescription] = useState("");
  const [who, setWho] = useState<string[]>([]);
  const [due, setDue] = useState(dayFrom(now, 2));
  const [every, setEvery] = useState(0);
  const [rows, setRows] = useState<GradeRow[]>(() => starterRows(t));
  const [problem, setProblem] = useState("");
  const [busy, setBusy] = useState(false);

  const people = [{ npub: session.npub, name: t("newJob.me") }, ...members.filter((m) => m.npub !== session.npub)];
  const toggle = (npub: string) => setWho((list) => (list.includes(npub) ? list.filter((n) => n !== npub) : [...list, npub]));
  function startFrom(s: SampleJob) {
    setPicture(s.picture);
    setTitle(s.title);
    setDescription(s.description);
    setEvery(s.everyDays);
    setRows(s.rows.map((r) => ({ ...r })));
  }
  const setRow = (i: number, change: Partial<GradeRow>) => setRows((list) => list.map((r, j) => (j === i ? { ...r, ...change } : r)));

  async function post() {
    setProblem("");
    if (!title.trim()) return setProblem(t("newJob.needName"));
    if (!who.length) return setProblem(t("newJob.needWho"));
    const neededBy = endOfDay(due);
    if (neededBy === null) return setProblem(t("newJob.needDay"));
    if (neededBy < now) return setProblem(t("newJob.dayPassed"));
    const made = rubricFrom(rows);
    if ("problem" in made) return setProblem(t(made.problem.key, made.problem.vars));
    setBusy(true);
    try {
      const task = await postTask({
        title: `${picture} ${title.trim()}`, description: description.trim(), rubric: made.rubric,
        audience: who, needed_by: neededBy, every_days: every,
      });
      go(jobHref(task.task_id));
    } catch (e) {
      setProblem((e as Error).message);
      setBusy(false);
    }
  }

  return (
    <div className="page">
      <form className="card panel mx-auto grid max-w-2xl gap-4" onSubmit={(e) => { e.preventDefault(); void post(); }}>
        <h1 className="text-3xl font-bold">{t("jobs.new")}</h1>

        <fieldset className="grid gap-2">
          <legend className="label">{t("newJob.startFrom")}</legend>
          <div className="starters">
            {samples.map((s) => (
              <button key={s.key} type="button" className={title === s.title ? "pick pick-on" : "pick"} onClick={() => startFrom(s)}>
                <span aria-hidden>{s.picture}</span>{s.title}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="pictures" role="group" aria-label={t("newJob.picture")}>
          {JOB_PICTURES.map((p) => (
            <button key={p} type="button" className={picture === p ? "picture picture-on" : "picture"} aria-pressed={picture === p} onClick={() => setPicture(p)}>
              {p}
            </button>
          ))}
        </div>

        <label className="grid gap-1">
          <span className="label">{t("newJob.what")}</span>
          <input className="field" value={title} maxLength={190} onChange={(e) => setTitle(e.target.value)} placeholder={t("newJob.whatPlaceholder")} />
        </label>

        <label className="grid gap-1">
          <span className="label">{t("newJob.where")}</span>
          <textarea className="field" rows={4} value={description} maxLength={4000} onChange={(e) => setDescription(e.target.value)}
            placeholder={t("newJob.wherePlaceholder")} />
        </label>

        <fieldset className="grid gap-2">
          <legend className="label">{t("newJob.who")}</legend>
          <div className="flex flex-wrap gap-2">
            {people.map((p) => (
              <button key={p.npub} type="button" className={who.includes(p.npub) ? "pick pick-on" : "pick"} aria-pressed={who.includes(p.npub)} onClick={() => toggle(p.npub)}>
                <Face npub={p.npub} name={p.name} />
                {p.name}
              </button>
            ))}
            <Link to="/family" className="pick" title={t("newJob.addSomeone")}><UserPlus size={20} aria-hidden />{t("newJob.addSomeone")}</Link>
          </div>
        </fieldset>

        <div className="flex flex-wrap items-end gap-4">
          <label className="grid gap-1">
            <span className="label">{t("newJob.byWhen")}</span>
            <input type="date" className="field" value={due} min={dayFrom(now, 0)} onChange={(e) => setDue(e.target.value)} />
          </label>
          <div className="flex flex-wrap gap-2" role="group" aria-label={t("newJob.repeats")}>
            {REPEATS.map((r) => (
              <button key={r.days} type="button" className={every === r.days ? "pick pick-on" : "pick"} aria-pressed={every === r.days} onClick={() => setEvery(r.days)}>
                {t(r.label)}
              </button>
            ))}
          </div>
        </div>

        <fieldset className="grid gap-2">
          <legend className="label">{t("newJob.earns")}</legend>
          {rows.map((row, i) => (
            <div key={i} className="grade-row">
              <input className="field" value={row.name} maxLength={60} onChange={(e) => setRow(i, { name: e.target.value })} placeholder={t("newJob.gradePlaceholder")} aria-label={t("newJob.gradeName")} />
              <input className="field" value={row.criteria} maxLength={500} onChange={(e) => setRow(i, { criteria: e.target.value })} placeholder={t("newJob.whatEarns")} aria-label={t("newJob.whatEarns")} />
              <input className="field num text-right" value={row.sats} inputMode="numeric" onChange={(e) => setRow(i, { sats: e.target.value })} placeholder={t("newJob.satsPlaceholder")} aria-label={t("newJob.satsLabel")} />
              <button type="button" className="icon-btn icon-btn-sm" onClick={() => setRows((list) => list.filter((_, j) => j !== i))} aria-label={t("newJob.removeGrade")} title={t("newJob.removeGrade")}>
                <Trash2 size={14} aria-hidden />
              </button>
            </div>
          ))}
          {rows.length < MAX_GRADES && (
            <div className="flex justify-end">
              <button type="button" className="chip" onClick={() => setRows((list) => [...list, { name: "", sats: "", criteria: "" }])}>
                <Plus size={16} aria-hidden />{t("newJob.addGrade")}
              </button>
            </div>
          )}
        </fieldset>

        {problem && <p className="error text-right">{problem}</p>}
        <div className="flex flex-wrap justify-end gap-2">
          <Link to="/jobs" className="btn btn-quiet">{t("actions.cancel")}</Link>
          <button type="submit" className="btn btn-go" disabled={busy}>{busy ? t("newJob.posting") : t("newJob.post")}</button>
        </div>
      </form>
    </div>
  );
}
