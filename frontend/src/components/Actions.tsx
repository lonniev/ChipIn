/**
 * The buttons a chore offers the signed-in person. A move that needs words
 * (a grade, a reason) opens a small form in place; the rest act at once.
 */

import { useState } from "react";
import { Check, Hand, Scale, ThumbsUp, Undo2, X, Zap } from "lucide-react";
import { formatSats } from "@tollbooth-dpyc/web";
import { movesFor, type Move } from "../lib/moves";
import { byReward } from "../lib/rubric";
import { appeal, assess, decideAppeal, isPlain, move, reject, type Task } from "../lib/tasks";

const LABEL: Record<Move, string> = {
  claim: "I'll do it",
  mark_done: "It's done",
  release: "Give it back",
  withdraw: "Withdraw",
  grade: "Grade it",
  reject: "Reject",
  accept: "Accept",
  appeal: "Appeal",
  decide: "Decide",
  pay: "Pay",
  confirm_paid: "I got it",
};

const ICON: Record<Move, typeof Zap> = {
  claim: Hand, mark_done: Check, release: Undo2, withdraw: Undo2, grade: ThumbsUp, reject: X,
  accept: ThumbsUp, appeal: Scale, decide: Scale, pay: Zap, confirm_paid: Check,
};

type Asking = { kind: "grade" | "decide" } | { kind: "reject" | "appeal" } | null;

export default function Actions({ task, onChanged, onPay, quick = false }: {
  task: Task;
  onChanged: (task: Task) => void;
  /** Open the invoice; the chore page owns it. */
  onPay?: () => void;
  /** On a list row: only the moves that need no words. */
  quick?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState("");
  const [asking, setAsking] = useState<Asking>(null);
  const [reasons, setReasons] = useState("");

  const moves = movesFor(task).filter((m) => (quick ? isPlain(m) && m !== "withdraw" && m !== "release" : true));
  if (!moves.length) return null;

  async function run(action: () => Promise<Task>) {
    setBusy(true);
    setProblem("");
    try {
      onChanged(await action());
      setAsking(null);
      setReasons("");
    } catch (e) {
      setProblem((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  function press(m: Move) {
    if (isPlain(m)) void run(() => move(task.task_id, m));
    else if (m === "pay") onPay?.();
    else if (m === "grade" || m === "decide") setAsking({ kind: m });
    else setAsking({ kind: m });
  }

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap justify-end gap-2">
        {moves.map((m) => {
          const Icon = ICON[m];
          const main = m === moves[0];
          const tone = m === "pay" ? "chip chip-money" : m === "reject" ? "chip chip-danger" : main ? "chip chip-accent" : "chip";
          return (
            <button key={m} type="button" className={tone} disabled={busy} onClick={() => press(m)}>
              <Icon size={16} aria-hidden />
              {m === "pay" && task.assessment ? `Pay ${formatSats(task.assessment.sats)} sats` : LABEL[m]}
            </button>
          );
        })}
      </div>

      {asking && (
        <div className="add-form grid gap-2">
          <textarea
            className="field w-full" rows={2} maxLength={4000} value={reasons}
            onChange={(e) => setReasons(e.target.value)}
            placeholder={asking.kind === "appeal" ? "Why should the grade be different?" : "A few words on why (optional)"}
            aria-label="Reasons"
          />
          <div className="flex flex-wrap justify-end gap-2">
            {(asking.kind === "grade" || asking.kind === "decide") && byReward(task.rubric.grades).map((g) => (
              <button
                key={g.name} type="button" className="chip chip-accent" disabled={busy}
                onClick={() => void run(() => (asking.kind === "grade" ? assess : decideAppeal)(task.task_id, g.name, reasons))}
              >
                {g.name} · <span className="num">{formatSats(g.sats)}</span>
              </button>
            ))}
            {asking.kind === "reject" && (
              <button type="button" className="chip chip-danger" disabled={busy} onClick={() => void run(() => reject(task.task_id, reasons))}>
                Reject the work
              </button>
            )}
            {asking.kind === "appeal" && (
              <button type="button" className="chip chip-accent" disabled={busy} onClick={() => void run(() => appeal(task.task_id, reasons))}>
                Send the appeal
              </button>
            )}
            <button type="button" className="chip" disabled={busy} onClick={() => setAsking(null)}>Cancel</button>
          </div>
        </div>
      )}
      {problem && <p className="error text-right">{problem}</p>}
    </div>
  );
}
