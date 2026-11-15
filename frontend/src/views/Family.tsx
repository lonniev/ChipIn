/** The names this device gives the family's npubs, and your own npub to hand out. */

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Check, Copy, Trash2, UserPlus } from "lucide-react";
import { useAppShell } from "@tollbooth-dpyc/web/react";
import { useFamily } from "../lib/FamilyContext";
import { isNpub, shortNpub } from "../lib/family";

export default function Family() {
  const { session } = useAppShell();
  const { members, add, remove } = useFamily();
  const [params] = useSearchParams();
  const who = params.get("who") ?? "";
  const known = members.some((m) => m.npub === who);

  const [name, setName] = useState("");
  const [npub, setNpub] = useState("");
  const [problem, setProblem] = useState("");
  const [copied, setCopied] = useState(false);

  // A link to someone with no name here opens the form with their npub in it.
  useEffect(() => {
    if (who && !known && who !== session.npub && isNpub(who)) setNpub(who);
  }, [who, known, session.npub]);

  function save() {
    if (!name.trim()) return setProblem("Give them a name.");
    if (!isNpub(npub)) return setProblem("That is not an npub. It starts with npub1.");
    add(npub, name);
    setName("");
    setNpub("");
    setProblem("");
  }

  async function copyMine() {
    await navigator.clipboard?.writeText(session.npub);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="page grid gap-3">
      <h1 className="text-2xl font-semibold">Family</h1>

      <section className={who === session.npub ? "card panel grid gap-2 who-on" : "card panel grid gap-2"}>
        <h2 className="panel-title">You</h2>
        <div className="flex items-start gap-2">
          <p className="mono-box flex-1">{session.npub}</p>
          <button type="button" className="icon-btn" onClick={() => void copyMine()} aria-label="Copy your npub" title="Copy your npub">
            {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
          </button>
        </div>
        <p className="muted text-sm">Whoever posts chores for you needs this npub.</p>
      </section>

      <section className="card panel grid gap-2">
        <h2 className="panel-title">People ({members.length})</h2>
        {!members.length && <p className="muted">Nobody yet. Add each person by their npub.</p>}
        <ul>
          {members.map((m) => (
            <li key={m.npub} className={m.npub === who ? "member-row who-on" : "member-row"}>
              <span className="font-medium">{m.name}</span>
              <span className="muted num text-sm" title={m.npub}>{shortNpub(m.npub)}</span>
              <button type="button" className="icon-btn icon-btn-sm" onClick={() => remove(m.npub)} aria-label={`Remove ${m.name}`} title={`Remove ${m.name}`}>
                <Trash2 size={14} aria-hidden />
              </button>
            </li>
          ))}
        </ul>
        <form className="add-form" onSubmit={(e) => { e.preventDefault(); save(); }}>
          <input className="field" value={name} maxLength={40} onChange={(e) => setName(e.target.value)} placeholder="Name" aria-label="Name" />
          <input className="field flex-1" value={npub} onChange={(e) => setNpub(e.target.value)} placeholder="npub1…" aria-label="npub" autoCapitalize="none" spellCheck={false} />
          <button type="submit" className="chip chip-accent"><UserPlus size={16} aria-hidden />Add</button>
        </form>
        {problem && <p className="error text-right">{problem}</p>}
        <p className="muted text-sm">Names stay on this device.</p>
      </section>
    </div>
  );
}
