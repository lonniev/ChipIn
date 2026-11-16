/** One sample chore, shown whole: what, where and when, and what each grade earns. */

import { Repeat } from "lucide-react";
import { formatSats } from "@tollbooth-dpyc/web";
import { useT } from "../i18n/I18nContext";
import { say } from "../i18n/translate";
import type { SampleChore } from "../lib/samples";
import { repeatText } from "../lib/when";

export default function SampleCard({ sample }: { sample: SampleChore }) {
  const t = useT();
  return (
    <article className="card panel sample">
      <p className="sample-kind">{sample.kind}</p>
      <h3 className="sample-title"><span aria-hidden>{sample.picture}</span>{sample.title}</h3>
      <ul className="sample-lines">
        {sample.description.split("\n").map((line) => <li key={line}>{line}</li>)}
      </ul>
      {sample.everyDays > 0 && <p className="muted"><Repeat size={16} aria-hidden className="inline" /> {say(t, repeatText(sample.everyDays))}</p>}
      <table className="ledger">
        <tbody>
          {sample.rows.map((row) => (
            <tr key={row.name}>
              <td className="font-medium">{row.name}</td>
              <td className="muted">{row.criteria}</td>
              <td className="num text-right">{formatSats(Number(row.sats))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="sample-teaches">{sample.teaches}</p>
    </article>
  );
}
