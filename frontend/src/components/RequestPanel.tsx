/**
 * How someone with any wallet gets paid: they ask their wallet for the sats
 * the job earned, copy what it shows, and paste it here.
 */

import { useState } from "react";
import { ClipboardPaste, Send } from "lucide-react";
import { formatSats } from "@tollbooth-dpyc/web";
import { useT } from "../i18n/I18nContext";
import { useLooking } from "../lib/LookContext";
import { looksLikeInvoice } from "../lib/problems";
import { handInInvoice, type Payout } from "../lib/tasks";

export default function RequestPanel({ taskId, sats, onTaken }: { taskId: string; sats: number; onTaken: (p: Payout) => void }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState("");

  const looking = useLooking();
  const t = useT();

  async function send(invoice: string) {
    if (looking) return setProblem(t("request.sample"));
    if (!looksLikeInvoice(invoice)) {
      setProblem(t("request.notRequest"));
      return;
    }
    setBusy(true);
    setProblem("");
    try {
      onTaken(await handInInvoice(taskId, invoice.trim()));
    } catch (e) {
      setProblem((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function paste() {
    if (looking) return setProblem(t("request.sample"));
    try {
      const copied = await navigator.clipboard.readText();
      setText(copied);
      await send(copied);
    } catch {
      setProblem(t("request.pasteBelow"));
    }
  }

  return (
    <div className="grid gap-3">
      <ol className="how-steps">
        <li><span aria-hidden>📱</span>{t("request.step.open")}</li>
        <li><span aria-hidden>⬇️</span>{t("request.step.receive")}</li>
        <li><span aria-hidden>🪙</span>{t.rich("request.step.ask", { sats: <strong className="num">{formatSats(sats)}</strong> })}</li>
        <li><span aria-hidden>📋</span>{t("request.step.copy")}</li>
      </ol>
      <button type="button" className="btn btn-money" disabled={busy} onClick={() => void paste()}>
        <ClipboardPaste size={22} aria-hidden />{t("request.paste")}
      </button>
      <div className="flex gap-2">
        <input className="field min-w-0 flex-1" value={text} onChange={(e) => setText(e.target.value)}
          placeholder="lnbc…" aria-label={t("request.fromWallet")} autoCapitalize="none" autoCorrect="off" spellCheck={false} />
        <button type="button" className="btn btn-quiet" disabled={busy || !text.trim()} onClick={() => void send(text)} aria-label={t("request.send")}>
          <Send size={22} aria-hidden />
        </button>
      </div>
      {problem && <p className="error text-right">{problem}</p>}
    </div>
  );
}
