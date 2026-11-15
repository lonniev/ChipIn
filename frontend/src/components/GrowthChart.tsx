/** Sats held over time: what was earned as a solid line, the same pace carried forward as a dashed one. */

import { formatSats } from "@tollbooth-dpyc/web";
import type { Point } from "../lib/savings";

const W = 320, H = 180, LEFT = 8, RIGHT = 8, TOP = 22, BOTTOM = 26;

export default function GrowthChart({ history, ahead, now }: { history: Point[]; ahead: Point[]; now: number }) {
  const all = [...history, ...ahead];
  const from = all[0].at, to = all[all.length - 1].at;
  const top = Math.max(1, ...all.map((p) => p.sats));
  const x = (at: number) => LEFT + ((at - from) / Math.max(1, to - from)) * (W - LEFT - RIGHT);
  const y = (sats: number) => TOP + (1 - sats / top) * (H - TOP - BOTTOM);
  // Earnings arrive in steps: the line stays level until the next payment.
  const steps = history.flatMap((p, i) => (i === 0 ? [[x(p.at), y(0)], [x(p.at), y(p.sats)]] : [[x(p.at), y(history[i - 1].sats)], [x(p.at), y(p.sats)]]));
  const held = history.length ? history[history.length - 1].sats : 0;
  const earned = [...steps, [x(now), y(held)]].map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`).join(" ");
  const forward = ahead.map((p) => `${x(p.at).toFixed(1)},${y(p.sats).toFixed(1)}`).join(" ");
  const end = ahead[ahead.length - 1];
  const year = (at: number) => new Date(at * 1000).toLocaleDateString(undefined, { month: "short", year: "numeric" });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="growth" role="img"
      aria-label={`You hold ${formatSats(held)} sats. At the same pace you would hold ${formatSats(end.sats)} sats by ${year(end.at)}.`}>
      <line x1={LEFT} y1={y(0)} x2={W - RIGHT} y2={y(0)} className="growth-axis" />
      <line x1={x(now)} y1={TOP} x2={x(now)} y2={y(0)} className="growth-today" />
      <polyline points={earned} className="growth-earned" />
      <polyline points={forward} className="growth-ahead" />
      <circle cx={x(now)} cy={y(held)} r="4.5" className="growth-dot" />
      <circle cx={x(end.at)} cy={y(end.sats)} r="4.5" className="growth-dot growth-dot-ahead" />
      <text x={x(now)} y={H - 8} textAnchor="middle" className="growth-label">Today</text>
      <text x={W - RIGHT} y={H - 8} textAnchor="end" className="growth-label">{year(end.at)}</text>
      <text x={W - RIGHT} y={Math.max(14, y(end.sats) - 8)} textAnchor="end" className="growth-value">{formatSats(end.sats)}</text>
    </svg>
  );
}
