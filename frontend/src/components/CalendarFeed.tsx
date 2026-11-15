/** Chores in the phone's own calendar: make a private link, open it in the calendar app, or take it away. */

import { useEffect, useState } from "react";
import { CalendarPlus, Check, Copy, Trash2 } from "lucide-react";
import { listFeeds, publishFeed, revokeFeed, type Feed } from "../lib/tasks";

const pathOf = (token: string) => `${globalThis.location.host}/calendar/${token}.ics`;

export default function CalendarFeed() {
  const [feeds, setFeeds] = useState<Feed[] | null>(null);
  const [problem, setProblem] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState("");
  const [sure, setSure] = useState("");

  useEffect(() => {
    listFeeds().then(setFeeds, (e: Error) => setProblem(e.message));
  }, []);

  async function run(action: () => Promise<void>) {
    setBusy(true);
    setProblem("");
    try {
      await action();
      setFeeds(await listFeeds());
    } catch (e) {
      setProblem((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const add = () => run(async () => { await publishFeed("ChipIn chores", Intl.DateTimeFormat().resolvedOptions().timeZone); });

  async function copy(token: string) {
    await navigator.clipboard?.writeText(`https://${pathOf(token)}`);
    setCopied(token);
    setTimeout(() => setCopied(""), 2000);
  }

  return (
    <section className="card panel grid gap-3" id="calendar">
      <h2 className="panel-title">Chores in your calendar</h2>
      <p className="muted text-sm">Your phone's calendar can show each chore on the day it is due.</p>
      {feeds?.map((f) => (
        <div key={f.token} className="grid gap-2">
          <div className="flex flex-wrap justify-end gap-2">
            <a href={`webcal://${pathOf(f.token)}`} className="btn btn-go"><CalendarPlus size={22} aria-hidden />Open in calendar</a>
            <button type="button" className="btn btn-quiet" onClick={() => void copy(f.token)}>
              {copied === f.token ? <Check size={22} aria-hidden /> : <Copy size={22} aria-hidden />}
              {copied === f.token ? "Copied" : "Copy link"}
            </button>
            {sure === f.token ? (
              <button type="button" className="btn btn-quiet" disabled={busy} onClick={() => void run(() => revokeFeed(f.token))}>
                <Trash2 size={22} aria-hidden />Yes, remove it
              </button>
            ) : (
              <button type="button" className="icon-btn" onClick={() => setSure(f.token)} aria-label="Remove this link" title="Remove this link">
                <Trash2 size={20} aria-hidden />
              </button>
            )}
          </div>
          <p className="muted text-right text-sm">
            {f.zone}{f.fetches > 0 && <> · read <span className="num">({f.fetches})</span></>}
          </p>
        </div>
      ))}
      {feeds && !feeds.length && (
        <div className="flex justify-end">
          <button type="button" className="btn btn-go" disabled={busy} onClick={() => void add()}>
            <CalendarPlus size={22} aria-hidden />Add to my calendar
          </button>
        </div>
      )}
      <p className="muted text-sm">Anyone who has the link can see your chores and when they are due. It carries no names. Keep it to your family.</p>
      {problem && <p className="error text-right">{problem}</p>}
    </section>
  );
}
