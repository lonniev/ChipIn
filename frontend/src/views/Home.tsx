/** The front door: what ChipIn does for a family, a few jobs to show it, and where to learn more. */

import { Link } from "react-router-dom";
import SampleCard from "../components/SampleCard";
import { useSamples, useT } from "../i18n/I18nContext";
import { useLessonArt } from "../lib/PicturesContext";

/** One of each rhythm: a daily habit, a weekly job, a big one-off, and a kindness. */
const SHOWN = [0, 2, 4, 6];

export default function Home() {
  const scene = useLessonArt("earn-it");
  const t = useT();
  const samples = useSamples();
  return (
    <div className="page grid gap-4 py-6">
      <section className="card grid gap-4 p-6">
        {scene && <img src={scene} alt={t("home.sceneAlt")} className="lesson-art" width={960} height={644} />}
        <h1 className="text-4xl font-semibold">{t("app.tagline")}</h1>
        <div className="hero-lines">
          <p>{t("home.line.jobs")}</p>
          <p>{t("home.line.reward")}</p>
          <p>{t("home.line.learn")}</p>
          <p>{t("home.line.bitcoin")}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/look" className="chip chip-money">{t("home.lookFirst")}</Link>
          <Link to="/signin" className="chip chip-accent">{t("home.start")}</Link>
          <Link to="/guide" className="chip">{t("guide.title")}</Link>
          <Link to="/learn" className="chip">{t("home.learnMoney")}</Link>
        </div>
      </section>

      <section className="grid gap-3">
        <h2 className="section-title">{t("home.samples.title")}</h2>
        <div className="samples">{SHOWN.map((i) => samples[i]).map((s) => <SampleCard key={s.key} sample={s} />)}</div>
        <p className="muted text-right"><Link to="/guide" className="ent">{t("home.seeAll")}</Link></p>
      </section>
    </div>
  );
}
