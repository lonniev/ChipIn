/**
 * The buttons a job offers the signed-in person: large, and well apart.
 * A move that takes something back asks for a second tap. A move that needs
 * words (a grade, a reason) opens a small form in place.
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Hand, MessageCircleQuestion, ThumbsUp, Undo2, X, Zap } from "lucide-react";
import { formatSats } from "@tollbooth-dpyc/web";
import { useT } from "../i18n/I18nContext";
import { useLooking } from "../lib/LookContext";
import { movesFor, type Move } from "../lib/moves";
import { byReward } from "../lib/rubric";
import { appeal, assess, decideAppeal, isPlain, move, reject, type Task } from "../lib/tasks";

const ICON: Record<Move, typeof Zap> = {
  claim: Hand, mark_done: Check, release: Undo2, withdraw: Undo2, grade: ThumbsUp, reject: X,
  accept: ThumbsUp, appeal: MessageCircleQuestion, decide: ThumbsUp, pay: Zap, confirm_paid: Check,
};

/** Moves that undo something: they ask twice. */
const TAKES_BACK: Move[] = ["release", "withdraw"];

type Asking = "grade" | "decide" | "reject" | "appeal" | null;

export default function Actions({ task, onChanged, onPay, quick = false }: {
  task: Task;
  onChanged: (task: Task) => void;
  /** Open the invoice; the job page owns it. */
  onPay?: () => void;
  /** On a list card: only the one-tap moves that carry a job forward. */
  quick?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState("");
  const [asking, setAsking] = useState<Asking>(null);
  const [sure, setSure] = useState<Move | null>(null);
  const [reasons, setReasons] = useState("");
  const looking = useLooking();
  const t = useT();
  const [tried, setTried] = useState(false);

  const moves = movesFor(task).filter((m) => (quick ? isPlain(m) && !TAKES_BACK.includes(m) : true));
  if (!moves.length) return null;

  async function run(action: () => Promise<Task>) {
    if (looking) return setTried(true);
    setBusy(true);
    setProblem("");
    try {
      onChanged(await action());
      setAsking(null);
      setSure(null);
      setReasons("");
    } catch (e) {
      setProblem((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  function press(m: Move) {
    if (TAKES_BACK.includes(m) && sure !== m) return setSure(m);
    if (isPlain(m)) return void run(() => move(task.task_id, m));
    if (m === "pay") return onPay?.();
    setAsking(m);
  }

  return (
    <div className="actions">
      <div className="actions-row">
        {moves.map((m) => {
          const Icon = ICON[m];
          const tone = m === "pay" ? "btn btn-money"
            : TAKES_BACK.includes(m) || m === "reject" || m === "appeal" ? "btn btn-quiet"
            : "btn btn-go";
          const label = sure === m ? t("actions.sure")
            : m === "pay" && task.assessment ? t("actions.paySats", { sats: formatSats(task.assessment.sats) })
            : t(`actions.${m}`);
          return (
            <button key={m} type="button" className={tone} disabled={busy} onClick={() => press(m)} onBlur={() => sure === m && setSure(null)}>
              <Icon size={22} aria-hidden />
              {label}
            </button>
          );
        })}
      </div>

      {asking && (
        <div className="ask">
          {(asking === "grade" || asking === "decide") && (
            <div className="grade-picks">
              {byReward(task.rubric.grades).map((g) => (
                <button
                  key={g.name} type="button" className="btn btn-grade" disabled={busy}
                  onClick={() => void run(() => (asking === "grade" ? assess : decideAppeal)(task.task_id, g.name, reasons))}
                >
                  <span>{g.name}</span>
                  <span className="num grade-sats">{formatSats(g.sats)}</span>
                </button>
              ))}
            </div>
          )}
          <textarea
            className="field w-full" rows={2} maxLength={4000} value={reasons}
            onChange={(e) => setReasons(e.target.value)}
            placeholder={asking === "appeal" ? t("actions.appealPlaceholder") : t("actions.wordsPlaceholder")}
            aria-label={t("actions.words")}
          />
          <div className="actions-row">
            {asking === "reject" && (
              <button type="button" className="btn btn-quiet" disabled={busy} onClick={() => void run(() => reject(task.task_id, reasons))}>
                <X size={22} aria-hidden />{t("actions.notDone")}
              </button>
            )}
            {asking === "appeal" && (
              <button type="button" className="btn btn-go" disabled={busy} onClick={() => void run(() => appeal(task.task_id, reasons))}>
                <MessageCircleQuestion size={22} aria-hidden />{t("actions.askAgain")}
              </button>
            )}
            <button type="button" className="btn btn-quiet" disabled={busy} onClick={() => setAsking(null)}>{t("actions.neverMind")}</button>
          </div>
        </div>
      )}
      {tried && <p className="muted text-right">{t.rich("sample.tried", { signIn: <Link to="/signin" className="ent">{t("nav.signIn")}</Link> })}</p>}
      {problem && <p className="error text-right">{problem}</p>}
    </div>
  );
}
