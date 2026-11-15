/**
 * The piglet in the corner. Coins drop in when the page opens and whenever
 * what you earned goes up. A tap says how much is inside.
 */

import { useEffect, useRef, useState } from "react";
import { formatSats } from "@tollbooth-dpyc/web";

const COINS = 3;

export default function PiggyBank({ earned, coming }: { earned: number; coming: number }) {
  const [drop, setDrop] = useState(0);
  const [open, setOpen] = useState(false);
  const before = useRef<number | null>(null);

  // A coin for the first look, and again each time more has arrived.
  useEffect(() => {
    if (before.current === null || earned > before.current) setDrop((n) => n + 1);
    before.current = earned;
  }, [earned]);

  return (
    <div className="piglet-corner">
      {open && (
        <div className="piglet-says" role="status">
          <span className="piglet-sats num">{formatSats(earned)}</span> sats saved
          {coming > 0 && <span className="muted"> · <span className="num">{formatSats(coming)}</span> on the way</span>}
        </div>
      )}
      <button type="button" className="piglet" onClick={() => { setOpen((v) => !v); setDrop((n) => n + 1); }}
        aria-label={`Piggy bank: ${formatSats(earned)} sats`} aria-expanded={open}>
        <span key={drop} className="piglet-coins" aria-hidden>
          {Array.from({ length: COINS }, (_, i) => <span key={i} className="piglet-coin" style={{ animationDelay: `${i * 0.28}s` }}>₿</span>)}
        </span>
        <svg key={`pig-${drop}`} className="piglet-body" viewBox="0 0 120 100" aria-hidden>
          <ellipse cx="60" cy="94" rx="38" ry="4" className="piglet-shadow" />
          <path d="M96 58 q14 -4 10 -14 q-3 -7 -9 -2" className="piglet-tail" />
          <rect x="34" y="78" width="11" height="14" rx="4" className="piglet-leg" />
          <rect x="74" y="78" width="11" height="14" rx="4" className="piglet-leg" />
          <ellipse cx="60" cy="58" rx="40" ry="30" className="piglet-skin" />
          <path d="M34 34 l-6 -16 l18 8 z" className="piglet-ear" />
          <path d="M66 28 l10 -14 l8 18 z" className="piglet-ear" />
          <rect x="50" y="29" width="22" height="5" rx="2.5" className="piglet-slot" />
          <ellipse cx="30" cy="62" rx="13" ry="10" className="piglet-snout" />
          <circle cx="26" cy="62" r="2.4" className="piglet-ink" />
          <circle cx="34" cy="62" r="2.4" className="piglet-ink" />
          <g className="piglet-eyes">
            <circle cx="40" cy="46" r="3.4" className="piglet-ink" />
            <circle cx="58" cy="44" r="3.4" className="piglet-ink" />
          </g>
          <path d="M40 72 q10 9 22 1" className="piglet-smile" />
          <circle cx="62" cy="62" r="6" className="piglet-cheek" />
        </svg>
      </button>
    </div>
  );
}
