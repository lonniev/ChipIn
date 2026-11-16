/** One lesson told at length, with something to do and a question for the table. */

import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { lessonAt, LESSONS } from "../lib/lessons";
import { useLessonArt } from "../lib/PicturesContext";

export default function LessonPage() {
  const { slug = "" } = useParams();
  const lesson = lessonAt(slug);
  const art = useLessonArt(slug);
  if (!lesson) return <Navigate to="/learn" replace />;
  const next = LESSONS[(LESSONS.indexOf(lesson) + 1) % LESSONS.length];

  return (
    <div className="page grid gap-3">
      <div className="toolbar">
        <Link to="/learn" className="btn btn-quiet"><ArrowLeft size={22} aria-hidden />Learn</Link>
      </div>
      <article className="card panel lesson lesson-long">
        {art && <img src={art} alt="" className="lesson-art" width={960} height={644} />}
        <h1 className="lesson-head"><span aria-hidden>{lesson.picture}</span>{lesson.title}</h1>
        {lesson.lines.map((line) => <p key={line} className="lesson-lead">{line}</p>)}
        {lesson.more.map((line) => <p key={line}>{line}</p>)}
        {lesson.points && (
          <dl className="points">
            {lesson.points.map((p, i) => (
              <div key={p.name}>
                {p.group && p.group !== lesson.points![i - 1]?.group && <p className="shelf-title">{p.group}</p>}
                <dt>{p.name}</dt>
                <dd>{p.says}</dd>
              </div>
            ))}
          </dl>
        )}
        {lesson.saying && (
          <blockquote className="saying">
            “{lesson.saying.text}”
            <cite>{lesson.saying.from}</cite>
          </blockquote>
        )}
      </article>
      {lesson.links && (
        <section className="card panel grid gap-2">
          <h2 className="panel-title"><span aria-hidden>🧭</span> Places to look</h2>
          <ul className="shelf">
            {lesson.links.map((k) => (
              <li key={k.href}>
                <ExternalLink size={20} aria-hidden className="shelf-mark" />
                <div>
                  <a href={k.href} target="_blank" rel="noopener noreferrer" className="ent font-semibold">{k.name}</a>
                  <p>{k.says}</p>
                </div>
              </li>
            ))}
          </ul>
          {lesson.care && <p className="muted text-sm">{lesson.care}</p>}
        </section>
      )}
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
