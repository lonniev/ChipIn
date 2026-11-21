/**
 * Write a job from a parent's few words, with Task Booth's `draft_task`.
 *
 * What the parent said fills the form at once. The suggested rewards wait for a tap.
 * Each of the AI's questions and assumptions is settled in place, by an answer typed
 * under it or a tick that it is fine as it is, before the job can be posted, so a
 * child is never held to something the parent did not choose. Answers go into the
 * job's details.
 */

import { useEffect, useMemo, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { formatSats } from "@tollbooth-dpyc/web";
import { useT } from "../i18n";
import { draftChore, draftFare, IDEA_MAX, openPointsOf, type Answered, type ChoreDraft } from "../lib/draft";
import { rememberedFiat } from "../lib/worth";

export interface DraftAssistProps {
  onSaid: (said: ChoreDraft["said"]) => void;
  onRewards: (grades: ChoreDraft["proposed"]["grades"]) => void;
  onOpenPoints: (count: number) => void;
  onAnswers: (answered: Answered[]) => void;
}

const ANSWER_MAX = 200;

export default function DraftAssist({ onSaid, onRewards, onOpenPoints, onAnswers }: DraftAssistProps) {
  const t = useT();
  const [idea, setIdea] = useState("");
  const [fare, setFare] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState("");
  const [draft, setDraft] = useState<ChoreDraft | null>(null);
  const [used, setUsed] = useState(false);
  const [ticked, setTicked] = useState<Set<number>>(new Set());
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => { void draftFare().then(setFare); }, []);
  const points = useMemo(() => (draft ? openPointsOf(draft) : []), [draft]);
  const open = points.filter((_, i) => !ticked.has(i) && !answers[i]?.trim()).length;
  useEffect(() => { onOpenPoints(open); }, [open, onOpenPoints]);

  async function go() {
    setProblem("");
    setBusy(true);
    try {
      const d = await draftChore(idea.trim(), rememberedFiat());
      setDraft(d);
      setUsed(false);
      setTicked(new Set());
      setAnswers([]);
      onSaid(d.said);
    } catch (e) {
      setProblem((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const toggle = (i: number) => setTicked((s) => {
    const next = new Set(s);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    return next;
  });

  function answer(i: number, text: string) {
    const next = points.map((_, j) => (j === i ? text : answers[j] ?? ""));
    setAnswers(next);
    onAnswers(points.map((p, j) => ({ point: p, answer: next[j] })));
  }

  return (
    <section className="draft-assist grid gap-3">
      <h2 className="flex items-center gap-2 text-xl font-bold"><Sparkles size={20} aria-hidden /> {t("draft.title")}</h2>
      <p className="muted">{t("draft.says")}</p>
      <textarea className="field" rows={2} maxLength={IDEA_MAX} value={idea} onChange={(e) => setIdea(e.target.value)}
        placeholder={t("draft.placeholder")} aria-label={t("draft.title")} />
      <div className="flex flex-wrap items-center justify-end gap-2">
        {fare !== null && <span className="muted">{t("draft.fare", { sats: formatSats(fare) })}</span>}
        <button type="button" className="btn btn-go" disabled={busy || !idea.trim()} onClick={() => void go()}>
          {busy ? t("draft.drafting") : t("draft.go")}
        </button>
      </div>
      {problem && <p className="error text-right">{problem}</p>}

      {draft && (
        <>
          <p className="muted">{t("draft.filled")}</p>
          {draft.proposed.grades.length > 0 && (
            <div className="draft-row">
              <span>
                <span className="badge">{t("draft.suggested")}</span>{" "}
                {draft.proposed.grades.map((g) => `${g.name} ${formatSats(g.sats)}`).join(" · ")}
              </span>
              <button type="button" className={used ? "btn btn-quiet" : "btn"} onClick={() => { onRewards(draft.proposed.grades); setUsed(true); }}>
                {used ? <><Check size={16} aria-hidden /> {t("draft.used")}</> : t("draft.useRewards")}
              </button>
            </div>
          )}
          {points.length > 0 && (
            <div className="grid gap-2">
              <h3 className="label">{t("draft.pointsTitle")}</h3>
              <p className="muted">{t("draft.pointsSays")}</p>
              <ul className="grid gap-4">
                {points.map((p, i) => {
                  const said = answers[i]?.trim() ?? "";
                  return (
                    <li key={i} className={said || ticked.has(i) ? "draft-point draft-point-done" : "draft-point"}>
                      <p>{p}</p>
                      <input className="field" maxLength={ANSWER_MAX} value={answers[i] ?? ""} onChange={(e) => answer(i, e.target.value)}
                        placeholder={t("draft.answerPlaceholder")} aria-label={p} />
                      <label className="draft-tick">
                        <input type="checkbox" checked={ticked.has(i)} disabled={!!said} onChange={() => toggle(i)} />
                        <span>{t("draft.fine")}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </>
      )}
    </section>
  );
}
