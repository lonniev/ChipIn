/** Your account: where you get paid, then the package's panels in their one order. */

import CalendarFeed from "../components/CalendarFeed";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { getMyProperties, setMyProperty } from "@tollbooth-dpyc/web";
import { AccountPage, tourTarget, useAppShell, useTour } from "@tollbooth-dpyc/web/react";

const BUILD = {
  root: "card panel",
  heading: "panel-title mb-2",
  intro: "muted text-sm",
  row: "flex flex-wrap gap-x-2 py-0.5 text-sm",
  label: "muted",
  value: "font-mono text-xs leading-5",
  link: "underline",
};

const USAGE = {
  root: "card panel",
  header: "flex flex-wrap items-center justify-between gap-2",
  heading: "panel-title",
  chip: "chip",
  figures: "mt-3 flex flex-wrap gap-x-8 gap-y-2",
  value: "block num text-2xl text-[var(--tb-accent)]",
  label: "muted text-xs",
  subheading: "panel-title mt-4 mb-1",
  list: "divide-y divide-[var(--tb-line)] text-sm",
  row: "flex flex-wrap justify-between gap-x-4 py-2",
};

function PayoutAddress() {
  const [address, setAddress] = useState("");
  const [saved, setSaved] = useState("");
  const [problem, setProblem] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let live = true;
    getMyProperties()
      .then((r) => {
        const value = r.properties?.find((p) => p.name === "payout_address")?.value;
        if (live && typeof value === "string") {
          setAddress(value);
          setSaved(value);
        }
      })
      .catch((e) => live && setProblem((e as Error).message));
    return () => { live = false; };
  }, []);

  async function save() {
    setBusy(true);
    setProblem("");
    try {
      const r = await setMyProperty("payout_address", address.trim());
      if (r.success === false) throw new Error(r.error ?? "The address was not saved.");
      setSaved(address.trim());
    } catch (e) {
      setProblem((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="card panel grid gap-2" {...tourTarget("account.payout")}>
      <h2 className="panel-title">Where you get paid</h2>
      <p className="muted text-sm">If your wallet gives you a Lightning address, put it here and your sats arrive with no extra step. It looks like an email address. You can skip this.</p>
      <form className="flex flex-wrap items-center justify-end gap-2" onSubmit={(e) => { e.preventDefault(); void save(); }}>
        <input
          className="field flex-1" value={address} onChange={(e) => setAddress(e.target.value)}
          placeholder="name@wallet.example" aria-label="Lightning address" inputMode="email" autoCapitalize="none" spellCheck={false}
        />
        <button type="submit" className="chip chip-accent" disabled={busy || address.trim() === saved}>
          {saved && address.trim() === saved ? <><Check size={16} aria-hidden />Saved</> : "Save"}
        </button>
      </form>
      {problem && <p className="error text-right">{problem}</p>}
    </section>
  );
}

export default function Profile() {
  useTour("account");
  const { session, status } = useAppShell();
  return (
    <div className="page">
      <AccountPage
        npub={session.npub}
        heading={null}
        before={<><PayoutAddress /><CalendarFeed /></>}
        usage={{ classNames: USAGE }}
        theme={{ classNames: { chip: "chip", active: "chip chip-on" } }}
        timezone={{ classNames: { select: "field" } }}
        build={{
          classNames: BUILD,
          status,
          frontend: { version: __APP_VERSION__, commit: __BUILD_COMMIT__, builtAt: __BUILD_TIME__, source: "https://github.com/lonniev/ChipIn" },
        }}
        onSignOut={session.signOut}
        classNames={{
          root: "account-grid",
          section: "card panel",
          sectionHeading: "panel-title mb-1",
          sectionIntro: "muted mb-2 text-sm",
          sectionNote: "muted mt-2 text-sm",
          actions: "card panel flex gap-2 account-wide",
          signOut: "chip",
        }}
      />
    </div>
  );
}
