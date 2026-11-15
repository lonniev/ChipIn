/** A named person or chore is a link to it. A person has a face. */

import { Link } from "react-router-dom";
import { useFamily } from "../lib/FamilyContext";
import { useLooking } from "../lib/LookContext";
import { hueOf, initialOf } from "../lib/face";

export const choreHref = (taskId: string) => `/chores/${encodeURIComponent(taskId)}`;
/** Where a chore opens: its page, or its sample page while looking around. */
export function useChoreHref(): (taskId: string) => string {
  const looking = useLooking();
  return looking ? (taskId) => `/look/chores/${encodeURIComponent(taskId)}` : choreHref;
}
export const personHref = (npub: string) => `/family?who=${encodeURIComponent(npub)}`;

export function Face({ npub, name, big = false }: { npub: string; name: string; big?: boolean }) {
  return (
    <span className={big ? "face face-big" : "face"} style={{ background: `hsl(${hueOf(npub)} 62% 42%)` }} aria-hidden>
      {initialOf(name)}
    </span>
  );
}

export function PersonLink({ npub }: { npub: string }) {
  const { name } = useFamily();
  const looking = useLooking();
  const called = name(npub);
  if (looking) return <span className="person"><Face npub={npub} name={called} /><span>{called}</span></span>;
  return (
    <Link to={personHref(npub)} className="person">
      <Face npub={npub} name={called} />
      <span className="ent">{called}</span>
    </Link>
  );
}

export function People({ npubs }: { npubs: string[] }) {
  return <span className="people">{npubs.map((n) => <PersonLink key={n} npub={n} />)}</span>;
}
