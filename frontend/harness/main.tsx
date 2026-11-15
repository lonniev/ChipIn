/**
 * ChipIn's chore board and chore page on a sample family, for look reviews:
 * the real components, with nothing sent to Task Queue. `?view=sheet` shows a
 * chore that is owed, with its invoice.
 */
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { FamilyProvider } from "../src/lib/FamilyContext";
import type { Role, Standing } from "../src/lib/moves";
import type { Task } from "../src/lib/tasks";
import { Sheet } from "../src/views/Chore";
import { Board } from "../src/views/Chores";
import { SavingsSheet } from "../src/views/Savings";
import "../src/index.css";

const key = (c: string) => "npub1" + c.repeat(58);
const MUM = key("q");
const SAM = key("p");
const now = Math.floor(Date.now() / 1000);
const DAY = 86_400;

localStorage.setItem("chipin:family", JSON.stringify([{ npub: MUM, name: "Mum" }, { npub: SAM, name: "Sam" }]));

const rubric = {
  grades: [
    { name: "Great job", sats: 1000, criteria: "Nothing left on the floor" },
    { name: "Good enough", sats: 500, criteria: "" },
    { name: "Not done", sats: 0, criteria: "" },
  ],
  appeal: "",
};

function chore(id: string, title: string, standing: Standing, your_roles: Role[], more: Partial<Task> = {}): Task {
  return {
    task_id: id, title, description: "", rubric, purchaser: MUM, performer: SAM, audience: [SAM], assessors: [MUM],
    tie_breaker: MUM, standing, final: false, your_roles, needed_by: now + DAY, every_days: 0, ...more,
  };
}

const graded = (sats: number, grade: string) => ({ grade, sats, assessor: MUM, reasons: "", at: now });

const tasks: Task[] = [
  chore("1", "🧹 Sweep the kitchen floor", "posted", ["audience"], { performer: null, needed_by: now + 2 * DAY, every_days: 1, description: "Every evening, after supper is cleared.\nSweep under the table and along the cupboards.\nTip the dustpan into the bin and hang the broom back on its hook." }),
  chore("2", "🛏️ Make your bed before school", "claimed", ["performer"], { every_days: 1, needed_by: now }),
  chore("3", "🍽️ Empty the dishwasher", "assessed", ["performer"], { assessment: graded(500, "Good enough") }),
  chore("4", "🐕 Walk Rex round the block", "owed", ["performer"], { final: true, assessment: graded(1000, "Great job") }),
  chore("5", "🧺 Fold the laundry", "done", ["performer"]),
  chore("6", "🗑️ Take the bins to the kerb", "paid", ["performer"], { final: true, assessment: graded(1000, "Great job"), needed_by: now - 3 * DAY }),
  chore("7", "🌱 Water the plants", "paid", ["performer"], { final: true, assessment: graded(500, "Good enough"), needed_by: now - 5 * DAY }),
];

const owed = chore("4", "🐕 Walk Rex round the block", "owed", ["purchaser", "assessor"], {
  final: true, assessment: { ...graded(1000, "Great job"), reasons: "Rex came back tired and happy." },
  description: "After school, before supper.\nTwenty minutes, on the lead, round the block.\nTake a bag, and fill his water bowl when you are back.",
});
const invoice = "lnbc10u1p" + "x".repeat(180);
const payout = { sats: 1000, invoice, lightning_uri: `lightning:${invoice}`, payment_hash: "0".repeat(64), expires_at: now + 3540, paid_at: null };
const toCheck = chore("5", "🧺 Fold the laundry", "done", ["purchaser", "assessor"]);

const asked = new URLSearchParams(location.search);
const view = asked.get("view");
document.documentElement.dataset.theme = asked.get("theme") ?? "light";
const me = view && view !== "ask" && view !== "savings" ? MUM : SAM;

createRoot(document.getElementById("root")!).render(
  <MemoryRouter>
    <FamilyProvider me={me}>
      <div className="page grid gap-4">
        {view === "sheet" && <Sheet task={owed} payout={payout} now={now} onChanged={() => {}} onPay={() => {}} />}
        {view === "ask" && <Sheet task={chore("4", "🐕 Walk Rex round the block", "owed", ["performer"], { final: true, assessment: graded(1000, "Great job") })} payout={null} now={now} onChanged={() => {}} onPay={() => {}} />}
        {view === "savings" && <SavingsSheet tasks={tasks.map((t, i) => (t.assessment ? { ...t, assessment: { ...t.assessment, at: now - (9 - i) * 6 * DAY } } : t))} me={SAM} now={now} />}
        {view === "check" && <Sheet task={toCheck} payout={null} now={now} onChanged={() => {}} onPay={() => {}} />}
        {!view && (
          <>
            <h1 className="text-3xl font-bold">Chores</h1>
            <Board tasks={tasks} me={SAM} now={now} onChanged={() => {}} />
          </>
        )}
      </div>
    </FamilyProvider>
  </MemoryRouter>,
);
