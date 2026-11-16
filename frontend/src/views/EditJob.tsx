/** Change a job's terms while nobody has taken it on. Once someone has, the terms are what they agreed to. */

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import JobForm from "../components/JobForm";
import { jobHref } from "../components/Links";
import Waiting from "../components/Waiting";
import { useT } from "../i18n";
import { mayEdit } from "../lib/moves";
import { getTask, type Task } from "../lib/tasks";

export default function EditJob() {
  const { taskId = "" } = useParams();
  const t = useT();
  const [task, setTask] = useState<Task | null>(null);
  const [problem, setProblem] = useState("");

  useEffect(() => {
    getTask(taskId).then((r) => setTask(r.task), (e) => setProblem((e as Error).message));
  }, [taskId]);

  if (problem) return <div className="page"><p className="card panel error">{problem}</p></div>;
  if (!task) return <div className="page"><div className="card panel"><Waiting heading={t("waiting.fetchingJobs")} /></div></div>;
  if (!mayEdit(task)) {
    return (
      <div className="page grid gap-3">
        <p className="card panel">{t("editJob.onlyOpen")}</p>
        <Link to={jobHref(task.task_id)} className="btn btn-quiet justify-self-end">{t("actions.cancel")}</Link>
      </div>
    );
  }
  return <JobForm editing={task} />;
}
