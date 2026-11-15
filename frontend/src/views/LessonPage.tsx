/** One lesson told at length, with something to do and a question for the table. */

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { lessonAt, LESSONS } from "../lib/lessons";

export default function LessonPage() {
  const { slug = "" } = useParams();
  const lesson = lessonAt(slug);
  if (!lesson) return <Navigate to="/learn" replace />;
  const next = LESSONS[(LESSONS.indexOf(lesson) + 1) % LESSONS.length];

  return (
    <div className="page grid gap-3">
      <div className="toolbar">
        <Link to="/learn" className="btn btn-quiet"><ArrowLeft size={22} aria-hidden />Learn</Link>
      </div>
      <article className="card panel lesson lesson-long">
        <h1 className="lesson-head"><span aria-hidden>{lesson.picture}</span>{lesson.title}</h1>
        {lesson.lines.map((line) => <p key={line} className="lesson-lead">{line}</p>)}
        {lesson.more.map((line) => <p key={line}>{line}</p>)}
        {lesson.saying && (
          <blockquote className="saying">
            “{lesson.saying.text}”
            <cite>{lesson.saying.from}</cite>
          </blockquote>
        )}
      </article>
      <section className="card panel grid gap-1">
        <h2 className="panel-title"><span aria-hidden>🛠️</span> Try this</h2>
        <p>{lesson.tryThis}</p>
      </section>
      <section className="card panel grid gap-1">
        <h2 className="panel-title"><span aria-hidden>🍽️</span> Ask at supper</h2>
        <p>{lesson.ask}</p>
      </section>
      <div className="flex justify-end">
        <Link to={`/learn/${next.slug}`} className="btn btn-go">{next.title}<ArrowRight size={22} aria-hidden /></Link>
      </div>
    </div>
  );
}
