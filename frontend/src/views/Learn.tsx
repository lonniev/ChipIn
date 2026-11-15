/** Bitcoin for a beginner: what sats are, how they move, and what earning them is for. */

import { BookOpen, ChevronRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { artFor } from "../lib/lessonArt";
import {
  bookHref, BOOKSHELF_HREF, CHARACTER_LESSONS, MONEY_LESSONS, ORANGE_BIBLE_HREF, SHELVES, USE_LESSONS, VIRTUES_LESSON, WORDS, type Lesson,
} from "../lib/lessons";

function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <Link to={`/learn/${lesson.slug}`} className="card panel lesson lesson-link">
      {artFor(lesson.slug) && <img src={artFor(lesson.slug)} alt="" className="lesson-art" loading="lazy" width={960} height={644} />}
      <h3 className="lesson-title"><span aria-hidden>{lesson.picture}</span>{lesson.title}</h3>
      {lesson.lines.map((line) => <p key={line}>{line}</p>)}
      {lesson.saying && (
        <blockquote className="saying">
          “{lesson.saying.text}”
          <cite>{lesson.saying.from}</cite>
        </blockquote>
      )}
      <span className="lesson-more">More<ChevronRight size={20} aria-hidden /></span>
    </Link>
  );
}

const out = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Learn() {
  return (
    <div className="page grid gap-4">
      <h1 className="text-3xl font-bold">Learn about sats</h1>

      <section className="grid gap-3" aria-label="Bitcoin">
        <h2 className="section-title">Bitcoin, in four steps</h2>
        <div className="lessons">{MONEY_LESSONS.map((l) => <LessonCard key={l.title} lesson={l} />)}</div>
      </section>

      <section className="grid gap-3" aria-label="Character">
        <h2 className="section-title">What to do with what you earn</h2>
        <div className="lessons">{CHARACTER_LESSONS.map((l) => <LessonCard key={l.title} lesson={l} />)}</div>
      </section>

      <section className="grid gap-3" aria-label="Uses">
        <h2 className="section-title">Putting sats to work</h2>
        <div className="lessons">{USE_LESSONS.map((l) => <LessonCard key={l.title} lesson={l} />)}</div>
      </section>

      <section className="grid gap-3" aria-label="Virtues">
        <h2 className="section-title">Character</h2>
        <div className="lessons"><LessonCard lesson={VIRTUES_LESSON} /></div>
      </section>

      <section className="card panel grid gap-2">
        <h2 className="panel-title">Words you will meet</h2>
        <dl className="words">
          {WORDS.map((w) => (<div key={w.word}><dt>{w.word}</dt><dd>{w.means}</dd></div>))}
        </dl>
      </section>

      <section className="card panel grid gap-3">
        <h2 className="panel-title">Keep learning</h2>
        <p className="muted">For parents, and for children ready for more.</p>
        {SHELVES.map((shelf) => (
          <div key={shelf.title} className="grid gap-2">
            <h3 className="shelf-title">{shelf.title}</h3>
            <ul className="shelf">
              {shelf.books.map((k) => (
                <li key={k.handle}>
                  <BookOpen size={22} aria-hidden className="shelf-mark" />
                  <div>
                    <a href={bookHref(k)} {...out} className="ent font-semibold">{k.name}</a>
                    <span className="muted"> · {k.by}</span>
                    <p>{k.says}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex flex-wrap gap-2">
          <a href={BOOKSHELF_HREF} {...out} className="btn btn-quiet"><BookOpen size={22} aria-hidden />More books at Good Brew<ExternalLink size={16} aria-hidden /></a>
        </div>
        <div className="orange-bible">
          <span aria-hidden className="orange-bible-mark">📖</span>
          <div>
            <a href={ORANGE_BIBLE_HREF} {...out} className="ent font-semibold">Orange Bible</a>
            <p>A Bible app that rewards daily reading with sats.</p>
          </div>
        </div>
      </section>

      <p className="muted text-right">Ready to earn some? <Link to="/chores" className="ent">Go to your chores</Link></p>
    </div>
  );
}
