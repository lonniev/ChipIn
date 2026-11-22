/** A month of a family's job events: each day shows a picture for each kind of thing that happened, and a tap lists them. */

import type { ReactNode } from "react";
import { CalendarPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { MonthCalendar as Month } from "@tollbooth-dpyc/web/react";
import { useT } from "../i18n";
import { useLooking } from "../lib/LookContext";
import { EVENT_MARK, type EventKind, type JobEvent } from "../lib/calendar";

/** The kinds of event on a day, each once, in the order they read. */
const kindsOf = (events: JobEvent[]): EventKind[] => [...new Set(events.map((e) => e.kind))];

export default function MonthCalendar({ events, now, renderDay }: {
  events: JobEvent[]; now: number; renderDay: (events: JobEvent[]) => ReactNode;
}) {
  const looking = useLooking();
  const t = useT();
  return (
    <Month
      events={events}
      at={(e) => e.at}
      now={now}
      marks={(day) => kindsOf(day).map((k) => EVENT_MARK[k])}
      dayLabel={(day) => kindsOf(day).map((k) => t(`cal.kind.${k}`))}
      dayClass={(day) => day.some((e) => e.kind === "late") && "month-day-late"}
      legend={(Object.keys(EVENT_MARK) as EventKind[]).map((k) => ({ mark: EVENT_MARK[k], label: t(`cal.kind.${k}`) }))}
      footer={!looking && <p className="text-right"><Link to="/profile#calendar" className="ent"><CalendarPlus size={16} aria-hidden className="inline" /> {t("calendar.add")}</Link></p>}
      renderDay={renderDay}
      words={{ before: t("month.before"), after: t("month.after"), key: t("cal.key"), nothing: t("cal.nothing") }}
      classNames={{ title: "lane-title", marks: "month-pictures" }}
      iconSize={22}
    />
  );
}
