import { lazy, Suspense, type ReactNode } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { BookOpen, DoorOpen, GraduationCap, HandCoins, ListChecks, PiggyBank, Users, Wallet as WalletIcon } from "lucide-react";
import farm from "./assets/farm.webp";
import { AppShell, SiteNav, TourProvider, Wallet, matchesPath, useAppShell, useTour } from "@tollbooth-dpyc/web/react";
import Waiting from "./components/Waiting";
import { FamilyProvider } from "./lib/FamilyContext";
import { PicturesProvider } from "./lib/PicturesContext";
import { TOURS } from "./lib/tours";

// Each page is its own chunk, fetched the first time it opens.
const Chore = lazy(() => import("./views/Chore"));
const Chores = lazy(() => import("./views/Chores"));
const Family = lazy(() => import("./views/Family"));
const Guide = lazy(() => import("./views/Guide"));
const Home = lazy(() => import("./views/Home"));
const Learn = lazy(() => import("./views/Learn"));
const Look = lazy(() => import("./views/Look"));
const LessonPage = lazy(() => import("./views/LessonPage"));
const NewChore = lazy(() => import("./views/NewChore"));
const Profile = lazy(() => import("./views/Profile"));
const Savings = lazy(() => import("./views/Savings"));

const WELCOME = "A family learns the worth of work.";

const PAGES = [
  { href: "/look", label: "Welcome", icon: <DoorOpen size={18} aria-hidden /> },
  { href: "/chores", label: "Chores", icon: <ListChecks size={18} aria-hidden /> },
  { href: "/savings", label: "Savings", icon: <PiggyBank size={18} aria-hidden /> },
  { href: "/family", label: "Family", icon: <Users size={18} aria-hidden /> },
  { href: "/wallet", label: "Tollbooth wallet", icon: <WalletIcon size={18} aria-hidden /> },
  { href: "/learn", label: "Learn", icon: <GraduationCap size={18} aria-hidden /> },
  { href: "/guide", label: "Guide", icon: <BookOpen size={18} aria-hidden /> },
];

const NAV_CLASSES = {
  root: "flex flex-wrap items-center gap-2",
  nav: "relative",
  list: "flex flex-wrap gap-1",
  item: "chip",
  active: "chip chip-on",
  toggle: "chip",
  menu: "site-menu left-0",
  menuItem: "site-menu-item",
  menuItemActive: "site-menu-item text-[var(--tb-accent)]",
  end: "ml-auto flex items-center gap-3",
  account: "relative",
  accountButton: "rounded-full",
  accountMenu: "site-menu right-0",
  accountHeader: "border-b border-[var(--tb-line)] px-3 pb-2 mb-1",
  accountHeading: "text-xs text-[var(--tb-muted)]",
  accountNpub: "break-all font-mono text-xs",
  accountLink: "site-menu-item",
  signOut: "site-menu-item w-full text-left",
};

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
      <HandCoins size={24} aria-hidden className="text-[var(--tb-accent)]" />
      ChipIn
    </Link>
  );
}

function Nav() {
  const { session } = useAppShell();
  const { pathname } = useLocation();
  if (!session.signedIn) {
    return (
      <header className="site-bar flex flex-wrap items-center gap-2 px-4 py-2.5">
        <Brand />
        <Link to="/look" className="chip ml-auto">Welcome</Link>
        <Link to="/learn" className="chip">Learn</Link>
        <Link to="/guide" className="chip">Guide</Link>
        <Link to="/signin" className="chip chip-accent">Sign in</Link>
      </header>
    );
  }
  return (
    <header className="site-bar px-4 py-2">
      <SiteNav
        brand={<Brand />}
        items={PAGES}
        isActive={(href) => matchesPath(pathname, href)}
        renderLink={({ href, ...p }) => <Link to={href} {...p} />}
        account={{ npub: session.npub, links: [{ href: "/profile", label: "Profile & theme" }], onSignOut: session.signOut }}
        classNames={NAV_CLASSES}
      />
    </header>
  );
}

function Footer() {
  const { status } = useAppShell();
  return (
    <footer className="site-bar space-y-1 px-4 py-4 text-center text-xs text-[var(--tb-muted)]" style={{ borderTop: "1px solid var(--tb-line)" }}>
      <div>
        ChipIn v{__APP_VERSION__} · {__BUILD_COMMIT__}
        {status?.version && ` · Task Booth ${status.version}`}
        {status?.tollbooth_dpyc_version && ` · SDK ${status.tollbooth_dpyc_version}`}
      </div>
      <div>
        Monetized with{" "}
        <a href="https://tollbooth-dpyc.com" target="_blank" rel="noopener noreferrer" className="underline">Tollbooth DPYC™</a>
        {" · "}Apache-2.0 · Patent Pending (US Prov. 64/045,999)
      </div>
    </footer>
  );
}

function SignedIn({ children }: { children: ReactNode }) {
  const { session } = useAppShell();
  return session.signedIn ? <>{children}</> : <Navigate to="/signin" replace />;
}

function SignIn({ gate }: { gate: ReactNode }) {
  useTour("signin");
  return <div className="page"><div className="card mx-auto max-w-3xl p-6">{gate}</div></div>;
}

function WalletPage() {
  useTour("wallet");
  return (
    <div className="page grid gap-3">
      <section className="card panel grid gap-1">
        <h1 className="text-2xl font-bold">Tollbooth DPYC™ wallet</h1>
        <p>This wallet holds api_sats, which pay for using ChipIn.</p>
        <p>A parent tops it up here.</p>
        <p>The sats you earn from chores go to your own Lightning wallet; see <Link to="/savings" className="ent">Savings</Link>.</p>
      </section>
      <Wallet />
    </div>
  );
}

function Site() {
  const { session, gate } = useAppShell();
  return (
    <BrowserRouter>
      <TourProvider tours={TOURS}>
        <div className="backdrop" style={{ backgroundImage: `url(${farm})` }} aria-hidden />
        <Nav />
        <main className="flex-1">
          <PicturesProvider>
          <FamilyProvider me={session.signedIn ? session.npub : ""}>
            <Suspense fallback={<div className="page"><div className="card panel"><Waiting heading="Opening the page…" /></div></div>}>
              <Routes>
                <Route index element={session.signedIn ? <Navigate to="/chores" replace /> : <Home />} />
                <Route path="signin" element={session.signedIn ? <Navigate to="/chores" replace /> : <SignIn gate={gate} />} />
                <Route path="chores" element={<SignedIn><Chores /></SignedIn>} />
                <Route path="chores/new" element={<SignedIn><NewChore /></SignedIn>} />
                <Route path="chores/:taskId" element={<SignedIn><Chore /></SignedIn>} />
                <Route path="family" element={<SignedIn><Family /></SignedIn>} />
                <Route path="wallet" element={<SignedIn><WalletPage /></SignedIn>} />
                <Route path="profile" element={<SignedIn><Profile /></SignedIn>} />
                <Route path="guide" element={<Guide />} />
                <Route path="look" element={<Look />} />
                <Route path="look/chores/:taskId" element={<Look />} />
                <Route path="look/:page" element={<Look />} />
                <Route path="learn" element={<Learn />} />
                <Route path="learn/:slug" element={<LessonPage />} />
                <Route path="savings" element={<SignedIn><Savings /></SignedIn>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </FamilyProvider>
          </PicturesProvider>
        </main>
        <Footer />
      </TourProvider>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AppShell theme="light" gateOptions={{ welcome: WELCOME }} signedOut={() => <Site />}>
      {() => <Site />}
    </AppShell>
  );
}
