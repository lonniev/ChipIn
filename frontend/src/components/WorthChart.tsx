/** What the sats ahead could be worth: at today's price, and if bitcoin keeps its measured pace. */

import { useLocale, useT } from "../i18n/I18nContext";
import type { WorthPoint } from "../lib/worth";
import { asMoney } from "../lib/worth";

const W = 320, H = 170, LEFT = 8, RIGHT = 8, TOP = 24, BOTTOM = 26;

export default function WorthChart({ points, fiat, grows }: { points: WorthPoint[]; fiat: string; grows: boolean }) {
  const t = useT();
  const locale = useLocale();
  const from = points[0].at, to = points[points.length - 1].at;
  const top = Math.max(0.01, ...points.map((p) => Math.max(p.steady, p.grown)));
  const x = (at: number) => LEFT + ((at - from) / Math.max(1, to - from)) * (W - LEFT - RIGHT);
  const y = (v: number) => TOP + (1 - v / top) * (H - TOP - BOTTOM);
  const line = (pick: (p: WorthPoint) => number) => points.map((p) => `${x(p.at).toFixed(1)},${y(pick(p)).toFixed(1)}`).join(" ");
  const end = points[points.length - 1];
  const month = (at: number) => new Date(at * 1000).toLocaleDateString(locale, { month: "short", year: "numeric" });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="growth" role="img"
      aria-label={t(grows ? "worth.ariaGrows" : "worth.aria", { when: month(end.at), steady: asMoney(end.steady, fiat, locale), grown: asMoney(end.grown, fiat, locale) })}>
      <line x1={LEFT} y1={y(0)} x2={W - RIGHT} y2={y(0)} className="growth-axis" />
      <polyline points={line((p) => p.steady)} className="growth-earned" />
      {grows && <polyline points={line((p) => p.grown)} className="growth-ahead" />}
      <circle cx={x(end.at)} cy={y(end.steady)} r="4.5" className="growth-dot" />
      {grows && <circle cx={x(end.at)} cy={y(end.grown)} r="4.5" className="growth-dot growth-dot-ahead" />}
      <text x={LEFT} y={H - 8} className="growth-label">{t("chart.today")}</text>
      <text x={W - RIGHT} y={H - 8} textAnchor="end" className="growth-label">{month(end.at)}</text>
      {grows && <text x={W - RIGHT} y={Math.max(14, y(end.grown) - 8)} textAnchor="end" className="growth-value">{asMoney(end.grown, fiat, locale)}</text>}
    </svg>
  );
}
