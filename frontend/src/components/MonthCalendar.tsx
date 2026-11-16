/** Jobs on a month: each day shows the pictures of what is due, and a tap lists them. */

import { useState, type ReactNode } from "react";
import { CalendarPlus, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocale, useT } from "../i18n/I18nContext";
import { useLooking } from "../lib/LookContext";
import { byDay, dayKey, kindOf, monthWeeks, shiftMonth, type Browsable } from "../lib/browse";

/** A week of days starting on a Sunday, for the letters over the month's columns. */
const A_SUNDAY = new Date(2023, 0, 1);
const SHOWN_PER_DAY = 3;

export default function MonthCalendar<T extends Browsable>({ tasks, now, renderDay }: {
  tasks: T[]; now: number; renderDay: (rows: T[]) => ReactNode;
}) {
  const looking = useLooking();
  const t = useT();
  const locale = useLocale();
  const weekdays = Array.from({ length: 7 }, (_, i) => new Date(A_SUNDAY.getFullYear(), A_SUNDAY.getMonth(), A_SUNDAY.getDate() + i).toLocaleDateString(locale, { weekday: "narrow" }));
  const today = dayKey(now);
  const start = new Date(now * 1000);
  const [shown, setShown] = useState({ year: start.getFullYear(), month: start.getMonth() });
  const [picked, setPicked] = useState(today);
  const days = byDay(tasks);
  const title = new Date(shown.year, shown.month, 1).toLocaleDateString(locale, { month: "long", year: "numeric" });
  const pickedRows = days.get(picked) ?? [];
  const pickedTitle = new Date(`${picked}T12:00:00`).toLocaleDateString(locale, { weekday: "long", month: "long", day: "numeric" });

  return (
    <section className="grid gap-3">
      <div className="card panel grid gap-2">
        <div className="month-head">
          <button type="button" className="icon-btn" onClick={() => setShown((s) => shiftMonth(s.year, s.month, -1))} aria-label={t("month.before")} title={t("month.before")}>
            <ChevronLeft size={22} aria-hidden />
          </button>
          <h2 className="lane-title">{title}</h2>
          <button type="button" className="icon-btn" onClick={() => setShown((s) => shiftMonth(s.year, s.month, 1))} aria-label={t("month.after")} title={t("month.after")}>
            <ChevronRight size={22} aria-hidden />
          </button>
        </div>
        <div className="month" role="grid" aria-label={title}>
          {weekdays.map((d, i) => <span key={i} className="month-weekday" aria-hidden>{d}</span>)}
          {monthWeeks(shown.year, shown.month).flat().map((d) => {
            const rows = days.get(d.key) ?? [];
            const classes = ["month-day", !d.inMonth && "month-day-out", d.key === today && "month-day-today", d.key === picked && "month-day-on"].filter(Boolean).join(" ");
            return (
              <button key={d.key} type="button" className={classes} aria-pressed={d.key === picked} onClick={() => setPicked(d.key)}
                aria-label={`${d.key} (${rows.length})`}>
                <span className="month-num num">{d.day}</span>
                <span className="month-pictures" aria-hidden>
                  {rows.slice(0, SHOWN_PER_DAY).map((task) => <span key={task.task_id}>{kindOf(task)}</span>)}
                  {rows.length > SHOWN_PER_DAY && <span className="month-more num">+{rows.length - SHOWN_PER_DAY}</span>}
                </span>
              </button>
            );
          })}
        </div>
        {!looking && <p className="text-right"><Link to="/profile#calendar" className="ent"><CalendarPlus size={16} aria-hidden className="inline" /> {t("calendar.add")}</Link></p>}
      </div>
      <h2 className="lane-title">{pickedTitle} ({pickedRows.length})</h2>
      {pickedRows.length > 0 ? renderDay(pickedRows) : <p className="card panel muted">{t("month.nothing")}</p>}
    </section>
  );
}
