/** Look around before signing in: a sample family's jobs, a job's page, and savings. Nothing here is real. */

import { useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { useT } from "../i18n";
import { useLessonArt } from "../lib/PicturesContext";
import { useSamples } from "../lib/content";
import { SampleFamilyProvider } from "../lib/FamilyContext";
import { LookContext } from "../lib/LookContext";
import { sampleMembers, samplePayout, sampleTasks, viewerNpub, type Viewer } from "../lib/sampleFamily";
import { Sheet } from "./Job";
import { CalendarSheet } from "./Calendar";
import { Board } from "./Jobs";
import { SavingsSheet } from "./Savings";

const VIEWERS: Viewer[] = ["sam", "mom"];

export default function Look() {
  const { taskId, page } = useParams();
  const [asked] = useSearchParams();
  const viewer: Viewer = asked.get("as") === "mom" ? "mom" : "sam";
  const now = Math.floor(Date.now() / 1000);
  const me = viewerNpub(viewer);
  const t = useT();
  const samples = useSamples();
  const members = useMemo(() => sampleMembers(t), [t]);
  const tasks = sampleTasks(viewer, now, samples);
  const task = taskId ? tasks.find((one) => one.task_id === taskId) : undefined;
  if (taskId && !task) return <Navigate to={`/look?as=${viewer}`} replace />;
  const home = `/look?as=${viewer}`;
  const doves = useLessonArt("the-virtues");
  const savings = page === "savings";
  const calendar = page === "calendar";

  return (
    <LookContext.Provider value>
      <SampleFamilyProvider me={me} members={members}>
        <div className="page grid gap-4">
          {!task && !savings && !calendar && (
            <section className="card panel grid gap-3">
              {doves && <img src={doves} alt={t("look.mission.picture")} className="lesson-art" width={960} height={644} />}
              <h1 className="text-3xl font-bold">{t("look.mission.title")}</h1>
              <p className="text-lg">{t("look.mission.virtues")}</p>
              <p className="text-lg">{t("look.mission.money")}</p>
              <p className="text-right"><Link to="/learn/the-virtues" className="ent">{t("look.mission.more")}</Link></p>
            </section>
          )}
          <section className="card panel grid gap-2">
            <h2 className="text-2xl font-bold">{t("look.title")}</h2>
            <p>{t("look.intro")}</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label={t("look.seeAs")}>
              {VIEWERS.map((v) => (
                <Link key={v} to={`/look?as=${v}`} className={v === viewer ? "pick pick-on" : "pick"} aria-current={v === viewer}>{t(`look.${v}.label`)}</Link>
              ))}
            </div>
            <p className="muted">{t(`look.${viewer}.says`)}</p>
            <div className="flex flex-wrap justify-end gap-2">
              <Link to="/signin" className="btn btn-go">{t("look.start")}</Link>
            </div>
          </section>

          {(task || savings || calendar) && (
            <div className="toolbar">
              <Link to={home} className="btn btn-quiet"><ArrowLeft size={22} aria-hidden />{t("nav.jobs")}</Link>
            </div>
          )}

          {task && <Sheet task={task} payout={samplePayout(task, now)} now={now} onChanged={() => {}} onPay={() => {}} />}
          {savings && <SavingsSheet tasks={sampleTasks("sam", now, samples)} me={viewerNpub("sam")} now={now} />}
          {calendar && (
            <>
              <h2 className="text-3xl font-bold">{t("cal.title")}</h2>
              <CalendarSheet tasks={tasks} me={me} now={now} onChanged={() => {}} />
            </>
          )}
          {!task && !savings && !calendar && (
            <>
              <h2 className="text-3xl font-bold">{t("jobs.title")}</h2>
              <Board tasks={tasks} me={me} now={now} onChanged={() => {}} />
            </>
          )}
        </div>
      </SampleFamilyProvider>
    </LookContext.Provider>
  );
}
