/** Post a chore: what, who may do it, by when, and what each grade earns. */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Trash2, UserPlus } from "lucide-react";
import { useAppShell } from "@tollbooth-dpyc/web/react";
import { choreHref } from "../components/Links";
import { useFamily } from "../lib/FamilyContext";
import { MAX_GRADES, rubricFrom, STARTER_ROWS, type GradeRow } from "../lib/rubric";
import { postTask } from "../lib/tasks";
import { dayFrom, endOfDay } from "../lib/when";

const REPEATS = [
  { days: 0, label: "Once" },
  { days: 1, label: "Every day" },
  { days: 7, label: "Every week" },
];

export default function NewChore() {
  const { session } = useAppShell();
  const { members } = useFamily();
  const go = useNavigate();
  const now = Math.floor(Date.now() / 1000);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [who, setWho] = useState<string[]>([]);
  const [due, setDue] = useState(dayFrom(now, 2));
  const [every, setEvery] = useState(0);
  const [rows, setRows] = useState<GradeRow[]>(STARTER_ROWS);
  const [problem, setProblem] = useState("");
  const [busy, setBusy] = useState(false);

  const people = [{ npub: session.npub, name: "Me" }, ...members.filter((m) => m.npub !== session.npub)];
  const toggle = (npub: string) => setWho((list) => (list.includes(npub) ? list.filter((n) => n !== npub) : [...list, npub]));
  const setRow = (i: number, change: Partial<GradeRow>) => setRows((list) => list.map((r, j) => (j === i ? { ...r, ...change } : r)));

  async function post() {
    setProblem("");
    if (!title.trim()) return setProblem("Give the chore a name.");
    if (!who.length) return setProblem("Choose who may do it.");
    const neededBy = endOfDay(due);
    if (neededBy === null) return setProblem("Choose the day it is due.");
    if (neededBy < now) return setProblem("That day has passed.");
    const made = rubricFrom(rows);
    if ("problem" in made) return setProblem(made.problem);
    setBusy(true);
    try {
      const task = await postTask({
        title: title.trim(), description: description.trim(), rubric: made.rubric,
        audience: who, needed_by: neededBy, every_days: every,
      });
      go(choreHref(task.task_id));
    } catch (e) {
      setProblem((e as Error).message);
      setBusy(false);
    }
  }

  return (
    <div className="page">
      <form className="card panel mx-auto grid max-w-2xl gap-4" onSubmit={(e) => { e.preventDefault(); void post(); }}>
        <h1 className="text-2xl font-semibold">New chore</h1>

        <label className="grid gap-1">
          <span className="label">What needs doing</span>
          <input className="field" value={title} maxLength={200} onChange={(e) => setTitle(e.target.value)} placeholder="Clean your room" autoFocus />
        </label>

        <label className="grid gap-1">
          <span className="label">More about it</span>
          <textarea className="field" rows={2} value={description} maxLength={4000} onChange={(e) => setDescription(e.target.value)} />
        </label>

        <fieldset className="grid gap-2">
          <legend className="label">Who may do it</legend>
          <div className="flex flex-wrap gap-2">
            {people.map((p) => (
              <button key={p.npub} type="button" className={who.includes(p.npub) ? "chip chip-on" : "chip"} aria-pressed={who.includes(p.npub)} onClick={() => toggle(p.npub)}>
                {p.name}
              </button>
            ))}
            <Link to="/family" className="chip" title="Add someone"><UserPlus size={16} aria-hidden />Add someone</Link>
          </div>
        </fieldset>

        <div className="flex flex-wrap items-end gap-4">
          <label className="grid gap-1">
            <span className="label">Due</span>
            <input type="date" className="field" value={due} min={dayFrom(now, 0)} onChange={(e) => setDue(e.target.value)} />
          </label>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Repeats">
            {REPEATS.map((r) => (
              <button key={r.days} type="button" className={every === r.days ? "chip chip-on" : "chip"} aria-pressed={every === r.days} onClick={() => setEvery(r.days)}>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <fieldset className="grid gap-2">
          <legend className="label">What each grade earns</legend>
          {rows.map((row, i) => (
            <div key={i} className="grade-row">
              <input className="field" value={row.name} maxLength={60} onChange={(e) => setRow(i, { name: e.target.value })} placeholder="Grade" aria-label="Grade name" />
              <input className="field" value={row.criteria} maxLength={500} onChange={(e) => setRow(i, { criteria: e.target.value })} placeholder="What earns it" aria-label="What earns it" />
              <input className="field num text-right" value={row.sats} inputMode="numeric" onChange={(e) => setRow(i, { sats: e.target.value })} placeholder="sats" aria-label="Sats" />
              <button type="button" className="icon-btn icon-btn-sm" onClick={() => setRows((list) => list.filter((_, j) => j !== i))} aria-label="Remove this grade" title="Remove this grade">
                <Trash2 size={14} aria-hidden />
              </button>
            </div>
          ))}
          {rows.length < MAX_GRADES && (
            <div className="flex justify-end">
              <button type="button" className="chip" onClick={() => setRows((list) => [...list, { name: "", sats: "", criteria: "" }])}>
                <Plus size={16} aria-hidden />Add a grade
              </button>
            </div>
          )}
        </fieldset>

        {problem && <p className="error text-right">{problem}</p>}
        <div className="flex flex-wrap justify-end gap-2">
          <Link to="/chores" className="chip">Cancel</Link>
          <button type="submit" className="chip chip-accent" disabled={busy}>{busy ? "Posting…" : "Post the chore"}</button>
        </div>
      </form>
    </div>
  );
}
