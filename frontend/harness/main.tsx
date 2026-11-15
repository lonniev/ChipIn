/**
 * ChipIn's pages on the sample family, for look reviews: the real components,
 * with nothing sent to Task Queue. The family is the one visitors see under
 * Look around (`src/lib/sampleFamily.ts`).
 *
 *   (none)          Sam's board        ?view=mum       Mum's board
 *   ?view=sheet     Mum's owed chore, with its invoice
 *   ?view=ask       Sam's owed chore, asking for his sats
 *   ?view=check     Mum's chore to grade
 *   ?view=savings   Sam's savings, with a sample price
 *   &theme=dark
 */
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { SampleFamilyProvider } from "../src/lib/FamilyContext";
import { SAMPLE_MEMBERS, samplePayout, sampleTasks, viewerNpub, type Viewer } from "../src/lib/sampleFamily";
import { Sheet } from "../src/views/Chore";
import { Board } from "../src/views/Chores";
import { SavingsSheet, WorthPanel } from "../src/views/Savings";
import "../src/index.css";

const now = Math.floor(Date.now() / 1000);
const asked = new URLSearchParams(location.search);
const view = asked.get("view");
document.documentElement.dataset.theme = asked.get("theme") ?? "light";

const viewer: Viewer = view === "mum" || view === "sheet" || view === "check" ? "mum" : "sam";
const tasks = sampleTasks(viewer, now);
const standing = { sheet: "owed", ask: "owed", check: "done" }[view ?? ""];
const one = standing ? tasks.find((t) => t.standing === standing) : undefined;

createRoot(document.getElementById("root")!).render(
  <MemoryRouter>
    <SampleFamilyProvider me={viewerNpub(viewer)} members={SAMPLE_MEMBERS}>
      <div className="page grid gap-4">
        {one && <Sheet task={one} payout={view === "sheet" ? samplePayout(one, now) : null} now={now} onChanged={() => {}} onPay={() => {}} />}
        {view === "savings" && (
          <SavingsSheet tasks={tasks} me={viewerNpub("sam")} now={now} worthPanel={(earned, ahead) => (
            <WorthPanel earned={earned} ahead={ahead} now={now} fiat="USD" onFiat={() => {}} problem=""
              reading={{ fiat: "USD", price: 64941, observed_at: now - 600, source: "mempool.space", source_url: "https://mempool.space",
                history: [{ observed_at: now - 4 * 365 * 86400, price: 16800 }, { observed_at: now - 365 * 86400, price: 91000 }] }} />
          )} />
        )}
        {!one && view !== "savings" && (
          <>
            <h1 className="text-3xl font-bold">Chores</h1>
            <Board tasks={tasks} me={viewerNpub(viewer)} now={now} onChanged={() => {}} />
          </>
        )}
      </div>
    </SampleFamilyProvider>
  </MemoryRouter>,
);
