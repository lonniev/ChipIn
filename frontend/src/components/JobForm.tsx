/**
 * A job's terms, to post a new one or change one nobody has taken on yet:
 * what, who may do it, by when, what each grade earns, and what lateness costs.
 * Every text box grows with what is written.
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, UserPlus } from "lucide-react";
import { useAppShell } from "@tollbooth-dpyc/web/react";
import { jobHref, Face } from "./Links";
import GrowText from "./GrowText";
import { useT } from "../i18n";
import { useSamples } from "../lib/content";
import type { MessageKey } from "../i18n/en";
import { useFamily } from "../lib/FamilyContext";
import { JOB_PICTURES, splitPicture } from "../lib/face";
import { lateFrom, MAX_GRADES, MAX_GRADE_SATS, rubricFrom, starterRows, type GradeRow, type LateKind } from "../lib/rubric";
import type { SampleJob } from "../lib/samples";
import { editTask, postTask, type Task } from "../lib/tasks";
import { dayFrom, dayKeyOf, endOfDay } from "../lib/when";

const REPEATS: { days: number; label: MessageKey }[] = [
  { days: 0, label: "repeat.once" },
  { days: 1, label: "repeat.daily" },
  { days: 7, label: "repeat.weekly" },
];

const LATE_KINDS: LateKind[] = ["full", "discount", "cancel"];

const TITLE_MAX = 190;
const DETAILS_MAX = 4000;
/** The details box counts down only when it is nearly full. */
const COUNT_FROM = 200;
const SATS_STEP = 100;

const satsOf = (text: string) => (/^\d+$/.test(text.trim()) ? Number(text.trim()) : 0);

export default function JobForm({ editing }: { editing?: Task }) {
  const { session } = useAppShell();
  const { members } = useFamily();
  const go = useNavigate();
  const t = useT();
  const samples = useSamples();
  const now = Math.floor(Date.now() / 1000);
  const was = editing ? splitPicture(editing.title) : null;

  const [title, setTitle] = useState(was?.rest ?? "");
  const [picture, setPicture] = useState(was?.picture || JOB_PICTURES[0]);
  const [description, setDescription] = useState(editing?.description ?? "");
  const [who, setWho] = useState<string[]>(editing?.audience ?? []);
  const [due, setDue] = useState(editing && editing.needed_by > now ? dayKeyOf(editing.needed_by) : dayFrom(now, 2));
  const [every, setEvery] = useState(editing?.every_days ?? 0);
  const [rows, setRows] = useState<GradeRow[]>(() => editing
    ? editing.rubric.grades.map((g) => ({ name: g.name, sats: String(g.sats), criteria: g.criteria }))
    : starterRows(t));
  const [lateKind, setLateKind] = useState<LateKind>(editing?.late.kind ?? "full");
  const [latePct, setLatePct] = useState(editing?.late.kind === "discount" ? String(editing.late.pct_per_day) : "10");
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
  const stepSats = (i: number, by: number) => setRow(i, { sats: String(Math.min(MAX_GRADE_SATS, Math.max(0, satsOf(rows[i].sats) + by))) });
  const left = DETAILS_MAX - description.length;

  async function save() {
    setProblem("");
    if (!title.trim()) return setProblem(t("newJob.needName"));
    if (!who.length) return setProblem(t("newJob.needWho"));
    const neededBy = endOfDay(due);
    if (neededBy === null) return setProblem(t("newJob.needDay"));
    if (neededBy < now) return setProblem(t("newJob.dayPassed"));
    const made = rubricFrom(rows);
    if ("problem" in made) return setProblem(t(made.problem.key, made.problem.vars));
    const late = lateFrom(lateKind, latePct);
    if ("problem" in late) return setProblem(t(late.problem.key, late.problem.vars));
    const terms = {
      title: `${picture} ${title.trim()}`, description: description.trim(), rubric: made.rubric,
      audience: who, needed_by: neededBy, every_days: every, late: late.late,
    };
    setBusy(true);
    try {
      const task = editing ? await editTask(editing.task_id, terms) : await postTask(terms);
      go(jobHref(task.task_id));
    } catch (e) {
      setProblem((e as Error).message);
      setBusy(false);
    }
  }

  return (
    <div className="page">
      <form className="card panel mx-auto grid max-w-2xl gap-5" onSubmit={(e) => { e.preventDefault(); void save(); }}>
        <h1 className="text-3xl font-bold">{editing ? t("editJob.title") : t("jobs.new")}</h1>

        {!editing && (
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
        )}

        <div className="pictures" role="group" aria-label={t("newJob.picture")}>
          {JOB_PICTURES.map((p) => (
            <button key={p} type="button" className={picture === p ? "picture picture-on" : "picture"} aria-pressed={picture === p} onClick={() => setPicture(p)}>
              {p}
            </button>
          ))}
        </div>

        <label className="grid gap-1">
          <span className="label">{t("newJob.what")}</span>
          <GrowText oneLine className="field-title" value={title} onText={setTitle} maxLength={TITLE_MAX} placeholder={t("newJob.whatPlaceholder")} />
        </label>

        <label className="grid gap-1">
          <span className="label">{t("newJob.where")}</span>
          <GrowText minRows={5} value={description} onText={setDescription} maxLength={DETAILS_MAX} placeholder={t("newJob.wherePlaceholder")} />
          {left <= COUNT_FROM && <span className="muted text-right text-sm num">{t("newJob.charsLeft", { count: left })}</span>}
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
          <legend className="label">{t("late.title")}</legend>
          <div className="flex flex-wrap gap-2">
            {LATE_KINDS.map((k) => (
              <button key={k} type="button" className={lateKind === k ? "pick pick-on" : "pick"} aria-pressed={lateKind === k} onClick={() => setLateKind(k)}>
                {t(`late.pick.${k}`)}
              </button>
            ))}
          </div>
          {lateKind === "discount" && (
            <label className="late-pct">
              <input className="field num text-right" inputMode="numeric" value={latePct} maxLength={3} onChange={(e) => setLatePct(e.target.value)} aria-label={t("late.pctLabel")} />
              <span>{t("late.pctAfter")}</span>
            </label>
          )}
          <p className="muted">{t(`late.pickHelp.${lateKind}`)}</p>
        </fieldset>

        <fieldset className="grid gap-3">
          <legend className="label">{t("newJob.earns")}</legend>
          {rows.map((row, i) => (
            <div key={i} className="grade-card">
              <div className="grade-card-head">
                <input className="field" value={row.name} maxLength={60} onChange={(e) => setRow(i, { name: e.target.value })}
                  placeholder={t("newJob.gradePlaceholder")} aria-label={t("newJob.gradeNumber", { n: i + 1 })} />
                <div className="sats-step">
                  <button type="button" className="icon-btn" onClick={() => stepSats(i, -SATS_STEP)} aria-label={t("newJob.fewerSats")} title={t("newJob.fewerSats")}>
                    <Minus size={20} aria-hidden />
                  </button>
                  <input className="field num text-right" value={row.sats} inputMode="numeric" onChange={(e) => setRow(i, { sats: e.target.value })}
                    placeholder={t("newJob.satsPlaceholder")} aria-label={t("newJob.satsLabel")} />
                  <button type="button" className="icon-btn" onClick={() => stepSats(i, SATS_STEP)} aria-label={t("newJob.moreSats")} title={t("newJob.moreSats")}>
                    <Plus size={20} aria-hidden />
                  </button>
                </div>
                <button type="button" className="icon-btn icon-btn-sm" onClick={() => setRows((list) => list.filter((_, j) => j !== i))}
                  aria-label={t("newJob.removeGrade")} title={t("newJob.removeGrade")}>
                  <Trash2 size={14} aria-hidden />
                </button>
              </div>
              <GrowText minRows={2} value={row.criteria} onText={(text) => setRow(i, { criteria: text })} maxLength={500}
                placeholder={t("newJob.whatEarns")} aria-label={t("newJob.whatEarns")} />
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
          <Link to={editing ? jobHref(editing.task_id) : "/jobs"} className="btn btn-quiet">{t("actions.cancel")}</Link>
          <button type="submit" className="btn btn-go" disabled={busy}>
            {editing ? (busy ? t("editJob.saving") : t("editJob.save")) : (busy ? t("newJob.posting") : t("newJob.post"))}
          </button>
        </div>
      </form>
    </div>
  );
}
