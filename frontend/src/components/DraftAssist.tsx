/**
 * Write a job from a parent's few words, with Task Booth's `draft_task`.
 *
 * What the parent said fills the form at once. The suggested rewards wait for a tap.
 * The AI's questions and assumptions are ticked off before the job can be posted, so
 * a child is never held to something the parent did not choose.
 */

import { useEffect, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { formatSats } from "@tollbooth-dpyc/web";
import { useT } from "../i18n";
import { draftChore, draftFare, IDEA_MAX, openPointsOf, type ChoreDraft } from "../lib/draft";
import { rememberedFiat } from "../lib/worth";

export interface DraftAssistProps {
  onSaid: (said: ChoreDraft["said"]) => void;
  onRewards: (grades: ChoreDraft["proposed"]["grades"]) => void;
  onOpenPoints: (count: number) => void;
}

export default function DraftAssist({ onSaid, onRewards, onOpenPoints }: DraftAssistProps) {
  const t = useT();
  const [idea, setIdea] = useState("");
  const [fare, setFare] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState("");
  const [draft, setDraft] = useState<ChoreDraft | null>(null);
  const [used, setUsed] = useState(false);
  const [settled, setSettled] = useState<Set<number>>(new Set());

  useEffect(() => { void draftFare().then(setFare); }, []);
  const points = draft ? openPointsOf(draft) : [];
  useEffect(() => { onOpenPoints(points.length - settled.size); }, [points.length, settled, onOpenPoints]);

  async function go() {
    setProblem("");
    setBusy(true);
    try {
      const d = await draftChore(idea.trim(), rememberedFiat());
      setDraft(d);
      setUsed(false);
      setSettled(new Set());
      onSaid(d.said);
    } catch (e) {
      setProblem((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const toggle = (i: number) => setSettled((s) => {
    const next = new Set(s);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    return next;
  });

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
              <ul className="grid gap-2">
                {points.map((p, i) => (
                  <li key={i}>
                    <label className="draft-point">
                      <input type="checkbox" checked={settled.has(i)} onChange={() => toggle(i)} />
                      <span>{p}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </section>
  );
}
