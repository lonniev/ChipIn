/** How a chore goes, in six steps. */

import { BadgeCheck, Check, ClipboardList, Hand, ThumbsUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { WalletChooser } from "@tollbooth-dpyc/web/react";
import SampleCard from "../components/SampleCard";
import { useLessons, useSamples, useT } from "../i18n/I18nContext";

const STEPS = [
  { icon: ClipboardList, step: "post" },
  { icon: Hand, step: "claim" },
  { icon: Check, step: "do" },
  { icon: ThumbsUp, step: "grade" },
  { icon: Zap, step: "pay" },
  { icon: BadgeCheck, step: "paid" },
] as const;

export default function Guide() {
  const t = useT();
  const samples = useSamples();
  const keepingSafe = useLessons().at("where-sats-live");
  return (
    <div className="page grid gap-3">
      <h1 className="text-2xl font-semibold">{t("guide.title")}</h1>
      <ol className="steps">
        {STEPS.map(({ icon: Icon, step }, i) => (
          <li key={step} className="card panel step">
            <span className="step-mark"><Icon size={22} aria-hidden />{i + 1}</span>
            <div>
              <h2 className="panel-title">{t(`guide.step.${step}.title`)}</h2>
              <p className="muted">{t(`guide.step.${step}.says`)}</p>
            </div>
          </li>
        ))}
      </ol>
      <section className="card panel grid gap-2" id="wallet">
        <h2 className="panel-title"><span aria-hidden>👛</span> {t("guide.wallet.title")}</h2>
        <p>{t("guide.wallet.each")}</p>
        <p>{t("guide.wallet.parentFirst")}</p>
        <p>{t("guide.wallet.youngChild")}</p>
        <p>{t("guide.wallet.backup")}</p>
        <p>{t("guide.wallet.toBePaid")}</p>
        <div className="flex flex-wrap justify-end gap-2">
          <WalletChooser className="btn btn-go wallet-door" />
        </div>
        <p className="muted text-sm">{t.rich("guide.wallet.more", { lesson: <Link to="/learn/where-sats-live" className="ent">{keepingSafe?.title}</Link> })}</p>
      </section>
      <section className="grid gap-3">
        <h2 className="section-title">{t("guide.samples.title")}</h2>
        <p className="muted">{t("guide.samples.says")}</p>
        <div className="samples">{samples.map((s) => <SampleCard key={s.key} sample={s} />)}</div>
      </section>
      <section className="card panel grid gap-2">
        <h2 className="panel-title">{t("guide.know.title")}</h2>
        <p>{t("guide.know.npub")}</p>
        <p>{t.rich("guide.know.wallet", { profile: <Link to="/profile" className="ent">{t("guide.know.profile")}</Link> })}</p>
        <p>{t("guide.know.straight")}</p>
        <p>{t("guide.know.disagree")}</p>
        <p>{t("guide.know.yourself")}</p>
        <p>{t.rich("guide.know.newToBitcoin", { learn: <Link to="/learn" className="ent">{t("learn.title")}</Link> })}</p>
      </section>
    </div>
  );
}
