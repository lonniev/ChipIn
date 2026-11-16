/**
 * The invoice that pays a job: a link any wallet opens, a code to scan from
 * another phone, and the text to copy. It is Task Booth's invoice, shown unchanged.
 */

import { useState } from "react";
import { Check, Copy, Zap } from "lucide-react";
import { formatSats } from "@tollbooth-dpyc/web";
import { InvoiceQr } from "@tollbooth-dpyc/web/react";
import { useT } from "../i18n";
import type { Payout } from "../lib/tasks";

export default function InvoicePanel({ payout, now }: { payout: Payout; now: number }) {
  const [copied, setCopied] = useState(false);
  const t = useT();
  const minutes = Math.max(0, Math.floor((payout.expires_at - now) / 60));

  async function copy() {
    await navigator.clipboard?.writeText(payout.invoice);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="invoice">
      <p className="invoice-sats num">{t("sats.amount", { sats: formatSats(payout.sats) })}</p>
      <div className="flex flex-wrap justify-end gap-2">
        <a href={payout.lightning_uri} className="btn btn-money"><Zap size={22} aria-hidden />{t("invoice.open")}</a>
        <button type="button" className="btn btn-quiet" onClick={() => void copy()}>
          {copied ? <Check size={22} aria-hidden /> : <Copy size={22} aria-hidden />}
          {copied ? t("actions.copied") : t("invoice.copy")}
        </button>
      </div>
      <InvoiceQr bolt11={payout.invoice} size={240} className="invoice-qr" />
      <p className="invoice-text">{payout.invoice}</p>
      <p className="muted text-sm">{minutes > 0 ? t("invoice.goodFor", { minutes }) : t("invoice.expired")}</p>
    </div>
  );
}
