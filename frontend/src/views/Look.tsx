/** Look around before signing in: a sample family's chores, a chore's page, and savings. Nothing here is real. */

import { ArrowLeft } from "lucide-react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { SampleFamilyProvider } from "../lib/FamilyContext";
import { LookContext } from "../lib/LookContext";
import { SAMPLE_MEMBERS, samplePayout, sampleTasks, viewerNpub, type Viewer } from "../lib/sampleFamily";
import { Sheet } from "./Chore";
import { Board } from "./Chores";
import { SavingsSheet } from "./Savings";

const VIEWERS: { viewer: Viewer; label: string; says: string }[] = [
  { viewer: "sam", label: "Sam, a child", says: "Sam sees chores he may take, the ones he is doing, and what he has earned." },
  { viewer: "mom", label: "Mom, a parent", says: "Mom sees every chore, the work waiting to be checked, and what she owes." },
];

export default function Look() {
  const { taskId, page } = useParams();
  const [asked] = useSearchParams();
  const viewer: Viewer = asked.get("as") === "mom" ? "mom" : "sam";
  const now = Math.floor(Date.now() / 1000);
  const me = viewerNpub(viewer);
  const tasks = sampleTasks(viewer, now);
  const task = taskId ? tasks.find((t) => t.task_id === taskId) : undefined;
  if (taskId && !task) return <Navigate to={`/look?as=${viewer}`} replace />;
  const home = `/look?as=${viewer}`;
  const savings = page === "savings";

  return (
    <LookContext.Provider value>
      <SampleFamilyProvider me={me} members={SAMPLE_MEMBERS}>
        <div className="page grid gap-4">
          <section className="card panel grid gap-2">
            <h1 className="text-2xl font-bold">Look around</h1>
            <p>This is a sample family. Nothing here is real, and nothing you tap is sent.</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="See it as">
              {VIEWERS.map((v) => (
                <Link key={v.viewer} to={`/look?as=${v.viewer}`} className={v.viewer === viewer ? "pick pick-on" : "pick"} aria-current={v.viewer === viewer}>{v.label}</Link>
              ))}
            </div>
            <p className="muted">{VIEWERS.find((v) => v.viewer === viewer)?.says}</p>
            <div className="flex flex-wrap justify-end gap-2">
              <Link to="/signin" className="btn btn-go">Start your own</Link>
            </div>
          </section>

          {(task || savings) && (
            <div className="toolbar">
              <Link to={home} className="btn btn-quiet"><ArrowLeft size={22} aria-hidden />Chores</Link>
            </div>
          )}

          {task && <Sheet task={task} payout={samplePayout(task, now)} now={now} onChanged={() => {}} onPay={() => {}} />}
          {savings && <SavingsSheet tasks={sampleTasks("sam", now)} me={viewerNpub("sam")} now={now} />}
          {!task && !savings && (
            <>
              <h2 className="text-3xl font-bold">Chores</h2>
              <Board tasks={tasks} me={me} now={now} onChanged={() => {}} />
            </>
          )}
        </div>
      </SampleFamilyProvider>
    </LookContext.Provider>
  );
}
