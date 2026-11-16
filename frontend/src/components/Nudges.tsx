/**
 * Reminders on a job: a big button to send one, and a bell for one waiting for you.
 * A child who finished asks to be paid; a parent says a due day is near.
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, BellRing } from "lucide-react";
import { Tx } from "@tollbooth-dpyc/web/react";
import { useT, WORDS } from "../i18n";
import { useFamily } from "../lib/FamilyContext";
import { useLooking } from "../lib/LookContext";
import { nudgeFor, nudgeOpen, nudgeSent } from "../lib/nudges";
import { nudge, type NudgeKind, type Task } from "../lib/tasks";

/** Who a reminder of this kind goes to: the one who posted (to pay), the one doing it (that it is due). */
const toWhom = (task: Task, kind: NudgeKind) => (kind === "pay" ? task.purchaser : task.performer ?? task.purchaser);

export function NudgeButton({ task, now, onChanged }: { task: Task; now: number; onChanged: (t: Task) => void }) {
  const t = useT();
  const { name } = useFamily();
  const looking = useLooking();
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState("");
  const [tried, setTried] = useState(false);
  const open = nudgeOpen(task, now);
  // The kind this person could send; a reminder someone else sent is theirs to see as a bell, not this chip.
  const mine: NudgeKind | null = task.standing === "owed" && task.your_roles.includes("performer") ? "pay"
    : task.standing === "claimed" && task.your_roles.includes("purchaser") ? "due" : null;
  const kind = open ?? mine;
  if (!kind) return null;
  const sent = nudgeSent(task, kind, now);
  if (!open && !sent) return null;

  async function send() {
    if (looking) return setTried(true);
    setBusy(true);
    setProblem("");
    try {
      onChanged(await nudge(task.task_id, kind!));
    } catch (e) {
      setProblem((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid justify-items-end gap-1">
      {open
        ? <button type="button" className="btn btn-quiet" disabled={busy} onClick={() => void send()}>
            <Bell size={22} aria-hidden />{t(`nudge.${kind}`, { name: name(toWhom(task, kind)) })}
          </button>
        : <span className="chip"><Bell size={16} aria-hidden />{t("nudge.sent")}</span>}
      {problem && <p className="error text-right">{problem}</p>}
      {tried && <p className="muted text-right"><Tx ns={WORDS} k="sample.tried" components={{ signIn: <Link to="/signin" className="ent">{t("nav.signIn")}</Link> }} /></p>}
    </div>
  );
}

/** A reminder waiting for you on this job, as a bell and a sentence. */
export function NudgeBell({ task, now }: { task: Task; now: number }) {
  const t = useT();
  const { name } = useFamily();
  const waiting = nudgeFor(task, now);
  if (!waiting) return null;
  return (
    <span className="nudge-bell">
      <BellRing size={16} aria-hidden />{t(waiting.kind === "pay" ? "nudge.payFor" : "nudge.dueFor", { name: name(waiting.nudge.by) })}
    </span>
  );
}
