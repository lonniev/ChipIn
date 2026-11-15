/**
 * How someone with any wallet gets paid: they ask their wallet for the sats
 * the chore earned, copy what it shows, and paste it here.
 */

import { useState } from "react";
import { ClipboardPaste, Send } from "lucide-react";
import { formatSats } from "@tollbooth-dpyc/web";
import { looksLikeInvoice } from "../lib/problems";
import { handInInvoice, type Payout } from "../lib/tasks";

export default function RequestPanel({ taskId, sats, onTaken }: { taskId: string; sats: number; onTaken: (p: Payout) => void }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState("");

  async function send(invoice: string) {
    if (!looksLikeInvoice(invoice)) {
      setProblem("That is not a request from a wallet. Copy the whole thing and try again.");
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
    try {
      const copied = await navigator.clipboard.readText();
      setText(copied);
      await send(copied);
    } catch {
      setProblem("Paste it into the box below.");
    }
  }

  return (
    <div className="grid gap-3">
      <ol className="steps">
        <li><span aria-hidden>📱</span>Open your wallet.</li>
        <li><span aria-hidden>⬇️</span>Tap Receive.</li>
        <li><span aria-hidden>🪙</span>Ask for <strong className="num">{formatSats(sats)}</strong> sats.</li>
        <li><span aria-hidden>📋</span>Copy it, then come back.</li>
      </ol>
      <button type="button" className="btn btn-money" disabled={busy} onClick={() => void paste()}>
        <ClipboardPaste size={22} aria-hidden />Paste it here
      </button>
      <div className="flex gap-2">
        <input className="field min-w-0 flex-1" value={text} onChange={(e) => setText(e.target.value)}
          placeholder="lnbc…" aria-label="Request from your wallet" autoCapitalize="none" autoCorrect="off" spellCheck={false} />
        <button type="button" className="btn btn-quiet" disabled={busy || !text.trim()} onClick={() => void send(text)} aria-label="Send it">
          <Send size={22} aria-hidden />
        </button>
      </div>
      {problem && <p className="error text-right">{problem}</p>}
    </div>
  );
}
