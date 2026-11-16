/** Bitcoin for a beginner: what sats are, how they move, and what earning them is for. */

import { BookOpen, ChevronRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import PictureChoice from "../components/PictureChoice";
import { useLessons, useT } from "../i18n/I18nContext";
import { useLessonArt, usePictures } from "../lib/PicturesContext";
import { bookHref, BOOKSHELF_HREF, ORANGE_BIBLE_HREF, type Lesson } from "../lib/lessons";

function LessonCard({ lesson }: { lesson: Lesson }) {
  const art = useLessonArt(lesson.slug);
  const t = useT();
  return (
    <Link to={`/learn/${lesson.slug}`} className="card panel lesson lesson-link">
      {art && <img src={art} alt="" className="lesson-art" loading="lazy" width={960} height={644} />}
      <h3 className="lesson-title"><span aria-hidden>{lesson.picture}</span>{lesson.title}</h3>
      {lesson.lines.map((line) => <p key={line}>{line}</p>)}
      {lesson.saying && (
        <blockquote className="saying">
          {t("quote.marks", { text: lesson.saying.text })}
          <cite>{lesson.saying.from}</cite>
        </blockquote>
      )}
      <span className="lesson-more">{t("learn.more")}<ChevronRight size={20} aria-hidden /></span>
    </Link>
  );
}

const out = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Learn() {
  const { chosen } = usePictures();
  const t = useT();
  const library = useLessons();
  return (
    <div className="page grid gap-4">
      <h1 className="text-3xl font-bold">{t("learn.title")}</h1>

      <section className="grid gap-3" aria-label={t("learn.money.aria")}>
        <h2 className="section-title">{t("learn.money.title")}</h2>
        <div className="lessons">{library.money.map((l) => <LessonCard key={l.slug} lesson={l} />)}</div>
      </section>

      <section className="grid gap-3" aria-label={t("learn.character.aria")}>
        <h2 className="section-title">{t("learn.character.title")}</h2>
        <div className="lessons">{library.character.map((l) => <LessonCard key={l.slug} lesson={l} />)}</div>
      </section>

      <section className="grid gap-3" aria-label={t("learn.uses.aria")}>
        <h2 className="section-title">{t("learn.uses.title")}</h2>
        <div className="lessons">{library.uses.map((l) => <LessonCard key={l.slug} lesson={l} />)}</div>
      </section>

      <section className="grid gap-3" aria-label={t("learn.virtues.aria")}>
        <h2 className="section-title">{t("learn.virtues.title")}</h2>
        <div className="lessons">{library.virtues.map((l) => <LessonCard key={l.slug} lesson={l} />)}</div>
      </section>

      <section className="card panel grid gap-2">
        <h2 className="panel-title">{t("learn.words.title")}</h2>
        <dl className="words">
          {library.words.map((w) => (<div key={w.word}><dt>{w.word}</dt><dd>{w.means}</dd></div>))}
        </dl>
      </section>

      <section className="card panel grid gap-3">
        <h2 className="panel-title">{t("learn.keep.title")}</h2>
        <p className="muted">{t("learn.keep.says")}</p>
        {library.shelves.map((shelf) => (
          <div key={shelf.key} className="grid gap-2">
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
          <a href={BOOKSHELF_HREF} {...out} className="btn btn-quiet"><BookOpen size={22} aria-hidden />{t("learn.moreBooks")}<ExternalLink size={16} aria-hidden /></a>
        </div>
        <div className="orange-bible">
          <span aria-hidden className="orange-bible-mark">📖</span>
          <div>
            <a href={ORANGE_BIBLE_HREF} {...out} className="ent font-semibold">Orange Bible</a>
            <p>{t("learn.orangeBible.says")}</p>
          </div>
        </div>
      </section>

      {chosen && <PictureChoice />}

      <p className="muted text-right">{t.rich("learn.ready", { chores: <Link to="/chores" className="ent">{t("chores.go")}</Link> })}</p>
    </div>
  );
}
