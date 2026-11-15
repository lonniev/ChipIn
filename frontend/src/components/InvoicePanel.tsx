/**
 * The invoice that pays a chore: a link any wallet opens, and the text to
 * copy. It is Task Booth's invoice, shown unchanged.
 */

import { useState } from "react";
import { Check, Copy, Zap } from "lucide-react";
import { formatSats } from "@tollbooth-dpyc/web";
import type { Payout } from "../lib/tasks";

export default function InvoicePanel({ payout, now }: { payout: Payout; now: number }) {
  const [copied, setCopied] = useState(false);
  const minutes = Math.max(0, Math.floor((payout.expires_at - now) / 60));

  async function copy() {
    await navigator.clipboard?.writeText(payout.invoice);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="invoice">
      <p className="invoice-sats num">{formatSats(payout.sats)} sats</p>
      <div className="flex flex-wrap justify-end gap-2">
        <a href={payout.lightning_uri} className="btn btn-money"><Zap size={22} aria-hidden />Open in wallet</a>
        <button type="button" className="btn btn-quiet" onClick={() => void copy()}>
          {copied ? <Check size={22} aria-hidden /> : <Copy size={22} aria-hidden />}
          {copied ? "Copied" : "Copy invoice"}
        </button>
      </div>
      <p className="invoice-text">{payout.invoice}</p>
      <p className="muted text-sm">{minutes > 0 ? `Good for ${minutes} more minutes.` : "This invoice has expired. Ask for a new one."}</p>
    </div>
  );
}
