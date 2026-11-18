/** The names this device gives the family's npubs, and your own npub to hand out. */

import PictureChoice from "../components/PictureChoice";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Check, Copy, Trash2, UserPlus } from "lucide-react";
import { NpubField, useAppShell } from "@tollbooth-dpyc/web/react";
import { useT } from "../i18n";
import { useFamily } from "../lib/FamilyContext";
import { Face } from "../components/Links";
import { isNpub, shortNpub } from "../lib/family";

export default function Family() {
  const { session } = useAppShell();
  const { members, add, remove } = useFamily();
  const t = useT();
  const [params] = useSearchParams();
  const who = params.get("who") ?? "";
  const known = members.some((m) => m.npub === who);

  const [name, setName] = useState("");
  const [npub, setNpub] = useState("");
  const [problem, setProblem] = useState("");
  const [copied, setCopied] = useState(false);
  const [sure, setSure] = useState("");

  // A link to someone with no name here opens the form with their npub in it.
  useEffect(() => {
    if (who && !known && who !== session.npub && isNpub(who)) setNpub(who);
  }, [who, known, session.npub]);

  function save() {
    if (!name.trim()) return setProblem(t("family.giveName"));
    if (!npub) return setProblem(t("family.notNpub"));
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
      <h1 className="text-3xl font-bold">{t("family.title")}</h1>

      <section className={who === session.npub ? "card panel grid gap-2 who-on" : "card panel grid gap-2"}>
        <h2 className="panel-title">{t("family.you")}</h2>
        <div className="flex items-start gap-2">
          <p className="mono-box flex-1">{session.npub}</p>
          <button type="button" className="icon-btn" onClick={() => void copyMine()} aria-label={t("family.copyNpub")} title={t("family.copyNpub")}>
            {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
          </button>
        </div>
        <p className="muted text-sm">{t("family.needsNpub")}</p>
      </section>

      <section className="card panel grid gap-2">
        <h2 className="panel-title">{t("family.people")} ({members.length})</h2>
        {!members.length && <p className="muted">{t("family.nobody")}</p>}
        <ul>
          {members.map((m) => (
            <li key={m.npub} className={m.npub === who ? "member-row who-on" : "member-row"}>
              <span className="person"><Face npub={m.npub} name={m.name} big /><span className="text-lg font-semibold">{m.name}</span></span>
              <span className="muted num text-sm" title={m.npub}>{shortNpub(m.npub)}</span>
              <button
                type="button" className={sure === m.npub ? "btn btn-quiet" : "icon-btn"}
                onClick={() => (sure === m.npub ? remove(m.npub) : setSure(m.npub))} onBlur={() => setSure("")}
                aria-label={t("family.remove", { name: m.name })} title={t("family.remove", { name: m.name })}
              >
                {sure === m.npub ? t("family.tapAgainRemove") : <Trash2 size={18} aria-hidden />}
              </button>
            </li>
          ))}
        </ul>
        <form className="add-form" onSubmit={(e) => { e.preventDefault(); save(); }}>
          <input className="field" value={name} maxLength={40} onChange={(e) => setName(e.target.value)} placeholder={t("family.name")} aria-label={t("family.name")} />
          <span className="flex-1 min-w-0">
            <NpubField value={npub} onChange={setNpub} label={t("family.theirNpub")} placeholder={t("family.theirNpubPlaceholder")}
              look={{ inputClassName: "field", buttonClassName: "chip" }} />
          </span>
          <button type="submit" className="btn btn-go"><UserPlus size={22} aria-hidden />{t("family.add")}</button>
        </form>
        {problem && <p className="error text-right">{problem}</p>}
        <p className="muted text-sm">{t("family.namesStay")}</p>
      </section>
      <PictureChoice />
    </div>
  );
}
